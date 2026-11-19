import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { COUNTRY_GUIDES } from "@/lib/countries-csca";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "CSCA in your country — local exam times, fees and format.";

/**
 * One card per country. The offset comes from the same guide data the page
 * renders, so the preview cannot contradict the page it links to.
 */
export default async function CountryOgImage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const guide = COUNTRY_GUIDES.find((item) => item.slug === country);

  return renderOgCard({
    eyebrow: guide ? `CSCA · ${guide.name.toUpperCase()}` : "CSCA BY COUNTRY",
    headline: guide ? `CSCA in ${guide.name}: local exam times.` : "CSCA exam times by country.",
    subline: guide
      ? `Beijing times in ${guide.offsetLabel.split(" (")[0]} — five papers, four sessions, two days.`
      : "Beijing times, fees and format, converted to your timezone.",
    chips: guide ? ["48 in 60", "80 in 90", "0–100", "csca.cn"] : ["Same exam", "Local times", "0–100"],
  });
}
