import { physicsQuestions } from "../prisma/seed-data/questions/physics";
import { physicsFigureQuestions } from "../prisma/seed-data/questions/phys-figures";
import { officialPhysicsQuestions } from "../prisma/seed-data/questions/official-physics";
import { officialPhysicsMar2026Questions } from "../prisma/seed-data/questions/official-physics-mar-2026";
import { officialPhysicsApr2026Questions } from "../prisma/seed-data/questions/official-physics-apr-2026";
import { officialPhysicsDec2025Questions } from "../prisma/seed-data/questions/official-physics-dec-2025";
import { officialPhysicsAprReviewM1Questions } from "../prisma/seed-data/questions/review-physics-apr-2026-m1";
import { officialPhysicsAprReviewM2Questions } from "../prisma/seed-data/questions/review-physics-apr-2026-m2";
const files: Record<string, unknown[]> = { physicsQuestions, physicsFigureQuestions, officialPhysicsQuestions, officialPhysicsMar2026Questions, officialPhysicsApr2026Questions, officialPhysicsDec2025Questions, officialPhysicsAprReviewM1Questions, officialPhysicsAprReviewM2Questions };
let t=0,m=0;
for (const [n,a] of Object.entries(files)) { const qs=a as {explanationZh?:string}[]; const miss=qs.filter(q=>!q.explanationZh||!String(q.explanationZh).trim()).length; t+=qs.length; m+=miss; console.log(`${n.padEnd(36)} total=${String(qs.length).padStart(3)} missing=${miss}`); }
console.log(`TOTAL phys seed=${t} missing=${m}`);
