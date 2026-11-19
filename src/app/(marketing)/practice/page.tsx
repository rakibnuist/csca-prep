import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Layers, ShieldCheck } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";

export const metadata: Metadata = pageMetadata({
  title: "Free CSCA practice — questions with answers, no account",
  description:
    "Practise CSCA Mathematics, Physics, Chemistry and Professional Chinese free and without an account. Ten exam-style questions per subject with instant marking and worked explanations.",
  path: "/practice",
  keywords: [
    "CSCA practice",
    "CSCA practice questions",
    "free CSCA questions",
    "CSCA mathematics practice",
    "CSCA physics practice",
    "CSCA chemistry practice",
  ],
});

const PRACTICE_LINKS = [
  { slug: "mathematics", code: "MATH", label: "Mathematics" },
  { slug: "physics", code: "PHYS", label: "Physics" },
  { slug: "chemistry", code: "CHEM", label: "Chemistry" },
  { slug: "chinese-humanities", code: "CH_HUM", label: "Humanities Chinese" },
  { slug: "chinese-stem", code: "CH_SCI", label: "STEM Chinese" },
];

const FAQ = [
  {
    q: "Is the CSCA practice really free?",
    a: "Yes. Ten exam-style questions per subject are free and need no account. The full topic drills, spaced review and timed mock papers are in the app.",
  },
  {
    q: "Do I need to sign up to practise?",
    a: "No. The ten-question drills on each subject page run entirely in the browser. An account is only needed to save progress, sit full mocks and track mistakes.",
  },
  {
    q: "How many questions are on the real CSCA paper?",
    a: "Mathematics, Physics and Chemistry have 48 single-answer questions in 60 minutes. Both Professional Chinese papers have 80 questions in 90 minutes. Every paper is scored 0–100.",
  },
  {
    q: "Which subjects do I need?",
    a: "Mathematics is compulsory for everyone. Physics or Chemistry is required for science-related majors. Professional Chinese is compulsory for Chinese Government Scholarship (CGS) applicants and Chinese-taught programmes (some universities waive it for non-CGS English-taught programmes — confirm in writing).",
  },
];

export default function PracticeHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Practice", path: "/practice" }])} />
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
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Free practice · no account required</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Practise the CSCA before you commit to it.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Ten exam-style questions per subject, marked instantly with the working shown. Pick a
            subject to start — no sign-up, no timer, nothing saved.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>
              <ShieldCheck className="h-3 w-3" /> No account
            </Pill>
            <Pill>
              <Clock3 className="h-3 w-3" /> Instant marking
            </Pill>
            <Pill>
              <Layers className="h-3 w-3" /> 5 subjects
            </Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_LINKS.map((item) => {
            const subject = SUBJECTS.find((entry) => entry.code === item.code)!;
            return (
              <Link
                key={item.slug}
                href={`/practice/${item.slug}`}
                className="group rounded-xl border border-line bg-card p-4 transition hover:border-ink/30"
              >
                <p className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  {subject.kind === "FUNDAMENTAL" ? "Fundamental" : "Professional Chinese"}
                </p>
                <h2 className="mt-1 font-display text-lg text-ink">{item.label}</h2>
                <p className="mt-1 text-[11.5px] text-ink-soft">
                  {subject.questionCount} Q · {subject.durationMin} min · {subject.totalMarks} marks
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-ink group-hover:gap-1.5">
                  Start the free drill <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-paper-deep p-4">
          <p className="text-[13px] leading-relaxed text-ink-soft">
            Want a mixed preview instead?{" "}
            <Link href="/check" className="underline underline-offset-2 hover:text-ink">
              Take the 12-question weak-spot check
            </Link>{" "}
            for a score band and the topics costing you marks, or{" "}
            <Link href="/free-exam" className="underline underline-offset-2 hover:text-ink">
              the ten-question sample across all five subjects
            </Link>
            . When you are ready for timed full papers and topic-level drill,{" "}
            <Link href="/sign-up" className="underline underline-offset-2 hover:text-ink">
              create a free account
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-xl text-ink">How the free practice works</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["1", "Pick a subject", "Ten questions scoped to the paper you actually sit."],
              ["2", "Answer and check", "Instant marking, with the working shown every time."],
              ["3", "Move into the app", "Save progress, drill weak topics and sit a full mock."],
            ].map(([n, title, body]) => (
              <div key={n} className="rounded-xl border border-line bg-card p-4">
                <p className="font-mono text-[11px] text-ink-faint">{n}</p>
                <p className="mt-1 text-[13px] font-medium text-ink">{title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-xl text-ink">Frequently asked</h2>
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
    </>
  );
}
