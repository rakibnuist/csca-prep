import { cn } from "@/lib/utils";

/**
 * The answer grid.
 *
 * One square per question, shaded by what actually happened: correct, wrong,
 * or never answered. It replaces a percentage with the shape of the paper —
 * which is the thing a candidate can act on. A contiguous block of wrong
 * answers reads very differently from three mistakes scattered through it.
 *
 * Only what the attempt recorded is shown. The exam client does not report
 * per-question time, so this grid does not pretend to: sequence is the only
 * ordering it claims.
 */
export function AnswerGrid({
  items,
  answers,
  columns,
  className,
  language = "en",
}: {
  items: { questionId: string; correctIndex: number; topicCode?: string }[];
  answers: Record<string, number>;
  columns?: number;
  className?: string;
  language?: "en" | "zh";
}) {
  const zh = language === "zh";
  const answeredCount = items.filter((item) => answers[item.questionId] !== undefined).length;
  const correctCount = items.filter((item) => answers[item.questionId] === item.correctIndex).length;
  const wrongCount = answeredCount - correctCount;
  const blankCount = items.length - answeredCount;

  const cols = columns ?? (items.length > 48 ? 16 : 12);

  return (
    <figure className={cn("not-prose", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
          {zh ? "全部题目" : "Every question"}
        </p>
        <p className="text-[10.5px] text-ink-faint tabular">
          {zh
            ? `${items.length} 题 · 已答 ${answeredCount} 题`
            : `${items.length} questions · ${answeredCount} answered`}
        </p>
      </div>

      <div
        className="mt-3 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        role="img"
        aria-label={
          zh
            ? `${correctCount} 正确，${wrongCount} 答错，${blankCount} 未答`
            : `${correctCount} correct, ${wrongCount} wrong, ${blankCount} blank`
        }
      >
        {items.map((item, position) => {
          const given = answers[item.questionId];
          const state = given === undefined ? "blank" : given === item.correctIndex ? "correct" : "wrong";
          return (
            <span
              key={item.questionId}
              title={
                zh
                  ? `第 ${position + 1} 题${item.topicCode ? ` · ${item.topicCode}` : ""} — ${
                      state === "blank" ? "未作答" : state === "correct" ? "正确" : "答错"
                    }`
                  : `Q${position + 1}${item.topicCode ? ` · ${item.topicCode}` : ""} — ${
                      state === "blank" ? "not answered" : state === "correct" ? "correct" : "wrong"
                    }`
              }
              className={cn(
                "aspect-square rounded-[3px] border",
                state === "correct" && "border-jade/40 bg-jade/70",
                state === "wrong" && "border-vermillion/40 bg-vermillion/70",
                state === "blank" && "border-dashed border-line-strong bg-transparent",
              )}
            />
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] border border-jade/40 bg-jade/70" />{" "}
          {zh ? `${correctCount} 正确` : `${correctCount} correct`}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] border border-vermillion/40 bg-vermillion/70" />{" "}
          {zh ? `${wrongCount} 答错` : `${wrongCount} wrong`}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] border border-dashed border-line-strong" />{" "}
          {zh ? `${blankCount} 未答` : `${blankCount} blank`}
        </span>
      </div>
    </figure>
  );
}
