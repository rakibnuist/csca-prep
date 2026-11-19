"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Flag,
  Grid3x3,
  Languages,
  Loader2,
  Maximize2,
  X,
} from "lucide-react";
import { MathText } from "@/components/math-text";
import { TestClientGate, type ExamMode } from "@/components/exam/test-client-gate";
import type { ExamQuestionPayload } from "@/lib/attempts";
import { abandonAttemptAction } from "@/lib/actions/attempts";
import { clock } from "@/lib/exam";
import { trackLink } from "@/lib/tracks";
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
  /** Locked paper language for the teaching track. */
  language?: "en" | "zh";
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function ExamRunner({
  attemptId,
  slug,
  title,
  subjectName,
  questions,
  initialAnswers,
  initialFlagged,
  initialRemaining,
  endAtMs,
  durationMin,
  bilingual,
  language = "en",
}: Props) {
  const router = useRouter();
  const track = language === "zh" ? "CN" : "EN";
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [flagged, setFlagged] = useState<string[]>(initialFlagged);
  const [index, setIndex] = useState(() => {
    const firstUnanswered = questions.findIndex((question) => initialAnswers[question.id] === undefined);
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [remaining, setRemaining] = useState(initialRemaining);
  const [lang, setLang] = useState<"en" | "zh">(language);
  const zh = language === "zh";
  const L = (en: string, cn: string) => (zh ? cn : en);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [figureOpen, setFigureOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* Test Client start sequence: official mode mirrors the real client, which
     cannot be entered without the system check, the pledge and full screen. */
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<ExamMode>("official");
  const [focusLost, setFocusLost] = useState(0);
  const [proctorNotice, setProctorNotice] = useState(false);

  const submittedRef = useRef(false);
  const startedRef = useRef(false);
  const exitingRef = useRef(false);
  const stateRef = useRef({ answers, flagged });

  /* Pacing: how long each question was actually on screen. Refs, not state —
     this ticks every second and must never re-render the paper. Hidden tabs do
     not accrue time, so a break does not show up as a slow question. */
  const dwellRef = useRef<Record<string, number>>({});
  const indexRef = useRef(index);
  const questionsRef = useRef(questions);
  const hotkeyLockRef = useRef(false);

  useEffect(() => {
    stateRef.current = { answers, flagged };
    indexRef.current = index;
    questionsRef.current = questions;
    startedRef.current = started;
    exitingRef.current = exiting;
    hotkeyLockRef.current =
      !started || confirmOpen || exitOpen || figureOpen || paletteOpen || submitting || exiting;
  }, [answers, flagged, index, questions, started, confirmOpen, exitOpen, figureOpen, paletteOpen, submitting, exiting]);

  useEffect(() => {
    if (!started) return;
    let last = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      const delta = now - last;
      last = now;
      if (document.hidden) return;
      // A throttled or suspended tab produces a gap that belongs to no single
      // question; drop it rather than blame the question that was open.
      if (delta <= 0 || delta > 5000) return;
      const question = questionsRef.current[indexRef.current];
      if (!question) return;
      dwellRef.current[question.id] = (dwellRef.current[question.id] ?? 0) + delta;
    }, 1000);
    return () => window.clearInterval(id);
  }, [started]);

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

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
          body: JSON.stringify({
            answers: stateRef.current.answers,
            flagged: stateRef.current.flagged,
            timePerQuestion: dwellRef.current,
          }),
        });
        if (!response.ok) {
          throw new Error(zh ? "交卷失败，请稍后重试。" : "Could not submit the paper.");
        }
        const data = (await response.json()) as { id: string };
        const params = new URLSearchParams();
        if (auto) params.set("auto", "1");
        if (focusLost > 0) params.set("focus", String(focusLost));
        const query = params.toString();
        router.push(trackLink(`/app/results/${data.id}`, track) + (query ? `?${query}` : ""));
      } catch (submitError) {
        submittedRef.current = false;
        setSubmitting(false);
        setError(
          submitError instanceof Error
            ? submitError.message
            : zh
              ? "交卷失败，请稍后重试。"
              : "Could not submit the paper.",
        );
      }
    },
    [attemptId, router, focusLost, track, zh],
  );

  /**
   * Leave the paper for good. The attempt is deleted, so it does not
   * auto-submit as a zero at the deadline and it does not use up one of the
   * two free attempts. Previously the Exit link pointed back at the briefing
   * page, which bounced straight back into the exam.
   */
  const leavePaper = useCallback(async () => {
    exitingRef.current = true;
    setExiting(true);
    const formData = new FormData();
    formData.set("attemptId", attemptId);
    formData.set("slug", slug);
    try {
      await abandonAttemptAction(formData);
    } catch {
      exitingRef.current = false;
      // The action redirects on success; if it failed, fall back to the
      // briefing page rather than leaving the student stuck.
      router.push(trackLink(`/app/mocks/${slug}`, track));
    } finally {
      setExiting(false);
    }
  }, [attemptId, slug, router, track]);

  /* proctoring signal: the real client is full screen and watches for tab or
     window switches. We count them and show the same kind of warning. */
  useEffect(() => {
    if (!started || mode !== "official") return;
    let hideTimer: number | undefined;
    const onBlur = () => {
      setFocusLost((value) => value + 1);
      setProctorNotice(true);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setProctorNotice(false), 6000);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      window.removeEventListener("blur", onBlur);
    };
  }, [started, mode]);

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
    // While submitting, the pending save is abandoned: the submit request
    // carries the final answers. Without this the save could land after the
    // submit and overwrite it, leaving a spurious "Not saved" banner on a
    // paper that was actually scored.
    if (!started || submittedRef.current || submitting) return;
    setSaving("saving");
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/attempts/${attemptId}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, flagged, timePerQuestion: dwellRef.current }),
        });
        if (response.status === 409) {
          // The server closed the paper. Submit what is saved rather than
          // looping on a rejected save.
          setSaving("error");
          void submit(true);
          return;
        }
        if (!response.ok) throw new Error();
        const data = (await response.json()) as { savedAt: string };
        setSaving("saved");
        setSavedAt(
          new Date(data.savedAt).toLocaleTimeString(zh ? "zh-CN" : [], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      } catch {
        setSaving("error");
      }
    }, 900);
    return () => clearTimeout(timeout);
  }, [answers, flagged, attemptId, started, submitting, submit, zh]);

  /* keyboard shortcuts */
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setConfirmOpen(false);
        setExitOpen(false);
        setFigureOpen(false);
        setPaletteOpen(false);
        return;
      }
      if (hotkeyLockRef.current) return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      const currentQ = questionsRef.current[indexRef.current];
      const key = event.key.toLowerCase();
      if (["1", "2", "3", "4"].includes(key)) {
        if (!currentQ) return;
        event.preventDefault();
        setAnswers((previous) => ({ ...previous, [currentQ.id]: Number(key) - 1 }));
      } else if (["a", "b", "c", "d"].includes(key)) {
        if (!currentQ) return;
        event.preventDefault();
        setAnswers((previous) => ({ ...previous, [currentQ.id]: ["a", "b", "c", "d"].indexOf(key) }));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => Math.min(questionsRef.current.length - 1, value + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => Math.max(0, value - 1));
      } else if (key === "f") {
        if (!currentQ) return;
        event.preventDefault();
        setFlagged((previous) =>
          previous.includes(currentQ.id)
            ? previous.filter((id) => id !== currentQ.id)
            : [...previous, currentQ.id],
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* leave guard */
  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (!startedRef.current || submittedRef.current || exitingRef.current) return;
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

  // Swipe navigation (mobile). A horizontal swipe changes question; vertical
  // scrolls and taps are left alone.
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || window.innerWidth >= 1024) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 64 || Math.abs(dy) > 48 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    if (dx < 0) setIndex((v) => Math.min(questions.length - 1, v + 1));
    else setIndex((v) => Math.max(0, v - 1));
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

  if (!started) {
    return (
      <TestClientGate
        attemptId={attemptId}
        subjectName={subjectName}
        questionCount={questions.length}
        durationMin={durationMin}
        bilingual={bilingual}
        language={lang}
        onLanguage={(next) => setLang(next)}
        lockedLanguage
        onStart={(nextMode) => {
          setMode(nextMode);
          setStarted(true);
        }}
      />
    );
  }

  const unanswered = questions.length - answeredCount;
  const firstUnanswered = questions.findIndex((q) => answers[q.id] === undefined);
  const urgency = remaining <= 60 ? "final" : remaining <= 300 ? "warn" : "ok";

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbf9] text-ink">
      {/* proctoring notice — the real client flags focus loss the same way */}
      {proctorNotice && (
        <div className="fixed inset-x-0 top-[68px] z-40 mx-auto w-[min(560px,92vw)]">
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 shadow-lg">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-[12px] font-semibold text-amber-900">
                {L("You left the test window", "你离开了考试窗口")}
              </p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-amber-800">
                {L(
                  `A proctor would record this. Stay on this tab and in full screen for the rest of the paper. Recorded: ${focusLost} ${focusLost === 1 ? "time" : "times"}.`,
                  `监考会记录此次离开。请留在本标签页并保持全屏直到交卷。已记录 ${focusLost} 次。`,
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── exam console header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#14110f] text-paper shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setExitOpen(true)}
              aria-label={L("Leave the paper", "退出试卷")}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/12 px-2 text-[11.5px] text-paper/70 transition hover:border-white/25 hover:text-paper"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{L("Leave", "退出")}</span>
            </button>
            <span className="hidden h-5 w-px bg-white/12 sm:block" />
            <span
              className={cn(
                "hidden shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.08em] uppercase sm:inline-flex",
                mode === "official" ? "bg-white/10 text-paper/70" : "bg-amber-400/20 text-amber-200",
              )}
              title={
                mode === "official"
                  ? L(
                      "Official conditions: full screen, no pause, no early submission",
                      "官方模式：全屏、不可暂停、不可提前交卷",
                    )
                  : L(
                      "Practice conditions: you may end the paper early",
                      "练习模式：可以提前结束试卷",
                    )
              }
            >
              {mode === "official" ? L("Official mode", "官方模式") : L("Practice", "练习模式")}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium tracking-[-0.01em] text-paper">{title}</p>
              <p className="truncate text-[10.5px] text-paper/45">
                {subjectName} · {questions.length} {L("questions", "题")} · {durationMin}{" "}
                {L("min", "分钟")}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {bilingual && (
              <span className="hidden items-center gap-1.5 rounded-lg border border-white/12 px-2.5 py-1.5 text-[11.5px] text-paper/70 sm:inline-flex">
                <Languages className="h-3.5 w-3.5" />
                {language === "en" ? "EN" : "中文"}
              </span>
            )}

            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1.5 sm:flex">
              <span className="text-[10.5px] text-paper/45">{L("Progress", "进度")}</span>
              <span className="text-[12px] font-semibold tabular text-paper">
                {answeredCount}<span className="text-paper/40">/{questions.length}</span>
              </span>
            </div>

            <div
              className={cn(
                "flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[14px] font-semibold tabular tracking-[0.02em] transition-colors",
                urgency === "ok" && "bg-white/10 text-paper ring-1 ring-white/10",
                urgency === "warn" && "bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30",
                urgency === "final" && "bg-vermillion text-white ring-1 ring-vermillion/50 shadow-[0_0_0_3px_rgba(214,69,69,0.18)]",
              )}
              role="timer"
              aria-live={urgency !== "ok" ? "polite" : "off"}
            >
              <Clock3 className={cn("h-3.5 w-3.5 shrink-0", urgency === "final" && "animate-pulse")} />
              {clock(remaining)}
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg bg-paper px-3.5 text-[12.5px] font-semibold text-[#14110f] transition hover:bg-white"
            >
              {L("Submit", "交卷")}
            </button>
          </div>
        </div>

        {/* progress track */}
        <div className="h-[3px] w-full bg-white/8">
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out",
              urgency === "final" ? "bg-vermillion" : urgency === "warn" ? "bg-amber-400" : "bg-emerald-400",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Persistent error banner */}
      {error && !confirmOpen && (
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 sm:px-5">
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-vermillion/25 bg-white px-4 py-3 text-[12.5px] text-vermillion-deep shadow-sm"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1">{error}</span>
            <button
              type="button"
              onClick={() => void submit(false)}
              disabled={submitting}
              className="shrink-0 rounded-lg bg-vermillion px-3 py-1.5 text-[11.5px] font-semibold text-white disabled:opacity-60"
            >
              {submitting ? L("Retrying…", "正在重试…") : L("Retry submit", "重新交卷")}
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1320px] flex-1 grid-cols-1 gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[292px_minmax(0,1fr)] lg:gap-6 lg:py-6">
        {/* ── palette ─────────────────────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-[84px]">
            <div className="overflow-hidden rounded-2xl border border-[#ddd6ca] bg-white shadow-[0_1px_2px_rgba(20,17,15,0.04),0_12px_40px_rgba(20,17,15,0.05)]">
              <div className="border-b border-[#ece6db] bg-[#faf8f4] px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                    {L("Question map", "答题卡")}
                  </p>
                  <span className="rounded-full bg-[#14110f] px-2 py-0.5 text-[10.5px] font-semibold tabular text-paper">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e7e0d5]">
                  <div
                    className="h-full rounded-full bg-[#14110f] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-6 gap-1.5">
                  {questions.map((question, questionIndex) => {
                    const answered = answers[question.id] !== undefined;
                    const isCurrent = questionIndex === index;
                    const isFlag = flagged.includes(question.id);
                    return (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() => goTo(questionIndex)}
                        aria-label={
                          zh
                            ? `第 ${questionIndex + 1} 题${answered ? "，已作答" : "，未作答"}${isFlag ? "，已标记" : ""}`
                            : `Question ${questionIndex + 1}${answered ? ", answered" : ", unanswered"}${isFlag ? ", flagged" : ""}`
                        }
                        className={cn(
                          "relative flex h-9 items-center justify-center rounded-lg text-[11.5px] font-semibold tabular transition-all",
                          // The real client turns answered question numbers green and
                          // keeps unanswered ones neutral; the current question is ringed.
                          answered && !isCurrent && "bg-emerald-500 text-white hover:bg-emerald-600",
                          !answered && !isCurrent && "bg-[#f6f3ee] text-ink-faint hover:bg-[#eee9e1] hover:text-ink",
                          isCurrent && answered && "bg-emerald-600 text-white ring-2 ring-[#14110f] ring-offset-2 ring-offset-white",
                          isCurrent && !answered && "bg-[#14110f] text-paper ring-2 ring-[#14110f] ring-offset-2 ring-offset-white",
                          isFlag && "ring-2 ring-amber-400",
                        )}
                      >
                        {questionIndex + 1}
                        {isFlag && (
                          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 ring-2 ring-white">
                            <Flag className="h-2 w-2 text-[#14110f]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-1.5 rounded-xl bg-[#faf8f4] p-3 text-[11px] text-ink-soft">
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-[4px] bg-emerald-500" />{" "}
                      {L("Answered", "已答")}
                    </span>
                    <span className="font-semibold tabular text-ink">{answeredCount}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-[4px] bg-[#e7e0d5]" />{" "}
                      {L("Unanswered", "未答")}
                    </span>
                    <span className="font-semibold tabular text-ink">{unanswered}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-[4px] ring-2 ring-amber-400/80" />{" "}
                      {L("Flagged", "已标记")}
                    </span>
                    <span className="font-semibold tabular text-ink">{flagged.length}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#14110f] text-[12.5px] font-semibold text-paper transition hover:bg-black"
                >
                  {L("Review & submit", "检查并交卷")}
                </button>
              </div>
            </div>
          </div>
        </aside>
        {/* ── question stage ──────────────────────────────────────────── */}
        <div
          className="min-w-0 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl border border-[#ddd6ca] bg-white shadow-[0_1px_2px_rgba(20,17,15,0.04),0_12px_40px_rgba(20,17,15,0.06)]">
            {/* question meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ece6db] bg-[#faf8f4] px-5 py-3 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14110f] px-3 py-1 text-[11.5px] font-semibold text-paper tabular">
                  <span className="text-paper/50">{zh ? "题" : "Q"}</span>
                  {index + 1}
                  <span className="text-paper/40">/ {questions.length}</span>
                </span>
                {selected !== undefined ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {L("Answered", "已答")}
                  </span>
                ) : (
                  <span className="text-[11px] text-ink-faint">{L("Not answered", "未作答")}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[11px] text-ink-soft sm:hidden">
                  <Languages className="h-3.5 w-3.5" />
                  {language === "zh" ? "中文" : "EN"}
                </span>
                <button
                  type="button"
                  onClick={toggleFlag}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition",
                    isFlagged
                      ? "border-amber-300 bg-amber-50 text-amber-800"
                      : "border-line text-ink-faint hover:border-line-strong hover:text-ink",
                  )}
                >
                  <Flag className={cn("h-3.5 w-3.5", isFlagged && "fill-amber-400 text-amber-500")} />
                  {isFlagged ? L("Flagged", "已标记") : L("Flag for review", "标记待看")}
                </button>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7 sm:py-7">
              <div className="text-[17px] leading-[1.75] tracking-[-0.01em] text-[#1a1714] sm:text-[18px]">
                <MathText>{stem}</MathText>
              </div>

              {current?.figure && (
                <figure className="mt-6">
                    <button
                    type="button"
                    onClick={() => setFigureOpen(true)}
                    className="group relative block w-full overflow-hidden rounded-xl border border-[#e6dfd4] bg-[#fcfbf9] p-4 transition hover:border-[#d4cabb] hover:shadow-sm"
                    aria-label={L("Enlarge figure", "放大配图")}
                  >
                    <img
                      src={current.figure}
                      alt={L("Exam diagram", "试题配图")}
                      className="mx-auto max-h-[340px] w-auto"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-ink-soft opacity-0 shadow-sm ring-1 ring-black/5 transition group-hover:opacity-100">
                      <Maximize2 className="h-3 w-3" /> {L("Enlarge", "放大")}
                    </span>
                  </button>
                  <figcaption className="mt-1.5 text-[10.5px] text-ink-faint">
                    {L("Figure · tap to enlarge", "图示 · 点击放大")}
                  </figcaption>
                </figure>
              )}

              <div role="radiogroup" aria-label={L("Answer options", "选项")} className="mt-7 space-y-2.5">
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
                        "group flex w-full items-start gap-3.5 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-150",
                        active
                          ? "border-[#14110f] bg-[#14110f] text-paper shadow-[0_8px_24px_rgba(20,17,15,0.14)]"
                          : "border-[#e6dfd4] bg-white text-ink hover:border-[#cfc5b8] hover:bg-[#fdfcfb]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold transition-colors",
                          active
                            ? "bg-paper text-[#14110f]"
                            : "bg-[#f3efe8] text-ink-faint group-hover:bg-[#ebe5db] group-hover:text-ink",
                        )}
                      >
                        {LETTERS[optionIndex]}
                      </span>
                      <span className={cn("min-w-0 flex-1 pt-0.5 text-[15px] leading-[1.65]", active ? "text-paper" : "text-ink")}>
                        <MathText inline>{option}</MathText>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#ece6db] pt-4 text-[11.5px]">
                <button
                  type="button"
                  onClick={clearAnswer}
                  disabled={selected === undefined}
                  className="rounded-md px-1 py-0.5 text-ink-faint transition enabled:hover:text-ink disabled:opacity-40"
                >
                  {L("Clear answer", "清除答案")}
                </button>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 font-medium",
                    saving === "saved" ? "text-emerald-700" : saving === "error" ? "text-vermillion" : "text-ink-faint",
                  )}
                >
                  {saving === "saving" && (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" /> {L("Saving…", "保存中…")}
                    </>
                  )}
                  {saving === "saved" && (
                    <>
                      <CheckCircle2 className="h-3 w-3" /> {L("Saved", "已保存")} {savedAt}
                    </>
                  )}
                  {saving === "error" && (
                    <>
                      <AlertTriangle className="h-3 w-3" />{" "}
                      {L("Not saved — check connection", "未保存——请检查网络")}
                    </>
                  )}
                  {saving === "idle" &&
                    (selected !== undefined
                      ? L("Answer ready", "答案已选")
                      : L("Select an answer", "请选择答案"))}
                </span>
              </div>
            </div>
          </div>

          {/* nav — sticky bottom bar on mobile so Next is always thumb-reachable */}
          <div className="sticky bottom-0 z-20 mt-4 -mx-4 flex items-center justify-between gap-3 border-t border-[#ece6db] bg-[#fbfbf9]/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:pb-0 lg:backdrop-blur-none">
            <button
              type="button"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              disabled={index === 0}
              className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-[#ddd6ca] bg-white px-4 text-[13px] font-medium text-ink shadow-sm transition hover:bg-[#faf8f4] disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> {L("Previous", "上一题")}
            </button>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#ddd6ca] bg-white px-3.5 text-[12.5px] font-medium text-ink-soft shadow-sm lg:hidden"
            >
              <Grid3x3 className="h-4 w-4" />
              <span className="tabular">{answeredCount}/{questions.length}</span>
            </button>

            {index === questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#14110f] px-5 text-[13px] font-semibold text-paper shadow-sm transition hover:bg-black"
              >
                {L("Review & submit", "检查并交卷")} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#14110f] px-5 text-[13px] font-semibold text-paper shadow-sm transition hover:bg-black"
              >
                {L("Next", "下一题")} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-3 hidden text-center text-[11px] text-ink-faint sm:block">
            {zh ? (
              <>
                按 <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">1–4</kbd>{" "}
                选择 · <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">←</kbd>{" "}
                <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">→</kbd>{" "}
                切换 · <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">F</kbd>{" "}
                标记 · 答案自动保存
              </>
            ) : (
              <>
                <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">1–4</kbd> answer ·{" "}
                <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">←</kbd>{" "}
                <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">→</kbd> navigate ·{" "}
                <kbd className="rounded border border-[#ddd6ca] bg-white px-1.5 py-0.5 font-sans text-[10px]">F</kbd> flag · answers save automatically
              </>
            )}
          </p>
        </div>

      </div>

      {/* mobile palette */}
      {paletteOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label={L("Close", "关闭")} className="absolute inset-0 bg-[#14110f]/55 backdrop-blur-[2px]" onClick={() => setPaletteOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-auto rounded-t-[20px] bg-white p-5 pb-7 shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#ddd6ca]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xl text-ink">{L("Question map", "答题卡")}</p>
                <p className="text-[12px] text-ink-faint">
                  {zh
                    ? `已答 ${answeredCount} · 未答 ${unanswered} · 标记 ${flagged.length}`
                    : `${answeredCount} answered · ${unanswered} left · ${flagged.length} flagged`}
                </p>
              </div>
              <button type="button" onClick={() => setPaletteOpen(false)} aria-label={L("Close", "关闭")} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f3efe8] text-ink-soft">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-8 gap-1.5">
              {questions.map((question, questionIndex) => {
                const answered = answers[question.id] !== undefined;
                const isCurrent = questionIndex === index;
                const isFlag = flagged.includes(question.id);
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => goTo(questionIndex)}
                    className={cn(
                      "relative flex h-9 items-center justify-center rounded-lg text-[11.5px] font-semibold tabular",
                      answered && !isCurrent && "bg-emerald-500 text-white",
                      !answered && !isCurrent && "bg-[#f6f3ee] text-ink-faint",
                      isCurrent && "ring-2 ring-[#14110f] ring-offset-1 ring-offset-white",
                      isFlag && "ring-2 ring-amber-400",
                    )}
                  >
                    {questionIndex + 1}
                    {isFlag && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-white" />}
                  </button>
                );
              })}
            </div>
            {firstUnanswered !== -1 && (
              <button
                type="button"
                onClick={() => goTo(firstUnanswered)}
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#ddd6ca] bg-[#faf8f4] text-[12px] font-medium text-ink"
              >
                <Flag className="h-3.5 w-3.5 text-vermillion" />
                {zh
                  ? `跳到第一道未答题 · 第 ${firstUnanswered + 1} 题`
                  : `Jump to first unanswered · Q${firstUnanswered + 1}`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* submit confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button type="button" aria-label={L("Close", "关闭")} className="absolute inset-0 bg-[#14110f]/55 backdrop-blur-[2px]" onClick={() => setConfirmOpen(false)} />
          <div className="relative w-full max-w-md rounded-t-[20px] border border-[#ddd6ca] bg-white p-6 shadow-2xl sm:rounded-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
              {L("Submit paper", "交卷")}
            </p>
            <h2 className="mt-2 font-display text-[28px] leading-tight text-ink">
              {L("Ready to score it?", "准备好交卷了吗？")}
            </h2>
            <p className="mt-1.5 text-[13px] text-ink-soft">
              {L(
                "Once submitted, this attempt is locked and scored on the 0–100 scale.",
                "交卷后本次作答将被锁定，并按 0–100 分制评分。",
              )}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-[#f6f3ee] p-3 text-center">
                <p className="font-display text-2xl text-ink tabular">{answeredCount}</p>
                <p className="text-[10.5px] text-ink-faint">{L("Answered", "已答")}</p>
              </div>
              <div className={cn("rounded-xl p-3 text-center", unanswered > 0 ? "bg-vermillion/8" : "bg-[#f6f3ee]")}>
                <p className={cn("font-display text-2xl tabular", unanswered > 0 ? "text-vermillion" : "text-ink")}>{unanswered}</p>
                <p className="text-[10.5px] text-ink-faint">{L("Blank", "未答")}</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-center">
                <p className="font-display text-2xl text-amber-800 tabular">{flagged.length}</p>
                <p className="text-[10.5px] text-amber-700/70">{L("Flagged", "已标记")}</p>
              </div>
            </div>

            {unanswered > 0 && (
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-vermillion/6 px-3.5 py-2.5 text-[12px] leading-relaxed text-vermillion-deep">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {L(
                  `${unanswered} question${unanswered > 1 ? "s are" : " is"} still blank. No negative marking — a guess costs nothing.`,
                  `还有 ${unanswered} 道题未作答。没有倒扣分——猜一个不会更差。`,
                )}
              </p>
            )}

            {mode === "official" && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-gold-soft/60 px-3.5 py-2.5 text-[12px] leading-relaxed text-gold">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {L(
                  "Official conditions normally submit only at 00:00. This practice simulation lets you submit now so you can check your score.",
                  "官方模式通常在 00:00 自动交卷。本模拟允许你提前交卷，以便查看得分。",
                )}
              </p>
            )}

            {error && <p className="mt-3 text-[12px] text-vermillion">{error}</p>}

            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-[#ddd6ca] text-[13px] font-semibold text-ink transition hover:bg-[#faf8f4]"
              >
                {L("Keep working", "继续作答")}
              </button>
              <button
                type="button"
                onClick={() => void submit(false)}
                disabled={submitting}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-vermillion text-[13px] font-semibold text-white transition hover:bg-vermillion-deep disabled:opacity-70"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? L("Scoring…", "评分中…") : L("Submit & score", "交卷并评分")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* leave confirmation */}
      {exitOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button type="button" aria-label={L("Close", "关闭")} className="absolute inset-0 bg-[#14110f]/55 backdrop-blur-[2px]" onClick={() => setExitOpen(false)} />
          <div className="relative w-full max-w-md rounded-t-[20px] border border-[#ddd6ca] bg-white p-6 shadow-2xl sm:rounded-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
              {L("Leave paper", "退出试卷")}
            </p>
            <h2 className="mt-2 font-display text-[28px] leading-tight text-ink">
              {L("Abandon this attempt?", "放弃本次作答？")}
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              {L(
                "Your answers for this attempt are deleted and it won't count towards your attempts or your score. You can start the paper again from the mock list. If the timer runs out instead, the paper is submitted with whatever you had saved.",
                "本次作答的答案将被删除，也不会计入作答次数或成绩。你可以从模拟卷列表重新开始。若时间先到，试卷会按已保存的答案自动交卷。",
              )}
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setExitOpen(false)}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-[#ddd6ca] text-[13px] font-semibold text-ink transition hover:bg-[#faf8f4]"
              >
                {L("Keep working", "继续作答")}
              </button>
              <button
                type="button"
                onClick={() => void leavePaper()}
                disabled={exiting}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#14110f] text-[13px] font-semibold text-paper transition hover:bg-black disabled:opacity-70"
              >
                {exiting && <Loader2 className="h-4 w-4 animate-spin" />}
                {exiting ? L("Leaving…", "正在退出…") : L("Abandon attempt", "放弃作答")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* figure lightbox */}
      {figureOpen && current?.figure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setFigureOpen(false)}>
          <div className="absolute inset-0 bg-[#14110f]/80 backdrop-blur-sm" />
          <div className="relative max-h-[92vh] max-w-[94vw] overflow-auto rounded-2xl border border-white/10 bg-white p-3 shadow-2xl">
            <img src={current.figure} alt={L("Exam diagram, enlarged", "试题配图（放大）")} className="max-h-[86vh] w-auto" />
            <p className="mt-2 text-center text-[11px] text-ink-faint">
              {L("Tap anywhere to close", "点击任意处关闭")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
