"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";

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
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function PracticeRunner({
  questions,
  title,
  subtitle,
  backHref,
  restartHref,
}: {
  questions: PracticeQuestion[];
  title: string;
  subtitle: string;
  backHref: string;
  restartHref: string;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [lang, setLang] = useState<"en" | "zh">("en");

  const question = questions[index];
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

  const correctCount = questions.filter((item) => answers[item.id] === item.correctIndex).length;
  const missed = questions.filter(
    (item) => answers[item.id] !== undefined && answers[item.id] !== item.correctIndex,
  );

  const choose = (optionIndex: number) => {
    if (!question || revealed) return;
    setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }));
    void fetch("/api/practice/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: question.id,
        correct: optionIndex === question.correctIndex,
      }),
    }).catch(() => undefined);
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setLang("en");
  };

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="panel p-7 text-center">
          <p className="eyebrow">Session complete</p>
          <p className="mt-3 font-display text-6xl text-ink tabular">
            {correctCount}
            <span className="text-2xl text-ink-faint">/{questions.length}</span>
          </p>
          <p className="mt-1 text-[13px] text-ink-soft">{pct}% correct</p>

          {missed.length > 0 && (
            <div className="mt-6 text-left">
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                Worth revisiting
              </p>
              <ul className="mt-2 space-y-1.5">
                {missed.map((item) => (
                  <li key={item.id} className="text-[12px] text-ink-soft">
                    <span className="text-ink-faint">{item.topicCode}</span> · {item.topicTitle}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href={restartHref}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Another set
            </Link>
            <Link
              href={backHref}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
            >
              Back to practice
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="mx-auto max-w-[820px] px-5 py-8">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Exit practice
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang((value) => (value === "en" ? "zh" : "en"))}
            className="rounded-md border border-line px-2 py-1 text-[10.5px] text-ink-soft"
          >
            {lang === "en" ? "EN" : "中文"}
          </button>
          <span className="text-[11px] text-ink-faint tabular">
            {index + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-deep">
        <div
          className="h-full bg-vermillion transition-all"
          style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-xl text-ink">{title}</h1>
          <p className="text-[11px] text-ink-faint">{subtitle}</p>
        </div>
        <span className="text-[10.5px] text-ink-faint">
          {question.topicCode} · {question.difficulty}
        </span>
      </div>

      <div className="panel mt-4 p-5 sm:p-7">
        <div className="text-[15px] leading-[1.7] text-ink">
          <MathText>{stem}</MathText>
        </div>

        {question.figure && (
          <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
            <img src={question.figure} alt="Official diagram" className="mx-auto max-h-[300px] w-auto" />
          </div>
        )}

        <div className="mt-5 space-y-2" role="radiogroup" aria-label="Answer options">
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
                  !revealed && "border-line bg-card hover:border-line-strong hover:bg-paper-deep/30",
                  revealed && isCorrect && "border-jade/50 bg-jade-soft",
                  revealed && !isCorrect && isGiven && "border-vermillion/50 bg-vermillion/6",
                  revealed && !isCorrect && !isGiven && "border-line bg-card opacity-60",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                    revealed && isCorrect
                      ? "border-jade bg-jade text-paper"
                      : revealed && isGiven
                        ? "border-vermillion bg-vermillion text-paper"
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
                <span className="flex-1 text-ink">
                  <MathText>{option}</MathText>
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 rounded-xl border border-line bg-paper-deep/50 p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {given === question.correctIndex ? (
                <span className="text-jade">Correct</span>
              ) : (
                <span className="text-vermillion">Not quite</span>
              )}
              <span>· Explanation</span>
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
              <MathText>{useZh && question.explanationZh ? question.explanationZh : question.explanation}</MathText>
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[11px] text-ink-faint">
            {revealed ? "Answer recorded" : "Choose an answer to see the explanation"}
          </p>
          <button
            type="button"
            onClick={next}
            disabled={!revealed}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition disabled:opacity-40"
          >
            {index === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
