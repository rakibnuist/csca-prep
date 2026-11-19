import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Flag, Lightbulb, ListChecks, MoonStar, NotebookPen, Target, Timer } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CSCA tips — strategy for a better score",
  description:
    "Practical CSCA exam strategy: the 75-second time budget, flag-and-skip, why you should never leave a blank, per-subject techniques, the error-log method and the last-24-hours routine.",
  path: "/tips",
  keywords: ["CSCA tips", "CSCA exam strategy", "CSCA tricks", "CSCA time management", "CSCA guessing strategy"],
  type: "article",
  publishedTime: "2026-10-27",
  modifiedTime: "2026-10-27",
});

const SUBJECT_TIPS = [
  {
    subject: "Mathematics",
    accent: "red" as const,
    tips: [
      "Read what the question asks, not what you expect it to ask — ‘maximum’, ‘minimum’ and ‘sum of roots’ are different problems.",
      "When stuck, plug the four options back into the statement. The right one survives.",
      "Keep units and signs consistent; a dropped minus is the single most common error.",
      "Sketch coordinates and functions — a picture exposes roots and extrema faster than algebra.",
    ],
  },
  {
    subject: "Physics",
    accent: "jade" as const,
    tips: [
      "Draw a labelled diagram and write down what is given before choosing a formula.",
      "Check order of magnitude: if your answer is 4,000 m/s for a walking problem, re-read the units.",
      "Memorise the constants the paper expects (g = 10, c, e, h) — the exam assumes them.",
      "Energy methods often beat force-by-force for multi-step mechanics problems.",
    ],
  },
  {
    subject: "Chemistry",
    accent: "gold" as const,
    tips: [
      "Balance the equation before any calculation — mole ratios come from coefficients, not formulas.",
      "Convert everything to moles first, then apply the ratio. It fixes most stoichiometry.",
      "Watch the redox flags: oxidation state changes, electron transfer, oxidising vs reducing agent.",
      "For pH, decide acid or base first, then pOH = 14 − pH only when you are in a base.",
    ],
  },
  {
    subject: "Professional Chinese",
    accent: "ink" as const,
    tips: [
      "Read the whole sentence before choosing — the blank is constrained by what comes after it.",
      "Eliminate by collocation: two options are usually right words in the wrong context.",
      "In reading, skim the question first, then scan the passage for the answer, not the other way round.",
      "Time yourself at ~67 seconds per question; reading speed is the real test.",
    ],
  },
];

const STAGES = [
  { icon: Timer, title: "Budget your minutes", body: "75 seconds per question on a 48-in-60 paper, ~67 seconds on the 80-in-90 Chinese paper. Leave the last five minutes to check flagged items." },
  { icon: Flag, title: "Flag, don't fight", body: "If a question is taking over two minutes, mark your best guess, flag it and move on. The next question is worth the same mark and costs less time." },
  { icon: Target, title: "Never leave a blank", body: "There is no negative marking, so a guess is never worse than a blank. When you guess, eliminate first and commit — don't revisit randomly." },
  { icon: NotebookPen, title: "Run the error log", body: "After every paper, write one line per miss: topic, cause, and the rule you forgot. Re-reading this is more valuable than any new material in the final week." },
  { icon: MoonStar, title: "Rehearse exam day", body: "Sit at least one paper at the real time of day, in one sitting, without notes. The clock should feel familiar before it matters." },
  { icon: ListChecks, title: "Taper the last three days", body: "No new topics. Re-read the error log, fix sleep to exam-day hours, and check your ID and connection the day before." },
];

const FAQ = [
  {
    q: "Is there negative marking on the CSCA?",
    a: "No. A wrong answer scores the same as a blank, so never leave a question unanswered.",
  },
  {
    q: "How long should I spend per question?",
    a: "75 seconds on a 48-in-60 paper (Mathematics, Physics, Chemistry) and about 67 seconds on the 80-in-90 Professional Chinese paper. Keep the last five minutes for flagged items.",
  },
  {
    q: "Should I guess when I don't know?",
    a: "Yes. Eliminate the options you can rule out, commit to one, and move on. Randomly revisiting later usually costs more time than the guess saves.",
  },
  {
    q: "What if I run out of time?",
    a: "In the last two minutes, fill every remaining blank with your best elimination. A guess is never worse than a blank.",
  },
  {
    q: "Should I study the day before?",
    a: "No. The last day is for logistics — confirm the time in your timezone, test the proctoring setup, lay out your ID and sleep at exam-day hours.",
  },
];

