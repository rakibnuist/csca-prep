import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  LogOut,
  ShieldCheck,
  Ticket,
  Trash2,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  deleteStudentAttemptAdminAction,
  resetStudentPasswordAdminAction,
  revokeStudentSessionsAction,
  updateStudentAccessAction,
  updateStudentProfileAdminAction,
} from "@/lib/actions/admin-students";

export const dynamic = "force-dynamic";

function formatDuration(seconds: number) {
  if (!seconds || seconds <= 0) return "—";
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

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

export default async function AdminStudentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { notice, error } = await searchParams;

  const student = await prisma.user.findUnique({
    where: { id },
    include: {
      attempts: {
        orderBy: { startedAt: "desc" },
        take: 25,
        include: {
          mock: {
            select: { id: true, title: true, subjectCode: true, slug: true },
          },
        },
      },
      planTasks: {
        orderBy: [{ done: "asc" }, { order: "asc" }],
        take: 15,
      },
      redemptions: {
        include: { coupon: true },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          attempts: true,
          reviews: true,
          planTasks: true,
          redemptions: true,
        },
      },
    },
  });

  if (!student) notFound();

  const submittedAttempts = student.attempts.filter(
    (a) => a.status === "SUBMITTED"
  );
  const submittedAvg =
    submittedAttempts.length > 0
      ? Math.round(
          submittedAttempts.reduce((acc, a) => acc + a.score, 0) /
            submittedAttempts.length
        )
      : null;
  const bestScore =
    submittedAttempts.length > 0
      ? Math.max(...submittedAttempts.map((a) => a.score))
      : null;
  const doneTasks = student.planTasks.filter((t) => t.done).length;

  return (
    <div className="space-y-7">
      <div>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition hover:text-vermillion"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to students
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                {student.name}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${statusBadge(
                  student.status
                )}`}
              >
                {student.status}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${planBadge(
                  student.plan
                )}`}
              >
                {student.plan}
              </span>
              <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-ink-soft">
                {student.teachingTrack}-taught
              </span>
              {student.role === "ADMIN" ? (
                <span className="rounded-full border border-indigo/30 bg-indigo/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-indigo uppercase">
                  ADMIN
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              {student.email} · Joined{" "}
              {student.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {student.emailVerifiedAt ? " · Email verified" : " · Email unverified"}
            </p>
          </div>
        </div>
      </div>

      {notice ? (
        <div className="rounded-xl border border-jade/30 bg-jade/10 px-4 py-2.5 text-sm font-medium text-jade">
          {notice}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      {/* KPI Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Submitted Mocks
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-ink">
            {submittedAttempts.length}
            <span className="ml-1.5 text-xs font-normal text-ink-faint">
              / {student._count.attempts} total
            </span>
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Avg score: {submittedAvg !== null ? `${submittedAvg}/100` : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Best Score
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-jade">
            {bestScore !== null ? `${bestScore}/100` : "—"}
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Target year: {student.targetYear ?? "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Review &amp; Plan
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-ink">
            {student._count.reviews}
            <span className="ml-1.5 text-xs font-normal text-ink-soft">
              flagged items
            </span>
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Plan tasks: {doneTasks}/{student._count.planTasks} done
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Contact &amp; Region
          </p>
          <p className="mt-2 truncate font-display text-xl font-semibold text-ink">
            {student.country ?? "Not set"}
          </p>
          <p className="mt-1 truncate text-xs text-ink-soft">
            WhatsApp: {student.whatsapp ?? "Not set"}
          </p>
        </div>
      </div>

      {/* 3 Admin Management Cards */}
      {student.role === "STUDENT" ? (
        <section className="grid gap-5 lg:grid-cols-3">
          {/* Card 1: Plan & Access */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-vermillion" />
              <h2 className="font-display text-lg font-semibold text-ink">
                Plan &amp; Access
              </h2>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Approve/suspend login access and set subscription tier.
            </p>

            <form action={updateStudentAccessAction} className="mt-4 space-y-3.5">
              <input type="hidden" name="userId" value={student.id} />
              <input type="hidden" name="withFeedback" value="1" />

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Account Status
                </label>
                <select
                  name="status"
                  defaultValue={student.status}
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="REJECTED">REJECTED (revokes session)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Subscription Plan
                </label>
                <select
                  name="plan"
                  defaultValue={student.plan}
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                >
                  <option value="FREE">FREE</option>
                  <option value="PRO">PRO</option>
                  <option value="LIFETIME">LIFETIME</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Pro Expiry Date (optional)
                </label>
                <input
                  type="date"
                  name="proExpiresAt"
                  defaultValue={
                    student.proExpiresAt
                      ? student.proExpiresAt.toISOString().slice(0, 10)
                      : ""
                  }
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                />
              </div>

              {student.reviewedAt ? (
                <p className="text-[11px] text-ink-faint">
                  Last reviewed {student.reviewedAt.toISOString().slice(0, 10)}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-vermillion px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95"
              >
                Save Access &amp; Plan
              </button>
            </form>
          </div>

          {/* Card 2: Study Profile Editor */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
            <h2 className="font-display text-lg font-semibold text-ink">
              Study Profile Editor
            </h2>
            <p className="mt-1 text-xs text-ink-soft">
              Update student contact details, CSCA track, and language preferences.
            </p>

            <form action={updateStudentProfileAdminAction} className="mt-4 space-y-3">
              <input type="hidden" name="userId" value={student.id} />

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  defaultValue={student.name ?? ""}
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    Country
                  </label>
                  <input
                    name="country"
                    defaultValue={student.country ?? ""}
                    placeholder="Bangladesh"
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    WhatsApp
                  </label>
                  <input
                    name="whatsapp"
                    defaultValue={student.whatsapp ?? ""}
                    placeholder="+880..."
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    Teaching Track
                  </label>
                  <select
                    name="teachingTrack"
                    defaultValue={student.teachingTrack}
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-sm text-ink focus:border-vermillion focus:outline-none"
                  >
                    <option value="EN">EN-taught</option>
                    <option value="CN">CN-taught</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    Target Stream
                  </label>
                  <select
                    name="track"
                    defaultValue={student.track ?? ""}
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-sm text-ink focus:border-vermillion focus:outline-none"
                  >
                    <option value="">Undecided</option>
                    <option value="STEM">STEM</option>
                    <option value="HUMANITIES">HUMANITIES</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    Intake Yr
                  </label>
                  <input
                    type="number"
                    name="targetYear"
                    min={2024}
                    max={2035}
                    defaultValue={student.targetYear ?? ""}
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-sm text-ink focus:border-vermillion focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    Paper Lang
                  </label>
                  <select
                    name="testLanguage"
                    defaultValue={student.testLanguage}
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2 text-sm text-ink focus:border-vermillion focus:outline-none"
                  >
                    <option value="EN">EN</option>
                    <option value="ZH">ZH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    UI Locale
                  </label>
                  <select
                    name="uiLocale"
                    defaultValue={student.uiLocale}
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2 text-sm text-ink focus:border-vermillion focus:outline-none"
                  >
                    <option value="en">en</option>
                    <option value="zh">zh</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl border border-line bg-paper-deep/60 px-4 py-2 text-xs font-semibold text-ink transition hover:border-vermillion/40 hover:text-vermillion"
              >
                Save Study Profile
              </button>
            </form>
          </div>

          {/* Card 3: Security & Sessions */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-indigo" />
                <h2 className="font-display text-lg font-semibold text-ink">
                  Security &amp; Sessions
                </h2>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Reset student password or force sign-out across all devices (token v
                {student.tokenVersion}).
              </p>

              <form action={resetStudentPasswordAdminAction} className="mt-4 space-y-3">
                <input type="hidden" name="userId" value={student.id} />
                <div>
                  <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="Minimum 8 characters"
                    className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  Reset Password &amp; Sign Out
                </button>
              </form>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <form action={revokeStudentSessionsAction}>
                <input type="hidden" name="userId" value={student.id} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Revoke All Active Sessions
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : null}

      {/* Attempts History */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Recent Papers &amp; Attempts
            </h2>
            <p className="text-xs text-ink-soft">
              Latest 25 mock sessions. Deleting a test or stuck attempt lets the student start fresh.
            </p>
          </div>
          <span className="text-xs text-ink-faint tabular-nums">
            {student.attempts.length} shown
          </span>
        </div>

        {student.attempts.length === 0 ? (
          <p className="mt-5 text-sm text-ink-soft">No mock attempts yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-line text-[11px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                <tr>
                  <th className="py-2.5 pr-4">Mock Paper</th>
                  <th className="px-3 py-2.5">Track</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Score</th>
                  <th className="px-3 py-2.5">Duration</th>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="py-2.5 pl-3 text-right">Reset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {student.attempts.map((a) => (
                  <tr key={a.id} className="hover:bg-paper-deep/25">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/admin/mocks/${a.mock.id}`}
                        className="font-medium text-ink hover:text-vermillion"
                      >
                        {a.mock.title}
                      </Link>
                      <div className="text-[11px] text-ink-faint">{a.mock.subjectCode}</div>
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-ink-soft">
                      {a.track}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          a.status === "SUBMITTED"
                            ? "border-jade/25 bg-jade/10 text-jade"
                            : "border-gold/30 bg-gold/10 text-gold"
                        }`}
                      >
                        {a.status === "SUBMITTED" ? "Submitted" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular-nums">
                      {a.status === "SUBMITTED" ? (
                        <div>
                          <span className="font-semibold text-ink">{a.score}/100</span>
                          <span className="ml-1.5 text-xs text-ink-faint">
                            ({a.rawScore}/{a.totalQuestions})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-ink-faint">
                          {a.answeredCount}/{a.totalQuestions} answered
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-xs tabular-nums text-ink-soft">
                      {formatDuration(a.durationSec)}
                    </td>
                    <td className="px-3 py-3 text-xs text-ink-soft">
                      {(a.completedAt ?? a.startedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 pl-3 text-right">
                      {student.role === "STUDENT" ? (
                        <form action={deleteStudentAttemptAdminAction}>
                          <input type="hidden" name="attemptId" value={a.id} />
                          <input type="hidden" name="userId" value={student.id} />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[11px] text-ink-soft transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                            title="Delete attempt"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </form>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Bottom: Coupon Redemptions + Study Plan Tasks */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-jade" />
              <h2 className="font-display text-lg font-semibold text-ink">
                Coupon Redemptions
              </h2>
            </div>
            <Link href="/admin/coupons" className="text-xs font-medium text-vermillion hover:underline">
              All coupons →
            </Link>
          </div>
          {student.redemptions.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No coupon codes redeemed.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {student.redemptions.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <span className="rounded bg-paper-deep px-2 py-0.5 font-mono text-xs font-semibold text-ink">
                      {r.coupon.code}
                    </span>
                    <span className="ml-2 text-xs text-ink-soft">
                      {r.coupon.kind === "LIFETIME"
                        ? "Lifetime access"
                        : r.coupon.kind === "PRO_MONTHS"
                          ? `+${r.coupon.value} month(s) PRO`
                          : `${r.coupon.value}% discount`}
                    </span>
                  </div>
                  <span className="text-xs text-ink-faint">
                    {r.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Study Plan Tasks
            </h2>
            <span className="text-xs text-ink-faint tabular-nums">
              {doneTasks}/{student._count.planTasks} completed
            </span>
          </div>
          {student.planTasks.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No study plan tasks yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {student.planTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        t.done ? "text-jade" : "text-ink-faint/40"
                      }`}
                    />
                    <span
                      className={`truncate text-sm ${
                        t.done ? "text-ink-faint line-through" : "text-ink"
                      }`}
                    >
                      {t.title}
                    </span>
                  </div>
                  <span className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-faint uppercase">
                    {t.phase}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
