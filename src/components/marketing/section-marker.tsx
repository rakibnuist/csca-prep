import { cn } from "@/lib/utils";

/**
 * Section marker.
 *
 * Editorial pages get a spine from numbered sections: a serif index, a rule,
 * and a label. It costs one line of markup and gives a long page a sense of
 * order that repeated eyebrows cannot.
 */
export function SectionMarker({
  index,
  label,
  className,
  tone = "light",
}: {
  index: string;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "inline-flex h-6 items-center rounded-full px-2.5 font-mono text-[11px] font-semibold tabular",
          tone === "dark"
            ? "border border-white/15 bg-white/10 text-vermillion-light"
            : "border border-indigo/15 bg-indigo-soft text-indigo",
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          "text-[11px] font-semibold tracking-[0.12em] uppercase",
          tone === "dark" ? "text-paper/75" : "text-ink-faint",
        )}
      >
        {label}
      </span>
    </div>
  );
}
