import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { PAPER_STATS } from "@/lib/paper-stats";

/**
 * Social share card.
 *
 * This audience shares links on WhatsApp and Telegram, where a link without a
 * preview is a link nobody taps. The card is rendered per request and cached at
 * the edge, and the brand block lives in `src/lib/og-card.tsx` so the homepage,
 * /csca, /mocks and /zh cannot drift apart.
 */
export const runtime = "nodejs";
export const alt =
  "CSCA Master — full-length CSCA papers in the official format: 48 questions in 60 minutes, 80 in 90.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "2027 INTAKE",
    headline: "Sit the CSCA before you sit the CSCA.",
    subline: `${PAPER_STATS.total} full-length papers · ${PAPER_STATS.questions.toLocaleString("en-US")} questions · a test-client simulation`,
    chips: ["48 in 60", "80 in 90", "0–100", "No card"],
  });
}
