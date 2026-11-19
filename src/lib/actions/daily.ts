"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DAILY_QUIZ_SIZE, pickDailyQuestions, todayKey } from "@/lib/daily-quiz";
import { scaleScore } from "@/lib/exam";
import { revalidateTrackPath } from "@/lib/section";
import { parseProgramme, trackQuestionWhere } from "@/lib/tracks";

export type SubmitDailyState = { ok: boolean; error?: string; score?: number; correct?: number };

/**
 * Record completion of today's daily quiz. Question membership is recomputed
 * deterministically on the server from today's date and the student's track
 * so client-crafted ID lists cannot spoof scores or practice activity.
 */
export async function submitDailyQuizAction(
  _prev: SubmitDailyState,
  formData: FormData,
): Promise<SubmitDailyState> {
  const user = await requireUser();
  const track = user.teachingTrack === "CN" ? "CN" : "EN";
  const zh = track === "CN";
  const date = String(formData.get("date") || todayKey());
  const today = todayKey();
  // Only allow submitting today's quiz (prevents gaming old days).
  if (date !== today) {
    return {
      ok: false,
      error: zh ? "本次每日十题已过期，请刷新页面。" : "This quiz is no longer active.",
    };
  }

  let answers: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(String(formData.get("answers") || "{}"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        ok: false,
        error: zh ? "无法读取你的答案。" : "Could not read your answers.",
      };
    }
    answers = parsed as Record<string, unknown>;
  } catch {
    return {
      ok: false,
      error: zh ? "无法读取你的答案。" : "Could not read your answers.",
    };
  }

  const programme = parseProgramme(user.track);
  const pool = await prisma.question.findMany({
    where: { active: true, ...trackQuestionWhere(track, programme) },
    select: { id: true, subjectCode: true, correctIndex: true },
    orderBy: { id: "asc" },
  });
  const expectedQuestions = pickDailyQuestions(pool, today, DAILY_QUIZ_SIZE);
  if (expectedQuestions.length === 0) {
    return {
      ok: false,
      error: zh ? "今日十题暂无可用题目。" : "No questions available for today's quiz.",
    };
  }

  let correct = 0;
  for (const q of expectedQuestions) {
    const ans = answers[q.id];
    if (typeof ans === "number" && Number.isInteger(ans) && ans === q.correctIndex) {
      correct++;
    }
  }
  const total = expectedQuestions.length;
  const score = scaleScore(correct, total);

  await prisma.$transaction(async (tx) => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 86_400_000);

    await tx.dailyQuizCompletion.upsert({
      where: { userId_date: { userId: user.id, date } },
      create: { userId: user.id, date, correct, total, score },
      update: { correct, total, score, completedAt: now },
    });
    const existing = await tx.practiceActivity.findUnique({
      where: { userId_date: { userId: user.id, date } },
      select: { questionsAnswered: true, correct: true },
    });
    // Count the daily quiz once per day toward activity (idempotent on resubmit).
    if (!existing) {
      await tx.practiceActivity.create({
        data: { userId: user.id, date, questionsAnswered: total, correct },
      });
    } else if (existing.questionsAnswered < total) {
      await tx.practiceActivity.update({
        where: { userId_date: { userId: user.id, date } },
        data: { questionsAnswered: total, correct: Math.max(existing.correct, correct) },
      });
    }

    const existingReviews = await tx.reviewItem.findMany({
      where: {
        userId: user.id,
        questionId: { in: expectedQuestions.map((q) => q.id) },
      },
    });
    const reviewByQuestion = new Map(
      existingReviews.map((row) => [row.questionId, row]),
    );

    for (const q of expectedQuestions) {
      const isRight = answers[q.id] === q.correctIndex;
      const cur = reviewByQuestion.get(q.id);
      if (cur) {
        const nextStreak = isRight ? cur.streak + 1 : 0;
        const gapDays = isRight
          ? Math.min(21, 3 * 2 ** Math.max(0, nextStreak - 1))
          : 1;
        await tx.reviewItem.update({
          where: { id: cur.id },
          data: {
            correctCount: cur.correctCount + (isRight ? 1 : 0),
            wrongCount: cur.wrongCount + (isRight ? 0 : 1),
            streak: nextStreak,
            lastSeenAt: now,
            nextReviewAt: new Date(now.getTime() + gapDays * 86_400_000),
          },
        });
      } else if (!isRight) {
        await tx.reviewItem.create({
          data: {
            userId: user.id,
            questionId: q.id,
            correctCount: 0,
            wrongCount: 1,
            streak: 0,
            lastSeenAt: now,
            nextReviewAt: tomorrow,
          },
        });
      }
    }
  });

  revalidateTrackPath("/daily");
  revalidateTrackPath("/dashboard");
  revalidateTrackPath("/leaderboard");
  revalidateTrackPath("/practice");
  revalidateTrackPath("/practice/mistakes");
  return { ok: true, score, correct };
}
