/**
 * Ping IndexNow with every URL in the sitemap.
 *
 *   node scripts/indexnow.mjs                    # uses https://www.cscamaster.com
 *   node scripts/indexnow.mjs http://localhost:3000   # local smoke test (no-op against the API)
 *
 * Run it after a deploy that changed content. The key file is served by the app
 * itself at /csca-master-2026.txt, so no extra configuration exists to forget.
 */
const origin = (process.argv[2] || process.env.SITE_ORIGIN || "https://www.cscamaster.com").replace(/\/$/, "");
const KEY = "csca-master-2026";

const sitemap = await fetch(`${origin}/sitemap.xml`).then((response) => {
  if (!response.ok) throw new Error(`sitemap fetch failed: ${response.status}`);
  return response.text();
});

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) throw new Error("no URLs found in the sitemap");

if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
  console.log(`[indexnow] ${urls.length} URLs found; skipping submission for a local origin`);
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(origin).host,
    key: KEY,
    keyLocation: `${origin}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`[indexnow] submitted ${urls.length} URLs → ${response.status} ${response.statusText}`);
if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}
