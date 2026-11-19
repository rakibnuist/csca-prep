import { cn } from "@/lib/utils";

/**
 * Illustration set 2 — the guide page.
 *
 * Same rules as set 1: one stroke weight, no fills, a single crimson accent per
 * drawing, inline SVG so it prints and inherits colour. These two replace
 * paragraphs that describe a two-day calendar and a three-step registration
 * flow — both of which are shapes, not prose.
 */

export function ScheduleCalendar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 190"
      role="img"
      aria-label="Line drawing of the two-day sitting: day one and day two, four papers"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* calendar frame */}
      <rect x="14" y="16" width="292" height="158" rx="8" />
      <path d="M14 44h292" />
      <circle cx="32" cy="30" r="3" />
      <path d="M44 30h48" opacity="0.5" />
      <path d="M250 30h44" opacity="0.35" />

      {/* day columns */}
      <path d="M160 44v130" opacity="0.35" strokeDasharray="4 4" />

      <text x="32" y="66" fontSize="9" fill="currentColor" opacity="0.55" letterSpacing="2">
        DAY 1
      </text>
      <text x="178" y="66" fontSize="9" fill="currentColor" opacity="0.55" letterSpacing="2">
        DAY 2
      </text>

      {/* day 1 rows */}
      <rect x="32" y="76" width="112" height="30" rx="4" className="stroke-vermillion" />
      <path d="M42 86h56M42 95h34" opacity="0.5" />
      <circle cx="132" cy="91" r="5" className="stroke-vermillion" />

      <rect x="32" y="114" width="112" height="30" rx="4" />
      <path d="M42 124h44M42 133h28" opacity="0.5" />
      <circle cx="132" cy="129" r="5" opacity="0.5" />

      {/* day 2 rows */}
      <rect x="178" y="76" width="112" height="30" rx="4" />
      <path d="M188 86h40M188 95h26" opacity="0.5" />
      <circle cx="278" cy="91" r="5" opacity="0.5" />

      <rect x="178" y="114" width="112" height="30" rx="4" />
      <path d="M188 124h48M188 133h30" opacity="0.5" />
      <circle cx="278" cy="129" r="5" opacity="0.5" />

      {/* clock glyph */}
      <circle cx="288" cy="30" r="7" opacity="0.6" />
      <path d="M288 26v4l3 2" opacity="0.6" />
    </svg>
  );
}

export function RegistrationFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 146"
      role="img"
      aria-label="Line drawing of the three-step registration flow: account, book and sit, then results"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* three nodes */}
      <g>
        <circle cx="52" cy="52" r="26" />
        <path d="M42 52h20M52 42v20" opacity="0.6" />
        <text x="52" y="102" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="middle" letterSpacing="1.5">
          ACCOUNT
        </text>
      </g>
      <g>
        <circle cx="160" cy="52" r="26" className="stroke-vermillion" />
        <path d="M148 52l7 7 14-16" className="stroke-vermillion" />
        <text x="160" y="102" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="middle" letterSpacing="1.5">
          BOOK + SIT
        </text>
      </g>
      <g>
        <circle cx="268" cy="52" r="26" />
        <path d="M258 46h20M258 52h20M258 58h12" opacity="0.6" />
        <text x="268" y="102" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="middle" letterSpacing="1.5">
          REPORT
        </text>
      </g>

      {/* connectors */}
      <path d="M80 52h50" strokeDasharray="4 4" opacity="0.5" />
      <path d="M124 48l6 4-6 4" opacity="0.6" />
      <path d="M188 52h50" strokeDasharray="4 4" opacity="0.5" />
      <path d="M232 48l6 4-6 4" opacity="0.6" />

      {/* the only place this happens */}
      <path d="M96 124h128" opacity="0.22" strokeDasharray="4 4" />
      <text x="160" y="138" fontSize="8.5" fill="currentColor" opacity="0.55" textAnchor="middle" letterSpacing="2">
        CSCA.CN ONLY
      </text>
    </svg>
  );
}

/**
 * Illustration set 3 — the check-in clock.
 *
 * The timeline is a countdown, so it is drawn as a clock face: 60 minutes of
 * arc, the four documented windows marked on it, and the start line at zero.
 * The windows carry the labels from TIMELINE_RULES so the drawing and the list
 * below it cannot drift apart.
 */
export function CheckInClock({ className }: { className?: string }) {
  const cx = 110;
  const cy = 110;
  const r = 78;

  // angles measured clockwise from 12 o'clock, on a 60-minute face
  const point = (minutesAgo: number, radius = r) => {
    const angle = (minutesAgo / 60) * Math.PI * 2;
    return { x: cx + Math.sin(angle) * radius, y: cy - Math.cos(angle) * radius };
  };

  const windows = [
    { from: 60, to: 30, tone: "stroke-ink/40", label: "60 → 30 min" },
    { from: 30, to: 15, tone: "stroke-indigo", label: "30 → 15 min" },
    { from: 15, to: 5, tone: "stroke-vermillion", label: "15 → 5 min" },
  ] as const;

  const arc = (from: number, to: number) => {
    const start = point(from);
    const end = point(to);
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  };

  const legend = [
    { tone: "stroke-ink/30", text: "60–30 min · log in, system check" },
    { tone: "stroke-indigo", text: "30–15 min · ID verification" },
    { tone: "stroke-vermillion", text: "5 min · final checks" },
    { tone: "stroke-ink", text: "0 · timer starts, no late entry" },
  ];

  return (
    <svg
      viewBox="0 0 320 292"
      role="img"
      aria-label="Clock face showing the check-in windows before a CSCA paper starts"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* face */}
      <circle cx={cx} cy={cy} r={r} opacity="0.5" />
      <circle cx={cx} cy={cy} r={r - 26} opacity="0.16" strokeDasharray="3 5" />

      {/* hour ticks */}
      {Array.from({ length: 12 }).map((_, index) => {
        const outer = point(index * 5, r);
        const inner = point(index * 5, r - (index % 3 === 0 ? 9 : 5));
        return (
          <line
            key={index}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            opacity={index % 3 === 0 ? 0.55 : 0.25}
          />
        );
      })}

      {/* the documented windows, drawn on the arc */}
      {windows.map((window) => (
        <path key={window.label} d={arc(window.from, window.to)} strokeWidth="5" className={window.tone} />
      ))}

      {/* zero: the paper starts */}
      <line
        x1={point(0, r + 9).x}
        y1={point(0, r + 9).y}
        x2={point(0, r - 14).x}
        y2={point(0, r - 14).y}
        strokeWidth="2.2"
      />

      {/* hand at T-15 */}
      <line x1={cx} y1={cy} x2={point(15, r - 32).x} y2={point(15, r - 32).y} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="3.5" />

      <text x={cx} y={cy + 92} fontSize="8" fill="currentColor" opacity="0.45" textAnchor="middle" letterSpacing="1.6">
        MINUTES BEFORE START
      </text>

      {/* legend under the face — it was clipped when set beside it */}
      {legend.map((row, index) => (
        <g key={row.text} transform={`translate(20 ${214 + index * 19})`}>
          <line x1="0" y1="0" x2="14" y2="0" strokeWidth="3" className={row.tone} />
          <text x="22" y="3.5" fontSize="8.5" fill="currentColor" opacity="0.62">
            {row.text}
          </text>
        </g>
      ))}
    </svg>
  );
}
