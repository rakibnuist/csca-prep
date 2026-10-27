import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveAttempt } from "@/lib/attempts";

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as {
    answers?: Record<string, unknown>;
    flagged?: unknown;
  };

  const answers: Record<string, number> = {};
  for (const [key, value] of Object.entries(payload.answers ?? {})) {
    if (typeof value === "number" && value >= 0 && value <= 9) answers[key] = value;
  }

  const flagged = Array.isArray(payload.flagged)
    ? payload.flagged.filter((value): value is string => typeof value === "string").slice(0, 200)
    : [];

  const result = await saveAttempt(id, session.id, { answers, flagged });
  if (!result) return NextResponse.json({ error: "Attempt not found" }, { status: 404 });

  return NextResponse.json({ ok: true, savedAt: result.lastSavedAt.toISOString() });
}
