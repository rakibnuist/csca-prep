#!/usr/bin/env node
/**
 * Clear the sign-in / OTP rate-limit table.
 *
 * The limiter is deliberately strict (8 wrong tries per account, 30 per address
 * per 15 minutes), which is right for production and hostile to a long QA
 * session: after a dozen automated sign-ins the form answers "Too many attempts"
 * and every later check fails for reasons that have nothing to do with the code
 * under test.
 *
 *   npm run qa:limits          # show what is currently blocked
 *   npm run qa:limits -- --clear
 *
 * Refuses to run against a production database unless you pass --force.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[limits] DATABASE_URL is not set");
  process.exit(1);
}

const looksProduction =
  /supabase|neon|render|railway|amazonaws|azure|digitalocean|cscamaster\.com/i.test(url);

if (looksProduction && !process.argv.includes("--force")) {
  console.error(`[limits] refusing to touch what looks like a production database:\n  ${url.split("@")[1] ?? url}`);
  console.error("[limits] re-run with --force if you are certain");
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

try {
  const rows = await prisma.rateLimit.findMany({ orderBy: { resetAt: "asc" }, take: 50 });
  const live = rows.filter((row) => row.resetAt > new Date());

  if (rows.length === 0) {
    console.log("[limits] no rate-limit rows — sign-in is not blocked");
  } else {
    console.log(`[limits] ${rows.length} rows (${live.length} still blocking):`);
    for (const row of rows.slice(0, 10)) {
      const state = row.resetAt > new Date() ? "blocking" : "expired";
      console.log(`  ${state.padEnd(9)} ${row.key} (${row.count}) resets ${row.resetAt.toISOString()}`);
    }
  }

  if (process.argv.includes("--clear")) {
    const { count } = await prisma.rateLimit.deleteMany({});
    console.log(`[limits] cleared ${count} rows`);
  } else if (live.length > 0) {
    console.log("[limits] run with --clear to unblock sign-in now");
  }
} finally {
  await prisma.$disconnect();
}
