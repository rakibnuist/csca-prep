"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileStack, PenLine, GraduationCap, ChartLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFromPreference, trackLink, type TaughtTrack } from "@/lib/tracks";
import { t } from "@/lib/i18n";

export function MobileTabBar({
  teachingTrack,
  sectionTrack,
}: {
  teachingTrack: string;
  sectionTrack: TaughtTrack;
}) {
  const pathname = usePathname();
  const track = sectionTrack ?? trackFromPreference(teachingTrack);
  const lang = track === "CN" ? "zh" : "en";
  const base = track === "CN" ? "/cn" : "/en";

  const tabs = [
    { href: `${base}/dashboard`, label: t(lang, "Home"), icon: LayoutDashboard },
    track === "CN"
      ? { href: trackLink("/app/official", track), label: "真题", icon: GraduationCap }
      : { href: trackLink("/app/learn", track), label: t(lang, "Learn"), icon: GraduationCap },
    { href: trackLink("/app/mocks", track), label: t(lang, "Mocks"), icon: FileStack },
    { href: trackLink("/app/practice", track), label: t(lang, "Practice"), icon: PenLine },
    { href: `${base}/results`, label: t(lang, "Results"), icon: ChartLine },
  ];

  return (
    <nav
      aria-label={lang === "zh" ? "主导航" : "Primary"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const path = tab.href.split("?")[0];
          const active = pathname === path || pathname.startsWith(`${path}/`);
          const activeText = track === "CN" ? "text-jade" : "text-vermillion";
          const activeBar = track === "CN" ? "bg-jade" : "bg-vermillion";
          return (
            <Link
              key={tab.label}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition",
                active ? activeText : "text-ink-faint hover:text-ink",
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className={cn("absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full", activeBar)}
                />
              )}
              <tab.icon className="h-5 w-5" strokeWidth={active ? 2.1 : 1.7} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
