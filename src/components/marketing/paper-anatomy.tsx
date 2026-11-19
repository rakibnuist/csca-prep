import { cn } from "@/lib/utils";

/**
 * Paper anatomy.
 *
 * Forty-eight squares, grouped into the three passes a timed paper actually
 * needs — harvest what you know, work the middle, then spend the last minutes
 * on the questions that need thought. The diagram is generated from the paper's
 * own question count and duration, so the 80-in-90 papers get a correct version
 * rather than a stretched picture of the 48-in-60 one.
 */
export function PaperAnatomy({
  questions = 48,
  minutes = 60,
  className,
}: {
  questions?: number;
  minutes?: number;
  className?: string;
}) {
  const perQuestion = seconds(minutes, questions);

  // Three passes, expressed as fractions of the clock rather than fixed counts,
  // so both paper lengths divide cleanly.
  const passes = [
    { key: "harvest", label: "Harvest", share: 0.45, note: "Answer everything you recognise. No re-reading." },
    { key: "work", label: "Work", share: 0.4, note: "The middle set — one deliberate pass, no lingering." },
    { key: "spend", label: "Spend", share: 0.15, note: "The stubborn ones, with the clock visible." },
  ];

  const cells = Array.from({ length: questions }, (_, index) => {
    const fraction = index / questions;
    const pass = fraction < passes[0].share ? 0 : fraction < passes[0].share + passes[1].share ? 1 : 2;
    return { index, pass };
  });

  const tone = [
    "border-ink/25 bg-ink/[0.07]",
    "border-vermillion/30 bg-vermillion/[0.09]",
    "border-ink/15 bg-transparent",
  ];
  const swatch = ["bg-ink/60", "bg-vermillion/70", "border border-ink/25"];

  return (
    <figure className={cn("not-prose", className)}>
      <div className="rounded-2xl border border-line bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">Paper anatomy</p>
          <p className="text-[10.5px] text-ink-faint tabular">
            {questions} questions · {minutes} minutes · {perQuestion}s each
          </p>
        </div>

        {/* the clock, in three passes */}
        <div className="mt-4 flex h-1.5 overflow-hidden rounded-full">
          {passes.map((pass, index) => (
            <span
              key={pass.key}
              className={cn("h-full", index === 1 ? "bg-vermillion/70" : index === 0 ? "bg-ink/60" : "bg-ink/20")}
              style={{ width: `${pass.share * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9.5px] text-ink-faint tabular">
          <span>0:00</span>
          <span>{clock(minutes * 0.45)}</span>
          <span>{clock(minutes * 0.85)}</span>
          <span>{clock(minutes)}</span>
        </div>

        {/* one square per question */}
        <div
          className="mt-4 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${questions > 48 ? 16 : 12}, minmax(0, 1fr))` }}
          aria-label={`${questions} questions grouped into three timing passes`}
          role="img"
        >
          {cells.map((cell) => (
            <span
              key={cell.index}
              className={cn("aspect-square rounded-[3px] border", tone[cell.pass])}
              title={`Question ${cell.index + 1}`}
            />
          ))}
        </div>

        <ul className="mt-4 space-y-1.5">
          {passes.map((pass, index) => (
            <li key={pass.key} className="flex gap-2 text-[11.5px] leading-relaxed text-ink-soft">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-[2px]", swatch[index])} />
              <span>
                <span className="font-medium text-ink">
                  {pass.label} · {clock(minutes * pass.share)}
                </span>{" "}
                — {pass.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
        A rehearsal plan, not an official rubric — CSCA publishes the question count and the clock, not
        a pacing method. No negative marking means every square should end up answered.
      </figcaption>
    </figure>
  );
}

function seconds(minutes: number, questions: number) {
  const total = (minutes * 60) / questions;
  return Number.isInteger(total) ? total : Math.round(total);
}

function clock(minutes: number) {
  const totalSeconds = Math.round(minutes * 60);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
