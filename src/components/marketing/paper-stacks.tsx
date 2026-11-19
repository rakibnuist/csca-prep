import { cn } from "@/lib/utils";

/**
 * Illustration set 4 — the three kinds of paper.
 *
 * The distinction the mock library keeps making in prose (our own work / drills
 * built from it / a transcription of the real thing) is a shape: three stacks
 * of paper, each drawn differently. Same stroke rules as the rest of the set.
 */

function Stack({
  kind,
  label,
}: {
  kind: "original" | "practice" | "official";
  label: string;
}) {
  return (
    <g>
      {/* the three sheets, offset to read as a stack */}
      {[2, 1, 0].map((layer) => (
        <rect
          key={layer}
          x={14 + layer * 7}
          y={10 + layer * 7}
          width="64"
          height="46"
          rx="3"
          className={cn(
            layer === 0 ? "stroke-ink/70" : "stroke-ink/25",
            layer === 0 && kind === "official" && "stroke-vermillion/70",
          )}
        />
      ))}

      {/* what is drawn on the top sheet differs by kind */}
      {kind === "original" && (
        <>
          <path d="M26 26h40M26 34h30M26 42h34" className="stroke-ink/45" />
          <circle cx="70" cy="24" r="4" className="stroke-vermillion/70" />
        </>
      )}
      {kind === "practice" && (
        <>
          <path d="M26 26h40M26 34h22" className="stroke-ink/45" />
          <path d="M26 44h40" strokeDasharray="3 3" className="stroke-ink/30" />
        </>
      )}
      {kind === "official" && (
        <>
          <path d="M26 24h40M26 32h40M26 40h26" className="stroke-ink/45" />
          <path d="M64 48l4 5 7-9" className="stroke-vermillion" />
        </>
      )}

      <text x="47" y="74" fontSize="4.6" fill="currentColor" opacity="0.62" textAnchor="middle" letterSpacing="0.8">
        {label}
      </text>
    </g>
  );
}

export function PaperStacks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 86"
      role="img"
      aria-label="Line drawings of the three kinds of paper: original mock, practice set, official transcription"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(10 0)">
        <Stack kind="original" label="ORIGINAL" />
      </g>
      <g transform="translate(112 0)">
        <Stack kind="practice" label="PRACTICE SET" />
      </g>
      <g transform="translate(214 0)">
        <Stack kind="official" label="OFFICIAL" />
      </g>
    </svg>
  );
}
