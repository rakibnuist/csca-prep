import "server-only";

import { prisma } from "@/lib/db";
import { scaleScore } from "@/lib/exam";
import { entitlementFor, paperKind, type Entitlement } from "@/lib/entitlements";
import { sanitizeTimePerQuestion } from "@/lib/pacing";

/**
 * @deprecated Kept only for the counters shown on cards. The rules live in
 * `entitlementFor()` — use that, not this.
 */
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

export function toPayload(
  mock: NonNullable<Awaited<ReturnType<typeof getMockWithQuestions>>>,
  language: "en" | "zh" = "en",
) {
  const questions: ExamQuestionPayload[] = mock.items.map((item) => ({
    id: item.question.id,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    figure: item.question.figure,
    difficulty: item.question.difficulty,
    topicCode: item.question.topic.code,
    topicTitle: language === "zh" ? item.question.topic.titleZh : item.question.topic.titleEn,
    topicTitleZh: item.question.topic.titleZh,
  }));
  return questions;
}

/**
 * May this student start a timed attempt on this paper?
 *
 * The rules live in `entitlementFor()`; this is the database-backed wrapper
 * that also counts what they have already sat.
 */
export async function canStartAttempt(
  userId: string,
  mockId: string,
  access: { isPro: boolean },
  lang: "en" | "zh" = "en",
): Promise<Entitlement & { used: number }> {
  const mock = await prisma.mock.findUnique({
    where: { id: mockId },
    select: { slug: true, paper: true },
  });
  if (!mock) {
    return { canSit: false, attemptsLeft: 0, reason: "LIMIT", note: "Paper not found", used: 0 };
  }

  const used = await prisma.attempt.count({
    where: { userId, mockId, status: "SUBMITTED" },
  });

  const entitlement = entitlementFor(access, paperKind(mock.paper, mock.slug), mock.slug, used, lang);
  return { ...entitlement, used };
}

export async function findResumeableAttempt(userId: string, mockId: string) {
  return prisma.attempt.findFirst({
    where: { userId, mockId, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
  });
}

export async function startAttempt(
  userId: string,
  mockId: string,
  totalQuestions: number,
  track: "EN" | "CN" = "EN",
) {
  const existing = await findResumeableAttempt(userId, mockId);
  if (existing) return existing;

  return prisma.attempt.create({
    data: { userId, mockId, totalQuestions, status: "IN_PROGRESS", track },
  });
}

export type SaveInput = {
  answers: Record<string, number>;
  flagged: string[];
  lastQuestionIndex?: number;
  /**
   * Milliseconds each question was on screen, keyed by question id. Measured by
   * the client while the paper is running; the tab being hidden pauses the
   * clock, so this is screen time, not wall time. Used only for the pacing
   * report — it never affects the score.
   */
  timePerQuestion?: Record<string, number>;
};

/**
 * Parse and validate an exam save/submit request body. Rejects non-object
 * outer JSON as well as missing/non-object `answers` so corrupted payloads
 * cannot overwrite saved answers with `{}`.
 */
export async function parseAttemptSaveInput(
  request: Request,
): Promise<{ ok: true; data: SaveInput } | { ok: false; error: string }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Invalid request body" };
  }

  const payload = body as {
    answers?: unknown;
    flagged?: unknown;
    timePerQuestion?: unknown;
  };
  if (!payload.answers || typeof payload.answers !== "object" || Array.isArray(payload.answers)) {
    return { ok: false, error: "Invalid answers payload" };
  }

  const answers: Record<string, number> = {};
  for (const [key, value] of Object.entries(payload.answers)) {
    if (
      key.length > 0 &&
      key.length <= 64 &&
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 9
    ) {
      answers[key] = value;
      if (Object.keys(answers).length >= 200) break;
    }
  }

  const flagged = Array.isArray(payload.flagged)
    ? payload.flagged
        .filter((value): value is string => typeof value === "string" && value.length <= 64)
        .slice(0, 200)
    : [];

  return {
    ok: true,
    data: {
      answers,
      flagged,
      timePerQuestion: sanitizeTimePerQuestion(payload.timePerQuestion),
    },
  };
}

