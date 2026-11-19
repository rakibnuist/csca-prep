"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Score-to-programme fit check.
 *
 * Two things are factual here: which papers a programme group requires (the
 * official subject structure from csca.cn, narrowed per programme by the
 * receiving university), and the 0–100 scale. The thresholds used to colour a
 * score are a coaching heuristic, labelled as one — no university has published
 * a universal cut-off, and inventing one would be dishonest.
 */

type Group = {
  id: string;
  label: string;
  maths: boolean;
  chinese: "humanities" | "stem" | "either";
  electives: ("PHYS" | "CHEM")[];
  requiresElective: boolean;
};

const GROUPS: Group[] = [
  { id: "eng", label: "Engineering & technology", maths: true, chinese: "either", electives: ["PHYS", "CHEM"], requiresElective: true },
  { id: "sci", label: "Pure sciences & computer science", maths: true, chinese: "either", electives: ["PHYS"], requiresElective: true },
  { id: "chem", label: "Chemistry, pharmacy, materials", maths: true, chinese: "either", electives: ["CHEM", "PHYS"], requiresElective: true },
  { id: "med", label: "Medicine, dentistry, nursing", maths: true, chinese: "either", electives: ["CHEM"], requiresElective: true },
  { id: "agri", label: "Agriculture & life sciences", maths: true, chinese: "either", electives: ["CHEM", "PHYS"], requiresElective: true },
  { id: "econ", label: "Economics, business, finance", maths: true, chinese: "either", electives: [], requiresElective: false },
  { id: "law", label: "Law, humanities, education, arts", maths: true, chinese: "humanities", electives: [], requiresElective: false },
];

type Band = "strong" | "ok" | "short" | "missing";

function bandFor(score: number | null, required: boolean): Band {
  if (score === null) return required ? "missing" : "ok";
  if (score >= 70) return "strong";
  if (score >= 50) return "ok";
  return "short";
}

const BAND_META: Record<Band, { label: string; tone: string; note: string }> = {
  strong: { label: "Comfortable", tone: "text-jade", note: "In the range most programmes read as competitive." },
  ok: { label: "Borderline", tone: "text-gold", note: "Acceptable at many institutions, short at selective ones." },
  short: { label: "Below the band", tone: "text-vermillion", note: "Rebuild the foundations before your next sitting." },
  missing: { label: "Not sat", tone: "text-vermillion", note: "This programme group expects this subject." },
};

export function RequirementFit({ chineseRequired }: { chineseRequired: boolean }) {
  const [groupId, setGroupId] = useState(GROUPS[0].id);
  const [maths, setMaths] = useState<string>("");
  const [elective, setElective] = useState<string>("");
  const [chinese, setChinese] = useState<string>("");

  const group = GROUPS.find((item) => item.id === groupId) ?? GROUPS[0];

  const rows = useMemo(() => {
    const toNumber = (value: string) => {
      const parsed = Number(value);
      return value.trim() === "" || Number.isNaN(parsed) ? null : Math.min(100, Math.max(0, parsed));
    };

    const electiveLabel = group.electives.length
      ? group.electives.map((code) => (code === "PHYS" ? "Physics" : "Chemistry")).join(" or ")
      : "—";

    return [
      {
        key: "maths",
        name: "Mathematics",
        required: true,
        score: toNumber(maths),
      },
      {
        key: "elective",
        name: electiveLabel,
        required: group.requiresElective,
        score: toNumber(elective),
      },
      {
        key: "chinese",
        name: group.chinese === "humanities" ? "Professional Chinese — Humanities" : "Professional Chinese",
        required: chineseRequired,
        score: toNumber(chinese),
      },
    ];
  }, [group, maths, elective, chinese, chineseRequired]);

  const missingRequired = rows.filter((row) => row.required && row.score === null);
  const shortRequired = rows.filter((row) => row.required && row.score !== null && (row.score as number) < 50);

  const inputClass =
    "h-10 w-full rounded-lg border border-line bg-card px-3 text-[13px] text-ink tabular focus:border-vermillion/50 focus:outline-none";

  return (
    <div className="not-prose rounded-2xl border border-line bg-card p-5 sm:p-6">
      <p className="eyebrow">Fit check</p>
      <h2 className="mt-2 font-display text-xl text-ink">Will my scores clear a programme group?</h2>
      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
        Pick the group you are applying to and enter any CSCA scores you already have. The subject list
        is the official structure; the colouring is our coaching read, because no university publishes
        a universal cut-off.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-ink-soft">Programme group</span>
          <select
            value={groupId}
            onChange={(event) => {
              const nextId = event.target.value;
              const nextGroup = GROUPS.find((item) => item.id === nextId);
              setGroupId(nextId);
              if (!nextGroup?.requiresElective) setElective("");
            }}
            className={inputClass}
          >
            {GROUPS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-ink-soft">Mathematics score</span>
          <input
            value={maths}
            onChange={(event) => setMaths(event.target.value)}
            inputMode="numeric"
            placeholder="0–100"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-ink-soft">
            {group.electives.length ? group.electives.map((code) => (code === "PHYS" ? "Physics" : "Chemistry")).join(" / ") : "Science elective"}
          </span>
          <input
            value={elective}
            onChange={(event) => setElective(event.target.value)}
            inputMode="numeric"
            placeholder={group.requiresElective ? "0–100" : "not required"}
            disabled={!group.requiresElective}
            className={cn(inputClass, !group.requiresElective && "opacity-50")}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-ink-soft">Professional Chinese</span>
          <input
            value={chinese}
            onChange={(event) => setChinese(event.target.value)}
            inputMode="numeric"
            placeholder={chineseRequired ? "0–100" : "if sat"}
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line">
        {rows.map((row) => {
          if (!row.required && (row.score === null || row.key === "elective")) return null;
          const band = bandFor(row.score, row.required);
          const meta = BAND_META[band];
          return (
            <div key={row.key} className="flex flex-wrap items-center justify-between gap-2 bg-paper px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium text-ink">
                  {row.name}
                  {!row.required && <span className="ml-1.5 text-[10px] font-normal text-ink-faint">optional</span>}
                </p>
                <p className="text-[11px] text-ink-soft">{meta.note}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-ink tabular">
                  {row.score === null ? "—" : `${row.score}/100`}
                </span>
                <span className={cn("text-[11px] font-medium", meta.tone)}>{meta.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-line bg-paper-deep/40 px-3.5 py-3">
        <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-soft">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
          {missingRequired.length > 0 ? (
            <span>
              You are missing a required paper for this group:{" "}
              <strong className="text-ink">{missingRequired.map((row) => row.name).join(", ")}</strong>.
              Sitting it is worth more than lifting an existing score by a few points.
            </span>
          ) : shortRequired.length > 0 ? (
            <span>
              At least one required paper is below 50. That reads as a foundation gap rather than an
              exam-technique problem — rebuild the topic list before paying for a retake.
            </span>
          ) : (
            <span>
              Subject combination matches this group&apos;s expected papers. Confirm the exact minimum
              with the admissions office: the same university can set different thresholds per
              faculty.
            </span>
          )}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px]">
          <Link href="/csca/passing-score" className="inline-flex items-center gap-1 font-medium text-vermillion hover:underline">
            How the 0–100 scale works <ArrowRight className="h-3 w-3" />
          </Link>
          <span className="inline-flex items-center gap-1 text-ink-faint">
            <ShieldCheck className="h-3 w-3" /> No invented cut-offs
          </span>
        </div>
      </div>
    </div>
  );
}
