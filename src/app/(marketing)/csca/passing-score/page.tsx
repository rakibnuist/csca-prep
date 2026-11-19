import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info, ShieldCheck, Timer, TrendingUp } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { ScoreRuler } from "@/components/marketing/score-ruler";
import { ScoreConversion } from "@/components/marketing/score-conversion";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { FAQ_TOTAL } from "@/lib/faq";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA passing score — what a 0–100 mark means",
  description:
    "There is no CSCA pass mark: every subject is scored 0–100 and each university sets its own minimum. Here is the official scaling, how many correct answers each score needs, how scores are used in admission, and how retakes work.",
  path: "/csca/passing-score",
  keywords: [
    "CSCA passing score",
    "CSCA score",
    "CSCA score out of 100",
    "CSCA minimum score",
    "CSCA score validity",
    "how is the CSCA scored",
    "CSCA retake",
  ],
});

const FAQ = [
  {
    q: "What is the passing score for the CSCA?",
    a: "There isn't one. CSCA scores each subject from 0 to 100 but publishes no national pass mark. Each university sets its own minimum for its own programmes, so whether a score is enough depends on where you apply.",
  },
  {
    q: "How is the CSCA scored?",
    a: "Single-answer multiple choice, no negative marking. The raw number of correct answers is scaled to 100: correct ÷ total × 100, rounded. A 48-question paper is worth about 2.08 points per question; an 80-question Professional Chinese paper is worth 1.25 points per question.",
  },
  {
    q: "What score do universities want?",
    a: "It varies by institution and by programme competitiveness. Competitive programmes at the most selective universities generally look for high 70s and above, while many regional institutions accept much lower. Because requirements are published per programme — and sometimes not published at all — ask the admissions office in writing.",
  },
  {
    q: "How long is my score valid?",
    a: "Two years from the date the report is issued. You may sit the test again and submit your best valid score when applying, subject to each institution's policy.",
  },
  {
    q: "How quickly do results arrive?",
    a: "Within 10 working days of the test date. The electronic report appears in your CSCA account and can be downloaded from there.",
  },
  {
    q: "Can I retake the CSCA?",
    a: "Yes, with no limit on attempts. Each retake is a new registration at the full fee — there is no retake discount — and you can choose a later sitting in the same year.",
  },
  {
    q: "Do universities see a percentile?",
    a: "Yes — when verifying an official score report, universities can see the candidate's global percentile ranking. Our dashboard shows a modelled percentile and labels it as a modelled estimate: we have no access to live CSCA cohort data, so treat ours as a coaching indicator, never as an official percentile.",
  },
  {
    q: "Is a higher score better for scholarship applications?",
    a: "CSCA scores are used as academic reference information in Chinese Government Scholarship evaluation. They are not the sole criterion and do not guarantee an award; the scholarship review also weighs your academic record and the programme you apply for.",
  },
];

function ScoreRow({ correct, total }: { correct: number; total: number }) {
  return (
    <tr>
      <td className="px-4 py-2.5 font-medium text-ink tabular">
        {correct}/{total}
      </td>
      <td className="px-4 py-2.5 text-ink-soft tabular">{Math.round((correct / total) * 100)}</td>
      <td className="px-4 py-2.5 text-ink-faint tabular">
        {correct === total ? "perfect" : `−${total - correct} wrong/blank`}
      </td>
    </tr>
  );
}

