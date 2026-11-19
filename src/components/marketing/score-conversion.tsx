import { cn } from "@/lib/utils";

/**
 * Illustration set 8 — the conversion, worked.
 *
 * The tables on this page list correct-answers-to-score pairs; this draws the
 * arithmetic once, so the reader can verify any row themselves. Three panels:
 * the count, the division, the reported score — with the same 75% shown as a bar
 * throughout, so "36 of 48" and "75" are visibly the same quantity.
 */
export function ScoreConversion({
  correct = 36,
  total = 48,
  className,
}: {
  correct?: number;
  total?: number;
  className?: string;
}) {
  const pct = Math.round((correct / total) * 100);

  return (
    <figure className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex items-center justify-between border-b border-line bg-paper-deep/50 px-4 py-2.5">
          <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">Worked example</p>
          <p className="text-[10.5px] text-ink-faint">no negative marking</p>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          {/* correct answers */}
          <div className="border-b border-line px-4 py-4 sm:border-b-0 sm:border-r">
            <p className="text-[9.5px] tracking-[0.12em] text-ink-faint uppercase">Correct</p>
            <p className="mt-1 font-display text-[2rem] font-bold leading-none text-ink tabular">
              {correct}
              <span className="text-[1rem] font-normal text-ink-faint">/{total}</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
              <div className="h-full rounded-full bg-jade" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <Connector symbol="÷" hint="total" />

          {/* the division */}
          <div className="border-y border-line px-4 py-4 sm:border-y-0">
            <p className="text-[9.5px] tracking-[0.12em] text-ink-faint uppercase">Divide</p>
            <p className="mt-1 font-display text-[2rem] font-bold leading-none text-ink tabular">
              {correct}
              <span className="text-[1rem] font-normal text-ink-faint"> ÷ {total}</span>
            </p>
            <p className="mt-2 text-[10.5px] text-ink-faint tabular">
              = {(correct / total).toFixed(3)} → ×100
            </p>
          </div>

          <Connector symbol="=" hint="score" />

          {/* reported score */}
          <div className="border-t border-line px-4 py-4 sm:border-t-0 sm:border-l">
            <p className="text-[9.5px] tracking-[0.12em] text-ink-faint uppercase">Reported</p>
            <p className="mt-1 font-display text-[2rem] font-bold leading-none text-vermillion tabular">
              {pct}
              <span className="text-[1rem] font-normal text-ink-faint">/100</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
              <div className="h-full rounded-full bg-vermillion" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="border-t border-line bg-paper-deep/30 px-4 py-3">
          <p className="text-[11.5px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">
              {total - correct} questions
            </span>{" "}
            were wrong <em>or</em> blank — the score is identical either way, which is why leaving a
            question unanswered is never the safer choice. A blank sits in the same place on the
            paper as a mistake.
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
        The scale is linear: each question on this paper is worth{" "}
        {(100 / total).toFixed(2)} points, so every row in the tables below can be checked by hand.
      </figcaption>
    </figure>
  );
}

function Connector({ symbol, hint }: { symbol: string; hint: string }) {
  return (
    <div className="flex items-center justify-center border-b border-line px-3 py-2 sm:border-b-0">
      <div className="flex flex-col items-center">
        <span className="font-display text-lg font-bold leading-none text-ink-faint">{symbol}</span>
        <span className="mt-0.5 text-[8.5px] tracking-[0.1em] text-ink-faint uppercase">{hint}</span>
      </div>
    </div>
  );
}
