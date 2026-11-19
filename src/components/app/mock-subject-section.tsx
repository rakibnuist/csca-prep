"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  FileText,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Pill } from "@/components/site/section";
import { cn } from "@/lib/utils";
import { t, type Lang } from "@/lib/i18n";

export type MockCardItem = {
  id: string;
  slug: string;
  title: string;
  durationMin: number;
  itemCount: number;
  figureCount: number;
  isOriginal: boolean;
  setNum: number;
  isFreeMock: boolean;
  submittedCount: number;
  bestScore: number;
  inProgress: boolean;
  canSit: boolean;
  entitlementNote: string;
  examHref: string;
  briefingHref: string;
  redeemHref: string;
};

export function MockSubjectSection({
  subjectCode,
  subjectName,
  subjectAltName,
  totalInSubject,
  freeCount,
  satCount,
  bestSubjectScore,
  items,
  lang,
  defaultExpanded = false,
}: {
  subjectCode: string;
  subjectName: string;
  subjectAltName: string;
  totalInSubject: number;
  freeCount: number;
  satCount: number;
  bestSubjectScore: number | null;
  items: MockCardItem[];
  lang: Lang;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const zh = lang === "zh";

  if (items.length === 0) return null;

  // Primary slice: keep original + free sets + any in-progress/completed mocks (up to 6+, or all if <= 6)
  const primaryItems = (() => {
    if (expanded || defaultExpanded || items.length <= 6) return items;
    const priority = items.filter(
      (item) => item.isFreeMock || item.inProgress || item.submittedCount > 0,
    );
    if (priority.length >= 5) return priority.slice(0, Math.max(6, priority.length));
    return items.slice(0, 6);
  })();

  const hiddenCount = items.length - primaryItems.length;
  const completionPct =
    totalInSubject > 0 ? Math.round((satCount / totalInSubject) * 100) : 0;

  return (
    <section aria-label={subjectName} data-subject={subjectCode}>
      <div className="border-b border-line pb-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-[22px] leading-tight text-ink">{subjectName}</h2>
              <span className="font-chinese text-[13px] text-ink-faint">{subjectAltName}</span>
            </div>
            <p className="mt-0.5 text-[11.5px] text-ink-faint">
              {totalInSubject} {zh ? "套模拟卷" : "mocks"} ·{" "}
              <span className="font-medium text-jade">
                {freeCount} {zh ? "套免费" : "free"}
              </span>{" "}
              · {satCount}/{totalInSubject} {zh ? "已完成" : "sat"}
            </p>
          </div>
          {bestSubjectScore !== null && (
            <Pill tone="jade">
              <CheckCircle2 className="h-3 w-3" />
              {zh ? `最高 ${bestSubjectScore}/100` : `Best ${bestSubjectScore}/100`}
            </Pill>
          )}
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
          <div
            className="h-full rounded-full bg-jade transition-all"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {primaryItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex h-full min-w-0 flex-col gap-2.5 rounded-xl border bg-paper px-4 py-3 transition hover:border-line-strong hover:shadow-[var(--shadow-card)]",
              item.isOriginal ? "border-line-strong/70" : "border-line",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {item.isOriginal ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[9.5px] font-semibold tracking-[0.04em] text-paper uppercase">
                    <Sparkles className="h-2.5 w-2.5" /> {t(lang, "Original")}
                  </span>
                ) : (
                  <span className="rounded-full border border-line bg-card px-2 py-0.5 text-[9.5px] font-semibold tracking-[0.04em] text-ink-soft uppercase">
                    {zh
                      ? `练习卷 ${item.setNum > 0 ? String(item.setNum).padStart(2, "0") : ""}`
                      : `Set ${item.setNum > 0 ? String(item.setNum).padStart(2, "0") : ""}`}
                  </span>
                )}
                {item.isFreeMock && item.canSit && (
                  <span className="rounded-full bg-jade-soft px-2 py-0.5 text-[9.5px] font-semibold text-jade">
                    {t(lang, "Free")}
                  </span>
                )}
                {item.inProgress ? (
                  <Pill tone="gold">{t(lang, "In progress")}</Pill>
                ) : item.submittedCount > 0 ? (
                  <Pill tone="jade">
                    <CheckCircle2 className="h-3 w-3" /> {item.bestScore}/100
                  </Pill>
                ) : null}
              </div>
              <p className="mt-1.5 truncate text-[13px] font-medium text-ink">{item.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10.5px] text-ink-faint">
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {item.itemCount}
                  {zh ? "题" : "q"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3 w-3" /> {item.durationMin}
                  {zh ? "分钟" : "m"}
                </span>
                {item.figureCount > 0 && (
                  <span>
                    {item.figureCount} {zh ? "张图" : "diagrams"}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-1.5 text-[10.5px]",
                  item.canSit ? "text-ink-faint" : "text-vermillion",
                )}
              >
                {item.entitlementNote}
              </p>
            </div>
            <div className="mt-auto flex shrink-0 flex-wrap items-center gap-2 pt-1">
              {item.inProgress ? (
                <Link
                  href={item.examHref}
                  className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
                >
                  <Play className="h-3 w-3" /> {t(lang, "Resume")}
                </Link>
              ) : item.canSit ? (
                <Link
                  href={item.briefingHref}
                  className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md bg-vermillion px-3 text-[11.5px] font-medium text-paper transition hover:bg-vermillion-deep"
                >
                  {item.submittedCount > 0 ? (
                    <RotateCcw className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  {item.submittedCount > 0 ? t(lang, "Retake") : t(lang, "Start")}
                </Link>
              ) : (
                <Link
                  href={item.redeemHref}
                  className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
                >
                  {t(lang, "Redeem Pro")} <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {!defaultExpanded && items.length > 6 && (hiddenCount > 0 || expanded) && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12px] font-medium text-ink transition hover:border-ink/30"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                {zh ? "收起练习卷" : "Collapse practice sets"}
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                {zh
                  ? `展开 ${subjectName} 全部 ${items.length} 套试卷（还有 ${hiddenCount} 套）`
                  : `Show all ${items.length} papers in ${subjectName} (${hiddenCount} more)`}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
