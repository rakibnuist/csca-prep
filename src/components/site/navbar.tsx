"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ExamCountdown } from "./countdown";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

type SessionState = { name: string | null; role: string } | null;

/**
 * Marketing header.
 *
 * Hierarchy: brand → navigation → utilities (countdown + auth). The active item
 * is a soft pill rather than an underline, because the header changes height on
 * scroll and an absolutely-positioned underline has to chase the baseline. The
 * countdown only appears at xl, so the nav never fights the CTAs for width.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<SessionState>(null);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div
        className={cn(
          "border-b bg-white/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
          scrolled
            ? "border-line shadow-[0_8px_24px_-20px_rgba(15,23,42,0.18)]"
            : "border-line/70",
        )}
      >
        <nav
          className={cn(
            "shell flex items-center justify-between gap-3 transition-[height] duration-300 xl:gap-5",
            scrolled ? "h-[60px]" : "h-[68px]",
          )}
          aria-label="Main"
        >
          <Logo />

          <div className="hidden items-center gap-0.5 rounded-full border border-line/80 bg-paper px-1.5 py-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[12.5px] font-medium whitespace-nowrap transition-all xl:px-3",
                    active
                      ? "bg-white text-ink shadow-xs"
                      : "text-ink-soft hover:bg-white/60 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-3">
            <span className="hidden xl:block">
              <ExamCountdown minimal />
            </span>
            <Link
              href="/zh"
              className="hidden h-8 items-center rounded-lg border border-line bg-paper px-2.5 text-[11.5px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink xl:inline-flex"
            >
              中文
            </Link>
            <span className="hidden h-4 w-px bg-line xl:block" aria-hidden />
            {!loaded ? (
              <span className="h-9 w-[180px] animate-pulse rounded-xl bg-paper-deep" aria-hidden />
            ) : isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="whitespace-nowrap text-[13px] font-medium text-ink-soft transition hover:text-ink"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/app/dashboard"
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-xl bg-ink px-4 text-[13px] font-medium text-paper transition hover:bg-ink/85"
                >
                  My dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="inline-flex h-9 items-center whitespace-nowrap px-3 text-[13px] font-medium text-ink-soft transition hover:text-ink"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-vermillion px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-vermillion-deep"
                >
                  Start free <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {!loaded ? null : isLoggedIn ? (
              <Link
                href="/app/dashboard"
                className="inline-flex h-8.5 items-center whitespace-nowrap rounded-xl bg-ink px-3 text-[12px] font-semibold text-white transition hover:bg-ink/85"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden h-8.5 items-center whitespace-nowrap px-2.5 text-[12.5px] font-medium text-ink-soft transition hover:text-ink min-[420px]:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex h-8.5 items-center gap-1 whitespace-nowrap rounded-xl bg-vermillion px-3 text-[12px] font-semibold text-white shadow-xs transition hover:bg-vermillion-deep"
                >
                  Start free <ArrowUpRight className="h-3 w-3" />
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-paper-deep"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="shell py-3">
              <div className="grid grid-cols-1 gap-0.5">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                        active
                          ? "bg-indigo-soft text-vermillion"
                          : "text-ink-soft hover:bg-paper-deep/70 hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <ExamCountdown compact />
                <Link
                  href="/zh"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-line bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-soft"
                >
                  中文版
                </Link>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {!loaded ? null : isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-line-strong text-sm font-medium text-ink"
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/app/dashboard"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-ink text-sm font-medium text-paper"
                    >
                      My dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-vermillion text-sm font-semibold text-white"
                    >
                      Start free
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-line-strong text-sm font-medium text-ink"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
