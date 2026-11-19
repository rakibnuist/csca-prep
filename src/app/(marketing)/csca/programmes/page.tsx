import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { PROGRAMMES } from "@/lib/programmes";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA by programme — MBBS, engineering, CS, law",
  description:
    "Which CSCA papers each programme expects: MBBS and medicine, civil and mechanical engineering, computer science, business and economics, architecture, law and Chinese language. Official subject structure, with the institution-set part flagged.",
  path: "/csca/programmes",
  keywords: [
    "CSCA for MBBS",
    "CSCA for engineering",
    "CSCA for computer science",
    "CSCA subjects by programme",
    "CSCA for business",
    "CSCA for law",
  ],
});

export default function ProgrammesHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Programmes", path: "/csca/programmes" }])} />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>By programme · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            What does your degree actually require?
          </h1>
          <p className="lead mt-5 max-w-2xl">
            The CSCA structure is fixed; the combination your programme expects is not. These are the
            papers each discipline usually asks for, why, and exactly which part only the university
            can answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">8 programmes</Pill>
            <Pill>Official subject structure</Pill>
            <Pill tone="jade">No invented minimums</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMMES.map((programme) => (
            <Link
              key={programme.slug}
              href={`/csca/programmes/${programme.slug}`}
              className="group panel flex min-w-0 flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-display text-lg leading-tight text-ink">{programme.name}</h2>
                <span className="shrink-0 font-chinese text-[11.5px] text-vermillion">{programme.nameZh}</span>
              </div>
              <p className="mt-1 text-[10.5px] tracking-[0.08em] text-ink-faint uppercase">{programme.group}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{programme.combination}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion">
                Read the guide <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-card p-5">
          <p className="text-[12.5px] font-medium text-ink">The rule behind every page here</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
            Mathematics is compulsory for every applicant; Professional Chinese is compulsory for
            Chinese Government Scholarship applicants and Chinese-taught programmes; Physics and
            Chemistry are electives in the official structure. Everything beyond that — the exact
            combination and the minimum score — is set by the receiving university. {SITE.name} does
            not publish a number it cannot source.
          </p>
        </div>
      </section>
    </>
  );
}
