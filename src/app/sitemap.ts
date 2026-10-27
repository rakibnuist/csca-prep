import type { MetadataRoute } from "next";
import base from "@/data/csc-universities.json";
import { curatedUniversities } from "../../prisma/seed-data/universities";
import { SITE } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { TOP_CITIES } from "@/lib/cities";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/csca`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/exam-dates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/syllabus`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/universities`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/sample-questions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/tools/score-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const subjects: MetadataRoute.Sitemap = ["math", "phys", "chem", "ch_hum", "ch_sci"].map(
    (code) => ({
      url: `${url}/syllabus/${code}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${url}/guides/${guide.slug}`,
    lastModified: new Date(guide.modified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cities: MetadataRoute.Sitemap = TOP_CITIES.map((city) => ({
    url: `${url}/universities/city/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const curatedSlugs = new Set(curatedUniversities.map((entry) => slugify(entry.nameEn)));
  const universities: MetadataRoute.Sitemap = base.map((entry) => ({
    url: `${url}/universities/${slugify(entry.nameEn)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: curatedSlugs.has(slugify(entry.nameEn)) ? 0.7 : 0.5,
  }));

  return [...staticRoutes, ...subjects, ...guides, ...cities, ...universities];
}
