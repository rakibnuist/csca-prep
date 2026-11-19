import { cn } from "@/lib/utils";

/**
 * Illustration set 5 — the 0–100 scale as a ruler.
 *
 * The page used to explain the bands in a table. A ruler says the same thing
 * and shows the uncomfortable part: the bands are a coaching heuristic, not
 * official cut-offs, so they are drawn as soft markers rather than hard gates.
 */
export function ScoreRuler({ className }: { className?: string }) {
  const bands = [
    { label: "rebuild", from: 0, to: 50, tone: "fill-ink/15", text: "text-ink-soft" },
    { label: "acceptable", from: 50, to: 70, tone: "fill-gold/45", text: "text-gold-deep" },
    { label: "competitive", from: 70, to: 85, tone: "fill-jade/45", text: "text-jade" },
    { label: "shortlist", from: 85, to: 100, tone: "fill-jade/75", text: "text-jade" },
  ];

  return (
    <svg
      viewBox="0 0 320 96"
      role="img"
      aria-label="A 0 to 100 ruler with the four coaching bands marked"
      className={cn("h-auto w-full", className)}
    >
      {/* the rule */}
      <line x1="12" y1="40" x2="308" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.35" />

      {/* ticks every 5, labelled every 25 */}
      {Array.from({ length: 21 }).map((_, index) => {
        const value = index * 5;
        const x = 12 + (value / 100) * 296;
        const major = value % 25 === 0;
        return (
          <g key={value}>
            <line
              x1={x}
              y1={40 - (major ? 7 : 3)}
              x2={x}
              y2={40 + (major ? 7 : 3)}
              stroke="currentColor"
              strokeWidth={major ? 1.2 : 0.8}
              opacity={major ? 0.55 : 0.3}
            />
            {major && (
              <text x={x} y={64} fontSize="6.5" fill="currentColor" opacity="0.55" textAnchor="middle">
                {value}
              </text>
            )}
          </g>
        );
      })}

      {/* band spans, drawn above the rule */}
      {bands.map((band) => {
        const x = 12 + (band.from / 100) * 296;
        const width = ((band.to - band.from) / 100) * 296;
        return (
          <g key={band.label}>
            <rect x={x} y={22} width={width} height={7} rx="2" className={cn(band.tone)} />
            <text
              x={x + width / 2}
              y={16}
              fontSize="6"
              fill="currentColor"
              opacity="0.6"
              textAnchor="middle"
              letterSpacing="0.6"
            >
              {band.label}
            </text>
          </g>
        );
      })}

      {/* no pass mark */}
      <line x1="160" y1="78" x2="160" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      <text x="160" y="94" fontSize="6" fill="currentColor" opacity="0.5" textAnchor="middle" letterSpacing="0.8">
        NO NATIONAL PASS MARK
      </text>
    </svg>
  );
}
