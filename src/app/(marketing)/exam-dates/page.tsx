import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, CreditCard, Globe2, Info } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { EXAM_SITTINGS, EXAM_TIMETABLE, OFFICIAL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CSCA exam dates 2026–2027, fees and daily timetable",
  description:
    "Every published CSCA sitting from November 2026 to June 2027, with registration windows, regional suitability, the exam-day timetable in Beijing time and the fee structure.",
  alternates: { canonical: "/exam-dates" },
};

export default function ExamDatesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Exam calendar</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA exam dates: five sittings a year. Pick the one your timezone allows.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Every session starts simultaneously worldwide. That is why December, April and June are
            civilised for Asia-Pacific candidates while January and March favour Europe, Africa and
            the Americas.
          </p>
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <h2 className="font-display text-xl text-ink">Published sittings</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
              {EXAM_SITTINGS.map((sitting) => {
                const closed = sitting.status === "closed";
                return (
                  <div
                    key={sitting.id}
                    className="grid gap-2 border-b border-line/70 px-4 py-4 last:border-0 sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-center sm:gap-3"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-ink">{sitting.label}</p>
                      <p className="text-[10.5px] text-ink-faint">
                        Intake {sitting.intake}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-ink-soft">
                      <CalendarDays className="h-3.5 w-3.5 text-ink-faint" />
                      {sitting.registration}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-ink-soft">
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
            <p className="mt-3 flex items-start gap-1.5 text-[11px] text-ink-faint">
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

          <aside className="space-y-4">
            <div className="panel p-5">
              <CreditCard className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 font-display text-3xl text-ink">CNY 450 / 700</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                One subject, or two or more. There is no per-resit discount — a retake is a new
                registration.
              </p>
            </div>

            <div className="panel p-5">
              <Clock3 className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 text-[12.5px] font-medium text-ink">Results turnaround</p>
              <ul className="mt-2 space-y-1.5 text-[11.5px] text-ink-soft">
                <li>Home online / computer-based: 7 working days</li>
                <li>Paper-based: 14 working days</li>
                <li>Scores published on your CSCA account</li>
              </ul>
            </div>

            <div className="panel bg-paper-deep/60 p-5">
              <p className="text-[12px] font-medium text-ink">Which sitting should I pick?</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
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
            body="All four papers run on the same day in a fixed sequence, with gaps between them. Plan your energy, not just your revision."
          />

          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-card">
            <div className="hidden grid-cols-[2fr_1fr_0.6fr] gap-4 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
              <span>Paper</span>
              <span>Beijing time</span>
              <span className="text-right">Duration</span>
            </div>
            {EXAM_TIMETABLE.map((row) => (
              <div
                key={row.subject}
                className="grid gap-1 border-b border-line/70 px-4 py-3 last:border-0 sm:grid-cols-[2fr_1fr_0.6fr] sm:items-center sm:gap-4"
              >
                <p className="text-[12.5px] text-ink">{row.subject}</p>
                <p className="text-[12px] text-ink-soft tabular">{row.time}</p>
                <p className="text-[12px] text-ink-soft tabular sm:text-right">{row.minutes} min</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Home-based online",
              body: "Proctored remotely. The default format for most candidates outside Vietnam and Thailand.",
            },
            {
              title: "Computer-based centre",
              body: "Standardised conditions at an authorised centre. Scores in 7 working days.",
            },
            {
              title: "Paper-based centre",
              body: "Traditional format, 14 working days for results. Availability is limited.",
            },
          ].map((format) => (
            <div key={format.title} className="panel p-5">
              <p className="text-[12.5px] font-medium text-ink">{format.title}</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">{format.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-ink px-6 py-7 text-paper sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl">Know the date. Then know your score.</p>
            <p className="mt-1 text-[12.5px] text-paper/60">
              A full paper takes 60 minutes and tells you exactly where you stand.
            </p>
          </div>
          <div className="flex gap-2">
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

        <p className="mt-6 text-[11px] text-ink-faint">
          Dates shown correspond to the calendar published by CSCA in October 2026. Page reviewed{" "}
          {formatDate(new Date("2026-10-27"))}.
        </p>
      </section>
    </>
  );
}
