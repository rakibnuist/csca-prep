"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SUBJECTS, estimatePercentile, scoreBand, scaleScore, type SubjectCode } from "@/lib/exam";
import { cn, ordinal } from "@/lib/utils";

type Mode = "single" | "sitting";

export function ScoreCalculator() {
  const [mode, setMode] = useState<Mode>("single");
  const [subjectCode, setSubjectCode] = useState("MATH");
  const [correct, setCorrect] = useState(34);
  const [target, setTarget] = useState(80);

  // Full-sitting mode state
  const [selectedCodes, setSelectedCodes] = useState<SubjectCode[]>(["MATH", "PHYS", "CHEM"]);
  const [correctByCode, setCorrectByCode] = useState<Record<SubjectCode, number>>({
    MATH: 36,
    PHYS: 34,
    CHEM: 35,
    CH_HUM: 58,
    CH_SCI: 60,
  });

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

  const sittingRows = useMemo(() => {
    return SUBJECTS.filter((s) => selectedCodes.includes(s.code)).map((sub) => {
      const raw = Math.min(sub.questionCount, Math.max(0, correctByCode[sub.code] ?? 0));
      const scaled = scaleScore(raw, sub.questionCount);
      return {
        subject: sub,
        raw,
        scaled,
        percentile: estimatePercentile(scaled, sub.kind),
      };
    });
  }, [selectedCodes, correctByCode]);

  const compositeAvg =
    sittingRows.length > 0
      ? Math.round(sittingRows.reduce((s, r) => s + r.scaled, 0) / sittingRows.length)
      : 0;
  const totalSittingMinutes = sittingRows.reduce((s, r) => s + r.subject.durationMin, 0);
  const feeCny = sittingRows.length <= 1 ? 450 : 700;

  function toggleSubject(code: SubjectCode) {
    if (code === "MATH") return; // Mathematics is compulsory on every CSCA sitting.
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="inline-flex rounded-xl border border-line bg-card p-1">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition",
            mode === "single" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
          )}
        >
          Single Subject
        </button>
        <button
          type="button"
          onClick={() => setMode("sitting")}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition",
            mode === "sitting" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
          )}
        >
          Full Sitting (2–4 Subjects)
        </button>
      </div>

      {mode === "single" ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel min-w-0 p-5 sm:p-6">
            <label
              htmlFor="subject"
              className="block text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={subjectCode}
              onChange={(event) => {
                const nextCode = event.target.value;
                const nextTotal = SUBJECTS.find((entry) => entry.code === nextCode)?.questionCount ?? 48;
                setSubjectCode(nextCode);
                setCorrect((prev) => Math.min(prev, nextTotal));
              }}
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
              className="mt-3 w-full accent-[#d31d3c]"
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
                className="mt-2 w-full accent-[#0a7a53]"
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

          <div className="min-w-0 space-y-4">
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
                A calculator estimates. A full paper measures — {subject.questionCount} questions,{" "}
                {subject.durationMin} minutes, topic breakdown at the end.
              </p>
              <Link
                href="/sign-up"
                className="mt-3 inline-flex h-9 items-center rounded-lg bg-vermillion px-3.5 text-[12px] font-medium text-paper"
              >
                Take a free paper
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel min-w-0 space-y-5 p-5 sm:p-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                Select subjects for this sitting (Mathematics compulsory)
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {SUBJECTS.map((sub) => {
                  const active = selectedCodes.includes(sub.code);
                  const required = sub.code === "MATH";
                  return (
                    <button
                      key={sub.code}
                      type="button"
                      onClick={() => toggleSubject(sub.code)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                        active
                          ? "border-vermillion bg-vermillion text-paper"
                          : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
                        required && "cursor-default",
                      )}
                    >
                      {sub.shortEn} {required ? "(required)" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-line">
              {sittingRows.map(({ subject: sub, raw, scaled, percentile: subPct }) => (
                <div key={sub.code} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[13px] font-medium text-ink">{sub.nameEn}</span>
                      <span className="ml-2 text-[11px] text-ink-faint">
                        {sub.durationMin} min · {raw}/{sub.questionCount}
                      </span>
                    </div>
                    <div className="text-right tabular">
                      <span className="font-display text-xl font-semibold text-ink">
                        {scaled}/100
                      </span>
                      <span className="ml-2 text-[11px] text-ink-soft">
                        {ordinal(subPct)} pct
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={sub.questionCount}
                    value={raw}
                    aria-label={`${sub.nameEn} correct answers`}
                    onChange={(event) => {
                      const nextVal = Number(event.target.value);
                      setCorrectByCode((prev) => ({ ...prev, [sub.code]: nextVal }));
                    }}
                    className="mt-2 w-full accent-[#2563eb]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="panel p-5 sm:p-6">
              <p className="eyebrow">Sitting summary</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-paper p-3.5">
                  <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                    Composite avg
                  </p>
                  <p className="mt-1 font-display text-3xl text-ink tabular">
                    {compositeAvg}
                    <span className="text-sm text-ink-faint">/100</span>
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-paper p-3.5">
                  <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                    Official CSCA fee
                  </p>
                  <p className="mt-1 font-display text-3xl text-ink tabular">CNY {feeCny}</p>
                </div>
              </div>

              <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[12px]">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subjects selected</dt>
                  <dd className="font-medium text-ink tabular">{sittingRows.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Total test-taking clock</dt>
                  <dd className="font-medium text-ink tabular">{totalSittingMinutes} min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Fee rule (csca.cn)</dt>
                  <dd className="text-ink-soft">1 subject CNY 450 · 2+ subjects CNY 700</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-line bg-ink p-5 text-paper">
              <p className="font-display text-lg">Practise the real two-day sitting?</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-paper/65">
                Sit full back-to-back papers under the official 08:00 or 14:00 Beijing schedule inside
                our Sitting Simulator.
              </p>
              <Link
                href="/en/sitting"
                className="mt-3 inline-flex h-9 items-center rounded-lg bg-vermillion px-3.5 text-[12px] font-medium text-paper"
              >
                Open Sitting Simulator
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-jade/30 bg-paper-deep p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-jade/15 px-3 py-1 text-[11px] font-semibold tracking-wider text-jade uppercase">
            Target Score: {mode === "single" ? `${score}/100` : `${compositeAvg}/100 avg`} · Bangladesh Partner
          </span>
          <span className="text-[11.5px] font-medium text-ink-soft">0 BDT File-Opening Fee</span>
        </div>
        <h3 className="mt-2.5 font-display text-xl text-ink">
          Have your target CSCA score? See which Chinese universities &amp; CSC scholarships match it.
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
          Get a <strong className="text-ink">Free Education Fit Assessment</strong> with{" "}
          <strong className="text-ink">EduExpress International</strong> (Dhanmondi, Dhaka) to compare
          Chinese universities that fit your predicted CSCA score — and claim a{" "}
          <strong className="text-ink">complimentary CSCA Master Pro code (¥99 value)</strong> when
          you open a verified China application file (no EduExpress service fee before China visa
          approval).
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          <a
            href="https://eduexpressint.com/education-fit-assessment?utm_source=cscamaster&utm_medium=score_calculator&utm_campaign=csca_pro_access"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-vermillion px-4 text-[12px] font-semibold text-white transition hover:opacity-95"
          >
            Check My University &amp; CSC Fit (Free) →
          </a>
          <a
            href="https://eduexpressint.com/universities?country=China&cscaFree=1&utm_source=cscamaster&utm_medium=score_calculator&utm_campaign=csca_pro_access"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-paper px-3.5 text-[12px] font-medium text-ink transition hover:border-line-strong"
          >
            Browse CSCA-Exempt Universities
          </a>
        </div>
      </div>
    </div>
  );
}
