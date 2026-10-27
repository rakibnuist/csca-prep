import base from "@/data/csc-universities.json";
import { curatedUniversities } from "../../prisma/seed-data/universities";
import type { SeedUniversity } from "../../prisma/seed-data/types";

export type StaticUniversity = {
  slug: string;
  nameEn: string;
  nameZh: string;
  city: string;
  tier: string[];
  scienceSubjectRule: string;
  humanitiesRule: string;
  languages: string[];
  verified: boolean;
  summary?: string;
  website?: string;
  popularMajors: string[];
  rank?: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * The same merge the seed performs, available without a database. Used by city
 * landing pages and the sitemap so they can be rendered statically.
 */
function build(): StaticUniversity[] {
  const curated = new Map<string, SeedUniversity>(
    curatedUniversities.map((entry) => [entry.nameEn, entry]),
  );

  const merged: StaticUniversity[] = base.map((entry) => {
    const detail = curated.get(entry.nameEn);
    return {
      slug: slugify(entry.nameEn),
      nameEn: entry.nameEn,
      nameZh: entry.nameZh,
      city: entry.location,
      tier: detail?.tier ?? [],
      scienceSubjectRule: detail?.scienceSubjectRule ?? "MATH + PHYS or CHEM",
      humanitiesRule: detail?.humanitiesRule ?? "MATH only",
      languages: detail?.languages ?? ["Chinese", "English"],
      verified: Boolean(detail),
      summary: detail?.summary,
      website: detail?.website,
      popularMajors: detail?.popularMajors ?? [],
      rank: detail?.rank,
    };
  });

  for (const detail of curatedUniversities) {
    if (merged.some((entry) => entry.nameEn === detail.nameEn)) continue;
    merged.push({
      slug: slugify(detail.nameEn),
      nameEn: detail.nameEn,
      nameZh: detail.nameZh,
      city: detail.city,
      tier: detail.tier ?? [],
      scienceSubjectRule: detail.scienceSubjectRule ?? "MATH + PHYS or CHEM",
      humanitiesRule: detail.humanitiesRule ?? "MATH only",
      languages: detail.languages ?? ["Chinese", "English"],
      verified: true,
      summary: detail.summary,
      website: detail.website,
      popularMajors: detail.popularMajors ?? [],
      rank: detail.rank,
    });
  }

  return merged.sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999));
}

export const STATIC_UNIVERSITIES = build();

export function universitiesInCity(city: string) {
  return STATIC_UNIVERSITIES.filter((entry) => entry.city === city);
}
