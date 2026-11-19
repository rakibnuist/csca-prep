import type { SeedQuestion } from "../../prisma/seed-data/types";
import { officialMathQuestions } from "../../prisma/seed-data/questions/official-math";
import { officialMathOct2025Part1Questions } from "../../prisma/seed-data/questions/official-math-oct-2025-part1";
import { officialMathOct2025Part2Questions } from "../../prisma/seed-data/questions/official-math-oct-2025-part2";
import { officialMathDec2025Questions } from "../../prisma/seed-data/questions/official-math-dec-2025";
import { officialMathJan2026Questions } from "../../prisma/seed-data/questions/official-math-jan-2026";
import { officialMathApr2026Questions } from "../../prisma/seed-data/questions/official-math-apr-2026";
import { officialMathJun2026Questions } from "../../prisma/seed-data/questions/official-math-jun-2026";
import { officialPhysicsQuestions } from "../../prisma/seed-data/questions/official-physics";
import { officialPhysicsMar2026Questions } from "../../prisma/seed-data/questions/official-physics-mar-2026";
import { officialPhysicsApr2026Questions } from "../../prisma/seed-data/questions/official-physics-apr-2026";
import { officialPhysicsDec2025Questions } from "../../prisma/seed-data/questions/official-physics-dec-2025";
import { officialChemistryQuestions } from "../../prisma/seed-data/questions/official-chemistry";
import { officialChemistryMar2026Questions } from "../../prisma/seed-data/questions/official-chemistry-mar-2026";
import { officialChemistryAprReviewQuestions } from "../../prisma/seed-data/questions/official-chemistry-apr-review";
import { officialChemistryDec2025Questions } from "../../prisma/seed-data/questions/official-chemistry-dec-2025";
import { officialChineseHumanitiesDec2025Questions } from "../../prisma/seed-data/questions/official-chinese-humanities-dec-2025";

/**
 * The official-paper archive, shared by the /question-papers index and its
 * per-paper pages. `slug` matches the app `Mock.slug`, so the public page and
 * the in-app timed version are always the same paper.
 */
export type Paper = {
  slug: string;
  subject: string;
  subjectSlug: string;
  short: string;
  year: string;
  sitting: string;
  note?: string;
  items: SeedQuestion[];
};

export const PAPERS: Paper[] = [
  {
    slug: "math-official-2026-03",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2026",
    sitting: "March 2026",
    items: officialMathQuestions,
  },
  {
    slug: "math-official-2026-04",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2026",
    sitting: "April 2026",
    items: officialMathApr2026Questions,
  },
  {
    slug: "math-official-2026-06",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2026",
    sitting: "June 2026",
    items: officialMathJun2026Questions,
  },
  {
    slug: "math-official-2026-01",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2026",
    sitting: "January 2026",
    note: "Q48 table unavailable",
    items: officialMathJan2026Questions,
  },
  {
    slug: "math-official-2025-12",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2025",
    sitting: "December 2025",
    items: officialMathDec2025Questions,
  },
  {
    slug: "math-official-2025-10",
    subject: "Mathematics",
    subjectSlug: "mathematics",
    short: "Maths",
    year: "2025",
    sitting: "October 2025",
    note: "Reconstructed key",
    items: [...officialMathOct2025Part1Questions, ...officialMathOct2025Part2Questions],
  },
  {
    slug: "phy-official-2026-01",
    subject: "Physics",
    subjectSlug: "physics",
    short: "Physics",
    year: "2026",
    sitting: "January 2026",
    items: officialPhysicsQuestions,
  },
  {
    slug: "phy-official-2026-03",
    subject: "Physics",
    subjectSlug: "physics",
    short: "Physics",
    year: "2026",
    sitting: "March 2026",
    items: officialPhysicsMar2026Questions,
  },
  {
    slug: "phy-official-2026-04",
    subject: "Physics",
    subjectSlug: "physics",
    short: "Physics",
    year: "2026",
    sitting: "April 2026",
    items: officialPhysicsApr2026Questions,
  },
  {
    slug: "phy-official-2025-12",
    subject: "Physics",
    subjectSlug: "physics",
    short: "Physics",
    year: "2025",
    sitting: "December 2025",
    note: "Figure items omitted",
    items: officialPhysicsDec2025Questions,
  },
  {
    slug: "chem-official-2026-01",
    subject: "Chemistry",
    subjectSlug: "chemistry",
    short: "Chemistry",
    year: "2026",
    sitting: "January 2026",
    items: officialChemistryQuestions,
  },
  {
    slug: "chem-official-2026-03",
    subject: "Chemistry",
    subjectSlug: "chemistry",
    short: "Chemistry",
    year: "2026",
    sitting: "March 2026",
    items: officialChemistryMar2026Questions,
  },
  {
    slug: "chem-official-2026-04-review",
    subject: "Chemistry",
    subjectSlug: "chemistry",
    short: "Chemistry",
    year: "2026",
    sitting: "April 2026 (Sprint Review)",
    note: "Review set",
    items: officialChemistryAprReviewQuestions,
  },
  {
    slug: "chem-official-2025-12",
    subject: "Chemistry",
    subjectSlug: "chemistry",
    short: "Chemistry",
    year: "2025",
    sitting: "December 2025",
    items: officialChemistryDec2025Questions,
  },
  {
    slug: "ch-hum-official-2025-12",
    subject: "Professional Chinese",
    subjectSlug: "chinese-humanities",
    short: "Chinese",
    year: "2025",
    sitting: "December 2025",
    note: "Language items",
    items: officialChineseHumanitiesDec2025Questions,
  },
];

export const PAPER_GROUPS = ["Mathematics", "Physics", "Chemistry", "Professional Chinese"];

export function isReviewPaper(paper: Paper): boolean {
  return paper.note === "Review set";
}

export function paperTitle(paper: Paper): string {
  const label = isReviewPaper(paper) ? "Review module" : "Official";
  return `${paper.subject} · ${label} · ${paper.sitting}`;
}

export function papersFor(subject: string): Paper[] {
  return PAPERS.filter((paper) => paper.subject === subject);
}
