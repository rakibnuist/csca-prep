import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed statement band.
 *
 * Long editorial pages need a change of visual register roughly every third
 * screen, otherwise the eye stops reading. This is that register change: a
 * crimson field, one serif sentence, a big figure, and a hairline rule — no
 * cards, no icons.
 */
export function PullBand({
  figure,
  figureLabel,
  statement,
  detail,
  href,
  cta,
  className,
}: {
  figure: string;
  figureLabel: string;
  statement: string;
  detail?: string;
  href?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-vermillion via-indigo to-vermillion-deep text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 55%)",
        }}
      />
      <div className="shell relative grid grid-cols-1 gap-8 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="flex items-end gap-4">
          <span className="font-display text-[4rem] font-bold leading-[0.85] tracking-[-0.03em] text-white sm:text-[5.5rem]">
            {figure}
          </span>
          <span className="mb-1.5 max-w-[11rem] text-[11px] font-medium leading-snug tracking-[0.1em] text-white/80 uppercase">
            {figureLabel}
          </span>
        </div>

        <div className="min-w-0 border-t border-white/25 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="font-display text-[1.45rem] font-semibold leading-[1.2] text-balance sm:text-[1.85rem]">
            {statement}
          </p>
          {detail && (
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-white/80">{detail}</p>
          )}
          {href && cta && (
            <Link
              href={href}
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-[12.5px] font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-white/95"
            >
              {cta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
