"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, TriangleAlert } from "lucide-react";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";

export type DiagnosticQuestion = {
  id: string;
  subjectCode: string;
  subjectLabel: string;
  topicCode: string;
  stem: string;
  options: string[];
  correct: number;
};

const LETTERS = ["A", "B", "C", "D"];
const PRACTICE_HREF: Record<string, string> = {
  MATH: "/practice/mathematics",
  PHYS: "/practice/physics",
  CHEM: "/practice/chemistry",
};

/**
 * Free 12-question CSCA check.
 *
 * Runs entirely in the browser: answers are never sent anywhere. At the end it
 * shows the raw score, an indicative band, and the exact topics that cost
 * marks — the teaser for the full in-app diagnostic.
 */
export function DiagnosticQuiz({ questions }: { questions: DiagnosticQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const current = questions[index];
  const answered = answers[current.id];
  const isLast = index === questions.length - 1;

  const correct = questions.filter((q) => answers[q.id] === q.correct).length;
  const percent = Math.round((correct / questions.length) * 100);

  const weak = useMemo(
    () => questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct),
    [answers, questions],
  );
  const weakTopics = useMemo(() => {
    const map = new Map<string, { subjectCode: string; subjectLabel: string; topicCode: string; count: number }>();
    for (const q of weak) {
      const key = `${q.subjectCode}:${q.topicCode}`;
      const entry = map.get(key);
      if (entry) entry.count += 1;
      else
        map.set(key, {
          subjectCode: q.subjectCode,
          subjectLabel: q.subjectLabel,
          topicCode: q.topicCode,
          count: 1,
        });
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [weak]);

  if (done) {
    const low = Math.max(0, percent - 8);
    const high = Math.min(100, percent + 8);
    return (
      <div className="rounded-xl border border-line bg-card p-5 sm:p-6">
        <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
          Result
        </p>
        <p className="mt-2 font-display text-3xl text-ink">
          {correct}/{questions.length} correct
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">
          Indicative CSCA band: <span className="font-medium text-ink">{low}–{high}</span> / 100.
          Twelve questions is a spot check, not a full paper — treat the band as a rough signal.
        </p>

        <div className="mt-5">
          <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
            Where you lost marks
          </p>
          {weakTopics.length === 0 ? (
            <p className="mt-2 flex items-center gap-2 text-[13px] text-ink-soft">
              <CheckCircle2 className="h-4 w-4 text-jade" /> Clean sweep on this sample. Sit a full
              paper next.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {weakTopics.map((topic) => {
                const syllabusHref = `/syllabus/${topic.subjectCode.toLowerCase()}#${topic.topicCode}`;
                const practiceHref = PRACTICE_HREF[topic.subjectCode] ?? "/practice";
                return (
                  <li
                    key={`${topic.subjectCode}:${topic.topicCode}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-vermillion/25 bg-vermillion/5 px-3 py-2 text-[12px]"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-ink">
                      <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-vermillion" />
                      <span className="min-w-0 truncate">
                        {topic.subjectLabel} · <span className="font-mono text-[11px]">{topic.topicCode}</span>
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-wrap items-center gap-2.5 text-[11px]">
                      <span className="text-ink-faint">{topic.count} missed</span>
                      <Link
                        href={syllabusHref}
                        className="font-medium text-ink underline decoration-line-strong underline-offset-2 hover:text-vermillion"
                      >
                        Syllabus
                      </Link>
                      <Link
                        href={practiceHref}
                        className="font-medium text-vermillion underline decoration-vermillion/35 underline-offset-2 hover:decoration-vermillion"
                      >
                        Practice
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/sign-up"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            Run the full diagnostic <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setIndex(0);
              setDone(false);
            }}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between text-[11px] text-ink-faint">
        <span className="font-medium">
          Question {index + 1} / {questions.length}
        </span>
        <span>{current.subjectLabel}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-deep">
        <div
          className="h-full bg-vermillion transition-all"
          style={{ width: `${((index + (answered !== undefined ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-4 text-[14px] leading-[1.7] text-ink">
        <MathText>{current.stem}</MathText>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-1.5">
        {current.options.map((option, optionIndex) => {
          const chosen = answered === optionIndex;
          return (
            <button
              key={optionIndex}
              type="button"
              onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }))}
              className={cn(
                "flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[13px] transition",
                chosen
                  ? "border-ink/30 bg-paper-deep text-ink"
                  : "border-line bg-paper text-ink-soft hover:border-ink/20",
              )}
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-strong text-[10px] font-medium">
                {LETTERS[optionIndex]}
              </span>
              <span className="min-w-0 flex-1">
                <MathText inline>{option}</MathText>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="inline-flex h-9 items-center rounded-lg border border-line px-3 text-[12px] text-ink-soft disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          disabled={answered === undefined}
          onClick={() => (isLast ? setDone(true) : setIndex(index + 1))}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12px] font-medium text-paper disabled:opacity-40"
        >
          {isLast ? "See my weak spots" : "Next"} <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
