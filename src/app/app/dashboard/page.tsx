import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  Play,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";
import { ScoreTrend } from "@/components/charts/score-trend";
import { TopicMastery } from "@/components/charts/topic-mastery";
import { estimatePercentile, readinessScore, scoreBand, SUBJECTS, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { EXAM_SITTINGS } from "@/lib/site";
import { cn, daysUntil, formatDate, ordinal } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await requireUser();
  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;

  const [attempts, inProgress, dueReviews, reviewCards, tasks, mockCount] = await Promise.all([
    prisma.attempt.findMany({
      where: { userId: user.id, status: "SUBMITTED" },
      include: { mock: { include: { subject: true } } },
      orderBy: { completedAt: "desc" },
      take: 12,
    }),
    prisma.attempt.findMany({
      where: { userId: user.id, status: "IN_PROGRESS" },
      include: { mock: { include: { subject: true } } },
      orderBy: { startedAt: "desc" },
      take: 1,
    }),
    prisma.reviewItem.count({
      where: { userId: user.id, nextReviewAt: { lte: new Date() } },
    }),
    prisma.reviewItem.count({ where: { userId: user.id } }),
    prisma.planTask.findMany({
      where: { userId: user.id },
      orderBy: [{ done: "asc" }, { order: "asc" }],
      take: 4,
    }),
    prisma.mock.count({ where: { published: true } }),
  ]);

  const nextSitting =
    EXAM_SITTINGS.find((sitting) => sitting.status !== "closed" && daysUntil(sitting.date) >= 0) ??
    EXAM_SITTINGS[EXAM_SITTINGS.length - 1];
  const days = daysUntil(nextSitting.date);

  const scores = attempts.map((attempt) => attempt.score);
  const best = scores.length ? Math.max(...scores) : 0;
  const average = scores.length
    ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length)
    : 0;
  const latest = attempts[0];

  // topic mastery across the most recent five papers
  const topicMap = new Map<string, { code: string; title: string; correct: number; total: number }>();
  for (const attempt of attempts.slice(0, 5)) {
    const breakdown = (attempt.topicBreakdown ?? {}) as Record<
      string,
      { code: string; title: string; correct: number; total: number }
    >;
    for (const entry of Object.values(breakdown)) {
      const existing = topicMap.get(entry.code) ?? {
        code: entry.code,
        title: entry.title,
        correct: 0,
        total: 0,
      };
      existing.correct += entry.correct;
      existing.total += entry.total;
      topicMap.set(entry.code, existing);
    }
  }

  const mastery = [...topicMap.values()]
    .map((entry) => ({
      code: entry.code,
      title: entry.title.length > 26 ? `${entry.title.slice(0, 24)}…` : entry.title,
      mastery: Math.round((entry.correct / entry.total) * 100),
    }))
    .sort((a, b) => a.mastery - b.mastery);

  const questionsAnswered = attempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const readiness = readinessScore({
    recentScores: scores,
    topicsPracticed: topicMap.size,
    topicsTotal: 50,
    questionsAnswered,
  });
  const band = scoreBand(readiness);

  const trend = [...attempts]
    .reverse()
    .map((attempt, index) => ({
      label: `#${index + 1}`,
      score: attempt.score,
    }));

  const attemptedSubjects = new Set(attempts.map((attempt) => attempt.mock.subjectCode));
  const recommended = await prisma.mock.findMany({
    where: {
      published: true,
      subjectCode: { in: SUBJECTS.filter((subject) => !attemptedSubjects.has(subject.code)).map((s) => s.code) },
      attempts: { none: { userId: user.id, status: "SUBMITTED" } },
    },
    include: { subject: true, items: { select: { id: true } } },
    take: 3,
  });

  return (
    <AppBody className="max-w-[1120px]">
      {/* greeting */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="display-md mt-2">
            {user.name ? `Welcome back, ${user.name.split(" ")[0]}.` : "Welcome back."}
          </h1>
          <p className="mt-1.5 text-[13px] text-ink-soft">
            Target intake <span className="font-medium text-ink">{user.targetYear}</span> ·{" "}
            {attempts.length} paper{attempts.length === 1 ? "" : "s"} completed ·{" "}
            {mastery.length} topics measured
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/app/practice"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            <Target className="h-3.5 w-3.5" /> Drill a topic
          </Link>
          <Link
            href="/app/mocks"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-3.5 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
          >
            <Play className="h-3.5 w-3.5" /> New mock
          </Link>
        </div>
      </div>

      {/* continue */}
      {inProgress[0] && (
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Clock3 className="h-4 w-4 text-gold" />
            <p className="text-[12.5px] text-ink">
              <span className="font-medium">{inProgress[0].mock.title}</span> is in progress — the
              timer is still running.
            </p>
          </div>
          <Link
            href={`/exam/${inProgress[0].mock.slug}`}
            className="inline-flex h-8 items-center gap-1 rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
          >
            Resume <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-5">
          {/* score trend */}
          <section className="panel p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Score trend</p>
                <p className="mt-1 font-display text-xl text-ink">
                  {attempts.length ? `Latest ${latest?.score}/100` : "No papers yet"}
                </p>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-[10px] text-ink-faint uppercase">Best</p>
                  <p className="font-display text-lg text-ink tabular">{attempts.length ? best : "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-ink-faint uppercase">Avg</p>
                  <p className="font-display text-lg text-ink tabular">{attempts.length ? average : "—"}</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <ScoreTrend data={trend} />
            </div>
            {latest && (
              <p className="mt-2 text-[11px] text-ink-faint">
                Last paper: {latest.mock.subject.nameEn} · {formatDate(latest.completedAt ?? latest.startedAt)}{" "}
                · estimated{" "}
                {ordinal(
                  estimatePercentile(
                    latest.score,
                    SUBJECT_MAP[latest.mock.subjectCode as SubjectCode]?.kind ?? "FUNDAMENTAL",
                  ),
                )}{" "}
                percentile
              </p>
            )}
          </section>

          {/* mastery */}
          <section className="panel p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Topic mastery</p>
                <p className="mt-1 font-display text-xl text-ink">Where the marks leak</p>
              </div>
              <Link href="/app/practice" className="text-[11.5px] text-ink-soft hover:text-ink">
                Practice →
              </Link>
            </div>
            <div className="mt-2">
              <TopicMastery data={mastery.slice(0, 7)} />
            </div>
          </section>

          {/* recommended */}
          <section>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl text-ink">Papers to sit next</h2>
              <Link href="/app/mocks" className="text-[11.5px] text-ink-soft hover:text-ink">
                All {mockCount} papers →
              </Link>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {recommended.length === 0 && (
                <div className="panel col-span-2 p-4 text-[12.5px] text-ink-soft">
                  You have sat a paper in every subject. Retake your weakest one, or drill the topics
                  you missed.
                </div>
              )}
              {recommended.map((mock) => (
                <Link
                  key={mock.id}
                  href={`/app/mocks/${mock.slug}`}
                  className="group panel flex items-center justify-between p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div>
                    <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                      {mock.subject.shortEn}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-ink">{mock.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">
                      {mock.items.length} Q · {mock.durationMin} min
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:text-vermillion" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* right rail */}
        <div className="space-y-4">
          <section className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Readiness</p>
              <Pill tone={readiness >= 70 ? "jade" : readiness >= 50 ? "gold" : "red"}>{band.label}</Pill>
            </div>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative h-[92px] w-[92px] shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f4ede1" strokeWidth="9" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={readiness >= 70 ? "#0b6b52" : readiness >= 50 ? "#a97a1f" : "#c8102e"}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={`${(readiness / 100) * 264} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl leading-none text-ink tabular">{readiness}</span>
                  <span className="text-[9px] text-ink-faint">/100</span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] leading-relaxed text-ink-soft">
                  {readiness === 0
                    ? "Sit one paper to establish a baseline."
                    : band.blurb}
                </p>
                <p className="mt-2 text-[10.5px] text-ink-faint">
                  Performance 60% · coverage 25% · volume 15%
                </p>
              </div>
            </div>
          </section>

          <section className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Next sitting</p>
              <CalendarDays className="h-4 w-4 text-ink-faint" />
            </div>
            <p className="mt-2 font-display text-xl text-ink">{nextSitting.label}</p>
            <p className="text-[11px] text-ink-faint">
              {nextSitting.region} · intake {nextSitting.intake}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="font-display text-4xl leading-none text-vermillion tabular">{days}</p>
                <p className="text-[10px] text-ink-faint">days to exam day</p>
              </div>
              <Link
                href="/exam-dates"
                className="text-[11.5px] text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-ink"
              >
                Calendar
              </Link>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <Link href="/app/practice" className="panel p-4 transition hover:border-line-strong">
              <Flame className="h-4 w-4 text-vermillion" />
              <p className="mt-3 font-display text-2xl text-ink tabular">{dueReviews}</p>
              <p className="text-[10.5px] text-ink-faint">Reviews due</p>
            </Link>
            <Link href="/app/practice" className="panel p-4 transition hover:border-line-strong">
              <BookOpen className="h-4 w-4 text-jade" />
              <p className="mt-3 font-display text-2xl text-ink tabular">{reviewCards}</p>
              <p className="text-[10.5px] text-ink-faint">Review cards</p>
            </Link>
          </section>

          <section className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Study plan</p>
              <Link href="/app/plan" className="text-[11px] text-ink-soft hover:text-ink">
                Open
              </Link>
            </div>
            {tasks.length === 0 ? (
              <div className="mt-3">
                <p className="text-[12px] text-ink-soft">
                  No plan yet. Generate a three-phase plan around your sitting.
                </p>
                <Link
                  href="/app/plan"
                  className="mt-3 inline-flex h-8 items-center gap-1 rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
                >
                  <Sparkles className="h-3 w-3" /> Build my plan
                </Link>
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-start gap-2">
                    {task.done ? (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                    ) : (
                      <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-line-strong" />
                    )}
                    <span
                      className={cn(
                        "text-[12px] leading-snug",
                        task.done ? "text-ink-faint line-through" : "text-ink-soft",
                      )}
                    >
                      {task.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-line bg-ink p-5 text-paper">
            <TrendingUp className="h-4 w-4 text-paper/50" />
            <p className="mt-3 font-display text-lg text-paper">Percentiles, not vibes.</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-paper/60">
              Universities see where you sit in the global cohort. Our estimate is modelled from the
              official 100-point scale and clearly labelled.
            </p>
          </section>
        </div>
      </div>
    </AppBody>
  );
}
