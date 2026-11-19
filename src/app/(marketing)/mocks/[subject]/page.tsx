import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Layers, ListChecks, Target } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { MathText } from "@/components/math-text";
import { SUBJECT_MAP, SUBJECTS, type SubjectCode } from "@/lib/exam";
import { CURRICULUM } from "@/lib/curriculum";
import { PAPER_STATS } from "@/lib/paper-stats";
import { mathQuestions } from "../../../../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../../../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../../../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../../../../prisma/seed-data/questions/chinese-humanities";
import { chineseHumanitiesExtraQuestions } from "../../../../../prisma/seed-data/questions/chinese-humanities-extra";
import { chineseStemQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem";
import { chineseStemExtraQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem-extra";

const SLUGS: Record<string, SubjectCode> = {
  mathematics: "MATH",
  physics: "PHYS",
  chemistry: "CHEM",
  "chinese-humanities": "CH_HUM",
  "chinese-stem": "CH_SCI",
};

const SAMPLES: Record<SubjectCode, { stem: string; options: string[]; correct: number; explanation: string }[]> = {
  MATH: mathQuestions.slice(0, 2),
  PHYS: physicsQuestions.slice(0, 2),
  CHEM: chemistryQuestions.slice(0, 2),
  CH_HUM: [...chineseHumanitiesQuestions, ...chineseHumanitiesExtraQuestions].slice(0, 2),
  CH_SCI: [...chineseStemQuestions, ...chineseStemExtraQuestions].slice(0, 2),
};

export function generateStaticParams() {
  return Object.keys(SLUGS).map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: slug } = await params;
  const code = SLUGS[slug];
  if (!code) return {};
  const spec = SUBJECT_MAP[code];
  return pageMetadata({
    title: `CSCA ${spec.shortEn} mock — ${spec.questionCount} in ${spec.durationMin} min`,
    description: `Free ${spec.nameEn} CSCA mock papers in the official format: ${spec.questionCount} single-answer questions in ${spec.durationMin} minutes, scored 0–100, with a worked explanation on every question and a topic breakdown after each paper.`,
    path: `/mocks/${slug}`,
    keywords: [
      `CSCA ${spec.nameEn} mock test`,
      `CSCA ${spec.nameEn} practice`,
      `CSCA ${spec.nameEn} questions`,
      `CSCA ${spec.nameZh}`,
    ],
  });
}

export default async function SubjectMockPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: slug } = await params;
  const code = SLUGS[slug];
  if (!code) notFound();

  const spec = SUBJECT_MAP[code];
  const curriculum = CURRICULUM.find((item) => item.code === code);
  const topics = curriculum?.topics ?? [];
  const samples = SAMPLES[code];
  const perQuestionSeconds = Math.round((spec.durationMin * 60) / spec.questionCount);

  const faqs = [
    {
      q: `How many questions are on the CSCA ${spec.nameEn} paper?`,
      a: `${spec.questionCount} single-answer multiple-choice questions in ${spec.durationMin} minutes, scored 0–100 with no negative marking. That is about ${perQuestionSeconds} seconds per question, including reading time.`,
    },
    {
      q: `Is the CSCA ${spec.nameEn} paper in English or Chinese?`,
      a:
        spec.language === "zh"
          ? "Chinese only. Both Professional Chinese papers are sat in Chinese, and the reading passages are drawn from the discipline you are applying for."
          : "Both. Mathematics, Physics and Chemistry are offered in Chinese and English, and you choose the language when you register. The score report records the language you sat.",
    },
    {
      q: `What does the ${spec.nameEn} paper cover?`,
      a: topics.length > 0
        ? topics.map((topic) => `${topic.titleEn} (${topic.titleZh})`).join(", ") + " — the full mapping is on the syllabus page."
        : "See the syllabus page for the official topic list.",
    },
    {
      q: `Can I sit a full ${spec.nameEn} paper for free?`,
      a: `Yes. A free account gives you two attempts on each of the 5 free ${spec.nameEn} mock papers (the original paper and practice sets 01–04, 10 timed sittings in total), plus free Study Q&A on transcribed official papers — and the 10-question sample needs no account at all. ${spec.nameEn} papers run at the official length — ${spec.questionCount} questions, ${spec.durationMin} minutes.`,
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Mock tests", path: "/mocks" }, { name: spec.nameEn, path: `/mocks/${slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Link href="/mocks" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All papers
          </Link>
          <Eyebrow>{spec.nameZh} · official format</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA {spec.nameEn} mock test: {spec.questionCount} questions, {spec.durationMin} minutes.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            {spec.blurbEn} Every paper runs at the real length, scores 0–100 with no negative marking,
            and ends with a topic breakdown that ranks what leaked.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">{spec.questionCount} questions</Pill>
            <Pill>{spec.durationMin} minutes</Pill>
            <Pill tone="jade">{spec.language === "zh" ? "Chinese only" : "English / 中文"}</Pill>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/app/mocks"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-vermillion px-5 text-[13px] font-medium text-paper"
            >
              Start a {spec.shortEn} paper <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/free-exam"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-line bg-card px-5 text-[13px] font-medium text-ink"
            >
              Free 10-question sample
            </Link>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="format">
            <h2>The format, exactly</h2>
            <div className="not-prose my-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: ListChecks, label: "Questions", value: `${spec.questionCount} single answer` },
                { icon: Clock3, label: "Time", value: `${spec.durationMin} min · ${perQuestionSeconds}s each` },
                { icon: Target, label: "Scoring", value: "0–100, no negative marking" },
              ].map((item) => (
                <div key={item.label} className="panel min-w-0 p-4">
                  <item.icon className="h-4 w-4 text-ink-faint" />
                  <p className="mt-2 text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">{item.label}</p>
                  <p className="mt-0.5 text-[13px] font-medium text-ink">{item.value}</p>
                </div>
              ))}
            </div>
            <p>
              {spec.nameEn} is one of {SUBJECTS.length} CSCA papers, and the score is reported on its own
              — universities see this subject separately from the others. The whole library holds{" "}
              {PAPER_STATS.total} papers; {spec.nameEn} papers are assembled from the bank in the official
              structure.
            </p>
          </section>

          <section id="topics">
            <h2>What the paper tests</h2>
            {topics.length > 0 ? (
              <div className="not-prose my-5 space-y-2">
                {topics.map((topic) => (
                  <div key={topic.code} className="rounded-xl border border-line bg-card px-4 py-3">
                    <p className="flex items-baseline justify-between gap-2 text-[12.5px] font-medium text-ink">
                      <span>
                        {topic.titleEn}
                        <span className="ml-1.5 font-chinese text-[11px] font-normal text-ink-faint">{topic.titleZh}</span>
                      </span>
                      <span className="shrink-0 text-[10.5px] font-normal text-ink-faint">{topic.code}</span>
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{topic.summaryEn}</p>
                    <Link
                      href={`/app/practice/topic/${topic.code}`}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-vermillion hover:underline"
                    >
                      Drill this topic <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                See the <Link href={`/syllabus/${code.toLowerCase()}`}>official syllabus mapping</Link> for the
                topic list and weights.
              </p>
            )}
          </section>

          <section id="samples">
            <h2>Two questions from the bank</h2>
            <p>
              Same item style as the paper: one answer among four, no negative marking. The rest of the
              library is on the same pattern.
            </p>
            <div className="not-prose mt-4 space-y-3">
              {samples.map((sample, index) => (
                <details key={index} className="group rounded-xl border border-line bg-card px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[13px] font-medium text-ink">
                    <span className="flex min-w-0 flex-1 gap-2">
                      <span className="shrink-0 text-ink-faint tabular">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1">
                        <MathText inline>{sample.stem}</MathText>
                      </span>
                    </span>
                    <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <ol className="mt-3 space-y-1.5">
                    {sample.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === sample.correct;
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
                    <MathText>{sample.explanation}</MathText>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="faq">
            <h2>{spec.nameEn} questions</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {faqs.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                    {item.q}
                    <span className="text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Layers className="h-3.5 w-3.5 text-ink-faint" /> Other papers
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {Object.entries(SLUGS)
                .filter(([, value]) => value !== code)
                .map(([otherSlug, otherCode]) => (
                  <li key={otherSlug}>
                    <Link href={`/mocks/${otherSlug}`} className="text-ink-soft hover:text-vermillion">
                      CSCA {SUBJECT_MAP[otherCode].nameEn} mock test
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="panel p-5">
            <p className="text-[12px] font-medium text-ink">Related</p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {[
                [`/syllabus/${code.toLowerCase()}`, `${spec.nameEn} syllabus`],
                ["/csca/programmes", "CSCA by programme"],
                ["/csca/passing-score", "Scoring and bands"],
                ["/test-day", "Test-day rules"],
                ["/question-papers", "Official past papers"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-ink-soft hover:text-vermillion">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
