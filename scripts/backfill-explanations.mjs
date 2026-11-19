/**
 * Bilingual explanation coverage: backfill + report.
 *
 *   node scripts/backfill-explanations.mjs           # backfill + report
 *   node scripts/backfill-explanations.mjs --report  # report only
 *
 * Chinese-paper questions (CH_HUM / CH_SCI) already carry their Chinese
 * explanation in `explanation`, so `explanationZh` is backfilled from it.
 * Fundamental papers (MATH / PHYS / CHEM) hold an English explanation and need
 * a real translation, which this script reports as a coverage gap.
 */
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

const reportOnly = process.argv.includes("--report");

for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

if (!reportOnly) {
  const res = await client.query(`
    UPDATE "Question"
       SET "explanationZh" = explanation
     WHERE "explanationZh" IS NULL
       AND "subjectCode" IN ('CH_HUM', 'CH_SCI')
  `);
  console.log(`[backfill] Chinese-paper explanations set: ${res.rowCount}`);
}

const rows = (
  await client.query(`
    SELECT "subjectCode",
      count(*)::int AS total,
      count(*) FILTER (WHERE "explanationZh" IS NOT NULL AND btrim("explanationZh") <> '')::int AS bilingual
    FROM "Question"
    WHERE active = true
    GROUP BY "subjectCode"
    ORDER BY "subjectCode"
  `)
).rows;

let total = 0;
let bilingual = 0;
for (const row of rows) {
  total += row.total;
  bilingual += row.bilingual;
  const pct = Math.round((row.bilingual / row.total) * 100);
  console.log(
    `${row.subjectCode.padEnd(7)} ${String(row.bilingual).padStart(4)}/${String(row.total).padEnd(4)} ${String(pct).padStart(3)}%`,
  );
}
console.log(`TOTAL   ${bilingual}/${total} ${Math.round((bilingual / total) * 100)}%`);

await client.end();
