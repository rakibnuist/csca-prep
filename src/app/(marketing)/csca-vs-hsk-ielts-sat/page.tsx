import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, GraduationCap, Languages } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { CONTENT_UPDATED } from "@/lib/content-dates";

export const metadata: Metadata = pageMetadata({
  title: "CSCA vs HSK, IELTS and the SAT — what each test is actually for",
  description:
    "CSCA, HSK, IELTS/TOEFL and the SAT answer different questions. A side-by-side comparison of what each measures, which programmes need it, and whether one can replace another.",
  path: "/csca-vs-hsk-ielts-sat",
  keywords: [
    "CSCA vs HSK",
    "CSCA vs IELTS",
    "CSCA vs SAT",
    "CSCA HSK difference",
    "China university admission tests",
  ],
  type: "article",
  publishedTime: "2026-11-01",
  modifiedTime: CONTENT_UPDATED,
});

const TABLE = [
  {
    test: "CSCA",
    answers: "Academic readiness in mathematics and science, plus Professional Chinese for Chinese-taught degrees and CGS applicants",
    who: "International applicants to Chinese undergraduate programmes (CSCA-recognised universities)",
    replaces: "—",
  },
  {
    test: "HSK",
    answers: "General Chinese proficiency on a six-level scale",
    who: "Chinese-taught programmes, and some universities as a language prerequisite",
    replaces: "Sometimes accepted instead of Professional Chinese — only if that university says so",
  },
  {
    test: "IELTS / TOEFL",
    answers: "English proficiency",
    who: "English-taught programmes",
    replaces: "No — it is a language requirement, not an academic-readiness test",
  },
  {
    test: "SAT / A-levels",
    answers: "School-leaving academic achievement in a Western curriculum",
    who: "Some universities accept them as parallel evidence",
    replaces: "No — parallel evidence at best, never a CSCA waiver",
  },
];

const DETAILS = [
  {
    icon: GraduationCap,
    name: "CSCA",
    question: "Are you academically ready for a Chinese undergraduate programme?",
    body: "Mathematics is compulsory; Physics and/or Chemistry are added for science-related majors; Professional Chinese is compulsory for Chinese Government Scholarship (CGS) applicants and Chinese-taught programmes. Every paper is multiple choice and scored 0–100.",
    need: "If you are applying to an undergraduate programme at a CSCA-recognised university.",
  },
  {
    icon: Languages,
    name: "HSK",
    question: "Can you function in Chinese?",
    body: "A general Chinese proficiency ladder from HSK 1 to HSK 9. It measures everyday and academic Chinese, not mathematics or science. A high HSK score says nothing about whether you can solve a CSCA calculus item — and a high CSCA Mathematics score says nothing about your Chinese.",
    need: "If your programme is taught in Chinese, or the university lists HSK as a language prerequisite.",
  },
  {
    icon: Globe2,
    name: "IELTS / TOEFL",
    question: "Can you study in English?",
    body: "English proficiency tests required by English-taught programmes. They are language gates, not academic-readiness tests. An English-taught programme that requires the CSCA still requires it — IELTS does not substitute for Mathematics or Physics.",
    need: "If you are applying to an English-taught programme that publishes an English requirement.",
  },
  {
    icon: BookOpen,
    name: "SAT / A-levels",
    question: "What have you achieved in your current curriculum?",
    body: "School-leaving qualifications. Some Chinese universities accept them as supporting evidence of academic ability, but they are built for a different curriculum and do not map onto the CSCA topic list. Treat them as parallel evidence, not a replacement.",
    need: "Only where the university explicitly accepts them alongside, not instead of, a CSCA requirement.",
  },
];

const FAQ = [
  {
    q: "Does HSK replace the CSCA Professional Chinese paper?",
    a: "Only if the specific university says so in writing. Some institutions accept a high HSK level instead of Professional Chinese for certain programmes; many do not. Ask the admissions office and keep the reply.",
  },
  {
    q: "Do I need both IELTS and the CSCA?",
    a: "Possibly. If you apply to an English-taught programme that publishes an English requirement, you need IELTS/TOEFL for the language gate and the CSCA for academic readiness. They test different things and are not interchangeable.",
  },
  {
    q: "Is the SAT accepted instead of the CSCA?",
    a: "Generally no. A few universities accept the SAT or A-levels as parallel evidence, but they do not waive a CSCA requirement unless the university states that explicitly for your programme.",
  },
  {
    q: "Which should I take first?",
    a: "Sit the CSCA subjects your programme requires, and satisfy the language requirement your programme publishes. If you are unsure, confirm the subject list with the university before booking either test.",
  },
];

export default function ComparePage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          title: "CSCA vs HSK, IELTS and the SAT — what each test is actually for",
          description:
            "A side-by-side comparison of what CSCA, HSK, IELTS/TOEFL and the SAT measure, who needs each, and whether one can replace another.",
          path: "/csca-vs-hsk-ielts-sat",
          published: "2026-11-01",
          modified: CONTENT_UPDATED,
        })}
      />
      <JsonLd data={breadcrumbLd([{ name: "CSCA vs HSK, IELTS, SAT", path: "/csca-vs-hsk-ielts-sat" }])} />
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
          <Eyebrow>Comparison · updated {CONTENT_UPDATED}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA vs HSK, IELTS and the SAT — what each test actually measures.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            They are not substitutes. Each answers a different question an admissions committee
            asks, and mixing them up is how applicants waste a sitting.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <GraduationCap className="h-3 w-3" /> Academic readiness
            </Pill>
            <Pill>
              <Languages className="h-3 w-3" /> Language gates
            </Pill>
            <Pill>
              <BookOpen className="h-3 w-3" /> School-leaving
            </Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                <th className="px-3 py-2.5">Test</th>
                <th className="px-3 py-2.5">What it answers</th>
                <th className="px-3 py-2.5">Who needs it</th>
                <th className="px-3 py-2.5">Replaces the CSCA?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-card">
              {TABLE.map((row) => (
                <tr key={row.test}>
                  <td className="px-3 py-3 font-medium text-ink">{row.test}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.answers}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.who}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.replaces}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-xl border border-vermillion/25 bg-vermillion/5 px-4 py-3">
          <p className="text-[13px] leading-relaxed text-ink">
            <span className="font-medium">The practical rule:</span> satisfy the language requirement
            your programme publishes, then sit the CSCA subjects that programme requires. Neither
            waives the other unless the university says so in writing.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-2xl text-ink">Test by test</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.name} className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-ink-faint" />
                    <p className="text-[13px] font-medium text-ink">{detail.name}</p>
                  </div>
                  <p className="mt-2 text-[12px] font-medium text-ink-soft">{detail.question}</p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">{detail.body}</p>
                  <p className="mt-2 flex items-start gap-1.5 text-[11px] text-ink-faint">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vermillion" />
                    <span className="underline decoration-line-strong underline-offset-2">
                      {detail.need}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
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

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/csca"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12px] font-medium text-paper"
            >
              Full CSCA guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/requirements"
              className="inline-flex h-9 items-center rounded-lg border border-line-strong bg-paper px-4 text-[12px] font-medium text-ink"
            >
              Subject requirements
            </Link>
            <Link
              href="/guides/csca-vs-hsk"
              className="inline-flex h-9 items-center rounded-lg border border-line-strong bg-paper px-4 text-[12px] font-medium text-ink"
            >
              CSCA vs HSK in depth
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
