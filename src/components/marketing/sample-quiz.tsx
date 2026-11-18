"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, RotateCcw, X } from "lucide-react";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";

export type SampleQuestion = {
  id: string;
  subject: string;
  subjectLabel: string;
  stem: string;
  options: string[];
  correct: number;
  explanation: string;
};

const LETTERS = ["A", "B", "C", "D"];

export function SampleQuiz({ questions }: { questions: SampleQuestion[] }) {
  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    for (const question of questions) seen.set(question.subject, question.subjectLabel);
    return [...seen.entries()].map(([code, label]) => ({ code, label }));
  }, [questions]);

  const [subject, setSubject] = useState(subjects[0]?.code ?? "MATH");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const pool = questions.filter((question) => question.subject === subject);
  const answered = pool.filter((question) => answers[question.id] !== undefined).length;
  const correct = pool.filter((question) => answers[question.id] === question.correct).length;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {subjects.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => setSubject(item.code)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] transition",
              item.code === subject
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11.5px] text-ink-faint">
        <span>
          {answered}/{pool.length} answered · {correct} correct
        </span>
        <button
          type="button"
          onClick={() =>
            setAnswers((previous) => {
              const next = { ...previous };
              for (const question of pool) delete next[question.id];
              return next;
            })
          }
          className="inline-flex items-center gap-1 hover:text-ink"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="mt-3 space-y-4">
        {pool.map((question, index) => {
          const given = answers[question.id];
          const revealed = given !== undefined;
          return (
            <article key={question.id} className="panel p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  Question {index + 1}
                </span>
                {revealed &&
                  (given === question.correct ? (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-jade">
                      <CheckCircle2 className="h-3 w-3" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-vermillion">
                      <X className="h-3 w-3" /> Not quite
                    </span>
                  ))}
              </div>

              <div className="mt-2 text-[14px] leading-relaxed text-ink">
                <MathText>{question.stem}</MathText>
              </div>

              <div
                className="mt-3 space-y-1.5"
                role="radiogroup"
                aria-label={`Options for question ${index + 1}`}
              >
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.correct;
                  const isGiven = optionIndex === given;
                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      role="radio"
                      aria-checked={isGiven}
                      disabled={revealed}
                      onClick={() =>
                        setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))
                      }
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-[13px] transition",
                        !revealed && "border-line bg-card hover:border-line-strong",
                        revealed && isCorrect && "border-jade/50 bg-jade-soft",
                        revealed && !isCorrect && isGiven && "border-vermillion/50 bg-vermillion/6",
                        revealed && !isCorrect && !isGiven && "border-line opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                          revealed && isCorrect
                            ? "border-jade bg-jade text-paper"
                            : revealed && isGiven
                              ? "border-vermillion bg-vermillion text-paper"
                              : "border-line-strong text-ink-faint",
                        )}
                      >
                        {LETTERS[optionIndex]}
                      </span>
                      <span className="min-w-0 flex-1 text-ink">
                        <MathText inline>{option}</MathText>
                      </span>
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                  <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                    Why
                  </p>
                  <div className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                    <MathText>{question.explanation}</MathText>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {pool.length > 0 && answered === pool.length && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-jade/30 bg-jade-soft/50 px-4 py-3 sm:flex-row sm:items-center">
            <p className="flex min-w-0 flex-1 items-center gap-2 text-[12.5px] text-ink">
              <Check className="h-4 w-4 shrink-0 text-jade" />
              <span>
                {correct} of {pool.length} correct on this sample.
              </span>
            </p>
            <Link
              href="/sign-up"
              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
            >
              Try a full paper <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-line bg-paper-deep/70 p-4">
            <p className="text-[11px] font-semibold tracking-[0.1em] text-jade uppercase">
              Next step · Match your score to a university
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
              Have your target CSCA score? Get a{" "}
              <strong className="text-ink">Free Education Fit Assessment</strong> from{" "}
              <strong className="text-ink">EduExpress International</strong> to see which Chinese
              universities and CSC scholarships match your profile — plus claim a{" "}
              <strong className="text-ink">free CSCA Master Pro code (¥99 value)</strong> when you
              open your verified China application file in Bangladesh (0 BDT file-opening fee).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://eduexpressint.com/education-fit-assessment?utm_source=cscamaster&utm_medium=post_mock_hook&utm_campaign=csca_pro_access"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-vermillion px-3.5 text-[11.5px] font-medium text-paper transition hover:opacity-95"
              >
                Get Free Education Fit Assessment &amp; Pro Code <ArrowRight className="h-3 w-3" />
              </a>
              <a
                href="https://eduexpressint.com/csc-scholarship-bangladesh?utm_source=cscamaster&utm_medium=post_mock_hook&utm_campaign=csca_pro_access"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-card px-3 text-[11.5px] font-medium text-ink transition hover:border-line-strong"
              >
                CSC Scholarship Guide
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
