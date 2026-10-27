import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, itemListLd, pageMetadata } from "@/lib/seo";
import { CITIES, findCity } from "@/lib/cities";
import { universitiesInCity } from "@/lib/university-data";

export function generateStaticParams() {
  return CITIES.map((entry) => ({ city: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const entry = findCity(city);
  if (!entry) return { title: "Universities" };

  return pageMetadata({
    title: `CSCA universities in ${entry.city} — requirements and profiles`,
    description: `All ${entry.count} CSCA-accepting universities in ${entry.city}, with indicative subject requirements, teaching languages and admission notes for international undergraduates.`,
    path: `/universities/city/${entry.slug}`,
    keywords: [
      `CSCA universities in ${entry.city}`,
      `study in ${entry.city}`,
      `${entry.city} university CSCA requirements`,
    ],
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const entry = findCity(city);
  if (!entry) notFound();

  const universities = universitiesInCity(entry.city);
  const others = CITIES.filter((item) => item.slug !== entry.slug && item.count >= 6).slice(0, 8);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Universities", path: "/universities" },
          { name: entry.city, path: `/universities/city/${entry.slug}` },
        ])}
      />
      <JsonLd
        data={itemListLd(
          universities.slice(0, 25).map((university) => ({
            name: university.nameEn,
            path: `/universities/${university.slug}`,
          })),
        )}
      />

      <section className="border-b border-line">
        <div className="shell py-10 sm:py-14">
          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All universities
          </Link>

          <div className="mt-5">
            <Eyebrow>City guide</Eyebrow>
            <h1 className="display-lg mt-3 max-w-3xl text-balance">
              {entry.count} CSCA universities in {entry.city}
            </h1>
            <p className="lead mt-4 max-w-2xl">
              Every institution in {entry.city} that accepts the CSCA for undergraduate admission,
              with the subject pattern each programme group usually follows. Requirements are
              indicative — confirm with admissions before you register for papers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill tone="jade">
                <MapPin className="h-3 w-3" /> {entry.city}
              </Pill>
              <Pill>{entry.count} institutions</Pill>
              <Pill>Maths mandatory</Pill>
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-10 lg:grid-cols-[1.5fr_0.8fr]">
        <div>
          <div className="overflow-hidden rounded-xl border border-line bg-card">
            <div className="hidden grid-cols-[1.6fr_0.8fr_0.9fr_0.3fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase sm:grid">
              <span>University</span>
              <span>Tier</span>
              <span>Science subjects</span>
              <span />
            </div>
            {universities.map((university) => (
              <Link
                key={university.slug}
                href={`/universities/${university.slug}`}
                className="grid gap-1 border-b border-line/70 px-4 py-3 transition last:border-0 hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_0.8fr_0.9fr_0.3fr] sm:items-center sm:gap-3"
              >
                <div>
                  <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                    {university.nameEn}
                    {university.verified && <BadgeCheck className="h-3 w-3 text-jade" />}
                  </p>
                  <p className="text-[10px] text-ink-faint">{university.nameZh}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {university.tier.slice(0, 2).map((tier) => (
                    <span
                      key={tier}
                      className="rounded border border-line px-1.5 py-0.5 text-[9.5px] text-ink-soft"
                    >
                      {tier}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-ink-soft">{university.scienceSubjectRule}</p>
                <ArrowUpRight className="hidden h-3.5 w-3.5 text-ink-faint sm:block" />
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-line bg-paper-deep/50 p-5">
            <h2 className="font-display text-xl text-ink">Preparing for a {entry.city} application</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              City choice rarely changes the CSCA papers you need — the programme does. Mathematics is
              mandatory everywhere; Physics or Chemistry depends on the degree; Professional Chinese
              depends on whether the degree is taught in Chinese.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-[11.5px]">
              <Link href="/guides/csca-subjects-by-major" className="text-vermillion hover:underline">
                Subjects by major
              </Link>
              <Link href="/exam-dates" className="text-vermillion hover:underline">
                Exam dates
              </Link>
              <Link href="/app/mocks" className="text-vermillion hover:underline">
                Take a mock
              </Link>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="panel p-5">
            <p className="eyebrow">Other cities</p>
            <div className="mt-2 space-y-1.5">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/universities/city/${other.slug}`}
                  className="flex items-center justify-between text-[11.5px] text-ink-soft hover:text-vermillion"
                >
                  <span>{other.city}</span>
                  <span className="text-[10px] text-ink-faint tabular">{other.count}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <p className="eyebrow">Before you apply</p>
            <ul className="mt-2 space-y-2 text-[11.5px] leading-relaxed text-ink-soft">
              <li>Confirm the required CSCA papers for your specific programme.</li>
              <li>Check whether the degree is taught in Chinese or English.</li>
              <li>Note the application window — CGS rounds usually close in March.</li>
              <li>Leave room for one CSCA retake before the deadline.</li>
            </ul>
            <Link
              href="/guides/csca-registration-step-by-step"
              className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
            >
              Registration guide <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