export type SaveResult = {
  /** The paper's deadline has passed — nothing more can be recorded. */
  expired: boolean;
  savedAt: Date;
};

/** The moment the paper closes, derived from the server clock. */
export function deadlineMs(startedAt: Date, durationMin: number) {
  return startedAt.getTime() + durationMin * 60_000;
}

export async function saveAttempt(
  attemptId: string,
  userId: string,
  input: SaveInput,
): Promise<SaveResult | null> {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    include: { mock: { select: { durationMin: true } } },
  });
  if (!attempt) return null;

  const savedAt = new Date();

  // The server clock is authoritative. Once the paper has closed, further
  // answers are refused — this is what stops a student who changes their
  // system clock from banking extra minutes.
  if (Date.now() > deadlineMs(attempt.startedAt, attempt.mock.durationMin)) {
    return { expired: true, savedAt };
  }

  await prisma.attempt.update({
    where: { id: attempt.id },
    data: {
      answers: input.answers,
      flagged: input.flagged,
      answeredCount: Object.keys(input.answers).length,
      lastSavedAt: savedAt,
      // Only overwrite when the client actually measured something: a save
      // that omits the map (older client, resumed paper) must not erase it.
      ...(input.timePerQuestion ? { timePerQuestion: input.timePerQuestion } : {}),
    },
  });

  return { expired: false, savedAt };
}

