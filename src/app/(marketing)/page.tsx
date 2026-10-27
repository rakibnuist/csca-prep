import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  Clock3,
  Compass,
  Flag,
  GraduationCap,
  Languages,
  ListChecks,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { ExamPreview } from "@/components/marketing/exam-preview";
import { ExamCountdown } from "@/components/site/countdown";
import { Faq } from "@/components/site/faq";
import { Eyebrow, Pill, SectionHead, Stat } from "@/components/site/section";
import { SUBJECTS } from "@/lib/exam";
import { FAQS, OFFICIAL, SITE, TRUST_POINTS } from "@/lib/site";
import { JsonLd } from "@/components/seo/jsonld";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Timer,
    title: "Exact exam conditions",
    body: "48 questions in 60 minutes for the fundamental subjects, 80 in 90 for Professional Chinese. Auto-submit at zero, same as the real paper.",
  },
  {
    icon: ListChecks,
    title: "Palette, flags & review",
    body: "Jump between questions, flag what you want to revisit, and see unanswered items before you submit — the navigation the real interface assumes.",
  },
  {
    icon: BarChart3,
    title: "Topic-level diagnosis",
    body: "Every answer is mapped to a syllabus topic. After each paper you see the exact strands costing you marks, not just a total.",
  },
  {
    icon: Languages,
    title: "Chinese and English",
    body: "Switch the fundamental subjects between EN and 中文. Professional Chinese papers stay in Chinese, as they are on exam day.",
  },
  {
    icon: BookOpen,
    title: "Worked explanations",
    body: "Every question has a written solution that shows the method. Wrong answers feed a review queue instead of disappearing.",
  },
  {
    icon: ShieldCheck,
    title: "Original content",
    body: "Written against the official 2025 topic outlines. No copied papers, no scraped PDFs — so every explanation matches the question.",
  },
];

const STEPS = [
  {
    title: "Tell us your target",
    body: "Intake year, intended major and the subjects your universities require. We build the subject set automatically.",
  },
  {
    title: "Sit a full paper",
    body: "Start with a diagnostic mock. Same timings, same navigation, same 0–100 scale. No partial credit to hide behind.",
  },
  {
    title: "Fix the weakest topics",
    body: "Your dashboard ranks topics by marks lost. Drill them, then re-sit a paper and watch the readiness score move.",
  },
];

const TOPIC_SAMPLE = [
  { name: "Analytic geometry", mastery: 42, tone: "bg-vermillion" },
  { name: "Derivatives & calculus", mastery: 61, tone: "bg-vermillion" },
  { name: "Sequences", mastery: 74, tone: "bg-gold" },
  { name: "Probability", mastery: 79, tone: "bg-jade" },
  { name: "Sets & inequalities", mastery: 88, tone: "bg-jade" },
];

const UNIVERSITY_SAMPLE = [
  {
    name: "Peking University",
    zh: "北京大学",
    city: "Beijing",
    tier: "985",
    rule: "MATH + PHYS or CHEM",
  },
  {
    name: "Tongji University",
    zh: "同济大学",
    city: "Shanghai",
    tier: "985",
    rule: "MATH + PHYS",
  },
  {
    name: "Fudan University",
    zh: "复旦大学",
    city: "Shanghai",
    tier: "985",
    rule: "MATH + PHYS or CHEM",
  },
  {
    name: "Beijing Language and Culture University",
    zh: "北京语言大学",
    city: "Beijing",
    tier: "211",
    rule: "MATH + 文科中文",
  },
];

