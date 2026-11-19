import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { BangladeshPartnerBanner } from "@/components/site/bangladesh-partner-banner";
import { ProCta } from "@/components/site/pro-cta";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { PAPER_STATS, SITTABLE_PAPERS } from "@/lib/paper-stats";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — free CSCA practice, Pro when you need the reps",
  description:
    "CSCA Master is free to start: 50 sittings across the 25 free papers, every topic drill, the syllabus, tips and the requirements guide. Pro adds unlimited attempts and adaptive planning; Institute seats cover a whole cohort by invoice.",
  path: "/pricing",
  keywords: [
    "CSCA prep pricing",
    "CSCA free mock test",
    "CSCA Pro plan",
    "CSCA Master pricing",
  ],
});

const COMPARISON = [
  {
    feature: "Original mock papers (5)",
    free: "2 attempts each",
    pro: "Unlimited",
  },
  {
    feature: "Practice sets (150)",
    free: "2 attempts on sets 01–04 per subject",
    pro: "Unlimited",
  },
  {
    feature: "Official past papers & review sets (21)",
    free: "Study mode — read the working",
    pro: "Study + sit on the clock",
  },
  { feature: "Concept lessons (54 topics)", free: true, pro: true },
  { feature: `Topic drills (${PAPER_STATS.questions.toLocaleString()} questions)`, free: true, pro: true },
  { feature: "Quick 10-question drill", free: true, pro: true },
  { feature: "Smart review queue", free: true, pro: true },
  { feature: "Score, percentile estimate & topic breakdown", free: true, pro: true },
  { feature: "Attempt history", free: "Last 10", pro: "Full" },
  { feature: "Study plan", free: "12-step checklist", pro: "Weak-topic adaptive" },
  { feature: "Syllabus, dates, requirements & scholarships guides", free: true, pro: true },
  { feature: "Priority support", free: false, pro: true },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why is the free tier actually usable?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Because a student who cannot afford a course is exactly who the CSCA is supposed to help. Free accounts get every drill, every explanation, two attempts on 25 papers (five per subject) and free study access to every official past paper.",
              },
            },
            {
              "@type": "Question",
              name: "Is Pro a subscription?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. It is one payment per admission cycle. If you defer to the next intake, you get the next cycle free.",
              },
            },
            {
              "@type": "Question",
              name: "How does institute billing work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "One invoice or purchase order per cohort, priced per seat and dropping with volume. We issue one Pro activation code per student seat so your cohort redeems Pro directly on Billing without per-student checkout.",
              },
            },
            {
              "@type": "Question",
              name: "Can I get a refund?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes: 14 days, no questions, even if you have used the papers. Email us and we refund in full.",
              },
            },
          ],
        }}
      />
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
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
                "2 attempts on each of the 5 original mock papers",
                "2 attempts on practice sets 01–04 of every subject (5 free mocks/subject)",
                "All 21 official & review papers — study mode, free",
                "All 54 concept lessons and every topic drill",
                "Smart review queue",
                "Score, percentile estimate and topic breakdown",
                "Syllabus, exam dates, requirements and scholarships guides",
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
                `Unlimited attempts on all ${SITTABLE_PAPERS} mock papers`,
                "Sit the official past papers on the clock, scored against the published key",
                "Unlimited attempts on every official paper and review set",
                "Personalised study plan generated from your weak topics",
                "Full attempt history beyond your most recent 10 papers",
                "Priority support",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {item}
                </li>
              ))}
            </ul>

            <ProCta className="mt-6" />
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-soft">
              Pro is activated with a code, so there is no checkout to lose your place in. If you
              already have one, redeem it on the Billing page.
            </p>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">Institute</p>
              <Pill tone="jade">Per seat</Pill>
            </div>
            <p className="mt-3 font-display text-4xl text-ink">
              Custom <span className="text-base text-ink-faint">/ cohort</span>
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">
              For schools, consultancies and university international offices.
            </p>

            <ul className="mt-5 space-y-2 text-[12.5px] text-ink-soft">
              {[
                "Pro for every seat in the cohort",
                "Bulk activation codes — students redeem directly on Billing",
                "One invoice or purchase order — no per-student checkout",
                "Shared onboarding links for both English and Chinese tracks",
                "Direct email coordination and priority student support",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" /> {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink text-[13px] font-medium text-paper transition hover:bg-ink/85"
            >
              Request a quote
            </Link>
          </div>
        </div>

        <BangladeshPartnerBanner />

        <div className="mt-12">
          <h2 className="font-display text-xl text-ink">What is actually included</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-card">
            <div className="min-w-[460px]">
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
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-card p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              <Eyebrow>For institutes</Eyebrow>
              <h2 className="display-md mt-2">
                Cohort seats for schools, agencies and international offices.
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                Licence Pro for a whole intake: every student redeems a seat code to unlock the full
                paper library, drills, explanations and timed official past papers. Billed once per
                cohort, by invoice or purchase order.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
                >
                  Request a quote <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex h-10 items-center rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink"
                >
                  Partner programme
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                ["Full Pro access", `Unlimited attempts on all ${SITTABLE_PAPERS} mocks and timed official papers.`],
                ["Bulk seat codes", "Individual coupon codes ready for each student to redeem on Billing."],
                ["Invoicing", "One invoice or PO per cohort; no student checkout."],
                ["Both tracks", "Full coverage for English-taught and Chinese-taught applicants."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-line bg-paper-deep/50 p-3">
                  <p className="text-[12.5px] font-medium text-ink">{title}</p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow="Money questions"
            title="Fair questions, direct answers."
            body="If something here sounds like a trick, it probably is one somewhere else."
          />
          <Faq
            items={[
              {
                q: "Why is the free tier actually usable?",
                a: "Because a student who cannot afford a course is exactly who the CSCA is supposed to help. Free accounts get 5 mock tests to sit in every subject (25 papers, 2 attempts each), free study access to every official past paper, and every drill and explanation. We would rather have your trust than your ¥99 before you have seen the product.",
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
                a: "Yes: 14 days, no questions, even if you have used the papers. Email us and we refund in full.",
              },
              {
                q: "Do you offer agency or school licences?",
                a: "Yes. Consultancies and university international offices can purchase bulk Pro activation codes for a cohort. Email us for a quote — pricing is per seat and drops with volume.",
              },
              {
                q: "How does institute billing work?",
                a: "One invoice or purchase order per cohort, priced per seat and dropping with volume. There is no per-student checkout: we issue a batch of Pro codes for your students to redeem directly on Billing.",
              },
              {
                q: "What do cohort students get with Pro?",
                a: `Full Pro access on their own accounts — unlimited retakes across all ${SITTABLE_PAPERS} mock papers, timed official past papers, full attempt history and an adaptive study plan, while keeping each student's account and privacy settings separate.`,
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
