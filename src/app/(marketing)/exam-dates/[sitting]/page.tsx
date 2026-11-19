import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Info } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { EXAM_SITTINGS, timetableFor } from "@/lib/site";
import { COUNTRY_GUIDES, localTime } from "@/lib/countries-csca";

export function generateStaticParams() {
  return EXAM_SITTINGS.map((sitting) => ({ sitting: sitting.id }));
}

function findSitting(id: string) {
  return EXAM_SITTINGS.find((sitting) => sitting.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sitting: string }>;
}): Promise<Metadata> {
  const { sitting: id } = await params;
  const sitting = findSitting(id);
  if (!sitting) return {};
  return pageMetadata({
    title: `${sitting.label} CSCA sitting — dates and times`,
    description: `Everything about the CSCA sitting on ${sitting.label}: the two-day Beijing timetable in your local time, the registration window, which intake it feeds and who it suits.`,
    path: `/exam-dates/${sitting.id}`,
    keywords: [`CSCA ${sitting.label}`, "CSCA dates 2027", "CSCA sitting"],
  });
}

export default async function SittingPage({ params }: { params: Promise<{ sitting: string }> }) {
  const { sitting: id } = await params;
  const sitting = findSitting(id);
  if (!sitting) notFound();

  const others = EXAM_SITTINGS.filter((item) => item.id !== sitting.id);
  const index = EXAM_SITTINGS.findIndex((item) => item.id === sitting.id);
  const next = EXAM_SITTINGS[index + 1];

  // the four papers, with the local start time for six source countries
  const samples = COUNTRY_GUIDES.slice(0, 6);
  const timetable = timetableFor(sitting);
  const chineseStart = timetable[0].start;
  const mathsStart = timetable[1].start;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Exam dates", path: "/exam-dates" },
          { name: sitting.label, path: `/exam-dates/${sitting.id}` },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Link
            href="/exam-dates"
            className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All sittings
          </Link>
          <Eyebrow>{sitting.region} · {sitting.intake} intake</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            The CSCA sitting on {sitting.label}.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Two days, four papers, one start time in Beijing that becomes a different hour everywhere
            else. Registration for this sitting: <strong className="text-ink">{sitting.registration}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone={sitting.status === "closed" ? "line" : "red"}>
              {sitting.status === "closed" ? "Registration closed" : "Upcoming"}
            </Pill>
            <Pill>{sitting.label}</Pill>
            <Pill tone="jade">Two days</Pill>
            <Pill>Beijing time · UTC+8</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="timetable">
            <h2>The two days, as published</h2>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Day</th>
                    <th className="px-3 py-2.5">Paper</th>
                    <th className="px-3 py-2.5">Beijing</th>
                    <th className="px-3 py-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {timetable.map((row) => (
                    <tr key={row.subject}>
                      <td className="px-3 py-2.5 text-[11px] tracking-[0.1em] text-ink-faint uppercase">{row.day}</td>
                      <td className="px-3 py-2.5 text-ink">{row.subject}</td>
                      <td className="px-3 py-2.5 text-ink-soft tabular">{row.time}</td>
                      <td className="px-3 py-2.5 text-ink-soft tabular">{row.minutes} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              This sitting runs the <strong>{sitting.block} block</strong>: both days start at{" "}
              {sitting.block} Beijing time, with the same paper order as every other sitting. If you are
              not verified in the test client when the timer begins you are not admitted — for
              home-based online (RHT) login opens 60 minutes early and check-in must be completed at
              least 30 minutes before start; CBT centre candidates should arrive at least 40 minutes
              early.
            </p>
          </section>

          <section id="local-times">
            <h2>What that is where you are</h2>
            <p>
              The paper starts at the same instant worldwide, which is why two people sitting the same
              paper can start at breakfast and late evening respectively. Six of the countries we cover
              in detail:
            </p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Country</th>
                    <th className="px-3 py-2.5">Chinese starts</th>
                    <th className="px-3 py-2.5">Maths starts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {samples.map((country) => (
                    <tr key={country.slug}>
                      <td className="px-3 py-2.5 text-ink">
                        <Link href={`/csca/countries/${country.slug}`} className="hover:text-indigo">
                          {country.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 text-ink-soft tabular">
                        {country.utcOffset === null ? "varies (DST)" : localTime(chineseStart, country.utcOffset)}
                      </td>
                      <td className="px-3 py-2.5 text-ink-soft tabular">
                        {country.utcOffset === null ? "varies (DST)" : localTime(mathsStart, country.utcOffset)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-ink-faint">
              Conversions are arithmetic, not advice — check the appointment time on your Admission
              Ticket, which is the only authoritative clock.
            </p>
          </section>

          <section id="who">
            <h2>Who this sitting suits</h2>
            <p>
              {sitting.region === "Asia-Pacific friendly"
                ? `The ${sitting.block} Beijing start lands in the ${sitting.block === "08:00" ? "morning" : "afternoon or early evening"} across Asia-Pacific, so this sitting is the comfortable choice if you are in that region.`
                : `The ${sitting.block} Beijing start lands ${sitting.block === "08:00" ? "overnight or in the early morning" : "in the morning"} across Europe, Africa and the Americas, which makes this sitting the practical one for those regions.`}{" "}
              It feeds the {sitting.intake} intake, so a score from here arrives with room for the
              university deadlines that follow.
            </p>
            <div className="not-prose my-5 rounded-xl border border-gold/30 bg-gold-soft/40 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <p className="flex items-center gap-1.5 font-medium text-ink">
                <Info className="h-3.5 w-3.5 text-gold-deep" /> Registration reality
              </p>
              <p className="mt-1">
                Windows are short — the November 2026 sitting was open for seven days. Once the
                Admission Ticket is generated nothing can change: no subject, no date, no centre, no
                refund.
              </p>
            </div>
          </section>

          <section id="prepare">
            <h2>Planning backwards from {sitting.label.split(" ")[0]}</h2>
            <ol>
              <li>Confirm the subject combination your programme needs — in writing from the university.</li>
              <li>Sit one full paper now, cold, to find out what a timed paper feels like.</li>
              <li>Work the weakest two topics for two weeks; re-sit a paper and compare.</li>
              <li>Rehearse the test client a week out: equipment, room, check-in timeline.</li>
              <li>Prepare the ID and photo before the registration window opens, not during it.</li>
            </ol>
          </section>

          <section id="next">
            <h2>Other sittings</h2>
            <div className="not-prose my-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {others.map((item) => (
                <Link
                  key={item.id}
                  href={`/exam-dates/${item.id}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3.5 py-2.5 text-[12.5px] transition hover:border-indigo/40"
                >
                  <span className="text-ink">{item.label}</span>
                  <span className="text-[10.5px] text-ink-faint">{item.status === "closed" ? "closed" : "upcoming"}</span>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <CalendarDays className="h-3.5 w-3.5 text-ink-faint" /> At a glance
            </p>
            <dl className="mt-2 space-y-1.5 text-[11.5px]">
              <div className="flex justify-between gap-2">
                <dt className="text-ink-faint">Sitting</dt>
                <dd className="text-ink">{sitting.label}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-faint">Registration</dt>
                <dd className="text-right text-ink">{sitting.registration}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-faint">Intake</dt>
                <dd className="text-ink">{sitting.intake}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-faint">Fee</dt>
                <dd className="text-ink">CNY 450 / 700</dd>
              </div>
            </dl>
          </div>
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink-faint" /> Next up
            </p>
            {next ? (
              <Link href={`/exam-dates/${next.id}`} className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-indigo hover:underline">
                {next.label} <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <p className="mt-1.5 text-[11.5px] text-ink-soft">
                This is the last published sitting; the next cycle is announced on csca.cn.
              </p>
            )}
          </div>
          <div className="panel p-5">
            <p className="text-[12px] font-medium text-ink">Related</p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {[
                ["/exam-dates", "All six sittings and fees"],
                ["/csca/sample-paper", "A whole paper, in the open"],
                ["/csca/programmes", "Which papers your degree needs"],
                ["/test-day", "Test-day rules and setup"],
                ["/csca/passing-score", "How 0–100 works"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-ink-soft hover:text-indigo">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
