import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "CSCA guides — requirements, planning and scoring, explained",
  description:
    "Practical CSCA guides: CSCA vs HSK, an eight-week study plan, which subjects your major needs, registration step by step, and how scoring and percentiles work.",
  path: "/guides",
  keywords: ["CSCA guide", "CSCA preparation", "CSCA requirements", "how to prepare for CSCA"],
});

export default function GuidesPage() {
  const [featured, ...rest] = GUIDES;

  return (
    <>
      <JsonLd
        data={itemListLd(GUIDES.map((guide) => ({ name: guide.title, path: `/guides/${guide.slug}` })))}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Guides</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Everything applicants ask about the CSCA, answered properly.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Five substantial guides instead of fifty thin posts. Each one answers a question we
            actually get asked, with the official facts and the practical detail that follows from
            them.
          </p>
        </div>
      </section>

      <section className="shell py-12">
        <Link
          href={`/guides/${featured.slug}`}
          className="group grid overflow-hidden rounded-2xl border border-line bg-card transition hover:shadow-[var(--shadow-lift)] lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="red">Start here</Pill>
              <Pill>{featured.eyebrow}</Pill>
            </div>
            <h2 className="mt-4 font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-ink-soft">
              {featured.description}
            </p>
            <div className="mt-5 flex items-center gap-4 text-[11px] text-ink-faint">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" /> {featured.readingMinutes} min read
              </span>
              <span>{formatDate(featured.modified, true)}</span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-vermillion">
              Read the guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </div>
          <div className="relative hidden overflow-hidden border-l border-line bg-ink lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(200,16,46,0.35),transparent_65%)]" />
            <div className="relative flex h-full flex-col justify-between p-8 text-paper">
              <p className="eyebrow text-paper/40">The short answer</p>
              <p className="font-display text-2xl leading-snug text-balance text-paper/90">
                {featured.takeaway}
              </p>
              <p className="text-[10.5px] text-paper/40">CSCA Master · guides</p>
            </div>
          </div>
        </Link>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group panel flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center justify-between">
                <Pill>{guide.eyebrow}</Pill>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:text-vermillion" />
              </div>
              <h2 className="mt-3 font-display text-2xl leading-tight text-ink">{guide.title}</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{guide.description}</p>
              <div className="mt-auto pt-4 text-[10.5px] text-ink-faint">
                {guide.readingMinutes} min read · updated {formatDate(guide.modified, true)}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Sample questions",
              body: "25 free items with worked explanations.",
              href: "/sample-questions",
            },
            {
              title: "Score calculator",
              body: "Turn correct answers into the 0–100 scale.",
              href: "/tools/score-calculator",
            },
            {
              title: "University directory",
              body: "Which subjects each institution expects.",
              href: "/universities",
            },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-line bg-paper-deep/40 p-4 transition hover:border-line-strong"
            >
              <p className="text-[12.5px] font-medium text-ink">{tool.title}</p>
              <p className="mt-1 text-[11.5px] text-ink-soft">{tool.body}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-vermillion">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
