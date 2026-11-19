import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Layers, Weight } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { CURRICULUM } from "@/lib/curriculum";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";
import { JsonLd } from "@/components/seo/jsonld";
import { itemListLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CSCA syllabus — five subjects, topic by topic",
  description:
    "The official CSCA syllabus broken into navigable topic trees for Mathematics, Physics, Chemistry, Humanities Chinese and STEM Chinese, with approximate paper weightings.",
  path: "/syllabus",
  keywords: [
    "CSCA syllabus",
    "CSCA maths syllabus",
    "CSCA physics syllabus",
    "CSCA chemistry syllabus",
    "CSCA Chinese syllabus",
  ],
});

export default function SyllabusPage() {
  return (
    <>
      <JsonLd
        data={itemListLd(
          CURRICULUM.map((subject) => ({
            name: `${subject.nameEn} syllabus`,
            path: `/syllabus/${subject.code.toLowerCase()}`,
          })),
        )}
      />

      <JsonLd data={breadcrumbLd([{ name: "CSCA syllabus", path: "/syllabus" }])} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type":"Question","name":"What does the CSCA syllabus cover?","acceptedAnswer":{"@type":"Answer","text":"Five papers. Mathematics: sets and inequalities, functions including sequences and derivative basics, geometry and algebra, probability and statistics. Physics: mechanics, electromagnetism, thermodynamics, optics, modern physics. Chemistry: basic concepts and calculations, substance properties and reactions, theories and laws, experimental applications. Professional Chinese (Humanities and STEM): six language item types applied to discipline-specific texts."}},
{"@type":"Question","name":"How many questions are on each CSCA paper?","acceptedAnswer":{"@type":"Answer","text":"Mathematics, Physics and Chemistry have 48 single-answer questions in 60 minutes. Both Professional Chinese papers have 80 single-answer questions in 90 minutes. Every paper is scored 0\u2013100."}},
{"@type":"Question","name":"Is this the official CSCA syllabus?","acceptedAnswer":{"@type":"Answer","text":"The topic names and scope are transcribed from the CSC 2025 syllabi published on csca.cn, one PDF per subject. The percentage weights shown here are our approximation from the published structure \u2014 useful for planning revision time, but not a CSC statement about how marks are distributed."}},
{"@type":"Question","name":"Do I need all five subjects?","acceptedAnswer":{"@type":"Answer","text":"No. Mathematics is compulsory; Professional Chinese is compulsory for Chinese Government Scholarship applicants and Chinese-taught programmes; Physics and Chemistry depend on your programme. See the requirements matrix for the combination each programme group expects."}},
{"@type":"Question","name":"Where can I download the official syllabus PDFs?","acceptedAnswer":{"@type":"Answer","text":"From the CSCA site under \u5907\u8003\u8d44\u6e90 (test preparation): csca.cn/about/testprep. Each subject has a \u8003\u8bd5\u5927\u7eb2 (syllabus) download, and Mathematics, Physics and Chemistry also publish sample questions."}}],
        }}
      />
      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Syllabus</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            The CSCA syllabus, transcribed and weighted.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            We took the official 2025 outlines and turned them into a navigable tree. Each topic is
            mapped to practice questions, and the weighting tells you where the marks actually live.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Official structure</Pill>
            <Pill tone="jade">Bilingual titles</Pill>
            <Pill>Approx. weights</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CURRICULUM.map((subject) => {
            const units = [...new Set(subject.topics.map((topic) => topic.unitEn))];
            return (
              <Link
                key={subject.code}
                href={`/syllabus/${subject.code.toLowerCase()}`}
                className="group panel flex min-w-0 flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex flex-1 flex-wrap items-baseline gap-2">
                    <h2 className="font-display text-2xl text-ink">{subject.nameEn}</h2>
                    <span className="font-chinese text-sm text-vermillion">{subject.nameZh}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition group-hover:text-indigo" />
                </div>

                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{subject.blurbEn}</p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink-faint">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3 w-3" /> {subject.topics.length} topics
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {units.length} units
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Weight className="h-3 w-3" /> {subject.questionCount} Q · {subject.durationMin} min
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {units.slice(0, 5).map((unit) => (
                    <span
                      key={unit}
                      className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-soft"
                    >
                      {unit}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-paper-deep/50 px-6 py-6 sm:flex-row sm:items-center">
          <div className="min-w-0 max-w-xl">
            <p className="font-display text-xl text-ink">Weights are estimates, topics are not.</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
              Topic names and scope come from the official outlines. The percentage weights are our
              approximation from the published structure — useful for planning, not a promise about
              any individual paper.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href="/sample-questions"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[12.5px] font-medium text-paper"
            >
              Try sample questions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={OFFICIAL.syllabus}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong bg-card px-4 text-[12.5px] font-medium text-ink"
            >
              Official PDFs <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="shell pb-16">
        <h2 className="font-display text-2xl text-ink">CSCA syllabus questions</h2>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
          {[
            { q: "What does the CSCA syllabus cover?", a: "Five papers. Mathematics: sets and inequalities, functions including sequences and derivative basics, geometry and algebra, probability and statistics. Physics: mechanics, electromagnetism, thermodynamics, optics, modern physics. Chemistry: basic concepts and calculations, substance properties and reactions, theories and laws, experimental applications. Professional Chinese (Humanities and STEM): six language item types applied to discipline-specific texts." },
            { q: "How many questions are on each CSCA paper?", a: "Mathematics, Physics and Chemistry have 48 single-answer questions in 60 minutes. Both Professional Chinese papers have 80 single-answer questions in 90 minutes. Every paper is scored 0–100." },
            { q: "Is this the official CSCA syllabus?", a: "The topic names and scope are transcribed from the CSC 2025 syllabi published on csca.cn, one PDF per subject. The percentage weights on this page are our approximation from the published structure — useful for planning revision time, but not a CSC statement about how marks are distributed." },
            { q: "Do I need all five subjects?", a: "No. Mathematics is compulsory; Professional Chinese is compulsory for Chinese Government Scholarship applicants and Chinese-taught programmes; Physics and Chemistry depend on your programme. The requirements page maps each programme group to the papers universities expect." },
            { q: "Where can I download the official syllabus PDFs?", a: "From the CSCA site under 备考资源 (test preparation) at csca.cn/about/testprep. Each subject has a syllabus download, and Mathematics, Physics and Chemistry also publish sample questions." },
          ].map((item) => (
            <details key={item.q} className="group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                <span className="min-w-0 flex-1">{item.q}</span>
                <span className="shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
