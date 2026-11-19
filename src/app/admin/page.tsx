import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileStack,
  Mail,
  Ticket,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { SUBJECTS } from "@/lib/exam";

export const dynamic = "force-dynamic";

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return "—";
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function scoreTone(score: number | null) {
  if (score === null) return "border-line bg-paper-deep text-ink-soft";
  if (score >= 75) return "border-jade/25 bg-jade/10 text-jade";
  if (score >= 50) return "border-gold/25 bg-gold/10 text-gold";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

function planBadge(plan: string) {
  if (plan === "LIFETIME") return "border-indigo/25 bg-indigo/10 text-indigo";
  if (plan === "PRO") return "border-vermillion/25 bg-vermillion/10 text-vermillion";
  return "border-line bg-paper-deep text-ink-soft";
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 13)
  );

  const [
    totalStudents,
    students7d,
    pendingStudents,
    proStudents,
    submittedAttempts,
    submitted7d,
    inProgressAttempts,
    avgScoreAgg,
    activeQuestions,
    bilingualQuestions,
    diagramQuestions,
    publishedMocks,
    draftMocks,
    totalLeads,
    newLeads,
    p1Leads,
    convertedLeads,
    activeCoupons,
    totalRedemptions,
    recentSignups14d,
    recentAttempts14d,
    trackGroups,
    planGroups,
    countryGroups,
    recentSubmissions,
    newestStudents,
    questionBySubject,
    bilingualBySubject,
    diagramBySubject,
    mockBySubject,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "STUDENT", createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.count({ where: { role: "STUDENT", status: "PENDING" } }),
    prisma.user.count({
      where: { role: "STUDENT", plan: { in: ["PRO", "LIFETIME"] } },
    }),
    prisma.attempt.count({ where: { status: "SUBMITTED" } }),
    prisma.attempt.count({
      where: { status: "SUBMITTED", completedAt: { gte: sevenDaysAgo } },
    }),
    prisma.attempt.count({ where: { status: "IN_PROGRESS" } }),
    prisma.attempt.aggregate({
      where: { status: "SUBMITTED" },
      _avg: { score: true },
    }),
    prisma.question.count({ where: { active: true } }),
    prisma.question.count({ where: { active: true, stemZh: { not: null } } }),
    prisma.question.count({ where: { active: true, figure: { not: null } } }),
    prisma.mock.count({ where: { published: true } }),
    prisma.mock.count({ where: { published: false } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({
      where: { priority: "P1", status: { in: ["NEW", "CONTACTED"] } },
    }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.coupon.count({ where: { active: true } }),
    prisma.redemption.count(),
    prisma.user.findMany({
      where: { role: "STUDENT", createdAt: { gte: fourteenDaysStart } },
      select: { createdAt: true },
    }),
    prisma.attempt.findMany({
      where: { status: "SUBMITTED", completedAt: { gte: fourteenDaysStart } },
      select: { completedAt: true },
    }),
    prisma.user.groupBy({
      by: ["teachingTrack"],
      where: { role: "STUDENT" },
      _count: { _all: true },
    }),
    prisma.user.groupBy({
      by: ["plan"],
      where: { role: "STUDENT" },
      _count: { _all: true },
    }),
    prisma.user.groupBy({
      by: ["country"],
      where: { role: "STUDENT", country: { not: null } },
      _count: { _all: true },
    }),
    prisma.attempt.findMany({
      where: { status: "SUBMITTED" },
      orderBy: { completedAt: "desc" },
      take: 8,
      select: {
        id: true,
        score: true,
        rawScore: true,
        totalQuestions: true,
        durationSec: true,
        track: true,
        completedAt: true,
        user: { select: { id: true, name: true, email: true } },
        mock: { select: { id: true, title: true, subjectCode: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        whatsapp: true,
        teachingTrack: true,
        plan: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.question.groupBy({
      by: ["subjectCode", "active"],
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { active: true, stemZh: { not: null } },
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { active: true, figure: { not: null } },
      _count: { _all: true },
    }),
    prisma.mock.groupBy({
      by: ["subjectCode", "published"],
      _count: { _all: true },
    }),
  ]);

  const avgScore =
    avgScoreAgg._avg.score !== null ? Math.round(avgScoreAgg._avg.score) : null;

  // Build 14-day UTC buckets
  const signupDayMap = new Map<string, number>();
  for (const row of recentSignups14d) {
    const key = row.createdAt.toISOString().slice(0, 10);
    signupDayMap.set(key, (signupDayMap.get(key) ?? 0) + 1);
  }
  const submissionDayMap = new Map<string, number>();
  for (const row of recentAttempts14d) {
    if (!row.completedAt) continue;
    const key = row.completedAt.toISOString().slice(0, 10);
    submissionDayMap.set(key, (submissionDayMap.get(key) ?? 0) + 1);
  }

  const days = Array.from({ length: 14 }, (_, idx) => {
    const d = new Date(
      Date.UTC(
        fourteenDaysStart.getUTCFullYear(),
        fourteenDaysStart.getUTCMonth(),
        fourteenDaysStart.getUTCDate() + idx
      )
    );
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return {
      key,
      label,
      signups: signupDayMap.get(key) ?? 0,
      submissions: submissionDayMap.get(key) ?? 0,
    };
  });
  const maxDaily = Math.max(
    1,
    ...days.map((d) => Math.max(d.signups, d.submissions))
  );

  // Cohort breakdowns
  const enTrackCount =
    trackGroups.find((g) => g.teachingTrack === "EN")?._count._all ?? 0;
  const cnTrackCount =
    trackGroups.find((g) => g.teachingTrack === "CN")?._count._all ?? 0;

  const freePlanCount =
    planGroups.find((g) => g.plan === "FREE")?._count._all ?? 0;
  const proPlanCount =
    planGroups.find((g) => g.plan === "PRO")?._count._all ?? 0;
  const lifetimePlanCount =
    planGroups.find((g) => g.plan === "LIFETIME")?._count._all ?? 0;

  const topCountries = countryGroups
    .filter((c) => Boolean(c.country))
    .map((c) => ({ country: c.country ?? "Unknown", count: c._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const subjectCoverage = SUBJECTS.map((sub) => {
    const active =
      questionBySubject.find((g) => g.subjectCode === sub.code && g.active)
        ?._count._all ?? 0;
    const inactive =
      questionBySubject.find((g) => g.subjectCode === sub.code && !g.active)
        ?._count._all ?? 0;
    const bilingual =
      bilingualBySubject.find((g) => g.subjectCode === sub.code)?._count._all ??
      0;
    const diagrams =
      diagramBySubject.find((g) => g.subjectCode === sub.code)?._count._all ??
      0;
    const publishedCount =
      mockBySubject.find((g) => g.subjectCode === sub.code && g.published)
        ?._count._all ?? 0;
    const draftCount =
      mockBySubject.find((g) => g.subjectCode === sub.code && !g.published)
        ?._count._all ?? 0;
    const readinessPct = Math.min(
      100,
      Math.round((active / sub.questionCount) * 100)
    );
    return {
      ...sub,
      active,
      inactive,
      bilingual,
      diagrams,
      publishedCount,
      draftCount,
      readinessPct,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header & quick actions */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
            Operations Overview
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            CSCA Master Control Room
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Live cohort growth, mock exam submissions, bilingual bank health, and admissions leads.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {pendingStudents > 0 ? (
            <Link
              href="/admin/students?status=PENDING"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-1.5 text-[12px] font-semibold text-gold transition hover:bg-gold/15"
            >
              {pendingStudents} pending approval
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink transition hover:border-ink/25"
          >
            Manage bank
          </Link>
          <Link
            href="/admin/mocks"
            className="inline-flex items-center gap-1.5 rounded-lg bg-vermillion px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-xs transition hover:opacity-95"
          >
            Mock builder
          </Link>
        </div>
      </div>

      {/* 6 KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/students"
          className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-vermillion/35"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Students
            </span>
            <span className="rounded-lg bg-vermillion/10 p-1.5 text-vermillion">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {totalStudents}
            </span>
            <span className="rounded-full bg-jade/10 px-2 py-0.5 text-[11px] font-medium text-jade tabular-nums">
              +{students7d} in 7d
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>Pro / Lifetime: {proStudents}</span>
            <span>·</span>
            <span className={pendingStudents > 0 ? "font-semibold text-gold" : ""}>
              Pending: {pendingStudents}
            </span>
          </div>
        </Link>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Mock Submissions
            </span>
            <span className="rounded-lg bg-jade/10 p-1.5 text-jade">
              <ClipboardCheck className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {submittedAttempts}
            </span>
            <span className="rounded-full bg-jade/10 px-2 py-0.5 text-[11px] font-medium text-jade tabular-nums">
              +{submitted7d} in 7d
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>Avg score: {avgScore !== null ? `${avgScore}/100` : "—"}</span>
            <span>·</span>
            <span>In progress: {inProgressAttempts}</span>
          </div>
        </div>

        <Link
          href="/admin/content"
          className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-vermillion/35"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Question Bank
            </span>
            <span className="rounded-lg bg-indigo/10 p-1.5 text-indigo">
              <BookOpen className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {activeQuestions}
            </span>
            <span className="text-[11.5px] text-ink-soft">active items</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>Bilingual (ZH): {bilingualQuestions}</span>
            <span>·</span>
            <span>With diagrams: {diagramQuestions}</span>
          </div>
        </Link>

        <Link
          href="/admin/mocks"
          className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-vermillion/35"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Mock Papers
            </span>
            <span className="rounded-lg bg-ink/8 p-1.5 text-ink">
              <FileStack className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {publishedMocks}
            </span>
            <span className="text-[11.5px] text-ink-soft">published live</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>Drafts: {draftMocks}</span>
            <span>·</span>
            <span className="text-vermillion group-hover:underline">Open builder →</span>
          </div>
        </Link>

        <Link
          href="/admin/leads"
          className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-vermillion/35"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Counseling Leads
            </span>
            <span className="rounded-lg bg-gold/12 p-1.5 text-gold">
              <Mail className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {totalLeads}
            </span>
            {newLeads > 0 ? (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold tabular-nums">
                {newLeads} new
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>P1 open: {p1Leads}</span>
            <span>·</span>
            <span>Converted: {convertedLeads}</span>
          </div>
        </Link>

        <Link
          href="/admin/coupons"
          className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-vermillion/35"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Coupons & Redemptions
            </span>
            <span className="rounded-lg bg-jade/10 p-1.5 text-jade">
              <Ticket className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums text-ink">
              {totalRedemptions}
            </span>
            <span className="text-[11.5px] text-ink-soft">redemptions</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-ink-soft">
            <span>Active codes: {activeCoupons}</span>
            <span>·</span>
            <span className="text-vermillion group-hover:underline">Manage codes →</span>
          </div>
        </Link>
      </section>

      {/* Activity Chart + Cohort Breakdown */}
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                14-Day Platform Activity
              </h2>
              <p className="text-xs text-ink-soft">
                Daily student registrations and submitted mock exams (UTC).
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-vermillion" />
                Signups
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-jade" />
                Submissions
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-14 items-end gap-1.5 border-b border-line pb-2" style={{ height: 150 }}>
            {days.map((day) => {
              const signupPct = Math.round((day.signups / maxDaily) * 100);
              const subPct = Math.round((day.submissions / maxDaily) * 100);
              return (
                <div
                  key={day.key}
                  className="group flex h-full flex-col items-center justify-end gap-1"
                  title={`${day.label}: ${day.signups} signups, ${day.submissions} submissions`}
                >
                  <div className="flex h-full w-full items-end justify-center gap-0.5">
                    <div
                      className="w-2 rounded-t bg-vermillion/90 transition-all group-hover:bg-vermillion"
                      style={{
                        height: `${day.signups > 0 ? Math.max(8, signupPct) : 2}%`,
                        opacity: day.signups > 0 ? 1 : 0.18,
                      }}
                    />
                    <div
                      className="w-2 rounded-t bg-jade/90 transition-all group-hover:bg-jade"
                      style={{
                        height: `${day.submissions > 0 ? Math.max(8, subPct) : 2}%`,
                        opacity: day.submissions > 0 ? 1 : 0.18,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between text-[10.5px] text-ink-faint">
            <span>{days[0]?.label}</span>
            <span>{days[Math.floor(days.length / 2)]?.label}</span>
            <span>{days[days.length - 1]?.label}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs lg:col-span-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Cohort & Plan Breakdown
          </h2>
          <p className="text-xs text-ink-soft">
            Student teaching tracks, subscription tiers, and top countries.
          </p>

          <div className="mt-5 space-y-5">
            {/* Teaching Track */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-ink">
                <span>Teaching Track</span>
                <span className="tabular-nums text-ink-soft">
                  EN {enTrackCount} · CN {cnTrackCount}
                </span>
              </div>
              <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-paper-deep">
                <div
                  className="bg-vermillion"
                  style={{
                    width: `${
                      totalStudents > 0 ? Math.round((enTrackCount / totalStudents) * 100) : 50
                    }%`,
                  }}
                />
                <div
                  className="bg-indigo"
                  style={{
                    width: `${
                      totalStudents > 0 ? Math.round((cnTrackCount / totalStudents) * 100) : 50
                    }%`,
                  }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-faint">
                <span>English-taught (EN)</span>
                <span>Chinese-taught (CN)</span>
              </div>
            </div>

            {/* Plans */}
            <div>
              <p className="text-xs font-medium text-ink">Plans</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-line bg-paper-deep/50 px-3 py-2">
                  <p className="text-[10.5px] text-ink-faint uppercase">Free</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-ink">
                    {freePlanCount}
                  </p>
                </div>
                <div className="rounded-xl border border-vermillion/20 bg-vermillion/6 px-3 py-2">
                  <p className="text-[10.5px] font-semibold text-vermillion uppercase">Pro</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-ink">
                    {proPlanCount}
                  </p>
                </div>
                <div className="rounded-xl border border-indigo/20 bg-indigo/6 px-3 py-2">
                  <p className="text-[10.5px] font-semibold text-indigo uppercase">Lifetime</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-ink">
                    {lifetimePlanCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Top Countries */}
            <div>
              <p className="text-xs font-medium text-ink">Top Student Countries</p>
              {topCountries.length === 0 ? (
                <p className="mt-2 text-xs text-ink-faint">No country data yet.</p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {topCountries.map((c) => (
                    <span
                      key={c.country}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-deep/50 px-2.5 py-1 text-[11.5px] text-ink"
                    >
                      <span>{c.country}</span>
                      <span className="font-semibold tabular-nums text-ink-soft">
                        {c.count}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Submissions & Newest Students */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Recent Submissions
            </h2>
            <span className="text-[11px] text-ink-faint">Latest 8 completed papers</span>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">No submitted mocks yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {recentSubmissions.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/students/${a.user.id}`}
                        className="truncate text-sm font-medium text-ink hover:text-vermillion"
                      >
                        {a.user.name}
                      </Link>
                      <span className="rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                        {a.track}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">
                      {a.mock.subjectCode} · {a.mock.title}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5 text-right">
                    <span className="hidden items-center gap-1 text-[11px] text-ink-faint sm:inline-flex">
                      <Clock className="h-3 w-3" />
                      {formatDuration(a.durationSec)}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums ${scoreTone(
                        a.score
                      )}`}
                    >
                      {a.score !== null ? `${a.score}/100` : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Newest Students
            </h2>
            <Link
              href="/admin/students"
              className="text-xs font-medium text-vermillion hover:underline"
            >
              View all ({totalStudents}) →
            </Link>
          </div>
          {newestStudents.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">No students registered yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {newestStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="truncate text-sm font-medium text-ink hover:text-vermillion"
                      >
                        {s.name}
                      </Link>
                      <span
                        className={`rounded-full border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase ${planBadge(
                          s.plan
                        )}`}
                      >
                        {s.plan}
                      </span>
                      <span className="rounded border border-line px-1.5 py-0.5 text-[9.5px] font-medium text-ink-soft">
                        {s.teachingTrack}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">
                      {s.email}
                      {s.country ? ` · ${s.country}` : ""}
                      {s.whatsapp ? ` · WA ${s.whatsapp}` : ""}
                    </p>
                  </div>
                  <Link
                    href={`/admin/students/${s.id}`}
                    className="shrink-0 rounded-lg border border-line bg-paper-deep/50 px-2.5 py-1 text-xs font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                  >
                    Manage →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subject Question Bank & Paper Coverage */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Subject Question Bank &amp; Paper Coverage
            </h2>
            <p className="text-xs text-ink-soft">
              Active items compared against single official CSCA paper capacity (48 items Fundamentals, 80 items Chinese).
            </p>
          </div>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1 text-xs font-medium text-vermillion hover:underline"
          >
            Inspect question bank
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                <th className="py-2.5 pr-4">Subject</th>
                <th className="py-2.5 px-3">Active Bank</th>
                <th className="py-2.5 px-3">Bilingual ZH</th>
                <th className="py-2.5 px-3">Diagrams</th>
                <th className="py-2.5 px-3">Papers (Live / Draft)</th>
                <th className="py-2.5 pl-3">1-Paper Fill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {subjectCoverage.map((row) => (
                <tr key={row.code} className="hover:bg-paper-deep/30">
                  <td className="py-3 pr-4">
                    <div className="font-medium text-ink">{row.nameEn}</div>
                    <div className="text-xs text-ink-faint">
                      {row.code} · {row.questionCount}Q / {row.durationMin}m
                    </div>
                  </td>
                  <td className="px-3 py-3 tabular-nums">
                    <span className="font-semibold text-ink">{row.active}</span>
                    {row.inactive > 0 ? (
                      <span className="ml-1.5 text-xs text-ink-faint">
                        ({row.inactive} paused)
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 tabular-nums text-ink-soft">
                    {row.bilingual}
                  </td>
                  <td className="px-3 py-3 tabular-nums text-ink-soft">
                    {row.diagrams}
                  </td>
                  <td className="px-3 py-3 tabular-nums">
                    <span className="inline-flex items-center gap-1 font-medium text-jade">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {row.publishedCount}
                    </span>
                    <span className="mx-1.5 text-ink-faint">/</span>
                    <span className="text-ink-soft">{row.draftCount}</span>
                  </td>
                  <td className="py-3 pl-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-paper-deep">
                        <div
                          className="h-full rounded-full bg-vermillion"
                          style={{ width: `${row.readinessPct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium tabular-nums text-ink-soft">
                        {row.readinessPct}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
