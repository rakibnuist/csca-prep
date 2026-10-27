import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Search, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/db";
import { Eyebrow, Pill } from "@/components/site/section";
import type { Prisma } from "@prisma/client";
import { TOP_CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "CSCA university requirements — searchable directory",
  description:
    "Search Chinese universities by city, tier and subject requirements. See which CSCA subjects each institution expects for science, engineering, medicine and humanities programmes.",
  alternates: { canonical: "/universities" },
};

export const dynamic = "force-dynamic";

const TIERS = ["985", "211", "DFC", "CSCA_CENTRE"] as const;

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tier?: string; city?: string; verified?: string }>;
}) {
  const { q = "", tier = "", city = "", verified = "" } = await searchParams;

  const where: Prisma.UniversityWhereInput = {};
  if (q) {
    where.OR = [
      { nameEn: { contains: q, mode: "insensitive" } },
      { nameZh: { contains: q } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }
  if (tier) where.tier = { has: tier };
  if (city) where.city = city;
  if (verified === "1") where.verified = true;

  const [universities, total, cities, verifiedCount] = await Promise.all([
    prisma.university.findMany({
      where,
      orderBy: [{ rank: "asc" }, { nameEn: "asc" }],
      take: 120,
    }),
    prisma.university.count({ where }),
    prisma.university.groupBy({ by: ["city"], _count: { _all: true } }),
    prisma.university.count({ where: { verified: true } }),
  ]);

  const topCities = cities
    .map((entry) => ({ city: entry.city, count: entry._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>University intelligence</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Which CSCA subjects does your university expect?
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Search {total}+ institutions. The requirement profiles are indicative — institutions set
            their own rules — but they turn a 40-tab research project into one page.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="jade">
              <BadgeCheck className="h-3 w-3" /> {verifiedCount} curated profiles
            </Pill>
            <Pill>{total} institutions listed</Pill>
            <Pill>Maths mandatory everywhere</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-10">
        <form method="get" className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              name="q"
              defaultValue={q}
              placeholder="University, city or 中文 name"
              className="h-11 w-full rounded-lg border border-line bg-card pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
            />
          </div>

          <select
            name="tier"
            defaultValue={tier}
            className="h-11 rounded-lg border border-line bg-card px-3 text-[12.5px] text-ink"
          >
            <option value="">All tiers</option>
            {TIERS.map((value) => (
              <option key={value} value={value}>
                {value === "DFC" ? "Double First Class" : value === "CSCA_CENTRE" ? "CSCA centre" : value}
              </option>
            ))}
          </select>

          <select
            name="city"
            defaultValue={city}
            className="h-11 rounded-lg border border-line bg-card px-3 text-[12.5px] text-ink"
          >
            <option value="">All cities</option>
            {topCities.map((entry) => (
              <option key={entry.city} value={entry.city}>
                {entry.city}
              </option>
            ))}
          </select>

          <label className="flex h-11 items-center gap-2 rounded-lg border border-line bg-card px-3 text-[12px] text-ink-soft">
            <input
              type="checkbox"
              name="verified"
              value="1"
              defaultChecked={verified === "1"}
              className="accent-[#c8102e]"
            />
            Curated only
          </label>

          <button
            type="submit"
            className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
            By city
          </span>
          {TOP_CITIES.map((city) => (
            <a
              key={city.slug}
              href={`/universities/city/${city.slug}`}
              className="rounded-full border border-line px-2.5 py-1 text-[10.5px] text-ink-soft transition hover:border-vermillion/40 hover:text-vermillion"
            >
              {city.city} <span className="text-ink-faint">{city.count}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[12px] text-ink-faint">
            Showing {Math.min(universities.length, 120)} of {total}
          </p>
          <div className="flex gap-1.5">
            {["985", "211", "DFC"].map((value) => (
              <Link
                key={value}
                href={`/universities?tier=${value}`}
                className="rounded-full border border-line px-2.5 py-1 text-[10.5px] text-ink-soft hover:border-line-strong hover:text-ink"
              >
                {value}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
          {universities.length === 0 && (
            <div className="p-10 text-center">
              <Building2 className="mx-auto h-5 w-5 text-ink-faint" />
              <p className="mt-2 text-[13px] text-ink">No universities match those filters.</p>
            </div>
          )}

          {universities.map((university) => (
            <Link
              key={university.id}
              href={`/universities/${university.slug}`}
              className="grid gap-1 border-b border-line/70 px-4 py-3.5 transition last:border-0 hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_0.7fr_0.8fr_0.9fr_0.3fr] sm:items-center sm:gap-3"
            >
              <div>
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  {university.nameEn}
                  {university.verified && <BadgeCheck className="h-3.5 w-3.5 text-jade" />}
                </p>
                <p className="text-[10.5px] text-ink-faint">{university.nameZh}</p>
              </div>
              <p className="text-[11.5px] text-ink-soft">{university.city}</p>
              <div className="flex flex-wrap gap-1">
                {university.tier.slice(0, 2).map((tier) => (
                  <span
                    key={tier}
                    className="rounded border border-line px-1.5 py-0.5 text-[9.5px] text-ink-soft"
                  >
                    {tier === "DFC" ? "DFC" : tier}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-ink-soft">{university.scienceSubjectRule}</p>
              <ArrowRight className="hidden h-3.5 w-3.5 text-ink-faint sm:block" />
            </Link>
          ))}
        </div>

        <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-ink-faint">
          Rows marked with a green check have a curated profile reviewed against public programme
          pages; the rest are listed from the official CSCA university list and use the default CSCA
          subject pattern. Always confirm requirements with the admissions office — universities
          change them between cycles.
        </p>
      </section>
    </>
  );
}
