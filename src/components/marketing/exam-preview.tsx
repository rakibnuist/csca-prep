import { MathText } from "@/components/math-text";
import { Clock, Flag, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { key: "A", text: "$45x^{4}$" },
  { key: "B", text: "$5x^{9}$" },
  { key: "C", text: "$9x^{4}$" },
  { key: "D", text: "$45x^{5}$" },
];

export function ExamPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="panel overflow-hidden">
        {/* chrome */}
        <div className="flex items-center justify-between border-b border-line bg-paper-deep/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-ink uppercase">
              Mathematics · Mock 01
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-ink px-2 py-1 text-[10.5px] font-medium text-paper tabular">
            <Clock className="h-3 w-3" /> 32:18
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_92px]">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-[10.5px] text-ink-faint">
              <span>Question 14 of 48</span>
              <span className="rounded border border-line px-1.5 py-0.5">Medium</span>
            </div>

            <p className="mt-3 text-[14px] leading-relaxed text-ink">
              What is the derivative of <MathText>{"$f(x) = 9x^{5}$"}</MathText> with respect to{" "}
              <MathText>{"$x$"}</MathText>?
            </p>

            <div className="mt-3.5 space-y-1.5">
              {OPTIONS.map((option, index) => {
                const selected = index === 0;
                return (
                  <div
                    key={option.key}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-[13px] transition",
                      selected
                        ? "border-vermillion/40 bg-vermillion/6 text-ink"
                        : "border-line bg-card text-ink-soft",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                        selected
                          ? "border-vermillion bg-vermillion text-paper"
                          : "border-line-strong text-ink-faint",
                      )}
                    >
                      {option.key}
                    </span>
                    <MathText>{option.text}</MathText>
                    {selected && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-vermillion" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-line p-3 sm:border-t-0 sm:border-l">
            <p className="text-[9px] tracking-[0.12em] text-ink-faint uppercase">Palette</p>
            <div className="mt-2 grid grid-cols-6 gap-1 sm:grid-cols-4">
              {Array.from({ length: 24 }).map((_, index) => {
                const answered = [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12].includes(index);
                const flagged = [4, 10].includes(index);
                const current = index === 13;
                return (
                  <span
                    key={index}
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-[3px] text-[8px] font-medium tabular",
                      current && "bg-ink text-paper",
                      !current && answered && "bg-vermillion/15 text-vermillion-deep",
                      !current && !answered && "border border-line text-ink-faint",
                      flagged && !current && "bg-gold-soft text-gold ring-1 ring-gold/40",
                    )}
                  >
                    {index + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line bg-paper-deep/40 px-4 py-2">
          <span className="inline-flex items-center gap-1 text-[10.5px] text-ink-faint">
            <Flag className="h-3 w-3" /> Flag for review
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[10.5px] text-paper">
            Next <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* floating score card */}
      <div className="absolute -right-2 -bottom-12 w-[168px] rounded-xl border border-line bg-card p-3 shadow-[var(--shadow-lift)] sm:-right-6">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] tracking-wide text-ink-faint uppercase">Score</span>
          <span className="text-[10px] font-medium text-jade">+6 vs last</span>
        </div>
        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-display text-[2rem] leading-none text-ink tabular">84</span>
          <span className="pb-1 text-[11px] text-ink-faint">/ 100</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
          <div className="h-full w-[84%] rounded-full bg-jade" />
        </div>
        <p className="mt-1.5 text-[10px] text-ink-faint">Estimated 91st percentile</p>
      </div>
    </div>
  );
}
