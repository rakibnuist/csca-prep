import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Clock3,
  FileText,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { Eyebrow, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { PaperAnatomy } from "@/components/marketing/paper-anatomy";
import { PaperStacks } from "@/components/marketing/paper-stacks";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";
import { PAPER_STATS, SITTABLE_PAPERS } from "@/lib/paper-stats";

export const metadata: Metadata = pageMetadata({
  title: `CSCA mock tests — ${PAPER_STATS.total} full-length papers`,
  description:
    "Sit full-length CSCA mock papers under the real format (48 questions in 60 min; 80 in 90 min for Professional Chinese), scored 0–100 with a topic breakdown. Start free, no card.",
  path: "/mocks",
  // This segment ships its own opengraph-image.tsx.
  image: null,
  keywords: [
    "CSCA mock test",
    "CSCA practice papers",
    "CSCA mock exam",
    "CSCA timed practice",
    "CSCA practice test free",
    "CSCA 模拟考试",
  ],
});

const FAQ = [
  {
    q: "How many CSCA mock papers are there?",
    a: `${PAPER_STATS.total} in total. ${PAPER_STATS.originals} original mock papers — one per subject, every question written from scratch — plus ${PAPER_STATS.sets} practice sets assembled from the question bank, thirty per subject. We also publish ${PAPER_STATS.official + PAPER_STATS.review} official past papers and review modules, which are listed separately because they are the real sittings rather than our own.`,
  },
  {
    q: "Is the format exactly the real exam?",
    a: "Yes. Mathematics, Physics and Chemistry are 48 single-answer questions in 60 minutes. Both Professional Chinese papers are 80 questions in 90 minutes, with all six official item types represented: character recognition, word-filling, word discrimination, paragraph completion, sentence completion and reading comprehension.",
  },
  {
    q: "What do I get when I finish a paper?",
    a: "A score on the official 0–100 scale, a percentile estimate, and a topic breakdown showing where the marks leaked. Every question can be reopened with the working shown.",
  },
  {
    q: "Is the percentile official?",
    a: "No. It is a modelled estimate from your raw score, and it is labelled as an estimate everywhere it appears. We do not have cohort data, so we do not pretend to.",
  },
  {
    q: "Can I try one before creating an account?",
    a: "Yes — a ten-question free mock test and fifty sample questions, both without an account. A free account then gives you two timed attempts on each of the 25 free mock papers (5 per subject: the original paper plus sets 01–04, 50 timed sittings) and Study Q&A on all 21 official and review papers.",
  },
  {
    q: "Do you sell the official past papers?",
    a: "No. You can preview transcribed questions and answers without an account, and a free account unlocks full Study Q&A and worked solutions across every official and review paper. Pro unlocks sitting them on a server-anchored exam timer.",
  },
];

export default function MocksProductPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Mock tests", path: "/mocks" }])} />
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden border-b border-line bg-night text-paper">
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(211,29,60,0.32),transparent_62%)] blur-3xl"
        />
        <div className="shell relative grid grid-cols-1 gap-10 py-14 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="min-w-0">
            <Eyebrow className="text-paper/70">Mock tests</Eyebrow>
            <h1 className="display-lg mt-4 max-w-2xl text-balance text-paper">
              {PAPER_STATS.total} full-length CSCA papers. Sit one on the clock.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/65">
              Exact format, exact timings, instant scoring. Finish a paper and you get a 0–100
              score, a percentile estimate and a topic breakdown that shows you where the marks
              leaked — not just what you scored.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/sign-up"
                className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vermillion px-6 text-[14px] font-medium text-paper transition hover:-translate-y-0.5 hover:bg-vermillion-deep"
              >
                Start a free mock <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/free-exam"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-paper/25 bg-transparent px-6 text-[14px] font-medium text-paper transition hover:border-paper/50"
              >
                Try the 10-question preview
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-paper/55">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-jade-light" /> No card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-jade-light" /> 48 or 80 Q · 60 or 90 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-jade-light" /> Instant scoring
              </span>
            </div>
          </Reveal>

          {/* format card */}
          <Reveal variant="scale" delay={160} className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
            <p className="eyebrow text-paper/60">The format</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { value: "48 / 80", label: "questions", note: "stem / chinese" },
                { value: "60 / 90", label: "minutes", note: "no pause" },
                { value: "0–100", label: "score", note: "no negative marking" },
                { value: "5", label: "subjects", note: "official formats" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-3xl text-paper tabular">{item.value}</p>
                  <p className="mt-0.5 text-[12px] font-medium text-paper">{item.label}</p>
                  <p className="text-[11px] text-paper/50">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-white/12 pt-4 text-[12px] text-paper/65">
              {[
                "The timer starts when you start and does not stop.",
                "Refresh the page and your answers are still there.",
                "When the clock reaches zero the paper submits itself.",
              ].map((line) => (
                <p key={line} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade-light" />
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What's inside ─────────────────────────────────────────────── */}
      {/* ── Paper anatomy ─────────────────────────────────────────────── */}
      <section className="shell overflow-x-clip py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <SectionHead
              index="01"
              eyebrow="Anatomy"
              title="Sixty minutes is not sixty minutes."
              body="A paper of 48 questions has three different jobs in it, and they need different speeds. The first pass is fast and mechanical; the last fifteen minutes are the only ones where you should be thinking hard. The diagram is the plan we teach."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                ["48 × 75s", "fundamental papers"],
                ["80 × 67.5s", "Professional Chinese"],
                ["0–100", "no negative marking"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-line bg-card px-3 py-2">
                  <p className="font-serif text-lg leading-none text-ink">{value}</p>
                  <p className="mt-1 text-[10px] tracking-[0.08em] text-ink-faint uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal variant="right" className="min-w-0">
            <PaperAnatomy questions={48} minutes={60} />
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <SectionHead
          index="02"
          eyebrow="What is inside"
          title="Three kinds of paper, and they are not the same thing."
          body="The distinction matters: one is our own work, one is the real exam, and one is a module we rebuilt from official material."
        />
        <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-ink-soft">
          Not sure which papers your degree needs? The{" "}
          <Link href="/csca/programmes" className="font-medium text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
            programme guides
          </Link>{" "}
          cover MBBS, engineering, computer science, business, architecture, law and Chinese language.
        </p>

        <figure className="mx-auto mt-8 max-w-[560px] rounded-2xl border border-line bg-card px-6 py-5">
          <PaperStacks />
          <figcaption className="mt-1 text-center text-[10.5px] leading-relaxed text-ink-faint">
            Three kinds of paper: our own originals, bank-assembled practice sets, and transcriptions
            of the real sittings.
          </figcaption>
        </figure>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: Play,
              badge: `${PAPER_STATS.originals} papers`,
              title: "Original mock papers",
              body: "One per subject. Every question written from scratch against the published syllabus, calibrated so the difficulty ramp matches the real paper.",
              href: "/app/mocks",
              cta: "Sit one",
            },
            {
              icon: FileText,
              badge: `${PAPER_STATS.sets} papers`,
              title: "Practice sets",
              body: "Full-length papers assembled from the question bank, thirty per subject. Same format, endless reps, one click apart.",
              href: "/app/mocks?tab=sets",
              cta: "Browse the sets",
            },
            {
              icon: BookOpen,
              badge: `${PAPER_STATS.official + PAPER_STATS.review} papers`,
              title: "Official & review papers",
              body: `${PAPER_STATS.official} real sittings plus ${PAPER_STATS.review} reconstructed review sets, with answer keys and worked explanations. Study mode is free with an account; Pro unlocks timed sitting.`,
              href: "/question-papers",
              cta: "Open the archive",
            },
          ].map((card) => (
            <div key={card.title} className="panel card-elevate flex flex-col p-6">
              <div className="flex items-center justify-between">
                <card.icon className="h-5 w-5 text-vermillion" strokeWidth={1.7} />
                <span className="rounded-full bg-paper-deep px-2.5 py-0.5 text-[10.5px] font-medium text-ink-soft">
                  {card.badge}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{card.body}</p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-indigo transition hover:gap-2.5"
              >
                {card.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── After the paper ───────────────────────────────────────────── */}
      <section className="border-y border-line bg-paper-deep/40">
        <div className="shell grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="min-w-0">
            <SectionHead
              eyebrow="After the paper"
              title="A score tells you what happened. A topic map tells you why."
              body="The breakdown is the product. It is where the next hour of your revision goes."
            />
            <Link
              href="/sign-up"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-vermillion px-5 text-[13.5px] font-medium text-paper transition hover:bg-vermillion-deep"
            >
              Sit a paper and see <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Topic breakdown",
                body: "Every question carries one syllabus topic, so you can see the exact strands that cost you marks.",
              },
              {
                icon: BarChart3,
                title: "Score trend",
                body: "Your last attempts on one chart, so improvement is visible rather than assumed.",
              },
              {
                icon: Timer,
                title: "Readiness score",
                body: "A single number combining performance, coverage and volume — for deciding what to sit next.",
              },
              {
                icon: Sparkles,
                title: "Next action",
                body: "The weakest topic you have not touched is recommended next, and the smart-review queue brings back what you got wrong.",
              },
            ].map((item) => (
              <div key={item.title} className="panel card-elevate p-5">
                <item.icon className="h-4.5 w-4.5 text-vermillion" strokeWidth={1.7} />
                <h3 className="mt-3 text-[14px] font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ──────────────────────────────────────────────────── */}
      <section className="shell py-16 sm:py-20">
        <SectionHead
          eyebrow="Subjects"
          title="All five, in the official formats."
          body="Pick one subject or sit them all. Mathematics is mandatory; the rest depend on your programme."
        />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <div key={subject.code} className="panel card-elevate p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{subject.nameEn}</h3>
                <span className="font-chinese text-sm text-ink-faint">{subject.nameZh}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-faint">
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {subject.questionCount} questions
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3 w-3" /> {subject.durationMin} min
                </span>
                <span>{subject.language === "zh" ? "Chinese only" : "EN / 中文"}</span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{subject.blurbEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Free vs Pro ───────────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper-deep/40">
        <div className="shell py-16 sm:py-20">
          <SectionHead
            eyebrow="Free vs Pro"
            title="The free tier is not a trial. It is the product."
            body="Two attempts on 25 mock papers (5 per subject), all 54 concept lessons, every topic drill, and Study mode on all 21 official & review papers — free, with no card and no expiry."
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="panel card-elevate p-6">
              <p className="eyebrow">Free</p>
              <p className="mt-2 font-display text-2xl text-ink">¥0 · forever</p>
              <ul className="mt-5 space-y-2.5 text-[12.5px] text-ink-soft">
                {[
                  "2 attempts on each of the 5 original mock papers",
                  "2 attempts on practice sets 01–04 of every subject (5 free mocks/subject)",
                  "All 54 concept lessons",
                  "Every topic drill, quick 10 and smart review",
                  "All 21 official past papers and review sets — study mode",
                  "Score, percentile estimate and topic breakdown on every attempt",
                  "Syllabus, exam dates, requirements and scholarships guides",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-line-strong text-[12.5px] font-medium text-ink transition hover:border-ink/30"
              >
                Create a free account <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-vermillion/25 bg-vermillion/5 p-6">
              <p className="eyebrow text-vermillion">Pro</p>
              <p className="mt-2 font-display text-2xl text-ink">¥99 · per admission cycle</p>
              <ul className="mt-5 space-y-2.5 text-[12.5px] text-ink-soft">
                {[
                  `Unlimited attempts on all ${SITTABLE_PAPERS} mock papers`,
                  "Sit the official past papers on the clock, scored against the published key",
                  "Unlimited attempts on every official paper and review set",
                  "Full attempt history beyond your most recent 10 papers",
                  "A personalised study plan generated from your weak topics",
                  "Priority support",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
              >
                See pricing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-ink-soft">
                Pro is activated with a code. If you have one, redeem it on the Billing page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="shell py-16 sm:py-20">
        <SectionHead eyebrow="Questions" title="Before you start." />
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
          {FAQ.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13.5px] font-medium text-ink">
                {item.q}
                <span className="text-ink-faint transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-night text-paper">
        <div className="shell py-16 text-center sm:py-20">
          <h2 className="display-md mx-auto max-w-2xl text-balance">
            Find out what you would actually score.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-paper/70">
            One paper. Exam conditions. A number you can trust, and a list of what to fix. Free
            account, no card.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vermillion px-6 text-[14px] font-medium text-paper transition hover:bg-vermillion-deep"
            >
              Start a free mock <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-paper/25 px-6 text-[14px] font-medium text-paper transition hover:border-paper/50"
            >
              Compare Free and Pro
            </Link>
          </div>
          <p className="mt-6 text-[11.5px] text-paper/60">
            {SITE.name} is independent and not affiliated with the China Scholarship Council.
            Registration and results are handled on csca.cn.
          </p>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="rounded-2xl border border-line bg-paper-deep/40 p-5 sm:p-6">
          <p className="eyebrow">By subject</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            What each paper contains, its topic list, worked samples and the papers in that subject.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["/mocks/mathematics", "Mathematics", "48 · 60 min"],
              ["/mocks/physics", "Physics", "48 · 60 min"],
              ["/mocks/chemistry", "Chemistry", "48 · 60 min"],
              ["/mocks/chinese-humanities", "Humanities 中文", "80 · 90 min"],
              ["/mocks/chinese-stem", "STEM 中文", "80 · 90 min"],
            ].map(([href, label, meta]) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-line bg-card px-3.5 py-3 transition hover:border-vermillion/40"
              >
                <p className="text-[12.5px] font-medium text-ink">{label}</p>
                <p className="mt-0.5 text-[10.5px] text-ink-faint tabular">{meta}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
