import { chemistryQuestions } from "../prisma/seed-data/questions/chemistry";
import { chemistryFigureQuestions } from "../prisma/seed-data/questions/chem-figures";
import { officialChemistryQuestions } from "../prisma/seed-data/questions/official-chemistry";
import { officialChemistryMar2026Questions } from "../prisma/seed-data/questions/official-chemistry-mar-2026";
import { officialChemistryAprReviewQuestions } from "../prisma/seed-data/questions/official-chemistry-apr-review";
import { officialChemistryDec2025Questions } from "../prisma/seed-data/questions/official-chemistry-dec-2025";

const files: Record<string, unknown[]> = {
  chemistryQuestions,
  chemistryFigureQuestions,
  officialChemistryQuestions,
  officialChemistryMar2026Questions,
  officialChemistryAprReviewQuestions,
  officialChemistryDec2025Questions,
};
let total = 0, missing = 0;
for (const [name, arr] of Object.entries(files)) {
  const qs = arr as { explanationZh?: string }[];
  const m = qs.filter((q) => !q.explanationZh || !String(q.explanationZh).trim()).length;
  total += qs.length; missing += m;
  console.log(`${name.padEnd(34)} total=${String(qs.length).padStart(3)} missing=${m}`);
}
console.log(`TOTAL chem seed=${total} missing=${missing}`);
