"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PreviewQuestion = {
  subject: "Mathematics" | "Physics" | "Chemistry";
  short: string;
  topic: string;
  difficulty: string;
  stem: string;
  options: { key: string; text: string }[];
  correctIndex: number;
  explanation: string;
};

const SAMPLE_QUESTIONS: PreviewQuestion[] = [
  {
    subject: "Mathematics",
    short: "Math",
    topic: "Derivatives · M2.4",
    difficulty: "Medium",
    stem: "What is the derivative of f(x) = 9x⁵ with respect to x?",
    options: [
      { key: "A", text: "45x⁴" },
      { key: "B", text: "5x⁹" },
      { key: "C", text: "9x⁴" },
      { key: "D", text: "45x⁵" },
    ],
    correctIndex: 0,
    explanation:
      "Power rule: d/dx (a·xⁿ) = a·n·xⁿ⁻¹. With a = 9 and n = 5, we get 9 × 5·x⁴ = 45x⁴.",
  },
  {
    subject: "Physics",
    short: "Physics",
    topic: "Kinematics · P1.1",
    difficulty: "Medium",
    stem: "A car accelerates uniformly from rest at 3 m/s² for 4 s. What distance does it cover?",
    options: [
      { key: "A", text: "12 m" },
      { key: "B", text: "24 m" },
      { key: "C", text: "36 m" },
      { key: "D", text: "48 m" },
    ],
    correctIndex: 1,
    explanation:
      "Use s = ut + ½at² with u = 0, a = 3 m/s², and t = 4 s: s = 0 + ½ × 3 × 16 = 24 m.",
  },
  {
    subject: "Chemistry",
    short: "Chem",
    topic: "Stoichiometry · C2.2",
    difficulty: "Easy",
    stem: "How many moles of O₂ are required to burn 2 mol of CH₄ completely (CH₄ + 2O₂ → CO₂ + 2H₂O)?",
    options: [
      { key: "A", text: "1 mol" },
      { key: "B", text: "2 mol" },
      { key: "C", text: "4 mol" },
      { key: "D", text: "6 mol" },
    ],
    correctIndex: 2,
    explanation:
      "From the balanced equation, 1 mol CH₄ reacts with 2 mol O₂, so 2 mol CH₄ requires 4 mol O₂.",
  },
];

export function ExamPreview({ className }: { className?: string }) {
  const [tab, setTab] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});

  const question = SAMPLE_QUESTIONS[tab];
  const given = picked[tab];
  const answered = given !== undefined;
  const isCorrect = given === question.correctIndex;

  const choose = (optionIndex: number) => {
    setPicked((prev) => ({ ...prev, [tab]: optionIndex }));
  };

  const resetCurrent = () => {
    setPicked((prev) => {
      const next = { ...prev };
      delete next[tab];
      return next;
    });
  };

  const nextSubject = () => {
    setTab((current) => (current + 1) % SAMPLE_QUESTIONS.length);
  };

  return (
    <div className={cn("relative max-w-full", className)}>
      <div className="panel overflow-hidden">
        {/* top chrome */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper px-4 py-2.5">
          <div className="flex items-center gap-1 rounded-xl bg-paper-deep p-1">
            {SAMPLE_QUESTIONS.map((item, idx) => {
              const active = idx === tab;
              const itemDone = picked[idx] !== undefined;
              const itemRight = itemDone && picked[idx] === item.correctIndex;
              return (
                <button
                  key={item.subject}
                  type="button"
                  onClick={() => setTab(idx)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition",
                    active
                      ? "bg-white text-ink shadow-xs"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      itemDone
                        ? itemRight
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                        : active
                          ? "bg-vermillion"
                          : "bg-line-strong",
                    )}
                  />
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.subject}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-ink px-2.5 py-1 text-[11px] font-medium text-white tabular">
            <Clock className="h-3 w-3 text-vermillion-light" /> 60:00
          </div>
        </div>

        {/* question body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 text-[11px] text-ink-faint">
            <span className="inline-flex items-center gap-1 font-medium text-indigo">
              <Sparkles className="h-3 w-3" /> Try a real CSCA question
            </span>
            <span className="rounded-md border border-line bg-paper px-2 py-0.5 text-[10.5px] font-medium text-ink-soft">
              {question.topic} · {question.difficulty}
            </span>
          </div>

          <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-ink">
            {question.stem}
          </p>

          <div className="mt-3.5 space-y-2" role="radiogroup" aria-label="Sample question options">
            {question.options.map((option, index) => {
              const isOptionCorrect = index === question.correctIndex;
              const isOptionPicked = index === given;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="radio"
                  aria-checked={isOptionPicked}
                  onClick={() => choose(index)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] transition",
                    !answered &&
                      "border-line bg-card text-ink hover:border-vermillion/45 hover:bg-indigo-soft/40",
                    answered &&
                      isOptionCorrect &&
                      "border-emerald-500/50 bg-emerald-50 text-ink",
                    answered &&
                      !isOptionCorrect &&
                      isOptionPicked &&
                      "border-rose-500/50 bg-rose-50 text-ink",
                    answered &&
                      !isOptionCorrect &&
                      !isOptionPicked &&
                      "border-line bg-card text-ink-soft opacity-65",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10.5px] font-semibold transition",
                      answered && isOptionCorrect
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : answered && isOptionPicked
                          ? "border-rose-600 bg-rose-600 text-white"
                          : "border-line-strong bg-paper text-ink-soft",
                    )}
                  >
                    {answered && isOptionCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : answered && isOptionPicked ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      option.key
                    )}
                  </span>
                  <span className="flex-1 font-medium">{option.text}</span>
                  {answered && isOptionCorrect && (
                    <span className="text-[10px] font-semibold tracking-wide text-emerald-700 uppercase">
                      Correct
                    </span>
                  )}
                  {answered && !isOptionCorrect && isOptionPicked && (
                    <span className="text-[10px] font-semibold tracking-wide text-rose-600 uppercase">
                      Your pick
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {answered ? (
            <div className="mt-3.5 rounded-xl border border-line bg-paper p-3.5">
              <p className="text-[10.5px] font-semibold tracking-wide uppercase">
                {isCorrect ? (
                  <span className="text-emerald-700">Correct · Worked solution</span>
                ) : (
                  <span className="text-rose-600">Not quite · Worked solution</span>
                )}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                {question.explanation}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetCurrent}
                    className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-soft hover:text-ink"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                  <button
                    type="button"
                    onClick={nextSubject}
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-indigo hover:underline"
                  >
                    Next subject →
                  </button>
                </div>
                <Link
                  href="/free-exam"
                  className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-vermillion hover:underline"
                >
                  Try a full mock <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-3.5 flex items-center justify-between border-t border-line/70 pt-3 text-[11.5px] text-ink-faint">
              <span>Click any option above to check your answer</span>
              <Link
                href="/free-exam"
                className="font-medium text-vermillion hover:underline"
              >
                10-Q diagnostic →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
