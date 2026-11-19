import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck, Timer } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { mathQuestions } from "../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "../../../../prisma/seed-data/questions/chinese-stem";

export const metadata: Metadata = pageMetadata({
  title: "Free CSCA Mock Test — 10 Questions with Answers (2027)",
  description:
    "Take a free CSCA mock test right now: 10 real-style questions across Mathematics, Physics, Chemistry and Professional Chinese with instant answers and worked explanations. No account required.",
  path: "/free-exam",
  keywords: [
    "CSCA mock test",
    "CSCA free exam",
    "free CSCA exam",
    "CSCA mock exam",
    "CSCA practice test",
    "CSCA question paper",
    "CSCA exam",
  ],
});

const PICKS = [6, 16];

function toSamples(): SampleQuestion[] {
  const banks = [
    { code: "MATH", label: "Mathematics", items: mathQuestions },
    { code: "PHYS", label: "Physics", items: physicsQuestions },
    { code: "CHEM", label: "Chemistry", items: chemistryQuestions },
    { code: "CH_HUM", label: "Humanities 中文", items: chineseHumanitiesQuestions },
    { code: "CH_SCI", label: "STEM 中文", items: chineseStemQuestions },
  ];

  return banks.flatMap((bank) =>
    PICKS.map((index, position) => {
      const item = bank.items[index];
      return {
        id: `${bank.code}-${position}`,
        subject: bank.code,
        subjectLabel: bank.label,
        stem: item.stem,
        options: item.options,
        correct: item.correct,
        explanation: item.explanation,
      };
    }).filter((item) => Boolean(item.stem)),
  );
}

const FAQ = [
  {
    q: "Is this a full CSCA mock test?",
    a: "No — this is a free 10-question sample mock. A full CSCA paper is 48 questions in 60 minutes for Mathematics, Physics and Chemistry, and 80 questions in 90 minutes for Professional Chinese.",
  },
  {
    q: "Is the CSCA mock test free?",
    a: "Yes. These 10 questions are free with no account. A free account unlocks full-length papers, topic drills and a dashboard with your score trend.",
  },
  {
    q: "How does this compare to the real CSCA exam?",
    a: "The questions are original but written against the published syllabus and the official format: one answer, four options, no negative marking. The full papers on the app use the real timings and question counts.",
  },
];

export default function FreeExamPage() {
  const questions = toSamples();

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Free mock test", path: "/free-exam" }])} />
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
          <Eyebrow>Free mock test · no account required</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Try a free CSCA mock test before the real one.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Ten questions in the official format — two from each subject — with instant marking and
            the working shown. The full papers are longer, but this tells you whether the exam is
            what you think it is.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Free CSCA exam</Pill>
            <Pill tone="jade">Instant answers</Pill>
            <Pill>2 questions × 5 subjects</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.55fr_0.85fr]">
          <div className="min-w-0">
            <SampleQuiz questions={questions} />
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="eyebrow">Real vs. this preview</p>
              <table className="mt-3 w-full text-[11.5px]">
                <thead>
                  <tr className="text-left text-[9.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="pb-1.5">Subject</th>
                    <th className="pb-1.5">Full paper</th>
                    <th className="pb-1.5">Here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SUBJECTS.map((subject) => (
                    <tr key={subject.code}>
                      <td className="py-1.5 text-ink-soft">{subject.shortEn}</td>
                      <td className="py-1.5 text-ink tabular">{subject.questionCount} Q</td>
                      <td className="py-1.5 text-ink-faint tabular">2</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 flex items-start gap-1.5 text-[10px] text-ink-faint">
                <Clock3 className="mt-0.5 h-3 w-3 shrink-0" />
                Full paper timing: 60 min for fundamental subjects, 90 min for Professional Chinese.
              </p>
            </div>

            <div className="panel p-5">
              <p className="eyebrow">Next step</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                Ten questions sample the style. A full paper (48 questions in 60 minutes for Maths,
                Physics or Chemistry, 80 in 90 for Professional Chinese), with the real timer and a
                topic breakdown, tells you your level.
              </p>
              <Link
                href="/sign-up"
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-vermillion text-[12px] font-medium text-paper"
              >
                Start a full free paper <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/question-papers"
                className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line text-[12px] font-medium text-ink"
              >
                Browse question papers
              </Link>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep/50 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                <Timer className="h-3.5 w-3.5 text-ink-faint" /> Timing matters
              </p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">
                This preview is untimed so you can read the explanations. The app&apos;s mock papers
                run a server-anchored clock — a refresh cannot buy you minutes.
              </p>
            </div>

            <div className="rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Original content
              </p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">
                Every question is written against the official 2025 topic outlines — no scraped PDFs
                or copied papers.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <Eyebrow>Free CSCA exam FAQ</Eyebrow>
            <h2 className="display-md mt-3">Everything a free mock can (and can&apos;t) tell you.</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              A short mock checks format and difficulty. It does not rank your topics or predict a
              score — for that you need a full paper across the whole syllabus.
            </p>
          </div>
          <div className="min-w-0 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-line bg-paper px-4 py-3">
                <summary className="cursor-pointer list-none text-[12.5px] font-medium text-ink">
                  {item.q}
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
            <div className="flex flex-wrap gap-3 pt-1 text-[11.5px]">
              <Link href="/sample-questions" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Free sample questions
              </Link>
              <Link href="/csca" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Full exam guide
              </Link>
              <Link href="/tools/score-calculator" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Score calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
