"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileStack,
  ScrollText,
  PenLine,
  CalendarCheck,
  Lightbulb,
  Shield,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn, initials } from "@/lib/utils";
import { signOutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/mocks", label: "Mock exams", icon: FileStack },
  { href: "/app/official", label: "Official Q&A", icon: ScrollText },
  { href: "/app/practice", label: "Practice", icon: PenLine },
  { href: "/app/plan", label: "Study plan", icon: CalendarCheck },
  { href: "/tips", label: "Tips & tricks", icon: Lightbulb },
];

export function AppSidebar({
  user,
}: {
  user: { name: string | null; email: string; role: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-ink" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-2 pt-3 pb-2 text-[10px] tracking-[0.16em] text-ink-faint uppercase">
          Prepare
        </p>
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] transition",
                active
                  ? "bg-card font-medium text-ink shadow-[0_1px_2px_rgba(22,18,15,0.05)]"
                  : "text-ink-soft hover:bg-card/60 hover:text-ink",
              )}
            >
              <item.icon
                className={cn("h-4 w-4", active ? "text-vermillion" : "text-ink-faint")}
                strokeWidth={1.7}
              />
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-vermillion" />}
            </Link>
          );
        })}

        {user.role === "ADMIN" && (
          <>
            <p className="px-2 pt-6 pb-2 text-[10px] tracking-[0.16em] text-ink-faint uppercase">
              Operations
            </p>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] transition",
                pathname.startsWith("/admin")
                  ? "bg-card font-medium text-ink"
                  : "text-ink-soft hover:bg-card/60 hover:text-ink",
              )}
            >
              <Shield className="h-4 w-4 text-ink-faint" strokeWidth={1.7} />
              Admin console
            </Link>
          </>
        )}

        <p className="px-2 pt-6 pb-2 text-[10px] tracking-[0.16em] text-ink-faint uppercase">
          Account
        </p>
        <Link
          href="/app/settings"
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] transition",
            pathname === "/app/settings"
              ? "bg-card font-medium text-ink"
              : "text-ink-soft hover:bg-card/60 hover:text-ink",
          )}
        >
          <Settings className="h-4 w-4 text-ink-faint" strokeWidth={1.7} />
          Settings
        </Link>
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1 py-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">
            {initials(user.name ?? user.email)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-ink">{user.name ?? "Student"}</p>
            <p className="truncate text-[10.5px] text-ink-faint">{user.email}</p>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-[12.5px] text-ink-soft transition hover:bg-card/60 hover:text-ink"
          >
            <LogOut className="h-4 w-4 text-ink-faint" strokeWidth={1.7} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r border-line bg-paper-deep/40 lg:block">
        {content}
      </aside>

      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur lg:hidden">
        <Logo compact />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line"
          aria-label="Open menu"
        >
          <Menu className="h-4.5 w-4.5 text-ink" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[300px] bg-paper shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
