import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "CSCA 常见问题 20 问：报名、科目、考场、成绩与重考。";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function ZhWendaOgImage() {
  return renderOgCard({
    eyebrow: "CSCA 常见问题",
    headline: "20 个问题，把 CSCA 讲清楚。",
    subline: "报名 · 科目 · 设备 · 考场规则 · 成绩与重考",
    chips: ["官方核对", "含居家网考", "不编造及格线"],
    lang: "zh",
  });
}
