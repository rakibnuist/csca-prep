import { NextResponse } from "next/server";
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

  const { questionId, reason } = parsed as {
    questionId?: unknown;
    reason?: unknown;
  };

  if (typeof questionId !== "string" || !questionId.trim()) {
    return NextResponse.json({ error: "Valid questionId is required" }, { status: 400 });
  }
  if (typeof reason !== "string" || reason.trim().length < 3) {
    return NextResponse.json(
      { error: "Describe the issue in at least 3 characters" },
      { status: 400 },
    );
  }

  const limited = await rateLimit(`q-report:${session.id}`, 15, 60 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many reports from this account. Please try again later." },
      { status: 429 },
    );
  }

  const qId = questionId.trim();
  const question = await prisma.question.findUnique({
    where: { id: qId },
    select: {
      id: true,
      subjectCode: true,
      tags: true,
      topic: { select: { code: true } },
    },
  });
  if (!question) {
    return NextResponse.json({ error: "Unknown question" }, { status: 404 });
  }

  const nextTags = Array.from(new Set([...question.tags, "needs-review"]));
  const cleanReason = reason.trim().slice(0, 500);

  await prisma.$transaction([
    prisma.question.update({
      where: { id: question.id },
      data: { tags: nextTags },
    }),
    prisma.lead.create({
      data: {
        name: (session.name ?? session.email).slice(0, 120),
        email: session.email,
        source: "question-report",
        priority: "P2",
        tags: ["question-report", question.subjectCode, question.topic.code],
        goal: `Question issue: ${question.subjectCode} ${question.topic.code} (${question.id})`,
        message: cleanReason,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
