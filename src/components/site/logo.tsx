import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
  invert = false,
}: {
  className?: string;
  compact?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      // Only label the link when it has no visible text (compact mode).
      // Labelling it otherwise makes the accessible name disagree with the
      // visible "CSCA Master — Exam preparation".
      aria-label={compact ? "CSCA Master home" : undefined}
      className={cn("group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap", className)}
    >
      <span
        className={cn(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-vermillion to-indigo shadow-sm transition-transform duration-300 group-hover:-rotate-3",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
          <path
            d="M4 9l8-4 8 4-8 4-8-4z"
            stroke="#FFFFFF"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12.2v3.8c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5v-3.8"
            stroke="#FFFFFF"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.12rem] font-bold tracking-[-0.02em]",
              invert ? "text-paper" : "text-ink",
            )}
          >
            CSCA <span className="text-vermillion">Master</span>
          </span>
          <span
            className={cn(
              "mt-0.5 text-[9.5px] font-semibold tracking-[0.14em] uppercase",
              invert ? "text-paper/60" : "text-ink-faint",
            )}
          >
            Student Prep
          </span>
        </span>
      )}
    </Link>
  );
}
