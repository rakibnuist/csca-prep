import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3, FileText, Lock } from "lucide-react";
import { SampleQuiz, type SampleQuestion } from "@/components/marketing/sample-quiz";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";
import { officialMathQuestions } from "../../../../prisma/seed-data/questions/official-math";
import { PAPER_GROUPS, PAPERS, paperTitle } from "@/lib/papers";

export const metadata: Metadata = pageMetadata({
  title: "CSCA past papers 2026 — free official papers + keys",
  description:
    "The CSCA question paper archive: official past papers for Mathematics, Physics, Chemistry and Professional Chinese with answer keys, worked explanations and a free preview. No account needed to browse.",
  path: "/question-papers",
  keywords: [
    "CSCA question paper",
    "CSCA question papers",
    "CSCA past papers",
    "CSCA previous papers",
    "CSCA exam papers",
    "CSCA paper",
    "CSCA mock test",
    "CSCA exam",
  ],
});


function previewQuestions(): SampleQuestion[] {
  return [0, 4, 8].map((index, position) => {
    const item = officialMathQuestions[index];
    return {
      id: `official-math-${position}`,
      subject: "MATH",
      subjectLabel: "Mathematics · March 2026",
      stem: item.stem,
      options: item.options,
      correct: item.correct,
      explanation: item.explanation,
    };
  });
}

const FAQ = [
  {
    q: "Where can I download CSCA question papers?",
    a: "Official syllabus and sample materials are published on the CSCA portal at csca.cn. This page indexes the official past papers we have transcribed with answer keys and explanations, so you can study them in one place.",
  },
  {
    q: "Are these the real CSCA past papers?",
    a: "The papers marked 'Official' are transcribed from the real sittings with their published answer key, kept free and attributed to the original source. Review sets are clearly labelled as reconstructed.",
  },
  {
    q: "How do I access the full question papers?",
    a: "A free account unlocks full Study Q&A and worked solutions for every paper (plus 25 free timed mock tests); Pro unlocks sitting official and review papers on the clock.",
  },
];

export default function QuestionPapersPage() {
  const preview = previewQuestions();

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Question papers", path: "/question-papers" }])} />
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
          <Eyebrow>Official archive · free to browse</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA question papers, with the answers and the working.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Every official CSCA past paper we have transcribed, indexed by subject and sitting. Study
            the real style, read the published answer key, and try a free preview below.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Official past papers</Pill>
            <Pill tone="jade">Answer keys included</Pill>
            <Pill>2025–2026 sittings</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-10">
          {PAPER_GROUPS.map((group) => {
            const papers = PAPERS.filter((paper) => paper.subject === group);
            if (papers.length === 0) return null;
            return (
              <div key={group}>
                <h2 className="font-display text-2xl text-ink">{group}</h2>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-[12.5px]">
                    <thead>
                      <tr className="bg-paper-deep/70 text-left text-[10px] tracking-[0.1em] text-ink-faint uppercase">
                        <th className="px-4 py-2.5">Sitting</th>
                        <th className="px-4 py-2.5">Questions</th>
                        <th className="hidden px-4 py-2.5 sm:table-cell">Time</th>
                        <th className="px-4 py-2.5">Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line bg-card">
                      {papers.map((paper) => (
                        <tr key={paper.slug}>
                          <td className="px-4 py-3">
                            <span className="flex flex-wrap items-center gap-2 text-ink">
                              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-vermillion" />
                              <Link
                                href={`/question-papers/${paper.slug}`}
                                className="transition hover:text-vermillion"
                              >
                                {paperTitle(paper)}
                              </Link>
                            </span>
                            {paper.note && (
                              <span className="mt-1 block text-[10.5px] text-ink-faint">{paper.note}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-ink-soft tabular">{paper.items.length}</td>
                          <td className="hidden px-4 py-3 text-ink-soft tabular sm:table-cell">
                            {paper.subject === "Professional Chinese" ? "90 min" : "60 min"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Link
                                href={`/question-papers/${paper.slug}`}
                                className="inline-flex h-8 items-center rounded-md border border-line-strong bg-paper px-3 text-[11.5px] font-medium text-ink"
                              >
                                Preview
                              </Link>
                              <Link
                                href="/sign-up"
                                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-vermillion px-3 text-[11.5px] font-medium text-paper"
                              >
                                <Lock className="h-3 w-3" /> Full paper
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <p className="rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-[11.5px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">Note:</span> question counts and notes reflect
            what has been transcribed so far. Registration, official downloads and score reports
            happen only at{" "}
            <a href={OFFICIAL.site} target="_blank" rel="noreferrer noopener" className="font-medium text-vermillion hover:underline">
              csca.cn
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_0.85fr]">
          <div className="min-w-0">
            <Eyebrow>Free preview · March 2026 Mathematics</Eyebrow>
            <h2 className="display-md mt-3">Three real questions from an official paper.</h2>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-ink-soft">
              Answer them, read the key, then decide whether the full Q&amp;A archive is worth a free
              account.
            </p>
            <div className="mt-6">
              <SampleQuiz questions={preview} />
            </div>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel card-elevate p-5">
              <p className="eyebrow">What you get with a free account</p>
              <ul className="mt-3 space-y-2 text-[12px] text-ink-soft">
                <li className="flex gap-2">
                  <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion" />
                  Full Q&amp;A for every official paper
                </li>
                <li className="flex gap-2">
                  <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion" />
                  Timed mock version of each paper
                </li>
                <li className="flex gap-2">
                  <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion" />
                  Subject &amp; year filters, step-by-step explanations
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-vermillion text-[12px] font-medium text-paper"
              >
                Unlock the archive <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/free-exam"
                className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line text-[12px] font-medium text-ink"
              >
                Take the free mock test
              </Link>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep/50 p-4">
              <p className="text-[11px] font-medium text-ink">Official materials</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">
                The organisers publish the syllabus and sample materials on their own portal. Use
                both sources: official papers for style, our archive for answers and explanations.
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
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <Eyebrow>Question paper FAQ</Eyebrow>
            <h2 className="display-md mt-3">How the archive works.</h2>
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
          </div>
        </div>
      </section>
    </>
  );
}
