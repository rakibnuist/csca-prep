/**
 * Per-question pacing, shared by the exam client, the attempt API and the
 * result page.
 *
 * The client measures how long each question is on screen (a hidden tab pauses
 * the clock) and posts the map with every autosave. This module owns the only
 * copy of the rules about what a valid map is, so the two routes and the
 * database writer cannot drift apart. Nothing here imports Prisma or
 * `server-only`: the maths must stay testable in a plain script.
 */

/** Two hours is far beyond any paper; anything larger is bogus or stale. */
export const MAX_QUESTION_MS = 2 * 60 * 60 * 1000;

/** How many questions a single payload may describe. */
export const MAX_QUESTION_ENTRIES = 200;

/**
 * Keep a client-supplied dwell map to something the database and the report can
 * trust: string keys of sane length, positive finite milliseconds, capped.
 * Returns undefined when nothing usable survives, so callers can leave the
 * stored value untouched.
 */
export function sanitizeTimePerQuestion(value: unknown): Record<string, number> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const out: Record<string, number> = {};
  let kept = 0;
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (kept >= MAX_QUESTION_ENTRIES) break;
    if (typeof key !== "string" || key.length === 0 || key.length > 64) continue;
    if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) continue;
    out[key] = Math.min(MAX_QUESTION_MS, Math.round(raw));
    kept += 1;
  }
  return kept > 0 ? out : undefined;
}

/** "45s" / "2m 05s" — the report's only time format. */
export function formatPace(ms: number): string {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  if (totalSec >= 60) {
    return `${Math.floor(totalSec / 60)}m ${String(totalSec % 60).padStart(2, "0")}s`;
  }
  return `${totalSec}s`;
}

export type PaceRow = {
  n: number;
  ms: number;
  answered: boolean;
  correct: boolean;
  topic: string;
};

export type PaceSummary = {
  /** Questions with a recorded dwell time. */
  measured: number;
  /** Questions that took longer than twice the target pace. */
  overTarget: number;
  /** Share of measured time spent on questions answered wrongly, 0–100. */
  wrongShare: number;
  slowest: PaceRow[];
};

/**
 * The report's read of a dwell map. `targetSec` is the paper's equal share of
 * the clock (60 s × 60 / 48 ≈ 75 s for a 48-question paper).
 */
export function summarizePacing(rows: PaceRow[], targetSec: number): PaceSummary {
  const measuredRows = rows.filter((row) => row.ms > 0);
  const measuredMs = measuredRows.reduce((sum, row) => sum + row.ms, 0);
  const wrongMs = measuredRows
    .filter((row) => row.answered && !row.correct)
    .reduce((sum, row) => sum + row.ms, 0);
  return {
    measured: measuredRows.length,
    overTarget: measuredRows.filter((row) => row.ms > targetSec * 2000).length,
    wrongShare: measuredMs > 0 ? Math.round((wrongMs / measuredMs) * 100) : 0,
    slowest: [...measuredRows].sort((a, b) => b.ms - a.ms).slice(0, 5),
  };
}
