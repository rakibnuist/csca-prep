import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, Clock3, Flame, Layers, Lightbulb, Sparkles, Zap } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { TrackSwitch } from "@/components/app/track-switch";
import { CONCEPT_MAP } from "@/lib/concepts";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import {
  defaultSubjectFor,
  displayBlurb,
  displaySubject,
  displaySubjectShort,
  displayTopic,
  displayUnit,
  isSubjectInTrack,
  parseProgramme,
  subjectQuestionWhere,
  trackLink,
  trackMetaTitle,
  trackQuestionWhere,
  trackSubjects,
  type TaughtTrack,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Practice", "专题练习");
}

const DIFFICULTIES = [
  { key: "all", label: "All" },
  { key: "EASY", label: "Easy" },
  { key: "MEDIUM", label: "Medium" },
  { key: "HARD", label: "Hard" },
] as const;

function entryLabel(difficulty: string) {
  if (difficulty === "EASY") return "Easy";
  if (difficulty === "MEDIUM") return "Medium";
  if (difficulty === "HARD") return "Hard";
  return "All";
}

function localisedSubject(code: SubjectCode, track: TaughtTrack) {
  const spec = SUBJECT_MAP[code];
  return {
    name: displaySubject(spec, track),
    short: displaySubjectShort(spec, track),
    blurb: displayBlurb(spec, track),
  };
}

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; difficulty?: string; taught?: string }>;
}) {
  const session = await requireUser();
  const { subject: subjectParam, difficulty: difficultyParam, taught } = await searchParams;

  const track = await getResolvedTrack(taught, session.teachingTrack);
  const programme = parseProgramme(session.track);
  const lang = track === "CN" ? "zh" : "en";
  const subjectCode = (
    subjectParam && isSubjectInTrack(subjectParam, track, programme)
      ? subjectParam
      : defaultSubjectFor(track, programme)
  ) as SubjectCode;
  const difficulty = DIFFICULTIES.find((entry) => entry.key === difficultyParam)?.key ?? "all";

  const difficultyWhere =
    difficulty === "all" ? {} : { difficulty: difficulty as "EASY" | "MEDIUM" | "HARD" };
  const questionScope = { active: true, ...subjectQuestionWhere(subjectCode, track), ...difficultyWhere };

  const [topics, counts, dueReviews, mistakeCount, bookmarkedCount, attempts, totalQuestions] = await Promise.all([
    prisma.topic.findMany({ where: { subjectCode }, orderBy: { order: "asc" } }),
    prisma.question.groupBy({
      by: ["topicId"],
      where: questionScope,
      _count: { _all: true },
    }),
    prisma.reviewItem.count({
      where: {
        userId: session.id,
        nextReviewAt: { lte: new Date() },
        question: trackQuestionWhere(track, programme),
      },
    }),
    prisma.reviewItem.count({
      where: {
        userId: session.id,
        wrongCount: { gt: 0 },
        question: trackQuestionWhere(track, programme),
      },
    }),
    prisma.reviewItem.count({
      where: {
        userId: session.id,
        bookmarked: true,
        question: trackQuestionWhere(track, programme),
      },
    }),
    prisma.attempt.findMany({
      where: { userId: session.id, status: "SUBMITTED", track, mock: { subjectCode } },
      select: { topicBreakdown: true },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
    prisma.question.count({ where: questionScope }),
  ]);

  const countMap = new Map(counts.map((entry) => [entry.topicId, entry._count._all]));

  const masteryMap = new Map<string, { correct: number; total: number }>();
  for (const attempt of attempts) {
    const breakdown = (attempt.topicBreakdown ?? {}) as Record<
      string,
      { code: string; correct: number; total: number }
    >;
    for (const entry of Object.values(breakdown)) {
      const existing = masteryMap.get(entry.code) ?? { correct: 0, total: 0 };
      existing.correct += entry.correct;
      existing.total += entry.total;
      masteryMap.set(entry.code, existing);
    }
  }

  const zh = track === "CN";
  const base = zh ? "/cn" : "/en";
  const subject = localisedSubject(subjectCode, track);
  const weakTopics = topics
    .map((topic) => {
      const m = masteryMap.get(topic.code);
      const pct = m && m.total > 0 ? Math.round((m.correct / m.total) * 100) : null;
      return { topic, pct, count: countMap.get(topic.id) ?? 0 };
    })
    .filter((entry): entry is { topic: (typeof topics)[number]; pct: number; count: number } =>
      entry.pct !== null && entry.pct < 60 && entry.count > 0,
    )
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 4);

  const grouped = topics.reduce<Record<string, typeof topics>>((accumulator, topic) => {
    const unit = displayUnit(topic, track);
    accumulator[unit] = accumulator[unit] ?? [];
    accumulator[unit].push(topic);
    return accumulator;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow={zh ? "练习" : "Practice"}
        title={
          zh
            ? "一个知识点一个知识点地练，直到它不再是问题。"
            : "Drill one topic until it stops being a problem."
        }
        body={
          zh
            ? "中文题目、中文解析。每道题都会进入你的复习队列，错题会按间隔回到你面前。"
            : "Short sets with instant explanations, drawn only from the English bank. Every answer updates your review queue, so misses come back at the right interval."
        }
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href={trackLink("/app/practice/quick", track, {
                subject: subjectCode,
                difficulty: difficulty === "all" ? undefined : difficulty,
              })}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
            >
              <Zap className="h-3.5 w-3.5" /> {t(lang, "Quick 10")}
            </Link>
            <Link
              href={`${base}/practice/mistakes`}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-vermillion" />
              {zh ? "错题本" : "Error notebook"}
              {mistakeCount > 0 && (
                <span className="ml-0.5 rounded-full bg-vermillion/10 px-1.5 py-0.5 text-[10px] font-semibold text-vermillion tabular">
                  {mistakeCount}
                </span>
              )}
            </Link>
            <Link
              href={trackLink("/app/practice/review", track)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-3.5 text-[12.5px] font-medium text-paper"
            >
              <Flame className="h-3.5 w-3.5" /> {t(lang, "Smart review")}
              {dueReviews > 0 && (
                <span className="ml-0.5 rounded-full bg-vermillion px-1.5 py-0.5 text-[10px] text-paper tabular">
                  {dueReviews}
                </span>
              )}
            </Link>
          </div>
        }
      />

      <AppBody>
        <TrackSwitch track={track} />

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {trackSubjects(track, programme).map((item) => (
            <Link
              key={item.code}
              href={trackLink("/app/practice", track, {
                subject: item.code,
                difficulty: difficulty === "all" ? undefined : difficulty,
              })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] transition",
                item.code === subjectCode
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {displaySubjectShort(item, track)}
            </Link>
          ))}

          <span className="mx-1 hidden h-4 w-px bg-line sm:block" />

          {DIFFICULTIES.map((entry) => (
            <Link
              key={entry.key}
              href={trackLink("/app/practice", track, {
                subject: subjectCode,
                difficulty: entry.key === "all" ? undefined : entry.key,
              })}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] transition",
                entry.key === difficulty
                  ? "border-vermillion bg-vermillion text-paper"
                  : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {t(lang, entry.label)}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-card p-4">
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-ink">
              {subject.name} · {topics.length} {t(lang, "topics")} ·{" "}
              {totalQuestions.toLocaleString()} {t(lang, "questions")}
              {difficulty !== "all" ? ` · ${t(lang, entryLabel(difficulty))}` : ""}
            </p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">{subject.blurb}</p>
          </div>
        </div>

        {/* Custom Timed Drill Builder */}
        <section className="mt-4 rounded-xl border border-line bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-vermillion" />
              <h2 className="text-[13px] font-semibold text-ink">
                {zh ? "自定义计时专项组卷" : "Custom Timed Drill Builder"}
              </h2>
            </div>
            <span className="text-[11px] text-ink-faint">
              {zh
                ? `已收藏 ${bookmarkedCount} 题 · 错题 ${mistakeCount} 题`
                : `${bookmarkedCount} bookmarked · ${mistakeCount} missed`}
            </span>
          </div>

          <form
            method="get"
            action={`${base}/practice/quick`}
            className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5"
          >
            <input type="hidden" name="subject" value={subjectCode} />

            <select
              name="mode"
              defaultValue="all"
              className="h-9 rounded-lg border border-line bg-paper px-2.5 text-[12px] text-ink focus:border-vermillion focus:outline-none"
            >
              <option value="all">{zh ? "全部题库题目" : "All subject items"}</option>
              <option value="weak">{zh ? "仅抽历史错题" : "Missed items only"}</option>
              <option value="bookmarked">{zh ? "仅抽我的收藏" : "Bookmarked items only"}</option>
            </select>

            <select
              name="difficulty"
              defaultValue={difficulty === "all" ? "" : difficulty}
              className="h-9 rounded-lg border border-line bg-paper px-2.5 text-[12px] text-ink focus:border-vermillion focus:outline-none"
            >
              <option value="">{zh ? "全部难度" : "All difficulties"}</option>
              <option value="EASY">{zh ? "简单" : "Easy"}</option>
              <option value="MEDIUM">{zh ? "中等" : "Medium"}</option>
              <option value="HARD">{zh ? "困难" : "Hard"}</option>
            </select>

            <select
              name="n"
              defaultValue="20"
              className="h-9 rounded-lg border border-line bg-paper px-2.5 text-[12px] text-ink focus:border-vermillion focus:outline-none"
            >
              <option value="10">{zh ? "10 道题" : "10 questions"}</option>
              <option value="20">{zh ? "20 道题" : "20 questions"}</option>
              <option value="30">{zh ? "30 道题" : "30 questions"}</option>
              <option value="48">{zh ? "48 道题 (整卷规模)" : "48 questions (full-size)"}</option>
            </select>

            <select
              name="timer"
              defaultValue="15"
              className="h-9 rounded-lg border border-line bg-paper px-2.5 text-[12px] text-ink focus:border-vermillion focus:outline-none"
            >
              <option value="0">{zh ? "不限时" : "Untimed"}</option>
              <option value="15">{zh ? "限时 15 分钟" : "15 min timer"}</option>
              <option value="30">{zh ? "限时 30 分钟" : "30 min timer"}</option>
              <option value="60">{zh ? "限时 60 分钟" : "60 min timer"}</option>
            </select>

            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-vermillion px-3.5 text-[12px] font-semibold text-white transition hover:bg-vermillion-deep"
            >
              {zh ? "开始自定义练习" : "Start custom drill"} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </section>

        {weakTopics.length > 0 && (
          <div className="mt-4 rounded-xl border border-vermillion/25 bg-vermillion/[0.04] p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[12px] font-semibold text-ink">
                {zh
                  ? `${subject.short}优先补强知识点`
                  : `Priority topics to fix in ${subject.short}`}
              </p>
              <span className="text-[10.5px] text-ink-faint">
                {zh ? "近期正确率低于 60%" : "Below 60% in recent papers"}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {weakTopics.map(({ topic, pct }) => (
                <Link
                  key={topic.code}
                  href={trackLink(`/app/practice/topic/${topic.code}`, track, {
                    difficulty: difficulty === "all" ? undefined : difficulty,
                  })}
                  className="inline-flex items-center gap-2 rounded-full border border-vermillion/30 bg-card px-3 py-1.5 text-[11.5px] font-medium text-ink transition hover:border-vermillion hover:bg-vermillion hover:text-paper"
                >
                  <span>{displayTopic(topic, track)}</span>
                  <span className="text-[10.5px] opacity-75 tabular">{pct}%</span>
                  <span className="text-[10.5px] font-semibold">
                    {zh ? "立即练 →" : "Drill now →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([unit, unitTopics]) => (
            <section key={unit}>
              <h2 className="border-b border-line pb-2 font-display text-lg text-ink">{unit}</h2>
              <div className="mt-3 divide-y divide-line/70">
                {unitTopics.map((topic) => {
                  const count = countMap.get(topic.id) ?? 0;
                  const mastery = masteryMap.get(topic.code);
                  const pct =
                    mastery && mastery.total > 0
                      ? Math.round((mastery.correct / mastery.total) * 100)
                      : null;
                  const hasConcept = track === "EN" && CONCEPT_MAP.has(topic.code);
                  return (
                    <div
                      key={topic.id}
                      className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[9.5px] font-medium text-ink-faint">
                            {topic.code}
                          </span>
                          <p className="text-[13px] font-medium text-ink">{displayTopic(topic, track)}</p>
                        </div>
                        <p className="mt-0.5 text-[11px] text-ink-faint">
                          {Math.round(topic.weight * 100)}% {t(lang, "of paper")}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-4">
                        {pct !== null ? (
                          <div className="hidden w-24 sm:block">
                            <div className="flex items-center justify-between text-[9.5px] text-ink-faint">
                              <span>{t(lang, "mastery")}</span>
                              <span className="tabular">{pct}%</span>
                            </div>
                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-paper-deep">
                              <div
                                className={cn(
                                  "h-full",
                                  pct >= 75 ? "bg-jade" : pct >= 50 ? "bg-gold" : "bg-vermillion",
                                )}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="hidden text-[10px] text-ink-faint sm:inline">
                            {t(lang, "not measured")}
                          </span>
                        )}

                        <span className="text-[10.5px] text-ink-faint tabular sm:w-14 sm:text-right">
                          {count} {track === "CN" ? "题" : "Q"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {hasConcept && (
                            <Link
                              href={trackLink(`/app/learn/${topic.code}`, track)}
                              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-line bg-paper px-2.5 text-[11px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink"
                            >
                              <BookOpen className="h-3 w-3" /> Concept
                            </Link>
                          )}
                          <Link
                            href={trackLink(`/app/practice/topic/${topic.code}`, track, {
                              difficulty: difficulty === "all" ? undefined : difficulty,
                            })}
                            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-indigo/40 hover:text-indigo"
                          >
                            {t(lang, "Drill")} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
            <p className="text-[12px] leading-relaxed text-ink-soft">
              {track === "CN" ? (
                <>
                  <span className="font-medium text-ink">使用方法：</span>
                  从最近一次成绩里找出最弱的知识点来练，48 小时内再做一套卷。主动回忆比重读讲义更有效。
                </>
              ) : (
                <>
                  <span className="font-medium text-ink">How to use this:</span> drill the weakest topic
                  from your last result, then take a paper again within 48 hours. Retrieval beats
                  re-reading.
                </>
              )}
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-line bg-card p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <p className="text-[12px] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">
                {track === "EN" ? "English-only bank." : "中文题库。"}
              </span>{" "}
              {track === "EN"
                ? "Every question and explanation here is in English. Chinese items live in the Chinese-taught section."
                : "本区只显示中文题目与中文解析。英文题库位于英文授课区。"}
            </p>
          </div>
        </div>
      </AppBody>
    </>
  );
}
