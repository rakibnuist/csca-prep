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

  const { questionId, bookmarked, note } = parsed as {
    questionId?: unknown;
    bookmarked?: unknown;
    note?: unknown;
  };

  if (typeof questionId !== "string" || !questionId.trim()) {
    return NextResponse.json({ error: "Valid questionId is required" }, { status: 400 });
  }

  const hasBookmarked = typeof bookmarked === "boolean";
  const hasNote = typeof note === "string";
  if (!hasBookmarked && !hasNote) {
    return NextResponse.json(
      { error: "Provide bookmarked or note to update" },
      { status: 400 },
    );
  }

  const limited = await rateLimit(`review-meta:${session.id}`, 120, 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const qId = questionId.trim();
  const question = await prisma.question.findUnique({
    where: { id: qId },
    select: { id: true, active: true },
  });
  if (!question || !question.active) {
    return NextResponse.json({ error: "Unknown question" }, { status: 404 });
  }

  const cleanedNote = hasNote ? note.trim().slice(0, 500) || null : undefined;
  const updateData: Prisma.ReviewItemUpdateInput = {};
  if (hasBookmarked) updateData.bookmarked = bookmarked;
  if (hasNote) updateData.note = cleanedNote;

  const row = await prisma.reviewItem.upsert({
    where: { userId_questionId: { userId: session.id, questionId: qId } },
    create: {
      userId: session.id,
      questionId: qId,
      bookmarked: hasBookmarked ? bookmarked : false,
      note: hasNote ? (cleanedNote ?? null) : null,
    },
    update: updateData,
    select: { bookmarked: true, note: true },
  });

  return NextResponse.json({
    ok: true,
    bookmarked: row.bookmarked,
    note: row.note,
  });
}
