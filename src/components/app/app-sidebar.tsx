"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  LayoutDashboard,
  FileStack,
  ScrollText,
  PenLine,
  CalendarCheck,
  ChartLine,
  Shield,
  CreditCard,
  GraduationCap,
  Settings,
  Menu,
  X,
  LogOut,
  Zap,
  Trophy,
  Play,
  Languages,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn, initials } from "@/lib/utils";
import { signOutAction } from "@/lib/actions/auth";
import { trackLink, type TaughtTrack } from "@/lib/tracks";
import { t, type Lang } from "@/lib/i18n";

/**
 * Student sidebar.
 *
 * Built around what a candidate actually does: get into a paper or a drill
 * quickly, then check progress. The teaching track is the account's property,
 * so the labels are clean ("Practice", "Mock tests") rather than repeating the
 * track name on every item.
 */
export function AppSidebar({
  user,
  sectionTrack,
}: {
  user: {
    name: string | null;
    email: string;
    role: string;
    plan: string;
    teachingTrack: string;
  };
  sectionTrack: TaughtTrack;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const zh = sectionTrack === "CN";
  const lang: Lang = zh ? "zh" : "en";
  const planLabel =
    user.plan === "LIFETIME"
      ? zh
        ? "终身版"
        : "Lifetime"
      : user.plan === "PRO"
        ? zh
          ? "专业版"
          : "Pro"
        : zh
          ? "免费版"
          : "Free";
  const track = sectionTrack;
  const accent = track === "CN" ? "jade" : "vermillion";
  const base = track === "CN" ? "/cn" : "/en";

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    const pathActive =
      pathname === path ||
      (pathname.startsWith(`${path}/`) &&
        !(path === `${base}/practice` && pathname.startsWith(`${base}/practice/mistakes`)));
    if (!pathActive) return false;
    const taught = new URLSearchParams(query ?? "").get("taught");
    return !taught || taught === track;
  };

  const groups = [
    {
      label: t(lang, "Study"),
      items: [
        { href: `${base}/dashboard`, label: t(lang, "Dashboard"), icon: LayoutDashboard },
        { href: trackLink("/app/daily", track), label: t(lang, "Daily quiz"), icon: Zap },
        { href: trackLink("/app/practice", track), label: zh ? "练习" : "Practice", icon: PenLine },
        { href: `${base}/practice/mistakes`, label: zh ? "错题本" : "Mistakes", icon: AlertTriangle },
        { href: trackLink("/app/mocks", track), label: zh ? "模拟卷" : "Mock tests", icon: FileStack },
        { href: trackLink("/app/official", track), label: zh ? "真题" : "Past papers", icon: ScrollText },
        {
          href: trackLink("/app/learn", track),
          label: zh ? "概念与公式" : "Concepts & Formulas",
          icon: GraduationCap,
        },
      ],
    },
    {
      label: t(lang, "Progress"),
      items: [
        { href: `${base}/plan`, label: t(lang, "Study plan"), icon: CalendarCheck },
        { href: `${base}/results`, label: t(lang, "Results"), icon: ChartLine },
        { href: `${base}/leaderboard`, label: t(lang, "Leaderboard"), icon: Trophy },
      ],
    },
    {
      label: t(lang, "Account"),
      items: [
        { href: `${base}/settings`, label: t(lang, "Settings"), icon: Settings },
        { href: `${base}/billing`, label: t(lang, "Billing & plan"), icon: CreditCard },
      ],
    },
  ];

  const content = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/70 px-5">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line lg:hidden"
          aria-label={zh ? "关闭菜单" : "Close menu"}
        >
          <X className="h-5 w-5 text-ink" />
        </button>
      </div>

      {/* primary action: get into a paper */}
      <div className="shrink-0 space-y-2 px-4 pt-4">
        <Link
          href={trackLink("/app/mocks", track)}
          onClick={() => setOpen(false)}
          className={cn(
            "inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-medium text-paper shadow-sm transition hover:-translate-y-px",
            accent === "jade"
              ? "bg-jade hover:bg-jade/90"
              : "bg-vermillion hover:bg-vermillion-deep",
          )}
        >
          <Play className="h-3.5 w-3.5" />
          {zh ? "开始模拟卷" : "Sit a mock"}
        </Link>
        <span
          className={cn(
            "inline-flex w-full items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10.5px] font-medium",
            accent === "jade"
              ? "border-jade/25 bg-jade/10 text-jade"
              : "border-vermillion/25 bg-vermillion/10 text-vermillion-deep",
          )}
        >
          <Languages className="h-3 w-3" />
          {zh ? "中文授课" : "English-taught track"}
        </span>
      </div>

      <nav aria-label={zh ? "学习导航" : "App navigation"} className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-2.5 pb-1.5 text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition",
                      active
                        ? accent === "jade"
                          ? "bg-jade-soft font-semibold text-jade"
                          : "bg-indigo-soft font-semibold text-vermillion"
                        : "text-ink-soft hover:bg-paper-deep/70 hover:text-ink",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4",
                        active ? (accent === "jade" ? "text-jade" : "text-vermillion") : "text-ink-faint",
                      )}
                      strokeWidth={1.7}
                    />
                    {item.label}
                    {active && (
                      <span
                        className={cn(
                          "ml-auto h-1.5 w-1.5 rounded-full",
                          accent === "jade" ? "bg-jade" : "bg-vermillion",
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {user.role === "ADMIN" && (
          <div>
            <p className="px-2.5 pb-1.5 text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {t(lang, "Operations")}
            </p>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition",
                pathname.startsWith("/admin")
                  ? "bg-indigo-soft font-semibold text-vermillion"
                  : "text-ink-soft hover:bg-paper-deep/70 hover:text-ink",
              )}
            >
              <Shield className="h-4 w-4 text-ink-faint" strokeWidth={1.7} />
              {zh ? "管理后台" : "Admin console"}
            </Link>
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-line/70 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1 py-1.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">
            {initials(user.name ?? user.email)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-ink">
              {user.name ?? (zh ? "同学" : "Student")}
            </p>
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[10.5px] text-ink-faint">{user.email}</p>
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-px text-[9px] font-semibold",
                  user.plan === "FREE"
                    ? "bg-paper-deep text-ink-faint"
                    : user.plan === "PRO"
                      ? "bg-gold-soft text-gold"
                      : "bg-jade-soft text-jade",
                )}
              >
                {planLabel}
              </span>
            </div>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-ink-soft transition hover:bg-ink/5 hover:text-ink"
          >
            <LogOut className="h-4 w-4 text-ink-faint" strokeWidth={1.7} />
            {t(lang, "Sign out")}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <aside
        data-app-sidebar
        className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r border-line/70 bg-white lg:block print:hidden"
      >
        {content}
      </aside>

      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line/70 bg-white/90 px-4 backdrop-blur lg:hidden print:hidden">
        <Logo compact />
        <div className="flex items-center gap-2">
          <Link
            href={trackLink("/app/daily", track)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-medium transition",
              accent === "jade"
                ? "border-jade/30 bg-jade/10 text-jade hover:bg-jade/15"
                : "border-vermillion/30 bg-vermillion/10 text-vermillion-deep hover:bg-vermillion/15",
            )}
          >
            <Zap className="h-3.5 w-3.5" />
            {zh ? "今日十题" : "Daily 10"}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line"
            aria-label={zh ? "打开菜单" : "Open menu"}
          >
            <Menu className="h-4.5 w-4.5 text-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[300px] bg-white shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
