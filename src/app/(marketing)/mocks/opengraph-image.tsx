import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { PAPER_STATS } from "@/lib/paper-stats";

export const runtime = "nodejs";
export const alt =
  "CSCA mock tests — full-length papers in the official format, 48 questions in 60 minutes and 80 in 90.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function MocksOgImage() {
  return renderOgCard({
    eyebrow: "MOCK TESTS",
    headline: `${PAPER_STATS.total} full-length papers. Sit one on the clock.`,
    subline: "Exact format · instant scoring · topic breakdown after every paper",
    chips: ["48 in 60", "80 in 90", "0–100", "Free"],
  });
}
