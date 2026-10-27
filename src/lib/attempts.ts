import "server-only";

import { prisma } from "@/lib/db";
import { scaleScore } from "@/lib/exam";

export const FREE_ATTEMPTS_PER_MOCK = 2;

export type ExamQuestionPayload = {
  id: string;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
  figure: string | null;
  difficulty: string;
  topicCode: string;
  topicTitle: string;
  topicTitleZh: string;
};

export async function getMockWithQuestions(slug: string) {
  return prisma.mock.findUnique({
    where: { slug },
    include: {
      subject: true,
      items: {
        orderBy: { order: "asc" },
        include: {
          question: { include: { topic: true } },
        },
      },
    },
  });
}

export function toPayload(mock: NonNullable<Awaited<ReturnType<typeof getMockWithQuestions>>>) {
  const questions: ExamQuestionPayload[] = mock.items.map((item) => ({
    id: item.question.id,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    figure: item.question.figure,
    difficulty: item.question.difficulty,
    topicCode: item.question.topic.code,
    topicTitle: item.question.topic.titleEn,
    topicTitleZh: item.question.topic.titleZh,
  }));
  return questions;
}

export async function canStartAttempt(userId: string, mockId: string, isPro = false) {
  if (isPro) return { allowed: true, used: 0 };
  const used = await prisma.attempt.count({ where: { userId, mockId, status: "SUBMITTED" } });
  return { allowed: used < FREE_ATTEMPTS_PER_MOCK, used };
}

export async function findResumeableAttempt(userId: string, mockId: string) {
  return prisma.attempt.findFirst({
    where: { userId, mockId, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
  });
}

export async function startAttempt(userId: string, mockId: string, totalQuestions: number) {
  const existing = await findResumeableAttempt(userId, mockId);
  if (existing) return existing;

  return prisma.attempt.create({
    data: { userId, mockId, totalQuestions, status: "IN_PROGRESS" },
  });
}

export type SaveInput = {
  answers: Record<string, number>;
  flagged: string[];
  lastQuestionIndex?: number;
};

export async function saveAttempt(attemptId: string, userId: string, input: SaveInput) {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
  });
  if (!attempt) return null;

  return prisma.attempt.update({
    where: { id: attempt.id },
    data: {
      answers: input.answers,
      flagged: input.flagged,
      answeredCount: Object.keys(input.answers).length,
      lastSavedAt: new Date(),
    },
  });
}

export async function finalizeAttempt(
  attemptId: string,
  userId: string,
  input: SaveInput,
): Promise<{ id: string; score: number } | null> {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, userId },
    include: {
      mock: {
        include: {
          subject: true,
          items: { include: { question: { include: { topic: true } } } },
        },
      },
    },
  });

  if (!attempt) return null;
  if (attempt.status === "SUBMITTED") return { id: attempt.id, score: attempt.score };

  const durationSec = Math.min(
    Math.round((Date.now() - attempt.startedAt.getTime()) / 1000),
    attempt.mock.durationMin * 60,
  );

  const total = attempt.mock.items.length;
  let correct = 0;
  const topicMap = new Map<string, { code: string; title: string; correct: number; total: number }>();
  const reviewOps: { questionId: string; isCorrect: boolean }[] = [];

  for (const item of attempt.mock.items) {
    const answer = input.answers[item.questionId];
    const isCorrect = answer === item.question.correctIndex;
    if (isCorrect) correct += 1;
    reviewOps.push({ questionId: item.questionId, isCorrect });

    const existing = topicMap.get(item.question.topic.code) ?? {
      code: item.question.topic.code,
      title: item.question.topic.titleEn,
      correct: 0,
      total: 0,
    };
    existing.total += 1;
    if (isCorrect) existing.correct += 1;
    topicMap.set(item.question.topic.code, existing);
  }

  const score = scaleScore(correct, total ?? 1);

  const updated = await prisma.attempt.update({
    where: { id: attempt.id },
    data: {
      status: "SUBMITTED",
      answers: input.answers,
      flagged: input.flagged,
      answeredCount: Object.keys(input.answers).length,
      rawScore: correct,
      score,
      totalQuestions: total,
      topicBreakdown: Object.fromEntries(topicMap),
      durationSec,
      completedAt: new Date(),
    },
  });

  // Spaced-repetition ladder: correct answers move out, misses come back sooner.
  await Promise.all(
    reviewOps.map(async ({ questionId, isCorrect }) => {
      const existing = await prisma.reviewItem.findUnique({
        where: { userId_questionId: { userId, questionId } },
      });

      if (!existing) {
        await prisma.reviewItem.create({
          data: {
            userId,
            questionId,
            correctCount: isCorrect ? 1 : 0,
            wrongCount: isCorrect ? 0 : 1,
            streak: isCorrect ? 1 : 0,
            nextReviewAt: new Date(Date.now() + (isCorrect ? 3 : 1) * 86_400_000),
          },
        });
        return;
      }

      const streak = isCorrect ? existing.streak + 1 : 0;
      const gapDays = isCorrect ? Math.min(21, 3 * 2 ** Math.max(0, streak - 1)) : 1;

      await prisma.reviewItem.update({
        where: { id: existing.id },
        data: {
          correctCount: existing.correctCount + (isCorrect ? 1 : 0),
          wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
          streak,
          lastSeenAt: new Date(),
          nextReviewAt: new Date(Date.now() + gapDays * 86_400_000),
        },
      });
    }),
  );

  return { id: updated.id, score };
}

/** Remaining seconds for an in-progress attempt, from the server clock. */
export function remainingSeconds(startedAt: Date, durationMin: number) {
  const elapsed = Math.floor((Date.now() - startedAt.getTime()) / 1000);
  return Math.max(0, durationMin * 60 - elapsed);
}
