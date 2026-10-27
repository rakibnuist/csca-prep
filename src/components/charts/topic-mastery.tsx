import { cn } from "@/lib/utils";

export type MasteryPoint = { code: string; title: string; mastery: number };

function tone(value: number) {
  if (value >= 75) return "bg-jade";
  if (value >= 50) return "bg-gold";
  return "bg-vermillion";
}

/**
 * Deliberately CSS-only: topic mastery is a small, scannable list rather than a
 * chart, and this keeps the dashboard free of a chart runtime.
 */
export function TopicMastery({ data }: { data: MasteryPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[160px] items-center justify-center rounded-lg border border-dashed border-line text-[12px] text-ink-faint">
        Topic mastery appears after your first paper.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {data.map((entry) => (
        <li key={entry.code}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-[12px] text-ink-soft" title={entry.title}>
              {entry.title}
            </span>
            <span className="shrink-0 text-[11.5px] font-medium text-ink tabular">
              {entry.mastery}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
            <div
              className={cn("h-full rounded-full", tone(entry.mastery))}
              style={{ width: `${Math.max(2, entry.mastery)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
