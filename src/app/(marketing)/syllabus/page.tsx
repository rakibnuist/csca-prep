import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Layers, Weight } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { CURRICULUM } from "@/lib/curriculum";
import { pageMetadata } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";
import { JsonLd } from "@/components/seo/jsonld";
import { itemListLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CSCA syllabus 2025/26 — all five subjects, topic by topic",
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
        <div className="grid gap-4 sm:grid-cols-2">
          {CURRICULUM.map((subject) => {
            const units = [...new Set(subject.topics.map((topic) => topic.unitEn))];
            return (
              <Link
                key={subject.code}
                href={`/syllabus/${subject.code.toLowerCase()}`}
                className="group panel flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-display text-2xl text-ink">{subject.nameEn}</h2>
                    <span className="font-chinese text-sm text-vermillion">{subject.nameZh}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:text-vermillion" />
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
          <div className="max-w-xl">
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
    </>
  );
}
