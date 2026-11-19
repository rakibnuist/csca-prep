"use client";

import { useEffect, useState } from "react";
import { EXAM_SITTINGS, nextSitting as fallbackNextSitting } from "@/lib/site";

function sittingStartMs(sitting: (typeof EXAM_SITTINGS)[number]) {
  return new Date(`${sitting.date}T${sitting.block}:00+08:00`).getTime();
}

function nextSitting(referenceNow: number | null) {
  if (referenceNow === null) return fallbackNextSitting();
  const upcoming = EXAM_SITTINGS.filter(
    (sitting) => sitting.status !== "closed" && sittingStartMs(sitting) > referenceNow,
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcoming.length > 0 ? upcoming[0] : EXAM_SITTINGS[EXAM_SITTINGS.length - 1];
}

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function ExamCountdown({
  compact = false,
  minimal = false,
}: {
  compact?: boolean;
  minimal?: boolean;
}) {
  const [now, setNow] = useState<number | null>(null);
  const sitting = nextSitting(now);

  useEffect(() => {
    // The first tick is deferred by a tick so the effect body never sets
    // state synchronously (React Compiler "set-state-in-effect" rule).
    const start = setTimeout(() => setNow(Date.now()), 0);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  const target = sittingStartMs(sitting);
  const parts = now === null ? null : split(target - now);

  const cells = [
    { value: parts?.days, label: "days" },
    { value: parts?.hours, label: "hrs" },
    { value: parts?.minutes, label: "min" },
    { value: parts?.seconds, label: "sec" },
  ];

  if (minimal) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-ink-soft"
        title={`Next sitting: ${sitting.label}`}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-jade" />
        {parts ? `${parts.days}d ${parts.hours}h` : "—"}
      </span>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm text-ink-soft">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-jade" />
        {sitting.label}
        {parts && (
          <span className="tabular text-ink">
            · {parts.days}d {parts.hours}h
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-jade" />
          <span className="text-[10.5px] font-semibold tracking-[0.1em] text-indigo uppercase">
            Next sitting
          </span>
        </div>
        <span className="text-[12px] font-semibold text-ink">{sitting.label}</span>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {cells.map((cell) => (
          <div key={cell.label} className="rounded-xl border border-line/70 bg-paper px-1 py-2 text-center">
            <p className="font-display text-lg font-bold leading-none text-ink tabular">
              {cell.value === undefined ? "—" : String(cell.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[9px] font-medium tracking-[0.1em] text-ink-faint uppercase">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
