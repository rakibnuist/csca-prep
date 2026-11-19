import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, Rss } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { CONTENT_UPDATED, UPDATES } from "@/lib/content-dates";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA updates — what changed on this site, and when",
  description:
    "A public changelog for CSCA Master: corrections to exam facts, new papers, new pages. If we got something wrong about the CSCA, the fix is recorded here with a date.",
  path: "/csca/updates",
  keywords: ["CSCA updates", "CSCA 2026 changes", "CSCA exam news"],
});

export default function UpdatesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Updates", path: "/csca/updates" }])} />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Changelog · last reviewed {CONTENT_UPDATED}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            What changed here, and when we changed it.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Exam rules move, and prep sites that never update are worse than silence. Every correction,
            re-verification and new paper is logged here with a date — including the ones that made our
            own earlier claims wrong.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Public corrections</Pill>
            <Pill>Sourced to csca.cn</Pill>
            <Pill tone="jade">Feeds the sitemap date</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <ol className="min-w-0 space-y-3">
            {UPDATES.map((update) => (
              <li key={`${update.date}-${update.title}`} className="rounded-xl border border-line bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <CalendarClock className="h-3.5 w-3.5 text-ink-faint" />
                  <span className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase tabular">
                    {update.date}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium text-ink">{update.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{update.body}</p>
                {update.href && (
                  <Link
                    href={update.href}
                    className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
                  >
                    See the page <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </li>
            ))}
          </ol>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <Rss className="h-3.5 w-3.5 text-ink-faint" /> How to watch for changes
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                The sitemap carries the real review date for every content page, so a search engine (or
                you) can see when this site last touched the facts. Bookmark this page if you are
                advising applicants across a cycle.
              </p>
              <div className="mt-3 space-y-1.5 text-[11.5px]">
                <a href="/sitemap.xml" className="block text-ink-soft hover:text-vermillion">
                  /sitemap.xml
                </a>
                <a href="/llms.txt" className="block text-ink-soft hover:text-vermillion">
                  /llms.txt — machine-readable summary
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-line bg-paper-deep/40 p-4">
              <p className="text-[11.5px] font-medium text-ink">Found something wrong?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                Content corrections get priority over everything else. Write to{" "}
                <a href={`mailto:${SITE.email}`} className="font-medium text-vermillion hover:underline">
                  {SITE.email}
                </a>{" "}
                with the page and the source, and the fix lands here with a date.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
