import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { LeadForm } from "@/components/site/lead-form";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Pricing — free CSCA practice, Pro when you need the reps",
  description:
    "CSCA Master is free to start: one full mock per subject, every topic drill, the syllabus and the university directory. Pro adds unlimited papers and adaptive planning.",
  alternates: { canonical: "/pricing" },
};

const COMPARISON = [
  { feature: "Full-length mock papers", free: "Every subject, 2 attempts each", pro: "Unlimited attempts" },
  { feature: "Topic drills (all 50 topics)", free: true, pro: true },
  { feature: "Smart review queue", free: true, pro: true },
  { feature: "Topic-level analytics", free: true, pro: true },
  { feature: "Syllabus explorer & weights", free: true, pro: true },
  { feature: "University requirement directory", free: true, pro: true },
  { feature: "Adaptive study plan", free: "Manual checklist", pro: "Auto-adjusted weekly" },
  { feature: "Predicted score range", free: false, pro: true },
  { feature: "Mentor review of your error log", free: false, pro: "Monthly" },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 text-center sm:py-20">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <h1 className="display-lg mx-auto mt-4 max-w-2xl text-balance">
            Free where it matters. Paid when you want more reps.
          </h1>
          <p className="lead mx-auto mt-5 max-w-xl">
            The exam fee is CNY 450–700. A preparation course should not cost more than the exam
            unless it genuinely changes the outcome.
          </p>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="panel p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Free</p>
              <Pill>Forever</Pill>
            </div>
            <p className="mt-3 font-display text-4xl text-ink">
              ¥0
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">No card. No trial timer.</p>

            <ul className="mt-5 space-y-2 text-[12.5px] text-ink-soft">
              {[
                "One full mock per subject (2 attempts)",
                "All 50 topic drills",
                "Smart review queue",
                "Score history and topic breakdown",
                "Syllabus and university directory",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" /> {item}
                </li>
              ))}
            </ul>

            <Link
              href="/sign-up"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink text-[13px] font-medium text-paper"
            >
              Create free account
            </Link>
          </div>

          <div className="panel relative overflow-hidden border-vermillion/30 p-6">
            <div className="absolute top-0 right-0 bg-vermillion px-3 py-1 text-[10px] font-medium tracking-wide text-paper">
              Coming soon
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Pro</p>
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-3 font-display text-4xl text-ink">
              ¥99 <span className="text-base text-ink-faint">/ intake</span>
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">One payment per admission cycle.</p>

            <ul className="mt-5 space-y-2 text-[12.5px] text-ink-soft">
              {[
                "Unlimited full-length mocks",
                "Adaptive study plan, updated weekly",
                "Predicted score range with confidence",
                "Monthly mentor review of your error log",
                "Priority answers on the community board",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-line bg-paper-deep/50 p-3">
              <p className="text-[11px] font-medium text-ink">Not on sale yet</p>
              <p className="mt-0.5 text-[10.5px] leading-relaxed text-ink-soft">
                We are finishing the adaptive planner. Join the waitlist and we will tell you once —
                no drip campaign.
              </p>
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Waitlist</p>
            <p className="mt-3 font-display text-xl text-ink">Get one email when Pro opens.</p>
            <div className="mt-4">
              <LeadForm source="pricing-waitlist" cta="Join the waitlist" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xl text-ink">What is actually included</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase">
              <span>Feature</span>
              <span>Free</span>
              <span>Pro</span>
            </div>
            {COMPARISON.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-3 border-b border-line/60 px-4 py-2.5 last:border-0"
              >
                <span className="text-[12px] text-ink">{row.feature}</span>
                <span className="text-[11.5px] text-ink-soft">
                  {row.free === true ? (
                    <Check className="h-3.5 w-3.5 text-jade" />
                  ) : row.free === false ? (
                    <Minus className="h-3.5 w-3.5 text-line-strong" />
                  ) : (
                    row.free
                  )}
                </span>
                <span className="text-[11.5px] text-ink-soft">
                  {row.pro === true ? (
                    <Check className="h-3.5 w-3.5 text-jade" />
                  ) : row.pro === false ? (
                    <Minus className="h-3.5 w-3.5 text-line-strong" />
                  ) : (
                    row.pro
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow="Money questions"
            title="Fair questions, direct answers."
            body="If something here sounds like a trick, it probably is one somewhere else."
          />
          <Faq
            items={[
              {
                q: "Why is the free tier actually usable?",
                a: "Because a student who cannot afford a course is exactly who the CSCA is supposed to help. Free accounts get every drill, every explanation and one full paper per subject. We would rather have your trust than your ¥99 before you have seen the product.",
              },
              {
                q: "Is Pro a subscription?",
                a: "No. It is one payment per admission cycle. If you defer to the next intake, you get the next cycle free — you have enough to think about.",
              },
              {
                q: "Do you guarantee a score?",
                a: "No, and you should not trust anyone who does. We guarantee the papers match the official format and that every explanation is written by a person. What you do with that is yours.",
              },
              {
                q: "Can I get a refund?",
                a: "When Pro launches, yes: 14 days, no questions, even if you have used the papers. This is written down here now so it cannot quietly change later.",
              },
              {
                q: "Do you offer agency or school licences?",
                a: "Yes. Consultancies and university international offices can licence seats with a shared dashboard. Email us for a quote — pricing is per seat and drops with volume.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
