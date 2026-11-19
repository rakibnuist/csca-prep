import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { officialPhysicsAprReviewM1Questions } from "../prisma/seed-data/questions/review-physics-apr-2026-m1";
import { officialPhysicsAprReviewM2Questions } from "../prisma/seed-data/questions/review-physics-apr-2026-m2";

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
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  let updated = 0;
  for (const items of [officialPhysicsAprReviewM1Questions, officialPhysicsAprReviewM2Questions]) {
    for (const item of items) {
      if (!item.explanationZh) continue;
      const res = await client.query(
        `UPDATE "Question" SET "explanationZh" = $1 WHERE "subjectCode" = 'PHYS' AND stem = $2`,
        [item.explanationZh, item.stem],
      );
      updated += res.rowCount ?? 0;
    }
  }
  console.log(`updated ${updated} PHYS explanations`);
  await client.end();
}

void main();
