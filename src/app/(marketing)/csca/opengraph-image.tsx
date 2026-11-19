import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt =
  "CSCA exam guide — format, subjects, timetable, fees and scoring, sourced to csca.cn and dated.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function CscaOgImage() {
  return renderOgCard({
    eyebrow: "EXAM GUIDE",
    headline: "The CSCA, explained without the consultant fog.",
    subline: "What is fixed, what varies by university, and what nobody tells you in time",
    chips: ["5 subjects", "6 sittings", "CNY 450 / 700", "2-year validity"],
  });
}
