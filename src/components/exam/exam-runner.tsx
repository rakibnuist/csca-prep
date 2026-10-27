"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Flag,
  Grid3x3,
  Languages,
  Loader2,
  X,
} from "lucide-react";
import { MathText } from "@/components/math-text";
import type { ExamQuestionPayload } from "@/lib/attempts";
import { clock } from "@/lib/exam";
import { cn } from "@/lib/utils";

type Props = {
  attemptId: string;
  slug: string;
  title: string;
  subjectName: string;
  subjectCode: string;
  questions: ExamQuestionPayload[];
  initialAnswers: Record<string, number>;
  initialFlagged: string[];
  initialRemaining: number;
  endAtMs: number;
  durationMin: number;
  bilingual: boolean;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function ExamRunner({
  attemptId,
  slug,
  title,
  subjectName,
  subjectCode,
  questions,
  initialAnswers,
  initialFlagged,
  initialRemaining,
  endAtMs,
  durationMin,
  bilingual,
}: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [flagged, setFlagged] = useState<string[]>(initialFlagged);
  const [index, setIndex] = useState(() => {
    const firstUnanswered = questions.findIndex((question) => initialAnswers[question.id] === undefined);
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [remaining, setRemaining] = useState(initialRemaining);
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submittedRef = useRef(false);
  const stateRef = useRef({ answers, flagged });
  stateRef.current = { answers, flagged };

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const timeCritical = remaining <= 300;

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      setError(null);
      try {
        const response = await fetch(`/api/attempts/${attemptId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: stateRef.current.answers, flagged: stateRef.current.flagged }),
        });
        if (!response.ok) throw new Error("Could not submit the paper.");
        const data = (await response.json()) as { id: string };
        router.push(`/app/results/${data.id}${auto ? "?auto=1" : ""}`);
      } catch (submitError) {
        submittedRef.current = false;
        setSubmitting(false);
        setError(submitError instanceof Error ? submitError.message : "Could not submit the paper.");
      }
    },
    [attemptId, router],
  );

  /* countdown — recomputed from the server end time so a refresh cannot pause it */
  useEffect(() => {
    const tick = () => {
      const next = Math.max(0, Math.round((endAtMs - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) void submit(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endAtMs, submit]);

  /* autosave */
  useEffect(() => {
    if (submittedRef.current) return;
    setSaving("saving");
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/attempts/${attemptId}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, flagged }),
        });
        if (!response.ok) throw new Error();
        const data = (await response.json()) as { savedAt: string };
        setSaving("saved");
        setSavedAt(new Date(data.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch {
        setSaving("error");
      }
    }, 900);
    return () => clearTimeout(timeout);
  }, [answers, flagged, attemptId]);

  /* keyboard shortcuts */
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (confirmOpen || submitting) return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      const key = event.key.toLowerCase();
      if (["1", "2", "3", "4"].includes(key)) {
        event.preventDefault();
        choose(Number(key) - 1);
      } else if (["a", "b", "c", "d"].includes(key)) {
        event.preventDefault();
        choose(["a", "b", "c", "d"].indexOf(key));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => Math.min(questions.length - 1, value + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => Math.max(0, value - 1));
      } else if (key === "f") {
        event.preventDefault();
        toggleFlag();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  /* leave guard */
  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (submittedRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, []);

  const choose = (optionIndex: number) => {
    if (!current) return;
    setAnswers((previous) => ({ ...previous, [current.id]: optionIndex }));
  };

  const clearAnswer = () => {
    if (!current) return;
    setAnswers((previous) => {
      const next = { ...previous };
      delete next[current.id];
      return next;
    });
  };

  const toggleFlag = () => {
    if (!current) return;
    setFlagged((previous) =>
      previous.includes(current.id)
        ? previous.filter((id) => id !== current.id)
        : [...previous, current.id],
    );
  };

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    setPaletteOpen(false);
  };

  const isFlagged = current ? flagged.includes(current.id) : false;
  const selected = current ? answers[current.id] : undefined;

  const useZh = bilingual && lang === "zh" && !!current?.stemZh;
  const stem = useZh ? current?.stemZh : current?.stem;
  const options = useMemo(() => {
    if (!current) return [];
    return useZh && current.optionsZh.length === current.options.length
      ? current.optionsZh
      : current.options;
  }, [current, useZh]);

  const unanswered = questions.length - answeredCount;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* header */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href={`/app/mocks/${slug}`}
              aria-label="Leave the paper"
              className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-1 text-[11px] text-ink-soft hover:text-ink sm:border-0 sm:px-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-ink">{title}</p>
              <p className="truncate text-[10.5px] text-ink-faint">
                {subjectName} · {questions.length} questions · {durationMin} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {bilingual && (
              <button
                type="button"
                onClick={() => setLang((value) => (value === "en" ? "zh" : "en"))}
                className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-ink-soft transition hover:text-ink sm:inline-flex"
                aria-label="Toggle question language"
              >
                <Languages className="h-3.5 w-3.5" />
                {lang === "en" ? "EN" : "中文"}
              </button>
            )}

            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium tabular",
                timeCritical ? "bg-vermillion text-paper" : "bg-ink text-paper",
              )}
              role="timer"
              aria-live={timeCritical ? "polite" : "off"}
            >
              <Clock3 className="h-3.5 w-3.5" />
              {clock(remaining)}
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="inline-flex h-9 items-center rounded-lg bg-vermillion px-3 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="h-0.5 w-full bg-line">
          <div
            className="h-full bg-vermillion transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1240px] flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_280px]">
        {/* question */}
        <div className="min-w-0">
          <div className="panel p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-ink px-2 py-1 text-[11px] font-medium text-paper tabular">
                  {index + 1} / {questions.length}
                </span>
                <span className="text-[11px] text-ink-faint">{current?.topicCode}</span>
                <span className="hidden text-[11px] text-ink-faint sm:inline">
                  · {current?.topicTitle}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded border border-line px-1.5 py-0.5 text-[10.5px] text-ink-faint">
                  {current?.difficulty}
                </span>
                <button
                  type="button"
                  onClick={toggleFlag}
                  className={cn(
                    "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10.5px] transition",
                    isFlagged
                      ? "border-gold/40 bg-gold-soft text-gold"
                      : "border-line text-ink-faint hover:text-ink",
                  )}
                >
                  <Flag className="h-3 w-3" /> {isFlagged ? "Flagged" : "Flag"}
                </button>
              </div>
            </div>

            <div className="mt-5 text-[15.5px] leading-[1.7] text-ink">
              <MathText>{stem}</MathText>
            </div>

            <div
              role="radiogroup"
              aria-label="Answer options"
              className="mt-6 space-y-2"
            >
              {options.map((option, optionIndex) => {
                const active = selected === optionIndex;
                return (
                  <button
                    key={`${current?.id}-${optionIndex}`}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => choose(optionIndex)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition",
                      active
                        ? "border-vermillion/50 bg-vermillion/6 ring-1 ring-vermillion/20"
                        : "border-line bg-card hover:border-line-strong hover:bg-paper-deep/30",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                        active
                          ? "border-vermillion bg-vermillion text-paper"
                          : "border-line-strong text-ink-faint",
                      )}
                    >
                      {active ? <Check className="h-3.5 w-3.5" /> : LETTERS[optionIndex]}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ink">
                      <MathText>{option}</MathText>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11.5px]">
              <button
                type="button"
                onClick={clearAnswer}
                disabled={selected === undefined}
                className="text-ink-faint transition enabled:hover:text-ink disabled:opacity-40"
              >
                Clear answer
              </button>
              <span className="text-ink-faint">
                {selected !== undefined ? "Answer saved" : "Not answered"}
              </span>
            </div>
          </div>

          {/* nav */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              disabled={index === 0}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-3.5 text-[12.5px] font-medium text-ink transition disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </button>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-3 text-[12px] text-ink-soft lg:hidden"
            >
              <Grid3x3 className="h-3.5 w-3.5" /> {answeredCount}/{questions.length}
            </button>

            {index === questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
              >
                Review & submit <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <p className="mt-3 hidden text-[10.5px] text-ink-faint sm:block">
            Shortcuts: <kbd className="rounded border border-line px-1">1–4</kbd> answer ·{" "}
            <kbd className="rounded border border-line px-1">←</kbd>{" "}
            <kbd className="rounded border border-line px-1">→</kbd> navigate ·{" "}
            <kbd className="rounded border border-line px-1">F</kbd> flag
          </p>

          <div className="mt-4 flex items-center justify-between text-[11px] text-ink-faint">
            <span>
              {saving === "saving" && (
                <span className="inline-flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Saving…
                </span>
              )}
              {saving === "saved" && (
                <span className="inline-flex items-center gap-1 text-jade">
                  <CheckCircle2 className="h-3 w-3" /> Saved {savedAt}
                </span>
              )}
              {saving === "error" && (
                <span className="inline-flex items-center gap-1 text-vermillion">
                  <AlertTriangle className="h-3 w-3" /> Not saved — check your connection
                </span>
              )}
            </span>
            <span className="hidden sm:inline">{subjectCode}</span>
          </div>
        </div>

        {/* palette */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <div className="panel p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-wide text-ink uppercase">Palette</p>
                <span className="text-[10.5px] text-ink-faint">
                  {answeredCount}/{questions.length}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-6 gap-1.5">
                {questions.map((question, questionIndex) => {
                  const answered = answers[question.id] !== undefined;
                  const isCurrent = questionIndex === index;
                  const isFlag = flagged.includes(question.id);
                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => goTo(questionIndex)}
                      aria-label={`Question ${questionIndex + 1}${answered ? ", answered" : ", unanswered"}`}
                      className={cn(
                        "relative flex h-8 items-center justify-center rounded-md text-[11px] font-medium tabular transition",
                        isCurrent && "bg-ink text-paper",
                        !isCurrent && answered && "bg-vermillion/15 text-vermillion-deep hover:bg-vermillion/25",
                        !isCurrent && !answered && "border border-line text-ink-faint hover:border-line-strong",
                        isFlag && !isCurrent && "ring-1 ring-gold/60",
                      )}
                    >
                      {questionIndex + 1}
                      {isFlag && (
                        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-line pt-3 text-[10.5px] text-ink-faint">
                <p className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-vermillion/20" /> Answered ({answeredCount})
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm border border-line" /> Unanswered ({unanswered})
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm ring-1 ring-gold/60" /> Flagged ({flagged.length})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-vermillion text-[12px] font-medium text-paper"
              >
                Submit paper
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* mobile palette */}
      {paletteOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setPaletteOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-paper p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-ink">All questions</p>
              <button type="button" onClick={() => setPaletteOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-ink-soft" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-8 gap-1.5">
              {questions.map((question, questionIndex) => {
                const answered = answers[question.id] !== undefined;
                const isCurrent = questionIndex === index;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => goTo(questionIndex)}
                    className={cn(
                      "flex h-8 items-center justify-center rounded-md text-[11px] font-medium tabular",
                      isCurrent && "bg-ink text-paper",
                      !isCurrent && answered && "bg-vermillion/15 text-vermillion-deep",
                      !isCurrent && !answered && "border border-line text-ink-faint",
                    )}
                  >
                    {questionIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* submit confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-xl">
            <p className="eyebrow">Submit paper</p>
            <h2 className="mt-2 font-display text-2xl text-ink">Is this your final answer sheet?</h2>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-card p-3">
                <p className="font-display text-xl text-ink tabular">{answeredCount}</p>
                <p className="text-[10px] text-ink-faint">Answered</p>
              </div>
              <div className="rounded-lg bg-card p-3">
                <p className={cn("font-display text-xl tabular", unanswered > 0 ? "text-vermillion" : "text-ink")}>
                  {unanswered}
                </p>
                <p className="text-[10px] text-ink-faint">Blank</p>
              </div>
              <div className="rounded-lg bg-card p-3">
                <p className="font-display text-xl text-gold tabular">{flagged.length}</p>
                <p className="text-[10px] text-ink-faint">Flagged</p>
              </div>
            </div>

            {unanswered > 0 && (
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-vermillion/6 px-3 py-2 text-[11.5px] text-vermillion-deep">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {unanswered} question{unanswered > 1 ? "s" : ""} still blank. There is no negative
                marking — a guess costs nothing.
              </p>
            )}

            {error && <p className="mt-3 text-[12px] text-vermillion">{error}</p>}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-line-strong text-[12.5px] font-medium text-ink"
              >
                Keep working
              </button>
              <button
                type="button"
                onClick={() => void submit(false)}
                disabled={submitting}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-vermillion text-[12.5px] font-medium text-paper disabled:opacity-70"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {submitting ? "Scoring…" : "Submit & score"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
