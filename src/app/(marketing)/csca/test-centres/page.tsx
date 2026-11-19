import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Check, Home, Info, ShieldCheck, X } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA test centres 2026–27 — home test vs centre",
  description:
    "CSCA runs three delivery modes: the remote-proctored home-based test, computer-based testing at authorised centres, and paper-based testing where scheduled. Which one you can book and how to check inside csca.cn.",
  path: "/csca/test-centres",
  keywords: [
    "CSCA test centres",
    "CSCA test center near me",
    "CSCA home test",
    "CSCA 考点",
    "CSCA exam location",
    "CSCA computer-based test",
  ],
});

const FAQ = [
  {
    q: "How do I find my nearest CSCA test centre?",
    a: "The authoritative list is inside the registration system on csca.cn. Create an account, start a registration and the available formats and centres for your country appear for that sitting. No third-party site — including this one — can see or reserve CSCA seats.",
  },
  {
    q: "Can I choose the home-based test if there is a centre in my city?",
    a: "No. CSCA states that the remote-proctored home-based test is available only in countries or regions where computer-based or paper-based testing is not yet accessible. If a centre serves your area, the centre is your format.",
  },
  {
    q: "Is the home-based test easier?",
    a: "It is the same paper, the same clock and the same scoring. The difference is logistics — it is stricter on equipment and environment, because you provide both, and a proctor watches through two cameras.",
  },
  {
    q: "What do I need to bring to a centre?",
    a: "Your Admission Ticket and the original ID document you registered with, matching the ticket exactly. The centre provides the computer. Stationery, scratch paper and devices are not permitted unless the centre tells you otherwise.",
  },
  {
    q: "What if my centre cancels or my area has no centre?",
    a: "CSCA may reschedule, add a makeup test, or refund at its discretion when a test cannot run for reasons outside your control. Watch the official site and your registration email for notices.",
  },
  {
    q: "Are centres available in every country?",
    a: "No. CSCA is rolling computer-based centres out progressively in key source countries; everywhere else the home-based test is the route. The registration system shows what is available for your sitting.",
  },
];

const COMPARISON = [
  ["Format", "Remote-proctored, on your own computer", "At an authorised centre, on centre equipment"],
  ["Equipment", "You provide everything: Windows PC, webcam, mic, second camera", "The centre provides the computer"],
  ["Room", "Independent, quiet, enclosed room with no blind spots", "Standardised centre room"],
  ["Scratch tool", "Whiteboard or sheet in a transparent bag, erasable marker", "Centre rules apply"],
  ["Check-in", "Opens 60 min early (log in ≥30 min before), facial recognition, 360° room scan", "Arrive at least 40 minutes early with original passport and printed ticket"],
  ["Availability", "Only where no centre serves your region", "Progressive rollout in key source countries"],
];

