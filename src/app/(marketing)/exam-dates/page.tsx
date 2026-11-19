import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, CreditCard, Globe2, Info } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { EXAM_BLOCKS, EXAM_SITTINGS, OFFICIAL, sittingsForBlock, type ExamBlock } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "CSCA exam dates 2026–2027, fees and daily timetable",
  description:
    "Every published CSCA sitting from November 2026 to June 2027, with registration windows, regional suitability, the exam-day timetable in Beijing time and the fee structure.",
  path: "/exam-dates",
  keywords: [
    "CSCA exam dates 2026 2027",
    "CSCA fees",
    "CSCA timetable Beijing time",
    "CSCA registration schedule",
  ],
});

export default function ExamDatesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type":"Question","name":"When is the next CSCA exam?","acceptedAnswer":{"@type":"Answer","text":"The published 2026\u201327 sittings are 14\u201315 Nov 2026 (registration closed 15\u201321 October), 19\u201320 Dec 2026, 23\u201324 Jan 2027, 13\u201314 Mar 2027, 24\u201325 Apr 2027 and 26\u201327 Jun 2027. Each runs over two days in Beijing time, and registration for later sittings opens on csca.cn."}},
{"@type":"Question","name":"How much does the CSCA cost?","acceptedAnswer":{"@type":"Answer","text":"CNY 450 for one subject and CNY 700 for two or more, paid by Visa or Mastercard on the official portal. A retake is a new registration at the full fee."}},
{"@type":"Question","name":"What time are the papers sat?","acceptedAnswer":{"@type":"Answer","text":"Each sitting runs one of two published blocks, in Beijing time (UTC+8). The 14:00 block: Professional Chinese 14:00\u201315:30, Mathematics 17:00\u201318:00 on day one; Physics 14:00\u201315:00, Chemistry 16:30\u201317:30 on day two. The 08:00 block: Professional Chinese 08:00\u201309:30, Mathematics 11:00\u201312:00 on day one; Physics 08:00\u201309:00, Chemistry 10:30\u201311:30 on day two. December 2026 and June 2027 run the 08:00 block; the exact time is on your Admission Ticket."}},
{"@type":"Question","name":"How long before the test should I register?","acceptedAnswer":{"@type":"Answer","text":"As soon as the window opens. Registration windows are short \u2014 the November 2026 sitting was open for seven days \u2014 and details lock once the Admission Ticket is generated, so no changes or withdrawals are possible afterwards."}},
{"@type":"Question","name":"How quickly do results arrive after a sitting?","acceptedAnswer":{"@type":"Answer","text":"Within 10 working days of the test date. The electronic report appears in your CSCA account and is valid for two years."}}],
        }}
      />
      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Exam calendar</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA exam dates: six sittings a year. Pick the one your timezone allows.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Every session starts simultaneously worldwide. That is why December, April and June are
            civilised for Asia-Pacific candidates while January and March favour Europe, Africa and
            the Americas.
          </p>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">Published sittings</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
              {EXAM_SITTINGS.map((sitting) => {
                const closed = sitting.status === "closed";
                return (
                  <div
                    key={sitting.id}
                    className="grid grid-cols-1 gap-2 border-b border-line/70 px-4 py-4 last:border-0 sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-center sm:gap-3"
                  >
                    <div>
                      <Link
                        href={`/exam-dates/${sitting.id}`}
                        className="text-[13px] font-medium text-ink transition hover:text-indigo"
                      >
                        {sitting.label}
                      </Link>
                      <p className="text-[12px] text-ink-faint">Intake {sitting.intake}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                      <CalendarDays className="h-3.5 w-3.5 text-ink-faint" />
                      {sitting.registration}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                      <Globe2 className="h-3.5 w-3.5 text-ink-faint" />
                      {sitting.region}
                    </div>
                    <div>
                      {closed ? (
                        <Pill>Registration closed</Pill>
                      ) : (
                        <Pill tone="jade">Open / upcoming</Pill>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-[12px] text-ink-faint">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              Dates follow the official CSCA announcements. Registration windows can shift — confirm
              on{" "}
              <a
                href={OFFICIAL.site}
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-2 hover:text-ink"
              >
                csca.cn
              </a>{" "}
              before paying.
            </p>
          </div>

          <aside className="min-w-0 space-y-4">
            <div className="panel card-elevate p-5">
              <CreditCard className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 font-display text-3xl text-ink">CNY 450 / 700</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                One subject, or two or more. There is no per-resit discount — a retake is a new
                registration.
              </p>
            </div>

            <div className="panel card-elevate p-5">
              <Clock3 className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 text-[12.5px] font-medium text-ink">Results turnaround</p>
              <ul className="mt-2 space-y-1.5 text-[12px] text-ink-soft">
                <li>Within 10 working days of the test date</li>
                <li>Electronic report on your CSCA account</li>
                <li>Valid for two years from issue</li>
                <li>Unlimited attempts — submit your best score</li>
              </ul>
            </div>

            <div className="panel card-elevate bg-paper-deep/60 p-5">
              <p className="text-[12px] font-medium text-ink">Which sitting should I pick?</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                Work backwards from your university deadline, then leave room for one retake. Sitting
                in December or January lets you retake in March or April if the score is short.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-14">
          <SectionHead
            eyebrow="Exam day"
            title="The timetable, in Beijing time (UTC+8)"
            body="Every sitting runs over two days: Professional Chinese and Mathematics on day one, Physics and Chemistry on day two. The papers are always in that order — the start block alternates by sitting, so check which one yours uses."
          />

          <div className="mt-6 space-y-4">
            {(Object.keys(EXAM_BLOCKS) as ExamBlock[]).map((block) => (
              <div key={block} className="overflow-hidden rounded-xl border border-line bg-card">
                <div className="border-b border-line bg-paper-deep/60 px-4 py-2.5">
                  <p className="text-[12px] font-medium text-ink">{block} block · Beijing time</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">{sittingsForBlock(block).join(" · ")}</p>
                </div>
                <div className="hidden grid-cols-[0.5fr_2fr_1fr_0.6fr] gap-4 border-b border-line bg-paper-deep/40 px-4 py-2.5 text-[12px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
                  <span>Day</span>
                  <span>Paper</span>
                  <span>Beijing time</span>
                  <span className="text-right">Duration</span>
                </div>
                {EXAM_BLOCKS[block].map((row) => (
                  <div
                    key={`${block}-${row.day}-${row.subject}`}
                    className="grid grid-cols-1 gap-1 border-b border-line/70 px-4 py-3 last:border-0 sm:grid-cols-[0.5fr_2fr_1fr_0.6fr] sm:items-center sm:gap-4"
                  >
                    <p className="text-[11px] tracking-[0.12em] text-ink-faint uppercase">{row.day}</p>
                    <p className="text-[12.5px] text-ink">{row.subject}</p>
                    <p className="text-[12px] text-ink-soft tabular">{row.time}</p>
                    <p className="text-[12px] text-ink-soft tabular sm:text-right">{row.minutes} min</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11.5px] leading-relaxed text-ink-faint">
            Source: CSCA official notice “2026年11月–2027年6月CSCA考试安排”, verified 13 Nov 2026. The
            start time on your Admission Ticket is final.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              title: "Home-based online (居家网考)",
              body: "Remote-proctored on your own Windows computer with dual-device monitoring. The default format, and the only option where no centre is available.",
            },
            {
              title: "Computer-based centre (集中机考)",
              body: "Sit at an authorised CSCA centre on equipment the centre provides. Added progressively in key source countries.",
            },
          ].map((format) => (
            <div key={format.title} className="panel card-elevate p-5">
              <p className="text-[12.5px] font-medium text-ink">{format.title}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{format.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-ink px-6 py-7 text-paper sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl">Know the date. Then know your score.</p>
            <p className="mt-1 text-[12.5px] text-paper/60">
              A full paper takes 60 minutes — 90 for Professional Chinese — and tells you exactly where you stand.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/app/mocks"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              Take a mock
            </Link>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-paper/20 px-4 text-[12.5px] font-medium text-paper/85"
            >
              Register at csca.cn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-ink-faint">
          Dates shown correspond to the calendar published by CSCA in October 2026. Page reviewed{" "}
          {formatDate(new Date("2026-10-27"))}.
        </p>

        <div className="mt-14">
          <SectionHead eyebrow="Dates FAQ" title="Sittings, fees and deadlines" />
          <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
            {[
              { q: "When is the next CSCA exam?", a: "The published 2026–27 sittings are 14–15 Nov 2026 (registration closed 15–21 October), 19–20 Dec 2026, 23–24 Jan 2027, 13–14 Mar 2027, 24–25 Apr 2027 and 26–27 Jun 2027. Each runs over two days in Beijing time, and registration for later sittings opens on csca.cn." },
              { q: "How much does the CSCA cost?", a: "CNY 450 for one subject and CNY 700 for two or more, paid by Visa or Mastercard on the official portal. A retake is a new registration at the full fee." },
              { q: "What time are the papers sat?", a: "Each sitting runs one of two published blocks, in Beijing time (UTC+8). The 14:00 block (Jan, Mar, Apr 2027): Professional Chinese 14:00–15:30 and Mathematics 17:00–18:00 on day one; Physics 14:00–15:00 and Chemistry 16:30–17:30 on day two. The 08:00 block (Dec 2026, Jun 2027): Professional Chinese 08:00–09:30 and Mathematics 11:00–12:00 on day one; Physics 08:00–09:00 and Chemistry 10:30–11:30 on day two. Check your Admission Ticket for your exact appointment." },
              { q: "How long before the test should I register?", a: "As soon as the window opens. Registration windows are short — the November 2026 sitting was open for seven days — and details lock once the Admission Ticket is generated, so no changes or withdrawals are possible afterwards." },
              { q: "How quickly do results arrive after a sitting?", a: "Within 10 working days of the test date. The electronic report appears in your CSCA account and is valid for two years." },
            ].map((item) => (
              <details key={item.q} className="group px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                  {item.q}
                  <span className="text-ink-faint transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
