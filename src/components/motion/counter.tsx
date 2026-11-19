"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Count-up number.
 *
 * Renders the final value on the server and in the first paint, then animates
 * from zero only when the number scrolls into view — so the text is always
 * correct if JavaScript is slow, blocked or reduced-motion is set.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  // Parse "3,000+" style values into a number + formatting hints.
  const trailingPlus = /\+$/.test(value);
  const baseValue = trailingPlus ? value.slice(0, -1) : value;
  const numeric = Number(baseValue.replace(/[^0-9.]/g, ""));
  const hasComma = baseValue.includes(",");
  const decimals = baseValue.includes(".") ? baseValue.split(".")[1].replace(/\D/g, "").length : 0;
  const canAnimate = Number.isFinite(numeric) && numeric > 0;

  const ref = useRef<HTMLSpanElement | null>(null);
  const ranRef = useRef(false);
  const [display, setDisplay] = useState(baseValue);

  useEffect(() => {
    if (!canAnimate || ranRef.current) return;
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      ranRef.current = true;
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        ranRef.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numeric * eased;
          const formatted = hasComma
            ? current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            : current.toFixed(decimals);
          setDisplay(formatted);
          if (progress < 1) rafId = requestAnimationFrame(tick);
          else setDisplay(baseValue);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [canAnimate, numeric, duration, hasComma, decimals, baseValue]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {display}
      {suffix}
      {trailingPlus && "+"}
    </span>
  );
}
