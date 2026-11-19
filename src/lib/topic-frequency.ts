/**
 * Past-paper frequency by topic.
 *
 * Counts come from the transcribed official sittings in
 * `prisma/seed-data/questions/official-*.ts` — 7 Mathematics papers, 4 Physics
 * and 4 Chemistry (Professional Chinese is a single paper, so it has no
 * spread). Used to tag topic lists with a "drill this first" signal.
 */

export type FrequencyTier = "high" | "medium" | "low";

const COUNTS: Record<string, Record<string, number>> = {
  MATH: {
    "M1.1": 12,
    "M1.2": 16,
    "M2.1": 33,
    "M2.2": 81,
    "M2.3": 40,
    "M2.4": 1,
    "M3.1": 86,
    "M3.2": 5,
    "M3.3": 5,
    "M4.1": 4,
    "M4.3": 1,
  },
  PHYS: {
    "P1.1": 33,
    "P1.2": 32,
    "P1.3": 8,
    "P1.4": 19,
    "P1.5": 15,
    "P1.6": 9,
    "P2.1": 24,
    "P2.2": 10,
    "P2.3": 9,
    "P2.4": 10,
    "P3.2": 6,
    "P3.3": 1,
    "P4.1": 9,
  },
  CHEM: {
    "C1.1": 14,
    "C1.2": 8,
    "C1.3": 12,
    "C1.4": 13,
    "C2.1": 15,
    "C2.2": 15,
    "C2.3": 13,
    "C2.4": 8,
    "C3.1": 21,
    "C3.2": 2,
    "C3.3": 14,
    "C3.4": 12,
    "C4.1": 1,
    "C4.2": 6,
    "C4.3": 2,
    "C4.4": 1,
  },
  CH_HUM: { H1: 40 },
  CH_SCI: {},
};

/**
 * Whether this subject has enough distinct transcribed sittings to compute a
 * meaningful per-topic frequency tier across topics (`MATH`, `PHYS`, `CHEM`).
 */
export function hasPastPaperSpread(subjectCode: string): boolean {
  return Object.keys(COUNTS[subjectCode] ?? {}).length >= 2;
}

/** Number of past-paper questions recorded for a topic. */
export function topicCount(subjectCode: string, topicCode: string): number {
  return COUNTS[subjectCode]?.[topicCode] ?? 0;
}

/**
 * Relative tier within the subject: the top third of topics by past-paper
 * count is "high", the middle third "medium", the rest "low". Relative rather
 * than absolute because Math has 7 papers and Physics/Chemistry 4.
 */
export function topicTier(subjectCode: string, topicCode: string): FrequencyTier {
  const map = COUNTS[subjectCode];
  const count = map?.[topicCode] ?? 0;
  if (!map || count === 0) return "low";
  const distinct = [...new Set(Object.values(map))].sort((a, b) => b - a);
  const rank = distinct.indexOf(count);
  const third = Math.max(1, Math.ceil(distinct.length / 3));
  if (rank < third) return "high";
  if (rank < third * 2) return "medium";
  return "low";
}

export const TIER_LABEL: Record<FrequencyTier, string> = {
  high: "High frequency",
  medium: "Medium",
  low: "Low",
};

export const TIER_SHORT: Record<FrequencyTier, string> = {
  high: "High",
  medium: "Med",
  low: "Low",
};

/** Tailwind classes for the badge, consistent with the light app shell. */
export const TIER_CLASS: Record<FrequencyTier, string> = {
  high: "border-vermillion/30 bg-vermillion/10 text-vermillion-deep",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  low: "border-line bg-paper-deep text-ink-faint",
};
