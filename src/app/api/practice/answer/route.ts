import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getCurrentUser();
  if (!session || session.status !== "APPROVED") {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { questionId, optionIndex } = parsed as { questionId?: unknown; optionIndex?: unknown };
  if (
    typeof questionId !== "string" ||
    !questionId ||
    typeof optionIndex !== "number" ||
    !Number.isInteger(optionIndex) ||
    optionIndex < 0 ||
    optionIndex > 9
  ) {
    return NextResponse.json(
      { error: "Valid questionId and optionIndex are required" },
      { status: 400 },
    );
  }

  const limited = await rateLimit(`practice:${session.id}`, 240, 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Correctness is derived here, never taken from the client. The browser used
  // to send `correct: true` and the server believed it, which let anyone
  // mark every question right and wipe their own review queue.
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { id: true, correctIndex: true, active: true, options: true },
  });
  if (!question || !question.active) {
    return NextResponse.json({ error: "Unknown question" }, { status: 404 });
  }
  if (optionIndex >= question.options.length) {
    return NextResponse.json({ error: "Invalid optionIndex" }, { status: 400 });
  }

  const correct = optionIndex === question.correctIndex;
  const now = new Date();
  const nextReview = new Date(now.getTime() + (correct ? 3 : 1) * 86_400_000);

  const applyUpdate = async (tx: Prisma.TransactionClient, existingId: string, prevStreak: number, prevCorrect: number, prevWrong: number) => {
    const streak = correct ? prevStreak + 1 : 0;
    const gapDays = correct ? Math.min(21, 3 * 2 ** Math.max(0, streak - 1)) : 1;
    await tx.reviewItem.update({
      where: { id: existingId },
      data: {
        correctCount: prevCorrect + (correct ? 1 : 0),
        wrongCount: prevWrong + (correct ? 0 : 1),
        streak,
        lastSeenAt: now,
        nextReviewAt: new Date(now.getTime() + gapDays * 86_400_000),
      },
    });
  };

  try {
    await prisma.$transaction(async (tx) => {
      const existing = await tx.reviewItem.findUnique({
        where: { userId_questionId: { userId: session.id, questionId } },
      });
      if (!existing) {
        await tx.reviewItem.create({
          data: {
            userId: session.id,
            questionId,
            correctCount: correct ? 1 : 0,
            wrongCount: correct ? 0 : 1,
            streak: correct ? 1 : 0,
            nextReviewAt: nextReview,
          },
        });
      } else {
        await applyUpdate(tx, existing.id, existing.streak, existing.correctCount, existing.wrongCount);
      }
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      await prisma.$transaction(async (tx) => {
        const existing = await tx.reviewItem.findUnique({
          where: { userId_questionId: { userId: session.id, questionId } },
        });
        if (existing) {
          await applyUpdate(tx, existing.id, existing.streak, existing.correctCount, existing.wrongCount);
        }
      });
    } else {
      throw err;
    }
  }

  return NextResponse.json({ ok: true });
}
