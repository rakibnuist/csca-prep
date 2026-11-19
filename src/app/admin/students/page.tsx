import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Download, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { updateStudentAccessAction } from "@/lib/actions/admin-students";

export const dynamic = "force-dynamic";

const ALLOWED_PLANS = new Set(["FREE", "PRO", "LIFETIME"]);
const ALLOWED_TRACKS = new Set(["EN", "CN"]);
const ALLOWED_STATUSES = new Set(["PENDING", "APPROVED", "REJECTED"]);

function statusBadge(status: string) {
  if (status === "APPROVED") return "border-jade/25 bg-jade/10 text-jade";
  if (status === "PENDING") return "border-gold/30 bg-gold/10 text-gold";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

function planBadge(plan: string) {
  if (plan === "LIFETIME") return "border-indigo/25 bg-indigo/10 text-indigo";
  if (plan === "PRO") return "border-vermillion/25 bg-vermillion/10 text-vermillion";
  return "border-line bg-paper-deep text-ink-soft";
}

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    plan?: string;
    taught?: string;
    status?: string;
    sort?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const q = (params.q ?? "").trim();
  const plan = ALLOWED_PLANS.has(params.plan ?? "") ? (params.plan as string) : "";
  const taught = ALLOWED_TRACKS.has(params.taught ?? "") ? (params.taught as string) : "";
  const status = ALLOWED_STATUSES.has(params.status ?? "") ? (params.status as string) : "";
  const sort = params.sort === "active" || params.sort === "score" ? params.sort : "newest";

  const where: Prisma.UserWhereInput = { role: "STUDENT" };
  if (plan) where.plan = plan;
  if (taught) where.teachingTrack = taught;
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { country: { contains: q, mode: "insensitive" } },
      { whatsapp: { contains: q, mode: "insensitive" } },
    ];
  }

  const [
    totalAll,
    pendingAll,
    approvedAll,
    proAll,
    enAll,
    cnAll,
    rawStudents,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "STUDENT", status: "PENDING" } }),
    prisma.user.count({ where: { role: "STUDENT", status: "APPROVED" } }),
    prisma.user.count({
      where: { role: "STUDENT", plan: { in: ["PRO", "LIFETIME"] } },
    }),
    prisma.user.count({ where: { role: "STUDENT", teachingTrack: "EN" } }),
    prisma.user.count({ where: { role: "STUDENT", teachingTrack: "CN" } }),
    prisma.user.findMany({
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
        targetYear: true,
        country: true,
        whatsapp: true,
        createdAt: true,
        attempts: {
          where: { status: "SUBMITTED" },
          select: { score: true, completedAt: true },
        },
        _count: { select: { redemptions: true } },
      },
    }),
  ]);

  const students = rawStudents
    .map((s) => {
      const scores = s.attempts
        .map((a) => a.score)
        .filter((v): v is number => v !== null);
      const bestScore = scores.length > 0 ? Math.max(...scores) : null;
      const latestCompleted = s.attempts.reduce<number>((acc, a) => {
        const ts = a.completedAt ? a.completedAt.getTime() : 0;
        return ts > acc ? ts : acc;
      }, 0);
      return {
        ...s,
        submittedCount: s.attempts.length,
        bestScore,
        latestActivityTs: Math.max(latestCompleted, s.createdAt.getTime()),
      };
    })
    .sort((a, b) => {
      if (sort === "active") {
        if (b.submittedCount !== a.submittedCount) {
          return b.submittedCount - a.submittedCount;
        }
        return b.latestActivityTs - a.latestActivityTs;
      }
      if (sort === "score") {
        const aScore = a.bestScore ?? -1;
        const bScore = b.bestScore ?? -1;
        if (bScore !== aScore) return bScore - aScore;
        return b.submittedCount - a.submittedCount;
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const exportParams = new URLSearchParams();
  if (q) exportParams.set("q", q);
  if (plan) exportParams.set("plan", plan);
  if (taught) exportParams.set("taught", taught);
  if (status) exportParams.set("status", status);
  const exportHref = `/admin/students/export${
    exportParams.toString() ? `?${exportParams.toString()}` : ""
  }`;

  const hasFilters = Boolean(q || plan || taught || status || sort !== "newest");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
            Student Roster
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Students
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Filter cohorts, inspect mock performance, grant Pro access, or manage account approvals.
          </p>
        </div>

        <a
          href={exportHref}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-vermillion/40 hover:text-vermillion"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV ({students.length})
        </a>
      </div>

      {/* Quick KPI filter pills */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/students"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            !hasFilters
              ? "border-vermillion bg-vermillion text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          All students ({totalAll})
        </Link>
        <Link
          href="/admin/students?status=PENDING"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            status === "PENDING"
              ? "border-gold bg-gold text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          Pending ({pendingAll})
        </Link>
        <Link
          href="/admin/students?status=APPROVED"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            status === "APPROVED"
              ? "border-jade bg-jade text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          Approved ({approvedAll})
        </Link>
        <Link
          href="/admin/students?plan=PRO"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            plan === "PRO"
              ? "border-vermillion bg-vermillion text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          Pro / Paid ({proAll})
        </Link>
        <Link
          href="/admin/students?taught=EN"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            taught === "EN"
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          EN Track ({enAll})
        </Link>
        <Link
          href="/admin/students?taught=CN"
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            taught === "CN"
              ? "border-indigo bg-indigo text-white"
              : "border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          CN Track ({cnAll})
        </Link>
      </div>

      {/* Filter Bar */}
      <form
        method="get"
        className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs sm:grid-cols-2 lg:grid-cols-6"
      >
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Name, email, country, WhatsApp…"
            className="h-10 w-full rounded-xl border border-line bg-paper-deep/40 pr-3 pl-9 text-sm text-ink placeholder:text-ink-faint focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>

        <select
          name="status"
          defaultValue={status}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">All statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select
          name="plan"
          defaultValue={plan}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">All plans</option>
          <option value="FREE">Free</option>
          <option value="PRO">Pro</option>
          <option value="LIFETIME">Lifetime</option>
        </select>

        <select
          name="taught"
          defaultValue={taught}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">All tracks</option>
          <option value="EN">EN-taught</option>
          <option value="CN">CN-taught</option>
        </select>

        <div className="flex items-center gap-2">
          <select
            name="sort"
            defaultValue={sort}
            className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="active">Most attempts</option>
            <option value="score">Best score</option>
          </select>
          <button
            type="submit"
            className="h-10 rounded-xl bg-vermillion px-4 text-xs font-semibold text-white transition hover:opacity-95"
          >
            Apply
          </button>
        </div>
      </form>

      {hasFilters ? (
        <div className="flex items-center justify-between text-xs text-ink-soft">
          <span>
            Showing <strong className="text-ink">{students.length}</strong> matching students
          </span>
          <Link href="/admin/students" className="font-medium text-vermillion hover:underline">
            Reset all filters
          </Link>
        </div>
      ) : null}

      {/* Roster Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xs">
        {students.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink-soft">
            No students match the current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="border-b border-line bg-paper-deep/50 text-[11px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Plan</th>
                  <th className="px-3 py-3">Study Track</th>
                  <th className="px-3 py-3">Performance</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-paper-deep/25">
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="font-medium text-ink hover:text-vermillion"
                      >
                        {s.name}
                      </Link>
                      <div className="text-xs text-ink-soft">{s.email}</div>
                      <div className="mt-0.5 text-[11px] text-ink-faint">
                        {s.country ?? "No country"}
                        {s.whatsapp ? ` · WA ${s.whatsapp}` : ""}
                        {` · Joined ${s.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}`}
                      </div>
                    </td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${statusBadge(
                          s.status
                        )}`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${planBadge(
                          s.plan
                        )}`}
                      >
                        {s.plan}
                      </span>
                      {s.proExpiresAt ? (
                        <div className="mt-1 text-[10.5px] text-ink-faint">
                          exp {s.proExpiresAt.toISOString().slice(0, 10)}
                        </div>
                      ) : null}
                    </td>

                    <td className="px-3 py-3.5 text-xs text-ink-soft">
                      <div className="font-medium text-ink">
                        {s.teachingTrack}-taught
                      </div>
                      <div className="text-[11px] text-ink-faint">
                        {s.track ?? "Undecided"}
                        {s.targetYear ? ` · ${s.targetYear}` : ""}
                      </div>
                    </td>

                    <td className="px-3 py-3.5 text-xs tabular-nums">
                      <div className="font-medium text-ink">
                        {s.submittedCount} mock{s.submittedCount === 1 ? "" : "s"}
                      </div>
                      <div className="text-[11px] text-ink-soft">
                        Best:{" "}
                        {s.bestScore !== null ? (
                          <span className="font-semibold text-jade">{s.bestScore}/100</span>
                        ) : (
                          "—"
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {s.status !== "APPROVED" ? (
                          <form action={updateStudentAccessAction}>
                            <input type="hidden" name="userId" value={s.id} />
                            <input type="hidden" name="status" value="APPROVED" />
                            <button
                              type="submit"
                              className="rounded-lg border border-jade/30 bg-jade/10 px-2.5 py-1 text-[11.5px] font-semibold text-jade transition hover:bg-jade hover:text-white"
                            >
                              Approve
                            </button>
                          </form>
                        ) : null}

                        {s.plan === "FREE" ? (
                          <form action={updateStudentAccessAction}>
                            <input type="hidden" name="userId" value={s.id} />
                            <input type="hidden" name="plan" value="PRO" />
                            <button
                              type="submit"
                              className="rounded-lg border border-vermillion/30 bg-vermillion/10 px-2.5 py-1 text-[11.5px] font-semibold text-vermillion transition hover:bg-vermillion hover:text-white"
                            >
                              Grant Pro
                            </button>
                          </form>
                        ) : null}

                        <Link
                          href={`/admin/students/${s.id}`}
                          className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink transition hover:border-ink/30"
                        >
                          Manage →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
