import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { ScoreCalculator } from "@/components/tools/score-calculator";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA score calculator — answers to a 0–100 mark",
  description:
    "Convert raw CSCA answers into the official 0–100 scale, estimate your percentile band, and see exactly how many questions you need for a target score.",
  path: "/tools/score-calculator",
  keywords: [
    "CSCA score calculator",
    "CSCA scoring",
    "CSCA percentile",
    "CSCA marks",
    "CSCA score out of 100",
  ],
});

const FAQ = [
  {
    q: "How is the CSCA scored?",
    a: "Each subject is scored 0–100 from single-answer multiple-choice questions. The score is proportional to the number of correct answers, with no negative marking for wrong answers.",
  },
  {
    q: "What is a good CSCA score?",
    a: "There is no national pass mark. As a planning heuristic, 85+ is competitive at top-20 universities, 70–84 is competitive for most scholarship programmes, and 50–69 is acceptable at many institutions but weak for the top tier.",
  },
  {
    q: "Is the percentile estimate official?",
    a: "No. Universities see a real global percentile, but cohort data is not public. The percentile on this page is modelled from the score distribution and is labelled as an estimate.",
  },
];

export default function ScoreCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Score calculator", path: "/tools/score-calculator" }])} />
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
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Free tool</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            What does your raw score become on the CSCA scale?
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Move the sliders. The calculator converts correct answers into the 0–100 scale the
            universities see, estimates your percentile band, and tells you how many questions a
            target score actually requires.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">No sign-up</Pill>
            <Pill>Works for all five papers</Pill>
            <Pill tone="jade">Estimate, clearly labelled</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <ScoreCalculator />
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="min-w-0">
            <Eyebrow>Read this before you panic</Eyebrow>
            <h2 className="display-md mt-3">Three things the calculator cannot tell you.</h2>
            <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">The real cohort.</strong> Percentiles depend on who sat
                the same paper. Our model assumes a normal distribution; the official cohort may not
                be normal.
              </li>
              <li>
                <strong className="text-ink">The university&apos;s floor.</strong> Institutions set
                their own minimums and change them each cycle. A score that clears one programme may
                miss another at the same university.
              </li>
              <li>
                <strong className="text-ink">Your trajectory.</strong> A single score is a snapshot.
                The useful number is whether your topic mastery is rising between papers.
              </li>
            </ul>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-vermillion hover:underline"
            >
              Official scoring rules at csca.cn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="min-w-0 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-line bg-paper px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                  <span className="min-w-0 flex-1">{item.q}</span>
                  <span className="shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}

            <div className="flex flex-wrap gap-3 pt-2 text-[11.5px]">
              <Link href="/sample-questions" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Try sample questions
              </Link>
              <Link href="/csca" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Exam guide
              </Link>
              <Link href="/requirements" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                University requirements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
