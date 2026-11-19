import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Clock3,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { JsonLd } from "@/components/seo/jsonld";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Pill, SectionHead, Stat } from "@/components/site/section";
import { pageMetadata } from "@/lib/seo";
import { SUBJECT_MAP } from "@/lib/exam";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA English-Taught Track — Mathematics, Physics & Chemistry",
  description:
    "Preparing for English-taught CSCA papers? Practise Mathematics, Physics and Chemistry in English with full-length mocks, syllabus drills and topic analytics (CGS applicants also sit Professional Chinese).",
  path: "/en",
  keywords: [
    "CSCA English track",
    "CSCA English mock test",
    "CSCA Mathematics Physics Chemistry English",
  ],
});

const EN_SUBJECTS = ["MATH", "PHYS", "CHEM"] as const;

const EN_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "CSCA English-taught preparation — Mathematics, Physics and Chemistry",
      description:
        "Exam-accurate preparation for the CSCA English-taught track: Mathematics, Physics and Chemistry papers in English, with full-length mock tests, official-format papers and topic-level analytics.",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      url: `${SITE.url}/en`,
      inLanguage: "en",
      isAccessibleForFree: true,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        instructor: { "@type": "Organization", name: SITE.name },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which CSCA papers do English-taught applicants sit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mathematics, Physics and Chemistry — each 48 single-answer questions in 60 minutes, scored 0–100. Many non-CGS English-taught programmes waive Professional Chinese, so this English track focuses on the three English-language papers (CGS applicants still sit Professional Chinese).",
          },
        },
        {
          "@type": "Question",
          name: "Can I take the CSCA in English?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mathematics, Physics and Chemistry are offered in Chinese and English. Professional Chinese is Chinese-only; applicants whose non-CGS English-taught programme waives it prepare only the three fundamental subjects.",
          },
        },
        {
          "@type": "Question",
          name: "What does CSCA Master include for the English track?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "English mock tests, official-format papers, syllabus-mapped practice questions, worked explanations, a server-anchored timer and topic-level analytics — all in English, with no Chinese-language content mixed in.",
          },
        },
      ],
    },
  ],
};

const RULES = [
  {
    icon: Clock3,
    title: "48 questions · 60 minutes",
    body: "Mathematics, Physics and Chemistry each run 48 single-answer questions in 60 minutes, scored 0–100.",
  },
  {
    icon: Languages,
    title: "English question text",
    body: "Every stem, option and worked solution is in English — exactly the language you sit on exam day.",
  },
  {
    icon: ShieldCheck,
    title: "English-language papers only",
    body: "Non-CGS English-taught programmes often waive 专业中文, so this track surfaces only English papers (CGS applicants still sit Professional Chinese).",
  },
];

