"use client";

import { Printer } from "lucide-react";

/**
 * Print / save-as-PDF the score report.
 *
 * The result page is already a clean document; `@media print` in globals.css
 * hides the app chrome and forces the layout to a single column, so the
 * browser's "Save as PDF" produces the report students attach to an
 * application — no PDF library, no server round-trip.
 */
export function PrintReportButton({ language = "en" }: { language?: "en" | "zh" }) {
  const zh = language === "zh";
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-line bg-card px-4 py-3 text-[11.5px] font-medium text-ink transition hover:border-line-strong print:hidden"
      title={zh ? "打印或保存为 PDF" : "Print or save this report as PDF"}
    >
      <Printer className="h-4 w-4 text-ink-faint" />
      {zh ? "报告" : "Report"}
      <span className="text-[9.5px] font-normal text-ink-faint">
        {zh ? "打印 / PDF" : "print / PDF"}
      </span>
    </button>
  );
}