export default function PassingScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Passing score", path: "/csca/passing-score" }])} />
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
          <Eyebrow>Scoring · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            There is no CSCA pass mark. Here is what the number does mean.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Every CSCA subject is scored 0–100 on a simple correct-answer scale, and each university
            sets its own minimum. That makes &ldquo;what score do I need?&rdquo; a question about your
            programme, not about the exam — but the arithmetic and the rules are fixed, and this page
            gives you both.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">No national pass mark</Pill>
            <Pill>0–100 per subject</Pill>
            <Pill tone="jade">Valid for 2 years</Pill>
            <Pill>Results in 10 working days</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="how-scoring-works">
            <h2>How the CSCA is scored</h2>
            <p>
              Each paper is single-answer multiple choice with four options and no negative marking.
              The raw number of correct answers is converted to the 0–100 scale:
            </p>
            <p className="not-prose my-4 rounded-xl border border-line bg-card px-4 py-3 font-mono text-[12.5px] text-ink">
              score = round(correct ÷ total questions × 100)
            </p>
            <p>
              That means every question is worth the same fraction of the paper: about{" "}
              <strong>2.08 points</strong> on a 48-question paper (Mathematics, Physics, Chemistry) and{" "}
              <strong>1.25 points</strong> on an 80-question Professional Chinese paper. A blank and a
              wrong answer score the same, so there is never a reason to leave an answer empty when
              time is short.
            </p>
          </section>

          <section id="conversion">
            <h2>Correct answers to score</h2>
            <p>
              The scale is linear and there is no negative marking, so one arithmetic rule explains
              every score on this page: correct answers, divided by questions, multiplied by 100.
            </p>
            <ScoreConversion correct={36} total={48} className="my-5" />
            <div className="not-prose my-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "48-question paper", total: 48, rows: [48, 42, 38, 34, 30, 24, 18] },
                { label: "80-question paper", total: 80, rows: [80, 70, 64, 56, 48, 40, 32] },
              ].map((table) => (
                <div key={table.label} className="min-w-0 overflow-x-auto rounded-xl border border-line">
                  <p className="border-b border-line bg-paper-deep/60 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                    {table.label}
                  </p>
                  <table className="w-full text-[12.5px]">
                    <thead>
                      <tr className="border-b border-line/70 text-left text-[10.5px] tracking-[0.08em] text-ink-faint uppercase">
                        <th className="px-4 py-2">Correct</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line bg-card">
                      {table.rows.map((correct) => (
                        <ScoreRow key={correct} correct={correct} total={table.total} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <p>
              Because the scale is linear, a missed question on the Chinese paper costs less than one
              on the maths paper — but you have 30 extra minutes for 32 more questions, so the real
              constraint is pace: <strong>75 seconds</strong> per question on a 48-question paper and{" "}
              <strong>67.5 seconds</strong> on the 80-question paper.
            </p>
          </section>

          <section id="what-universities-look-at">
            <h2>What universities do with the number</h2>
            <p>
              CSCA describes the score as academic reference information. In practice, an admissions
              committee sees the subject combination you sat, the language you sat each paper in, the
              score per subject, and your academic transcript. Three consequences follow:
            </p>
            <ul>
              <li>
                <strong>Sitting the right subjects matters more than a perfect score.</strong> A 90 in
                Mathematics does not compensate for a missing science elective your programme requires.
              </li>
              <li>
                <strong>Weakness in one subject is visible.</strong> There is no aggregate score to hide
                behind; every subject is reported separately.
              </li>
              <li>
                <strong>Requirements are set per programme.</strong> The same university can ask for
                different subjects and different minimums across its faculties — confirm in writing.
              </li>
            </ul>
          </section>

          <section id="bands">
            <h2>How to read your own score</h2>
            <figure className="not-prose my-5 rounded-2xl border border-line bg-card px-5 py-4">
              <ScoreRuler />
              <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
                The four coaching bands on the 0–100 scale. Nothing on this ruler is an official
                cut-off: CSCA publishes the scale, not a pass mark, and each university sets its own
                minimum.
              </figcaption>
            </figure>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-4 py-2.5">Band</th>
                    <th className="px-4 py-2.5">Coaching read</th>
                    <th className="px-4 py-2.5">What to do next</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {[
                    ["85–100", "Shortlist-competitive at the most selective universities", "Protect it: sit full papers weekly so timing never slips"],
                    ["70–84", "Comfortably competitive for most scholarship programmes", "Close the two weakest topics; the rest is marginal"],
                    ["50–69", "Acceptable at many institutions, weak at the top tier", "Rebuild foundations before a retake, not after"],
                    ["Below 50", "Foundational gaps, not exam technique", "Work the syllabus topic by topic, then re-sit in 6–8 weeks"],
                  ].map(([band, read, next]) => (
                    <tr key={band}>
                      <td className="px-4 py-3 font-medium text-ink tabular">{band}</td>
                      <td className="px-4 py-3 text-ink-soft">{read}</td>
                      <td className="px-4 py-3 text-ink-soft">{next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-ink-faint">
              These bands are our coaching heuristic from published admissions guidance. They are not
              official cut-offs, and no institution has endorsed them.
            </p>
          </section>

          <section id="validity">
            <h2>Validity, retakes and reporting</h2>
            <ul>
              <li>
                <strong>Results:</strong> released within 10 working days; the electronic report is
                published on your CSCA account.
              </li>
              <li>
                <strong>Validity:</strong> two years from issue.
              </li>
              <li>
                <strong>Retakes:</strong> unlimited. A retake is a new registration at the full fee, and
                you may submit your best valid score when applying.
              </li>
              <li>
                <strong>Reporting:</strong> you download the report and include it in your application;
                universities decide what it is worth.
              </li>
            </ul>
          </section>

          <section id="faq">
            <h2>Scoring questions, answered</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {FAQ.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[12.5px] font-medium text-ink">
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn exam introduction and candidate notices; CSCA Test Rules; CSC 2025
            syllabi. Scoring arithmetic follows the official 0–100 scale. {SITE.name} is independent
            and not affiliated with the China Scholarship Council.
          </p>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <Calculator className="h-4 w-4 text-ink-faint" />
            <p className="mt-2 text-[12.5px] font-medium text-ink">Estimate your score</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
              Enter how many questions you answered correctly and see the 0–100 result, plus what the
              same proportion means on the Chinese paper.
            </p>
            <Link
              href="/tools/score-calculator"
              className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
            >
              Open the calculator <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="panel p-5">
            <Timer className="h-4 w-4 text-ink-faint" />
            <p className="mt-2 text-[12.5px] font-medium text-ink">Pace to protect the score</p>
            <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <li>48 questions / 60 min = 75 s each</li>
              <li>80 questions / 90 min = 67.5 s each</li>
              <li>Leave 5 minutes to review flagged items</li>
            </ul>
          </div>

          <div className="panel p-5">
            <TrendingUp className="h-4 w-4 text-ink-faint" />
            <p className="mt-2 text-[12.5px] font-medium text-ink">Where marks leak</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
              Your dashboard ranks topics weakest-first after every paper, so the next session targets
              the gap instead of the whole syllabus.
            </p>
            <Link href="/app/dashboard" className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline">
              Open my dashboard <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <ShieldCheck className="h-3.5 w-3.5 text-jade" /> What we will not do
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              Publish invented cut-offs, invent a &ldquo;guaranteed&rdquo; score, or present a modelled
              percentile as official data.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-paper-deep/40 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <Info className="h-3.5 w-3.5 text-ink-faint" /> Related
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {[
                ["/csca/faq", `CSCA FAQ — ${FAQ_TOTAL} answers`],
                ["/requirements", "Which subjects your programme needs"],
                ["/exam-dates", "Sittings, registration and fees"],
                ["/test-day", "Test-day rules and equipment"],
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

      <section className="border-t border-line bg-ink">
        <div className="shell flex flex-col items-start justify-between gap-4 py-9 sm:flex-row sm:items-center">
          <div>
            <SectionHead title={<span className="text-paper">The only way to know your score is to sit one.</span>} />
            <p className="mt-1 text-[12.5px] text-paper/60">
              Full papers, official clock, topic breakdown the moment you finish.
            </p>
          </div>
          <Link
            href="/app/mocks"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-vermillion px-5 text-[12.5px] font-medium text-paper"
          >
            Start a paper <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