export default function EnglishTrackPage() {
  return (
    <>
      <JsonLd data={EN_JSONLD} />

      {/* Hero */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#f6e7d5_0%,transparent_72%)]"
        />
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(211,29,60,0.16),transparent_62%)] blur-2xl"
        />

        <div className="shell relative grid grid-cols-1 items-center gap-8 pt-12 pb-14 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-20">
          <Reveal className="relative min-w-0">
            <Eyebrow>English-taught programmes · 英文授课</Eyebrow>
            <h1 className="display-xl mt-5 text-balance text-ink">
              The English-taught CSCA is three papers.
            </h1>
            <Reveal delay={120} as="p" className="lead mt-6 max-w-xl text-pretty">
              Mathematics, Physics and Chemistry — sat in English, built against the official 2025
              syllabus. Focused purely on the English-language papers (CGS applicants also confirm Professional Chinese).
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up?taught=EN"
                className="btn-sheen group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vermillion px-6 text-[14px] font-medium text-paper shadow-[0_2px_8px_rgba(168,16,48,0.25)] transition hover:-translate-y-0.5 hover:bg-vermillion-deep"
              >
                Start free — English track
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-6 text-[14px] font-medium text-ink transition hover:border-ink/30"
              >
                Explore the syllabus
              </Link>
            </Reveal>

            <Reveal delay={280} className="mt-8 flex flex-wrap gap-2">
              {EN_SUBJECTS.map((code) => (
                <Pill key={code} tone="line" className="px-3 py-1.5 text-[12.5px]">
                  {SUBJECT_MAP[code].nameEn}
                  <span className="ml-1 text-ink-faint">{SUBJECT_MAP[code].shortEn}</span>
                </Pill>
              ))}
            </Reveal>
          </Reveal>

          <Reveal variant="scale" delay={220} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div>
                  <p className="text-[13px] font-medium text-ink">Your paper set</p>
                  <p className="text-[10.5px] text-ink-faint">English-taught · fixed</p>
                </div>
                <span className="rounded-full bg-vermillion/8 px-2.5 py-1 text-[11px] font-medium text-vermillion-deep">
                  English only
                </span>
              </div>
              <div className="divide-y divide-line">
                {EN_SUBJECTS.map((code) => {
                  const subject = SUBJECT_MAP[code];
                  return (
                    <div key={code} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-deep text-ink">
                          <BookOpen className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <div>
                          <p className="text-[13.5px] font-medium text-ink">{subject.nameEn}</p>
                          <p className="text-[10.5px] text-ink-faint tabular">
                            {subject.questionCount} questions · {subject.durationMin} minutes
                          </p>
                        </div>
                      </div>
                      <span className="font-serif text-lg text-ink/30 tabular">0–100</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line bg-paper-deep/50 px-5 py-3 text-[11px] text-ink-faint">
                Professional Chinese (专业中文) is <span className="font-medium text-ink">not</span> in
                this English-only set — non-CGS English-taught programmes often waive it (CGS applicants still sit Professional Chinese separately).
              </div>
            </div>
          </Reveal>
        </div>

        {/* stat strip */}
        <div className="border-t border-line bg-card/60">
          <div className="shell grid grid-cols-2 gap-6 py-7 sm:grid-cols-4">
            <Stat value="3" label="Papers, all in English" />
            <Stat value="48" label="Questions per paper" />
            <Stat value="60" label="Minutes per paper" />
            <Stat value="0–100" label="Score scale" />
          </div>
        </div>
      </section>

      {/* What you sit */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          eyebrow="The rule"
          title="Three papers. Nothing else."
          body="For English-medium degrees the CSCA fundamental papers are offered in English, so this track carries only Mathematics, Physics and Chemistry — and keeps every question, option and solution in English."
        />
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {RULES.map((rule) => (
            <div key={rule.title} className="bg-paper p-6">
              <rule.icon className="h-5 w-5 text-vermillion" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-xl text-ink">{rule.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{rule.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="border-y border-line bg-card/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="The papers"
            title="Mathematics, Physics, Chemistry"
            body="Each paper mirrors the official format: 48 single-answer questions in 60 minutes, scored out of 100, with every answer mapped to the official syllabus."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {EN_SUBJECTS.map((code) => {
              const subject = SUBJECT_MAP[code];
              return (
                <Link
                  key={code}
                  href={`/syllabus/${code.toLowerCase()}`}
                  className="group panel card-elevate flex flex-col p-6 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-chinese text-lg text-vermillion">{subject.nameZh}</span>
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:text-vermillion" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-ink">{subject.nameEn}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{subject.blurbEn}</p>
                  <div className="mt-5 flex items-center gap-4 text-[12px] text-ink-faint">
                    <span>
                      <span className="font-medium text-ink tabular">{subject.questionCount}</span>{" "}
                      questions
                    </span>
                    <span>
                      <span className="font-medium text-ink tabular">{subject.durationMin}</span>{" "}
                      minutes
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boundary + cross-link */}
      <section className="shell py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-7">
            <Eyebrow>Clear boundary</Eyebrow>
            <h2 className="display-md mt-4 text-balance text-ink">
              You will not see a Chinese paper here.
            </h2>
            <ul className="mt-6 space-y-3 text-[13.5px] text-ink-soft">
              {[
                "No Professional Chinese (文科中文 / 理科中文)",
                "No Chinese question text, options or solutions",
                "No Chinese-taught study plans or programme labels",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-paper">
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(10,122,83,0.35),transparent_65%)]" />
            <div className="relative">
              <Eyebrow className="text-paper/70">The other track</Eyebrow>
              <h2 className="display-md mt-4 text-balance text-paper">
                Chinese-taught? Your papers are different.
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-paper/70">
                Chinese-taught and CGS applicants sit a Professional Chinese paper — 文科中文 for
                humanities, 理科中文 for STEM — alongside Mathematics (and science electives where
                required).
              </p>
              <Link
                href="/cn"
                className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-paper px-4 text-[12.5px] font-medium text-ink transition hover:bg-paper/90"
              >
                Go to the Chinese-taught track <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-paper-deep/50 py-20 sm:py-24">
        <div className="shell text-center">
          <h2 className="display-lg mx-auto max-w-2xl text-balance text-ink">
            Start with a free English mock — 48 questions, 60 minutes.
          </h2>
          <p className="lead mx-auto mt-4 max-w-xl">
            No card required. See your score, the topic breakdown and the worked solution for every
            question.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up?taught=EN"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-vermillion px-6 text-[14px] font-medium text-paper transition hover:bg-vermillion-deep"
            >
              Create a free account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/free-exam"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-card px-6 text-[14px] font-medium text-ink transition hover:border-ink/30"
            >
              Try a 10-question mock
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
