import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { officialMathOct2025Part2Questions } from "../prisma/seed-data/questions/official-math-oct-2025-part2";
import { officialMathAprReviewM1Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m1";
import { officialMathAprReviewM2Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m2";
import { officialMathAprReviewM3Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m3";
import { officialMathAprReviewM4Questions } from "../prisma/seed-data/questions/review-math-apr-2026-m4";

for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

async function main() {
  const banks = [
    officialMathOct2025Part2Questions,
    officialMathAprReviewM1Questions,
    officialMathAprReviewM2Questions,
    officialMathAprReviewM3Questions,
    officialMathAprReviewM4Questions,
  ];
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  let updated = 0;
  let skipped = 0;
  for (const items of banks) {
    for (const item of items) {
      if (!item.explanationZh) { skipped++; continue; }
      const res = await client.query(
        `UPDATE "Question" SET "explanationZh" = $1 WHERE "subjectCode" = 'MATH' AND stem = $2`,
        [item.explanationZh, item.stem],
      );
      updated += res.rowCount ?? 0;
    }
  }
  console.log(`updated ${updated} MATH explanations; skipped ${skipped}`);
  await client.end();
}

void main();
