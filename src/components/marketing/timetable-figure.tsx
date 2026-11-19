import Link from "next/link";
import { cn } from "@/lib/utils";
import { EXAM_BLOCKS, type ExamBlock } from "@/lib/site";

const ZH: Record<string, string> = {
  "Professional Chinese (文科 / 理科中文)": "专业中文",
  Mathematics: "数学",
  Physics: "物理",
  Chemistry: "化学",
};

const SHORT: Record<string, string> = {
  "Professional Chinese (文科 / 理科中文)": "Professional Chinese",
};

/**
 * One exam-day timetable, drawn.
 *
 * A sitting runs over two days — Professional Chinese then Mathematics, then
 * Physics then Chemistry — on one of two published start blocks (08:00 or
 * 14:00 Beijing time). Pass the sitting's block; the times are not fixed across
 * sittings and a figure that pretends they are is wrong for two 2026–27 dates.
 * Drawn with CSS boxes and hairlines rather than an image so it stays crisp,
 * selectable, printable and translated by the page's own copy.
 */
export function TimetableFigure({
  className,
  block = "14:00",
}: {
  className?: string;
  block?: ExamBlock;
}) {
  const rows = EXAM_BLOCKS[block];
  const days = [
    { day: "Day 1", label: "Chinese · Mathematics", rows: rows.slice(0, 2) },
    { day: "Day 2", label: "Physics · Chemistry", rows: rows.slice(2, 4) },
  ];

  return (
    <figure className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex items-center justify-between border-b border-line bg-paper-deep/50 px-4 py-2.5">
          <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
            Official timetable · {block} block
          </p>
          <p className="text-[10.5px] text-ink-faint">Beijing time · UTC+8</p>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          {days.map((day, dayIndex) => (
            <div
              key={day.day}
              className={cn("p-4 sm:p-5", dayIndex === 1 && "border-t border-line sm:border-t-0 sm:border-l")}
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 items-center rounded-lg bg-indigo-soft px-2 font-mono text-sm font-bold leading-none text-indigo">
                  {String(dayIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">{day.day}</p>
                  <p className="text-[10.5px] text-ink-faint">{day.label}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {day.rows.map((row) => {
                  const tone = row.subject === "Professional Chinese (文科 / 理科中文)" ? "red" : "ink";
                  return (
                    <div
                      key={row.subject}
                      className={cn(
                        "rounded-lg border px-2.5 py-2",
                        tone === "red" ? "border-vermillion/25 bg-vermillion/[0.05]" : "border-line bg-paper-deep/30",
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="min-w-0 text-[11.5px] font-medium text-ink">
                          {SHORT[row.subject] ?? row.subject}
                          <span className="ml-1.5 font-chinese text-[10px] font-normal text-ink-faint">{ZH[row.subject]}</span>
                        </p>
                        <span className="shrink-0 text-[9.5px] text-ink-faint tabular">{row.minutes}m</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="shrink-0 text-[9.5px] text-ink-faint tabular">
                          {row.time.replace(" – ", "–")}
                        </span>
                        <span className="flex flex-1 items-center gap-1">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "h-1 flex-1 rounded-full",
                                i < Math.round(row.minutes / 15) ? (tone === "red" ? "bg-vermillion/70" : "bg-ink/50") : "bg-line",
                              )}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
        Sittings alternate between an 08:00 and a 14:00 start block; this is the {block} block. Convert
        to your own clock in the{" "}
        <Link href="/csca/countries" className="text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-ink">
          country timezone guide
        </Link>{" "}
        before you plan the day, and trust the time on your Admission Ticket.
      </figcaption>
    </figure>
  );
}