export async function finalizeAttempt(
  attemptId: string,
  userId: string,
  input: SaveInput,
): Promise<{ id: string; score: number; expired: boolean } | null> {
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
  if (attempt.status === "SUBMITTED") {
    return { id: attempt.id, score: attempt.score, expired: false };
  }

  const expired = Date.now() > deadlineMs(attempt.startedAt, attempt.mock.durationMin);

  // Past the deadline the client's answers are no longer trusted — the last
  // state the server persisted is the truth.
  const savedAnswers = (attempt.answers ?? {}) as Record<string, number>;
  const answers = expired ? savedAnswers : input.answers;
  const flagged = expired ? attempt.flagged : input.flagged;
  // Same rule as the answers: past the deadline, trust what the server already
  // persisted rather than a clock the candidate controls.
  const timePerQuestion = expired
    ? ((attempt.timePerQuestion ?? undefined) as Record<string, number> | undefined)
    : input.timePerQuestion;

  const durationSec = Math.min(
    Math.max(0, Math.round((Date.now() - attempt.startedAt.getTime()) / 1000)),
    attempt.mock.durationMin * 60,
  );

  const topicMap = new Map<string, { code: string; title: string; correct: number; total: number }>();
  const reviewData: { questionId: string; isCorrect: boolean; answered: boolean }[] = [];
  let correct = 0;
  let total = 0;

  for (const item of attempt.mock.items) {
    const question = item.question;

    // A question whose key does not line up with its options cannot be
    // scored; counting it would distort the percentage and the breakdown.
    const hasValidKey =
      Number.isInteger(question.correctIndex) &&
      question.correctIndex >= 0 &&
      question.correctIndex < question.options.length;
    if (!hasValidKey) continue;

    const given = answers[question.id];
    const answered = typeof given === "number";
    const isCorrect = answered && given === question.correctIndex;

    total += 1;
    if (isCorrect) correct += 1;
    reviewData.push({ questionId: question.id, isCorrect, answered });

    const existing = topicMap.get(question.topic.code) ?? {
      code: question.topic.code,
      title: question.topic.titleEn,
      correct: 0,
      total: 0,
    };
    existing.total += 1;
    if (isCorrect) existing.correct += 1;
    topicMap.set(question.topic.code, existing);
  }

  const score = scaleScore(correct, total || 1);
  const validAnsweredCount = reviewData.filter((entry) => entry.answered).length;

  // Claim the transition atomically so concurrent /submit calls cannot double-
  // update review cards or double-increment daily practice counters.
  const claimed = await prisma.attempt.updateMany({
    where: { id: attempt.id, userId, status: "IN_PROGRESS" },
    data: {
      status: "SUBMITTED",
      answers,
      flagged,
      answeredCount: validAnsweredCount,
      rawScore: correct,
      score,
      totalQuestions: total,
      topicBreakdown: Object.fromEntries(topicMap),
      durationSec,
      completedAt: new Date(),
      ...(timePerQuestion ? { timePerQuestion } : {}),
    },
  });
  if (claimed.count === 0) {
    const latest = await prisma.attempt.findUnique({
      where: { id: attempt.id },
      select: { score: true },
    });
    return { id: attempt.id, score: latest?.score ?? score, expired: false };
  }

  // Spaced repetition: only mistakes enter the queue. A correct first answer
  // creates nothing, so finishing a paper no longer dumps 48 cards into the
  // review list, and unanswered questions are not recorded as wrong.
  const questionIds = reviewData.map((entry) => entry.questionId);
  const existingItems = questionIds.length
    ? await prisma.reviewItem.findMany({
        where: { userId, questionId: { in: questionIds } },
      })
    : [];
  const existingMap = new Map(existingItems.map((item) => [item.questionId, item]));

  const now = new Date();
  const reviewOps: ReturnType<typeof prisma.reviewItem.create>[] = [];

  for (const { questionId, isCorrect, answered } of reviewData) {
    if (!answered) continue;
    const existing = existingMap.get(questionId);

    if (isCorrect) {
      // Push an existing card further out. Do not create a new one.
      if (!existing) continue;
      const streak = existing.streak + 1;
      const gapDays = Math.min(21, 3 * 2 ** Math.max(0, streak - 1));
      reviewOps.push(
        prisma.reviewItem.update({
          where: { id: existing.id },
          data: {
            correctCount: existing.correctCount + 1,
            streak,
            lastSeenAt: now,
            nextReviewAt: new Date(now.getTime() + gapDays * 86_400_000),
          },
        }),
      );
      continue;
    }

    if (!existing) {
      reviewOps.push(
        prisma.reviewItem.create({
          data: {
            userId,
            questionId,
            correctCount: 0,
            wrongCount: 1,
            streak: 0,
            nextReviewAt: new Date(now.getTime() + 86_400_000),
          },
        }),
      );
    } else {
      reviewOps.push(
        prisma.reviewItem.update({
          where: { id: existing.id },
          data: {
            wrongCount: existing.wrongCount + 1,
            streak: 0,
            lastSeenAt: now,
            nextReviewAt: new Date(now.getTime() + 86_400_000),
          },
        }),
      );
    }
  }

  // One transaction: the earlier per-item writes could race and fail with
  // P2002 *after* the attempt had already been marked SUBMITTED.
  if (reviewOps.length) {
    await prisma.$transaction(reviewOps);
  }

  // Roll up into daily practice activity (feeds the leaderboard). Best-effort:
  // never fail a submitted attempt because of activity logging.
  try {
    const date = new Date().toISOString().slice(0, 10);
    await prisma.practiceActivity.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, questionsAnswered: validAnsweredCount, correct },
      update: {
        questionsAnswered: { increment: validAnsweredCount },
        correct: { increment: correct },
      },
    });
  } catch {
    // non-fatal
  }

  return { id: attempt.id, score, expired };
}

/** Remaining seconds for an in-progress attempt, from the server clock. */
export function remainingSeconds(startedAt: Date, durationMin: number) {
  const elapsed = Math.floor((Date.now() - startedAt.getTime()) / 1000);
  return Math.max(0, durationMin * 60 - elapsed);
}
