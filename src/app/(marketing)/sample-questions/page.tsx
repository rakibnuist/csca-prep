import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Info } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { OFFICIAL } from "@/lib/site";
import { mathQuestions } from "../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "../../../../prisma/seed-data/questions/chinese-stem";

export const metadata: Metadata = pageMetadata({
  title: "Free CSCA sample questions (2027) — try 25 real-style items",
  description:
    "Twenty-five free CSCA sample questions across Mathematics, Physics, Chemistry, Humanities Chinese and STEM Chinese, with worked explanations. No account required.",
  path: "/sample-questions",
  keywords: [
    "CSCA sample questions",
    "CSCA practice test",
    "free CSCA questions",
    "CSCA maths questions",
    "CSCA physics questions",
    "CSCA chemistry questions",
  ],
});

const PICKS = [0, 3, 7, 13, 21];

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
    q: "Are these real CSCA questions?",
    a: "No. They are original questions written against the published CSCA syllabus and format, so they behave like the exam without reproducing protected paper content. Official sample materials are published on csca.cn.",
  },
  {
    q: "How many questions are on the real CSCA?",
    a: "Mathematics, Physics and Chemistry each have 48 single-answer questions in 60 minutes. Professional Chinese has 80 questions in 90 minutes. Every subject is scored 0–100.",
  },
  {
    q: "Do I need an account to use these samples?",
    a: "No. The 25 questions on this page are free and require no sign-up. A free account unlocks a full-length paper per subject, topic drills and analytics.",
  },
];

export default function SampleQuestionsPage() {
  const questions = toSamples();

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Sample questions", path: "/sample-questions" }])} />
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
          <Eyebrow>Free · no account required</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Twenty-five CSCA sample questions, with the working shown.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Five questions from each subject, drawn from our bank and formatted exactly like the
            paper: one answer, four options, no negative marking. Answer them, read the explanation,
            then decide whether the real thing is worth a full-length attempt.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Original questions</Pill>
            <Pill>Worked explanations</Pill>
            <Pill tone="jade">5 subjects × 5 items</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1.55fr_0.85fr]">
          <div>
            <SampleQuiz questions={questions} />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="eyebrow">Against the real paper</p>
              <table className="mt-3 w-full text-[11.5px]">
                <thead>
                  <tr className="text-left text-[9.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="pb-1.5">Paper</th>
                    <th className="pb-1.5">Real</th>
                    <th className="pb-1.5">Here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SUBJECTS.map((subject) => (
                    <tr key={subject.code}>
                      <td className="py-1.5 text-ink-soft">{subject.shortEn}</td>
                      <td className="py-1.5 text-ink tabular">{subject.questionCount}</td>
                      <td className="py-1.5 text-ink-faint tabular">5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 flex items-start gap-1.5 text-[10px] text-ink-faint">
                <Clock3 className="mt-0.5 h-3 w-3 shrink-0" />
                Real timings: 60 minutes for the fundamental subjects, 90 for Professional Chinese.
              </p>
            </div>

            <div className="panel p-5">
              <p className="eyebrow">Next step</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                A five-question sample tells you the style. A 48-question paper tells you where you
                actually stand.
              </p>
              <Link
                href="/sign-up"
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-vermillion text-[12px] font-medium text-paper"
              >
                Start a free full paper <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/syllabus"
                className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line text-[12px] font-medium text-ink"
              >
                Browse the syllabus
              </Link>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep/50 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                <Info className="h-3.5 w-3.5 text-ink-faint" /> Official sample papers
              </p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">
                CSCA publishes official syllabus PDFs on its own portal. Use both: official papers for
                style, our bank for volume and explanations.
              </p>
              <a
                href={OFFICIAL.syllabus}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-medium text-vermillion hover:underline"
              >
                csca.cn/testprep <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>How to read your score</Eyebrow>
            <h2 className="display-md mt-3">A sample is a style check, not a diagnosis.</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              Five items cannot rank your topics. The signal you want comes from a full paper: 48
              questions spread across every syllabus topic, scored on the same 0–100 scale.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-line bg-paper px-4 py-3">
                <summary className="cursor-pointer list-none text-[12.5px] font-medium text-ink">
                  {item.q}
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
            <div className="flex flex-wrap gap-3 pt-1 text-[11.5px]">
              <Link href="/csca" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Full exam guide
              </Link>
              <Link href="/guides" className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Preparation guides
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
