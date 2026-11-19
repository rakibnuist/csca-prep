import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock3, Layers, ShieldCheck } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { mathQuestions } from "../../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem";

type SeedItem = {
  topic: string;
  stem: string;
  options: string[];
  correct: number;
  explanation: string;
};

const SPECS: Record<string, { code: string; label: string; items: SeedItem[] }> = {
  mathematics: { code: "MATH", label: "Mathematics", items: mathQuestions },
  physics: { code: "PHYS", label: "Physics", items: physicsQuestions },
  chemistry: { code: "CHEM", label: "Chemistry", items: chemistryQuestions },
  "chinese-humanities": {
    code: "CH_HUM",
    label: "Humanities Chinese",
    items: chineseHumanitiesQuestions,
  },
  "chinese-stem": { code: "CH_SCI", label: "STEM Chinese", items: chineseStemQuestions },
};

const PER_SUBJECT = 10;

/** Evenly spread sample, deliberately different from the /practice drill set. */
function samples(items: SeedItem[]): SeedItem[] {
  return Array.from({ length: PER_SUBJECT }, (_, position) =>
    Math.floor(((position + 0.5) * items.length) / PER_SUBJECT),
  ).map((index) => items[index]);
}

export function generateStaticParams() {
  return Object.keys(SPECS).map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const spec = SPECS[subject];
  if (!spec) return {};
  return pageMetadata({
    title: `CSCA ${spec.label} sample questions — 10 with answers`,
    description: `Ten CSCA ${spec.label} sample questions in the official format, with instant marking and worked explanations. Free, no account required.`,
    path: `/sample-questions/${subject}`,
    keywords: [
      `CSCA ${spec.label} sample questions`,
      `CSCA ${spec.label} questions`,
      `CSCA ${spec.label} example`,
    ],
  });
}

export default async function SampleSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const spec = SPECS[subject];
  if (!spec) notFound();

  const meta = SUBJECTS.find((entry) => entry.code === spec.code)!;
  const picked = samples(spec.items);
  const questions: SampleQuestion[] = picked.map((item, index) => ({
    id: `${spec.code}-sample-${index + 1}`,
    subject: spec.code,
    subjectLabel: spec.label,
    stem: item.stem,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
  }));

  const topicCounts = new Map<string, number>();
  for (const item of spec.items) topicCounts.set(item.topic, (topicCounts.get(item.topic) ?? 0) + 1);
  const topics = [...topicCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Sample questions", path: "/sample-questions" },
          { name: spec.label, path: `/sample-questions/${subject}` },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Sample questions · no account</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA {spec.label} sample questions, with the working shown.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Ten questions in the official format — {meta.questionCount} multiple-choice questions in{" "}
            {meta.durationMin} minutes, scored out of {meta.totalMarks}. Answer, check, and read the
            reasoning. Nothing is saved.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <Clock3 className="h-3 w-3" /> {meta.durationMin} min
            </Pill>
            <Pill>
              <Layers className="h-3 w-3" /> {meta.questionCount} questions
            </Pill>
            <Pill>
              <ShieldCheck className="h-3 w-3" /> Original, syllabus-aligned
            </Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <h2 className="font-display text-xl text-ink">Try ten questions</h2>
        <p className="mt-1.5 text-[13px] text-ink-soft">
          Pick an answer to see instant marking and the explanation.
        </p>
        <div className="mt-5 max-w-2xl">
          <SampleQuiz questions={questions} />
        </div>
      </section>

      <section className="shell pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">What this paper covers</h2>
            <p className="mt-1.5 text-[12px] text-ink-soft">
              {topics.length} topics in the syllabus for this paper; the samples above touch the
              whole tree.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {topics.map(([code, count]) => (
                <div
                  key={code}
                  className="flex items-center justify-between rounded-lg border border-line bg-card px-3 py-2 text-[12px]"
                >
                  <span className="font-mono text-[11px] text-ink-soft">{code}</span>
                  <span className="text-ink-faint">{count} q</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                Next step
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href={`/practice/${subject}`}
                  className="inline-flex items-center justify-between text-[12px] text-ink-soft hover:text-ink"
                >
                  Practise this subject free <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/mocks"
                  className="inline-flex items-center justify-between text-[12px] text-ink-soft hover:text-ink"
                >
                  Full-length mock papers <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-between text-[12px] text-ink-soft hover:text-ink"
                >
                  Read the syllabus <BookOpen className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-line bg-paper-deep p-4">
              <p className="text-[12px] leading-relaxed text-ink-soft">
                These are original questions written against the published syllabus — not reproduced
                past papers. Official transcribed papers live in the archive.
              </p>
              <Link
                href="/question-papers"
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
              >
                Official paper archive <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
