import type { AccessInfo } from "@/lib/access";

/**
 * Entitlement model.
 *
 * The product has two paper products and they are gated differently:
 *
 *   Mock tests   — ours. Original mocks and practice sets. Free accounts get
 *                  a small allowance; Pro gets unlimited.
 *   Official      — the real sittings. Free accounts can *study* them (read
 *   papers         the working, no timer) because that is the SEO funnel;
 *                  sitting them on the clock is a Pro feature.
 *
 * Free accounts can sit 50 mock papers in total: 2 attempts on each of the 5
 * original mocks, plus 2 attempts on practice sets 01-04 of every subject
 * (5 free mock tests per subject). Official papers are free to study.
 */

export type PaperKind = "original" | "set" | "official" | "review";

export type EntitlementReason = "OK" | "LIMIT" | "STUDY_ONLY";

export type Entitlement = {
  /** May the student start a timed attempt? */
  canSit: boolean;
  /** Attempts remaining. -1 means unlimited. */
  attemptsLeft: number;
  reason: EntitlementReason;
  /** Short, human sentence for the card. */
  note: string;
};

export const FREE_ATTEMPTS_PER_ORIGINAL = 2;
export const FREE_ATTEMPTS_PER_SET = 2;
export const FREE_ATTEMPTS_PER_OFFICIAL = 2;
/** Practice sets 01..N per subject are free to sit (5 free mocks/subject = 1 original + N sets). */
export const FREE_SETS_PER_SUBJECT = 4;

export function paperKind(paper: string | null, slug: string): PaperKind {
  if (paper === "Official") return "official";
  if (paper === "Review") return "review";
  if (paper === "Practice Set" || slug.startsWith("csca-set-")) return "set";
  return "original";
}

/** `csca-set-math-07` -> 7. Returns 0 when the slug is not a numbered set. */
export function setNumber(slug: string): number {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

export function isPro(access: Pick<AccessInfo, "isPro">): boolean {
  return access.isPro;
}

/**
 * What this student may do with this paper.
 *
 * `submittedCount` is how many times they have already sat this paper.
 */
export function entitlementFor(
  access: Pick<AccessInfo, "isPro">,
  kind: PaperKind,
  slug: string,
  submittedCount: number,
  lang: "en" | "zh" = "en",
): Entitlement {
  const zh = lang === "zh";
  if (access.isPro) {
    return {
      canSit: true,
      attemptsLeft: -1,
      reason: "OK",
      note: zh ? "不限次数" : "Unlimited attempts",
    };
  }

  if (kind === "official" || kind === "review") {
    // Sitting an official paper on the clock is the paid line — but a student
    // who has already sat it keeps their remaining attempts. Taking away a
    // capability someone has already used is a bad first experience, and the
    // upsell still applies to every paper they have not started.
    if (submittedCount === 0) {
      return {
        canSit: false,
        attemptsLeft: 0,
        reason: "STUDY_ONLY",
        note: zh
          ? "学习模式免费——计时作答需专业版"
          : "Study mode is free — sit it on the clock with Pro",
      };
    }
    const left = Math.max(0, FREE_ATTEMPTS_PER_OFFICIAL - submittedCount);
    return {
      canSit: left > 0,
      attemptsLeft: left,
      reason: left > 0 ? "OK" : "LIMIT",
      note:
        left > 0
          ? zh
            ? `剩余 ${left} 次免费机会`
            : `${left} free ${left === 1 ? "attempt" : "attempts"} left`
          : zh
            ? "免费次数已用完——专业版不限次数"
            : "Free attempts used — Pro for unlimited",
    };
  }

  if (kind === "set") {
    const free = setNumber(slug) <= FREE_SETS_PER_SUBJECT;
    if (!free) {
      return {
        canSit: false,
        attemptsLeft: 0,
        reason: "LIMIT",
        note: zh
          ? `每科练习卷 01–0${FREE_SETS_PER_SUBJECT} 免费（每科 5 套免费模拟）`
          : `Practice sets 01–0${FREE_SETS_PER_SUBJECT} are free per subject (5 free mocks/subject)`,
      };
    }
    const left = Math.max(0, FREE_ATTEMPTS_PER_SET - submittedCount);
    return {
      canSit: left > 0,
      attemptsLeft: left,
      reason: left > 0 ? "OK" : "LIMIT",
      note:
        left > 0
          ? zh
            ? `剩余 ${left} 次免费机会`
            : `${left} free ${left === 1 ? "attempt" : "attempts"} left`
          : zh
            ? "免费次数已用完"
            : "Free attempts used",
    };
  }

  // Original mock.
  const left = Math.max(0, FREE_ATTEMPTS_PER_ORIGINAL - submittedCount);
  return {
    canSit: left > 0,
    attemptsLeft: left,
    reason: left > 0 ? "OK" : "LIMIT",
    note:
      left > 0
        ? zh
          ? `剩余 ${left} 次免费机会`
          : `${left} free ${left === 1 ? "attempt" : "attempts"} left`
        : zh
          ? "免费次数已用完"
          : "Free attempts used",
  };
}

/** Human label for a paper kind, used on cards. */
export const KIND_LABEL: Record<PaperKind, string> = {
  original: "Original mock",
  set: "Practice set",
  official: "Official paper",
  review: "Review set",
};
