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
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { Faq } from "@/components/site/faq";
import { Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { RegistrationFlow, ScheduleCalendar } from "@/components/marketing/line-art-csca";
import { SittingsTrack } from "@/components/marketing/sittings-track";
import { EXAM_BLOCKS, OFFICIAL, SITE, nextSitting, sittingsForBlock } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";
import { FAQ_TOTAL } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CSCA exam 2026–27 — format, subjects, dates, fees",
  description:
    "What the China Scholastic Competency Assessment (CSCA) is, who must sit it, the subjects and timings, fees, results and exemptions — sourced from official CSC notices.",
  path: "/csca",
  image: null,
  keywords: [
    "CSCA exam",
    "CSCA exam preparation",
    "CSCA preparation",
    "CSCA question paper",
    "CSCA mock test",
    "CSCA exam format",
    "CSCA exam dates",
    "CSCA fees",
  ],
});

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who has to take the CSCA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From the 2026/2027 academic year, international applicants to undergraduate programmes at Chinese Government Scholarship universities must sit the CSCA. Broader rollout to all undergraduate applicants from 2028 has been cited in admission guides, though csca.cn has not yet published a blanket national mandate — check your university's admissions notice.",
      },
    },
    {
      "@type": "Question",
      name: "Which CSCA subjects do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mathematics is mandatory. Physics and Chemistry depend on the programme: science, engineering, agriculture and medicine usually require at least one. Professional Chinese is compulsory for Chinese Government Scholarship applicants and for Chinese-taught programmes; non-scholarship English-taught degrees do not require it unless a university specifies otherwise.",
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
  const upcoming = nextSitting();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "CSCA exam guide", item: `${SITE.url}/csca` },
            ],
          }),
        }}
      />

      <section className="grain relative overflow-hidden border-b border-line bg-night text-paper">
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(211,29,60,0.3),transparent_62%)] blur-3xl"
        />
        <div className="shell relative grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <Eyebrow className="text-paper/70">Exam guide · verified November 2026</Eyebrow>
            <h1 className="display-lg mt-4 max-w-2xl text-balance text-paper">
              The CSCA, explained without the consultant fog.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/65">
              The China Scholastic Competency Assessment is a standardized entrance exam for
              international undergraduates applying to China. Here is what is fixed, what varies by
              university, and what nobody tells you until it is too late.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {/* On the dark header the light-surface pills drop below AA, so the
                  chips are restyled here rather than tone-shifted globally. */}
              <span className="inline-flex items-center rounded-full border border-vermillion-light/40 bg-vermillion/15 px-2.5 py-1 text-[11px] font-medium text-vermillion-light">
                Required for CGS applicants
              </span>
              <span className="inline-flex items-center rounded-full border border-jade-light/35 bg-jade/15 px-2.5 py-1 text-[11px] font-medium text-jade-light">
                Chinese-taught programmes
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-paper/75">
                6 sittings a year
              </span>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={160} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
            <p className="eyebrow text-paper/60">At a glance</p>
            <dl className="mt-3 divide-y divide-white/10 text-[12.5px]">
              {[
                ["Organiser", "China Scholarship Council (CSC)"],
                ["Format", "Single-answer multiple choice"],
                ["Subjects", "Professional Chinese + Maths, Physics, Chemistry"],
                ["Scoring", "0–100 per subject"],
                ["Validity", "Two years from issue"],
                ["Languages", "Chinese and English (fundamental subjects)"],
                ["Sittings", "Jan, Mar, Apr, Jun, Nov, Dec"],
                ["Fee", "CNY 450 one subject · CNY 700 two or more"],
                ["Results", "Within 10 working days"],
                ["Registration", "csca.cn only"],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 py-2">
                  <dt className="text-paper/50">{term}</dt>
                  <dd className="text-right text-paper">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-vermillion-light hover:underline"
            >
              Official CSCA portal <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-12 py-14 lg:grid-cols-[0.32fr_0.68fr] lg:py-20">
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
                ["#timeline", "Application timeline"],
                ["#scoring", "Scoring and percentiles"],
                ["#myths", "Myths"],
                ["#exemptions", "Exemptions"],
                ["#test-day", "Test day"],
                ["#resource-map", "Resource map"],
                ["#register", "How to register"],
                ["#compare", "CSCA vs HSK / SAT"],
                ["#prepare", "How to prepare"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block text-ink-soft transition hover:text-indigo">
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

        <article className="prose-edu min-w-0 max-w-none">
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
            <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
            <p>
              Which papers you actually sit depends on the degree, not only on the university — a
              medical faculty reads Chemistry, an engineering faculty reads Physics. Our{" "}
              <Link href="/csca/programmes">programme guides</Link> set out the subject combination for
              eight of the most common degrees, with the institution-set part flagged.
            </p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
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
                    <td className="px-4 py-3 font-medium text-ink">2028 onwards (projected)</td>
                    <td className="px-4 py-3 text-ink-soft">
                      Admission guides expect wider rollout across undergraduate admissions in China,
                      with institutions setting programme requirements and cut-offs (confirm current
                      mandates on csca.cn and university notices).
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
              your programme&apos;s own rules.
            </p>
          </section>

          <section id="subjects">
            <h2>Subjects and format</h2>
            <p>
              There are five papers. Mathematics is compulsory; the rest depend on your programme and
              teaching language.
            </p>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line">
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
              <strong className="text-ink">Practical note:</strong> CSCA makes Professional Chinese
              compulsory for Chinese Government Scholarship applicants and for Chinese-taught
              programmes. Some universities waive it for their English-taught degrees — that is an
              institutional exception, not a CSCA rule. Get the waiver in writing before you register:
              it is one fewer 90-minute paper, but an assumption costs you the fee.
            </p>
          </section>

          <section id="dates">
            <h2>Dates and fees</h2>
            <figure className="not-prose my-5 rounded-2xl border border-line bg-card p-4">
              <ScheduleCalendar />
              <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
                The sitting as it is actually delivered: two days, four papers, on an 08:00 or a 14:00
                Beijing-time start block. Professional Chinese opens the sitting.
              </figcaption>
            </figure>
            <figure className="not-prose my-5 rounded-2xl border border-line bg-card px-5 py-4">
              <SittingsTrack />
              <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
                Six of the twelve months, with the two longest gaps between them. If you miss the
                April window the next sitting is June — and a score report takes two days of sitting
                plus ten working days to reach you.
              </figcaption>
            </figure>
            <p>
              Each sitting has its own page with the local start times for six source countries:{" "}
              <Link href={`/exam-dates/${upcoming.id}`}>{upcoming.label}</Link> is the next one. And
              if you want to see what a paper actually looks like before signing up,{" "}
              <Link href="/csca/sample-paper">one full maths paper is open here</Link> — 48 questions
              with the answers.
            </p>
            <p>
              From 2026 there are six sittings a year: <strong>January, March, April, June, November
              and December</strong>. Each sitting runs across two days and covers all five papers.
              Because every session starts at the same moment worldwide, December, April and June suit
              Asia-Pacific candidates, while January and March suit Europe, Africa and the Americas.
            </p>

            <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

            <h3>What a sitting actually looks like</h3>
            <p>
              Each sitting runs across <strong>two days</strong>, not one. Professional Chinese and
              Mathematics are sat on day one; Physics and Chemistry on day two. Papers run on one of two
              published start blocks — an <strong>08:00</strong> block and a <strong>14:00</strong>{" "}
              block, Beijing time (UTC+8) — and the notice for your sitting says which one applies.
              Candidates elsewhere sit mid-morning or overnight, so check your own clock before booking.
            </p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Day</th>
                    <th className="px-3 py-2.5">Paper</th>
                    <th className="px-3 py-2.5">Beijing · 08:00 block</th>
                    <th className="px-3 py-2.5">Beijing · 14:00 block</th>
                    <th className="px-3 py-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {EXAM_BLOCKS["08:00"].map((early, i) => {
                    const late = EXAM_BLOCKS["14:00"][i];
                    return (
                      <tr key={early.subject}>
                        <td className="px-3 py-2.5 text-[11px] tracking-[0.1em] text-ink-faint uppercase">{early.day}</td>
                        <td className="px-3 py-2.5 text-ink">{early.subject}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{early.time}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{late.time}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{early.minutes} min</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="not-prose text-[11px] text-ink-faint">
              {sittingsForBlock("08:00").join(", ")} run the 08:00 block; the other published sittings run
              the 14:00 block. The time on your Admission Ticket is final.
            </p>

            <h3>Registration reality</h3>
            <p>
              Registration windows are short — the November 2026 sitting was open for seven days
              (15–21 October). Once the Admission Ticket is generated your details are locked: no
              subject changes, no date changes, no centre changes, and withdrawals are refused. Plan
              the sitting before the window opens rather than during it.
            </p>
            <p>
              See the{" "}
              <Link href="/exam-dates">exam calendar</Link> for the published 2026–27 dates and fees,
              or the <Link href="/csca/test-centres">test-centre guide</Link> if you are unsure whether
              you will sit at home or at a centre.
            </p>
          </section>

          <section id="timeline">
            <h2>The application timeline, in the right order</h2>
            <p>
              Most avoidable mistakes are sequencing mistakes: sitting the wrong subjects, sitting too
              late for the intake, or assuming a score can be produced on demand. Work backwards from
              the university deadline.
            </p>
            <div className="not-prose my-5 space-y-2">
              {[
                { step: "1", when: "6–9 months before intake", what: "Shortlist programmes and read each one's CSCA requirement: which subjects, which language, which minimum. Get it in writing." },
                { step: "2", when: "3–5 months before", what: "Register for the earliest sitting that leaves room for one retake. Fees are CNY 450 for one subject, CNY 700 for two or more." },
                { step: "3", when: "4–8 weeks before the sitting", what: "Sit a baseline paper per subject, rank topics by marks lost, then drill the weakest and re-test every 48 hours." },
                { step: "4", when: "Test week", what: "Run the equipment check, install the Test Client if you are sitting at home, and confirm your Admission Ticket details match your passport." },
                { step: "5", when: "10 working days after", what: "Download the electronic score report from your CSCA account. It is valid for two years." },
                { step: "6", when: "Application window", what: "Submit the report with your application. If the score is short and time allows, sit a later sitting and submit the better result." },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3">
                  <span className="font-display text-lg text-indigo tabular">{item.step}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-ink">{item.when}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{item.what}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>
              The single most expensive sequencing error is registering for subjects the programme does
              not require — the fee is not refundable and the sitting cannot be changed once the
              Admission Ticket is issued.
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

            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
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
            <h2>Exemptions, accurately stated</h2>
            <p>
              CSCA&apos;s own rule is that Professional Chinese is compulsory for Chinese Government
              Scholarship applicants and for Chinese-taught programmes. Everything beyond that is a
              university exception, not a CSCA rule:
            </p>
            <ul>
              <li>
                <strong>Non-CGS English-taught programmes:</strong> some universities waive
                Professional Chinese for self-funded English-taught degrees; others still ask for it
                (CGS applicants must still sit Professional Chinese). Mathematics, and any science
                elective the programme requires, always applies.
              </li>
              <li>
                <strong>Chinese Language majors:</strong> some universities accept HSK Level 4 or above
                in place of Professional Chinese. CSCA does not publish such an exemption itself.
              </li>
              <li>
                <strong>Nothing is automatic.</strong> Get the exemption in writing from the admissions
                office before you register — a wrong assumption costs a 90-minute paper and the fee.
              </li>
            </ul>
          </section>

          <section id="register">
            <h2>How to register</h2>
            <figure className="not-prose my-5 rounded-2xl border border-line bg-card p-4">
              <RegistrationFlow />
              <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
                Three steps, one website. Nothing on these pages can register you, reserve a seat or
                produce a score — those exist only on csca.cn.
              </figcaption>
            </figure>
            <div className="not-prose my-5 space-y-2">
              {[
                { icon: FileCheck2, text: "Prepare a compliant ID photo and a valid government ID." },
                { icon: CalendarDays, text: "Choose a sitting, format and (if offered) a test centre." },
                { icon: Monitor, text: "Home-based online proctoring is the default first format." },
                { icon: CreditCard, text: "Pay by credit card: CNY 450 for one subject, 700 for two or more." },
                { icon: CheckCircle2, text: "Keep the confirmation — you will need it on test day." },
              ].map((step, index) => (
                <div key={step.text} className="flex items-start gap-3 rounded-lg border border-line bg-card px-3.5 py-2.5">
                  <span className="font-display text-lg text-indigo tabular">0{index + 1}</span>
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

          <section id="test-day">
            <h2>Test day</h2>
            <p>
              The home-based test is dual-device and Windows-only: a computer to answer on, plus a
              phone or tablet behind you at roughly 45° for the proctor&apos;s view. Login opens 60
              minutes before the start (log in at least 30 minutes early for device and identity
              verification), and late arrivals are not admitted once the timer begins.
            </p>
            <p>
              Scratch work is allowed on a small whiteboard or a blank sheet inside a transparent
              file bag, written on with an erasable marker; paper, notes and sticky notes are
              prohibited. Both cameras and microphones must stay on for the whole paper, and the
              system submits automatically when time expires — early submission is not permitted.
            </p>
            <p>
              Equipment, environment, check-in sequence and the four tiers of penalties are
              documented in full on{" "}
              <Link href="/test-day">the test-day page</Link>, including the <code>20 Mbps</code>{" "}
              symmetric network requirement most candidates discover too late.
            </p>
          </section>

          <section id="myths">
            <h2>Seven things people believe about the CSCA that are not true</h2>
            <div className="not-prose my-5 space-y-2">
              {[
                {
                  myth: "“CSCA replaces HSK.”",
                  fact: "It does not. CSCA is an academic readiness and academic-Chinese test for undergraduate admission; HSK remains a separate language certificate. Some universities accept HSK 4 in place of Professional Chinese for Chinese Language majors, which is a per-institution arrangement rather than a CSCA equivalence.",
                },
                {
                  myth: "“You need 60 to pass.”",
                  fact: "There is no pass mark. Each subject is scored 0–100 and every university sets its own minimum, which is why the same score can be comfortable at one institution and short at another.",
                },
                {
                  myth: "“English-taught applicants never sit Professional Chinese.”",
                  fact: "CSCA lists Professional Chinese as compulsory for Chinese Government Scholarship applicants and Chinese-taught programmes. Waivers for English-taught degrees exist at some universities — confirm yours in writing.",
                },
                {
                  myth: "“I can choose the home test because it is convenient.”",
                  fact: "The remote-proctored home-based test is available only where no computer-based or paper-based centre serves your region. If a centre exists, you sit at the centre.",
                },
                {
                  myth: "“I can use rough paper.”",
                  fact: "Paper, sticky notes, pens and pencils are prohibited. The only permitted scratch tools are a small whiteboard with an erasable marker or a sheet inside a transparent file bag, shown blank before the test and erased on camera after it.",
                },
                {
                  myth: "“My score is permanent.”",
                  fact: "A score report is valid for two years. There is no limit on attempts, and you may submit your best valid score — but an expired report cannot support a new application.",
                },
                {
                  myth: "“I can reschedule if something comes up.”",
                  fact: "Transfers are not offered, and after the Admission Ticket is generated even withdrawals are refused. Cancellation and refund requests are only possible before the ticket exists.",
                },
              ].map((item) => (
                <div key={item.myth} className="rounded-xl border border-line bg-card px-4 py-3">
                  <p className="text-[12.5px] font-medium text-indigo-deep">{item.myth}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{item.fact}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="compare">
            <h2>CSCA vs HSK, IELTS and the SAT</h2>
            <p>
              Applicants frequently hold several test results and are unsure which one matters. They
              are not substitutes for each other — each answers a different question an admissions
              committee asks.
            </p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Test</th>
                    <th className="px-3 py-2.5">What it answers</th>
                    <th className="px-3 py-2.5">Used for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {[
                    ["CSCA", "Academic readiness in maths/science, plus academic Chinese where required", "Undergraduate admission reference at CSCA-recognised Chinese universities; CGS evaluation"],
                    ["HSK", "General Chinese proficiency on a six-level scale", "Language requirement for Chinese-taught programmes; sometimes accepted instead of Professional Chinese by specific universities"],
                    ["IELTS / TOEFL", "English proficiency", "English-taught programme admission requirements"],
                    ["SAT / A-levels", "School-leaving academic achievement", "Some universities accept these as parallel evidence, but they do not replace a CSCA requirement"],
                  ].map(([test, answers, used]) => (
                    <tr key={test}>
                      <td className="px-3 py-3 font-medium text-ink">{test}</td>
                      <td className="px-3 py-3 text-ink-soft">{answers}</td>
                      <td className="px-3 py-3 text-ink-soft">{used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              The practical rule: satisfy the language requirement your programme publishes, then sit
              the CSCA subjects that programme requires. One does not waive the other unless the
              university says so in writing.
            </p>
            <p className="not-prose mt-3">
              <Link
                href="/csca-vs-hsk-ielts-sat"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-vermillion hover:underline"
              >
                Read the full comparison of CSCA, HSK, IELTS and the SAT
                <span aria-hidden>→</span>
              </Link>
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
            <div className="not-prose my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <section id="resource-map" className="not-prose">
            <div className="rounded-2xl border border-line bg-paper-deep/40 p-5 sm:p-6">
              <p className="eyebrow">CSCA resource map</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                Everything else you need, in the order applicants actually need it.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { href: "/csca/faq", title: `${FAQ_TOTAL} CSCA answers`, body: "Eligibility, subjects, fees, tickets, proctoring, penalties, validity, retakes." },
                  { href: "/csca/passing-score", title: "Passing score & scaling", body: "How 48 or 80 answers become a mark of 100, and what universities do with it." },
                  { href: "/csca/test-centres", title: "Centres vs home test", body: "Which format you get, what each requires, and how to confirm your centre." },
                  { href: "/test-day", title: "Test-day rules", body: "Windows-only client, 20 Mbps, dual cameras, scratch tool, violation tiers." },
                  { href: "/requirements", title: "Which subjects you need", body: "Programme-by-programme matrix, plus the exemption facts." },
                  { href: "/exam-dates", title: "Dates & fees", body: "Six sittings, registration windows, the two-day Beijing timetable." },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-line bg-card p-4 transition hover:border-vermillion/40"
                  >
                    <p className="flex items-center justify-between gap-2 text-[12.5px] font-medium text-ink">
                      {item.title}
                      <span className="text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-indigo">→</span>
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{item.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="faq">
            <h2>Frequently asked</h2>
          </section>

          <div className="not-prose">
            <Faq />
          </div>

          <div className="not-prose mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
            <Eyebrow className="text-paper/70">Next step</Eyebrow>
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
