"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

type SessionState = { name: string | null; role: string } | null;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<SessionState>(null);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((response) => (response.ok ? response.json() : { user: null }))
      .then((data: { user: SessionState }) => {
        if (active) setSession(data.user);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const isLoggedIn = !!session;
  const isAdmin = session?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-ink/10 bg-night text-paper/80">
        <div className="shell flex h-8 items-center justify-between text-[11px] tracking-wide">
          <p className="truncate">
            Next sitting <span className="text-paper">19–20 Dec 2026</span>
            <span className="mx-2 text-paper/25">/</span>
            <span className="hidden sm:inline">5 sittings a year · CNY 450 one subject, 700 two or more</span>
            <span className="sm:hidden">5 sittings a year</span>
          </p>
          <Link
            href="/exam-dates"
            className="hidden shrink-0 items-center gap-1 text-paper/60 transition hover:text-paper sm:flex"
          >
            Exam calendar <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="border-b border-line bg-paper/85 backdrop-blur-md">
        <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink",
                    active && "text-ink",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-[21px] left-0 h-[2px] w-full bg-vermillion" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden min-w-[150px] items-center justify-end gap-3 sm:flex">
            {!loaded ? (
              <span className="h-8 w-24 animate-pulse rounded-full bg-paper-deep" />
            ) : isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-[13px] font-medium text-ink-soft transition hover:text-ink"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/app/dashboard"
                  className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-medium text-paper transition hover:bg-ink/85"
                >
                  My dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[13px] font-medium text-ink-soft transition hover:text-ink"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
                >
                  Start free <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink sm:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-line bg-paper px-5 pt-3 pb-6 sm:hidden">
            <div className="flex flex-col divide-y divide-line/70">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-[15px] font-medium text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {!loaded ? null : isLoggedIn ? (
                <Link
                  href="/app/dashboard"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper"
                >
                  My dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-up"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-vermillion text-sm font-medium text-paper"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/sign-in"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-line-strong text-sm font-medium text-ink"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
