import Link from "next/link";
import { Logo } from "./logo";
import { PAPER_STATS } from "@/lib/paper-stats";
import { FOOTER_LINKS, OFFICIAL, SITE } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Clock3, Mail, ShieldCheck } from "lucide-react";

/**
 * Site footer.
 *
 * Structure, top to bottom:
 *   1. a closing CTA band — the last chance to convert without hunting;
 *   2. the main grid: a brand column that carries the independence statement and
 *      four intent-grouped link columns (not a page dump);
 *   3. an official-resources strip (csca.cn and the machine-readable files), so a
 *      reader arriving from a snippet can verify a claim;
 *   4. a legal row: copyright, privacy/terms/contact, independence.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-paper-deep/60">
      {/* closing CTA */}
      <div className="shell border-b border-line/70 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[22px] leading-tight text-ink">
              Sit a real paper before the real one.
            </p>
            <p className="mt-1.5 text-[13px] text-ink-soft">
              Free mock tests, instant marking, and a worked explanation on every question.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
            >
              Start free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/mocks"
              className="inline-flex h-10 items-center rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
            >
              Browse papers
            </Link>
          </div>
        </div>
      </div>

      {/* main grid */}
      <div className="shell py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 lg:w-1/3 lg:pr-8">
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-soft">
              Exam-accurate CSCA preparation: {PAPER_STATS.total} papers in the official format, a
              test-client simulation, and a worked explanation on every question.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-[10.5px] text-ink-soft">
                <ShieldCheck className="h-3 w-3 text-jade" /> Sourced to csca.cn
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-[10.5px] text-ink-soft">
                <Clock3 className="h-3 w-3 text-ink-faint" /> Reviewed November 2026
              </span>
            </div>

            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink transition hover:text-vermillion"
            >
              <Mail className="h-3.5 w-3.5 text-ink-faint" /> {SITE.email}
            </a>
            <p className="mt-1.5 text-[11px] text-ink-faint">
              Content corrections get priority — usually same day.
            </p>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-8 items-center py-0.5 text-[12.5px] text-ink-soft transition hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* official resources */}
      <div className="shell border-t border-line/70 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-ink-soft">
            <span className="text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              Official
            </span>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-8 items-center gap-1 py-0.5 hover:text-ink"
            >
              csca.cn <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={OFFICIAL.syllabus}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-8 items-center gap-1 py-0.5 hover:text-ink"
            >
              Syllabus <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={OFFICIAL.campusChina}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-8 items-center gap-1 py-0.5 hover:text-ink"
            >
              Campus China <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={OFFICIAL.csc}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-8 items-center gap-1 py-0.5 hover:text-ink"
            >
              China Scholarship Council <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-ink-soft">
            <a href="/llms.txt" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              llms.txt
            </a>
            <a href="/sitemap.xml" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              Sitemap
            </a>
            <Link href="/zh" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              中文
            </Link>
          </div>
        </div>
      </div>

      {/* legal */}
      <div className="shell border-t border-line/70 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[11.5px] text-ink-faint">
            © {year} {SITE.name}. Question content is original unless labelled as a transcription.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-ink-soft">
            <Link href="/privacy" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              Terms
            </Link>
            <Link href="/contact" className="inline-flex min-h-8 items-center py-0.5 hover:text-ink">
              Contact
            </Link>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-[11px] leading-relaxed text-ink-faint">
          Independent preparation platform — not affiliated with, endorsed by, or sponsored by the
          China Scholarship Council or the official CSCA. Registration, fees and score reports are
          handled only at{" "}
          <a
            href={OFFICIAL.site}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            csca.cn
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
