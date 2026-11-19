---
name: csca-prep-project
description: Working map of the CSCA Master (cscamaster.com) repository — Next.js 16 stack, route tree, the two monolingual tracks, the TypeScript content pipeline, single-source-of-truth files, the paper/ink design system, SEO and exam-client conventions, and the rules that keep the product honest. Use for any page, component, paper, question, seed, schema, or copy change in this csca-prep repo.
---

# CSCA Master — working in this repository

CSCA Master is an independent CSCA preparation site: exam-faithful mock papers, transcribed official
papers, syllabus-mapped practice, study analytics, and a marketing cluster that explains the exam. The
one thing it sells is **fidelity** to how the test is actually sat. Every change either protects that or
trades it away — say which.

Facts about the real exam live in the **`csca-official`** skill. Load it before writing any exam fact,
date, fee, rule or claim. This file is about the codebase.

---

## 1. Stack and commands

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router, Server Components, Server Actions |
| UI | React 19, Tailwind CSS v4 (`@theme` tokens), Radix primitives, Lucide icons |
| Data | Prisma 7 + PostgreSQL (PGlite locally, managed Postgres in production) |
| Auth | bcrypt + JWT (`jose`) in an httpOnly cookie, `tokenVersion` invalidation |
| Charts | Recharts (score trend); everything else CSS |
| Maths | KaTeX, server-rendered |

```sh
npm run dev        # embedded Postgres + Next dev server
npm run db         # database only
npm run db:seed    # idempotent content seed
npm run db:reset   # drop, recreate, reseed
npm run build      # prisma generate && next build
npm run lint       # ESLint — run before you claim a change is done
```

There is no test runner configured. Verification is `npm run lint`, `npm run build`, and actually
loading the page or paper you touched.

## 2. Route map

- `src/app/(marketing)/…` — public, crawlable, indexable. `exam-dates`, `syllabus`, `mocks`,
  `question-papers`, `test-day`, `requirements`, `scholarships`, `universities`, `guides`, `tips`,
  `glossary`, `tools/score-calculator`, `partners`, `pricing`, plus the `/zh/…` Chinese entry pages.
- `src/app/app/…` — signed-in product: `dashboard`, `mocks`, `official`, `practice`, `papers`,
  `reviews`, `learn`, `plan`, `results`, `daily`, `leaderboard`, `billing`, `settings`, and the two
  track roots `english` and `chinese`.
- `src/app/exam/[slug]` — the exam client (the fidelity surface).
- `src/app/(auth)/sign-in|sign-up`, `src/app/admin/…` — auth and operations.
- `src/app/(marketing)/zh/…` — public Chinese pages (`kaoshi`, `moniti`, `wenda`).

75 route files. Before adding a page, check whether an existing one owns that query intent — the
marketing cluster is deliberately sized (depth over volume).

## 3. The two monolingual tracks

The product is split by the language a degree is taught in, and each section is monolingual end to end.
`src/lib/tracks.ts` is the only source of truth.

- English-taught: Mathematics, Physics, Chemistry; Professional Chinese never shown.
- Chinese-taught: 文科中文, 理科中文, 数学, 物理, 化学; Professional Chinese compulsory.
- The section comes from `?taught=EN|ZH` or the section root via `src/proxy.ts`, is forwarded as
  `x-csca-track`, and persists in the `csca_taught` cookie. Read it with `getSectionTrack()` /
  `getResolvedTrack()` (`src/lib/section.ts`).
- Filter with `trackQuestionWhere()` / `trackPaperWhere()`. A Chinese-taught paper must have Chinese
  text on **every** item; fundamental items without Chinese text are excluded there.
- `Attempt.track` is stored so results and history never cross sections.
- Copy for the Chinese app lives in `src/lib/i18n.ts`.

Rule: never mix languages inside one section. Half-translated UI is worse than an untranslated page that
does not appear in that section at all.

## 4. Content pipeline

Curriculum content is version-controlled TypeScript, never an admin form.

