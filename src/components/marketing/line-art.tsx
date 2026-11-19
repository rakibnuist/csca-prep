import { cn } from "@/lib/utils";

/**
 * Line illustrations for the test-day page.
 *
 * One stroke weight, no fills, one crimson accent per drawing — a single
 * illustration style rather than a pile of mismatched clip-art. Everything is
 * inline SVG so it inherits `currentColor`, stays sharp on print, and adds no
 * network requests.
 */

export function TestClientLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Line drawing of the CSCA test client window with its question palette"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* window */}
      <rect x="12" y="14" width="296" height="172" rx="8" />
      <path d="M12 40h296" />
      <circle cx="28" cy="27" r="3" />
      <path d="M40 27h54" opacity="0.55" />
      <rect x="258" y="20" width="36" height="14" rx="7" className="stroke-vermillion" />

      {/* question column */}
      <path d="M24 56h96" opacity="0.5" />
      <path d="M24 78h176" />
      <path d="M24 90h132" opacity="0.55" />
      {[112, 136, 160].map((y, index) => (
        <g key={y}>
          <rect x="24" y={y} width="184" height="18" rx="4" />
          <circle cx="36" cy={y + 9} r="5" />
          {index === 1 && <path d={`M33 ${y + 9}l2.2 2.2 4.3-4.6`} className="stroke-vermillion" />}
          <path d={`M48 ${y + 9}h${[86, 64, 104][index]}`} opacity="0.5" />
        </g>
      ))}

      {/* palette */}
      <path d="M222 52v120" opacity="0.4" />
      {Array.from({ length: 12 }).map((_, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const answered = index < 6;
        return (
          <rect
            key={index}
            x={232 + col * 17}
            y={62 + row * 17}
            width="12"
            height="12"
            rx="2"
            className={answered ? "stroke-ink/45 fill-ink/[0.08]" : "stroke-ink/25"}
          />
        );
      })}
      <rect x="232" y="147" width="66" height="1" opacity="0.3" />

      {/* footer */}
      <path d="M12 168h296" opacity="0.4" />
      <path d="M28 178h44" opacity="0.45" />
      <rect x="240" y="172" width="54" height="14" rx="4" />
    </svg>
  );
}

export function DualCameraRoom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Line drawing of the exam desk: laptop front-on, phone behind at a 45 degree angle"
      className={cn("h-auto w-full text-ink", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* desk */}
      <path d="M18 156h284" />
      <path d="M40 156v22M280 156v22" opacity="0.45" />

      {/* laptop */}
      <rect x="86" y="66" width="132" height="80" rx="5" />
      <path d="M86 130h132" />
      <path d="M70 146h164l10 10H60z" />
      <path d="M104 82h64M104 96h44" opacity="0.5" />
      <rect x="104" y="108" width="52" height="14" rx="3" className="stroke-vermillion" />

      {/* phone on a stand, behind and to the right */}
      <g transform="rotate(-45 236 58)">
        <rect x="222" y="34" width="28" height="48" rx="4" />
        <circle cx="236" cy="40" r="2" />
        <path d="M228 74h16" opacity="0.4" />
      </g>
      <path d="M250 78l14 34" opacity="0.45" strokeDasharray="3 3" />

      {/* sight line from the laptop to the phone */}
      <path d="M86 60c26-22 88-26 132-4" strokeDasharray="4 4" opacity="0.4" />
      <path d="M212 52l8 4-6 6" opacity="0.5" />

      {/* desk items */}
      <rect x="34" y="132" width="34" height="24" rx="3" opacity="0.6" />
      <path d="M40 132v-8h22v8" opacity="0.45" />
      <circle cx="272" cy="140" r="12" opacity="0.5" />
      <path d="M266 140h12M272 134v12" opacity="0.35" />

      {/* labels */}
      <path d="M28 178h60" opacity="0.3" />
      <path d="M232 186h72" opacity="0.3" />
    </svg>
  );
}
