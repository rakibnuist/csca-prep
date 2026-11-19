import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, itemListLd, pageMetadata } from "@/lib/seo";
import { UNIVERSITIES } from "@/lib/universities";

export const metadata: Metadata = pageMetadata({
  title: "Universities that accept the CSCA — requirements by institution",
  description:
    "The Chinese universities international applicants ask about most, with their official admissions domains, the CSCA baseline every applicant must meet, and a template that gets the real subject requirements in writing.",
  path: "/universities",
  keywords: [
    "CSCA universities",
    "Chinese universities CSCA",
    "CSCA requirements by university",
    "study in China requirements",
  ],
});

const FAQ = [
  {
    q: "Do all these universities require the CSCA?",
    a: "From the 2026/2027 cycle, international applicants to undergraduate programmes at Chinese Government Scholarship universities must sit the CSCA, and admissions guides expect wider adoption across Chinese university intakes from 2028 onwards (not yet confirmed as a universal national mandate on csca.cn). Check each institution's current admissions notice — every university also sets its own subject list.",
  },
  {
    q: "Why don't you list minimum scores?",
    a: "Because institutions set and change them per programme, and a prep site that prints a number is guessing. Each page links the official admissions domain and gives a template that gets the answer in writing.",
  },
  {
    q: "Which subjects does every applicant need?",
    a: "Mathematics is compulsory for everyone. Physics or Chemistry is required for science-related majors. Professional Chinese is compulsory for Chinese Government Scholarship (CGS) applicants and Chinese-taught programmes (some universities waive it for non-CGS English-taught degrees — confirm in writing).",
  },
];

export default function UniversitiesPage() {
  return (
    <>
      <JsonLd
        data={itemListLd(
          UNIVERSITIES.map((university) => ({
            name: university.name,
            path: `/universities/${university.slug}`,
          })),
        )}
      />
      <JsonLd data={breadcrumbLd([{ name: "Universities", path: "/universities" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Universities · 22 institutions</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Universities that accept the CSCA — and what each one actually asks for.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            The institutions international applicants ask about most, with their official
            admissions domains. We state the official baseline and show you how to get the
            programme-specific answer in writing — no invented minimums.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <Globe2 className="h-3 w-3" /> 22 institutions
            </Pill>
            <Pill>
              <ShieldCheck className="h-3 w-3" /> Official domains only
            </Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UNIVERSITIES.map((university) => (
            <Link
              key={university.slug}
              href={`/universities/${university.slug}`}
              className="group rounded-xl border border-line bg-card p-4 transition hover:border-ink/30"
            >
              <p className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                {university.city}
              </p>
              <h2 className="mt-1 text-[14px] font-medium text-ink">{university.name}</h2>
              <p className="mt-0.5 text-[11.5px] text-ink-faint">{university.nameZh}</p>
              <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-ink-soft">
                {university.note}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-ink group-hover:gap-1.5">
                Requirements and contacts <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-xl text-ink">How CSCA requirements actually work</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Mathematics", "Compulsory for every applicant, every programme."],
              ["Physics or Chemistry", "Required for science-related majors; pick the one the faculty names."],
              ["Professional Chinese", "Compulsory for CGS applicants and Chinese-taught programmes — Humanities or STEM Chinese (confirm any non-CGS English-taught waiver)."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-line bg-card p-4">
                <p className="text-[13px] font-medium text-ink">{title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-ink-soft">
            The full structure is on the{" "}
            <Link href="/requirements" className="underline underline-offset-2 hover:text-ink">
              CSCA requirements page
            </Link>{" "}
            and the{" "}
            <Link href="/syllabus" className="underline underline-offset-2 hover:text-ink">
              syllabus
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-xl text-ink">Frequently asked</h2>
          <dl className="mt-4 divide-y divide-line/70">
            {FAQ.map((item) => (
              <div key={item.q} className="py-3">
                <dt className="text-[13px] font-medium text-ink">{item.q}</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
