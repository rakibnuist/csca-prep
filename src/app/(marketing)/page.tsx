/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  Check,
  Clock3,
  Compass,
  Flag,
  FlaskConical,
  GraduationCap,
  Grid3x3,
  Image as ImageIcon,
  Languages,
  ListChecks,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { ExamPreview } from "@/components/marketing/exam-preview";
import { Reveal } from "@/components/motion/reveal";
import { TimetableFigure } from "@/components/marketing/timetable-figure";
import { PullBand } from "@/components/marketing/pull-band";
import { ExamCountdown } from "@/components/site/countdown";
import { Faq } from "@/components/site/faq";
import { FAQ_TOTAL } from "@/lib/faq";
import { Eyebrow, Pill, SectionHead, Stat } from "@/components/site/section";
import { SUBJECTS } from "@/lib/exam";
import { GLOSSARY } from "@/lib/glossary";
import { GUIDES } from "@/lib/guides";
import { PAPER_STATS, SITTABLE_PAPERS } from "@/lib/paper-stats";
import { FAQS, nextSitting, OFFICIAL, SITE, TRUST_POINTS } from "@/lib/site";
import { JsonLd } from "@/components/seo/jsonld";
import { cn } from "@/lib/utils";

/**
 * The homepage inherits the root layout title, so it only needs to declare the
 * canonical and the language pair. `/zh` is the Chinese-language counterpart
 * and links back here, which makes the hreflang cluster reciprocal.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", zh: "/zh", "x-default": "/" },
  },
};

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

const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "CSCA exam preparation",
      description:
        "Free CSCA exam preparation with full-length mock tests and official-format question papers, topic-level analytics, a syllabus explorer, scholarship guidance and a university requirements guide for international applicants to Chinese universities.",
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
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_65%_at_50%_-10%,rgba(238,242,255,0.95)_0%,rgba(248,250,252,0.4)_55%,transparent_100%)]"
        />
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_65%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.10),transparent_65%)] blur-2xl"
        />

        <div className="shell relative grid grid-cols-1 items-center gap-10 pt-10 pb-14 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-16 lg:pb-20">
          <Reveal className="relative min-w-0">
            <Eyebrow>2027 intake · CSCA student prep platform</Eyebrow>

            <h1 className="display-xl mt-5 text-balance text-ink">
              Master the CSCA exam{" "}
              <span className="text-gradient">
                with real past papers &amp; timed mocks.
              </span>
            </h1>

            <Reveal delay={100} as="p" className="lead mt-5 max-w-xl text-pretty">
              Built for international applicants: a timed test-client simulator, transcribed official
              past papers with worked solutions, {PAPER_STATS.questions.toLocaleString()} syllabus-mapped
              questions, and instant topic-level analytics. Free to start.
            </Reveal>

            <Reveal delay={180} className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className="btn-sheen group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-vermillion px-6 text-[14px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:bg-vermillion-deep"
              >
                Start a free mock
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/free-exam"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-5 text-[14px] font-semibold text-ink transition hover:border-vermillion/40 hover:bg-paper"
              >
                Try 10-question diagnostic
              </Link>
            </Reveal>

            {/* Subject quick-jump strip */}
            <Reveal delay={240} className="mt-8">
              <p className="text-[11px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                Explore by subject
              </p>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                {[
                  {
                    name: "Mathematics",
                    spec: "48 Q · 60m",
                    href: "/syllabus/math",
                    icon: Calculator,
                    badge: "bg-blue-50 text-vermillion",
                  },
                  {
                    name: "Physics",
                    spec: "48 Q · 60m",
                    href: "/syllabus/phys",
                    icon: Atom,
                    badge: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    name: "Chemistry",
                    spec: "48 Q · 60m",
                    href: "/syllabus/chem",
                    icon: FlaskConical,
                    badge: "bg-amber-50 text-amber-600",
                  },
                  {
                    name: "Prof. Chinese",
                    spec: "80 Q · 90m",
                    href: "/syllabus/ch_sci",
                    icon: Languages,
                    badge: "bg-indigo-50 text-indigo",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-2.5 rounded-xl border border-line bg-white p-2.5 shadow-xs transition hover:-translate-y-0.5 hover:border-vermillion/35 hover:shadow-sm"
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                        item.badge,
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center justify-between gap-1 truncate text-[12px] font-semibold text-ink group-hover:text-vermillion">
                        <span className="truncate">{item.name}</span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition group-hover:opacity-100" />
                      </p>
                      <p className="mt-0.5 text-[10.5px] font-medium text-ink-faint tabular">
                        {item.spec}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Quick student tools strip */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {[
                { label: "Official Past Papers", href: "/question-papers" },
                { label: "Topic Practice", href: "/practice" },
                { label: "Score Calculator", href: "/tools/score-calculator" },
                { label: "University Requirements", href: "/requirements" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1 text-[11.5px] font-medium text-ink-soft transition hover:border-vermillion/40 hover:bg-white hover:text-vermillion"
                >
                  {tool.label}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              ))}
            </div>

            <Reveal delay={280} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-faint">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> No card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> Official format · 2025 syllabus
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> {`${PAPER_STATS.questions.toLocaleString()}-question bank`}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-jade" /> English &amp; 中文 tracks
              </span>
            </Reveal>
          </Reveal>

          <Reveal variant="scale" delay={180} className="relative min-w-0">
            <div className="mb-3">
              <ExamCountdown />
            </div>
            <ExamPreview />
          </Reveal>
        </div>

        {/* stat strip */}
        <div className="border-t border-line bg-paper">
          <div className="shell grid grid-cols-2 gap-6 py-7 sm:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <Stat key={point.label} value={point.value} label={point.label} />
            ))}
          </div>
        </div>
      </section>

      {/* credibility ticker */}
      <section className="border-y border-white/8 bg-night text-paper">
        <div className="marquee py-3.5">
          <div className="marquee-track items-center gap-10 text-[11.5px] text-paper/60">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={copy === 1}>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-jade-light" /> Independent · not affiliated with the CSC
                </span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span><strong className="font-semibold text-paper tabular">{PAPER_STATS.total}</strong> practice papers</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span><strong className="font-semibold text-paper tabular">{PAPER_STATS.questions.toLocaleString()}</strong> questions</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span>Sourced to csca.cn</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span>English &amp; 中文</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span>Test-client simulation</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
                <span>Free to start · no card</span>
                <span className="h-1 w-1 rounded-full bg-paper/25" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inside the app ───────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          index="01" eyebrow="Inside the app"
          title="It looks like the exam, because that matters."
          body="A calm, high-contrast interface with a fixed timer, a question palette, flags and diagrams exactly where they should be — so exam day feels familiar."
          action={
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-vermillion"
            >
              Try a free paper <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          {/* product mockup */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p className="text-[12px] font-medium text-ink">Mathematics · Mock 01</p>
                <p className="text-[10px] text-ink-faint">48 questions · 60 minutes</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-vermillion px-2.5 py-1 text-[12px] font-medium text-paper tabular">
                <Clock3 className="h-3 w-3" /> 24:18
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-ink px-2 py-1 text-[10.5px] font-medium text-paper">
                  Question 14 of 48
                </span>
                <span className="inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">
                  <Flag className="h-3 w-3" /> Flag for review
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-ink">
                The graph shows y = x² − 2x − 3. What are the x-intercepts?
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                <img
                  src="/figures/original/math-fig-13-parabola2.svg"
                  alt="Parabola diagram"
                  className="mx-auto max-h-[150px] w-auto"
                />
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  "x = 1 and x = 3",
                  "x = −1 and x = 3",
                  "x = −3 and x = 1",
                  "x = 0 and x = 3",
                ].map((option, optionIndex) => (
                  <div
                    key={option}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px]",
                      optionIndex === 1
                        ? "border-vermillion/50 bg-vermillion/6 text-ink"
                        : "border-line text-ink-soft",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border text-[9px] font-semibold",
                        optionIndex === 1
                          ? "border-vermillion bg-vermillion text-paper"
                          : "border-line-strong text-ink-faint",
                      )}
                    >
                      {["A", "B", "C", "D"][optionIndex]}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* feature rail */}
          <div className="space-y-3">
            {[
              {
                icon: Clock3,
                tone: "bg-indigo-soft text-indigo",
                title: "Server-anchored timer",
                body: "A refresh cannot buy time. The paper auto-submits at zero.",
              },
              {
                icon: Grid3x3,
                tone: "bg-blue-50 text-vermillion",
                title: "Question palette",
                body: "Answered, unanswered and flagged — visible at a glance.",
              },
              {
                icon: ImageIcon,
                tone: "bg-jade-soft text-jade",
                title: "Figures that enlarge",
                body: "Tap any diagram to open it full-screen and read the detail.",
              },
              {
                icon: Sparkles,
                tone: "bg-gold-soft text-gold-deep",
                title: "Instant explanations",
                body: "Every answer is marked and explained the moment you submit.",
              },
            ].map((item) => (
              <div key={item.title} className="panel card-elevate flex items-start gap-3.5 p-4">
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", item.tone)}>
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Figure gallery ───────────────────────────────────── */}
      <section className="border-y border-line bg-card/60 py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="Figures & diagrams"
            title="Diagrams, not walls of text."
            body="Venn diagrams, parabolas, circuits, particle models and distributions — because a picture often explains a concept faster than a paragraph. Every figure-based question mirrors the real exam style."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { src: "/figures/original/math-fig-01-venn.svg", label: "Sets & Venn" },
              { src: "/figures/original/math-fig-13-parabola2.svg", label: "Functions" },
              { src: "/figures/original/math-fig-06-vectors.svg", label: "Vectors" },
              { src: "/figures/original/phys-fig-08-circuit.svg", label: "Circuits" },
              { src: "/figures/original/chem-fig-01-particles.svg", label: "Particles" },
              { src: "/figures/original/math-fig-10-normal.svg", label: "Distributions" },
            ].map((figure) => (
              <figure
                key={figure.src}
                className="overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="grid place-items-center p-2">
                  <img src={figure.src} alt={figure.label} className="h-24 w-auto object-contain" />
                </div>
                <figcaption className="border-t border-line bg-paper px-2 py-1.5 text-center text-[10px] text-ink-faint">
                  {figure.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-1.5 text-[11px] text-ink-faint">
            <Check className="h-3.5 w-3.5 text-jade" /> Figure questions appear across every
            practice set in Mathematics, Physics and Chemistry.
          </p>
        </div>
      </section>

      {/* ── What the exam is ─────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          index="02" eyebrow="The exam"
          title="One test, five subjects, a hundred-point scale."
          body="The China Scholastic Competency Assessment is organised by the China Scholarship Council and recognised by 300+ universities. It is required for Chinese Government Scholarship applicants and for Chinese-taught programmes; every other requirement is set by the receiving university."
          action={
            <Link
              href="/csca"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-vermillion"
            >
              Full exam guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="min-w-0 space-y-4">
            <Reveal variant="left" className="panel p-4 sm:p-5">
              <TimetableFigure block={nextSitting().block} />
            </Reveal>
            <Reveal delay={90} className="grid grid-cols-3 gap-2.5">
              {[
                ["5", "subjects"],
                ["0–100", "per subject"],
                ["2 yrs", "validity"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-line bg-card px-3 py-3 text-center shadow-xs">
                  <p className="font-display text-xl font-bold leading-none text-ink tabular">{value}</p>
                  <p className="mt-1.5 text-[10px] font-medium tracking-[0.08em] text-ink-faint uppercase">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              icon: Target,
              tone: "bg-blue-50 text-vermillion",
              title: "Mathematics is mandatory",
              body: "Every applicant sits Maths. Physics and Chemistry depend on your programme — science, engineering, agriculture and medicine usually need at least one.",
            },
            {
              icon: Languages,
              tone: "bg-indigo-soft text-indigo",
              title: "Professional Chinese",
              body: "Humanities or STEM stream. Compulsory for CGS applicants and Chinese-taught degrees; some universities waive it for English-taught programmes — confirm in writing.",
            },
            {
              icon: Clock3,
              tone: "bg-gold-soft text-gold-deep",
              title: "90 + 60 + 60 + 60",
              body: "90 minutes for Professional Chinese, 60 for each fundamental subject. All single-answer multiple choice.",
            },
            {
              icon: GraduationCap,
              tone: "bg-jade-soft text-jade",
              title: "Percentile matters",
              body: "Institutions read standing alongside the raw score. Our dashboard shows a modelled percentile, labelled as an estimate.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="panel card-elevate p-4">
              <div className="flex items-start gap-3">
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", item.tone)}>
                  <item.icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">{item.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      {/* ── Simulator (dark) ─────────────────────────────────── */}
      <section className="bg-night text-paper">
        <div className="shell py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              <Eyebrow className="text-paper/70">The simulator</Eyebrow>
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

            <div className="relative min-w-0">
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
                        option.state === "correct" && "border-emerald-500/40 bg-emerald-500/10 text-paper",
                        option.state === "wrong" && "border-rose-500/40 bg-rose-500/10 text-paper/90",
                        option.state === "muted" && "border-paper/10 text-paper/50",
                      )}
                    >
                      <span>{option.text}</span>
                      {option.state === "correct" && (
                        <span className="text-[10px] tracking-wide text-jade-light uppercase">Correct</span>
                      )}
                      {option.state === "wrong" && (
                        <span className="text-[10px] tracking-wide text-rose-400 uppercase">
                          Your answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-paper/10 bg-paper/[0.03] p-3">
                  <p className="text-[10px] tracking-[0.14em] text-paper/70 uppercase">Working</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-paper/70">
                    Power rule: d/dx (axⁿ) = a·n·xⁿ⁻¹. Here a = 9 and n = 5, so the derivative is
                    45x⁴.
                  </p>
                  <p className="mt-2 text-[11px] text-vermillion-light">
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="order-2 min-w-0 lg:order-1">
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
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      {/* ── Statement band ───────────────────────────────────── */}
      <PullBand
        figure="75s"
        figureLabel="per question, on the tightest paper"
        statement="No negative marking. A blank is strictly worse than a guess."
        detail="48 questions in 60 minutes is 75 seconds each, reading included. The paper never pauses, never warns, and submits itself at zero — which is why we rehearse the clock, not just the content."
        href="/app/mocks"
        cta="Sit one on the clock"
      />

      {/* ── Scholarships & requirements ─────────────────────── */}
      <section className="border-y border-line bg-card/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            index="03" eyebrow="Apply smarter"
            title="Know your subjects. Then know your funding."
            body="The two things the official site makes you hunt for: which CSCA papers your programme needs, and which scholarship can actually fund your degree."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-line bg-card p-6 sm:p-7">
              <Eyebrow>University requirements</Eyebrow>
              <h3 className="mt-3 font-display text-2xl text-ink">Which papers your major needs</h3>
              <ul className="mt-4 space-y-2.5 text-[13px] text-ink-soft">
                {[
                  ["Engineering & tech", "Maths + Physics"],
                  ["Medicine, pharmacy, chemistry", "Maths + Chemistry"],
                  ["Economics, business, humanities, law", "Maths only (+ Chinese if taught in Chinese)"],
                  ["English-taught degree (non-CGS waiver)", "Maths (+ science); CGS still requires Chinese"],
                ].map(([group, rule]) => (
                  <li
                    key={group}
                    className="flex flex-col gap-0.5 border-b border-line/70 pb-2.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                  >
                    <span className="min-w-0">{group}</span>
                    <span className="font-medium text-ink sm:max-w-[56%] sm:text-right">{rule}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/requirements"
                className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-vermillion hover:underline"
              >
                Full requirements guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-paper sm:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(37,99,235,0.35),transparent_65%)]" />
              <div className="relative min-w-0">
                <Eyebrow className="text-paper/70">Scholarships</Eyebrow>
                <h3 className="mt-3 font-display text-2xl text-paper">From CGS to provincial grants</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-paper/70">
                  The Chinese Government Scholarship covers tuition, housing, a monthly stipend and
                  medical insurance. Provincial, city and university awards sit on top — and a strong
                  CSCA score strengthens every application.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 text-paper/80">
                  {[
                    ["¥2,500", "monthly undergraduate stipend"],
                    ["2", "main CGS application routes"],
                    ["100%", "tuition covered on full CGS"],
                  ].map(([value, label]) => (
                    <div key={label} className="border-t border-paper/15 pt-2">
                      <p className="font-display text-2xl text-paper">{value}</p>
                      <p className="text-[11px] text-paper/50">{label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/scholarships"
                  className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12.5px] font-medium text-paper"
                >
                  Explore scholarships <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          index="04" eyebrow="Syllabus"
          title="Five subjects. The official topic list, in plain language."
          body="Not a PDF you scroll through at midnight. A navigable tree with weights, so you know where the marks live."
        />

        <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject, index) => {
            const subjectBadge =
              subject.code === "MATH"
                ? "bg-blue-50 text-vermillion border-blue-200/70"
                : subject.code === "PHYS"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                  : subject.code === "CHEM"
                    ? "bg-amber-50 text-amber-700 border-amber-200/70"
                    : "bg-indigo-50 text-indigo border-indigo-200/70";
            return (
              <Link
                key={subject.code}
                href={`/syllabus/${subject.code.toLowerCase()}`}
                className={cn(
                  "group panel card-elevate flex flex-col justify-between p-5",
                  index === 0 && "lg:col-span-2 lg:flex-row lg:items-center lg:gap-8",
                )}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-chinese text-[12px] font-semibold",
                        subjectBadge,
                      )}
                    >
                      {subject.nameZh}
                    </span>
                    <span className="text-[10.5px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                      {subject.kind === "CHINESE" ? "Professional Chinese" : "Fundamental"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-vermillion">
                    {subject.nameEn}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-ink-soft">
                    {subject.blurbEn}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 lg:mt-0 lg:flex-col lg:items-end">
                  <span className="rounded-lg border border-line bg-paper px-2.5 py-1 text-[11.5px] text-ink-soft">
                    <span className="font-semibold text-ink tabular">{subject.questionCount}</span>{" "}
                    questions
                  </span>
                  <span className="rounded-lg border border-line bg-paper px-2.5 py-1 text-[11.5px] text-ink-soft">
                    <span className="font-semibold text-ink tabular">{subject.durationMin}</span>{" "}
                    minutes
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-ink-faint transition group-hover:text-vermillion lg:ml-0 lg:mt-1" />
                </div>
              </Link>
            );
          })}

          <div className="panel flex flex-col justify-between bg-ink p-5 text-paper">
            <div>
              <Eyebrow className="text-paper/70">Official source</Eyebrow>
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead
              index="05" eyebrow="How it works"
              title="Three steps, then repeat until the paper feels boring."
              body="No 40-hour video course. Practice the way the exam tests you, then fix what breaks."
            />
            <div className="space-y-6">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-5">
                  <span className="font-display text-3xl text-vermillion tabular">
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
        <div className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-card p-6 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Why trust us</Eyebrow>
            <h2 className="display-md mt-4 text-balance">
              Independent, sourced, and honest about what we do not know.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              {SITE.name} is not affiliated with the China Scholarship Council. We do not sell
              exam registrations, results, or guarantees. Free study content stays free; Pro adds
              unlimited mock retakes, official sittings on the clock and a weak-topic study plan.
            </p>
            <div className="mt-6 space-y-2.5 text-[13px] text-ink-soft">
              {[
                "Format, fees and dates transcribed from official CSC notices",
                "Official past papers shared free — the real questions, the published answer keys and the working",
                `${PAPER_STATS.questions.toLocaleString()} questions in the bank, including 412 curated original items mapped to the published syllabus`,
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
              { value: "6×", label: "Sittings a year", note: "Jan · Mar · Apr · Jun · Nov · Dec" },
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const tones = [
              "bg-blue-50 text-vermillion",
              "bg-indigo-soft text-indigo",
              "bg-jade-soft text-jade",
              "bg-gold-soft text-gold-deep",
              "bg-blue-50 text-vermillion",
              "bg-jade-soft text-jade",
            ];
            return (
              <div key={feature.title} className="panel card-elevate p-6">
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl", tones[index % tones.length])}>
                  <feature.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Free tools ───────────────────────────────────────── */}
      <section className="shell pb-20 sm:pb-24" id="tools">
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
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Sample questions",
              body: "50 questions across all five subjects, with worked answers.",
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
              meta: `${GLOSSARY.length} terms`,
            },
            {
              title: "Guides",
              body: "Requirements, an 8-week plan, registration and scoring.",
              href: "/guides",
              meta: `${GUIDES.length} guides`,
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
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="panel flex flex-col justify-between p-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                  Free
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-ink">
                  ¥0 <span className="text-base font-normal text-ink-faint">forever</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-[13px] text-ink-soft">
                  {[
                    "25 full mocks (5 per subject, 2 attempts each)",
                    "All 21 official & review papers in Study mode",
                    "54 concept lessons, topic drills & review queue",
                    "Score history, topic breakdown & percentile estimate",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-ink text-[13px] font-semibold text-paper transition hover:bg-ink/85"
              >
                Create free account
              </Link>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-vermillion bg-gradient-to-b from-indigo-soft/45 to-white p-6 shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-vermillion uppercase">
                    Pro
                  </p>
                  <span className="rounded-full bg-vermillion px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    Most popular
                  </span>
                </div>
                <p className="mt-2 font-display text-4xl font-bold text-ink">
                  ¥99 <span className="text-base font-normal text-ink-faint">/ intake</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-[13px] text-ink-soft">
                  {[
                    `Unlimited attempts on all ${SITTABLE_PAPERS} mock papers`,
                    "Timed official & review past-paper sittings",
                    "Personalised study plan & full attempt history",
                    "Priority support",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-vermillion" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/pricing"
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-vermillion text-[13px] font-semibold text-white shadow-sm transition hover:bg-vermillion-deep"
              >
                Get Pro <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="shell py-20 sm:py-24" id="faq">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
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

      {/* ── Resource strip: internal links to the intent pages ── */}
      <section className="shell pb-20 sm:pb-24">
        <div className="rounded-2xl border border-line bg-paper-deep/40 p-5 sm:p-6">
          <p className="eyebrow">Everything about the CSCA</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            The exam guide, the rules that cancel scores, and the numbers universities actually read.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/csca", title: "CSCA exam guide", body: "Format, subjects, timetable, fees, myths." },
              { href: "/csca/faq", title: `${FAQ_TOTAL} CSCA answers`, body: "Eligibility, tickets, proctoring, penalties." },
              { href: "/csca/passing-score", title: "Passing score & scaling", body: "How 0–100 works; no national pass mark." },
              { href: "/test-day", title: "Test-day rules", body: "Windows-only, 20 Mbps, dual cameras, scratch tool." },
              { href: "/csca/universities", title: "University requirements", body: "Get the subject list in writing." },
              { href: "/exam-dates", title: "Dates & fees", body: "Six sittings, the two-day timetable." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-line bg-card px-3.5 py-3 transition hover:border-vermillion/40"
              >
                <p className="flex items-center justify-between gap-2 text-[12.5px] font-medium text-ink">
                  {item.title}
                  <ArrowRight className="h-3 w-3 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-vermillion" />
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-night text-paper">
        <div className="shell grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Eyebrow className="text-paper/70">Next sitting · {nextSitting().label}</Eyebrow>
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
              { icon: Timer, text: "Scores within 10 working days" },
              { icon: GraduationCap, text: "300+ universities accept CSCA" },
              { icon: ShieldCheck, text: "Register only at csca.cn" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2 border-t border-paper/15 pt-3">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-paper/70" />
                <p className="text-[12px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
