import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Globe2, Home, Info, ShieldCheck } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { BangladeshPartnerBanner } from "@/components/site/bangladesh-partner-banner";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { COUNTRY_GUIDES, getCountryGuide, sittingTable } from "@/lib/countries-csca";
import { OFFICIAL, SITE, sittingsForBlock } from "@/lib/site";

export function generateStaticParams() {
  return COUNTRY_GUIDES.map((country) => ({ country: country.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryGuide(slug);
  if (!country) return {};
  return pageMetadata({
    title: `CSCA in ${country.name} — local exam times and fees`,
    description: `Sitting the CSCA from ${country.name}: the Beijing timetable converted to ${country.offsetLabel}, the delivery formats, the CNY fee, what to prepare and how to confirm whether a test centre serves you.`,
    path: `/csca/countries/${country.slug}`,
    image: null,
    keywords: [
      `CSCA ${country.name}`,
      `CSCA exam ${country.name}`,
      `CSCA test centre ${country.name}`,
      `CSCA ${country.name} time`,
    ],
  });
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params;
  const country = getCountryGuide(slug);
  if (!country) notFound();

  const table14 = sittingTable(country, "14:00");
  const table08 = sittingTable(country, "08:00");

  const FAQ = [
    {
      q: `What time is the CSCA in ${country.name}?`,
      a: `Every sitting is scheduled in Beijing time (UTC+8) and alternates between two blocks. In ${country.name} (${country.offsetLabel}), the 14:00 block (${sittingsForBlock("14:00").join(", ")}) runs at Professional Chinese ${table14[0].local} and Mathematics ${table14[1].local} on day one, Physics ${table14[2].local} and Chemistry ${table14[3].local} on day two. The 08:00 block (${sittingsForBlock("08:00").join(", ")}) runs at ${table08[0].local} and ${table08[1].local} on day one, ${table08[2].local} and ${table08[3].local} on day two. Confirm your exact appointment on your Admission Ticket.`,
    },
    {
      q: `Can I sit the CSCA at home in ${country.name}?`,
      a: "Only if no computer-based or paper-based centre serves your region. CSCA states that the remote-proctored home-based test is available where centres are not yet accessible; the registration system shows which format is offered for your country at that sitting.",
    },
    {
      q: `How much does the CSCA cost in ${country.name}?`,
      a: "Fees are set in renminbi and paid by card on the official portal: CNY 450 for one subject, CNY 700 for two or more. Your bank converts at its own rate and may add a foreign-transaction fee — budget for that rather than a fixed local price.",
    },
    {
      q: `Do I need a visa or a Chinese bank account to register?`,
      a: "No. Registration, payment and score reports are handled entirely online through csca.cn with a passport, a photo and a Visa or Mastercard. The exam itself does not require travel to China.",
    },
    {
      q: `Is there a minimum score for applicants from ${country.name}?`,
      a: "No. There is no national pass mark and no country-specific threshold: each university sets its own minimum per programme, so the target is set by the institutions you apply to.",
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Countries", path: "/csca/countries" }, { name: country.name, path: `/csca/countries/${country.slug}` }])} />
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
          <Link href="/csca/countries" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All countries
          </Link>
          <Eyebrow>Sitting the CSCA from {country.name}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA in {country.name}: {country.nameZh} applicants, local clock, same paper.
          </h1>
          <p className="lead mt-5 max-w-2xl">{country.context}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Beijing schedule · {country.offsetLabel}</Pill>
            <Pill>CNY 450 / 700</Pill>
            <Pill tone="jade">Score valid 2 years</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <div className="min-w-0">
          {country.slug === "bangladesh" && <BangladeshPartnerBanner className="mt-0" />}
          <article className="prose-edu min-w-0 max-w-none">
          <section id="times">
            <h2>The timetable in your local clock</h2>
            <p>{country.note}</p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Day</th>
                    <th className="px-3 py-2.5">Paper</th>
                    <th className="px-3 py-2.5">14:00 block ({country.name})</th>
                    <th className="px-3 py-2.5">08:00 block ({country.name})</th>
                    <th className="px-3 py-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {table14.map((row, index) => {
                    const morning = table08[index];
                    return (
                      <tr key={row.paper}>
                        <td className="px-3 py-2.5 text-[11px] tracking-[0.1em] text-ink-faint uppercase">{row.day}</td>
                        <td className="px-3 py-2.5 text-ink">
                          {row.paper} <span className="font-chinese text-[11px] text-ink-faint">{row.zh}</span>
                        </td>
                        <td className="px-3 py-2.5 font-medium text-ink tabular">
                          {row.local} <span className="text-[11px] font-normal text-ink-faint">({row.beijing} BJ)</span>
                        </td>
                        <td className="px-3 py-2.5 font-medium text-ink tabular">
                          {morning.local} <span className="text-[11px] font-normal text-ink-faint">({morning.beijing} BJ)</span>
                        </td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{row.minutes} min</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p>
              CSCA schedules in Beijing time, so the local start moves only if your country changes its
              offset. {country.dst ?? "Verify the offset on your own clock the week before the sitting."}
            </p>
          </section>

          <section id="format">
            <h2>Which format you get</h2>
            <p>
              Three delivery modes exist: the computer-based test at an authorised centre (集中机考),
              paper-based testing (纸笔考试) in designated sittings, and the remote-proctored home-based
              test (居家网考) where no centre serves your region — it is not a preference. The
              registration system shows what is offered for your country when you start a
              registration, and that is the only authoritative list.
            </p>
            <div className="not-prose my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="panel p-4">
                <Home className="h-4 w-4 text-vermillion" />
                <p className="mt-2 text-[12.5px] font-medium text-ink">Home-based requirements</p>
                <ul className="mt-1.5 space-y-1 text-[11.5px] leading-relaxed text-ink-soft">
                  <li>Windows 10/11 laptop — macOS is not supported</li>
                  <li>≥20 Mbps symmetric network, wired preferred</li>
                  <li>Second phone/tablet as a 45° rear camera</li>
                  <li>Whiteboard or transparent-bag scratch sheet only</li>
                </ul>
              </div>
              <div className="panel p-4">
                <Globe2 className="h-4 w-4 text-ink-faint" />
                <p className="mt-2 text-[12.5px] font-medium text-ink">Centre requirements</p>
                <ul className="mt-1.5 space-y-1 text-[11.5px] leading-relaxed text-ink-soft">
                  <li>Passport matching the Admission Ticket</li>
                  <li>Arrive at least 40 minutes early for verification</li>
                  <li>Centre provides the computer; stationery is not permitted</li>
                  <li>Centre details appear on the ticket after registration</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="cost">
            <h2>Cost, in renminbi</h2>
            <p>
              Fees are CNY 450 for one subject and CNY 700 for two or more, paid by Visa or Mastercard
              on csca.cn. We deliberately do not publish a converted local price: exchange rates move,
              and banks add their own fees — check what your card charges before you register.
            </p>
            <p>
              A retake is a new registration at the full fee. There is no per-retake discount, and there
              is no limit on attempts.
            </p>
          </section>

          <section id="prep">
            <h2>What to prepare, and in what order</h2>
            <ol>
              <li>
                <strong>Confirm the subject combination with your target university.</strong> Mathematics
                is compulsory; Professional Chinese is required for Chinese Government Scholarship
                applicants and Chinese-taught programmes; Physics and Chemistry depend on the programme.
              </li>
              <li>
                <strong>Sit one full paper per subject before revising.</strong> You cannot plan around
                marks you have not measured — our papers are 48 in 60 minutes and 80 in 90, the same as
                the exam.
              </li>
              <li>
                <strong>Work the weakest topics, then re-test within 48 hours.</strong> The dashboard
                ranks topics by marks lost, not by how hard they feel.
              </li>
              <li>
                <strong>Rehearse the test-day sequence.</strong> System check, pledge, full screen, left
                palette — the interface should be boring by the time it counts.
              </li>
            </ol>
          </section>

          <section id="faq">
            <h2>{country.name} questions</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {FAQ.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <span className="shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn (exam introduction, candidate notices), CSCA Test Rules and Device &amp;
            Environment Requirements. {SITE.name} is independent, does not administer the exam and holds
            no seats. Local times are arithmetic on the published Beijing timetable.
          </p>
          </article>
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink-faint" /> Other countries
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {COUNTRY_GUIDES.filter((item) => item.slug !== country.slug).map((item) => (
                <li key={item.slug}>
                  <Link href={`/csca/countries/${item.slug}`} className="text-ink-soft hover:text-vermillion">
                    CSCA in {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Info className="h-3.5 w-3.5 text-ink-faint" /> Official portal
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              Registration, format availability, fees and score reports exist only here.
            </p>
            <a
              href={OFFICIAL.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
            >
              csca.cn <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <ShieldCheck className="h-3.5 w-3.5 text-jade" /> No invented local rules
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              We do not list centres we cannot verify, and we do not quote local fees or local
              deadlines that CSCA has not published.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
