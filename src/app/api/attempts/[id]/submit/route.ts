import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { finalizeAttempt, parseAttemptSaveInput } from "@/lib/attempts";

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getCurrentUser();
  if (!session || session.status !== "APPROVED") {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await ctx.params;

  const parsed = await parseAttemptSaveInput(request);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const result = await finalizeAttempt(id, session.id, parsed.data);
  if (!result) return NextResponse.json({ error: "Attempt not found" }, { status: 404 });

  return NextResponse.json(result);
}
