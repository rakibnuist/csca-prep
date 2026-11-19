import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "CSCA 考试介绍：谁需要考、考哪些科目、怎么报名。";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function ZhKaoshiOgImage() {
  return renderOgCard({
    eyebrow: "CSCA 考试介绍",
    headline: "谁需要考、考哪些科目、怎么报名。",
    subline: "科目与卷长 · 报名材料与费用 · 考场与成绩规则",
    chips: ["5 个科目", "CNY 450 / 700", "10 个工作日"],
    lang: "zh",
  });
}
