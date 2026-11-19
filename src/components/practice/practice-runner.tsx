"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { MathText } from "@/components/math-text";
import { QuestionReviewTools } from "@/components/practice/question-review-tools";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export type PracticeQuestion = {
  id: string;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
  figure?: string | null;
  correctIndex: number;
  explanation: string;
  explanationZh: string | null;
  topicCode: string;
  topicTitle: string;
  difficulty: string;
  hasConcept?: boolean;
  bookmarked?: boolean;
  note?: string | null;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function difficultyBadge(difficulty: string, zh: boolean) {
  if (difficulty === "EASY") {
    return {
      label: zh ? "简单" : "Easy",
      cls: "border-jade/25 bg-jade-soft text-jade",
    };
  }
  if (difficulty === "HARD") {
    return {
      label: zh ? "困难" : "Hard",
      cls: "border-rose-500/25 bg-rose-500/10 text-rose-700",
    };
  }
  return {
    label: zh ? "中等" : "Medium",
    cls: "border-gold/25 bg-gold-soft text-gold-deep",
  };
}

export function PracticeRunner({
  questions,
  title,
  subtitle,
  backHref,
  language = "en",
  durationMin,
}: {
  questions: PracticeQuestion[];
  title: string;
  subtitle: string;
  backHref: string;
  restartHref?: string;
  /** Locked question language for the teaching track. */
  language?: "en" | "zh";
  /** Optional countdown timer in minutes for custom timed drills. */
  durationMin?: number;
}) {
  const router = useRouter();
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>(questions);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lang, setLang] = useState<"en" | "zh">(language);
  const [reloading, setReloading] = useState(false);
  const [prevQuestions, setPrevQuestions] = useState(questions);
  const initialTimerSec = durationMin && durationMin > 0 ? durationMin * 60 : 0;
  const [remainingSec, setRemainingSec] = useState(initialTimerSec);
  const copyLang = language;
  const copyZh = copyLang === "zh";

  // Reset runner state cleanly when `router.refresh()` delivers a new server set.
  if (questions !== prevQuestions) {
    setPrevQuestions(questions);
    setActiveQuestions(questions);
    setIndex(0);
    setAnswers({});
    setFinished(false);
    setStreak(0);
    setLang(language);
    setReloading(false);
    setRemainingSec(initialTimerSec);
  }

  const restart = () => {
    setReloading(true);
    router.refresh();
  };

  const question = activeQuestions[index];
  const given = question ? answers[question.id] : undefined;
  const revealed = given !== undefined;
  const useZh = lang === "zh" && !!question?.stemZh;
  const stem = useZh ? question?.stemZh : question?.stem;
  const options = useMemo(() => {
    if (!question) return [];
    return useZh && question.optionsZh.length === question.options.length
      ? question.optionsZh
      : question.options;
  }, [question, useZh]);

  const correctCount = activeQuestions.filter(
    (item) => answers[item.id] === item.correctIndex,
  ).length;
  const missed = activeQuestions.filter(
    (item) => answers[item.id] !== undefined && answers[item.id] !== item.correctIndex,
  );
  const firstUnansweredIndex = activeQuestions.findIndex(
    (item) => answers[item.id] === undefined,
  );
  const frontier = firstUnansweredIndex === -1 ? activeQuestions.length : firstUnansweredIndex;

  const choose = useCallback(
    (optionIndex: number) => {
      if (!question || answers[question.id] !== undefined) return;
      setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }));
      setStreak((current) => (optionIndex === question.correctIndex ? current + 1 : 0));
      // Send the choice, not the verdict. The server works out whether it was
      // right — a client-declared `correct` flag could be used to manipulate
      // the review queue.
      void fetch("/api/practice/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          optionIndex,
        }),
      }).catch(() => undefined);
    },
    [question, answers],
  );

  const next = useCallback(() => {
    if (index >= activeQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => Math.min(activeQuestions.length - 1, value + 1));
    setLang(language);
  }, [index, activeQuestions.length, language]);

  const prev = useCallback(() => {
    setIndex((value) => Math.max(0, value - 1));
    setLang(language);
  }, [language]);

  const retryMissed = () => {
    if (missed.length === 0) return;
    setActiveQuestions(missed);
    setIndex(0);
    setAnswers({});
    setFinished(false);
    setStreak(0);
    setLang(language);
    setRemainingSec(initialTimerSec);
  };

  useEffect(() => {
    if (!durationMin || durationMin <= 0 || finished) return;
    const id = window.setInterval(() => {
      setRemainingSec((sec) => {
        if (sec <= 1) {
          setFinished(true);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [durationMin, finished]);

  useEffect(() => {
    if (finished || !question) return;
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      if (!revealed) {
        let pick = -1;
        if (["1", "2", "3", "4"].includes(key)) pick = Number(key) - 1;
        else if (["a", "b", "c", "d"].includes(key)) pick = ["a", "b", "c", "d"].indexOf(key);
        if (pick >= 0 && pick < options.length) {
          event.preventDefault();
          choose(pick);
          return;
        }
      }

      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        prev();
        return;
      }

      if (revealed) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
          return;
        }
        if (
          (event.key === "Enter" || event.key === " ") &&
          target?.tagName !== "BUTTON" &&
          target?.tagName !== "A"
        ) {
          event.preventDefault();
          next();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [finished, question, revealed, options.length, index, choose, next, prev]);

  if (finished) {
    const pct =
      activeQuestions.length > 0
        ? Math.round((correctCount / activeQuestions.length) * 100)
        : 0;
    const coachingHeadline =
      pct >= 80
        ? copyZh
          ? "表现出色——这个知识点已经很稳了。"
          : "Strong set — you have a solid grip on this material."
        : pct >= 50
          ? copyZh
            ? "稳步提升——复盘下方错题即可进一步巩固。"
            : "Good progress — review the misses below to lock them in."
          : copyZh
            ? "建议先看下方解析，理清思路后再重做错题。"
            : "Read through the worked solutions below, then retry the ones you missed.";

    return (
      <div className="mx-auto max-w-[820px] px-5 py-10">
        <div className="panel p-7 text-center sm:p-8">
          <p className="eyebrow">{t(copyLang, "Session complete")}</p>
          <p className="mt-3 font-display text-6xl text-ink tabular">
            {correctCount}
            <span className="text-2xl text-ink-faint">/{activeQuestions.length}</span>
          </p>
          <p className="mt-1 text-[13px] font-medium text-ink">
            {pct}% {t(copyLang, "correct")}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-ink-soft">
            {coachingHeadline}
          </p>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {missed.length > 0 && (
              <button
                type="button"
                onClick={retryMissed}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {copyZh ? `重做错题 (${missed.length})` : `Retry missed (${missed.length})`}
              </button>
            )}
            <button
              type="button"
              onClick={restart}
              disabled={reloading}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-70"
            >
              {reloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RotateCcw className="h-3.5 w-3.5" />
              )}
              {reloading
                ? copyZh
                  ? "加载中…"
                  : "Loading…"
                : t(copyLang, "Another set")}
            </button>
            <Link
              href={backHref}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
            >
              {t(copyLang, "Back to practice")}
            </Link>
          </div>
        </div>

        {missed.length > 0 && (
          <section className="mt-8">
            <div className="flex items-baseline justify-between border-b border-line pb-2.5">
              <h2 className="font-display text-xl text-ink">
                {copyZh ? "错题回顾" : "Review missed questions"}
              </h2>
              <span className="text-[11.5px] text-ink-faint tabular">
                {missed.length}{" "}
                {copyZh ? "道需复习" : missed.length === 1 ? "item to fix" : "items to fix"}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {missed.map((item) => {
                const itemZh = copyZh && !!item.stemZh;
                const itemStem = itemZh ? item.stemZh : item.stem;
                const itemOptions =
                  itemZh && item.optionsZh.length === item.options.length
                    ? item.optionsZh
                    : item.options;
                const itemExplanation =
                  itemZh && item.explanationZh ? item.explanationZh : item.explanation;
                const chosenIndex = answers[item.id];
                return (
                  <article key={item.id} className="panel p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                          {item.topicCode}
                        </span>
                        <span className="text-[11.5px] font-medium text-ink-soft">
                          {item.topicTitle}
                        </span>
                      </div>
                      {!copyZh && item.hasConcept && (
                        <Link
                          href={`/en/learn/${item.topicCode}`}
                          className="inline-flex items-center gap-1 text-[11.5px] font-medium text-indigo hover:underline"
                        >
                          <BookOpen className="h-3 w-3" /> Read concept lesson →
                        </Link>
                      )}
                    </div>

                    <div className={cn("mt-3 text-[14px] leading-relaxed text-ink", itemZh && "font-chinese")}>
                      <MathText>{itemStem}</MathText>
                    </div>

                    {item.figure && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                        <img
                          src={item.figure}
                          alt={copyZh ? "题目配图" : "Question diagram"}
                          className="mx-auto max-h-[240px] w-auto"
                        />
                      </div>
                    )}

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {chosenIndex !== undefined && (
                        <div className="rounded-lg border border-rose-500/35 bg-rose-500/8 px-3 py-2 text-[12.5px]">
                          <p className="text-[10px] font-medium tracking-wide text-rose-600 uppercase">
                            {copyZh ? "你的选择" : "Your answer"}
                          </p>
                          <p className="mt-1 text-ink">
                            <span className="mr-1.5 font-semibold">{LETTERS[chosenIndex]}.</span>
                            <MathText inline>{itemOptions[chosenIndex]}</MathText>
                          </p>
                        </div>
                      )}
                      <div className="rounded-lg border border-jade/40 bg-jade-soft/70 px-3 py-2 text-[12.5px]">
                        <p className="text-[10px] font-medium tracking-wide text-jade uppercase">
                          {copyZh ? "正确答案" : "Correct answer"}
                        </p>
                        <p className="mt-1 text-ink">
                          <span className="mr-1.5 font-semibold">{LETTERS[item.correctIndex]}.</span>
                          <MathText inline>{itemOptions[item.correctIndex]}</MathText>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-paper-deep/60 px-3.5 py-2.5">
                      <p className="text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                        {t(copyLang, "Explanation")}
                      </p>
                      <div
                        className={cn(
                          "mt-1 text-[12.5px] leading-relaxed text-ink-soft",
                          itemZh && "font-chinese",
                        )}
                      >
                        <MathText>{itemExplanation}</MathText>
                      </div>
                    </div>

                    <QuestionReviewTools
                      key={item.id}
                      questionId={item.id}
                      initialBookmarked={Boolean(item.bookmarked)}
                      initialNote={item.note ?? null}
                      zh={copyZh}
                    />
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (!question) return null;

  const badge = difficultyBadge(question.difficulty, copyZh);

  return (
    <div className="mx-auto max-w-[820px] px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t(copyLang, "Exit practice")}
        </Link>
        <div className="flex items-center gap-2">
          {durationMin && durationMin > 0 ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tabular",
                remainingSec < 30
                  ? "border-rose-500/35 bg-rose-500/10 text-rose-700"
                  : remainingSec < 120
                    ? "border-gold/40 bg-gold-soft text-gold-deep"
                    : "border-line bg-card text-ink",
              )}
            >
              <Clock3 className="h-3 w-3" />
              {String(Math.floor(remainingSec / 60)).padStart(2, "0")}:
              {String(remainingSec % 60).padStart(2, "0")}
            </span>
          ) : null}
          {streak >= 2 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-jade-soft px-2.5 py-0.5 text-[11px] font-medium text-jade tabular">
              <Flame className="h-3 w-3" />
              {copyZh ? `连对 ${streak} 题` : `${streak} in a row`}
            </span>
          )}
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium",
              badge.cls,
            )}
          >
            {badge.label}
          </span>
          <span className="text-[11px] font-medium text-ink-faint tabular">
            {index + 1} / {activeQuestions.length}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-deep">
        <div
          className="h-full bg-vermillion transition-all"
          style={{
            width: `${((index + (revealed ? 1 : 0)) / activeQuestions.length) * 100}%`,
          }}
        />
      </div>

      <div
        className="mt-2.5 flex flex-wrap items-center gap-1.5"
        role="navigation"
        aria-label={copyZh ? "题目进度" : "Question progress"}
      >
        {activeQuestions.map((item, i) => {
          const itemGiven = answers[item.id];
          const isAnswered = itemGiven !== undefined;
          const isRight = isAnswered && itemGiven === item.correctIndex;
          const isWrong = isAnswered && !isRight;
          const isCurrent = i === index;
          const canJump = isAnswered || i === frontier;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!canJump}
              onClick={() => {
                if (!canJump) return;
                setIndex(i);
                setLang(language);
              }}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={copyZh ? `第 ${i + 1} 题` : `Question ${i + 1}`}
              className={cn(
                "flex h-6 min-w-[1.6rem] items-center justify-center rounded-md border px-1.5 text-[10.5px] font-medium tabular transition",
                isRight && "border-jade/40 bg-jade text-paper",
                isWrong && "border-rose-500/40 bg-rose-600 text-white",
                !isAnswered && isCurrent && "border-ink bg-ink text-paper",
                !isAnswered && !isCurrent && "border-line bg-card text-ink-faint",
                isCurrent && "ring-2 ring-ink/30 ring-offset-1 ring-offset-paper",
                !canJump && "cursor-default opacity-60",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <h1 className="font-display text-xl text-ink">{title}</h1>
          <p className="text-[11px] text-ink-faint">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10.5px] text-ink-faint">
          <span>{question.topicCode}</span>
          <span aria-hidden>·</span>
          <span>{question.topicTitle}</span>
        </span>
      </div>

      <div className="panel mt-4 p-5 sm:p-7">
        <div className={cn("text-[15px] leading-[1.7] text-ink", useZh && "font-chinese")}>
          <MathText>{stem}</MathText>
        </div>

        {question.figure && (
          <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
            <img
              src={question.figure}
              alt={copyZh ? "真题配图" : "Official diagram"}
              className="mx-auto max-h-[300px] w-auto"
            />
          </div>
        )}

        <div
          className="mt-5 space-y-2"
          role="radiogroup"
          aria-label={copyZh ? "选项" : "Answer options"}
        >
          {options.map((option, optionIndex) => {
            const isCorrect = optionIndex === question.correctIndex;
            const isGiven = optionIndex === given;
            return (
              <button
                key={optionIndex}
                type="button"
                role="radio"
                aria-checked={optionIndex === given}
                onClick={() => choose(optionIndex)}
                disabled={revealed}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[14px] transition",
                  !revealed &&
                    "border-line bg-card hover:border-line-strong hover:bg-paper-deep/30",
                  revealed && isCorrect && "border-jade/50 bg-jade-soft",
                  revealed && !isCorrect && isGiven && "border-rose-500/50 bg-rose-500/8",
                  revealed && !isCorrect && !isGiven && "border-line bg-card opacity-60",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                    revealed && isCorrect
                      ? "border-jade bg-jade text-paper"
                      : revealed && isGiven
                        ? "border-rose-600 bg-rose-600 text-white"
                        : "border-line-strong text-ink-faint",
                  )}
                >
                  {revealed && isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : revealed && isGiven ? (
                    <XCircle className="h-3.5 w-3.5" />
                  ) : (
                    LETTERS[optionIndex]
                  )}
                </span>
                <span className={cn("min-w-0 flex-1 text-ink", useZh && "font-chinese")}>
                  <MathText inline>{option}</MathText>
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 rounded-xl border border-line bg-paper-deep/50 p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {given === question.correctIndex ? (
                <span className="text-jade">{t(copyLang, "Correct")}</span>
              ) : (
                <span className="text-rose-600">{t(copyLang, "Not quite")}</span>
              )}
              <span>· {t(copyLang, "Explanation")}</span>
            </p>
            <div
              className={cn(
                "mt-1.5 text-[13px] leading-relaxed text-ink-soft",
                useZh && question.explanationZh && "font-chinese",
              )}
            >
              <MathText>
                {useZh && question.explanationZh ? question.explanationZh : question.explanation}
              </MathText>
            </div>
          </div>
        )}

        <QuestionReviewTools
          key={question.id}
          questionId={question.id}
          initialBookmarked={Boolean(question.bookmarked)}
          initialNote={question.note ?? null}
          zh={copyZh}
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {index > 0 && (
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-[12px] font-medium text-ink transition hover:border-ink/30"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {t(copyLang, "Previous")}
              </button>
            )}
            <p className="hidden text-[11px] text-ink-faint sm:inline">
              {revealed
                ? copyZh
                  ? "按 Enter 或 → 进入下一题"
                  : "Press Enter or → for next"
                : copyZh
                  ? "快捷键：按 A–D 或 1–4 选择答案"
                  : "Tip: press A–D or 1–4 to select"}
            </p>
          </div>
          <button
            type="button"
            onClick={next}
            disabled={!revealed}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition disabled:opacity-40"
          >
            {index === activeQuestions.length - 1 ? t(copyLang, "Finish") : t(copyLang, "Next")}{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
