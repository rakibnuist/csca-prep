import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Globe2,
  Languages,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { Faq } from "@/components/site/faq";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { OFFICIAL, SITE } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";

export const metadata: Metadata = {
  title: "CSCA exam guide 2027 — format, subjects, dates and fees",
  description:
    "What the China Scholastic Competency Assessment (CSCA) is, who must sit it, the subjects and timings, fees, results and exemptions — sourced from official CSC notices.",
  alternates: { canonical: "/csca" },
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who has to take the CSCA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From the 2026/2027 academic year, international applicants to undergraduate programmes at Chinese Government Scholarship universities must sit the CSCA. From 2028, all undergraduate applicants to Chinese universities will need it.",
      },
    },
    {
      "@type": "Question",
      name: "Which CSCA subjects do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mathematics is mandatory. Physics and Chemistry depend on the programme: science, engineering, agriculture and medicine usually require at least one. Professional Chinese applies to Chinese-taught programmes and is waived for English-taught degrees.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the CSCA and how is it scored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional Chinese is 80 multiple-choice questions in 90 minutes. Mathematics, Physics and Chemistry are 48 questions in 60 minutes each. Every subject is scored 0-100 and universities also see your global percentile.",
      },
    },
  ],
};

export default function CscaGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <section className="relative border-b border-line">
        <div className="shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow>Exam guide · verified October 2026</Eyebrow>
            <h1 className="display-lg mt-4 max-w-2xl text-balance">
              The CSCA, explained without the consultant fog.
            </h1>
            <p className="lead mt-5 max-w-xl">
              The China Scholastic Competency Assessment is a standardized entrance exam for
              international undergraduates applying to China. Here is what is fixed, what varies by
              university, and what nobody tells you until it is too late.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Pill tone="red">Mandatory from 2026/27 for CGS universities</Pill>
              <Pill tone="jade">Universal from 2028</Pill>
              <Pill>5 sittings a year</Pill>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-card p-5">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-3 divide-y divide-line text-[12.5px]">
              {[
                ["Organiser", "China Scholarship Council (CSC)"],
                ["Format", "Single-answer multiple choice"],
                ["Subjects", "Professional Chinese + Maths, Physics, Chemistry"],
                ["Scoring", "0–100 per subject"],
                ["Languages", "Chinese and English (fundamental subjects)"],
                ["Fee", "CNY 450 one subject · CNY 700 two or more"],
                ["Results", "7 working days (online/computer), 14 (paper)"],
                ["Registration", "csca.cn only"],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 py-2">
                  <dt className="text-ink-faint">{term}</dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-vermillion hover:underline"
            >
              Official CSCA portal <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <div className="shell grid gap-12 py-14 lg:grid-cols-[0.32fr_0.68fr] lg:py-20">
        {/* contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow">On this page</p>
            <nav className="mt-3 space-y-1.5 text-[12.5px]">
              {[
                ["#what", "What the CSCA is"],
                ["#who", "Who needs it"],
                ["#subjects", "Subjects and format"],
                ["#dates", "Dates and fees"],
                ["#scoring", "Scoring and percentiles"],
                ["#exemptions", "Exemptions"],
                ["#register", "How to register"],
                ["#prepare", "How to prepare"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block text-ink-soft transition hover:text-vermillion">
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-8 rounded-xl border border-line bg-card p-4">
              <p className="text-[11.5px] font-medium text-ink">Source policy</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                Every fact here traces to a CSC notice or the official CSCA portal. We date the page
                and link the source rather than asking you to trust us.
              </p>
            </div>
          </div>
        </aside>

        <article className="prose-edu max-w-none">
          <section id="what">
            <h2>What the CSCA is</h2>
            <p>
              The <strong>China Scholastic Competency Assessment</strong> is a standardized test
              developed by the China Scholarship Council with experts from Chinese universities. It
              measures two things at once: your academic readiness for a Chinese undergraduate
              programme, and your Chinese language ability where the degree is taught in Chinese.
            </p>
            <p>
              It is not a language certificate like HSK, and it is not a subject olympiad. It is a
              broad readiness check, delivered as multiple-choice questions under tight time
              pressure, and used by universities as a reference point alongside your high-school
              transcript.
            </p>
            <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "One scale", body: "Every subject is scored 0–100." },
                { icon: Clock3, title: "Tight timing", body: "48 questions in 60 minutes for Maths." },
                { icon: Globe2, title: "Global cohort", body: "Universities see your percentile." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-line bg-card p-4">
                  <item.icon className="h-4 w-4 text-vermillion" />
                  <p className="mt-2 text-[12.5px] font-medium text-ink">{item.title}</p>
                  <p className="text-[11.5px] text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="who">
            <h2>Who needs to sit it</h2>
            <div className="not-prose my-5 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-4 py-2.5">Intake</th>
                    <th className="px-4 py-2.5">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">2026 / 2027</td>
                    <td className="px-4 py-3 text-ink-soft">
                      Required for undergraduate applicants at universities participating in the
                      Chinese Government Scholarship.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">2028 onwards</td>
                    <td className="px-4 py-3 text-ink-soft">
                      Required for <em>all</em> undergraduate applicants to Chinese universities, with
                      minimum admission standards set by institutions.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">Not applying for a scholarship?</td>
                    <td className="px-4 py-3 text-ink-soft">
                      You can still sit it. A strong score strengthens an application to any Chinese
                      university, and an increasing number of institutions expect it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Postgraduate applicants are not covered by the undergraduate CSCA requirement; check
              your programme's own rules.
            </p>
          </section>

          <section id="subjects">
            <h2>Subjects and format</h2>
            <p>
              There are five papers. Mathematics is compulsory; the rest depend on your programme and
              teaching language.
            </p>

            <div className="not-prose my-6 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Paper</th>
                    <th className="px-3 py-2.5">Questions</th>
                    <th className="px-3 py-2.5">Time</th>
                    <th className="px-3 py-2.5">Language</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {SUBJECTS.map((subject) => (
                    <tr key={subject.code}>
                      <td className="px-3 py-3">
                        <span className="font-medium text-ink">{subject.nameEn}</span>
                        <span className="ml-1.5 font-chinese text-[11px] text-ink-faint">
                          {subject.nameZh}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-ink-soft tabular">{subject.questionCount}</td>
                      <td className="px-3 py-3 text-ink-soft tabular">{subject.durationMin} min</td>
                      <td className="px-3 py-3 text-ink-soft">
                        {subject.language === "zh" ? "Chinese" : "Chinese / English"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Mathematics — mandatory</h3>
            <p>
              Sets and inequalities, functions (including sequences and an introduction to
              derivatives), geometry and algebra (analytic geometry, vectors, complex numbers, spatial
              geometry), and probability and statistics.
            </p>
            <h3>Physics and Chemistry — programme-dependent</h3>
            <p>
              Science, engineering, agriculture and medicine applicants usually need at least one of
              the two. Engineering programmes typically expect Physics; medicine and pharmacy
              typically expect Chemistry. Some universities require both — read the programme page,
              not the university homepage.
            </p>
            <h3>Professional Chinese — humanities or STEM</h3>
            <p>
              Two versions, both 80 questions in 90 minutes: <strong>Humanities Chinese</strong> for
              literature, law, education, history and arts applicants; <strong>STEM Chinese</strong>{" "}
              for maths, science and engineering applicants. Item types are character recognition,
              word discrimination, sentence completion and reading comprehension.
            </p>
            <p className="not-prose rounded-lg border border-jade/25 bg-jade-soft/50 p-4 text-[12.5px] text-ink-soft">
              <strong className="text-ink">Practical note:</strong> if your university accepts an
              English-taught programme, you may skip Professional Chinese entirely. That is one fewer
              90-minute paper — and a decision worth making before you register.
            </p>
          </section>

          <section id="dates">
            <h2>Dates and fees</h2>
            <p>
              From 2026 there are five sittings a year: <strong>January, March, April, June and
              December</strong>. Each sitting runs across two days and covers all five papers. Because
              every session starts at the same moment worldwide, December, April and June suit
              Asia-Pacific candidates, while January and March suit Europe, Africa and the Americas.
            </p>

            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-card p-4">
                <CreditCard className="h-4 w-4 text-ink-faint" />
                <p className="mt-2 font-display text-2xl text-ink">CNY 450</p>
                <p className="text-[11.5px] text-ink-soft">One subject</p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <CreditCard className="h-4 w-4 text-ink-faint" />
                <p className="mt-2 font-display text-2xl text-ink">CNY 700</p>
                <p className="text-[11.5px] text-ink-soft">Two or more subjects</p>
              </div>
            </div>

            <p>
              Registration closes roughly a month before each sitting and is announced on the official
              portal. See our{" "}
              <Link href="/exam-dates">exam calendar</Link> for the published 2026–27 dates.
            </p>
          </section>

          <section id="scoring">
            <h2>Scoring and percentiles</h2>
            <p>
              Each subject is scored 0–100. There is no negative marking, so leaving a question blank
              is never better than guessing. Universities set their own minimums; there is no single
              national pass mark.
            </p>
            <p>
              Crucially, institutions can see your <strong>global percentile</strong> as well as your
              raw score. A 70 in a cohort where the average is 55 reads very differently from a 70 in
              a strong cohort. Our{" "}
              <Link href="/app/dashboard">dashboard</Link> shows a modelled percentile, clearly
              labelled as an estimate — we do not have access to real cohort data.
            </p>

            <div className="not-prose my-5 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-4 py-2.5">Band</th>
                    <th className="px-4 py-2.5">What it usually means</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {[
                    ["85–100", "Shortlist-competitive at top-20 universities."],
                    ["70–84", "Comfortably competitive for most CGS programmes."],
                    ["50–69", "Acceptable for many institutions, weak for the top tier."],
                    ["Below 50", "Rebuild foundations before sitting again."],
                  ].map(([band, note]) => (
                    <tr key={band}>
                      <td className="px-4 py-2.5 font-medium text-ink tabular">{band}</td>
                      <td className="px-4 py-2.5 text-ink-soft">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-ink-faint">
              These bands are our coaching heuristic from published admissions guidance, not official
              cut-offs.
            </p>
          </section>

          <section id="exemptions">
            <h2>Exemptions that actually exist</h2>
            <ul>
              <li>
                <strong>Fully English-taught programmes:</strong> exempt from Professional Chinese.
                Mathematics (and any required science subject) still applies.
              </li>
              <li>
                <strong>Chinese Language majors:</strong> may be exempt from Professional Chinese with
                a valid HSK Level 4 result.
              </li>
              <li>
                <strong>Nothing else is automatic.</strong> Individual universities may add their own
                rules — always confirm in writing with the admissions office.
              </li>
            </ul>
          </section>

          <section id="register">
            <h2>How to register</h2>
            <div className="not-prose my-5 space-y-2">
              {[
                { icon: FileCheck2, text: "Prepare a compliant ID photo and a valid government ID." },
                { icon: CalendarDays, text: "Choose a sitting, format and (if offered) a test centre." },
                { icon: Monitor, text: "Home-based online proctoring is the default first format." },
                { icon: CreditCard, text: "Pay by credit card: CNY 450 for one subject, 700 for two or more." },
                { icon: CheckCircle2, text: "Keep the confirmation — you will need it on test day." },
              ].map((step, index) => (
                <div key={step.text} className="flex items-start gap-3 rounded-lg border border-line bg-card px-3.5 py-2.5">
                  <span className="font-display text-lg text-vermillion/70 tabular">0{index + 1}</span>
                  <p className="text-[12.5px] text-ink-soft">{step.text}</p>
                </div>
              ))}
            </div>
            <p>
              Registration happens only at{" "}
              <a href={OFFICIAL.site} target="_blank" rel="noreferrer noopener">
                csca.cn
              </a>
              . {SITE.name} never handles registration, fees or score reports.
            </p>
          </section>

          <section id="prepare">
            <h2>How to prepare, honestly</h2>
            <p>
              The official preparation advice is sound: build a calendar, work through the syllabus in
              three phases (foundation, intensification, sprint), keep an error log, and sit full
              papers under real conditions. What most candidates lack is not advice — it is a way to{" "}
              <em>measure</em> whether the advice is working.
            </p>
            <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
              {[
                { title: "1. Baseline", body: "Sit one full paper per subject before revising anything." },
                { title: "2. Diagnose", body: "Rank topics by marks lost, not by how hard they feel." },
                { title: "3. Drill", body: "10–20 questions on the weakest topic, with explanations." },
                { title: "4. Re-test", body: "Re-sit a paper within 48 hours and compare topic mastery." },
              ].map((step) => (
                <div key={step.title} className="rounded-xl border border-line bg-card p-4">
                  <p className="text-[12.5px] font-medium text-ink">{step.title}</p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>
            <p>
              Start with our{" "}
              <Link href="/app/mocks">full-length mock papers</Link> or read the{" "}
              <Link href="/syllabus">syllabus breakdown</Link> first if you are choosing subjects.
            </p>
          </section>

          <section id="faq">
            <h2>Frequently asked</h2>
          </section>

          <div className="not-prose">
            <Faq />
          </div>

          <div className="not-prose mt-10 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/guides/csca-vs-hsk", label: "CSCA vs HSK: which test do you need?" },
              { href: "/guides/csca-subjects-by-major", label: "Which subjects does your major need?" },
              { href: "/guides/csca-registration-step-by-step", label: "Registration, step by step" },
              { href: "/guides/csca-scoring-and-percentiles", label: "How scoring and percentiles work" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-lg border border-line bg-card px-3.5 py-2.5 text-[12px] text-ink transition hover:border-line-strong"
              >
                {link.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </div>

          <div className="not-prose mt-10 rounded-2xl bg-ink p-6 text-paper sm:p-8">
            <Eyebrow className="text-paper/40">Next step</Eyebrow>
            <p className="mt-3 font-display text-2xl text-balance">
              Find out what your score would be today.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-vermillion px-4 text-[12.5px] font-medium text-paper"
              >
                Start a free mock <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/exam-dates"
                className="inline-flex h-10 items-center justify-center rounded-full border border-paper/20 px-4 text-[12.5px] font-medium text-paper/85"
              >
                See exam dates
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
