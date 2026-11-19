import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Languages,
  ScrollText,
} from "lucide-react";
import { JsonLd } from "@/components/seo/jsonld";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { pageMetadata } from "@/lib/seo";
import { SUBJECT_MAP } from "@/lib/exam";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA Chinese-Taught Track — 文科中文 / 理科中文 + 数学",
  description:
    "Applying to a Chinese-taught degree in China? Sit Professional Chinese (文科中文 or 理科中文) plus Mathematics. Free mock tests, official-format papers and topic analytics for the Chinese-taught CSCA track.",
  path: "/cn",
  keywords: [
    "CSCA Chinese track",
    "CSCA Professional Chinese",
    "文科中文 理科中文 CSCA",
  ],
});

const CN_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "CSCA Chinese-taught preparation — Professional Chinese + Mathematics",
      description:
        "Exam-accurate preparation for the CSCA Chinese-taught track: Professional Chinese (文科中文 humanities or 理科中文 STEM) plus Mathematics, with Physics and Chemistry for the STEM stream.",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      url: `${SITE.url}/cn`,
      inLanguage: "zh",
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
          name: "Which CSCA papers do Chinese-taught applicants sit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Professional Chinese (文科中文 for humanities or 理科中文 for STEM) plus Mathematics. STEM-stream applicants also prepare Physics and Chemistry. Every paper is sat in Chinese.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between 文科中文 and 理科中文?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both are 80 questions in 90 minutes. 文科中文 (Humanities) covers literature, philosophy, law, education and history. 理科中文 (STEM) covers maths, physics and chemistry terminology, lab language and academic reading.",
          },
        },
        {
          "@type": "Question",
          name: "Is Professional Chinese required?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes for Chinese Government Scholarship applicants and Chinese-taught programmes. It is Chinese-only, with no English version, so it is the paper that defines the Chinese-taught track.",
          },
        },
      ],
    },
  ],
};

const PROGRAMMES = [
  {
    key: "HUMANITIES" as const,
    name: "文科 · Humanities",
    paper: "文科中文",
    subjects: ["CH_HUM", "MATH"] as const,
    body: "Literature, philosophy, law, education, history and the arts. Your Professional Chinese paper is 文科中文, plus Mathematics.",
  },
  {
    key: "STEM" as const,
    name: "理科 · STEM",
    paper: "理科中文",
    subjects: ["CH_SCI", "MATH", "PHYS", "CHEM"] as const,
    body: "Science, engineering, medicine and agriculture. Your Professional Chinese paper is 理科中文, plus Mathematics, Physics and Chemistry.",
  },
];

