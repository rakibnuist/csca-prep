import { officialMathQuestions } from "../prisma/seed-data/questions/official-math";
import { officialMathOct2025Part1Questions } from "../prisma/seed-data/questions/official-math-oct-2025-part1";
import { officialMathOct2025Part2Questions } from "../prisma/seed-data/questions/official-math-oct-2025-part2";
import { officialMathDec2025Questions } from "../prisma/seed-data/questions/official-math-dec-2025";
import { officialMathJan2026Questions } from "../prisma/seed-data/questions/official-math-jan-2026";
import { officialMathApr2026Questions } from "../prisma/seed-data/questions/official-math-apr-2026";
import { officialMathJun2026Questions } from "../prisma/seed-data/questions/official-math-jun-2026";
import { officialPhysicsQuestions } from "../prisma/seed-data/questions/official-physics";
import { officialPhysicsMar2026Questions } from "../prisma/seed-data/questions/official-physics-mar-2026";
import { officialPhysicsApr2026Questions } from "../prisma/seed-data/questions/official-physics-apr-2026";
import { officialPhysicsDec2025Questions } from "../prisma/seed-data/questions/official-physics-dec-2025";
import { officialChemistryQuestions } from "../prisma/seed-data/questions/official-chemistry";
import { officialChemistryMar2026Questions } from "../prisma/seed-data/questions/official-chemistry-mar-2026";
import { officialChemistryAprReviewQuestions } from "../prisma/seed-data/questions/official-chemistry-apr-review";
import { officialChemistryDec2025Questions } from "../prisma/seed-data/questions/official-chemistry-dec-2025";
import { officialChineseHumanitiesDec2025Questions } from "../prisma/seed-data/questions/official-chinese-humanities-dec-2025";

const papers: Record<string, { name: string; items: { topic: string }[] }[]> = {
  MATH: [
    { name: "math", items: officialMathQuestions },
    { name: "oct-p1", items: officialMathOct2025Part1Questions },
    { name: "oct-p2", items: officialMathOct2025Part2Questions },
    { name: "dec", items: officialMathDec2025Questions },
    { name: "jan", items: officialMathJan2026Questions },
    { name: "apr", items: officialMathApr2026Questions },
    { name: "jun", items: officialMathJun2026Questions },
  ],
  PHYS: [
    { name: "phys", items: officialPhysicsQuestions },
    { name: "mar", items: officialPhysicsMar2026Questions },
    { name: "apr", items: officialPhysicsApr2026Questions },
    { name: "dec", items: officialPhysicsDec2025Questions },
  ],
  CHEM: [
    { name: "chem", items: officialChemistryQuestions },
    { name: "mar", items: officialChemistryMar2026Questions },
    { name: "apr", items: officialChemistryAprReviewQuestions },
    { name: "dec", items: officialChemistryDec2025Questions },
  ],
  CH_HUM: [{ name: "dec", items: officialChineseHumanitiesDec2025Questions }],
};

for (const [subject, list] of Object.entries(papers)) {
  const counts = new Map<string, number>();
  for (const paper of list) for (const q of paper.items) counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`\n${subject}: ${list.length} papers, ${list.reduce((n, p) => n + p.items.length, 0)} questions, ${sorted.length} topics`);
  console.log(sorted.map(([t, c]) => `${t}=${c}`).join("  "));
}
