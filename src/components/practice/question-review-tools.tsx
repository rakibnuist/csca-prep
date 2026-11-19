"use client";

import { useState } from "react";
import { Bookmark, Check, Flag, Loader2, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuestionReviewTools({
  questionId,
  initialBookmarked = false,
  initialNote = null,
  zh = false,
}: {
  questionId: string;
  initialBookmarked?: boolean;
  initialNote?: string | null;
  zh?: boolean;
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [note, setNote] = useState(initialNote ?? "");
  const [draft, setDraft] = useState(initialNote ?? "");
  const [editingNote, setEditingNote] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const [reporting, setReporting] = useState(false);
  const [reportDraft, setReportDraft] = useState("");
  const [sendingReport, setSendingReport] = useState(false);
  const [reported, setReported] = useState(false);
  const [reportError, setReportError] = useState("");

  async function toggleBookmark() {
    if (savingBookmark) return;
    const next = !bookmarked;
    setBookmarked(next);
    setSavingBookmark(true);
    try {
      const res = await fetch("/api/practice/review-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, bookmarked: next }),
      });
      if (!res.ok) {
        setBookmarked(!next);
      }
    } catch {
      setBookmarked(!next);
    } finally {
      setSavingBookmark(false);
    }
  }

  async function saveNote(e: React.FormEvent) {
    e.preventDefault();
    if (savingNote) return;
    setSavingNote(true);
    try {
      const res = await fetch("/api/practice/review-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, note: draft }),
      });
      if (res.ok) {
        const data = (await res.json()) as { note?: string | null };
        const clean = data.note ?? "";
        setNote(clean);
        setDraft(clean);
        setEditingNote(false);
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 1800);
      }
    } finally {
      setSavingNote(false);
    }
  }

  async function submitReport(e: React.FormEvent) {
    e.preventDefault();
    if (sendingReport || reportDraft.trim().length < 3) return;
    setSendingReport(true);
    setReportError("");
    try {
      const res = await fetch("/api/practice/question-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, reason: reportDraft }),
      });
      if (res.ok) {
        setReported(true);
        setReporting(false);
        setReportDraft("");
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setReportError(data.error ?? (zh ? "提交失败" : "Could not send report"));
      }
    } catch {
      setReportError(zh ? "网络异常" : "Network error");
    } finally {
      setSendingReport(false);
    }
  }

  return (
    <div className="mt-3 space-y-2 border-t border-line/70 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleBookmark}
          disabled={savingBookmark}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition",
            bookmarked
              ? "border-gold/40 bg-gold/10 text-gold-deep"
              : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
          )}
        >
          <Bookmark className={cn("h-3.5 w-3.5", bookmarked && "fill-current")} />
          {bookmarked
            ? zh
              ? "已收藏到错题本"
              : "Bookmarked"
            : zh
              ? "收藏重点题"
              : "Bookmark"}
        </button>

        <button
          type="button"
          onClick={() => {
            setDraft(note);
            setEditingNote((v) => !v);
            setReporting(false);
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition",
            editingNote || note
              ? "border-indigo/30 bg-indigo/8 text-indigo"
              : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
          )}
        >
          <StickyNote className="h-3.5 w-3.5" />
          {note
            ? zh
              ? "编辑我的笔记"
              : "Edit my note"
            : zh
              ? "添加错因笔记"
              : "Add mistake note"}
        </button>

        <button
          type="button"
          onClick={() => {
            setReporting((v) => !v);
            setEditingNote(false);
            setReportError("");
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition",
            reported
              ? "border-jade/30 bg-jade-soft text-jade"
              : reporting
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
          )}
        >
          <Flag className="h-3.5 w-3.5" />
          {reported
            ? zh
              ? "已提交反馈"
              : "Reported to team"
            : zh
              ? "反馈题目问题"
              : "Report issue"}
        </button>

        {savedFlash ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-jade">
            <Check className="h-3 w-3" />
            {zh ? "已保存" : "Saved"}
          </span>
        ) : null}
      </div>

      {!editingNote && note ? (
        <div className="rounded-lg border border-indigo/20 bg-indigo/[0.04] px-3 py-2 text-[12px] leading-relaxed text-ink">
          <span className="mr-1.5 text-[10px] font-semibold tracking-[0.1em] text-indigo uppercase">
            {zh ? "我的笔记" : "My note"}:
          </span>
          <span>{note}</span>
        </div>
      ) : null}

      {editingNote ? (
        <form onSubmit={saveNote} className="space-y-2 rounded-lg border border-line bg-paper p-2.5">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder={
              zh
                ? "写下容易错的公式、概念盲区或考官陷阱…"
                : "Write why you missed this, which formula applies, or the trap to avoid…"
            }
            className="w-full rounded-lg border border-line bg-white p-2 text-[12px] text-ink placeholder:text-ink-faint focus:border-vermillion focus:outline-none"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10.5px] text-ink-faint tabular">{draft.length}/500</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setEditingNote(false)}
                className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] text-ink-soft hover:text-ink"
              >
                {zh ? "取消" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={savingNote}
                className="inline-flex items-center gap-1 rounded-lg bg-vermillion px-3 py-1 text-[11px] font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
              >
                {savingNote ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                {zh ? "保存笔记" : "Save note"}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {reporting ? (
        <form onSubmit={submitReport} className="space-y-2 rounded-lg border border-rose-200 bg-rose-50/40 p-2.5">
          <input
            value={reportDraft}
            onChange={(e) => setReportDraft(e.target.value)}
            maxLength={500}
            minLength={3}
            required
            placeholder={
              zh
                ? "请说明具体问题（如：公式排版、配图模糊、选项有误）…"
                : "Typo, formula glitch, diagram or option issue…"
            }
            className="h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12px] text-ink placeholder:text-ink-faint focus:border-vermillion focus:outline-none"
          />
          {reportError ? (
            <p className="text-[11px] text-rose-700">{reportError}</p>
          ) : null}
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setReporting(false)}
              className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] text-ink-soft hover:text-ink"
            >
              {zh ? "取消" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={sendingReport || reportDraft.trim().length < 3}
              className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
            >
              {sendingReport ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
              {zh ? "提交反馈" : "Send report"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
