import { SUBJECTS } from "@/lib/exam";

export const DAILY_QUIZ_SIZE = 10;

/** Canonical UTC date key for "today's" quiz. */
export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

// Small deterministic seeded RNG (date string -> stable shuffle).
function hashSeed(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededPick<T>(items: T[], count: number, seed: string): T[] {
  const rand = mulberry32(hashSeed(seed));
  const arr = [...items];
  // Fisher-Yates partial shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

export type DailyQuestion = {
  id: string;
  subjectCode: string;
  stem: string;
  stemZh: string | null;
  options: string[];
  optionsZh: string[];
  correctIndex: number;
  explanation: string;
  explanationZh: string | null;
  figure: string | null;
};

/**
 * Deterministic daily quiz: 10 questions mixed across subjects, stable for a
 * given date so everyone gets the same set that day.
 */
export function pickDailyQuestions<T extends { id: string; subjectCode: string }>(
  pool: T[],
  date: string,
  size = DAILY_QUIZ_SIZE,
): T[] {
  if (pool.length === 0) return [];
  // Try to spread across subjects for variety, then fill deterministically.
  const bySubject = new Map<string, T[]>();
  for (const q of pool) {
    const list = bySubject.get(q.subjectCode) ?? [];
    list.push(q);
    bySubject.set(q.subjectCode, list);
  }
  const subjectCodes = SUBJECTS.map((s) => s.code).filter((c) => bySubject.has(c));
  const picked: T[] = [];
  const used = new Set<string>();
  // one per subject in seeded order, round-robin
  const orderedSubjects = seededPick(subjectCodes, subjectCodes.length, `${date}:subjects`);
  let round = 0;
  while (picked.length < size && picked.length < pool.length) {
    let added = false;
    for (const code of orderedSubjects) {
      if (picked.length >= size) break;
      const candidates = (bySubject.get(code) ?? []).filter((q) => !used.has(q.id));
      if (candidates.length === 0) continue;
      const choice = seededPick(candidates, 1, `${date}:${code}:${round}`)[0];
      if (choice && !used.has(choice.id)) {
        picked.push(choice);
        used.add(choice.id);
        added = true;
      }
    }
    if (!added) break;
    round++;
  }
  // final stable order
  return seededPick(picked, picked.length, `${date}:order`);
}

export function dailyQuizSeed(date: string) {
  return `daily:${date}`;
}
