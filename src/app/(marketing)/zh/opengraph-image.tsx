import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "CSCA 中文指南：五个科目、两种卷长、报名与考场规则，逐条标注官方来源。";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function ZhOgImage() {
  return renderOgCard({
    eyebrow: "CSCA 中文指南",
    headline: "五个科目，两种卷长，一份中文指南。",
    subline: "科目 · 时长 · 报名 · 费用 · 成绩与考场规则",
    chips: ["48 题 / 60 分钟", "80 题 / 90 分钟", "成绩两年有效"],
    lang: "zh",
  });
}
