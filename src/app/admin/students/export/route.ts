import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

const ALLOWED_PLANS = new Set(["FREE", "PRO", "LIFETIME"]);
const ALLOWED_TRACKS = new Set(["EN", "CN"]);
const ALLOWED_STATUSES = new Set(["PENDING", "APPROVED", "REJECTED"]);

function escapeCsv(value: string | number | null | undefined): string {
  const s = value === null || value === undefined ? "" : String(value);
  // Prefix OWASP spreadsheet-formula triggers so Excel/Sheets don't execute them.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export async function GET(request: Request) {
  await requireAdmin();

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const plan = (searchParams.get("plan") ?? "").trim();
  const taught = (searchParams.get("taught") ?? "").trim();
  const status = (searchParams.get("status") ?? "").trim();

  const where: Prisma.UserWhereInput = { role: "STUDENT" };
  if (ALLOWED_PLANS.has(plan)) where.plan = plan;
  if (ALLOWED_TRACKS.has(taught)) where.teachingTrack = taught;
  if (ALLOWED_STATUSES.has(status)) where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { country: { contains: q, mode: "insensitive" } },
      { whatsapp: { contains: q, mode: "insensitive" } },
    ];
  }

  const students = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      plan: true,
      proExpiresAt: true,
      teachingTrack: true,
      track: true,
      country: true,
      whatsapp: true,
      targetYear: true,
      createdAt: true,
      attempts: {
        where: { status: "SUBMITTED" },
        select: { score: true },
      },
    },
  });

  const header = [
    "id",
    "name",
    "email",
    "status",
    "plan",
    "proExpiresAt",
    "teachingTrack",
    "track",
    "country",
    "whatsapp",
    "targetYear",
    "submittedAttempts",
    "bestScore",
    "createdAt",
  ].join(",");

  const body = students
    .map((s) => {
      const scores = s.attempts
        .map((a) => a.score)
        .filter((v): v is number => v !== null);
      const best = scores.length > 0 ? Math.max(...scores) : "";
      return [
        escapeCsv(s.id),
        escapeCsv(s.name),
        escapeCsv(s.email),
        escapeCsv(s.status),
        escapeCsv(s.plan),
        escapeCsv(s.proExpiresAt ? s.proExpiresAt.toISOString() : ""),
        escapeCsv(s.teachingTrack),
        escapeCsv(s.track),
        escapeCsv(s.country),
        escapeCsv(s.whatsapp),
        escapeCsv(s.targetYear),
        escapeCsv(s.attempts.length),
        escapeCsv(best),
        escapeCsv(s.createdAt.toISOString()),
      ].join(",");
    })
    .join("\n");

  const dateTag = new Date().toISOString().slice(0, 10);
  return new Response(`\uFEFF${header}\n${body}`, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="csca-students-${dateTag}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
