"use client";

import { useId, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MathText } from "@/components/math-text";
import { cn } from "@/lib/utils";

/**
 * Answer grid with a detail panel.
 *
 * The server-rendered version answered one question ("what shape was my
 * paper?"). This one answers the follow-up ("what happened on question 37?")
 * without leaving the page: hover or keyboard-focus a square and the question,
 * both answers and the explanation appear beside the grid.
 *
 * The payload is trimmed on the server before it gets here — stems, options,
 * the correct index and a short explanation, nothing else.
 */
export type AnswerCell = {
  position: number;
  questionId: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTitle?: string;
};

export function AnswerGridInteractive({
  cells,
  answers,
  columns,
  className,
  initialFilter = "all",
  language = "en",
}: {
  cells: AnswerCell[];
  answers: Record<string, number>;
  columns?: number;
  className?: string;
  initialFilter?: "all" | "wrong";
  language?: "en" | "zh";
}) {
  const zh = language === "zh";
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<"all" | "correct" | "wrong" | "blank">(
    initialFilter === "wrong" ? "wrong" : "all",
  );
  const panelId = useId();

  const stateOf = (cell: AnswerCell) => {
    const given = answers[cell.questionId];
    if (given === undefined) return "blank" as const;
    return given === cell.correctIndex ? "correct" : "wrong";
  };

  const correctCount = cells.filter((cell) => stateOf(cell) === "correct").length;
  const answeredCount = cells.filter((cell) => answers[cell.questionId] !== undefined).length;
  const wrongCount = answeredCount - correctCount;
  const blankCount = cells.length - answeredCount;

  const cols = columns ?? (cells.length > 48 ? 16 : 12);
  const visibleCells =
    filter === "all" ? cells : cells.filter((cell) => stateOf(cell) === filter);
  const displayedIndex = active ?? pinned;
  const selected = displayedIndex !== null ? visibleCells[displayedIndex] : null;
  const isPinned = pinned !== null && displayedIndex === pinned;
  const syncReview = (next: "correct" | "wrong" | "blank") => {
    // Only the "wrong" view exists in the review list, so that is the only one
    // that changes the URL. The others filter the grid locally.
    if (next === "wrong") {
      router.replace(`${pathname}?filter=wrong`, { scroll: false });
      document.getElementById("review")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (filter === "wrong") {
      router.replace(pathname, { scroll: false });
    }
  };

  const toggle = (next: "correct" | "wrong" | "blank") => {
    const value = filter === next ? "all" : next;
    setFilter(value);
    setActive(null);
    setPinned(null);
    syncReview(value === "all" ? "correct" : value);
  };

  return (
    <div className={cn("not-prose", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
          {zh ? "全部题目" : "Every question"}
        </p>
        <p className="text-[10.5px] text-ink-faint tabular">
          {zh
            ? `${cells.length} 题 · 已答 ${answeredCount} 题`
            : `${cells.length} questions · ${answeredCount} answered`}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div
          className="grid min-w-0 gap-1"
          style={{ gridTemplateColumns: `repeat(${Math.min(cols, Math.max(1, visibleCells.length))}, minmax(0, 1fr))` }}
        >
          {visibleCells.map((cell, index) => {
            const state = stateOf(cell);
            const isHighlighted = active === index || pinned === index;
            return (
              <button
                key={cell.questionId}
                type="button"
                aria-describedby={panelId}
                aria-pressed={pinned === index}
                aria-label={
                  zh
                    ? `第 ${cell.position} 题：${state === "blank" ? "未作答" : state === "correct" ? "正确" : "答错"}`
                    : `Question ${cell.position}: ${state === "blank" ? "not answered" : state}`
                }
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                onClick={() => {
                  if (pinned === index) {
                    setPinned(null);
                    setActive(null);
                  } else {
                    setPinned(index);
                    setActive(index);
                  }
                }}
                className={cn(
                  "aspect-square rounded-[3px] border transition focus-visible:ring-2 focus-visible:ring-indigo/50 focus-visible:ring-offset-1 focus-visible:ring-offset-card focus-visible:outline-none",
                  state === "correct" && "border-jade/40 bg-jade/70",
                  state === "wrong" && "border-rose-500/40 bg-rose-500/75",
                  state === "blank" && "border-dashed border-line-strong bg-transparent",
                  isHighlighted && "ring-2 ring-ink/50 ring-offset-1 ring-offset-card",
                )}
              />
            );
          })}
        </div>

        <div
          id={panelId}
          aria-live="polite"
          className="min-h-[170px] min-w-0 rounded-xl border border-line bg-paper-deep/30 p-3.5"
        >
          {selected ? (
            <QuestionDetail
              cell={selected}
              given={answers[selected.questionId]}
              state={stateOf(selected)}
              zh={zh}
              pinned={isPinned}
              onUnpin={() => {
                setPinned(null);
                setActive(null);
              }}
            />
          ) : (
            <div className="flex h-full min-h-[150px] flex-col justify-center text-[11.5px] leading-relaxed text-ink-faint">
              <p className="font-medium text-ink-soft">
                {zh ? "悬停或点击任意方格" : "Hover or click any square"}
              </p>
              <p className="mt-1">
                {zh
                  ? "每道题都保留了完整解析。指向或点击任意方格即可查看你的选项、正确答案与解析。"
                  : "Every question is kept with its explanation. Hover to preview, or click a square to pin it."}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="print-only print-sheet-foot text-[8pt] text-ink-faint" />
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-ink-soft">
        {[
          { key: "correct" as const, label: zh ? `${correctCount} 正确` : `${correctCount} correct`, swatch: "border border-jade/40 bg-jade/70" },
          { key: "wrong" as const, label: zh ? `${wrongCount} 答错` : `${wrongCount} wrong`, swatch: "border border-rose-500/40 bg-rose-500/75" },
          { key: "blank" as const, label: zh ? `${blankCount} 未答` : `${blankCount} blank`, swatch: "border border-dashed border-line-strong" },
        ].map((chip) => (
          <button
            key={chip.key}
            type="button"
            aria-pressed={filter === chip.key}
            onClick={() => {
              setActive(null);
              setPinned(null);
              toggle(chip.key);
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition",
              filter === chip.key
                ? "border-ink/25 bg-ink text-paper"
                : "border-line bg-card text-ink-soft hover:border-line-strong",
            )}
          >
            <span className={cn("h-2.5 w-2.5 rounded-[2px]", chip.swatch)} /> {chip.label}
          </button>
        ))}
        {filter !== "all" && (
          <button
            type="button"
            onClick={() => {
              setActive(null);
              setPinned(null);
              setFilter("all");
              router.replace(pathname, { scroll: false });
            }}
            className="rounded-full px-2 py-1 text-[11px] font-medium text-indigo hover:underline"
          >
            {zh ? `显示全部 ${cells.length}` : `Show all ${cells.length}`}
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionDetail({
  cell,
  given,
  state,
  zh,
  pinned,
  onUnpin,
}: {
  cell: AnswerCell;
  given: number | undefined;
  state: "correct" | "wrong" | "blank";
  zh: boolean;
  pinned?: boolean;
  onUnpin?: () => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
          {zh ? `第 ${cell.position} 题` : `Question ${cell.position}`}
          {cell.topicTitle ? ` · ${cell.topicTitle}` : ""}
        </p>
        <span
          className={cn(
            "text-[10px] font-medium uppercase",
            state === "correct" && "text-jade",
            state === "wrong" && "text-rose-600",
            state === "blank" && "text-ink-faint",
          )}
        >
          {zh
            ? state === "blank"
              ? "未作答"
              : state === "correct"
                ? "正确"
                : "答错"
            : state === "blank"
              ? "blank"
              : state}
        </span>
      </div>

      <div className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-ink">
        <MathText inline>{cell.stem}</MathText>
      </div>

      <div className="mt-2 space-y-1">
        {cell.options.map((option, index) => {
          const isCorrect = index === cell.correctIndex;
          const isGiven = index === given;
          return (
            <div
              key={index}
              className={cn(
                "flex items-start gap-1.5 rounded px-1.5 py-0.5 text-[11.5px]",
                isCorrect && "bg-jade/10 text-ink",
                !isCorrect && isGiven && "bg-rose-500/10 text-ink",
                !isCorrect && !isGiven && "text-ink-soft",
              )}
            >
              <span className="w-3 shrink-0 text-[10px] font-semibold text-ink-faint">
                {"ABCD"[index]}
              </span>
              <span className="line-clamp-2 min-w-0 flex-1">
                <MathText inline>{option}</MathText>
              </span>
              {isCorrect && (
                <span className="shrink-0 text-[9px] font-medium text-jade uppercase">
                  {zh ? "正确" : "correct"}
                </span>
              )}
              {isGiven && !isCorrect && (
                <span className="shrink-0 text-[9px] font-medium text-rose-600 uppercase">
                  {zh ? "你的选择" : "yours"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {cell.explanation && (
        <div className="mt-2 line-clamp-3 border-t border-line pt-2 text-[11px] leading-relaxed text-ink-soft">
          <MathText inline>{cell.explanation}</MathText>
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line/70 pt-2">
        <a
          href={`#review-q-${cell.position}`}
          className="text-[11px] font-medium text-indigo hover:underline"
        >
          {zh ? "查看完整解析 ↓" : "Jump to full solution ↓"}
        </a>
        {pinned && onUnpin && (
          <button
            type="button"
            onClick={onUnpin}
            className="text-[10.5px] text-ink-faint hover:text-ink"
          >
            {zh ? "取消固定" : "Unpin"}
          </button>
        )}
      </div>
    </div>
  );
}
