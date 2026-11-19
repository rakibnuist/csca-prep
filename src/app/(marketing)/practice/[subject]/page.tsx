import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock3, Layers } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { TIER_CLASS, TIER_SHORT, hasPastPaperSpread, topicCount, topicTier } from "@/lib/topic-frequency";
import { mathQuestions } from "../../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem";

/** Public, no-account practice. One page per subject, 10 free questions with
 *  instant marking and worked explanations — the trial that the app then
 *  deepens with topic drills, spaced review and full mocks. */

type SeedItem = {
  topic: string;
  stem: string;
  options: string[];
  correct: number;
  explanation: string;
};

const SPECS: Record<string, { code: string; items: SeedItem[]; label: string }> = {
  mathematics: { code: "MATH", items: mathQuestions, label: "Mathematics" },
  physics: { code: "PHYS", items: physicsQuestions, label: "Physics" },
  chemistry: { code: "CHEM", items: chemistryQuestions, label: "Chemistry" },
  "chinese-humanities": {
    code: "CH_HUM",
    items: chineseHumanitiesQuestions,
    label: "Humanities Chinese",
  },
  "chinese-stem": { code: "CH_SCI", items: chineseStemQuestions, label: "STEM Chinese" },
};

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
    title: `CSCA ${spec.label} practice — free questions with answers`,
    description: `Practise CSCA ${spec.label} online, free and without an account. Ten exam-style questions with instant marking and worked explanations, then sit a full paper in the app.`,
    path: `/practice/${subject}`,
    keywords: [`CSCA ${spec.label} practice`, `CSCA ${spec.label} questions`, "CSCA practice"],
  });
}

export default async function PracticeSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const spec = SPECS[subject];
  if (!spec) notFound();

  const meta = SUBJECTS.find((item) => item.code === spec.code)!;
  const questions: SampleQuestion[] = spec.items.slice(0, 10).map((item, index) => ({
    id: `${spec.code}-free-${index + 1}`,
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
  const showFrequency = hasPastPaperSpread(spec.code);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Practice", path: "/practice" }, { name: spec.label, path: `/practice/${subject}` }])} />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Free practice · no account</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA {spec.label}: practise the real format, free.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            {meta.questionCount} multiple-choice questions in {meta.durationMin} minutes, scored out
            of {meta.totalMarks}. Ten free questions below show the style and the reasoning; the app
            drills every topic and files your mistakes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <Clock3 className="h-3 w-3" /> {meta.durationMin} min
            </Pill>
            <Pill>
              <Layers className="h-3 w-3" /> {meta.questionCount} questions
            </Pill>
            <Pill>{topics.length} topics</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <h2 className="font-display text-xl text-ink">Try ten questions</h2>
        <p className="mt-1.5 text-[13px] text-ink-soft">
          Pick an answer to see instant marking and the working. Nothing is saved.
        </p>
        <div className="mt-5 max-w-2xl">
          <SampleQuiz questions={questions} />
        </div>
      </section>

      <section className="shell pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">Topics on this paper</h2>
            <p className="mt-1.5 text-[12px] text-ink-soft">
              {showFrequency
                ? "Tagged by how often they appear in our transcribed past papers — drill the high ones first."
                : "Question distribution in our practice bank — see the syllabus for full item-type weights."}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {topics.map(([code, bankCount]) => {
                const tier = topicTier(spec.code, code);
                return (
                  <div
                    key={code}
                    className="flex items-center justify-between gap-2 rounded-lg border border-line bg-card px-3 py-2 text-[12px]"
                  >
                    <span className="font-mono text-[11px] text-ink-soft">{code}</span>
                    {showFrequency ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full border px-1.5 py-0.5 text-[9.5px] font-medium ${TIER_CLASS[tier]}`}
                        >
                          {TIER_SHORT[tier]}
                        </span>
                        <span className="text-ink-faint">{topicCount(spec.code, code)} past Q</span>
                      </div>
                    ) : (
                      <span className="text-ink-faint">{bankCount} bank Q</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[12px] text-ink-faint">
              Full topic trees are on the{" "}
              <Link href="/syllabus" className="underline underline-offset-2 hover:text-ink">
                CSCA syllabus
              </Link>{" "}
              page.
            </p>
          </div>

          <div className="min-w-0 rounded-xl border border-line bg-card p-4">
            <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              Next step
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              Ten questions sample the style. Drilling every topic, spaced review and a full timed
              paper is where the score moves.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/sign-up"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
              >
                Start full practice <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink"
              >
                <BookOpen className="h-3.5 w-3.5" /> Read the syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
