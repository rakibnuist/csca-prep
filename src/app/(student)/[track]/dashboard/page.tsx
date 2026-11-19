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
  ScrollText,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody } from "@/components/app/page-header";
import { Reveal } from "@/components/motion/reveal";
import { InView } from "@/components/motion/in-view";
import { WeekStrip } from "@/components/app/week-strip";
import { DashboardLeaderboard } from "@/components/app/dashboard-leaderboard";
import { Pill } from "@/components/site/section";
import { ScoreTrend } from "@/components/charts/score-trend";
import { TopicMastery } from "@/components/charts/topic-mastery";
import { estimatePercentile, readinessScore, scoreBand, SUBJECTS, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { EXAM_SITTINGS } from "@/lib/site";
import {
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackPaperWhere,
  trackQuestionWhere,
  trackSubjectCodes,
  trackSubjects,
} from "@/lib/tracks";
import { getSectionTrack } from "@/lib/section";
import { t } from "@/lib/i18n";
import { cn, daysUntil, formatDate, ordinal } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Dashboard", "学习面板");
}

export default async function DashboardPage() {
  const session = await requireUser();
  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;

  const track = await getSectionTrack(user.teachingTrack);
  const programme = parseProgramme(user.track);
  const lang = track === "CN" ? "zh" : "en";
  const zh = track === "CN";
  const trackCodes = trackSubjectCodes(track, programme);

  const dailyDateKey = new Date().toISOString().slice(0, 10);
  const [attempts, allSubjectAttempts, inProgress, dueReviews, reviewCards, tasks, mockCount, dailyCompletion, dailyRecent] = await Promise.all([
    prisma.attempt.findMany({
      // Scope to the track's own subjects so legacy attempts sat on the other
      // track's papers never leak topics (and dead drill links) into the panel.
      where: { userId: user.id, status: "SUBMITTED", track, mock: { subjectCode: { in: trackCodes } } },
      include: { mock: { include: { subject: true } } },
      orderBy: { completedAt: "desc" },
      take: 12,
    }),
    prisma.attempt.findMany({
      where: { userId: user.id, status: "SUBMITTED", track, mock: { subjectCode: { in: trackCodes } } },
      select: { score: true, completedAt: true, mock: { select: { subjectCode: true } } },
      orderBy: { completedAt: "desc" },
    }),
    prisma.attempt.findMany({
      where: { userId: user.id, status: "IN_PROGRESS", track, mock: { subjectCode: { in: trackCodes } } },
      include: { mock: { include: { subject: true } } },
      orderBy: { startedAt: "desc" },
      take: 1,
    }),
    prisma.reviewItem.count({
      where: {
        userId: user.id,
        nextReviewAt: { lte: new Date() },
        question: trackQuestionWhere(track, programme),
      },
    }),
    prisma.reviewItem.count({
      where: { userId: user.id, question: trackQuestionWhere(track, programme) },
    }),
    prisma.planTask.findMany({
      where: { userId: user.id },
      orderBy: [{ done: "asc" }, { order: "asc" }],
      take: 4,
    }),
    prisma.mock.count({
      where: {
        published: true,
        subjectCode: { in: trackCodes },
        AND: [trackPaperWhere(track, programme)],
      },
    }),
    prisma.dailyQuizCompletion.findUnique({ where: { userId_date: { userId: user.id, date: dailyDateKey } } }),
    prisma.dailyQuizCompletion.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 60,
      select: { date: true },
    }),
  ]);

  const trackAttempts = attempts;
  const trackInProgress = inProgress;

  // Leaderboard: ranked by each student's average mock score per subject,
  // across all users. Shows the top three plus the viewer's own rank.
  const leaderboardBoards = await Promise.all(
    trackCodes.map(async (code) => {
      const subjectAttempts = await prisma.attempt.findMany({
        where: { status: "SUBMITTED", track, mock: { subjectCode: code } },
        select: { userId: true, score: true },
      });
      const agg = new Map<string, { sum: number; count: number }>();
      for (const entry of subjectAttempts) {
        const current = agg.get(entry.userId) ?? { sum: 0, count: 0 };
        current.sum += entry.score;
        current.count += 1;
        agg.set(entry.userId, current);
      }
      const ranked = [...agg.entries()]
        .map(([userId, { sum, count }]) => ({ userId, average: Math.round(sum / count), count }))
        .sort((a, b) => b.average - a.average || b.count - a.count);
      const top = ranked.slice(0, 3);
      const ids = [...new Set([...top.map((r) => r.userId), user.id])];
      const people = await prisma.user.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true, leaderboardOptIn: true, leaderboardName: true },
      });
      const peopleMap = new Map(people.map((p) => [p.id, p]));
      const display = (userId: string) => {
        const p = peopleMap.get(userId);
        if (p?.leaderboardOptIn) {
          const n = (p.leaderboardName || p.name || "").trim();
          if (n) return n.split(" ")[0].slice(0, 24);
        }
        let h = 0;
        for (let i = 0; i < userId.length; i++) h = (Math.imul(31, h) + userId.charCodeAt(i)) | 0;
        const suffix = Math.abs(h % 10000).toString().padStart(4, "0");
        return zh ? `考生 ${suffix}` : `Student ${suffix}`;
      };
      const myIndex = ranked.findIndex((r) => r.userId === user.id);
      return {
        code,
        label: track === "CN" ? SUBJECT_MAP[code].nameZh : SUBJECT_MAP[code].shortEn,
        rows: top.map((r) => ({
          name: display(r.userId),
          average: r.average,
          count: r.count,
          isMe: r.userId === user.id,
        })),
        myRank: myIndex >= 0 ? myIndex + 1 : null,
        myAverage: myIndex >= 0 ? ranked[myIndex].average : null,
      };
    }),
  );

  const nextSitting =
    EXAM_SITTINGS.find((sitting) => sitting.status !== "closed" && daysUntil(sitting.date) >= 0) ??
    EXAM_SITTINGS[EXAM_SITTINGS.length - 1];
  const days = daysUntil(nextSitting.date);

  const scores = trackAttempts.map((attempt) => attempt.score);
  const best = scores.length ? Math.max(...scores) : 0;
  const average = scores.length
    ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length)
    : 0;
  const latest = trackAttempts[0];
  const hasAttempts = trackAttempts.length > 0;

  // topic mastery across the most recent five papers
  const topicMap = new Map<string, { code: string; title: string; correct: number; total: number }>();
  for (const attempt of trackAttempts.slice(0, 5)) {
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

  const topicTitleRows = topicMap.size
    ? await prisma.topic.findMany({
        where: { code: { in: [...topicMap.keys()] } },
        select: { code: true, titleEn: true, titleZh: true },
      })
    : [];
  const topicTitleZh = new Map(topicTitleRows.map((topic) => [topic.code, topic.titleZh]));

  const mastery = [...topicMap.values()]
    .map((entry) => ({
      code: entry.code,
      title: zh ? (topicTitleZh.get(entry.code) ?? entry.title) : entry.title,
      shortTitle: entry.title.length > 26 ? `${entry.title.slice(0, 24)}…` : entry.title,
      mastery: Math.round((entry.correct / entry.total) * 100),
    }))
    .sort((a, b) => a.mastery - b.mastery);

  const questionsAnswered = trackAttempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
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

  const attemptedSubjects = new Set(trackAttempts.map((attempt) => attempt.mock.subjectCode));
  const recommended = await prisma.mock.findMany({
    where: {
      published: true,
      NOT: { slug: { startsWith: "csca-set-" } },
      AND: [
        {
          subjectCode: {
            in: trackCodes.filter(
              (code) => !attemptedSubjects.has(code) && SUBJECTS.some((subject) => subject.code === code),
            ),
          },
        },
        trackPaperWhere(track, programme),
      ],
      attempts: { none: { userId: user.id, status: "SUBMITTED" } },
    },
    include: { subject: true, items: { select: { id: true } } },
    take: 3,
  });

  // ── Streak + daily goal (derived from papers and practice activity) ──
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const activityCutoff = new Date(dayStart.getTime() - 120 * 86_400_000);

  const [activityAttempts, activityReviews] = await Promise.all([
    prisma.attempt.findMany({
      where: { userId: user.id, status: "SUBMITTED", completedAt: { gte: activityCutoff } },
      select: { completedAt: true, totalQuestions: true },
    }),
    prisma.reviewItem.findMany({
      where: { userId: user.id, lastSeenAt: { gte: activityCutoff } },
      select: { lastSeenAt: true },
    }),
  ]);

  const todayKey = dayStart.toDateString();
  const activeDays = new Set<string>();
  let todayQuestions = 0;

  for (const attempt of activityAttempts) {
    if (!attempt.completedAt) continue;
    const key = new Date(attempt.completedAt).toDateString();
    activeDays.add(key);
    if (key === todayKey) todayQuestions += attempt.totalQuestions;
  }
  for (const review of activityReviews) {
    const key = new Date(review.lastSeenAt).toDateString();
    activeDays.add(key);
    if (key === todayKey) todayQuestions += 1;
  }

  let streak = 0;
  let cursor = new Date(dayStart);
  if (!activeDays.has(cursor.toDateString())) {
    cursor = new Date(dayStart.getTime() - 86_400_000);
  }
  while (activeDays.has(cursor.toDateString())) {
    streak += 1;
    cursor = new Date(cursor.getTime() - 86_400_000);
  }

  const DAILY_GOAL = 20;
  const goalPct = Math.min(100, Math.round((todayQuestions / DAILY_GOAL) * 100));
  const goalMet = todayQuestions >= DAILY_GOAL;

  /* Seven-day strip: questions answered per day, oldest first. Reads the same
     attempts/reviews the streak above already walks, so the two cannot disagree. */
  const weekCounts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.completedAt) continue;
    const key = new Date(attempt.completedAt).toDateString();
    weekCounts.set(key, (weekCounts.get(key) ?? 0) + attempt.totalQuestions);
  }
  for (const review of activityReviews) {
    const key = new Date(review.lastSeenAt).toDateString();
    weekCounts.set(key, (weekCounts.get(key) ?? 0) + 1);
  }
  const weekStrip = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(dayStart.getTime() - (6 - index) * 86_400_000);
    return {
      label: date.toLocaleDateString(zh ? "zh-CN" : "en-GB", { weekday: "short" }),
      count: weekCounts.get(date.toDateString()) ?? 0,
      today: index === 6,
    };
  });

  // daily quiz streak (UTC days)
  const dailyDone = new Set(dailyRecent.map((c) => c.date));
  let dailyQuizStreak = 0;
  let dq = new Date();
  dq.setUTCHours(0, 0, 0, 0);
  if (!dailyDone.has(dq.toISOString().slice(0, 10))) dq = new Date(dq.getTime() - 86_400_000);
  while (dailyDone.has(dq.toISOString().slice(0, 10))) {
    dailyQuizStreak++;
    dq = new Date(dq.getTime() - 86_400_000);
  }

  const reviewedToday = activityReviews.some(
    (review) => new Date(review.lastSeenAt).toDateString() === todayKey,
  );
  const satPaperToday = activityAttempts.some(
    (attempt) => attempt.completedAt && new Date(attempt.completedAt).toDateString() === todayKey,
  );

  const studyLoopSteps = [
    {
      num: "01",
      tag: zh ? "热身" : "Warm up",
      title: dailyCompletion
        ? zh
          ? `今日十题已完成 (${dailyCompletion.score}/100)`
          : `Daily 10 done (${dailyCompletion.score}/100)`
        : zh
          ? "完成今日十题热身"
          : "Warm up with today's Daily 10",
      href: trackLink("/app/daily", track),
      done: Boolean(dailyCompletion),
      cta: dailyCompletion ? (zh ? "查看解析" : "Review") : zh ? "去答题" : "Start",
    },
    {
      num: "02",
      tag: zh ? "补弱" : "Fix weak spots",
      title:
        dueReviews > 0
          ? zh
            ? `复习 ${dueReviews} 道到期错题`
            : `Review ${dueReviews} due card${dueReviews === 1 ? "" : "s"}`
          : mastery[0]
            ? zh
              ? `巩固最弱知识点：${mastery[0].title}`
              : `Drill weakest: ${mastery[0].title}`
            : zh
              ? "做一组 10 题专题快练"
              : "Run a Quick 10 topic drill",
      href:
        dueReviews > 0
          ? trackLink("/app/practice/review", track)
          : mastery[0]
            ? trackLink(`/app/practice/topic/${mastery[0].code}`, track)
            : trackLink("/app/practice/quick", track),
      done: reviewedToday && dueReviews === 0,
      cta: reviewedToday && dueReviews === 0 ? (zh ? "继续练习" : "More") : zh ? "去练习" : "Practice",
    },
    {
      num: "03",
      tag: zh ? "模考" : "Rehearse",
      title: satPaperToday
        ? zh
          ? "今日已完成限时模拟"
          : "Timed paper sat today"
        : trackInProgress[0]
          ? zh
            ? "继续进行中的模拟卷"
            : "Resume in-progress paper"
          : zh
            ? "完成一套限时模拟卷"
            : "Sit a full timed mock",
      href: trackInProgress[0]
        ? trackLink(`/exam/${trackInProgress[0].mock.slug}`, track)
        : trackLink("/app/mocks", track),
      done: satPaperToday,
      cta: satPaperToday
        ? zh
          ? "再做一套"
          : "Another"
        : trackInProgress[0]
          ? zh
            ? "继续"
            : "Resume"
          : zh
            ? "选卷"
            : "Pick paper",
    },
  ];

  const subjectsForTrack = trackSubjects(track, programme);
  const subjectGlance = subjectsForTrack.map((subject) => {
    const list = allSubjectAttempts.filter((a) => a.mock.subjectCode === subject.code);
    const bestSubject = list.length ? Math.max(...list.map((a) => a.score)) : null;
    const latestSubject = list[0]?.score ?? null;
    return {
      subject,
      satCount: list.length,
      bestScore: bestSubject,
      latestScore: latestSubject,
    };
  });

  return (
    <AppBody className="max-w-[1120px]">
      {/* student welcome banner */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-xs sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vermillion via-indigo to-jade"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_70%)]"
        />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">
              {new Date().toLocaleDateString(zh ? "zh-CN" : "en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <h1 className="display-md mt-2">
              {user.name
                ? zh
                  ? `欢迎回来，${user.name.split(" ")[0]}。`
                  : `Welcome back, ${user.name.split(" ")[0]}.`
                : zh
                  ? "欢迎回来。"
                  : "Welcome back."}
            </h1>
            <p className="mt-1.5 text-[13px] text-ink-soft">
              {zh ? (
                <>
                  目标入学 <span className="font-medium text-ink">{user.targetYear}</span> · 已完成{" "}
                  {trackAttempts.length} 套试卷 · 已测 {mastery.length} 个知识点
                </>
              ) : (
                <>
                  Target intake <span className="font-medium text-ink">{user.targetYear}</span> ·{" "}
                  {trackAttempts.length} paper{trackAttempts.length === 1 ? "" : "s"} completed ·{" "}
                  {mastery.length} topics measured
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={trackLink("/app/practice", track)}
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-line-strong bg-paper px-3.5 text-[12.5px] font-medium text-ink transition hover:border-vermillion/40 hover:bg-white"
            >
              <Target className="h-3.5 w-3.5" /> {zh ? "练习知识点" : "Drill a topic"}
            </Link>
            <Link
              href={trackLink("/app/official", track)}
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-line-strong bg-paper px-3.5 text-[12.5px] font-medium text-ink transition hover:border-vermillion/40 hover:bg-white"
            >
              <ScrollText className="h-3.5 w-3.5" /> {t(lang, "Official papers")}
            </Link>
            <Link
              href={trackLink("/app/mocks", track)}
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-vermillion px-4 text-[12.5px] font-semibold text-white shadow-xs transition hover:bg-vermillion-deep"
            >
              <Play className="h-3.5 w-3.5" /> {zh ? "新模拟卷" : "New mock"}
            </Link>
          </div>
        </div>

        {/* teaching-track (account property — changed in Settings) */}
        <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-line/70 pt-3.5">
          <span
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-medium",
              track === "CN"
                ? "border-jade/30 bg-jade/10 text-jade"
                : "border-vermillion/30 bg-vermillion/10 text-vermillion-deep",
            )}
          >
            {track === "CN" ? "中文授课 · Chinese-taught" : "English-taught · 英文授课"}
          </span>
          <span className="ml-auto text-[11px] text-ink-faint">
            {trackSubjects(track, programme).length} {zh ? "个科目" : "subjects"} ·{" "}
            <Link href={trackLink("/app/settings", track)} className="underline underline-offset-2 hover:text-ink">
              {zh ? "在设置中更改" : "change in Settings"}
            </Link>
          </span>
        </div>
      </section>

      {/* streak + daily goal + daily quiz */}
      <Reveal delay={80} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-vermillion/10 text-vermillion">
            <Flame className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none text-ink tabular">
              {streak}
              <span className="ml-1 text-sm text-ink-faint">
                {zh ? "天" : `day${streak === 1 ? "" : "s"}`}
              </span>
            </p>
            <p className="mt-1 text-[10.5px] text-ink-faint">
              {streak > 0
                ? zh
                  ? "连续学习——今天继续保持。"
                  : "Study streak — keep it alive today."
                : zh
                  ? "今天先答一道题，开始打卡。"
                  : "Start a streak: answer one question today."}
            </p>
          </div>
        </div>

        <Link
          href={trackLink("/app/daily", track)}
          className={cn(
            "group flex items-center gap-3 rounded-xl border px-4 py-3 transition",
            dailyCompletion ? "border-jade/30 bg-jade-soft/30 hover:border-jade/50" : "border-vermillion/25 bg-vermillion/[0.03] hover:border-vermillion/40",
          )}
        >
          <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", dailyCompletion ? "bg-jade/15 text-jade" : "bg-vermillion/10 text-vermillion")}>
            {dailyCompletion ? <CheckCircle2 className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-ink">
              {dailyCompletion
                ? zh
                  ? `今日十题已完成 · ${dailyCompletion.score}/100`
                  : `Daily quiz done · ${dailyCompletion.score}/100`
                : zh
                  ? "今日十题"
                  : "Today’s daily quiz"}
            </p>
            <p className="mt-0.5 text-[10.5px] text-ink-faint">
              {dailyCompletion
                ? zh
                  ? `连续 ${dailyQuizStreak} 天——明天继续。`
                  : `${dailyQuizStreak} day streak — come back tomorrow.`
                : zh
                  ? `10 道题 · ${dailyQuizStreak > 0 ? `守住 ${dailyQuizStreak} 天连续记录` : "开始打卡"}。`
                  : `10 questions · ${dailyQuizStreak > 0 ? `protect your ${dailyQuizStreak}-day streak` : "start your streak"}.`}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-ink" />
        </Link>

        <div className="rounded-xl border border-line bg-card px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink">{zh ? "每日目标" : "Daily goal"}</p>
            <p className="text-[11px] text-ink-soft tabular">
              {/* Over-goal days used to read "118/20", which looks like a bug.
                  The fraction caps at the goal; the surplus is stated instead. */}
              {Math.min(todayQuestions, DAILY_GOAL)}/{DAILY_GOAL}{" "}
              <span className="text-ink-faint">{zh ? "道题" : "questions"}</span>
              {todayQuestions > DAILY_GOAL && (
                <span className="text-jade">
                  {" "}
                  · {zh ? `超出 ${todayQuestions - DAILY_GOAL}` : `${todayQuestions - DAILY_GOAL} over`}
                </span>
              )}
            </p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-deep">
            <div
              className={cn("h-full rounded-full transition-all", goalMet ? "bg-jade" : "bg-vermillion")}
              style={{ width: `${goalPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10.5px] text-ink-faint">
            {goalMet
              ? zh
                ? "已达标——今天做得不错。"
                : "Goal met — nice work today."
              : zh
                ? `还差 ${DAILY_GOAL - todayQuestions} 题${streak > 0 ? " · 守住连续记录" : ""}。`
                : `${DAILY_GOAL - todayQuestions} to go${streak > 0 ? " · protect your streak" : ""}.`}
          </p>
        </div>

        <div className="rounded-xl border border-line bg-card px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink">{zh ? "本周" : "This week"}</p>
            <p className="text-[10.5px] text-ink-faint">
              {weekStrip.reduce((sum, day) => sum + day.count, 0)} {zh ? "道题" : "questions"}
            </p>
          </div>
          <WeekStrip days={weekStrip} goal={DAILY_GOAL} className="mt-2" lang={lang} />
        </div>
      </Reveal>

      {/* continue */}
      {trackInProgress[0] && (
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Clock3 className="h-4 w-4 text-gold" />
            <p className="text-[12.5px] text-ink">
              {zh ? (
                <>
                  <span className="font-medium">
                    {trackInProgress[0].mock.titleZh ?? trackInProgress[0].mock.title}
                  </span>{" "}
                  正在进行——计时仍在继续。
                </>
              ) : (
                <>
                  <span className="font-medium">{trackInProgress[0].mock.title}</span> is in progress
                  — the timer is still running.
                </>
              )}
            </p>
          </div>
          <Link
            href={trackLink(`/exam/${trackInProgress[0].mock.slug}`, track)}
            className="inline-flex h-8 items-center gap-1 rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
          >
            {zh ? "继续" : "Resume"} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* today's 3-step study loop */}
      <section className="mt-6 rounded-2xl border border-line bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="eyebrow">{zh ? "今日学习清单" : "Today’s study loop"}</p>
            <p className="mt-0.5 text-[12px] text-ink-soft">
              {zh
                ? "每天完成这三步：热身、补弱、模考。"
                : "Three focused steps for today: warm up, fix weak spots, and rehearse."}
            </p>
          </div>
          <span className="text-[11px] font-medium text-ink-faint tabular">
            {studyLoopSteps.filter((s) => s.done).length}/3{" "}
            {zh ? "项已完成" : "completed"}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {studyLoopSteps.map((step) => (
            <Link
              key={step.num}
              href={step.href}
              className={cn(
                "group flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition",
                step.done
                  ? "border-jade/30 bg-jade-soft/30 hover:border-jade/50"
                  : "border-line bg-paper hover:border-line-strong",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                {step.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-jade" />
                ) : (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line-strong bg-card font-mono text-[11px] font-semibold text-ink-soft">
                    {step.num}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                    {step.tag}
                  </p>
                  <p className="truncate text-[12.5px] font-medium text-ink">{step.title}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-ink-soft transition group-hover:text-ink">
                {step.cta}
                <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* subjects at a glance */}
      <section className="mt-5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="eyebrow">{zh ? "各科进度一览" : "Your subjects at a glance"}</p>
          <span className="text-[11px] text-ink-faint">
            {zh ? "按科目进入模拟卷或专题练习" : "Jump straight into mocks or drills by subject"}
          </span>
        </div>
        <div
          className={cn(
            "mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2",
            subjectGlance.length === 3 && "lg:grid-cols-3",
            subjectGlance.length >= 4 && "lg:grid-cols-4",
          )}
        >
          {subjectGlance.map(({ subject, satCount, bestScore, latestScore }) => (
            <div
              key={subject.code}
              className="flex flex-col justify-between rounded-xl border border-line bg-card p-4"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {zh ? subject.nameZh : subject.shortEn}
                  </p>
                  <span className="font-chinese text-[11px] text-ink-faint">
                    {zh ? subject.shortEn : subject.nameZh}
                  </span>
                </div>
                <div className="mt-2.5 flex items-baseline gap-4 text-[11.5px]">
                  <div>
                    <span className="text-ink-faint">{zh ? "最高" : "Best"}</span>{" "}
                    <span className="font-display text-lg text-ink tabular">
                      {bestScore !== null ? bestScore : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-ink-faint">{zh ? "最近" : "Latest"}</span>{" "}
                    <span className="font-display text-lg text-ink tabular">
                      {latestScore !== null ? latestScore : "—"}
                    </span>
                  </div>
                  <div className="ml-auto text-[10.5px] text-ink-faint tabular">
                    {satCount > 0
                      ? zh
                        ? `${satCount} 套`
                        : `${satCount} sat`
                      : zh
                        ? "未作答"
                        : "Not sat yet"}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-line pt-2.5">
                <Link
                  href={trackLink("/app/mocks", track, { subject: subject.code })}
                  className="inline-flex h-7 flex-1 items-center justify-center rounded-md border border-line-strong bg-paper px-2 text-[11px] font-medium text-ink transition hover:border-ink/30"
                >
                  {zh ? "模拟卷" : "Mocks"}
                </Link>
                <Link
                  href={trackLink("/app/practice", track, { subject: subject.code })}
                  className="inline-flex h-7 flex-1 items-center justify-center rounded-md border border-line bg-card px-2 text-[11px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink"
                >
                  {zh ? "练专题" : "Drill"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {!hasAttempts ? (
        /* ── First run ─────────────────────────────────────── */
        <>
          <section className="mt-6 overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-card)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-8">
                <p className="eyebrow">{zh ? "从这里开始" : "Start here"}</p>
                <h2 className="mt-3 font-display text-[1.6rem] leading-tight text-ink sm:text-3xl text-balance">
                  {zh
                    ? "先做一套完整试卷，摸清你的真实水平。"
                    : "One full paper tells you exactly where you stand."}
                </h2>
                <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-ink-soft">
                  {zh
                    ? "严格还原官方计时、答题卡与 0–100 分制。交卷后立即生成得分、模型百分位预估与逐题知识点分析。"
                    : "Real timings, real navigation, the same 0–100 scale. After 60 minutes you get a score, a percentile estimate and a topic breakdown that shows where the marks leak."}
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <Link
                    href={trackLink("/app/mocks", track)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-vermillion px-5 text-[13.5px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    {zh ? "开始第一套模拟卷" : "Start your first mock"} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={trackLink("/app/daily", track)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-paper px-5 text-[13.5px] font-medium text-ink transition hover:border-ink/30"
                  >
                    {zh ? "先做今日十题热身" : "Warm up with today’s 10-question quiz"}
                  </Link>
                </div>
                <p className="mt-3 text-[12px] text-ink-soft">
                  <Link
                    href={trackLink("/app/official", track)}
                    className="underline decoration-line-strong underline-offset-4 hover:text-ink"
                  >
                    {zh ? "或免费浏览官方真题 →" : "Or study official past papers free →"}
                  </Link>
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] text-ink-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-jade" />{" "}
                    {zh ? "无需银行卡" : "No card required"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-jade" />{" "}
                    {zh ? "80/48 题 · 90/60 分钟" : "48 Q · 60 min"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-jade" />{" "}
                    {zh ? "交卷立即出分" : "Instant results"}
                  </span>
                </div>
              </div>

              <div className="border-t border-line bg-paper-deep/40 p-7 sm:p-8 lg:border-t-0 lg:border-l">
                <p className="eyebrow">{zh ? "使用方式" : "How it works"}</p>
                <ol className="mt-5 space-y-5">
                  {(zh
                    ? [
                        { title: "完成一套完整卷", body: "单一科目，按官方时长与题量作答。" },
                        { title: "查看知识点分析", body: "一眼看出是哪几个知识点在失分。" },
                        { title: "专攻最弱知识点", body: "使用同源题库进行针对性专题练习。" },
                      ]
                    : [
                        { title: "Sit a full paper", body: "One subject, official timings and question count." },
                        { title: "Read the topic breakdown", body: "See the exact strands costing you marks." },
                        { title: "Fix the weakest strand", body: "Drills built from the same question bank." },
                      ]
                  ).map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="font-display text-2xl leading-none text-vermillion/80 tabular">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-[13.5px] font-medium text-ink">{step.title}</p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* first papers */}
          <section className="mt-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl text-ink">
                {zh ? "选择第一套试卷" : "Pick your first paper"}
              </h2>
              <Link
                href={trackLink("/app/mocks", track)}
                className="text-[11.5px] text-ink-soft hover:text-ink"
              >
                {zh ? `全部 ${mockCount} 套 →` : `All ${mockCount} papers →`}
              </Link>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((mock) => (
                <Link
                  key={mock.id}
                  href={trackLink(`/app/mocks/${mock.slug}`, track)}
                  className="group panel flex flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                        {zh ? mock.subject.nameZh : mock.subject.shortEn}
                      </span>
                      <span className="font-chinese text-base text-vermillion">
                        {zh ? mock.subject.nameEn : mock.subject.nameZh}
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] font-medium text-ink">
                      {zh && mock.titleZh ? mock.titleZh : mock.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">
                      {mock.items.length} {zh ? "题" : "Q"} · {mock.durationMin} {zh ? "分钟" : "min"}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-vermillion">
                    {zh ? "开始" : "Start"}{" "}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* ── Returning student ─────────────────────────────── */
        <>
          {mastery[0] && (
            <Link
              href={trackLink(`/app/practice/topic/${mastery[0].code}`, track)}
              className="group mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-vermillion/25 bg-card p-5 transition hover:border-vermillion/45 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
            >
              {/* weakest first: one number, one action */}
              <div className="flex items-baseline gap-2 sm:flex-col sm:items-start sm:gap-0">
                <span className="font-display text-[3rem] font-bold leading-[0.85] text-vermillion tabular">
                  {mastery[0].mastery}
                  <span className="text-[1.2rem] text-ink-faint">%</span>
                </span>
                <span className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
                  {t(lang, "mastery")}
                </span>
              </div>
              <div className="min-w-0 sm:border-l sm:border-line sm:pl-5">
                <p className="text-[10px] tracking-[0.14em] text-indigo uppercase">
                  {zh ? "你最弱的知识点" : "Your weakest topic"}
                </p>
                <p className="mt-1 text-[14px] font-medium leading-snug text-ink">
                  {zh ? `练习：${mastery[0].title}` : `Drill ${mastery[0].title}`}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                  {zh
                    ? "这是你目前最弱的知识点。专注十分钟，就可能提升一个百分位区间——这些题也会进入复习队列。"
                    : "Ten focused minutes here can move a whole percentile band — the questions return in your review queue either way."}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-vermillion px-4 py-2 text-[12px] font-medium text-paper transition group-hover:-translate-y-0.5 sm:justify-self-end">
                {zh ? "开始练习" : "Practice"}{" "}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.55fr_0.85fr]">
          <div className="min-w-0 space-y-5">
            {/* score trend */}
            <section className="panel card-elevate p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow">{zh ? "分数趋势" : "Score trend"}</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {zh ? "最新" : "Latest"} {latest?.score}/100
                  </p>
                </div>
                <div className="flex gap-4 text-right">
                  <div>
                    <p className="text-[10px] text-ink-faint uppercase">{zh ? "最高" : "Best"}</p>
                    <p className="font-display text-lg text-ink tabular">{best}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-faint uppercase">{zh ? "平均" : "Avg"}</p>
                    <p className="font-display text-lg text-ink tabular">{average}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <InView><ScoreTrend data={trend} lang={lang} /></InView>
              </div>
              {latest && (() => {
                const pct = estimatePercentile(
                  latest.score,
                  SUBJECT_MAP[latest.mock.subjectCode as SubjectCode]?.kind ?? "FUNDAMENTAL",
                );
                return (
                  <p className="mt-2 text-[11px] text-ink-faint">
                    {zh
                      ? `上一卷：${latest.mock.subject.nameZh} · ${formatDate(latest.completedAt ?? latest.startedAt, true)} · 模型预估第 ${pct} 百分位`
                      : `Last paper: ${latest.mock.subject.nameEn} · ${formatDate(latest.completedAt ?? latest.startedAt)} · estimated ${ordinal(pct)} percentile`}
                  </p>
                );
              })()}
            </section>

            {/* mastery */}
            <section className="panel card-elevate p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="eyebrow">{zh ? "知识点掌握" : "Topic mastery"}</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {zh ? "失分点" : "Where the marks leak"}
                  </p>
                </div>
                <Link
                  href={trackLink("/app/practice", track)}
                  className="text-[11.5px] text-ink-soft hover:text-ink"
                >
                  {zh ? "去练习 →" : "Practice →"}
                </Link>
              </div>
              <div className="mt-2">
                <InView><TopicMastery data={mastery.slice(0, 7)} lang={lang} /></InView>
              </div>
            </section>

            {/* recommended */}
            <section>
              <div className="flex items-end justify-between">
                <h2 className="font-display text-xl text-ink">
                  {zh ? "接下来做" : "Papers to sit next"}
                </h2>
                <Link
                href={trackLink("/app/mocks", track)}
                className="text-[11.5px] text-ink-soft hover:text-ink"
              >
                  {zh ? `全部 ${mockCount} 套 →` : `All ${mockCount} papers →`}
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {recommended.length === 0 && (
                  <div className="panel p-4 text-[12.5px] text-ink-soft sm:col-span-2">
                    {zh
                      ? "每个科目你都做过了。重做最弱的一套，或练习错过的知识点。"
                      : "You have sat a paper in every subject. Retake your weakest one, or drill the topics you missed."}
                  </div>
                )}
                {recommended.map((mock) => (
                  <Link
                    key={mock.id}
                    href={trackLink(`/app/mocks/${mock.slug}`, track)}
                    className="group panel flex items-center justify-between gap-2 p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                        {zh ? mock.subject.nameZh : mock.subject.shortEn}
                      </p>
                      <p className="mt-1 text-[13px] font-medium text-ink">
                        {zh && mock.titleZh ? mock.titleZh : mock.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-faint">
                        {mock.items.length} {zh ? "题" : "Q"} · {mock.durationMin}{" "}
                        {zh ? "分钟" : "min"}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition group-hover:text-indigo" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* right rail */}
          <div className="space-y-4">
            <section className="panel card-elevate p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{zh ? "备考准备度" : "Readiness"}</p>
                <Pill tone={readiness >= 70 ? "jade" : readiness >= 50 ? "gold" : "red"}>
                  {zh
                    ? band.key === "strong"
                      ? "极具竞争力"
                      : band.key === "competitive"
                        ? "有竞争力"
                        : band.key === "developing"
                          ? "发展中"
                          : "基础"
                    : band.label}
                </Pill>
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
                      stroke={readiness >= 70 ? "#0a7a53" : readiness >= 50 ? "#a97a1f" : "#d31d3c"}
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
                      ? zh
                        ? "先做一套卷，建立基线。"
                        : "Sit one paper to establish a baseline."
                      : zh
                        ? band.key === "strong"
                          ? "这个区间在奖学金初筛中很有优势。"
                          : band.key === "competitive"
                            ? "已高于常见的初筛区间，继续补强最弱的知识点。"
                            : band.key === "developing"
                              ? "基础已经具备，针对性练习会提升得很快。"
                              : "先把核心知识点补起来，再回到完整套卷。"
                        : band.blurb}
                  </p>
                  <p className="mt-2 text-[10.5px] text-ink-faint">
                    {zh ? "成绩 60% · 覆盖 25% · 题量 15%" : "Performance 60% · coverage 25% · volume 15%"}
                  </p>
                </div>
              </div>
            </section>

            <section className="panel card-elevate p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{zh ? "下一场考试" : "Next sitting"}</p>
                <CalendarDays className="h-4 w-4 text-ink-faint" />
              </div>
              <p className="mt-2 font-display text-xl text-ink">
                {zh
                  ? new Date(`${nextSitting.date}T00:00:00+08:00`).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : nextSitting.label}
              </p>
              <p className="text-[11px] text-ink-faint">
                {zh ? `${nextSitting.region} · 入学 ${nextSitting.intake}` : `${nextSitting.region} · intake ${nextSitting.intake}`}
              </p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="font-display text-4xl leading-none text-vermillion tabular">{days}</p>
                  <p className="text-[10px] text-ink-faint">{zh ? "天后考试" : "days to exam day"}</p>
                </div>
                <Link
                  href="/exam-dates"
                  className="text-[11.5px] text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-ink"
                >
                  {zh ? "考试日历" : "Calendar"}
                </Link>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <Link
                href={trackLink("/app/practice/review", track)}
                className="panel p-4 transition hover:border-line-strong"
              >
                <Flame className="h-4 w-4 text-vermillion" />
                <p className="mt-3 font-display text-2xl text-ink tabular">{dueReviews}</p>
                <p className="text-[10.5px] text-ink-faint">{zh ? "待复习" : "Reviews due"}</p>
              </Link>
              <Link
                href={trackLink("/app/practice", track)}
                className="panel p-4 transition hover:border-line-strong"
              >
                <BookOpen className="h-4 w-4 text-jade" />
                <p className="mt-3 font-display text-2xl text-ink tabular">{reviewCards}</p>
                <p className="text-[10.5px] text-ink-faint">{zh ? "复习卡片" : "Review cards"}</p>
              </Link>
            </section>

            <DashboardLeaderboard boards={leaderboardBoards} lang={lang} />

            <section className="panel card-elevate p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{zh ? "学习计划" : "Study plan"}</p>
                <Link href={trackLink("/app/plan", track)} className="text-[11px] text-ink-soft hover:text-ink">
                  {zh ? "打开" : "Open"}
                </Link>
              </div>
              {tasks.length === 0 ? (
                <div className="mt-3">
                  <p className="text-[12px] text-ink-soft">
                    {zh
                      ? "还没有计划。围绕你的目标场次生成三阶段计划。"
                      : "No plan yet. Generate a three-phase plan around your sitting."}
                  </p>
                  <Link
                    href={trackLink("/app/plan", track)}
                    className="mt-3 inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-white px-3 text-[11.5px] font-medium text-ink transition hover:border-ink/30"
                  >
                    <Sparkles className="h-3 w-3" /> {zh ? "生成我的计划" : "Build my plan"}
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

            <section className="rounded-xl border border-vermillion/20 bg-gradient-to-br from-vermillion/10 to-transparent p-5">
              <TrendingUp className="h-4 w-4 text-vermillion" />
              <p className="mt-3 font-display text-lg text-ink">
                {zh ? "量化定位，不靠猜测。" : "Percentiles, not vibes."}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                {zh
                  ? "高校在核验官方报告时可见全球百分位排名；本站根据 0–100 分制提供模型预估百分位，并已明确标注。"
                  : "Universities see where you sit in the global cohort. Our estimate is modelled from the official 100-point scale and clearly labelled."}
              </p>
            </section>
          </div>
          </div>
        </>
      )}
    </AppBody>
  );
}
