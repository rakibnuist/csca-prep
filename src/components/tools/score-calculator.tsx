"use client";

import { useMemo, useState } from "react";
import { SUBJECTS, estimatePercentile, scoreBand, scaleScore } from "@/lib/exam";
import { cn, ordinal } from "@/lib/utils";

export function ScoreCalculator() {
  const [subjectCode, setSubjectCode] = useState("MATH");
  const [correct, setCorrect] = useState(34);
  const [target, setTarget] = useState(80);

  const subject = SUBJECTS.find((entry) => entry.code === subjectCode) ?? SUBJECTS[0];
  const total = subject.questionCount;
  const safeCorrect = Math.min(correct, total);
  const score = scaleScore(safeCorrect, total);
  const band = scoreBand(score);
  const percentile = estimatePercentile(score, subject.kind);

  const neededForTarget = useMemo(() => {
    const required = Math.ceil((target / 100) * total);
    return Math.min(total, Math.max(0, required));
  }, [target, total]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="panel p-5 sm:p-6">
        <label className="block text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
          Subject
        </label>
        <select
          value={subjectCode}
          onChange={(event) => setSubjectCode(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-line bg-paper px-3 text-[13px] text-ink"
        >
          {SUBJECTS.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.nameEn} · {entry.questionCount} questions
            </option>
          ))}
        </select>

        <div className="mt-6 flex items-baseline justify-between">
          <label
            htmlFor="correct"
            className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase"
          >
            Correct answers
          </label>
          <span className="text-[12px] text-ink-soft tabular">
            {safeCorrect} / {total}
          </span>
        </div>
        <input
          id="correct"
          type="range"
          min={0}
          max={total}
          value={safeCorrect}
          onChange={(event) => setCorrect(Number(event.target.value))}
          className="mt-3 w-full accent-[#c8102e]"
        />
        <div className="mt-1 flex justify-between text-[10px] text-ink-faint tabular">
          <span>0</span>
          <span>{Math.round(total / 2)}</span>
          <span>{total}</span>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper px-4 py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">CSCA score</p>
              <p className="font-display text-5xl leading-none text-ink tabular">
                {score}
                <span className="ml-1 text-lg text-ink-faint">/100</span>
              </p>
              <p className={cn("mt-1 text-[12px] font-medium", band.tone)}>{band.label}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-wide text-ink-faint uppercase">Est. percentile</p>
              <p className="font-display text-3xl text-ink tabular">{ordinal(percentile)}</p>
              <p className="text-[9px] text-ink-faint">modelled</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-deep">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                score >= 70 ? "bg-jade" : score >= 50 ? "bg-gold" : "bg-vermillion",
              )}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="target"
              className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase"
            >
              Target score
            </label>
            <span className="text-[12px] font-medium text-ink tabular">{target}/100</span>
          </div>
          <input
            id="target"
            type="range"
            min={40}
            max={100}
            step={5}
            value={target}
            onChange={(event) => setTarget(Number(event.target.value))}
            className="mt-2 w-full accent-[#0b6b52]"
          />
          <p className="mt-2 text-[11.5px] text-ink-soft">
            You need <span className="font-medium text-ink tabular">{neededForTarget}</span> of{" "}
            {total} correct — about{" "}
            <span className="font-medium text-ink tabular">
              {Math.round((neededForTarget / total) * 100)}%
            </span>{" "}
            accuracy.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="panel p-5">
          <p className="eyebrow">How the scale works</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
            Every CSCA subject is reported on a 0–100 scale. With single-answer multiple choice and no
            negative marking, the score maps directly to your accuracy:
          </p>
          <p className="mt-3 rounded-lg bg-paper-deep/70 px-3 py-2 font-mono text-[11.5px] text-ink">
            score = round(correct ÷ total × 100)
          </p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
            Universities also see your <strong className="text-ink">global percentile</strong>, so the
            same score can read differently depending on the cohort. There is no national pass mark —
            each institution sets its own floor.
          </p>
        </div>

        <div className="panel p-5">
          <p className="eyebrow">Score bands</p>
          <ul className="mt-3 space-y-2 text-[12px] text-ink-soft">
            {[
              ["85–100", "Shortlist-competitive at top-20 universities"],
              ["70–84", "Comfortably competitive for most CGS programmes"],
              ["50–69", "Acceptable at many institutions, weak for the top tier"],
              ["Below 50", "Rebuild foundations before re-sitting"],
            ].map(([range, note]) => (
              <li key={range} className="flex gap-3">
                <span className="w-16 shrink-0 font-medium text-ink tabular">{range}</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[10.5px] leading-relaxed text-ink-faint">
            Bands are our coaching heuristic from published admissions guidance, not official cut-offs.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-ink p-5 text-paper">
          <p className="font-display text-lg">Want the real number?</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-paper/60">
            A calculator estimates. A full paper measures — 48 questions, 60 minutes, topic breakdown
            at the end.
          </p>
          <a
            href="/sign-up"
            className="mt-3 inline-flex h-9 items-center rounded-lg bg-vermillion px-3.5 text-[12px] font-medium text-paper"
          >
            Take a free paper
          </a>
        </div>
      </div>
    </div>
  );
}