export default function TestCentresPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Test centres", path: "/csca/test-centres" }])} />
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
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Test centres · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Where you sit the CSCA depends on where you live — not on what you prefer.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            CSCA publishes rules for three delivery modes: computer-based testing at an authorised
            centre, paper-based testing in designated regions, and the remote-proctored home-based test
            where neither serves your area. Here is how the choice is made and how to check yours.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Centre list is inside the registration system</Pill>
            <Pill>300+ universities recognise the score</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="formats">
            <h2>The delivery modes</h2>
            <div className="not-prose my-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="panel p-5">
                <Building2 className="h-4 w-4 text-vermillion" />
                <p className="mt-2 text-[13px] font-medium text-ink">
                  Computer-based centre <span className="font-chinese text-[11px] text-ink-faint">集中机考</span>
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                  You travel to an authorised CSCA centre and sit on equipment the centre provides.
                  Rolled out progressively in key source countries.
                </p>
              </div>
              <div className="panel p-5">
                <Home className="h-4 w-4 text-vermillion" />
                <p className="mt-2 text-[13px] font-medium text-ink">
                  Home-based test <span className="font-chinese text-[11px] text-ink-faint">居家网考</span>
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                  Remote-proctored on your own Windows computer with a second camera behind you. Only
                  where no centre serves your region.
                </p>
              </div>
              <div className="panel p-5">
                <Building2 className="h-4 w-4 text-ink-faint" />
                <p className="mt-2 text-[13px] font-medium text-ink">
                  Paper-based test <span className="font-chinese text-[11px] text-ink-faint">纸笔考试</span>
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                  Offered only in selected regions and sittings shown during registration on csca.cn.
                </p>
              </div>
            </div>
          </section>

          <section id="which">
            <h2>Which format will you get?</h2>
            <p>
              This is not a preference you select freely. CSCA&apos;s rule is that the home-based test is
              available only in countries or regions where computer-based or paper-based testing is not
              yet accessible. If a centre serves your area, the centre is the format offered.
            </p>
            <ol className="not-prose my-4 space-y-2">
              {[
                "Create an account on csca.cn and start a registration for the sitting you want.",
                "The system lists the formats and centres available for your country at that sitting.",
                "Pick the sitting; confirm the format and location shown before paying.",
                "The Admission Ticket later states the centre name, address and seat number.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3">
                  <span className="shrink-0 font-display text-lg text-vermillion tabular">0{index + 1}</span>
                  <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
            <p className="not-prose rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <strong className="text-ink">We do not publish a centre list.</strong> Centre availability
              changes per sitting and per country, and a stale list is worse than none. The registration
              system is the only source of truth —{" "}
              <a
                href={OFFICIAL.site}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-vermillion underline underline-offset-2"
              >
                csca.cn
              </a>
              .
            </p>
          </section>

          <section id="compare">
            <h2>Centre vs home: what changes</h2>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-4 py-2.5"> </th>
                    <th className="px-4 py-2.5">Home-based test</th>
                    <th className="px-4 py-2.5">Centre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {COMPARISON.map(([label, home, centre]) => (
                    <tr key={label}>
                      <td className="px-4 py-3 font-medium text-ink">{label}</td>
                      <td className="px-4 py-3 text-ink-soft">{home}</td>
                      <td className="px-4 py-3 text-ink-soft">{centre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              The paper, the clock and the 0–100 scoring are identical. Only the logistics differ, which
              is why our simulator focuses on the parts that are the same everywhere: the interface, the
              pace and the palette behaviour.
            </p>
          </section>

          <section id="checklist">
            <h2>Before you commit to a sitting</h2>
            <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="panel min-w-0 p-4">
                <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <ShieldCheck className="h-3.5 w-3.5 text-jade" /> If you are taking the centre test
                </p>
                <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Passport valid on test day, details matching your ticket</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Travel time and arrival at least 40 minutes early</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Printed Admission Ticket if your centre requires it</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Centre rules on stationery — assume nothing is allowed</li>
                </ul>
              </div>
              <div className="panel min-w-0 p-4">
                <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <X className="h-3.5 w-3.5 text-vermillion" /> If you are taking the home test
                </p>
                <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Windows laptop, webcam, mic, second camera on a stand</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> ≥20 Mbps symmetric, wired preferred, 4G backup</li>
                  <li className="flex gap-2"><X className="mt-0.5 h-3 w-3 shrink-0 text-vermillion" /> No macOS, no headphones, no second monitor</li>
                  <li className="flex gap-2"><X className="mt-0.5 h-3 w-3 shrink-0 text-vermillion" /> No paper or notes — whiteboard or transparent-bag sheet only</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-[12px] text-ink-soft">
              The full equipment specification, check-in sequence and penalties are on{" "}
              <Link href="/test-day">the test-day page</Link>.
            </p>
          </section>

          <section id="faq">
            <h2>Test-centre questions</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {FAQ.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[12.5px] font-medium text-ink">
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn (candidate notices, exam introduction), CSCA Test Rules and Device &amp;
            Environment Requirements. {SITE.name} is independent and does not administer the exam or
            hold any seats.
          </p>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Info className="h-3.5 w-3.5 text-ink-faint" /> Official portal
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              Registration, centre availability, fees and score reports exist only here.
            </p>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
            >
              csca.cn <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="panel p-5">
            <p className="text-[12px] font-medium text-ink">Related</p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {[
                ["/csca/faq", "CSCA FAQ"],
                ["/csca/passing-score", "Passing score & scoring"],
                ["/exam-dates", "Sittings and registration windows"],
                ["/test-day", "Test-day rules"],
                ["/requirements", "Which subjects you need"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-ink-soft hover:text-vermillion">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="border-t border-line">
        <div className="shell py-10">
          <SectionHead
            eyebrow="Prepare for either format"
            title="The paper does not change when the room does"
            body="Same 48 in 60 and 80 in 90, same palette, same no-early-submit rule. Practise the part that decides your score."
            action={
              <Link
                href="/app/mocks"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
              >
                Sit a full paper <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
        </div>
      </section>
    </>
  );
}
