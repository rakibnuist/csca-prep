"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated score ring.
 *
 * Renders the final state on the server (the ring stroke is complete in the
 * HTML), then re-animates from zero when it scrolls into view — so a crawler,
 * a print stylesheet or a reduced-motion visitor sees the real number and the
 * real ring, never an empty circle.
 */
export function ScoreRing({
  score,
  size = 108,
  stroke = 8,
  label = "/100",
  tone = "vermillion",
  className,
}: {
  score: number;
  size?: number;
  stroke?: number;
  label?: string;
  tone?: "vermillion" | "jade" | "gold";
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));

  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(clamped);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(clamped * eased);
          if (t < 1) rafId = requestAnimationFrame(tick);
          else setProgress(clamped);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [clamped]);

  const strokeTone =
    tone === "jade" ? "stroke-jade" : tone === "gold" ? "stroke-gold" : "stroke-vermillion";
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className={cn("relative inline-grid place-items-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(strokeTone, "transition-[stroke-dashoffset] duration-150 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <p className="font-display text-[1.65rem] font-bold leading-none text-ink tabular">
          {Math.round(progress)}
          <span className="ml-0.5 text-[11px] font-normal text-ink-faint">{label}</span>
        </p>
      </div>
    </div>
  );
}
