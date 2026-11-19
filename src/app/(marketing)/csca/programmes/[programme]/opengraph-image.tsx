import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { getProgramme } from "@/lib/programmes";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Which CSCA papers your programme expects.";

/** One card per programme, using the same combination the page states. */
export default async function ProgrammeOgImage({ params }: { params: Promise<{ programme: string }> }) {
  const { programme } = await params;
  const item = getProgramme(programme);

  return renderOgCard({
    eyebrow: item ? item.group.toUpperCase() : "CSCA BY PROGRAMME",
    headline: item ? `CSCA for ${item.name}` : "Which CSCA papers your programme expects.",
    subline: item ? item.combination : "Subject combinations by discipline, with the university-set part flagged.",
    chips: item ? item.electives.length > 0 ? ["Maths", ...item.electives.map((code) => (code === "PHYS" ? "Physics" : "Chemistry"))] : ["Maths", "Chinese", "0–100"] : ["8 programmes", "Maths compulsory", "0–100"],
  });
}
