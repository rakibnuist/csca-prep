import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  let body: { questionId?: string; correct?: boolean };
  try {
    body = (await request.json()) as { questionId?: string; correct?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { questionId, correct } = body;
  if (!questionId || typeof correct !== "boolean") {
    return NextResponse.json({ error: "questionId and correct are required" }, { status: 400 });
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { id: true },
  });
  if (!question) return NextResponse.json({ error: "Unknown question" }, { status: 404 });

  const existing = await prisma.reviewItem.findUnique({
    where: { userId_questionId: { userId: session.id, questionId } },
  });

  if (!existing) {
    await prisma.reviewItem.create({
      data: {
        userId: session.id,
        questionId,
        correctCount: correct ? 1 : 0,
        wrongCount: correct ? 0 : 1,
        streak: correct ? 1 : 0,
        nextReviewAt: new Date(Date.now() + (correct ? 3 : 1) * 86_400_000),
      },
    });
  } else {
    const streak = correct ? existing.streak + 1 : 0;
    const gapDays = correct ? Math.min(21, 3 * 2 ** Math.max(0, streak - 1)) : 1;
    await prisma.reviewItem.update({
      where: { id: existing.id },
      data: {
        correctCount: existing.correctCount + (correct ? 1 : 0),
        wrongCount: existing.wrongCount + (correct ? 0 : 1),
        streak,
        lastSeenAt: new Date(),
        nextReviewAt: new Date(Date.now() + gapDays * 86_400_000),
      },
    });
  }

  return NextResponse.json({ ok: true });
}
