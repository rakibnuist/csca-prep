import { cn } from "@/lib/utils";
import { SectionMarker } from "@/components/marketing/section-marker";
import { Counter } from "@/components/motion/counter";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isDark = Boolean(className?.includes("text-paper"));
  return (
    <div className={cn("flex items-center", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase",
          isDark
            ? "border-white/15 bg-white/10 text-vermillion-light"
            : "border-indigo/15 bg-indigo-soft/80 text-indigo",
        )}
      >
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            isDark ? "bg-vermillion-light" : "bg-vermillion",
          )}
        />
        {children}
      </span>
    </div>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  body,
  align = "left",
  className,
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("min-w-0 max-w-2xl", align === "center" && "mx-auto")}>
        {index && <SectionMarker index={index} label={eyebrow ?? ""} className={cn("mb-1", align === "center" && "justify-center")} />}
        {!index && eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
        <h2 className="display-lg mt-3 text-balance text-ink">{title}</h2>
        {body && <p className="lead mt-3 text-pretty">{body}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Pill({
  children,
  tone = "line",
  className,
}: {
  children: React.ReactNode;
  tone?: "line" | "red" | "jade" | "gold" | "ink";
  className?: string;
}) {
  const tones = {
    line: "border-line bg-paper text-ink-soft",
    red: "border-vermillion/25 bg-vermillion/8 text-vermillion-deep",
    jade: "border-jade/25 bg-jade-soft text-jade",
    gold: "border-gold/25 bg-gold-soft text-gold-deep",
    ink: "border-ink/15 bg-ink/5 text-ink",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  value,
  label,
  note,
}: {
  value: React.ReactNode;
  label: string;
  note?: string;
}) {
  const animate = typeof value === "string" && /^[0-9][0-9,.+]*$/.test(value);

  return (
    <div className="group rounded-2xl border border-line bg-white p-4 shadow-xs transition hover:border-vermillion/35 hover:shadow-sm">
      <span className="block h-1 w-8 rounded-full bg-gradient-to-r from-vermillion to-indigo transition-all duration-300 group-hover:w-14" />
      <p className="mt-3 font-display text-[2rem] font-bold leading-none text-ink tabular sm:text-[2.4rem]">
        {animate ? <Counter value={value as string} /> : value}
      </p>
      <p className="mt-2 text-[12.5px] font-semibold text-ink">{label}</p>
      {note && <p className="mt-0.5 text-[11.5px] text-ink-faint">{note}</p>}
    </div>
  );
}