export default function ChineseTrackPage() {
  return (
    <>
      <JsonLd data={CN_JSONLD} />

      {/* Hero */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#e3efe7_0%,transparent_72%)]"
        />
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(10,122,83,0.18),transparent_62%)] blur-2xl"
        />

        <div className="shell relative grid grid-cols-1 items-center gap-8 pt-12 pb-14 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-20">
          <Reveal className="relative min-w-0">
            <Eyebrow>Chinese-taught programmes · 中文授课</Eyebrow>
            <h1 className="display-xl mt-5 text-balance text-ink">
              专业中文 + 数学。<br />
              <span className="text-jade">Two streams, one track.</span>
            </h1>
            <Reveal delay={120} as="p" className="lead mt-6 max-w-xl text-pretty">
              Chinese-taught applicants sit a Professional Chinese paper plus Mathematics. Choose
              your stream — 文科 humanities or 理科 STEM — and we show you only the papers that matter.
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up?taught=CN"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-jade px-6 text-[14px] font-medium text-paper shadow-[0_2px_8px_rgba(8,99,68,0.25)] transition hover:-translate-y-0.5 hover:bg-jade/90"
              >
                Start free — Chinese track
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-6 text-[14px] font-medium text-ink transition hover:border-ink/30"
              >
                查看大纲 · Explore the syllabus
              </Link>
            </Reveal>

            <Reveal delay={280} className="mt-8 flex flex-wrap gap-2">
              <Pill tone="jade" className="px-3 py-1.5 text-[12.5px]">
                文科中文 · Humanities
              </Pill>
              <Pill tone="jade" className="px-3 py-1.5 text-[12.5px]">
                理科中文 · STEM
              </Pill>
              <Pill tone="line" className="px-3 py-1.5 text-[12.5px]">
                数学 · Mathematics
              </Pill>
            </Reveal>
          </Reveal>

          <Reveal variant="scale" delay={220} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div>
                  <p className="text-[13px] font-medium text-ink">Pick your stream</p>
                  <p className="text-[10.5px] text-ink-faint">Your paper set follows</p>
                </div>
                <span className="rounded-full bg-jade-soft px-2.5 py-1 text-[11px] font-medium text-jade">
                  中文 only
                </span>
              </div>
              <div className="divide-y divide-line">
                {PROGRAMMES.map((programme) => (
                  <div key={programme.key} className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[13.5px] font-medium text-ink">{programme.name}</p>
                      <span className="font-chinese text-jade">{programme.paper}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {programme.subjects.map((code) => (
                        <span
                          key={code}
                          className="rounded-md border border-line bg-paper-deep/60 px-2 py-0.5 text-[11px] text-ink-soft"
                        >
                          {SUBJECT_MAP[code].nameZh}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-line bg-paper-deep/50 px-5 py-3 text-[11px] text-ink-faint">
                80 questions in 90 minutes for Professional Chinese · 48 in 60 for the fundamentals
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programme split */}
      <section className="shell py-20 sm:py-24">
        <SectionHead
          eyebrow="Choose your stream"
          title="文科 or 理科 — the split that decides your paper."
          body="Professional Chinese has two versions, and they are different exams. Pick the stream your degree belongs to, and the rest of the track follows automatically."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {PROGRAMMES.map((programme) => (
            <div key={programme.key} className="panel flex flex-col p-7">
              <div className="flex items-center justify-between">
                <Eyebrow>{programme.name}</Eyebrow>
                <span className="font-chinese text-2xl text-jade">{programme.paper}</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{programme.body}</p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
                  Your papers
                </p>
                <div className="mt-2 space-y-2">
                  {programme.subjects.map((code) => {
                    const subject = SUBJECT_MAP[code];
                    return (
                      <div key={code} className="flex items-center justify-between gap-2">
                        <span className="min-w-0 flex-1 text-[13.5px] font-medium text-ink">
                          {subject.nameZh} · {subject.nameEn}
                        </span>
                        <span className="shrink-0 text-[11px] text-ink-faint tabular">
                          {subject.questionCount} 题 · {subject.durationMin} 分钟
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="border-y border-line bg-card/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="The papers"
            title="80 in 90 · 48 in 60 — in Chinese."
            body="Professional Chinese is the defining paper of this track: 80 single-answer questions in 90 minutes, Chinese-only, scored 0–100."
          />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              {
                icon: Clock3,
                title: "80 questions · 90 minutes",
                body: "Professional Chinese (文科中文 / 理科中文) is the longest paper on the exam.",
              },
              {
                icon: Languages,
                title: "Chinese only",
                body: "There is no English version of Professional Chinese — the paper is Chinese by design.",
              },
              {
                icon: ScrollText,
                title: "Six item types",
                body: "Character recognition, word-filling, discrimination, paragraph completion, sentence completion and reading.",
              },
            ].map((rule) => (
              <div key={rule.title} className="bg-paper p-6">
                <rule.icon className="h-5 w-5 text-jade" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-xl text-ink">{rule.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundary + cross-link */}
      <section className="shell py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-7">
            <Eyebrow>Clear boundary</Eyebrow>
            <h2 className="display-md mt-4 text-balance text-ink">
              Only your stream&apos;s paper appears.
            </h2>
            <ul className="mt-6 space-y-3 text-[13.5px] text-ink-soft">
              {[
                "文科 applicants see 文科中文 + 数学 — never 理科中文",
                "理科 applicants see 理科中文 + 数学 + 物理 + 化学 — never 文科中文",
                "English-only papers stay in the English-taught track",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-paper">
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(211,29,60,0.35),transparent_65%)]" />
            <div className="relative">
              <Eyebrow className="text-paper/70">The other track</Eyebrow>
              <h2 className="display-md mt-4 text-balance text-paper">
                Non-CGS English-taught? Check for a waiver.
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-paper/70">
                Non-CGS English-taught programmes often waive Professional Chinese — confirm with
                admissions, and note that CGS applicants still sit Professional Chinese separately.
              </p>
              <Link
                href="/en"
                className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-paper px-4 text-[12.5px] font-medium text-ink transition hover:bg-paper/90"
              >
                Go to the English-taught track <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-paper-deep/50 py-20 sm:py-24">
        <div className="shell text-center">
          <h2 className="display-lg mx-auto max-w-2xl text-balance text-ink">
            从一张中文模拟卷开始。Start with a free Chinese mock.
          </h2>
          <p className="lead mx-auto mt-4 max-w-xl">
            No card required. Sit 80 in 90 or 48 in 60, then read the worked solution for every
            question — in Chinese.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up?taught=CN"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-jade px-6 text-[14px] font-medium text-paper transition hover:bg-jade/90"
            >
              创建免费账户 · Create a free account <ArrowRight className="h-4 w-4" />
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
