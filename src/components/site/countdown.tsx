"use client";

import { useEffect, useState } from "react";
import { EXAM_SITTINGS } from "@/lib/site";

function nextSitting() {
  const now = Date.now();
  const upcoming = EXAM_SITTINGS.filter(
    (sitting) =>
      sitting.status !== "closed" && new Date(`${sitting.date}T09:00:00+08:00`).getTime() > now,
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

export function ExamCountdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  const sitting = nextSitting();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(`${sitting.date}T09:00:00+08:00`).getTime();
  const parts = now === null ? null : split(target - now);

  const cells = [
    { value: parts?.days, label: "days" },
    { value: parts?.hours, label: "hrs" },
    { value: parts?.minutes, label: "min" },
    { value: parts?.seconds, label: "sec" },
  ];

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
    <div className="rounded-xl border border-line bg-card/70 p-3 backdrop-blur">
      <div className="flex flex-col gap-0.5">
        <span className="eyebrow">Next sitting</span>
        <span className="text-[12.5px] font-medium text-ink">{sitting.label}</span>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {cells.map((cell) => (
          <div key={cell.label} className="rounded-lg bg-paper-deep/70 px-1 py-2 text-center">
            <p className="font-display text-xl leading-none text-ink tabular">
              {cell.value === undefined ? "—" : String(cell.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[9.5px] tracking-[0.12em] text-ink-faint uppercase">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
