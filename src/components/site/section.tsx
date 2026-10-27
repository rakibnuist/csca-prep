import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2.5", className)}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-vermillion" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  action,
}: {
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
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
        <h2 className="display-md mt-3 text-balance text-ink">{title}</h2>
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
    gold: "border-gold/25 bg-gold-soft text-gold",
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
  return (
    <div>
      <p className="font-display text-3xl leading-none text-ink tabular sm:text-4xl">{value}</p>
      <p className="mt-2 text-[12px] font-medium text-ink">{label}</p>
      {note && <p className="mt-0.5 text-[11.5px] text-ink-faint">{note}</p>}
    </div>
  );
}
