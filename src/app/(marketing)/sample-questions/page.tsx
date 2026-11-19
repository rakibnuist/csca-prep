import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Info } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { MathText } from "@/components/math-text";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { PAPER_STATS } from "@/lib/paper-stats";
import { OFFICIAL } from "@/lib/site";
import { mathQuestions } from "../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "../../../../prisma/seed-data/questions/chinese-stem";

export const metadata: Metadata = pageMetadata({
  title: "Free CSCA sample questions — 50 with answers",
  description:
    "Free CSCA exam practice: fifty real-style mock test questions across Mathematics, Physics, Chemistry, Humanities Chinese and STEM Chinese, with worked explanations. No account required.",
  path: "/sample-questions",
  keywords: [
    "CSCA sample questions",
    "CSCA practice test",
    "CSCA mock test",
    "CSCA free exam",
    "CSCA question paper",
    "free CSCA questions",
    "CSCA maths questions",
    "CSCA physics questions",
    "CSCA chemistry questions",
  ],
});

/** Ten items per subject, spread evenly across each bank. */
const PER_SUBJECT = 10;

function toSamples(): SampleQuestion[] {
  const banks = [
    { code: "MATH", label: "Mathematics", items: mathQuestions },
    { code: "PHYS", label: "Physics", items: physicsQuestions },
    { code: "CHEM", label: "Chemistry", items: chemistryQuestions },
    { code: "CH_HUM", label: "Humanities 中文", items: chineseHumanitiesQuestions },
    { code: "CH_SCI", label: "STEM 中文", items: chineseStemQuestions },
  ];

  return banks.flatMap((bank) =>
    Array.from({ length: PER_SUBJECT }, (_, position) =>
      Math.floor(((position + 0.5) * bank.items.length) / PER_SUBJECT),
    ).map((index, position) => {
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
    a: "No. They are original questions written against the published CSCA syllabus and format, so they behave like the exam without reproducing protected paper content. The official past papers are shared separately, free, at /question-papers.",
  },
  {
    q: "How many questions are on the real CSCA?",
    a: "Mathematics, Physics and Chemistry each have 48 single-answer questions in 60 minutes. Professional Chinese has 80 questions in 90 minutes. Every subject is scored 0–100.",
  },
  {
    q: "Do I need an account to use these samples?",
    a: `No. The 50 questions on this page are free and require no sign-up. A free account unlocks two timed attempts on each of the 25 free mock papers (50 sittings across the 5 subjects), full Study Q&A on all ${PAPER_STATS.official + PAPER_STATS.review} official and review papers, topic drills, and analytics.`,
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
            Fifty CSCA sample questions, with the working shown.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Ten questions from each of the five papers, drawn from our bank and formatted exactly like
            the exam: one answer, four options, no negative marking. Answer them, read the working,
            then decide whether the real thing is worth a full-length attempt.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Original questions</Pill>
            <Pill>Worked explanations</Pill>
            <Pill tone="jade">5 papers × 10 items</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { slug: "mathematics", label: "Mathematics" },
            { slug: "physics", label: "Physics" },
            { slug: "chemistry", label: "Chemistry" },
            { slug: "chinese-humanities", label: "Humanities 中文" },
            { slug: "chinese-stem", label: "STEM 中文" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/sample-questions/${item.slug}`}
              className="group rounded-xl border border-line bg-card px-3 py-2.5 transition hover:border-ink/30"
            >
              <span className="text-[12px] font-medium text-ink">{item.label}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-ink-faint group-hover:text-ink">
                Ten samples <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.55fr_0.85fr]">
          <div className="min-w-0">
            <SampleQuiz questions={questions} />
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel card-elevate p-5">
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
                      <td className="py-1.5 text-ink-faint tabular">10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 flex items-start gap-1.5 text-[10px] text-ink-faint">
                <Clock3 className="mt-0.5 h-3 w-3 shrink-0" />
                Real timings: 60 minutes for the fundamental subjects, 90 for Professional Chinese.
              </p>
            </div>

            <div className="panel card-elevate p-5">
              <p className="eyebrow">Next step</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                A ten-question sample tells you the style. A full-length paper (48 questions in 60
                minutes, or 80 in 90 for Professional Chinese) tells you where you actually stand.
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


      <section className="border-t border-line py-14">
        <div className="shell">
          <Eyebrow>All fifty, with answers</Eyebrow>
          <h2 className="display-md mt-3">The full set, written out.</h2>
          <p className="lead mt-3 max-w-2xl">
            Every question on this page, its four options, the correct answer and the working. Read
            them as a worked revision sheet, or use the interactive version above to test yourself
            first.
          </p>

          {(["MATH", "PHYS", "CHEM", "CH_HUM", "CH_SCI"] as const).map((subjectCode) => {
            const items = questions.filter((question) => question.subject === subjectCode);
            if (items.length === 0) return null;
            const label = items[0].subjectLabel;
            return (
              <div key={subjectCode} id={`samples-${subjectCode.toLowerCase()}`} className="mt-10 scroll-mt-24">
                <h3 className="font-display text-xl text-ink">
                  {label}
                  <span className="ml-2 text-[11px] font-normal text-ink-faint">
                    {items.length} sample questions
                  </span>
                </h3>
                <div className="mt-4 space-y-3">
                  {items.map((question, index) => (
                    <details key={question.id} className="group rounded-xl border border-line bg-card px-4 py-3">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[13px] font-medium text-ink">
                        <span className="flex min-w-0 gap-2">
                          <span className="shrink-0 text-ink-faint tabular">{String(index + 1).padStart(2, "0")}</span>
                          <span className="min-w-0 flex-1">
                            <MathText inline>{question.stem}</MathText>
                          </span>
                        </span>
                        <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                      </summary>
                      <ol className="mt-3 space-y-1.5">
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === question.correct;
                          return (
                            <li
                              key={optionIndex}
                              className={
                                isCorrect
                                  ? "flex items-start gap-2 rounded-lg border border-jade/40 bg-jade-soft/50 px-2.5 py-1.5 text-[12.5px] text-ink"
                                  : "flex items-start gap-2 px-2.5 py-1.5 text-[12.5px] text-ink-soft"
                              }
                            >
                              <span className="mt-0.5 w-4 shrink-0 text-[11px] font-semibold text-ink-faint">
                                {"ABCD"[optionIndex]}
                              </span>
                              <span className="min-w-0 flex-1">
                                <MathText inline>{option}</MathText>
                              </span>
                              {isCorrect && <span className="shrink-0 text-[10px] font-medium text-jade uppercase">correct</span>}
                            </li>
                          );
                        })}
                      </ol>
                      <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2 text-[12px] leading-relaxed text-ink-soft">
                        <span className="mr-1.5 text-[10px] font-medium tracking-[0.1em] text-ink-faint uppercase">Why</span>
                        <MathText>{question.explanation}</MathText>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11.5px]">
                  <Link href={`/syllabus/${subjectCode.toLowerCase()}`} className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                    {label} syllabus
                  </Link>
                  <Link href={`/app/practice?subject=${subjectCode}`} className="text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                    Drill this subject
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <Eyebrow>How to read your score</Eyebrow>
            <h2 className="display-md mt-3">A sample is a style check, not a diagnosis.</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              Ten items cannot rank your topics. The signal you want comes from a full paper (48
              questions for fundamental subjects, 80 for Professional Chinese), spread across every
              syllabus topic and scored on the same 0–100 scale.
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
