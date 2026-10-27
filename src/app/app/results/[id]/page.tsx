import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody } from "@/components/app/page-header";
import { MathText } from "@/components/math-text";
import { Pill } from "@/components/site/section";
import { estimatePercentile, scoreBand, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { cn, formatDate, ordinal } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const attempt = await prisma.attempt.findUnique({
    where: { id },
    select: { score: true },
  });
  return { title: attempt ? `Result ${attempt.score}/100` : "Result" };
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ auto?: string; filter?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { auto, filter = "all" } = await searchParams;

  const attempt = await prisma.attempt.findFirst({
    where: { id, userId: user.id, status: "SUBMITTED" },
    include: {
      mock: {
        include: {
          subject: true,
          items: {
            orderBy: { order: "asc" },
            include: { question: { include: { topic: true } } },
          },
        },
      },
    },
  });

  if (!attempt) notFound();

  const answers = (attempt.answers ?? {}) as Record<string, number>;
  const spec = SUBJECT_MAP[attempt.mock.subjectCode as SubjectCode];
  const band = scoreBand(attempt.score);
  const percentile = estimatePercentile(attempt.score, spec?.kind ?? "FUNDAMENTAL");
  const total = attempt.mock.items.length;
  const correct = attempt.rawScore;
  const answered = Object.keys(answers).length;
  const minutes = Math.floor(attempt.durationSec / 60);
  const seconds = attempt.durationSec % 60;

  const topics = Object.values(
    (attempt.topicBreakdown ?? {}) as Record<
      string,
      { code: string; title: string; correct: number; total: number }
    >,
  ).sort((a, b) => a.correct / a.total - b.correct / b.total);

  const weak = topics.filter((topic) => topic.correct / topic.total < 0.6).slice(0, 3);

  const reviewItems = attempt.mock.items.map((item, index) => {
    const given = answers[item.questionId];
    return {
      index: index + 1,
      question: item.question,
      given,
      isCorrect: given === item.question.correctIndex,
    };
  });

  const missedCount = reviewItems.filter((item) => !item.isCorrect).length;
  const visible = filter === "wrong" ? reviewItems.filter((item) => !item.isCorrect) : reviewItems;

  return (
    <>
      <div className="border-b border-line bg-paper-deep/30">
        <div className="mx-auto max-w-[1120px] px-5 py-8 sm:px-8">
          <Link
            href="/app/results"
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All results
          </Link>

          {auto === "1" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold-soft/60 px-3 py-2 text-[12px] text-gold">
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Time expired — the paper was submitted automatically with the answers saved at that
              moment.
            </div>
          )}

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{attempt.mock.subject.nameEn}</Pill>
                <Pill>{attempt.mock.paper ?? "Paper"}</Pill>
                <span className="text-[11px] text-ink-faint">
                  {attempt.completedAt ? formatDate(attempt.completedAt) : ""}
                </span>
              </div>
              <h1 className="display-md mt-3 text-balance">{attempt.mock.title}</h1>
              <p className="mt-2 text-[13px] text-ink-soft">
                {correct} of {total} correct · {answered} answered · {minutes}m {seconds}s on the
                clock
              </p>
            </div>

            <div className="flex shrink-0 items-stretch gap-3">
              <div className="rounded-xl border border-line bg-card px-5 py-3">
                <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  Score
                </p>
                <p className="font-display text-[3.4rem] leading-none text-ink tabular">
                  {attempt.score}
                  <span className="ml-1 text-lg text-ink-faint">/100</span>
                </p>
                <p className={cn("mt-0.5 text-[11.5px] font-medium", band.tone)}>{band.label}</p>
              </div>
              <div className="rounded-xl border border-line bg-card px-4 py-3">
                <p className="text-[10px] tracking-wide text-ink-faint uppercase">Est. percentile</p>
                <p className="mt-1 font-display text-3xl leading-none text-ink tabular">
                  {ordinal(percentile)}
                </p>
                <p className="mt-1 text-[9.5px] text-ink-faint">modelled, not official</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppBody className="grid gap-8 lg:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-8">
          <section>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl text-ink">Topic breakdown</h2>
              <p className="text-[11px] text-ink-faint">Weakest first</p>
            </div>
            <div className="mt-4 space-y-2.5">
              {topics.map((topic) => {
                const pct = Math.round((topic.correct / topic.total) * 100);
                return (
                  <div key={topic.code} className="rounded-xl border border-line bg-card px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-medium text-ink">{topic.title}</p>
                        <p className="text-[10.5px] text-ink-faint">{topic.code}</p>
                      </div>
                      <p className="shrink-0 text-[12px] text-ink-soft tabular">
                        {topic.correct}/{topic.total}
                        <span className="ml-3 inline-block w-8 text-right font-medium text-ink">
                          {pct}%
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pct >= 75 ? "bg-jade" : pct >= 50 ? "bg-gold" : "bg-vermillion",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-display text-xl text-ink">Question review</h2>
              <div className="flex gap-1.5">
                <Link
                  href={`/app/results/${attempt.id}`}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    filter !== "wrong" ? "border-ink bg-ink text-paper" : "border-line text-ink-soft",
                  )}
                >
                  All {total}
                </Link>
                <Link
                  href={`/app/results/${attempt.id}?filter=wrong`}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    filter === "wrong"
                      ? "border-vermillion bg-vermillion text-paper"
                      : "border-line text-ink-soft",
                  )}
                >
                  Missed {missedCount}
                </Link>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {visible.length === 0 && (
                <div className="panel p-6 text-center text-[13px] text-ink-soft">
                  No missed questions on this paper. Move to a harder mock.
                </div>
              )}

              {visible.map((item) => (
                <details
                  key={item.question.id}
                  open={!item.isCorrect && missedCount <= 12}
                  className="group panel overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-2.5 transition hover:bg-paper-deep/40">
                    <span className="w-8 shrink-0 text-[11px] font-medium text-ink tabular">
                      Q{item.index}
                    </span>
                    {item.isCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-jade" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 shrink-0 text-vermillion" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">
                      <MathText>{item.question.stem}</MathText>
                    </span>
                    <span className="hidden shrink-0 text-[10px] text-ink-faint sm:inline">
                      {item.question.topic.code}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint transition group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-line px-4 pt-3 pb-4">
                    <div className="text-[13.5px] leading-relaxed text-ink">
                      <MathText>{item.question.stem}</MathText>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {item.question.options.map((option, optionIndex) => {
                        const isCorrectOption = optionIndex === item.question.correctIndex;
                        const isGiven = optionIndex === item.given;
                        return (
                          <div
                            key={optionIndex}
                            className={cn(
                              "flex items-start gap-2.5 rounded-lg border px-3 py-2 text-[12.5px]",
                              isCorrectOption && "border-jade/40 bg-jade-soft/60",
                              !isCorrectOption && isGiven && "border-vermillion/40 bg-vermillion/6",
                              !isCorrectOption && !isGiven && "border-line text-ink-soft",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                                isCorrectOption
                                  ? "border-jade bg-jade text-paper"
                                  : isGiven
                                    ? "border-vermillion bg-vermillion text-paper"
                                    : "border-line-strong text-ink-faint",
                              )}
                            >
                              {LETTERS[optionIndex]}
                            </span>
                            <span className="flex-1 text-ink">
                              <MathText>{option}</MathText>
                            </span>
                            {isCorrectOption && (
                              <span className="shrink-0 text-[9px] font-medium tracking-wide text-jade uppercase">
                                Correct
                              </span>
                            )}
                            {!isCorrectOption && isGiven && (
                              <span className="shrink-0 text-[9px] font-medium tracking-wide text-vermillion uppercase">
                                Yours
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                      <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                        Explanation
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                        <MathText>{item.question.explanation}</MathText>
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              What this means
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{band.blurb}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-xl text-ink tabular">{answered}</p>
                <p className="text-[10px] text-ink-faint">Answered</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-xl text-ink tabular">{total - answered}</p>
                <p className="text-[10px] text-ink-faint">Blank</p>
              </div>
            </div>

            {weak.length > 0 && (
              <div className="mt-4 rounded-lg border border-vermillion/20 bg-vermillion/5 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-vermillion-deep">
                  <Target className="h-3.5 w-3.5" /> Drill these next
                </p>
                <ul className="mt-1.5 space-y-1">
                  {weak.map((topic) => (
                    <li key={topic.code} className="text-[11.5px] text-ink-soft">
                      {topic.title} · {topic.correct}/{topic.total}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/app/practice?subject=${attempt.mock.subjectCode}`}
                  className="mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
                >
                  Open practice <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              Next step
            </p>
            <Link
              href={`/app/mocks/${attempt.mock.slug}`}
              className="mt-2 flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-[12.5px] text-ink transition hover:border-line-strong"
            >
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5 text-ink-faint" /> Retake this paper
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-ink-faint" />
            </Link>
            <Link
              href="/app/mocks"
              className="mt-2 flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-[12.5px] text-ink transition hover:border-line-strong"
            >
              <span className="inline-flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-ink-faint" /> Try another subject
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-ink-faint" />
            </Link>
          </div>
        </aside>
      </AppBody>
    </>
  );
}
