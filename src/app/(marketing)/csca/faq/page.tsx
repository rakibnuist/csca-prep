import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { FAQ_GROUPS, FAQ_TOTAL } from "@/lib/faq";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `CSCA FAQ — ${FAQ_TOTAL} answers, sourced and dated`,
  description:
    "Straight answers about the CSCA: who needs it, the five papers and their lengths, fees, registration, the Admission Ticket, test-day equipment, scratch tools, violations, score validity and retakes — sourced from the official CSCA rules.",
  path: "/csca/faq",
  keywords: [
    "CSCA FAQ",
    "CSCA questions",
    "is CSCA mandatory",
    "CSCA exam questions and answers",
    "CSCA passing score",
    "CSCA test day rules",
    "CSCA retake",
    "CSCA score validity",
  ],
});

export default function CscaFaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "FAQ", path: "/csca/faq" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_GROUPS.flatMap((group) =>
            group.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>CSCA FAQ · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            {FAQ_TOTAL} CSCA questions, answered without the consultant fog.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Eligibility, subjects, fees, the Admission Ticket, dual-camera proctoring, scratch tools,
            penalties, score validity and retakes — each answer traced to the official CSCA rules and
            dated. Where the rules are silent, we say so instead of guessing.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Sources linked on every page</Pill>
            <Pill tone="jade">No invented requirements</Pill>
            <Pill>Updated for the 2026–27 cycle</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow">Jump to</p>
            <nav className="mt-3 space-y-1.5 text-[12.5px]">
              {FAQ_GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="block text-ink-soft transition hover:text-indigo"
                >
                  {group.title}
                </a>
              ))}
            </nav>
            <div className="mt-7 rounded-xl border border-line bg-card p-4">
              <p className="text-[11.5px] font-medium text-ink">Still deciding what to sit?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                Our requirements matrix maps each programme group to the papers universities expect.
              </p>
              <Link
                href="/requirements"
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-indigo hover:underline"
              >
                Which subjects? <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          {FAQ_GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <SectionHead eyebrow={group.id === "basics" ? "Start here" : undefined} title={group.title} body={group.blurb} />
              <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                {group.items.map((item) => (
                  <details key={item.id} id={item.id} className="group scroll-mt-24 px-4 py-3.5 sm:px-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13.5px] font-medium text-ink">
                      <span className="flex min-w-0 items-start gap-2.5">
                        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-vermillion/70" />
                        <span className="min-w-0 flex-1">{item.q}</span>
                      </span>
                      <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 pl-[26px] text-[12.5px] leading-relaxed text-ink-soft">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-line bg-ink px-6 py-7 text-paper">
            <p className="font-display text-2xl">Reading is not the same as being ready.</p>
            <p className="mt-1.5 text-[12.5px] text-paper/65">
              Sit a full paper under the official clock — 48 questions in 60 minutes, or 80 in 90 for
              Professional Chinese — and find out where the marks actually leak.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/free-exam"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12.5px] font-medium text-paper"
              >
                Free 10-question mock <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/app/mocks"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[12.5px] font-medium text-paper"
              >
                Full mock library
              </Link>
            </div>
          </section>

          <p className="text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn (exam introduction, candidate notices, syllabus downloads), the CSCA Test
            Rules, the Device &amp; Environment Requirements, and the CSC-published 2025 syllabi.
            Exam rules can change between sittings — re-check{" "}
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2 hover:text-ink"
            >
              csca.cn
            </a>{" "}
            before you register. {SITE.name} is independent and not affiliated with CSC.
          </p>
        </div>
      </div>
    </>
  );
}