const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "CSCA exam preparation",
      description:
        "Full-length CSCA mock exams in the official format, topic-level analytics, syllabus explorer and university requirement directory for international applicants to Chinese universities.",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      url: SITE.url,
      inLanguage: "en",
      isAccessibleForFree: true,
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT20H",
          instructor: { "@type": "Organization", name: SITE.name },
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={HOME_JSONLD} />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,#f4ede1_0%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full rule-dots opacity-40 [mask-image:radial-gradient(70%_60%_at_60%_0%,black,transparent_75%)]"
        />

        <div className="shell relative grid items-center gap-14 pt-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-28">
          <div className="animate-rise">
            <Eyebrow>2027 intake · official-format simulator</Eyebrow>

            <h1 className="display-xl mt-5 text-balance text-ink">
              Sit the CSCA
              <br />
              before you{" "}
              <span className="relative inline-block text-vermillion">
                sit the CSCA
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="10"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 7c60-5 140-5 296-2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="lead mt-6 max-w-xl text-pretty">
              Full-length mock papers with the real timings and question counts, topic-level
              analytics, and a university requirement matrix you would otherwise assemble by hand.
              Built on the official 2025 syllabus. Free to start.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vermillion px-6 text-[14px] font-medium text-paper transition hover:bg-vermillion-deep"
              >
                Start a free mock
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-6 text-[14px] font-medium text-ink transition hover:border-ink/30"
              >
                Explore the syllabus
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-ink-faint">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> No card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> Original questions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> Works on any device
              </span>
            </div>
          </div>

          <div className="animate-rise delay-2 relative pb-10 lg:pb-0">
            <div className="mb-3 flex justify-end">
              <div className="w-[220px]">
                <ExamCountdown />
              </div>
            </div>
            <ExamPreview />
            <p className="mt-16 text-center text-[11px] text-ink-faint lg:text-left">
              The simulator mirrors the CSCA interface: one answer, a question palette, and a
              countdown you cannot pause.
            </p>
          </div>
        </div>

        {/* stat strip */}
        <div className="border-y border-line bg-card/60">
          <div className="shell grid grid-cols-2 gap-6 py-7 sm:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <Stat key={point.label} value={point.value} label={point.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What the exam is ─────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          eyebrow="The exam"
          title="One test, five subjects, a hundred-point scale."
          body="The China Scholastic Competency Assessment is organised by the China Scholarship Council. From the 2026/27 academic year it is required for undergraduate applicants at Chinese Government Scholarship universities — and from 2028, for all undergraduate applicants."
          action={
            <Link
              href="/csca"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-vermillion"
            >
              Full exam guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Target,
              title: "Mathematics is mandatory",
              body: "Every applicant sits Maths. Physics and Chemistry depend on your programme — science, engineering, agriculture and medicine usually need at least one.",
            },
            {
              icon: Languages,
              title: "Professional Chinese",
              body: "Humanities or STEM stream for Chinese-taught degrees. Waived for fully English-taught programmes, or with HSK 4 for Chinese Language majors.",
            },
            {
              icon: Clock3,
              title: "90 + 60 + 60 + 60",
              body: "90 minutes for Professional Chinese, 60 for each fundamental subject. All single-answer multiple choice.",
            },
            {
              icon: GraduationCap,
              title: "Percentile matters",
              body: "Universities see your global percentile, not only the raw score. A 70 means something different in a strong cohort.",
            },
          ].map((item) => (
            <div key={item.title} className="panel p-5">
              <item.icon className="h-5 w-5 text-vermillion" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Simulator (dark) ─────────────────────────────────── */}
      <section className="bg-night text-paper">
        <div className="shell py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow className="text-paper/40">The simulator</Eyebrow>
              <h2 className="display-lg mt-4 text-balance text-paper">
                Practice that feels like the exam, not a quiz app.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-paper/65">
                The real CSCA is unforgiving about time. Our engine reproduces the pressure:
                a locked timer, no pause, one answer per question, and a review screen before
                submission. Nothing about exam day should surprise you.
              </p>

              <ul className="mt-8 space-y-3.5">
                {[
                  "Timings and question counts taken from the official format",
                  "Server-side timing, so a refresh cannot buy you minutes",
                  "Every answer autosaved — resume on any device",
                  "Score out of 100 with an estimated percentile band",
                  "Full review: your answer, the correct answer, the working",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-paper/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-paper/20">
                      <Check className="h-3 w-3 text-jade" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/app/mocks"
                className="mt-9 inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[13.5px] font-medium text-ink transition hover:bg-paper/90"
              >
                Open the mock library <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-paper/12 bg-paper/[0.04] p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-paper/10 pb-3">
                  <span className="text-[11px] tracking-[0.16em] text-paper/50 uppercase">
                    Review · Question 14
                  </span>
                  <Pill tone="line" className="border-paper/20 bg-transparent text-paper/60">
                    <Flag className="h-3 w-3" /> Flagged
                  </Pill>
                </div>

                <p className="mt-4 text-[13.5px] text-paper/85">
                  What is the derivative of f(x) = 9x⁵ with respect to x?
                </p>

                <div className="mt-3 space-y-1.5">
                  {[
                    { text: "45x⁴", state: "correct" },
                    { text: "5x⁹", state: "wrong" },
                    { text: "9x⁴", state: "muted" },
                    { text: "45x⁵", state: "muted" },
                  ].map((option) => (
                    <div
                      key={option.text}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-3 py-2 text-[13px]",
                        option.state === "correct" && "border-jade/40 bg-jade/10 text-paper",
                        option.state === "wrong" && "border-vermillion/40 bg-vermillion/10 text-paper/90",
                        option.state === "muted" && "border-paper/10 text-paper/45",
                      )}
                    >
                      <span>{option.text}</span>
                      {option.state === "correct" && (
                        <span className="text-[10px] tracking-wide text-jade uppercase">Correct</span>
                      )}
                      {option.state === "wrong" && (
                        <span className="text-[10px] tracking-wide text-vermillion uppercase">
                          Your answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-paper/10 bg-paper/[0.03] p-3">
                  <p className="text-[10px] tracking-[0.14em] text-paper/40 uppercase">Working</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-paper/70">
                    Power rule: d/dx (axⁿ) = a·n·xⁿ⁻¹. Here a = 9 and n = 5, so the derivative is
                    45x⁴.
                  </p>
                  <p className="mt-2 text-[11px] text-vermillion/80">
                    Topic: Derivatives and calculus basics · 0 / 1 marks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Analytics ────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Topic mastery</p>
                  <p className="mt-1 font-display text-2xl text-ink">Mathematics</p>
                </div>
                <Pill tone="jade">
                  <Sparkles className="h-3 w-3" /> Readiness 68
                </Pill>
              </div>

              <div className="mt-6 space-y-4">
                {TOPIC_SAMPLE.map((topic) => (
                  <div key={topic.name}>
                    <div className="flex items-baseline justify-between text-[12px]">
                      <span className="text-ink-soft">{topic.name}</span>
                      <span className="tabular font-medium text-ink">{topic.mastery}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className={cn("h-full rounded-full", topic.tone)}
                        style={{ width: `${topic.mastery}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-vermillion/6 p-3">
                <Compass className="mt-0.5 h-4 w-4 shrink-0 text-vermillion" />
                <p className="text-[12px] leading-relaxed text-ink-soft">
                  <span className="font-medium text-ink">Next best action:</span> 20 minutes on
                  analytic geometry. It is 11% of the paper and your weakest strand.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>Analytics</Eyebrow>
            <h2 className="display-md mt-4 text-balance">
              A score tells you what happened. A topic map tells you why.
            </h2>
            <p className="lead mt-4">
              Every question is tagged to the official syllabus. Your dashboard turns attempts
              into a ranked list of weak strands, then routes you to drills built from the same
              bank.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Marks lost by topic", body: "Ranked, not averaged — so you fix what matters." },
                { title: "Time per question", body: "See where the clock goes before it runs out." },
                { title: "Score trend", body: "Every paper, with your best and latest attempt." },
                { title: "Review queue", body: "Wrong answers return until they stick." },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-line pl-3">
                  <p className="text-[13px] font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── University matrix ────────────────────────────────── */}
      <section className="border-y border-line bg-card/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="University intelligence"
            title="Which subjects does your university actually require?"
            body="The official site shows you universities. It does not give you a comparable requirement matrix. We maintain one: required subjects, teaching language, Chinese-test exemption and application windows."
            action={
              <Link
                href="/universities"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-vermillion"
              >
                Browse the directory <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card">
            <div className="hidden grid-cols-[1.6fr_0.7fr_0.6fr_1fr] gap-4 border-b border-line bg-paper-deep/60 px-5 py-3 text-[10.5px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
              <span>University</span>
              <span>City</span>
              <span>Tier</span>
              <span>CSCA subjects</span>
            </div>
            {UNIVERSITY_SAMPLE.map((uni) => (
              <div
                key={uni.name}
                className="grid gap-1 border-b border-line/70 px-5 py-4 last:border-0 sm:grid-cols-[1.6fr_0.7fr_0.6fr_1fr] sm:items-center sm:gap-4"
              >
                <div>
                  <p className="text-[14px] font-medium text-ink">{uni.name}</p>
                  <p className="text-[11px] text-ink-faint">{uni.zh}</p>
                </div>
                <p className="text-[12.5px] text-ink-soft">{uni.city}</p>
                <span className="w-fit rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-soft">
                  {uni.tier}
                </span>
                <p className="text-[12.5px] text-ink-soft">{uni.rule}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-ink-faint">
            Indicative requirements. Always confirm with the admissions office — institutions set
            their own rules and update them each cycle.
          </p>
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          eyebrow="Syllabus"
          title="Five subjects. The official topic list, in plain language."
          body="Not a PDF you scroll through at midnight. A navigable tree with weights, so you know where the marks live."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject, index) => (
            <Link
              key={subject.code}
              href={`/syllabus/${subject.code.toLowerCase()}`}
              className={cn(
                "group panel flex flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
                index === 0 && "lg:col-span-2 lg:flex-row lg:items-center lg:gap-8",
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-chinese text-lg text-vermillion">{subject.nameZh}</span>
                  <span className="h-3 w-px bg-line" />
                  <span className="text-[10.5px] tracking-[0.12em] text-ink-faint uppercase">
                    {subject.kind === "CHINESE" ? "Professional Chinese" : "Fundamental"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl text-ink">{subject.nameEn}</h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-soft">
                  {subject.blurbEn}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-4 lg:mt-0 lg:flex-col lg:items-end lg:gap-1">
                <div className="text-[12px] text-ink-soft">
                  <span className="font-medium text-ink tabular">{subject.questionCount}</span> questions
                </div>
                <div className="text-[12px] text-ink-soft">
                  <span className="font-medium text-ink tabular">{subject.durationMin}</span> minutes
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-ink-faint transition group-hover:text-vermillion lg:ml-0" />
              </div>
            </Link>
          ))}

          <div className="panel flex flex-col justify-between bg-ink p-5 text-paper">
            <div>
              <Eyebrow className="text-paper/40">Official source</Eyebrow>
              <p className="mt-3 text-[14px] leading-relaxed text-paper/80">
                We transcribe the official outlines, then link you to the source. Always check the
                current syllabus before you register.
              </p>
            </div>
            <a
              href={OFFICIAL.syllabus}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
            >
              csca.cn syllabus downloads <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="border-t border-line bg-paper-deep/50 py-20 sm:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead
              eyebrow="How it works"
              title="Three steps, then repeat until the paper feels boring."
              body="No 40-hour video course. Practice the way the exam tests you, then fix what breaks."
            />
            <div className="space-y-6">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-5">
                  <span className="font-display text-3xl text-vermillion/80 tabular">
                    0{index + 1}
                  </span>
                  <div className="border-b border-line pb-6">
                    <h3 className="text-[15px] font-medium text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrity ────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <div className="grid gap-10 rounded-3xl border border-line bg-card p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Why trust us</Eyebrow>
            <h2 className="display-md mt-4 text-balance">
              Independent, sourced, and honest about what we do not know.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              {SITE.name} is not affiliated with the China Scholarship Council. We do not sell
              exam registrations, results, or guarantees. What we sell — eventually — is practice
              time that is worth more than the fee.
            </p>
            <div className="mt-6 space-y-2.5 text-[13px] text-ink-soft">
              {[
                "Format, fees and dates transcribed from official CSC notices",
                "Every question mapped to a published syllabus topic",
                "Percentiles labelled as estimates, never presented as official",
                "University rules shown with a verification prompt",
              ].map((item) => (
                <p key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-center">
            {[
              { value: "5", label: "Subjects mapped", note: "Official 2025 outlines" },
              { value: "48", label: "Questions per paper", note: "Fundamental subjects" },
              { value: "100", label: "Point scale", note: "Same as the real exam" },
              { value: "5×", label: "Sittings a year", note: "Jan · Mar · Apr · Jun · Dec" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-line bg-paper p-4">
                <p className="font-display text-3xl text-ink tabular">{item.value}</p>
                <p className="mt-1 text-[12px] font-medium text-ink">{item.label}</p>
                <p className="text-[10.5px] text-ink-faint">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────────── */}
      <section className="shell pb-20 sm:pb-24">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-paper p-6">
              <feature.icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl text-ink">{feature.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Free tools ───────────────────────────────────────── */}
      <section className="shell pb-20 sm:pb-24">
        <SectionHead
          eyebrow="Free tools"
          title="Start with something useful, right now."
          body="No account needed for any of these. They exist because the fastest way to trust a prep platform is to use it before paying."
          action={
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-vermillion"
            >
              Read the guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Sample questions",
              body: "25 questions across all five subjects, with worked answers.",
              href: "/sample-questions",
              meta: "No sign-up",
            },
            {
              title: "Score calculator",
              body: "Convert correct answers into the official 0–100 scale.",
              href: "/tools/score-calculator",
              meta: "1 minute",
            },
            {
              title: "Glossary",
              body: "CSCA, CGS, HSK, Double First Class — defined clearly.",
              href: "/glossary",
              meta: "28 terms",
            },
            {
              title: "Guides",
              body: "Requirements, an 8-week plan, registration and scoring.",
              href: "/guides",
              meta: "5 guides",
            },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group panel flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  {tool.meta}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint transition group-hover:text-vermillion" />
              </div>
              <h3 className="mt-3 font-display text-xl text-ink">{tool.title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{tool.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Pricing teaser ───────────────────────────────────── */}
      <section className="border-y border-line bg-card/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="Pricing"
            title="Free where it matters. Paid when you want the extra reps."
            align="center"
            body="We would rather you use the free tier than buy a course you do not finish."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="panel p-6">
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Free</p>
              <p className="mt-2 font-display text-4xl text-ink">
                ¥0 <span className="text-base text-ink-faint">forever</span>
              </p>
              <ul className="mt-5 space-y-2 text-[13px] text-ink-soft">
                {[
                  "One full mock per subject",
                  "All topic drills and review queue",
                  "Full syllabus and university directory",
                  "Score history and topic breakdown",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink text-[13px] font-medium text-paper transition hover:bg-ink/85"
              >
                Create free account
              </Link>
            </div>

            <div className="panel relative overflow-hidden p-6">
              <div className="absolute top-0 right-0 bg-gold-soft px-3 py-1 text-[10px] font-medium tracking-wide text-gold">
                Waitlist
              </div>
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Pro</p>
              <p className="mt-2 font-display text-4xl text-ink">
                ¥99 <span className="text-base text-ink-faint">/ intake</span>
              </p>
              <ul className="mt-5 space-y-2 text-[13px] text-ink-soft">
                {[
                  "Unlimited full-length mocks",
                  "Adaptive study plan and reminders",
                  "Predicted score range with confidence",
                  "Priority answers on the community board",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-full border border-line-strong text-[13px] font-medium text-ink transition hover:border-ink/40"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display-md mt-4">Questions students actually ask.</h2>
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">
              Anything missing? Write to{" "}
              <a href={`mailto:${SITE.email}`} className="text-vermillion underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <Faq />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-night text-paper">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Eyebrow className="text-paper/40">Next sitting · 19–20 Dec 2026</Eyebrow>
            <h2 className="display-lg mt-4 max-w-xl text-balance text-paper">
              Find out where you stand in 60 minutes.
            </h2>
            <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-paper/65">
              One full paper, one honest score, one list of what to fix. That is a better use of an
              evening than another PDF.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-vermillion px-5 text-[13.5px] font-medium text-paper transition hover:bg-vermillion-deep"
              >
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/exam-dates"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-paper/20 px-5 text-[13.5px] font-medium text-paper/85 transition hover:border-paper/40"
              >
                See all sittings
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-paper/70">
            {[
              { icon: MapPin, text: "Home-based online proctoring worldwide" },
              { icon: Timer, text: "7 working days for online results" },
              { icon: GraduationCap, text: "306+ universities accept CSCA" },
              { icon: ShieldCheck, text: "Register only at csca.cn" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2 border-t border-paper/15 pt-3">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-paper/40" />
                <p className="text-[12px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
