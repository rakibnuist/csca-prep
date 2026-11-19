import { Languages } from "lucide-react";
import { TRACKS, type TaughtTrack } from "@/lib/tracks";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Track badge. The teaching track is an account property chosen at sign-up and
 * changed only in Settings, so this no longer offers a switch — it states which
 * section the student is in.
 */
export function TrackSwitch({
  track,
  className,
}: {
  track: TaughtTrack;
  className?: string;
}) {
  const lang = track === "CN" ? "zh" : "en";
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        <Languages className="h-3.5 w-3.5" /> {t(lang, "Track")}
      </span>
      <span
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-medium",
          track === "CN"
            ? "border-jade/30 bg-jade/10 text-jade"
            : "border-vermillion/30 bg-vermillion/10 text-vermillion-deep",
        )}
      >
        {lang === "zh" ? TRACKS[track].labelZh : TRACKS[track].label}
      </span>
    </div>
  );
}
