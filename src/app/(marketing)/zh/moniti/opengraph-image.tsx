import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "CSCA 模拟题：48 题 60 分钟、80 题 90 分钟，含样题与解析。";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function ZhMonitiOgImage() {
  return renderOgCard({
    eyebrow: "模拟题 · 全真结构",
    headline: "按官方结构做题：48 题 60 分钟，80 题 90 分钟。",
    subline: "数学、物理、化学 48 题 · 专业中文 80 题 · 每题含解析",
    chips: ["48 / 60", "80 / 90", "免费开始"],
    lang: "zh",
  });
}
