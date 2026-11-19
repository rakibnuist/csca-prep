import { cn } from "@/lib/utils";

/**
 * Weekly activity, as tick marks.
 *
 * A seven-column bar chart is the usual answer and it reads as a dashboard
 * widget. Tick marks read as a printer's measure — same information, no chart
 * runtime, and it sits comfortably next to serif numerals.
 */
export function WeekStrip({
  days,
  goal,
  className,
  lang = "en",
}: {
  days: { label: string; count: number; today?: boolean }[];
  goal: number;
  className?: string;
  lang?: "en" | "zh";
}) {
  const peak = Math.max(goal, ...days.map((day) => day.count), 1);

  return (
    <div className={cn("not-prose", className)}>
      <div className="flex items-end justify-between gap-1">
        {days.map((day) => {
          const met = day.count >= goal;
          const height = Math.max(4, Math.round((day.count / peak) * 44));
          return (
            <div key={day.label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-[46px] w-full items-end justify-center">
                <span
                  className={cn(
                    "w-full max-w-[10px] rounded-[2px] transition-all",
                    day.count === 0
                      ? "bg-line"
                      : met
                        ? "bg-jade"
                        : "bg-ink/45",
                    day.today && "ring-2 ring-indigo/40 ring-offset-1 ring-offset-card",
                  )}
                  style={{ height: `${height}px` }}
                  title={`${day.label}: ${day.count} ${lang === "zh" ? "题" : "questions"}`}
                />
              </div>
              <span
                className={cn(
                  "text-[9.5px] tabular",
                  day.today ? "font-medium text-ink" : "text-ink-faint",
                )}
              >
                {lang === "zh" ? day.label.slice(-1) : day.label.slice(0, 1)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-line pt-1.5 text-[9.5px] text-ink-faint">
        <span>{lang === "zh" ? "最近 7 天" : "last 7 days"}</span>
        <span className="tabular">
          {lang === "zh" ? `目标 ${goal}/天` : `goal ${goal}/day`}
        </span>
      </div>
    </div>
  );
}
