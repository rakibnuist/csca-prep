import fs from "node:fs";
import path from "node:path";
import pg from "pg";

for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const map = JSON.parse(fs.readFileSync("prisma/seeds/legacy-zh.json", "utf8"));
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
let updated = 0;
for (const [stem, zh] of Object.entries(map)) {
  const res = await client.query(
    `UPDATE "Question" SET "explanationZh" = $1 WHERE stem = $2`,
    [zh, stem],
  );
  updated += res.rowCount;
}
console.log(`updated ${updated} rows from ${Object.keys(map).length} map entries`);
await client.end();