export default function TipsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Tips & tricks", path: "/tips" }])} />
      <JsonLd
        data={articleLd({
          title: "CSCA tips & tricks — strategy for a better score in the same time",
          description:
            "Practical CSCA exam strategy: time budget, flag-and-skip, per-subject techniques, the error-log method and the last-24-hours routine.",
          path: "/tips",
          published: "2026-10-27",
          modified: "2026-10-27",
        })}
      />
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
          <Eyebrow>Exam strategy</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Tips &amp; tricks that move your score, not just your confidence.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            The CSCA rewards calm, practised time management more than raw knowledge. These are the
            habits that turn a 60 into a 75 with the same syllabus in your head.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">No negative marking</Pill>
            <Pill>75s per question</Pill>
            <Pill tone="jade">Flag & skip</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <SectionHead
          eyebrow="The six habits"
          title="Do these in every paper, in this order."
          body="They are simple on purpose — a strategy only works under time pressure if you can remember it."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage) => (
            <div key={stage.title} className="panel p-5">
              <stage.icon className="h-5 w-5 text-vermillion" strokeWidth={1.6} />
              <h3 className="mt-3 font-display text-xl text-ink">{stage.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{stage.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card/60 py-14">
        <div className="shell">
          <SectionHead
            eyebrow="By subject"
            title="The technique that pays off in each paper."
            body="Four papers, four different traps. Know the one your paper is built around."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SUBJECT_TIPS.map((group) => (
              <div key={group.subject} className="panel p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl text-ink">{group.subject}</h3>
                  <Pill tone={group.accent}>{group.accent === "ink" ? "90 min" : "60 min"}</Pill>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {group.tips.map((tip) => (
                    <li key={tip} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink-soft">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vermillion/70" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <Eyebrow>The traps</Eyebrow>
            <h2 className="display-md mt-3">The mistakes that repeat every sitting.</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              If you only remember one thing from this page, make it this list. These are the errors
              examiners design distractors around.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[11.5px]">
              <Link href="/app/mocks" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12px] font-medium text-paper">
                Practise now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/app/plan" className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-[12px] font-medium text-ink">
                Build a plan
              </Link>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              ["Sign errors", "A dropped minus changes everything. Circle negatives as you copy them."],
              ["Factor of 2", "½at², ½mv², 2OH⁻ — the ½ and 2 are the first things to forget."],
              ["Unit slip", "cm vs m, g vs kg. Convert before you calculate, not after."],
              ["Misreading", "‘not’, ‘except’, ‘least likely’ reverse the whole question."],
              ["Wrong ratio", "Mole ratios come from balanced coefficients, not the formula's subscripts."],
              ["Assumed default", "‘Accelerates uniformly’ and ‘at rest’ are data, not decoration."],
            ].map(([title, note]) => (
              <li key={title} className="rounded-xl border border-line bg-card p-4">
                <p className="text-[12.5px] font-medium text-ink">{title}</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-14">
          <SectionHead
            eyebrow="The clock"
            title="How the minutes should divide."
            body="Two paper lengths, two budgets. The arithmetic is simple; remembering it under pressure is the work."
          />
          <div className="mt-6 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                  <th className="px-3 py-2.5">Paper</th>
                  <th className="px-3 py-2.5">Questions</th>
                  <th className="px-3 py-2.5">Minutes</th>
                  <th className="px-3 py-2.5">Per question</th>
                  <th className="px-3 py-2.5">Keep for review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-card">
                {[
                  ["Mathematics / Physics / Chemistry", "48", "60", "75 s", "5 min"],
                  ["Professional Chinese", "80", "90", "~67 s", "5 min"],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cell}
                        className={
                          cellIndex === 0
                            ? "px-3 py-3 font-medium text-ink"
                            : "px-3 py-3 text-ink-soft"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-w-0">
              <Eyebrow>Guessing</Eyebrow>
              <h2 className="display-md mt-3">When you don&apos;t know, eliminate before you commit.</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                There is no negative marking, so a blank is the only losing move — but a blind guess is
                still worse than a good elimination. Four filters, then commit.
              </p>
            </div>
            <ol className="space-y-2">
              {[
                "Eliminate on units — an answer with the wrong unit is wrong, whatever the arithmetic.",
                "Eliminate on magnitude — a walking speed of 4,000 m/s is a trap, not a result.",
                "Eliminate on sign — if the stem implies a positive quantity, drop the negative options.",
                "If two remain, prefer the one that matches the stem's form (whole vs decimal, range vs point).",
                "Commit and move on. Do not return to a guess you have no new information about.",
              ].map((step, stepIndex) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-lg border border-line bg-card px-3 py-2.5 text-[12.5px] leading-relaxed text-ink-soft"
                >
                  <span className="font-mono text-[11px] text-ink-faint">{stepIndex + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-14">
          <h2 className="font-display text-2xl text-ink">Strategy FAQ</h2>
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

      <section className="border-t border-line bg-ink py-14 text-paper">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="min-w-0">
            <Eyebrow className="text-paper/70">The last 24 hours</Eyebrow>
            <h2 className="display-md mt-3 text-paper">Stop studying. Start protecting.</h2>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-paper/65">
              The day before the CSCA is about logistics, not learning: confirm your start time in
              your timezone, test the proctoring setup, lay out your ID, and sleep at the hour that
              matches exam-day wake-up. Nothing you read now outweighs arriving rested.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[12px] text-paper/50">
              <Clock3 className="h-4 w-4" /> Beijing time, converted to yours — double-check it.
            </div>
          </div>
          <div className="min-w-0 rounded-xl bg-paper p-5">
            <Lightbulb className="h-4 w-4 text-gold" />
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">One line to remember:</span> a full paper taken
              calmly is worth ten topics crammed in a panic. The strategy above is what “calm” looks
              like on paper.
            </p>
            <Link
              href="/app/mocks"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-vermillion text-[12.5px] font-medium text-paper"
            >
              Sit a full paper
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