```
prisma/seed-data/syllabus.ts         5 subjects, 60 topics, bilingual, weighted
prisma/seed-data/questions/*.ts      curated + transcribed papers (official-*, review-*)
prisma/seeds/*.json                  ~2 000 legacy drill questions (practice only)
```

Question shape:

```ts
{
  topic: "M2.4",              // syllabus topic code — required
  difficulty: "MEDIUM",       // EASY | MEDIUM | HARD
  stem: "… $f(x)=3x^{4}-2x$",
  stemZh: "…",
  options: ["…", "…", "…", "…"],   // exactly four
  optionsZh: ["…", …],
  correct: 0,
  explanation: "…",
  explanationZh: "…",
  tags: ["derivatives"],
}
```

- `npm run db:seed` is idempotent: stable IDs, so editing a question and re-seeding keeps attempt
  history. Mock papers are rebuilt from the bank on every seed.
- Labels are part of the data contract: a transcribed paper says which sitting it came from and, when
  partial, how many of the official items it contains ("40 of the paper's 80"). Review modules are
  labelled Review. Never let a reconstruction read as an official paper.
- The legacy drill bank is bulk/templated. It belongs in topic drills and a slice of practice sets —
  never in a scored `Paper 01` mock or an official/review paper.

## 5. Single sources of truth

| Concern | File |
| --- | --- |
| Subject specs, durations, marks, blurbs | `src/lib/exam.ts` |
| Brand, domain, nav, `OFFICIAL` links, `EXAM_SITTINGS`, `EXAM_TIMETABLE`, `TEST_FORMATS` | `src/lib/site.ts` |
| Test-day sequence, equipment, penalties copy | `src/lib/test-day.ts` |
| Tracks, subject visibility, Prisma filters | `src/lib/tracks.ts` |
| Chinese app copy | `src/lib/i18n.ts` |
| FAQ content | `src/lib/faq.ts` |
| Guides | `src/lib/guides.ts` |
| Universities / programmes / countries / scholarships | `src/lib/universities.ts`, `programmes.ts`, `countries-csca.ts`, `tracks.ts` |
| SEO metadata + JSON-LD helpers | `src/lib/seo.ts`, `src/components/seo/jsonld.tsx`, `src/lib/og-card.tsx` |
| Access rules (free vs Pro) | `src/lib/access.ts`, `src/lib/entitlements.ts` |

Edit the source, not a copy. If a fact appears in three pages and two files, it is already a bug.

**Timetable model (already fixed — do not reintroduce a fixed time).** Sittings alternate between two
published start blocks, so `src/lib/site.ts` carries `ExamBlock = "08:00" | "14:00"`, a `block` field on
every sitting, `EXAM_BLOCKS` (the four papers per block, with `start`/`end`), and `timetableFor(sitting)`
/ `sittingsForBlock(block)` / `nextSitting()`. Per-sitting pages call `timetableFor`; general pages show
both blocks or quote `nextSitting()`. `EXAM_TIMETABLE` survives only as a deprecated alias for the 14:00
block — do not use it for a sitting that runs 08:00 (Dec 2026, Jun 2027 so far). Parse nothing out of the
display string: convert from `row.start`.

## 6. Design system

Near-paper, editorial, engineered — not a generic SaaS dashboard.

| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#faf8f3` | page ground |
| `paper-deep` | `#f2ece1` | inset bands |
| `ink` | `#14110e` | body text |
| `ink-soft` / `ink-faint` | `#57514a` / `#7a736a` | secondary text |
| `line` / `line-strong` | `#e7dfd2` / `#d3c8b6` | rules and borders |
| `vermillion` | `#d31d3c` | primary action, exam urgency, Mathematics accent |
| `jade` | `#0a7a53` | Physics accent, success |
| `gold` | `#a9791c` | Chemistry accent, attention |
| `indigo` | `#3b4a9c` | links and structure where vermillion would over-signal |

- Fonts are vendored in `src/fonts/` and loaded with `next/font/local`: **Inter** (body), **Sora**
  (display), **Instrument Serif** (editorial italic), **Geist Mono** (numbers/code). No Google Fonts
  request at runtime.
