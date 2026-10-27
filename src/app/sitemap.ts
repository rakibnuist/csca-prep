import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/csca`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/exam-dates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/syllabus`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/scholarships`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/requirements`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/tips`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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

  return [...staticRoutes, ...subjects, ...guides];
}
