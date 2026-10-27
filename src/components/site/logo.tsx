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
      aria-label="CSCA Master home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-[0.4rem] bg-vermillion transition-transform duration-300 group-hover:-rotate-3",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
          <path
            d="M5.5 12.5l4 4L18.5 7"
            stroke="#FFF8F3"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.15rem] tracking-[-0.01em]",
              invert ? "text-paper" : "text-ink",
            )}
          >
            CSCA <span className="italic">Master</span>
          </span>
          <span
            className={cn(
              "mt-1 text-[8.5px] font-medium tracking-[0.28em] uppercase",
              invert ? "text-paper/50" : "text-ink-faint",
            )}
          >
            Exam preparation
          </span>
        </span>
      )}
    </Link>
  );
}