- Use the `ui/` primitives (button, card, table, tabs, accordion, badge, …) and the site section
  helpers (`Eyebrow`, `Pill`, `SectionHead`). Prefer a rule and whitespace to a card with a shadow.
- Marketing pages read as a printed exam document: table-first, precise numbers, thin rules, one
  dominant idea per band. Avoid stock photography, gradients, glassmorphism and emoji.
- Bilingual: English pages may include 中文 terms for the papers and topics; Chinese pages are fully
  Chinese. Never machine-translate a page into existence.

## 7. SEO conventions

- Each marketing page exports `metadata` with a unique title, a one-sentence description and
  `alternates.canonical`. Use `pageMetadata()` from `src/lib/seo.ts` when the page needs the shared
  open-graph treatment.
- One `<h1>`; section heads are `h2`. Answer the query in the first 100 words.
- JSON-LD: `breadcrumbLd`, `articleLd`, `itemListLd`, plus page-specific `FAQPage` /
  `Course`-style schema where it is genuinely the page's content. Never mark up a claim the page does
  not make.
- Dynamic OG images come from `src/lib/og-card.tsx`. Sitemap and `llms.txt` are generated; new public
  routes must appear.
- Facts must match `csca-official`. A page that cites a date, fee or rule without the official source
  and verification date is incomplete.

## 8. The exam client (`/exam/[slug]`)

The fidelity surface. It reproduces what a browser honestly can, and says where it cannot:

- Pre-test gate: online state, viewport ≥1024, Fullscreen API, microphone permission — reported as
  pass/warn, never faked.
- Integrity pledge with the official commitments before start; countdown → fullscreen.
- Ticket number + password login strip (`CSCA-2026-XXXXXX`), hidden by default.
- **Answered numbers turn green in the left palette**, amber flags, ringed current — as on the real
  client. No early submission in Official mode; Practice mode keeps early exit and says so.
- Autosave roughly every 900 ms; resume after reload. Timing is **server-anchored**: answers after the
  deadline are refused, and a late submit scores only what was persisted.
- Per-question pacing is measured client-side (1 s tick into a ref, hidden tab pauses, gaps > 5 s
  dropped) and posted as `timePerQuestion` with each save/submit. The server sanitises it in
  `src/lib/pacing.ts` and the result page summarises it. It never affects the score.
- Proctor focus warnings on blur are counted and shown; they are not a real proctor.
- Do not add a claim the browser cannot back: webcam monitoring, second-camera checks, ID
  verification, locking the OS, detecting a second screen.

## 9. Non-negotiables

1. **Authentic data only.** No invented statistics, pass marks, university minimums, partner logos,
   testimonials or "official" labels on our own content.
2. **Label what is ours.** Modelled percentiles, coaching bands, reconstructed papers and partial
   transcriptions say so, in the UI.
3. **Independent, and say it.** No affiliation with CSC or CSCA; no promise of admission, visa or
   scholarship outcomes.
4. **Free content stays free.** Pro sells attempts and convenience, never the archive or the syllabus.
5. **Server enforces timing and access.** Client-side checks are UX, not security.
6. **Bilingual integrity.** Don't ship a Chinese section item without Chinese text.
7. **Small, verified changes.** Run lint and build; load the route; check both tracks if the change
   touches data filters.

## 10. Where the research lives

`research/` holds what the harvest collected (see `research/README.md`):

- `research/normalized/csca/` — official portal documents as markdown, plus `exam-calendar.json`.
- `research/normalized/guidebook/` — China Admissions Guidebook (Nov 2025), with a staleness warning.
- `research/normalized/sites/` — the competitor sites' pages as readable text.
- `research/raw/` — the exact JSON/PDF/HTML captures, for when a summary is not enough.
- `research/scripts/` — `harvest_csca.py`, `harvest_sites.py`, `normalize.py`.

Refresh with those scripts rather than re-scraping by hand, and re-date any page whose fact changed.
