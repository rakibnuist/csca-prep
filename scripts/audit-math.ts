import { mathQuestions } from "../prisma/seed-data/questions/math";
import { mathFigureQuestions } from "../prisma/seed-data/questions/math-figures";
import { officialMathQuestions } from "../prisma/seed-data/questions/official-math";
import { officialMathOct2025Part1Questions } from "../prisma/seed-data/questions/official-math-oct-2025-part1";
import { officialMathOct2025Part2Questions } from "../prisma/seed-data/questions/official-math-oct-2025-part2";
import { officialMathDec2025Questions } from "../prisma/seed-data/questions/official-math-dec-2025";
import { officialMathJan2026Questions } from "../prisma/seed-data/questions/official-math-jan-2026";
import { officialMathApr2026Questions } from "../prisma/seed-data/questions/official-math-apr-2026";
import { officialMathJun2026Questions } from "../prisma/seed-data/questions/official-math-jun-2026";
import { officialMathAprReviewM1Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m1";
import { officialMathAprReviewM2Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m2";
import { officialMathAprReviewM3Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m3";
import { officialMathAprReviewM4Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m4";

const files: Record<string, unknown[]> = {
  mathQuestions,
  mathFigureQuestions,
  officialMathQuestions,
  officialMathOct2025Part1Questions,
  officialMathOct2025Part2Questions,
  officialMathDec2025Questions,
  officialMathJan2026Questions,
  officialMathApr2026Questions,
  officialMathJun2026Questions,
  officialMathAprReviewM1Questions,
  officialMathAprReviewM2Questions,
  officialMathAprReviewM3Questions,
  officialMathAprReviewM4Questions,
};

let total = 0;
let missing = 0;
for (const [name, arr] of Object.entries(files)) {
  const qs = arr as { explanationZh?: string }[];
  const m = qs.filter((q) => !q.explanationZh || !String(q.explanationZh).trim()).length;
  total += qs.length;
  missing += m;
  console.log(`${name.padEnd(38)} total=${String(qs.length).padStart(3)} missing=${m}`);
}
console.log(`TOTAL math seed questions=${total} missing=${missing}`);
