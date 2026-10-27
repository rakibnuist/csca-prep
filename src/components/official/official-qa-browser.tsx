"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";

export type OfficialQaQuestion = {
  id: string;
  index: number;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
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
}: {
  questions: OfficialQaQuestion[];
  title: string;
  subjectName: string;
  paperNote: string;
}) {
  const [reveal, setReveal] = useState(true);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[12.5px] font-medium text-ink">{title}</p>
            <p className="text-[11px] text-ink-faint">
              {subjectName} · {questions.length} questions · answer key &amp; analysis
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReveal((value) => !value)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition",
              reveal
                ? "border-line-strong bg-card text-ink hover:border-ink/30"
                : "border-vermillion bg-vermillion text-paper",
            )}
          >
            {reveal ? (
              <>
                <EyeOff className="h-3.5 w-3.5" /> Hide answers
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" /> Show answers
              </>
            )}
          </button>
        </div>

        <p className="mt-2 rounded-lg border border-gold/30 bg-gold-soft/50 px-3 py-2 text-[11px] leading-relaxed text-ink-soft">
          {paperNote}
        </p>

        <div className="mt-4 space-y-3">
          {questions.map((question) => (
            <article key={question.id} id={`q-${question.index}`} className="panel scroll-mt-24 overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 border-b border-line bg-paper-deep/40 px-4 py-2">
                <span className="w-8 shrink-0 text-[11px] font-medium text-ink tabular">
                  Q{question.index}
                </span>
                <span className="rounded bg-paper px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                  {question.topicCode}
                </span>
                <span className="text-[10px] text-ink-faint">{question.topicTitle}</span>
                <span className="ml-auto text-[9.5px] text-ink-faint uppercase">
                  {question.difficulty}
                </span>
              </div>

              <div className="p-4">
                <div className="text-[14px] leading-relaxed text-ink">
                  <MathText>{question.stem}</MathText>
                </div>
                {question.stemZh && (
                  <p className="mt-1.5 font-chinese text-[12.5px] leading-relaxed text-ink-faint">
                    <MathText>{question.stemZh}</MathText>
                  </p>
                )}

                <div className="mt-3 space-y-1.5">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.correctIndex;
                    const zh = question.optionsZh[optionIndex];
                    return (
                      <div
                        key={optionIndex}
                        className={cn(
                          "flex items-start gap-2.5 rounded-lg border px-3 py-2 text-[13px]",
                          reveal && isCorrect
                            ? "border-jade/40 bg-jade-soft/60"
                            : "border-line text-ink-soft",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                            reveal && isCorrect
                              ? "border-jade bg-jade text-paper"
                              : "border-line-strong text-ink-faint",
                          )}
                        >
                          {reveal && isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : LETTERS[optionIndex]}
                        </span>
                        <span className="flex-1">
                          <span className="text-ink">
                            <MathText>{option}</MathText>
                          </span>
                          {zh && (
                            <span className="ml-2 font-chinese text-[11.5px] text-ink-faint">
                              <MathText>{zh}</MathText>
                            </span>
                          )}
                        </span>
                        {reveal && isCorrect && (
                          <span className="shrink-0 text-[9px] font-medium tracking-wide text-jade uppercase">
                            Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {reveal && (
                  <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                    <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                      Analysis
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                      <MathText>{question.explanation}</MathText>
                    </p>
                    {question.explanationZh && (
                      <p className="mt-1 font-chinese text-[11.5px] leading-relaxed text-ink-faint">
                        <MathText>{question.explanationZh}</MathText>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
        <div className="panel p-4">
          <p className="eyebrow">Question index</p>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {questions.map((question) => (
              <a
                key={question.id}
                href={`#q-${question.index}`}
                className="flex h-7 items-center justify-center rounded-md border border-line text-[10.5px] font-medium text-ink-faint tabular transition hover:border-vermillion/40 hover:text-vermillion"
              >
                {question.index}
              </a>
            ))}
          </div>
        </div>

        <div className="panel p-4">
          <p className="eyebrow">Study tip</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
            Hide the answers, work each question, then reveal to check. Then take the timed version
            to see your real speed.
          </p>
          <Link
            href="/app/mocks"
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-ink text-[12px] font-medium text-paper"
          >
            Take a timed mock <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
