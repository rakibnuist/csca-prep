"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, XCircle, Flame, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MathText } from "@/components/math-text";
import { QuestionReviewTools } from "@/components/practice/question-review-tools";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { t } from "@/lib/i18n";
import { submitDailyQuizAction, type SubmitDailyState } from "@/lib/actions/daily";

type Q = {
  id: string;
  subjectCode: string;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
  figure?: string | null;
  correctIndex: number;
  explanation: string;
  explanationZh: string | null;
};

export function DailyQuizClient({
  date,
  questions,
  alreadyDone,
  language = "en",
}: {
  date: string;
  questions: Q[];
  alreadyDone: { score: number; correct: number; total: number } | null;
  /** Fixed by the teaching track. */
  language?: "en" | "zh";
}) {
  const showZh = language === "zh";
  const subjectLabel = (code: string) =>
    showZh ? (SUBJECT_MAP[code as SubjectCode]?.nameZh ?? code) : code;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<SubmitDailyState | null>(
    alreadyDone ? { ok: true, score: alreadyDone.score, correct: alreadyDone.correct } : null,
  );
  const [pending, start] = useTransition();
  const done = !!submitted?.ok;

  const correctCount = useMemo(() => {
    if (submitted?.ok && typeof submitted.correct === "number") return submitted.correct;
    return questions.reduce((n, q) => (answers[q.id] === q.correctIndex ? n + 1 : n), 0);
  }, [submitted, questions, answers]);

  const answeredAll = questions.every((q) => typeof answers[q.id] === "number");

  function choose(qid: string, idx: number) {
    if (done) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  function submit() {
    if (done || !answeredAll) return;
    const fd = new FormData();
    fd.set("date", date);
    fd.set("answers", JSON.stringify(answers));
    fd.set("questionIds", JSON.stringify(questions.map((q) => q.id)));
    start(async () => {
      const res = await submitDailyQuizAction({ ok: false }, fd);
      setSubmitted(res);
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3">
        <div>
          <p className="text-[12.5px] font-medium text-ink">
            {done
              ? t(language, "Today's quiz complete")
              : showZh
                ? `已答 ${Object.keys(answers).length}/${questions.length}`
                : `${Object.keys(answers).length}/${questions.length} answered`}
          </p>
          <p className="text-[11px] text-ink-faint">
            {done
              ? showZh
                ? `得分 ${submitted?.score ?? 0}/100 · 答对 ${correctCount}/${questions.length}`
                : `You scored ${submitted?.score ?? 0}/100 · ${correctCount}/${questions.length} correct`
              : showZh
                ? "10 道题 · 本区科目 · 即时反馈"
                : "10 questions · mixed subjects · instant feedback"}
          </p>
        </div>
        {done ? (
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold", (submitted?.score ?? 0) >= 70 ? "bg-jade-soft text-jade" : "bg-gold-soft text-gold")}>
            <CheckCircle2 className="h-3.5 w-3.5" /> {submitted?.score}/100
          </span>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!answeredAll || pending}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-40"
          >
            {pending ? t(language, "Checking…") : t(language, "Submit quiz")}{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        {questions.map((q, i) => {
          const picked = answers[q.id];
          const isCorrect = picked === q.correctIndex;
          const stem = showZh && q.stemZh ? q.stemZh : q.stem;
          const explanation = showZh && q.explanationZh ? q.explanationZh : q.explanation;
          return (
            <div key={q.id} className="rounded-xl border border-line bg-paper p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                  {showZh ? `第 ${i + 1} 题` : `Q${i + 1}`} · {subjectLabel(q.subjectCode)}
                </p>
                {done && typeof picked === "number" && (
                  isCorrect ? <CheckCircle2 className="h-4 w-4 shrink-0 text-jade" /> : <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                )}
              </div>
              <div className={cn("mt-2 text-[14px] leading-relaxed text-ink", showZh && "font-chinese")}>
                <MathText>{stem}</MathText>
              </div>
              {q.figure && (
                <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                  <img
                    src={q.figure}
                    alt={showZh ? "试题配图" : "Question diagram"}
                    className="mx-auto max-h-[260px] w-auto"
                  />
                </div>
              )}
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt, oi) => {
                  const chosen = picked === oi;
                  const right = q.correctIndex === oi;
                  const show = done;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => choose(q.id, oi)}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-[13px] transition",
                        !show && (chosen ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink hover:border-line-strong"),
                        show && right && "border-jade/50 bg-jade-soft/60 text-ink",
                        show && chosen && !right && "border-rose-500/40 bg-rose-500/8 text-ink",
                        show && !chosen && !right && "border-line bg-card/60 text-ink-soft",
                      )}
                    >
                      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold",
                        !show && (chosen ? "bg-paper/20 text-paper" : "bg-paper-deep text-ink-faint"),
                        show && right && "bg-jade text-white",
                        show && chosen && !right && "bg-rose-600 text-white",
                        show && !chosen && !right && "bg-paper-deep text-ink-faint",
                      )}>{String.fromCharCode(65 + oi)}</span>
                      <span className="min-w-0 flex-1">
                        <MathText inline>
                          {showZh && q.optionsZh.length === q.options.length ? q.optionsZh[oi] : opt}
                        </MathText>
                      </span>
                    </button>
                  );
                })}
              </div>
              {done && (
                <>
                  <div className="mt-3 rounded-lg border border-line bg-card/70 px-3 py-2.5">
                    <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                      {t(language, "Explanation")}
                    </p>
                    <div className={cn("mt-1 text-[12.5px] leading-relaxed text-ink-soft", showZh && "font-chinese")}>
                      <MathText>{explanation}</MathText>
                    </div>
                  </div>
                  <QuestionReviewTools questionId={q.id} zh={showZh} />
                </>
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-card px-4 py-3.5">
          <Flame className="h-4 w-4 shrink-0 text-vermillion" />
          <p className="min-w-0 flex-1 text-[12.5px] text-ink-soft">
            {t(language, "Daily quiz logged — come back tomorrow to keep your streak alive.")}
          </p>
        </div>
      )}
      {submitted && !submitted.ok && (
        <p className="mt-4 text-[12.5px] text-rose-600">{submitted.error}</p>
      )}
    </div>
  );
}
