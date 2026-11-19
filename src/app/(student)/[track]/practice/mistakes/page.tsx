import Link from "next/link";
import { AlertTriangle, ArrowRight, Bookmark, BookOpen, CheckCircle2, ChevronDown } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { MathText } from "@/components/math-text";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";
import { QuestionReviewTools } from "@/components/practice/question-review-tools";
import { CONCEPT_MAP } from "@/lib/concepts";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import {
  displaySubject,
  displayTopic,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackQuestionWhere,
  trackSubjectCodes,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Error notebook", "错题本");
}

/**
 * Error notebook.
 *
 * Every question the student has ever missed, grouped by subject, with an
 * immediate drill. The spaced-review queue still runs in the background; this
 * page deliberately ignores `nextReviewAt` so a mistake can be re-done the
 * moment it happens instead of waiting for the schedule to come round.
 */
export default async function MistakesPage({
  searchParams,
}: {
  searchParams: Promise<{ drill?: string; tab?: string; taught?: string }>;
}) {
  const session = await requireUser();
  const { drill, tab: rawTab, taught } = await searchParams;
  const track = await getResolvedTrack(taught, session.teachingTrack);
  const programme = parseProgramme(session.track);
  const zh = track === "CN";
  const base = track === "CN" ? "/cn" : "/en";
  const tab = rawTab === "bookmarked" || rawTab === "missed" ? rawTab : "all";

  const tabWhere =
    tab === "bookmarked"
      ? { bookmarked: true }
      : tab === "missed"
        ? { wrongCount: { gt: 0 } }
        : { OR: [{ wrongCount: { gt: 0 } }, { bookmarked: true }] };

  const missed = await prisma.reviewItem.findMany({
    where: {
      userId: session.id,
      ...tabWhere,
      question: trackQuestionWhere(track, programme),
    },
    include: { question: { include: { topic: true } } },
    orderBy: [{ bookmarked: "desc" }, { wrongCount: "desc" }, { lastSeenAt: "desc" }],
    take: 60,
  });

  const toQuestion = (item: (typeof missed)[number]): PracticeQuestion => ({
    id: item.question.id,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    figure: item.question.figure,
    correctIndex: item.question.correctIndex,
    explanation: item.question.explanation,
    explanationZh: item.question.explanationZh,
    topicCode: item.question.topic.code,
    topicTitle: displayTopic(item.question.topic, track),
    difficulty: item.question.difficulty,
    hasConcept: CONCEPT_MAP.has(item.question.topic.code),
    bookmarked: item.bookmarked,
    note: item.note,
  });

  // ── Immediate drill mode ──────────────────────────────────────────
  if (drill) {
    const selected =
      drill === "all" ? missed : missed.filter((item) => item.question.subjectCode === drill);
    if (selected.length > 0) {
      const questions = selected.map(toQuestion);
      return (
        <PracticeRunner
          questions={questions}
          title={zh ? "错题重做" : "Mistake drill"}
          subtitle={
            zh
              ? `${questions.length} 道错题 · 立即重做`
              : `${questions.length} missed question${questions.length === 1 ? "" : "s"} · re-attempt now`
          }
          backHref={`${base}/practice/mistakes`}
          restartHref={`${base}/practice/mistakes?drill=${drill}`}
          language={track === "CN" ? "zh" : "en"}
        />
      );
    }
  }

  // ── Notebook view ─────────────────────────────────────────────────
  const groups = new Map<string, typeof missed>();
  for (const item of missed) {
    const code = item.question.subjectCode;
    const list = groups.get(code) ?? [];
    list.push(item);
    groups.set(code, list);
  }
  const codes = trackSubjectCodes(track, programme);

  return (
    <>
      <PageHeader
        eyebrow={zh ? "练习" : "Practice"}
        title={zh ? "错题本" : "Error notebook"}
        body={
          zh
            ? "你做错过的每一道题。立即重做，不必等间隔复习。"
            : "Every question you've missed. Re-attempt them immediately — no need to wait for the spaced schedule."
        }
      />

      <AppBody className="max-w-[920px]">
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          {[
            { key: "all", en: "All saved & missed", zh: "全部错题与收藏" },
            { key: "missed", en: "Missed only", zh: "仅错题" },
            { key: "bookmarked", en: "Bookmarked only", zh: "仅收藏" },
          ].map((entry) => (
            <Link
              key={entry.key}
              href={
                entry.key === "all"
                  ? `${base}/practice/mistakes`
                  : `${base}/practice/mistakes?tab=${entry.key}`
              }
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition",
                tab === entry.key
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {zh ? entry.zh : entry.en}
            </Link>
          ))}
        </div>

        {missed.length === 0 ? (
          <div className="rounded-xl border border-line bg-card p-8 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-xl text-ink">{zh ? "还没有错题" : "No mistakes yet"}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {zh ? "做一套题，答错的题会自动进入这里。" : "Sit a paper — anything you miss lands here automatically."}
            </p>
            <Link
              href={trackLink("/app/mocks", track)}
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
            >
              {zh ? "做一套模拟卷" : "Take a paper"}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-vermillion/20 bg-vermillion/5 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-vermillion" />
                <p className="text-[13px] text-ink">
                  <span className="font-medium">{missed.length}</span>{" "}
                  {zh ? "道错题待重做" : `missed question${missed.length === 1 ? "" : "s"} to re-attempt`}
                </p>
              </div>
              <Link
                href={`${base}/practice/mistakes?drill=all${tab !== "all" ? `&tab=${tab}` : ""}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
              >
                {zh ? "全部重做" : "Re-attempt all"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {codes
                .filter((code) => groups.has(code))
                .map((code) => {
                  const list = groups.get(code)!;
                  const subject = SUBJECT_MAP[code as SubjectCode];
                  return (
                    <div key={code} className="rounded-xl border border-line bg-card p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 min-w-9 place-items-center rounded-lg bg-paper-deep px-1.5 text-[10.5px] font-semibold text-ink">
                            {zh ? subject.nameZh : subject.shortEn}
                          </span>
                          <div>
                            <p className="text-[13.5px] font-medium text-ink">{displaySubject(subject, track)}</p>
                            <p className="text-[10.5px] text-ink-faint">
                              {list.length} {zh ? "道错题" : `missed question${list.length === 1 ? "" : "s"}`}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`${base}/practice/mistakes?drill=${code}${tab !== "all" ? `&tab=${tab}` : ""}`}
                          className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-paper px-3 text-[11.5px] font-medium text-ink transition hover:border-ink/30"
                        >
                          {zh ? "重做" : "Re-attempt"} <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="mt-4 space-y-2">
                        {list.map((item) => {
                          const q = item.question;
                          const qStem = zh && q.stemZh ? q.stemZh : q.stem;
                          const qOptions =
                            zh && q.optionsZh.length === q.options.length ? q.optionsZh : q.options;
                          const qExplanation =
                            zh && q.explanationZh ? q.explanationZh : q.explanation;
                          const diffLabel = zh
                            ? q.difficulty === "EASY"
                              ? "简单"
                              : q.difficulty === "HARD"
                                ? "困难"
                                : "中等"
                            : q.difficulty === "EASY"
                              ? "Easy"
                              : q.difficulty === "HARD"
                                ? "Hard"
                                : "Medium";
                          const hasConcept = !zh && CONCEPT_MAP.has(q.topic.code);
                          return (
                            <details
                              key={q.id}
                              className="group overflow-hidden rounded-xl border border-line bg-paper [&_summary::-webkit-details-marker]:hidden"
                            >
                              <summary className="flex min-w-0 cursor-pointer list-none items-center gap-2.5 px-3.5 py-2.5 transition hover:bg-paper-deep/40">
                                <span className="shrink-0 rounded bg-paper-deep px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                                  {q.topic.code}
                                </span>
                                <span
                                  className={cn(
                                    "min-w-0 flex-1 truncate text-[12.5px] text-ink",
                                    zh && q.stemZh && "font-chinese",
                                  )}
                                >
                                  <MathText inline className="whitespace-nowrap">
                                    {qStem}
                                  </MathText>
                                </span>
                                <span className="hidden shrink-0 text-[10px] text-ink-faint sm:inline">
                                  {diffLabel}
                                </span>
                                {item.bookmarked ? (
                                  <Bookmark className="h-3.5 w-3.5 shrink-0 fill-gold text-gold" />
                                ) : null}
                                {item.wrongCount > 0 ? (
                                  <span className="shrink-0 rounded-full bg-vermillion/10 px-2 py-0.5 text-[10px] font-semibold text-vermillion tabular">
                                    ×{item.wrongCount}
                                  </span>
                                ) : null}
                                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint transition group-open:rotate-180" />
                              </summary>

                              <div className="border-t border-line bg-card px-4 pt-3.5 pb-4">
                                <p className="text-[11px] font-medium text-ink-faint">
                                  {displayTopic(q.topic, track)}
                                </p>
                                <div
                                  className={cn(
                                    "mt-1.5 text-[13.5px] leading-relaxed text-ink",
                                    zh && q.stemZh && "font-chinese",
                                  )}
                                >
                                  <MathText>{qStem}</MathText>
                                </div>

                                {q.figure && (
                                  <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={q.figure}
                                      alt={zh ? "真题配图" : "Question diagram"}
                                      className="mx-auto max-h-[240px] w-auto"
                                    />
                                  </div>
                                )}

                                <div className="mt-3 space-y-1.5">
                                  {qOptions.map((option, optionIndex) => {
                                    const isCorrectOption = optionIndex === q.correctIndex;
                                    return (
                                      <div
                                        key={optionIndex}
                                        className={cn(
                                          "flex items-start gap-2.5 rounded-lg border px-3 py-2 text-[12.5px]",
                                          isCorrectOption
                                            ? "border-jade/40 bg-jade-soft/60"
                                            : "border-line text-ink-soft",
                                        )}
                                      >
                                        <span
                                          className={cn(
                                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                                            isCorrectOption
                                              ? "border-jade bg-jade text-paper"
                                              : "border-line-strong text-ink-faint",
                                          )}
                                        >
                                          {isCorrectOption ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : (
                                            LETTERS[optionIndex]
                                          )}
                                        </span>
                                        <span
                                          className={cn(
                                            "min-w-0 flex-1 text-ink",
                                            zh && q.optionsZh.length === q.options.length && "font-chinese",
                                          )}
                                        >
                                          <MathText inline>{option}</MathText>
                                        </span>
                                        {isCorrectOption && (
                                          <span className="shrink-0 text-[9px] font-medium tracking-wide text-jade uppercase">
                                            {zh ? "正确答案" : "Correct"}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                                  <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                                    {zh ? "解析" : "Explanation"}
                                  </p>
                                  <div
                                    className={cn(
                                      "mt-1 text-[12px] leading-relaxed text-ink-soft",
                                      zh && q.explanationZh && "font-chinese",
                                    )}
                                  >
                                    <MathText>{qExplanation}</MathText>
                                  </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <Link
                                    href={trackLink(`/app/practice/topic/${q.topic.code}`, track)}
                                    className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-paper px-3 text-[11.5px] font-medium text-ink transition hover:border-ink/30"
                                  >
                                    {zh ? "练习本知识点" : "Drill this topic"}{" "}
                                    <ArrowRight className="h-3 w-3" />
                                  </Link>
                                  {hasConcept && (
                                    <Link
                                      href={trackLink(`/app/learn/${q.topic.code}`, track)}
                                      className="inline-flex items-center gap-1 text-[11.5px] font-medium text-indigo hover:underline"
                                    >
                                      <BookOpen className="h-3 w-3" /> Read concept lesson →
                                    </Link>
                                  )}
                                </div>

                                <QuestionReviewTools
                                  questionId={q.id}
                                  initialBookmarked={item.bookmarked}
                                  initialNote={item.note}
                                  zh={zh}
                                />
                              </div>
                            </details>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </AppBody>
    </>
  );
}
