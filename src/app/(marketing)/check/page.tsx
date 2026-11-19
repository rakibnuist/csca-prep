import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, ListChecks, ShieldCheck, Target } from "lucide-react";
import { DiagnosticQuiz, type DiagnosticQuestion } from "@/components/marketing/diagnostic-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { mathQuestions } from "../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../prisma/seed-data/questions/chemistry";

export const metadata: Metadata = pageMetadata({
  title: "Free CSCA check — find your weak spots in 12 questions",
  description:
    "A free, no-account 12-question CSCA check. Answer Mathematics, Physics and Chemistry questions, see your indicative score band and the exact topics costing you marks.",
  path: "/check",
  keywords: [
    "CSCA diagnostic",
    "CSCA weak spots",
    "free CSCA check",
    "CSCA score predictor",
    "CSCA practice test",
  ],
});

const FAQ = [
  {
    q: "How accurate is the score band?",
    a: "It is a spot check, not a prediction. Twelve questions across three subjects can show whether you are broadly ready and which topics hurt, but a full 48-question paper under time is the only honest measure.",
  },
  {
    q: "Do I need an account?",
    a: "No. The twelve questions run in the browser and nothing is stored. An account is only needed for the full diagnostic, topic drills and timed mocks.",
  },
  {
    q: "What happens after the check?",
    a: "You get your score, an indicative band and the topics you missed. Each links to the syllabus and free practice so you can fix the gap immediately.",
  },
];

function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const step = items.length / count;
  return Array.from({ length: count }, (_, index) => items[Math.floor(index * step)]);
}

const LABELS: Record<string, string> = {
  MATH: "Mathematics",
  PHYS: "Physics",
  CHEM: "Chemistry",
};

function buildQuestions(): DiagnosticQuestion[] {
  const banks: { code: string; items: typeof mathQuestions }[] = [
    { code: "MATH", items: mathQuestions },
    { code: "PHYS", items: physicsQuestions },
    { code: "CHEM", items: chemistryQuestions },
  ];
  return banks.flatMap(({ code, items }) =>
    spread(items, 4).map((item, index) => ({
      id: `${code}-check-${index + 1}`,
      subjectCode: code,
      subjectLabel: LABELS[code],
      topicCode: item.topic,
      stem: item.stem,
      options: item.options,
      correct: item.correct,
    })),
  );
}

export default function CheckPage() {
  const questions = buildQuestions();

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Free check", path: "/check" }])} />
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
          <Eyebrow>Free check · no account</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Find your CSCA weak spots in twelve questions.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Four Mathematics, four Physics, four Chemistry. Answer them and get a score, an
            indicative band, and the exact topics costing you marks — in about four minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <ListChecks className="h-3 w-3" /> 12 questions
            </Pill>
            <Pill>
              <Target className="h-3 w-3" /> Weak-spot report
            </Pill>
            <Pill>
              <ShieldCheck className="h-3 w-3" /> Nothing stored
            </Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <DiagnosticQuiz questions={questions} />
          </div>

          <div className="min-w-0 space-y-5">
            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                What you get
              </p>
              <ul className="mt-2 space-y-2 text-[12.5px] leading-relaxed text-ink-soft">
                <li className="flex items-start gap-2">
                  <Brain className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" /> A raw score out of 12
                  and an indicative CSCA band.
                </li>
                <li className="flex items-start gap-2">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" /> The topics you
                  missed, by subject and code.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" /> A direct route
                  to drill each one.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep p-4">
              <p className="text-[13px] leading-relaxed text-ink-soft">
                Want the real thing?{" "}
                <Link href="/practice" className="underline underline-offset-2 hover:text-ink">
                  Free subject practice
                </Link>{" "}
                has ten questions per paper, and{" "}
                <Link href="/free-exam" className="underline underline-offset-2 hover:text-ink">
                  the full mock sample
                </Link>{" "}
                covers all five subjects.
              </p>
            </div>
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
        </div>
      </section>
    </>
  );
}
