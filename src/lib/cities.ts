import base from "@/data/csc-universities.json";

export type CityEntry = { city: string; slug: string; count: number };

export function citySlug(city: string) {
  return city
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const counts = new Map<string, number>();
for (const entry of base) {
  counts.set(entry.location, (counts.get(entry.location) ?? 0) + 1);
}

export const CITIES: CityEntry[] = [...counts.entries()]
  .map(([city, count]) => ({ city, slug: citySlug(city), count }))
  .sort((a, b) => b.count - a.count);

/** The twelve cities with the deepest CSCA university lists. */
export const TOP_CITIES = CITIES.slice(0, 12);

export function findCity(slug: string) {
  return CITIES.find((entry) => entry.slug === slug) ?? null;
}
