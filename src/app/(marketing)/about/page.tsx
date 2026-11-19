import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Compass, Eye, FileWarning, Scale } from "lucide-react";
import { Eyebrow, SectionHead } from "@/components/site/section";
import { LeadForm } from "@/components/site/lead-form";
import { pageMetadata } from "@/lib/seo";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About CSCA Master",
  description:
    "Why we built an independent, exam-accurate CSCA preparation platform, how the content is sourced, and what we refuse to claim.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="min-w-0">
            <Eyebrow>About</Eyebrow>
            <h1 className="display-lg mt-4 max-w-2xl text-balance">
              A preparation platform built the way an exam should be studied.
            </h1>
            <p className="lead mt-5 max-w-xl">
              {SITE.name} exists because the CSCA is new, high-stakes, and most of what surrounds it
              online is either a PDF dump or a sales funnel. We wanted the opposite: a tool that
              measures you honestly and tells you what to fix.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-line bg-card p-5">
            <p className="eyebrow">Principles</p>
            <ul className="mt-3 space-y-2.5 text-[12.5px] text-ink-soft">
              {[
                "Exam fidelity beats gamification",
                "Estimates are labelled as estimates",
                "Official papers attributed, original work labelled, no fake testimonials",
                "Free tier must be genuinely useful",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vermillion" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Method"
              title="How the question bank is built."
              body="Every item follows the same pipeline, because a good explanation is worth more than ten extra questions."
            />
          </div>
          <div className="space-y-3">
            {[
              {
                icon: BookOpenCheck,
                title: "Start from the official outline",
                body: "We transcribe the published syllabus, map each topic, then write items that target one topic at a time. No orphan questions.",
              },
              {
                icon: Scale,
                title: "Calibrate the difficulty",
                body: "Each paper carries a mix of easy, medium and hard items. Distractors are designed around real mistakes — sign errors, unit slips, near-synonyms.",
              },
              {
                icon: Eye,
                title: "Explain the working",
                body: "Not “the answer is B”. The explanation shows the method, so a wrong answer teaches something.",
              },
              {
                icon: Compass,
                title: "Keep the interface honest",
                body: "Timings, counts and scoring mirror the published format: 48 questions in 60 minutes for the fundamental subjects, 80 in 90 for Professional Chinese. Where a transcription is partial, the card says how many of the official items it contains.",
              },
              {
                icon: FileWarning,
                title: "Label the provenance",
                body: `Official sittings are transcribed and attributed to the source sitting; reconstructed review modules are labelled as reconstructions; original papers say they are original. Nothing is passed off as official when it is not. If you hold the rights to a paper and want it removed, write to ${SITE.email} and we will take it down.`,
              },
            ].map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-xl border border-line bg-card p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-deep">
                  <step.icon className="h-4 w-4 text-ink" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-ink">
                    <span className="mr-1.5 text-ink-faint tabular">0{index + 1}</span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-line bg-paper-deep/50 p-6">
            <FileWarning className="h-5 w-5 text-ink-faint" />
            <h3 className="mt-3 font-display text-xl text-ink">What we are not</h3>
            <ul className="mt-3 space-y-2 text-[12.5px] text-ink-soft">
              <li>Not affiliated with the China Scholarship Council or CSCA.</li>
              <li>Not an agent: we do not apply to universities on your behalf.</li>
              <li>Not a guarantee: nobody can promise you a score.</li>
              <li>Not a data broker: we do not sell student details.</li>
            </ul>
          </div>

          <div className="min-w-0 rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl text-ink">Official sources we rely on</h3>
            <div className="mt-3 space-y-2 text-[12.5px]">
              {[
                [OFFICIAL.site, "CSCA portal (registration, dates, scores)"],
                [OFFICIAL.syllabus, "Official syllabus downloads"],
                [OFFICIAL.campusChina, "Campus China (CGS applications)"],
                [OFFICIAL.csc, "China Scholarship Council"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-ink-soft transition hover:border-line-strong hover:text-ink"
                >
                  <span className="min-w-0 flex-1">{label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 rounded-2xl bg-ink p-7 text-paper sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <Eyebrow className="text-paper/70">Stay in the loop</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-balance">
              One message when something is worth your time.
            </h2>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-paper/60">
              New papers, syllabus updates, and sitting calendar notices. No weekly newsletter, no
              “10 tips” listicles.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[12px] text-paper/50">
              <Link href="/syllabus" className="underline decoration-paper/20 underline-offset-4 hover:text-paper">
                Explore the syllabus
              </Link>
              <Link href="/csca" className="underline decoration-paper/20 underline-offset-4 hover:text-paper">
                Read the exam guide
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-xl bg-paper p-4">
            <LeadForm
              source="about-newsletter"
              cta="Notify me"
              successTitle="Subscribed"
              successBody="We'll email you only when there's something genuinely useful."
            />
          </div>
        </div>
      </section>
    </>
  );
}
