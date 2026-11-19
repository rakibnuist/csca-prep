import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { parseAttemptSaveInput, saveAttempt } from "@/lib/attempts";

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

  const result = await saveAttempt(id, session.id, parsed.data);
  if (!result) return NextResponse.json({ error: "Attempt not found" }, { status: 404 });

  if (result.expired) {
    // The paper closed. Tell the client so it can submit rather than keep
    // showing "Not saved".
    return NextResponse.json(
      { error: "This paper has closed", expired: true, savedAt: result.savedAt.toISOString() },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true, savedAt: result.savedAt.toISOString() });
}
