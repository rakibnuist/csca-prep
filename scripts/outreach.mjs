#!/usr/bin/env node
/**
 * Send campaign A from `outreach/targets.csv`.
 *
 * This exists because the kit stopped one step short of useful: the copy was
 * written, but the sending was manual. This reads the CSV and sends exactly one
 * email per row that has a `contact_email` — no scraping, no guessed addresses,
 * no follow-up loop. A row without an address is reported and skipped.
 *
 *   node scripts/outreach.mjs                 # dry run: prints who would get what
 *   node scripts/outreach.mjs --send --confirm=YES
 *
 * Requires RESEND_API_KEY and (for real delivery) a verified sending domain.
 * The default sandbox sender only delivers to the Resend account owner, so a
 * real run needs RESEND_FROM on the verified domain.
 */
import { readFileSync, writeFileSync } from "node:fs";

const CSV = "outreach/targets.csv";
const args = new Set(process.argv.slice(2));
const doSend = args.has("--send");
const confirmed = process.argv.some((arg) => arg === "--confirm=YES");
const from = process.env.RESEND_FROM || "CSCA Master <hello@cscamaster.com>";
const key = process.env.RESEND_API_KEY;

const subject = "Free CSCA mock library for your applicants — no cost, no affiliate scheme";

const body = (institution) => `Dear ${institution} International Admissions Team,

I run CSCA Master (cscamaster.com), an independent preparation site for applicants to Chinese
universities. We publish a free mock library in the official CSCA format — 48 questions in 60
minutes for Mathematics, Physics and Chemistry, 80 in 90 for both Professional Chinese papers — with
a worked explanation on every question, and a test-client simulation that reproduces the documented
start sequence (system check, Integrity Commitment, full-screen start, left palette).

We are not affiliated with CSC or any university, and we do not sell applicant data. Everything exam
related is sourced to csca.cn and dated, and a public changelog records every correction.

If it is useful to your applicants, you are welcome to link it from a pre-arrival or
scholarship-FAQ page:
  · Free 10-question sample: cscamaster.com/free-exam
  · Full paper library:      cscamaster.com/app/mocks
  · Exam guide:              cscamaster.com/csca

If you would prefer we did not reference your institution, tell me and it is removed the same day.

Best regards,
CSCA Master · cscamaster.com · hello@cscamaster.com

---
You are receiving this because your office is listed as the contact for international admissions.
Reply "remove" and we will not write again.`;

function parseCsv(text) {
  const rows = [];
  const lines = text.trim().split("\n");
  const header = lines.shift().split(",");
  for (const line of lines) {
    // The file has no quoted commas; keep the parser honest about that.
    const cells = line.split(",");
    rows.push(Object.fromEntries(header.map((column, index) => [column, (cells[index] ?? "").trim()])));
  }
  return rows;
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
const ready = rows.filter((row) => row.contact_email && !row.sent_on);
const missing = rows.filter((row) => !row.contact_email);

console.log(`[outreach] ${rows.length} targets · ${ready.length} with an address · ${missing.length} still missing one`);
for (const row of missing) console.log(`  – needs address: ${row.institution} (${row.contact_route})`);

if (!doSend) {
  if (ready[0]) console.log(`\n[dry run] would send to ${ready[0].contact_email}:\n\n${body(ready[0].institution).slice(0, 240)}…`);
  console.log("\n[dry run] nothing sent. Re-run with --send --confirm=YES to deliver.");
  process.exit(0);
}

if (!confirmed) {
  console.error("[outreach] refusing to send without --confirm=YES");
  process.exit(1);
}
if (!key) {
  console.error("[outreach] RESEND_API_KEY is not set");
  process.exit(1);
}
if (ready.length === 0) {
  console.error("[outreach] no rows have a contact_email — fill outreach/targets.csv first");
  process.exit(1);
}

let sent = 0;
for (const row of ready) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [row.contact_email],
      subject,
      text: body(row.institution),
      reply_to: "hello@cscamaster.com",
    }),
  });
  if (!response.ok) {
    console.error(`  ✗ ${row.institution}: ${response.status} ${(await response.text()).slice(0, 120)}`);
    continue;
  }
  sent += 1;
  row.sent_on = new Date().toISOString().slice(0, 10);
  console.log(`  ✓ ${row.institution} <${row.contact_email}>`);
}

// Persist the send dates so a second run cannot double-send.
const header = "institution,domain,contact_route,contact_email,sent_on,replied,notes";
const csv = [header, ...rows.map((row) => [row.institution, row.domain, row.contact_route, row.contact_email, row.sent_on, row.replied, row.notes].join(","))].join("\n");
writeFileSync(CSV, csv + "\n");

console.log(`\n[outreach] sent ${sent}/${ready.length}; targets.csv updated with send dates`);
