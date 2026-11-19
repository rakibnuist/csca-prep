import { SITE } from "@/lib/site";
import { UNIVERSITIES } from "@/lib/universities";
import { GLOSSARY } from "@/lib/glossary";
import { EPISODES } from "@/lib/videos";
import { PAPERS } from "@/lib/papers";
import { GUIDES } from "@/lib/guides";
import { COUNTRY_GUIDES } from "@/lib/countries-csca";
import { CONTENT_UPDATED } from "@/lib/content-dates";
import { PROGRAMMES } from "@/lib/programmes";
import { EXAM_SITTINGS } from "@/lib/site";

/**
 * Live sitemap.
 *
 * A route handler rather than `sitemap.ts` for one reason: the cache headers.
 * The metadata route is served with a day-long `s-maxage`, so after a deploy
 * Cloudflare keeps handing crawlers the *previous* build's URL list — which is
 * exactly how a brand-new page stays invisible for 24 hours. This handler sends
 * a five-minute edge TTL, so a deploy propagates to Googlebot within minutes
 * without giving up CDN caching.
 *
 * `lastModified` comes from CONTENT_UPDATED (src/lib/content-dates.ts), not the
 * request clock: a sitemap that claims "modified now" on every fetch teaches
 * crawlers to ignore the field.
 */
/**
 * Dynamic on purpose: a statically optimised route gets Next's day-long
 * `s-maxage`, which defeats the point. A sitemap costs nothing to render and
 * must never be a day stale.
 */
export const dynamic = "force-dynamic";

const updated = new Date(CONTENT_UPDATED).toISOString();

type Entry = { path: string; priority: number; changeFrequency: string; lastmod?: string };

const PRIMARY: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/en", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cn", priority: 0.9, changeFrequency: "weekly" },
  { path: "/mocks", priority: 0.95, changeFrequency: "weekly" },
  { path: "/csca", priority: 0.95, changeFrequency: "monthly" },
  { path: "/csca-vs-hsk-ielts-sat", priority: 0.8, changeFrequency: "monthly" },
  { path: "/csca/faq", priority: 0.9, changeFrequency: "monthly" },
  { path: "/csca/passing-score", priority: 0.9, changeFrequency: "monthly" },
  { path: "/csca/test-centres", priority: 0.85, changeFrequency: "monthly" },
  { path: "/csca/universities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/csca/programmes", priority: 0.85, changeFrequency: "monthly" },
  { path: "/csca/sample-paper", priority: 0.85, changeFrequency: "monthly" },
  { path: "/csca/countries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/csca/updates", priority: 0.6, changeFrequency: "weekly" },
  { path: "/exam-dates", priority: 0.9, changeFrequency: "weekly" },
  { path: "/test-day", priority: 0.85, changeFrequency: "monthly" },
  { path: "/syllabus", priority: 0.9, changeFrequency: "monthly" },
  { path: "/formulas", priority: 0.85, changeFrequency: "monthly" },
  { path: "/scholarships", priority: 0.9, changeFrequency: "monthly" },
  { path: "/requirements", priority: 0.9, changeFrequency: "monthly" },
  { path: "/universities", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tips", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sample-questions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/free-exam", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice", priority: 0.9, changeFrequency: "monthly" },
  { path: "/check", priority: 0.9, changeFrequency: "monthly" },
  { path: "/question-papers", priority: 0.9, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.8, changeFrequency: "monthly" },
  { path: "/glossary", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/score-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/video", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.4, changeFrequency: "yearly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/zh", priority: 0.8, changeFrequency: "monthly" },
  { path: "/zh/kaoshi", priority: 0.75, changeFrequency: "monthly" },
  { path: "/zh/moniti", priority: 0.75, changeFrequency: "monthly" },
  { path: "/zh/wenda", priority: 0.75, changeFrequency: "monthly" },
];

const SUBJECTS = ["math", "phys", "chem", "ch_hum", "ch_sci"];

function entryXml(entry: Entry, origin: string) {
  const loc = `${origin}${entry.path}`;
  const lastmod = entry.lastmod ?? updated;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${entry.changeFrequency}</changefreq>\n    <priority>${entry.priority.toFixed(2)}</priority>\n  </url>`;
}

export function GET() {
  const origin = SITE.url.replace(/\/$/, "");

  const entries: Entry[] = [
    ...PRIMARY,
    ...SUBJECTS.map((code) => ({ path: `/syllabus/${code}`, priority: 0.8, changeFrequency: "monthly" })),
    ...GUIDES.map((guide) => ({
      path: `/guides/${guide.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastmod: new Date(guide.modified).toISOString(),
    })),
    ...UNIVERSITIES.map((university) => ({
      path: `/universities/${university.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    })),
    ...GLOSSARY.map((term) => ({
      path: `/glossary/${term.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
    })),
    ...EPISODES.map((episode) => ({
      path: `/video/${episode.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
    })),
    ...PAPERS.map((paper) => ({
      path: `/question-papers/${paper.slug}`,
      priority: 0.75,
      changeFrequency: "monthly",
    })),
    ...[
      "mathematics",
      "physics",
      "chemistry",
      "chinese-humanities",
      "chinese-stem",
    ].map((subject) => ({
      path: `/sample-questions/${subject}`,
      priority: 0.8,
      changeFrequency: "monthly",
    })),
    ...[
      "mathematics",
      "physics",
      "chemistry",
      "chinese-humanities",
      "chinese-stem",
    ].map((subject) => ({
      path: `/mocks/${subject}`,
      priority: 0.85,
      changeFrequency: "monthly",
    })),
    ...[
      "mathematics",
      "physics",
      "chemistry",
      "chinese-humanities",
      "chinese-stem",
    ].map((subject) => ({
      path: `/practice/${subject}`,
      priority: 0.85,
      changeFrequency: "monthly",
    })),
    ...EXAM_SITTINGS.map((sitting) => ({
      path: `/exam-dates/${sitting.id}`,
      priority: 0.75,
      changeFrequency: "weekly",
    })),
    ...PROGRAMMES.map((programme) => ({
      path: `/csca/programmes/${programme.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    })),
    ...COUNTRY_GUIDES.map((country) => ({
      path: `/csca/countries/${country.slug}`,
      priority: 0.75,
      changeFrequency: "monthly",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => entryXml(entry, origin)).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // 5-minute edge TTL: a deploy (or a content date bump) reaches crawlers
      // quickly, while repeat crawls still get a cached copy.
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
