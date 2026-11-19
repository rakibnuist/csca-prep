import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * A route handler rather than the `robots.ts` metadata route, because we need
 * to emit comment lines and a second Sitemap entry — the typed metadata route
 * cannot express them.
 */
export function GET() {
  const origin = SITE.url.replace(/\/$/, "");
  const body = `# robots.txt for ${SITE.name}
# Independent CSCA exam preparation. Not affiliated with the China Scholarship Council.

User-Agent: *
Allow: /
Disallow: /app/
Disallow: /en/
Disallow: /cn/
Disallow: /exam/
Disallow: /admin/
Disallow: /api/
Disallow: /sign-in
Disallow: /sign-up
Disallow: /pending

# Cloudflare's managed robots.txt prepends a "Disallow: /" group for every AI
# agent, including the ones that fetch a page only to answer a user's question.
# A matching Allow wins the equal-length tie (RFC 9309 §2.2.2), so these groups
# re-open the site for answer engines while the training crawlers stay blocked.
User-agent: ChatGPT-User
User-agent: Claude-User
User-agent: Perplexity-User
User-agent: Google-CloudVertexBot
User-agent: Firecrawl
User-agent: FirecrawlAgent
Allow: /

# Machine-readable index for AI answer engines and LLM crawlers.
# Full reference: ${origin}/llms.txt and ${origin}/llms-full.txt
# (Those are plain text, not XML sitemaps — they are linked, not listed here.)
Sitemap: ${origin}/sitemap.xml

# The Host directive must be a bare hostname, not a URL — a full URL makes
# robots.txt invalid (Lighthouse "robots.txt is not valid").
Host: ${new URL(SITE.url).host}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
