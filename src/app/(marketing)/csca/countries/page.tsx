import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { COUNTRY_GUIDES, localTime } from "@/lib/countries-csca";
import { EXAM_BLOCKS, nextSitting } from "@/lib/site";

const upcoming = nextSitting();
const upcomingPapers = EXAM_BLOCKS[upcoming.block];

export const metadata: Metadata = pageMetadata({
  title: "CSCA by country — local exam times and fees",
  description:
    "The CSCA is scheduled in Beijing time, so your local start depends on your offset. Local clocks, format rules, fees and preparation for applicants in Bangladesh, Nigeria, Pakistan, Vietnam, Indonesia and Kenya.",
  path: "/csca/countries",
  keywords: [
    "CSCA by country",
    "CSCA exam time in my country",
    "CSCA Bangladesh",
    "CSCA Nigeria",
    "CSCA Pakistan",
    "CSCA Indonesia",
  ],
});

export default function CountriesHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Countries", path: "/csca/countries" }])} />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>By country · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            One exam, one Beijing clock, many local start times.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            CSCA rules do not change by country — the papers, the fee and the proctoring standard are
            identical everywhere. What changes is the hour on your wall, and whether a test centre
            serves your region. Pick your country for the converted timetable.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Times are arithmetic, not rumours</Pill>
            <Pill>No invented centre lists</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRY_GUIDES.map((country) => (
            <Link
              key={country.slug}
              href={`/csca/countries/${country.slug}`}
              className="group panel flex min-w-0 flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-display text-xl text-ink">{country.name}</h2>
                <span className="font-chinese text-[12px] text-vermillion">{country.nameZh}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-faint">{country.offsetLabel}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{country.note}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-faint">
                <span className="tabular">Chinese {localTime(upcomingPapers[0].start, country.utcOffset)}</span>
                <span className="tabular">Maths {localTime(upcomingPapers[1].start, country.utcOffset)}</span>
                <span className="tabular text-ink-faint/80">
                  {upcoming.block} block · {upcoming.label}
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion">
                Local timetable <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-card p-5">
          <p className="text-[12.5px] font-medium text-ink">Why we do not list test centres here</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
            Centre availability changes by sitting and by country, and CSCA opens computer-based testing
            progressively. A list on a prep site goes stale within a cycle and sends candidates to places
            that no longer run the exam. The registration system on csca.cn shows what is actually
            offered for your country — start a registration and read it there.
          </p>
        </div>
      </section>
    </>
  );
}
