import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, Clock3, FileText, Lock } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { isReviewPaper, PAPERS, paperTitle } from "@/lib/papers";

export function generateStaticParams() {
  return PAPERS.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = PAPERS.find((entry) => entry.slug === slug);
  if (!paper) return {};
  const isReview = isReviewPaper(paper);
  return pageMetadata({
    title: `${paperTitle(paper)} — questions and answer key`,
    description: isReview
      ? `${paperTitle(paper)}: ${paper.items.length} questions reconstructed from official ${paper.subject} material with worked explanations. Free preview, no account needed.`
      : `The ${paper.subject} official paper from ${paper.sitting}: ${paper.items.length} transcribed questions with the published answer key and worked explanations. Free preview, no account needed.`,
    path: `/question-papers/${paper.slug}`,
    keywords: [
      `${paper.subject} CSCA paper`,
      `CSCA ${paper.subject} ${paper.sitting}`,
      "CSCA past paper",
    ],
  });
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = PAPERS.find((entry) => entry.slug === slug);
  if (!paper) notFound();

  const isReview = isReviewPaper(paper);
  const minutes = paper.subject === "Professional Chinese" ? 90 : 60;
  const index = PAPERS.findIndex((entry) => entry.slug === slug);
  const prev = index > 0 ? PAPERS[index - 1] : null;
  const next = index < PAPERS.length - 1 ? PAPERS[index + 1] : undefined;

  const picks = [0, Math.floor(paper.items.length / 3), Math.floor((2 * paper.items.length) / 3)]
    .filter((value, position, list) => list.indexOf(value) === position)
    .slice(0, 3);
  const preview: SampleQuestion[] = picks.map((itemIndex, position) => {
    const item = paper.items[itemIndex];
    return {
      id: `${paper.slug}-preview-${position}`,
      subject: paper.subject,
      subjectLabel: `${paper.short} · ${paper.sitting}`,
      stem: item.stem,
      options: item.options,
      correct: item.correct,
      explanation: item.explanation,
    };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Question papers", path: "/question-papers" },
          { name: paperTitle(paper), path: `/question-papers/${paper.slug}` },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Link
            href="/question-papers"
            className="text-[12px] text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            ← All question papers
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Eyebrow>{paper.year} · {isReview ? "Review module" : "Official"}</Eyebrow>
            <Pill>
              <BadgeCheck className="h-3 w-3" /> {isReview ? "Reconstructed" : "Transcribed"}
            </Pill>
          </div>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">{paperTitle(paper)}</h1>
          <p className="mt-2 text-[13px] text-ink-faint">
            {paper.items.length} questions with the published answer key
            {paper.note ? ` · ${paper.note}` : ""}.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>
              <FileText className="h-3 w-3" /> {paper.items.length} questions
            </Pill>
            <Pill>
              <Clock3 className="h-3 w-3" /> {minutes} min
            </Pill>
            <Pill>0–100</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">Preview three questions</h2>
            <p className="mt-1.5 text-[12.5px] text-ink-soft">
              Marked instantly with the working shown, so you can judge the paper before sitting it.
            </p>
            <div className="mt-4 max-w-2xl">
              <SampleQuiz questions={preview} />
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                Sit the full paper
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                A free account lets you study all {paper.items.length} questions and worked explanations
                in full; Pro unlocks sitting official and review papers on a server-anchored timer.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/sign-up"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
                >
                  <Lock className="h-3.5 w-3.5" /> Start the full paper
                </Link>
                <Link
                  href={`/sample-questions/${paper.subjectSlug}`}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink"
                >
                  More {paper.short} samples
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep p-4">
              <p className="text-[12px] leading-relaxed text-ink-soft">
                Transcribed from the real sitting with the published key, attributed to the original
                source. Review sets are labelled as reconstructed.
              </p>
              <Link
                href="/question-papers"
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
              >
                Back to the archive <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {prev ? (
            <Link
              href={`/question-papers/${prev.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {paperTitle(prev)}
            </Link>
          ) : (
            <span />
          )}
          <Link href="/question-papers" className="text-[12px] text-ink-soft hover:text-ink">
            All papers
          </Link>
          {next ? (
            <Link
              href={`/question-papers/${next.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              {paperTitle(next)} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </>
  );
}
