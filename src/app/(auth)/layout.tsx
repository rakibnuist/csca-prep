import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { OFFICIAL } from "@/lib/site";

/** Session pages are never useful in an index. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-paper lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex min-w-0 flex-col bg-white px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="rounded-lg border border-line bg-paper px-3 py-1.5 text-[12px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink"
          >
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>

        <p className="text-[11px] leading-relaxed text-ink-faint">
          Independent preparation platform. Register for the exam at{" "}
          <a
            href={OFFICIAL.site}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-ink"
          >
            csca.cn
          </a>
          .
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-night p-12 text-paper lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_100%_0%,rgba(37,99,235,0.32),transparent_65%)]"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-vermillion-light uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-vermillion-light" />
            Why students start here
          </span>
          <blockquote className="mt-6 font-display text-[1.9rem] font-bold leading-tight text-balance text-paper">
            “The first time I saw the real interface, I had already seen it four times.”
          </blockquote>
          <p className="mt-4 text-[13.5px] leading-relaxed text-paper/65">
            Familiarity is worth marks. The timer is not the place to learn how the palette works.
          </p>

          <ul className="mt-8 space-y-3 text-[13px] text-paper/85">
            {[
              "5 free timed mocks per subject (original + practice sets 01–04)",
              "Official past papers with worked solutions — free in Study mode",
              "Topic mastery analytics, error notebook, and spaced review",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade-light" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative grid grid-cols-2 gap-3">
          {[
            { k: "5", v: "Subjects in official format" },
            { k: "48", v: "Questions per fundamental paper" },
            { k: "0–100", v: "Same scoring scale as the exam" },
            { k: "10", v: "Working days to results (official)" },
          ].map((item) => (
            <div
              key={item.v}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="font-display text-3xl font-bold text-paper tabular">{item.k}</p>
              <p className="mt-1 text-[11.5px] text-paper/60">{item.v}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
