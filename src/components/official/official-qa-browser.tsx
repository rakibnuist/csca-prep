"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, EyeOff, RotateCcw, XCircle } from "lucide-react";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export type OfficialQaQuestion = {
  id: string;
  index: number;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
  figure: string | null;
  correctIndex: number;
  explanation: string;
  explanationZh: string | null;
  topicCode: string;
  topicTitle: string;
  difficulty: string;
};

const LETTERS = ["A", "B", "C", "D"];

export function OfficialQaBrowser({
  questions,
  title,
  subjectName,
  paperNote,
  language = "en",
  mocksHref = "/app/mocks",
}: {
  questions: OfficialQaQuestion[];
  title: string;
  subjectName: string;
  paperNote: string;
  /** Fixed by the teaching track: only one language is shown. */
  language?: "en" | "zh";
  /** Keeps the timed-mock link inside the same teaching section. */
  mocksHref?: string;
}) {
  const [revealAll, setRevealAll] = useState(false);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const showZh = language === "zh";

  const checkedCount = Object.keys(picked).length;
  const correctCount = questions.filter((q) => picked[q.id] === q.correctIndex).length;

  const choose = (questionId: string, optionIndex: number) => {
    setPicked((previous) => ({ ...previous, [questionId]: optionIndex }));
  };

  const toggleQuestionReveal = (questionId: string) => {
    const isCurrentlyShown = Boolean(revealedIds[questionId]) || picked[questionId] !== undefined;
    if (isCurrentlyShown) {
      setRevealedIds((previous) => {
        const next = { ...previous };
        delete next[questionId];
        return next;
      });
      setPicked((previous) => {
        if (previous[questionId] === undefined) return previous;
        const next = { ...previous };
        delete next[questionId];
        return next;
      });
    } else {
      setRevealedIds((previous) => ({ ...previous, [questionId]: true }));
    }
  };

  const resetSelfTest = () => {
    setPicked({});
    setRevealedIds({});
  };

  const toggleRevealAll = () => {
    setRevealAll((current) => {
      if (current) setRevealedIds({});
      return !current;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-ink">{title}</p>
            <p className="text-[11px] text-ink-faint">
              {subjectName} · {questions.length} {t(language, "questions")} ·{" "}
              {showZh ? "中文题目与解析（点击选项可自测）" : "English paper text · click an option to self-test"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {checkedCount > 0 && (
              <>
                <span className="inline-flex h-9 items-center rounded-lg border border-jade/30 bg-jade-soft/70 px-3 text-[11.5px] font-medium text-jade tabular">
                  {showZh
                    ? `已自测 ${checkedCount}/${questions.length} · 答对 ${correctCount}`
                    : `Self-tested ${checkedCount}/${questions.length} · ${correctCount} correct`}
                </span>
                <button
                  type="button"
                  onClick={resetSelfTest}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-line-strong bg-card px-2.5 text-[11.5px] font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {showZh ? "重置" : "Reset"}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={toggleRevealAll}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition",
                revealAll
                  ? "border-line-strong bg-card text-ink hover:border-ink/30"
                  : "border-vermillion bg-vermillion text-paper hover:bg-vermillion-deep",
              )}
            >
              {revealAll ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" /> {t(language, "Hide answers")}
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> {t(language, "Show answers")}
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-2 rounded-lg border border-gold/30 bg-gold-soft/50 px-3 py-2 text-[11px] leading-relaxed text-ink-soft">
          {paperNote}
        </p>

        <div className="mt-4 space-y-3">
          {questions.map((question) => {
            const given = picked[question.id];
            const isShown = revealAll || Boolean(revealedIds[question.id]) || given !== undefined;
            return (
              <article key={question.id} id={`q-${question.index}`} className="panel scroll-mt-24 overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 border-b border-line bg-paper-deep/40 px-4 py-2">
                  <span className="min-w-[2.75rem] shrink-0 whitespace-nowrap text-[11px] font-medium text-ink tabular">
                    {showZh ? `第${question.index}题` : `Q${question.index}`}
                  </span>
                  <span className="rounded bg-paper px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                    {question.topicCode}
                  </span>
                  <span className="text-[10px] text-ink-faint">{question.topicTitle}</span>
                  <div className="ml-auto flex items-center gap-2.5">
                    <span className="text-[9.5px] text-ink-faint uppercase">
                      {showZh
                        ? question.difficulty === "EASY"
                          ? "简单"
                          : question.difficulty === "HARD"
                            ? "困难"
                            : "中等"
                        : question.difficulty}
                    </span>
                    {!revealAll && (
                      <button
                        type="button"
                        onClick={() => toggleQuestionReveal(question.id)}
                        className="inline-flex items-center gap-1 rounded border border-line bg-card px-2 py-0.5 text-[10.5px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink"
                      >
                        {isShown ? (
                          <>
                            <EyeOff className="h-3 w-3" />
                            {showZh ? "隐藏本题解析" : "Hide answer"}
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3" />
                            {showZh ? "查看本题答案" : "Check answer"}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className={cn("text-[14px] leading-relaxed text-ink", showZh && "font-chinese")}>
                    <MathText>
                      {showZh && question.stemZh ? question.stemZh : question.stem}
                    </MathText>
                  </div>

                  {question.figure && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                      <img
                        src={question.figure}
                        alt={showZh ? "真题配图" : "Official exam diagram"}
                        className="mx-auto max-h-[320px] w-auto"
                      />
                    </div>
                  )}

                  <div className="mt-3 space-y-1.5">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === question.correctIndex;
                      const isGiven = optionIndex === given;
                      const translated =
                        showZh &&
                        question.optionsZh.length === question.options.length &&
                        question.optionsZh[optionIndex];
                      const optionText = translated || option;
                      return (
                        <button
                          key={optionIndex}
                          type="button"
                          onClick={() => choose(question.id, optionIndex)}
                          className={cn(
                            "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-[13px] transition",
                            !isShown &&
                              "border-line bg-card text-ink-soft hover:border-line-strong hover:bg-paper-deep/30",
                            isShown && isCorrect && "border-jade/40 bg-jade-soft/60",
                            isShown && !isCorrect && isGiven && "border-rose-500/40 bg-rose-500/8",
                            isShown && !isCorrect && !isGiven && "border-line text-ink-soft",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                              isShown && isCorrect
                                ? "border-jade bg-jade text-paper"
                                : isShown && isGiven
                                  ? "border-rose-600 bg-rose-600 text-white"
                                  : "border-line-strong text-ink-faint",
                            )}
                          >
                            {isShown && isCorrect ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : isShown && isGiven ? (
                              <XCircle className="h-3.5 w-3.5" />
                            ) : (
                              LETTERS[optionIndex]
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={cn("text-ink", translated && "font-chinese")}>
                              <MathText inline>{optionText}</MathText>
                            </span>
                          </span>
                          {isShown && isCorrect && (
                            <span className="shrink-0 text-[9px] font-medium tracking-wide text-jade uppercase">
                              {t(language, "Answer")}
                            </span>
                          )}
                          {isShown && !isCorrect && isGiven && (
                            <span className="shrink-0 text-[9px] font-medium tracking-wide text-rose-600 uppercase">
                              {showZh ? "你的选择" : "Yours"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isShown && (
                    <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                      <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                        {t(language, "Analysis")}
                      </p>
                      <div
                        className={cn(
                          "mt-1 text-[12.5px] leading-relaxed text-ink-soft",
                          showZh && question.explanationZh && "font-chinese",
                        )}
                      >
                        <MathText>
                          {showZh && question.explanationZh
                            ? question.explanationZh
                            : question.explanation}
                        </MathText>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="min-w-0 space-y-4 lg:sticky lg:top-8 lg:self-start">
        <div className="panel p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="eyebrow">{t(language, "Question index")}</p>
            {checkedCount > 0 && (
              <span className="text-[10.5px] font-medium text-jade tabular">
                {correctCount}/{checkedCount}
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {questions.map((question) => {
              const given = picked[question.id];
              const isCorrect = given !== undefined && given === question.correctIndex;
              const isWrong = given !== undefined && given !== question.correctIndex;
              const isRevealed = Boolean(revealedIds[question.id]);
              return (
                <a
                  key={question.id}
                  href={`#q-${question.index}`}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-md border text-[10.5px] font-medium tabular transition",
                    isCorrect
                      ? "border-jade/40 bg-jade-soft font-semibold text-jade"
                      : isWrong
                        ? "border-rose-500/40 bg-rose-500/10 font-semibold text-rose-600"
                        : isRevealed
                          ? "border-gold/40 bg-gold-soft text-gold-deep"
                          : "border-line text-ink-faint hover:border-vermillion/40 hover:text-vermillion",
                  )}
                >
                  {question.index}
                </a>
              );
            })}
          </div>
        </div>

        <div className="panel p-4">
          <p className="eyebrow">{t(language, "Study tip")}</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
            {showZh
              ? "先点击选项逐题自测，或先隐藏答案自行演算再核对。然后用计时模式检验真实速度。"
              : "Click any option to self-test question by question, or reveal the working when stuck. Then take the timed version to check your speed."}
          </p>
          <Link
            href={mocksHref}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-ink text-[12px] font-medium text-paper"
          >
            {t(language, "Take a timed mock")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
