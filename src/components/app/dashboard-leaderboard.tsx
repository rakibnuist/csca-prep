"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export type LeaderboardRow = { name: string; average: number; count: number; isMe: boolean };
export type LeaderboardBoard = {
  code: string;
  label: string;
  /** Top 3 students for this subject. */
  rows: LeaderboardRow[];
  /** The current student's rank among all students (1-based), or null. */
  myRank: number | null;
  /** The current student's average mock score for this subject. */
  myAverage: number | null;
};

/**
 * Results-based leaderboard for the dashboard.
 *
 * Ranked by each student's *average* mock-test score for the chosen subject,
 * across every user. Shows the top three names plus the viewer's own rank.
 * Names respect the leaderboard opt-in; otherwise a stable anonymous handle.
 */
export function DashboardLeaderboard({
  boards,
  lang,
}: {
  boards: LeaderboardBoard[];
  lang: "en" | "zh";
}) {
  const [active, setActive] = useState(boards[0]?.code ?? "");
  const zh = lang === "zh";
  if (boards.length === 0) return null;
  const board = boards.find((entry) => entry.code === active) ?? boards[0];

  return (
    <section className="rounded-xl border border-line bg-card p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow flex min-w-0 items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 shrink-0" /> {zh ? "排行榜" : "Leaderboard"}
        </p>
        <Link href={`/${zh ? "cn" : "en"}/leaderboard`} className="shrink-0 text-[11px] text-ink-soft hover:text-ink">
          {zh ? "完整榜" : "Full board"} →
        </Link>
      </div>
      <p className="mt-1 text-[10.5px] text-ink-faint">
        {zh ? "按模拟卷平均分排名 · 所有考生" : "Ranked by average mock score · all students"}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1">
        {boards.map((entry) => (
          <button
            key={entry.code}
            type="button"
            onClick={() => setActive(entry.code)}
            aria-pressed={entry.code === board.code}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
              entry.code === board.code
                ? "border-line-strong bg-paper-deep text-ink"
                : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <ol className="mt-3 space-y-1">
        {board.rows.length === 0 && (
          <li className="rounded-lg bg-paper-deep/40 px-3 py-3 text-[12px] text-ink-soft">
            {zh ? "还没有成绩——做一套卷即可上榜。" : "No scores yet — sit a paper to get on the board."}
          </li>
        )}
        {board.rows.map((row, rank) => (
          <li
            key={`${board.code}-${rank}`}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[12px]",
              row.isMe ? "bg-vermillion/5 font-medium text-ink" : "text-ink-soft",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="w-4 shrink-0 text-center text-[10.5px] text-ink-faint tabular">
                {rank + 1}
              </span>
              <span className="truncate">{row.name}</span>
            </span>
            <span className="shrink-0 tabular text-ink">
              {row.average}
              <span className="text-ink-faint">/100</span>
            </span>
          </li>
        ))}
      </ol>

      {board.myRank !== null && (
        <p className="mt-2 border-t border-line/70 pt-2 text-[10.5px] text-ink-faint">
          {zh
            ? `你的排名：第 ${board.myRank} 名 · 平均 ${board.myAverage ?? 0} 分`
            : `Your rank: #${board.myRank} of all students · avg ${board.myAverage ?? 0}/100`}
        </p>
      )}
    </section>
  );
}
