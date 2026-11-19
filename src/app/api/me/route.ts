import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// This response is per-session. It must never be written to a browser cache
// or a CDN — the marketing navbar polls it on every page load.
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.status !== "APPROVED") {
    return NextResponse.json({ user: null }, { headers: NO_STORE });
  }

  return NextResponse.json(
    {
      user: {
        name: user.name,
        role: user.role,
      },
    },
    { headers: NO_STORE },
  );
}
