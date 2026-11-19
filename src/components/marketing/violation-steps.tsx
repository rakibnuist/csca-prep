import { cn } from "@/lib/utils";

/**
 * Illustration set 6 — the four violation tiers as a stepped gradient.
 *
 * The tiers escalate: a cancelled paper, a two-year ban, a permanent ban, a
 * referral to the courts. A list flattens that; four rising steps do not. The
 * last step is deliberately the darkest thing on the page.
 */
export function ViolationSteps({ className }: { className?: string }) {
  const steps = [
    { level: "Minor", short: "paper cancelled", height: 18, tone: "fill-gold/50" },
    { level: "Serious", short: "2-year suspension", height: 30, tone: "fill-vermillion/55" },
    { level: "Severe", short: "permanent ban", height: 42, tone: "fill-vermillion/80" },
    { level: "Extremely severe", short: "judicial referral", height: 56, tone: "fill-ink" },
  ];

  return (
    <svg
      viewBox="0 0 320 96"
      role="img"
      aria-label="Four escalating violation tiers drawn as rising steps"
      className={cn("h-auto w-full", className)}
    >
      <line x1="12" y1="84" x2="308" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {steps.map((step, index) => {
        const width = 66;
        const x = 16 + index * 72;
        const y = 84 - step.height;
        return (
          <g key={step.level}>
            <rect x={x} y={y} width={width} height={step.height} rx="2" className={step.tone} />
            <text x={x} y={y - 5} fontSize="6.4" fill="currentColor" opacity="0.62" letterSpacing="0.5">
              {step.level}
            </text>
            <text x={x} y={94} fontSize="5.6" fill="currentColor" opacity="0.5" letterSpacing="0.4">
              {step.short}
            </text>
            {index < steps.length - 1 && (
              <path
                d={`M${x + width + 1} ${84 - step.height - 2} l6 0`}
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.25"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
