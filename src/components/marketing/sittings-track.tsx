import { cn } from "@/lib/utils";

/**
 * Illustration set 7 — the year of sittings as a track.
 *
 * Six sittings a year is easy to write and hard to picture. Drawn as a twelvemonth
 * track with the sitting months marked, the gaps become the useful part: you can
 * see how long you would wait after missing a window.
 */
export function SittingsTrack({ className }: { className?: string }) {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const sittings = [1, 3, 4, 6, 11, 12]; // Jan, Mar, Apr, Jun, Nov, Dec

  const x = (index: number) => 16 + (index / 11) * 288;

  return (
    <svg
      viewBox="0 0 320 112"
      role="img"
      aria-label="A twelve-month track marking the six CSCA sittings a year"
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      {/* the year */}
      <line x1="16" y1="58" x2="304" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {months.map((month, index) => {
        const sitting = sittings.includes(index + 1);
        return (
          <g key={index}>
            <line
              x1={x(index)}
              y1={58 - (sitting ? 9 : 4)}
              x2={x(index)}
              y2={58 + (sitting ? 9 : 4)}
              stroke="currentColor"
              strokeWidth={sitting ? 1.6 : 1}
              opacity={sitting ? 0.7 : 0.3}
            />
            <text
              x={x(index)}
              y={84}
              fontSize="7"
              fill="currentColor"
              opacity={sitting ? 0.75 : 0.4}
              textAnchor="middle"
              letterSpacing="0.5"
            >
              {month}
            </text>
            {sitting && (
              <>
                <circle cx={x(index)} cy={58} r="4" className="fill-vermillion" />
                <text
                  x={x(index)}
                  y={40}
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.55"
                  textAnchor="middle"
                  letterSpacing="0.4"
                >
                  {["JAN", "MAR", "APR", "JUN", "NOV", "DEC"][sittings.indexOf(index + 1)]}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* the two-day sitting, called out once */}
      <text x="16" y="104" fontSize="6.4" fill="currentColor" opacity="0.5" letterSpacing="0.6">
        EACH SITTING RUNS ACROSS TWO DAYS · BEIJING TIME
      </text>
    </svg>
  );
}
