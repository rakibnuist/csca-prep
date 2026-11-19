import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Camera,
  Clock3,
  FileCheck2,
  Globe2,
  Info,
  Monitor,
  ShieldCheck,
  Wifi,
  X,
} from "lucide-react";
import { SITE, EXAM_BLOCKS, OFFICIAL, TEST_FORMATS } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { DualCameraRoom, TestClientLine } from "@/components/marketing/line-art";
import { CheckInClock } from "@/components/marketing/line-art-csca";
import { ViolationSteps } from "@/components/marketing/violation-steps";
import {
  CONDUCT_RULES,
  ENVIRONMENT_RULES,
  EQUIPMENT_RULES,
  REGISTRATION_FACTS,
  RULES_UPDATED,
  TIMELINE_RULES,
  VIOLATION_RULES,
} from "@/lib/test-day";
import type { RuleGroup } from "@/lib/test-day";

export const metadata: Metadata = pageMetadata({
  title: "CSCA test day — equipment, room rules, check-in",
  description:
    "What the CSCA home-based test actually requires: Windows-only client, dual-device proctoring, 20 Mbps symmetric network, scratch-tool policy, check-in deadlines, violations and score release. Sourced from the official CSCA device and test-rule documents.",
  path: "/test-day",
  keywords: [
    "CSCA test day",
    "CSCA equipment requirements",
    "CSCA home-based test rules",
    "CSCA Windows client",
  ],
});

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REGISTRATION_FACTS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function RuleList({ group }: { group: RuleGroup }) {
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{group.title}</h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{group.intro}</p>
      <ul className="mt-4 space-y-2">
        {group.items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-2.5 rounded-xl border border-line bg-card px-3.5 py-3"
          >
            <span
              className={
                item.ok === false
                  ? "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vermillion/10 text-vermillion"
                  : "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade/12 text-jade"
              }
            >
              {item.ok === false ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
            <div>
              <p className="text-[12.5px] font-medium text-ink">{item.label}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TestDayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Test day", item: `${SITE.url}/test-day` },
            ],
          }),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Test day · rules updated {RULES_UPDATED}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            The CSCA is sat on Windows, watched by two cameras, in an empty room.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Most candidates lose time — or the whole sitting — to equipment they did not know was
            required. This is the official rulebook, translated into a checklist you can run the week
            before.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Pill tone="red">Windows only — no macOS</Pill>
            <Pill>Dual-device proctoring</Pill>
            <Pill tone="jade">Login opens 60 min early</Pill>
            <Pill>Scores in 10 working days</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <SectionHead
          eyebrow="Three modes"
          title="Home-based online, computer-based centre, or paper-based"
          body="CSCA publishes rules for three delivery modes with identical papers, durations and 0–100 scoring. The home-based test applies where neither a CBT nor paper-based centre serves your area."
        />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="grid min-w-0 grid-cols-1 gap-4">
          {TEST_FORMATS.map((format) => (
            <div key={format.id} className="panel card-elevate p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Monitor className="h-4 w-4 text-vermillion" />
                <p className="text-[13px] font-medium text-ink">{format.name}</p>
                <span className="font-chinese text-[11px] text-ink-faint">{format.zh}</span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{format.body}</p>
            </div>
          ))}
        </div>
          <figure className="min-w-0">
            <div className="rounded-2xl border border-line bg-card p-4">
              <DualCameraRoom />
            </div>
            <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
              The home-setup geometry: laptop front-on, phone behind at roughly 45°, nothing on the
              desk except a whiteboard or a sheet in a transparent bag.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/40">
        <div className="shell py-14">
          <SectionHead
            eyebrow="Timetable"
            title="Two days, four papers, Beijing time"
            body="Every sitting runs across two days. Professional Chinese and Mathematics on day one; Physics and Chemistry on day two."
          />
          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-card">
            <div className="hidden grid-cols-[0.4fr_1.8fr_1fr_1fr_0.5fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[11px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
              <span>Day</span>
              <span>Paper</span>
              <span>08:00 block</span>
              <span>14:00 block</span>
              <span className="text-right">Length</span>
            </div>
            {EXAM_BLOCKS["08:00"].map((early, i) => {
              const late = EXAM_BLOCKS["14:00"][i];
              return (
                <div
                  key={early.subject}
                  className="grid grid-cols-1 gap-1 border-b border-line/70 px-4 py-3 last:border-0 sm:grid-cols-[0.4fr_1.8fr_1fr_1fr_0.5fr] sm:items-center sm:gap-3"
                >
                  <p className="text-[11px] tracking-[0.12em] text-ink-faint uppercase">{early.day}</p>
                  <p className="text-[12.5px] text-ink">{early.subject}</p>
                  <p className="text-[12px] text-ink-soft tabular">
                    <span className="mr-1.5 text-[10.5px] tracking-wide text-ink-faint uppercase sm:hidden">
                      08:00 block ·
                    </span>
                    {early.time}
                  </p>
                  <p className="text-[12px] text-ink-soft tabular">
                    <span className="mr-1.5 text-[10.5px] tracking-wide text-ink-faint uppercase sm:hidden">
                      14:00 block ·
                    </span>
                    {late.time}
                  </p>
                  <p className="text-[12px] text-ink-soft tabular sm:text-right">{early.minutes} min</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-[11.5px] text-ink-faint">
            <Info className="mt-0.5 h-3 w-3 shrink-0" />
            Times are Beijing time (UTC+8). Your sitting uses one of the two blocks — the official notice
            for the sitting says which — so convert that block to your local clock, then check the exact
            appointment time on your Admission Ticket.
          </p>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RuleList group={EQUIPMENT_RULES} />
          <RuleList group={ENVIRONMENT_RULES} />
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/40">
        <div className="shell py-14">
          <SectionHead
            eyebrow="Check-in"
            title="What happens, in order"
            body="Login opens 60 minutes before the start, and you must log in no later than 30 minutes early for device checks and verification. If you are not verified when the timer begins, you are not admitted — and the fee is not refunded."
          />
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <ol className="min-w-0 space-y-3">
            {TIMELINE_RULES.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-xl border border-line bg-card p-4">
                <span className="font-display text-xl text-indigo tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-ink">
                    {step.title}
                    <span className="ml-2 text-[11px] font-normal text-ink-faint">{step.time}</span>
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="rounded-2xl border border-line bg-card p-4">
            <CheckInClock />
            <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
              The check-in windows as a countdown to the timer. Everything on the left is
              <span className="text-ink-soft"> before</span> the paper starts; late entry is refused
              once the hand reaches zero.
            </figcaption>
          </figure>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <figure className="order-2 min-w-0 lg:order-1">
            <div className="rounded-2xl border border-line bg-card p-4">
              <TestClientLine />
            </div>
            <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
              What the client actually looks like: one question, four options, the palette on the
              right, and a countdown that does not pause.
            </figcaption>
          </figure>
          <div className="order-1 lg:order-2">
            <SectionHead eyebrow="Conduct" title="During the test" />
            <ul className="mt-4 space-y-2">
              {CONDUCT_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-soft">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <SectionHead
            eyebrow="Violations"
            title="What the penalties actually are"
            body="CSCA publishes four tiers. They apply to misconduct confirmed at any time — including after the score is reported."
          />
            <figure className="mt-6 rounded-2xl border border-line bg-card px-5 py-4">
              <ViolationSteps />
              <figcaption className="mt-2 text-[10.5px] leading-relaxed text-ink-faint">
                The tiers escalate rather than repeat: a cancelled paper, then a two-year suspension,
                then a permanent ban, then a referral to the judicial authorities. The step heights
                are illustrative; the order and the consequences are quoted from the CSCA test rules.
              </figcaption>
            </figure>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
              {VIOLATION_RULES.map((rule) => (
                <div key={rule.level} className="flex gap-3 border-b border-line/70 px-4 py-3 last:border-0">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion" />
                  <div>
                    <p className="text-[12px] font-medium text-ink">{rule.level}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{rule.consequence}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/40">
        <div className="shell py-14">
          <SectionHead
            eyebrow="Practice conditions"
            title="What we cannot reproduce — and what we can"
            body="An honest list, because a simulator that pretends to be the proctored test would teach you the wrong habits."
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="panel card-elevate p-5">
              <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                <Check className="h-3.5 w-3.5 text-jade" /> Reproduced here
              </p>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-soft">
                <li>48 questions / 60 minutes and 80 questions / 90 minutes, matching each paper</li>
                <li>Single-answer items, four options, no negative marking, 0–100 scale</li>
                <li>Countdown that cannot be paused, auto-submit at zero, answers saved continuously</li>
                <li>Question palette with answered / flagged state and review before submission</li>
                <li>Chinese/English toggle for the fundamental subjects</li>
              </ul>
            </div>
            <div className="panel card-elevate p-5">
              <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                <X className="h-3.5 w-3.5 text-vermillion" /> Not reproduced
              </p>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-soft">
                <li>The Windows Test Client, facial recognition and the 360° room scan</li>
                <li>Dual-camera proctoring and the Integrity Commitment Form</li>
                <li>Full-screen lock — you can leave our simulator, and that is deliberate</li>
                <li>Early submission: the official test forbids it, we allow it so you can end a drill</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/app/mocks"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              Sit a paper under these conditions
            </Link>
            <Link
              href="/csca"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-4 text-[12.5px] font-medium text-ink"
            >
              Full exam guide
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <SectionHead eyebrow="Registration" title="Rules that catch people out" />
        <div className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
          {REGISTRATION_FACTS.map((fact) => (
            <details key={fact.q} className="group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                {fact.q}
                <span className="text-ink-faint transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{fact.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="shell pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Camera, title: "Device check first", body: "Run CSCA's equipment check weeks ahead, not the night before." },
            { icon: Wifi, title: "Wired beats Wi-Fi", body: "20 Mbps symmetric, plus a 4G hotspot taped to the desk as backup." },
            { icon: FileCheck2, title: "Ticket and ID", body: "Admission Ticket number, password and the same ID document you registered with." },
          ].map((item) => (
            <div key={item.title} className="panel card-elevate p-5">
              <item.icon className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 text-[12.5px] font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-2 text-[11.5px] text-ink-faint">
          <Globe2 className="h-3.5 w-3.5" />
          Source: CSCA Device &amp; Environment Requirements and Test Rules, plus the candidate notice
          pages on{" "}
          <a
            href={OFFICIAL.site}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-ink"
          >
            csca.cn
          </a>
          . Rules can change between sittings — re-read them before your test.
        </p>
        <p className="mt-2 flex items-center gap-2 text-[11.5px] text-ink-faint">
          <Clock3 className="h-3.5 w-3.5" /> Page reviewed {RULES_UPDATED}.
        </p>
      </section>
    </>
  );
}
