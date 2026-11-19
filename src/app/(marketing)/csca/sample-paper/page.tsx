import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Info, Lock } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { MathText } from "@/components/math-text";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { mathQuestions } from "../../../../../prisma/seed-data/questions/math";
import { PAPER_STATS } from "@/lib/paper-stats";
import { TEST_FORMATS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "A full CSCA sample paper — 48 maths questions",
  description:
    "The whole paper, in the browser, no account: 48 single-answer mathematics questions at the official length, with the answer key and a worked explanation behind every one.",
  path: "/csca/sample-paper",
  keywords: [
    "CSCA sample paper",
    "CSCA maths sample questions",
    "free CSCA paper",
    "CSCA practice paper PDF",
  ],
});

/**
 * A complete paper, static and open.
 *
 * The mock library needs an account, which means a search engine — or a
 * candidate deciding whether to sign up — cannot see what we actually ship.
 * This page is one whole paper in the open: 48 questions from the maths bank,
 * answers collapsed behind <details> so the page is still usable for practice
 * without a script.
 */
export default function SamplePaperPage() {
  const paper = mathQuestions.slice(0, 48);
  const byTopic = paper.reduce<Record<string, number>>((acc, q) => {
    acc[q.topic] = (acc[q.topic] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "CSCA guide", path: "/csca" },
          { name: "Sample paper", path: "/csca/sample-paper" },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Sample paper · mathematics · 48 questions</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            One whole CSCA paper, in the open.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            No account, no email, no download. Forty-eight single-answer questions at the official
            length, with the key and a worked explanation under each one — the same format you sit in
            the test client, minus the clock.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">48 questions</Pill>
            <Pill>60 minutes</Pill>
            <Pill tone="jade">Answers included</Pill>
            <Pill>No negative marking</Pill>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/free-exam"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-vermillion px-5 text-[13px] font-medium text-paper"
            >
              Sit it on the clock <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/app/mocks"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-line bg-card px-5 text-[13px] font-medium text-ink"
            >
              All {PAPER_STATS.total} papers
            </Link>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-16">
        <article className="min-w-0">
          <div className="rounded-xl border border-gold/30 bg-gold-soft/40 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
            <p className="flex items-center gap-1.5 font-medium text-ink">
              <Info className="h-3.5 w-3.5 text-gold-deep" /> How to use this page honestly
            </p>
            <p className="mt-1">
              Reading a paper with the answers visible is not practice. Set a 60-minute timer, work
              down the page, then open the answers to mark it. The {TEST_FORMATS.length} delivery
              formats and the real clock are covered on{" "}
              <Link href="/test-day" className="text-indigo underline underline-offset-2">
                test day
              </Link>
              .
            </p>
          </div>

          <ol className="mt-6 space-y-3">
            {paper.map((question, index) => (
              <li key={`${question.topic}-${index}`} className="panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="flex min-w-0 flex-1 gap-2.5 text-[13.5px] leading-relaxed text-ink">
                    <span className="shrink-0 font-serif text-[15px] text-ink-faint tabular">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <MathText inline>{question.stem}</MathText>
                    </span>
                  </p>
                  <span className="shrink-0 rounded bg-paper-deep px-1.5 py-0.5 text-[9.5px] text-ink-faint">
                    {question.topic}
                  </span>
                </div>

                <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className="flex min-w-0 items-start gap-2 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] text-ink-soft"
                    >
                      <span className="w-3.5 shrink-0 text-[10px] font-semibold text-ink-faint">
                        {"ABCD"[optionIndex]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <MathText inline>{option}</MathText>
                      </span>
                    </li>
                  ))}
                </ul>

                <details className="group mt-2.5">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[11px] font-medium text-ink-soft transition hover:border-line-strong">
                    <Lock className="h-3 w-3" /> Show answer
                  </summary>
                  <div className="mt-2 rounded-lg border border-jade/30 bg-jade-soft/40 px-3 py-2">
                    <p className="text-[12px] font-medium text-ink">
                      Answer {["A", "B", "C", "D"][question.correct]}
                      {question.options[question.correct] ? (
                        <span className="ml-1.5 font-normal text-ink-soft">
                          — <MathText inline>{question.options[question.correct]}</MathText>
                        </span>
                      ) : null}
                    </p>
                    <div className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                      <MathText>{question.explanation}</MathText>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-line bg-card p-5">
            <p className="text-[13px] font-medium text-ink">That is the whole paper.</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              The library holds {PAPER_STATS.total} papers across five subjects, each one assembled to the same
              structure as this page — and each one scored, timed and explained in the test client.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/mocks"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
              >
                Browse the library <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/sample-questions"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-4 text-[12.5px] font-medium text-ink"
              >
                50 questions across all subjects
              </Link>
            </div>
          </div>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink-faint" /> If you sat this for real
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <li>48 questions · 60 minutes · 75 seconds each</li>
              <li>One answer per question, no negative marking</li>
              <li>Scored 0–100 — 36 correct is a 75</li>
            </ul>
          </div>
          <div className="panel p-5">
            <p className="text-[12px] font-medium text-ink">Topic mix in this paper</p>
            <ul className="mt-2 space-y-1 text-[11.5px] text-ink-soft">
              {Object.entries(byTopic)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([topic, count]) => (
                  <li key={topic} className="flex justify-between gap-2">
                    <span>{topic}</span>
                    <span className="tabular text-ink-faint">{count}</span>
                  </li>
                ))}
            </ul>
            <p className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
              Topic codes match the official syllabus mapping.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
