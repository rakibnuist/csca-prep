/**
 * IndexNow key file.
 *
 * IndexNow (Bing, Yandex, Seznam, Naver) verifies ownership by fetching
 * `<site>/<key>.txt`, which must contain the key verbatim. The key is public by
 * design — it proves you control the domain, not that you hold a secret.
 * Google does not use IndexNow, but Bing feeds Copilot answers and costs
 * nothing to ping.
 */
export const dynamic = "force-static";

const KEY = "csca-master-2026";

export function GET() {
  return new Response(KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
