import Link from "next/link";
import { ArrowRight, Clock3, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { ScoreTrend, type TrendPoint } from "@/components/charts/score-trend";
import { estimatePercentile, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { cn, formatDate, ordinal } from "@/lib/utils";
import {
  displaySubject,
  displaySubjectShort,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackSubjectCodes,
  trackSubjects,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Results", "成绩记录");
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; taught?: string }>;
}) {
  const session = await requireUser();
  const { subject: subjectParam, taught } = await searchParams;
  const track = await getResolvedTrack(taught, session.teachingTrack);
  const programme = parseProgramme(session.track);
  const trackCodes = trackSubjectCodes(track, programme);
  const subjectsForTrack = trackSubjects(track, programme);
  const totalTrackSubjects = trackCodes.length;
  const lang = track === "CN" ? "zh" : "en";
  const zh = lang === "zh";

  const activeSubject =
    subjectParam && (trackCodes as string[]).includes(subjectParam)
      ? (subjectParam as SubjectCode)
      : undefined;

  const [attempts, access] = await Promise.all([
    prisma.attempt.findMany({
      where: {
        userId: session.id,
        status: "SUBMITTED",
        track,
        mock: { subjectCode: { in: trackCodes } },
      },
      include: { mock: { include: { subject: true } } },
      orderBy: { completedAt: "desc" },
    }),
    getAccess(session.id),
  ]);

  const filteredAttempts = activeSubject
    ? attempts.filter((attempt) => attempt.mock.subjectCode === activeSubject)
    : attempts;

  const FREE_HISTORY_LIMIT = 10;
  const visibleAttempts = access.isPro
    ? filteredAttempts
    : filteredAttempts.slice(0, FREE_HISTORY_LIMIT);
  const historyTruncated = !access.isPro && filteredAttempts.length > FREE_HISTORY_LIMIT;

  // Compute chronological trend points (oldest -> newest across up to 12 recent filtered attempts)
  const trendData: TrendPoint[] = [...filteredAttempts.slice(0, 12)]
    .reverse()
    .map((attempt) => ({
      label: attempt.completedAt ? formatDate(attempt.completedAt, true) : "—",
      score: attempt.score,
    }));

  // Compute per-subject stats chronologically
  const subjectStats = new Map<
    string,
    { count: number; firstScore: number; bestScore: number; totalScore: number }
  >();
  for (const attempt of [...attempts].reverse()) {
    const code = attempt.mock.subjectCode;
    const prev = subjectStats.get(code);
    if (!prev) {
      subjectStats.set(code, {
        count: 1,
        firstScore: attempt.score,
        bestScore: attempt.score,
        totalScore: attempt.score,
      });
    } else {
      subjectStats.set(code, {
        count: prev.count + 1,
        firstScore: prev.firstScore,
        bestScore: Math.max(prev.bestScore, attempt.score),
        totalScore: prev.totalScore + attempt.score,
      });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={zh ? "成绩" : "Results"}
        title={zh ? "你做过的每一套试卷。" : "Every paper you have sat."}
        body={
          zh
            ? "分数按官方 0–100 分制换算。百分位为模型估算，并非官方数据。"
            : "Scores are scaled to the official 0–100 range. Percentiles are modelled estimates, not official figures."
        }
      />

      <AppBody>
        {attempts.length === 0 ? (
          <div className="panel p-10 text-center">
            <TrendingUp className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-2xl text-ink">
              {zh ? "还没有成绩" : "No results yet"}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              {zh
                ? "完成一套完整试卷后，你的分数、知识点分布和复习会显示在这里。"
                : "Sit a full paper and your score, topic breakdown and review will appear here."}
            </p>
            <Link
              href={trackLink("/app/mocks", track)}
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              {zh ? "选择试卷" : "Choose a paper"} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  {t(lang, "Papers sat")}
                </p>
                <p className="mt-1 font-display text-3xl text-ink tabular">{attempts.length}</p>
              </div>
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  {t(lang, "Best score")}
                </p>
                <p className="mt-1 font-display text-3xl text-ink tabular">
                  {Math.max(...attempts.map((attempt) => attempt.score))}
                </p>
              </div>
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  {zh ? "覆盖科目" : "Subjects covered"}
                </p>
                <p className="mt-1 font-display text-3xl text-ink tabular">
                  {subjectStats.size}
                  <span className="text-base text-ink-faint">/{totalTrackSubjects}</span>
                </p>
              </div>
            </div>

            {/* Subject filter pills */}
            <div className="mb-6 flex flex-wrap items-center gap-1.5">
              <Link
                href={trackLink("/app/results", track)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                  !activeSubject
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {zh ? "全部科目" : "All subjects"} ({attempts.length})
              </Link>
              {subjectsForTrack.map((sub) => {
                const count = subjectStats.get(sub.code)?.count ?? 0;
                return (
                  <Link
                    key={sub.code}
                    href={trackLink("/app/results", track, { subject: sub.code })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                      activeSubject === sub.code
                        ? "border-vermillion bg-vermillion text-paper"
                        : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {displaySubjectShort(sub, track)} ({count})
                  </Link>
                );
              })}
            </div>

            {/* Progression & Subject Breakdown */}
            <div className="mb-6 grid gap-5 lg:grid-cols-12">
              <section className="panel p-5 lg:col-span-7">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                      {zh ? "分数走势" : "Score progression"}
                    </p>
                    <h2 className="mt-0.5 font-display text-lg text-ink">
                      {activeSubject
                        ? displaySubject(SUBJECT_MAP[activeSubject], track)
                        : zh
                          ? "近期各科得分趋势"
                          : "Recent mock scores"}
                    </h2>
                  </div>
                  <span className="text-[11px] text-ink-faint">
                    {zh ? `最近 ${trendData.length} 次` : `Last ${trendData.length} papers`}
                  </span>
                </div>
                <div className="mt-4">
                  <ScoreTrend data={trendData} lang={lang} />
                </div>
              </section>

              <section className="panel p-5 lg:col-span-5">
                <p className="text-[10.5px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                  {zh ? "分科进步情况" : "Subject progression"}
                </p>
                <div className="mt-3 divide-y divide-line">
                  {subjectsForTrack.map((sub) => {
                    const stats = subjectStats.get(sub.code);
                    const avg = stats ? Math.round(stats.totalScore / stats.count) : null;
                    const delta =
                      stats && stats.count >= 2 ? stats.bestScore - stats.firstScore : 0;

                    return (
                      <div
                        key={sub.code}
                        className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-ink">
                            {displaySubjectShort(sub, track)}
                          </p>
                          <p className="text-[11px] text-ink-faint">
                            {stats
                              ? zh
                                ? `${stats.count} 套 · 均分 ${avg}`
                                : `${stats.count} sat · avg ${avg}`
                              : zh
                                ? "暂未作答"
                                : "Not sat yet"}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {stats ? (
                            <>
                              {delta > 0 && (
                                <span className="rounded-full bg-jade-soft px-2 py-0.5 text-[10.5px] font-semibold text-jade tabular">
                                  +{delta}
                                </span>
                              )}
                              <span className="font-display text-lg text-ink tabular">
                                {stats.bestScore}/100
                              </span>
                            </>
                          ) : (
                            <Link
                              href={trackLink("/app/mocks", track, { subject: sub.code })}
                              className="text-[11.5px] font-medium text-vermillion hover:underline"
                            >
                              {zh ? "去做模拟 →" : "Sit mock →"}
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {visibleAttempts.length === 0 ? (
              <div className="panel p-8 text-center">
                <p className="font-display text-lg text-ink">
                  {zh ? "该科目暂无提交记录" : "No submitted mocks in this subject yet"}
                </p>
                <Link
                  href={trackLink("/app/mocks", track, { subject: activeSubject })}
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-vermillion hover:underline"
                >
                  {zh ? "前往做一套模拟卷 →" : "Go sit a mock →"}
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-line bg-card">
                <div className="hidden grid-cols-[1.6fr_0.8fr_0.6fr_0.7fr_0.8fr_0.3fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
                  <span>{zh ? "试卷" : "Paper"}</span>
                  <span>{zh ? "科目" : "Subject"}</span>
                  <span>{zh ? "得分" : "Score"}</span>
                  <span>{zh ? "百分位" : "Percentile"}</span>
                  <span>{zh ? "日期" : "Date"}</span>
                  <span />
                </div>
                {visibleAttempts.map((attempt) => {
                  const spec = SUBJECT_MAP[attempt.mock.subjectCode as SubjectCode];
                  const percentile = estimatePercentile(attempt.score, spec?.kind ?? "FUNDAMENTAL");
                  return (
                    <Link
                      key={attempt.id}
                      href={trackLink(`/app/results/${attempt.id}`, track)}
                      className="grid grid-cols-1 gap-1 border-b border-line/70 px-4 py-3.5 transition last:border-0 hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_0.8fr_0.6fr_0.7fr_0.8fr_0.3fr] sm:items-center sm:gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-medium text-ink">
                          {zh && attempt.mock.titleZh ? attempt.mock.titleZh : attempt.mock.title}
                        </p>
                        <p className="text-[10.5px] text-ink-faint">
                          {attempt.rawScore}/{attempt.totalQuestions} {zh ? "题正确" : "correct"} ·{" "}
                          {Math.floor(attempt.durationSec / 60)} {zh ? "分钟" : "min"}
                        </p>
                      </div>
                      <p className="text-[11.5px] text-ink-soft">
                        {zh ? attempt.mock.subject.nameZh : attempt.mock.subject.shortEn}
                      </p>
                      <p className="font-display text-lg text-ink tabular">{attempt.score}</p>
                      <p className="text-[11.5px] text-ink-soft tabular">
                        {zh ? `第 ${percentile} 百分位` : ordinal(percentile)}
                      </p>
                      <p className="inline-flex items-center gap-1 text-[11px] text-ink-faint">
                        <Clock3 className="h-3 w-3" />
                        {attempt.completedAt ? formatDate(attempt.completedAt, true) : "—"}
                      </p>
                      <ArrowRight className="hidden h-3.5 w-3.5 text-ink-faint sm:block" />
                    </Link>
                  );
                })}
              </div>
            )}

            {historyTruncated && (
              <p className="mt-3 text-[12px] text-ink-soft">
                {zh
                  ? `免费版仅显示最近 ${FREE_HISTORY_LIMIT} 次记录（共 ${filteredAttempts.length} 次）。`
                  : `Showing your last ${FREE_HISTORY_LIMIT} of ${filteredAttempts.length} attempts on the Free plan. `}
                <Link href={trackLink("/app/billing#redeem", track)} className="font-medium text-vermillion hover:underline">
                  {zh ? "兑换专业版查看全部历史 →" : "Unlock full history with Pro →"}
                </Link>
              </p>
            )}
          </>
        )}
      </AppBody>
    </>
  );
}
