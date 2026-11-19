# CSCA Master — Product Structure

> **Status:** Phase 1–4 built and deployed. Phase 5 (copy audit) done, Phase 6 (polish)
> in progress.
> **Owner:** product · **Updated:** 9 Nov 2026

---

## 0. Decisions taken (9 Nov 2026)

| Question | Decision |
|---|---|
| How many sittings a year? | **Six** — January, March, April, June, November, December. The copy said five in seven places; the data was right and the copy was wrong. |
| How is Pro sold? | **By coupon code.** `Coupon` / `Redemption` are the mechanism. No checkout yet. |
| Are official papers studyable for free? | **Yes.** Free accounts study all 21 with the working revealed. Sitting them on the clock is Pro. |
| Do the transcribed official papers stay? | **Yes — and we share the official questions and answers.** The README's "does not copy official papers" and the "Original questions" badge are rewritten to match. |

---

## 1. What this product is

**CSCA Master** is an exam-preparation SaaS for international students applying to
Chinese universities. They have one question — *what will I score?* — and they
pay for the confidence that comes from having sat the real thing under the real
clock.

Everything in the product maps to four things a student does:

| Step | What the student does | Where it happens |
|---|---|---|
| 1. **Understand** | Read the topic, see the worked method | Learn concepts |
| 2. **Drill** | Answer questions until the topic stops being a problem | Topic practice + smart review |
| 3. **Rehearse** | Sit a full paper on the clock, get a score | **Mock tests** |
| 4. **Verify** | Sit the real past papers, compare against the official key | **Official papers** |
Steps 3 and 4 are **different products** and must never be merged into one
list. Step 4 is the trust layer (these are the real sittings); step 3 is the
volume layer (150+ papers for reps). csca.ai — the closest competitor — sells
them separately too: *"2,400+ exam-style questions **and** 30 full timed mocks"*.

---

## 1. The two paper products

### 1a. Mock tests — the volume SKU

Papers you **sit** under exact exam conditions. 155 papers.

| Tier | Papers | Format | Built from |
|---|---|---|---|
| Original mocks | 5 (one per subject) | 48 Q / 60 min | Questions written from scratch |
| Practice sets | 150 (30 per subject) | 48 Q / 60 min | Assembled from the bank |

These are **ours**. Every question is either written by us against the
published syllabus, or assembled from the curated bank. Nothing is a copy.

### 1b. Official papers — the trust SKU

The **real sittings**, transcribed, with their published answer keys. 21 papers.

| Tier | Papers | What it is |
|---|---|---|
| Official past papers | 15 | Real sittings, digitised, with the published key and worked explanations |
| Review sets | 6 | Reconstructed modules, **always labelled** so they are never mistaken for an official paper |

Two ways to use them:

- **Study** — read question by question, reveal the working. Free for everyone.
  This is the SEO and trust engine.
- **Sit** — the same paper on the clock, scored against the official key.

### 1c. Why separate (and why my earlier merge was wrong)

Merging everything into one list produced a page that listed 176 items with no
hierarchy — a catalogue, not a product. It also hid the one thing that matters
commercially: *the official papers are the reason to trust us, and the mock
tests are the reason to pay.*

The rule going forward: **mock tests and official papers never share a nav
item.** A cross-cutting "all papers" browse view may exist, but it is a
secondary view, not a primary destination.

---

## 2. App information architecture

```
PREPARE — understand the material
  Dashboard              where you are, what to do next
  Learn concepts         54 topic lessons
  Topic practice         drills · quick 10 · smart review

EXAM — rehearse the exam
  Mock tests             155 papers you sit
  Official papers        21 real sittings, study or sit

YOUR PROGRESS
  Study plan             dated plan + checklist
  Results                every paper you have sat

ACCOUNT
  Billing & plan
  Settings
```

Eight items, four groups, each group named for what the student is doing.
Compare: a flat nine-item list (the current sidebar) with no grouping tells
the student nothing about where to start.

### 2a. Route map

| Route | Status | Purpose |
|---|---|---|
| `/app/dashboard` | exists | Readiness, streak, daily goal, score trend, topic mastery, countdown, next action |
| `/app/learn` | exists | Concept library grouped by unit, 54 topics |
| `/app/learn/[topicCode]` | exists | One lesson: summary, sections, formulas, traps, diagram, prev/next |
| `/app/practice` | exists | Topic drills — pick a topic, difficulty filter |
| `/app/practice/topic/[code]` | exists | A drill set for one topic |
| `/app/practice/quick` | exists | Randomised 5–30 question quick drill |
| `/app/practice/review` | exists | Smart review — spaced repetition due cards |
| `/app/mocks` | **rebuild** | **Mock tests library** — tabs: Original mocks · Practice sets |
| `/app/mocks/[slug]` | exists | Briefing → start the paper (keep) |
| `/exam/[slug]` | exists | The timed runner (keep) |
| `/app/official` | **rebuild** | **Official papers library** — tabs: Past papers · Review sets |
| `/app/official/[slug]` | exists | Study mode — read-through Q&A with the working revealed (keep) |
| `/app/reviews` | **fold** | Fold into `/app/official` as a tab |
| `/app/reviews/[slug]` | **fold** | Fold into `/app/official/[slug]` |
| `/app/papers` | **removed** | Redirects to `/app/mocks`. The combined browse view listed 176 items with no hierarchy — a catalogue, not a product. Two libraries instead. |
| `/app/practice-sets` | **fold** | Fold into `/app/mocks` as a tab |
| `/app/plan` | exists | Study plan |
| `/app/results` | exists | Attempt history |
| `/app/results/[id]` | exists | Full review of one attempt |
| `/app/billing` | exists | Plan + coupon redemption |
| `/app/settings` | exists | Profile |

### 2b. Redirect map (no broken bookmarks)

| Old | New |
|---|---|
| `/app/practice-sets` | `/app/mocks?tab=sets` |
| `/app/reviews` | `/app/official?tab=review` |
| `/app/mocks` (as a library) | `/app/mocks?tab=original` |
| `/app/reviews/[slug]` | `/app/official/[slug]` |
| `/app/papers` | `/app/mocks` |

---

## 3. Marketing site information architecture

The public site has **no product page**. A SaaS that sells a subscription
needs one: a page that describes the product, shows the free tier, and ends
with a signup CTA. That is the single largest gap.

```
PRODUCT
  Mock tests          /mocks              NEW — public product page
  Official papers     /question-papers    exists
  Syllabus            /syllabus           exists

TRY IT FREE
  Free mock test      /free-exam          exists
  Sample questions    /sample-questions   exists
  Score calculator    /tools/score-calculator  exists

PLAN
  Exam guide          /csca               exists
  Dates & fees        /exam-dates         exists
  Requirements        /requirements       exists
  Scholarships        /scholarships       exists

PRICING                /pricing            exists
```

### 3a. New page: `/mocks` (public product page)

Purpose: sell the mock-test product to a visitor who has not signed up.

Sections, in order:
1. **Hero** — "176 full-length CSCA mock papers, under the real clock." + CTA
   *Start a free mock* / *See pricing*. Trust strip: exact format, instant
   scoring, topic breakdown.
2. **The format** — 48 Q / 60 min / 0–100 / no negative marking, with a
   screenshot of the real runner. Mirrors the competitor's "exact exam
   conditions" claim.
3. **What's inside** — three cards: Original mocks (5), Practice sets (150),
   Official past papers (21). Each links to its app library.
4. **How scoring works** — raw correct → 0–100, topic breakdown, percentile
   estimate (labelled as a model), what a score means.
5. **Your dashboard** — readiness score, trend, topic mastery, weak-topic
   recommendations.
6. **Free vs Pro** — the tier matrix, with the free column fully readable.
7. **Plans** — copy: *Free forever* vs *Pro ¥99 per admission cycle*.
8. **FAQ** — format, timing, percentile accuracy, official-paper provenance.
9. **CTA** — start free, no card.

### 3b. SEO pages keep their role

`/csca`, `/syllabus`, `/exam-dates`, `/requirements`, `/scholarships`, `/tips`,
`/guides`, `/glossary`, `/question-papers` are informational. They stay
separate and keep their own metadata. `/mocks` is the commercial page.

---

## 4. Free vs Pro

### 4a. The matrix

| Capability | Free | Pro — ¥99 / intake |
|---|---|---|
| All 54 concept lessons | ✅ | ✅ |
| Topic drills (2,260 questions) | ✅ unlimited | ✅ unlimited |
| Quick 10-question drill | ✅ unlimited | ✅ unlimited |
| Smart review (spaced repetition) | ✅ | ✅ |
| Syllabus, dates, fees, requirements, scholarships | ✅ | ✅ |
| **Original mock papers (5)** | **2 attempts each** | **unlimited** |
| **Practice sets (150)** | **2 attempts on sets 01–03 per subject (15 papers)** | **unlimited** |
| **Official past papers (15)** | **study mode** — read the working, no timer | **study + sit, unlimited** |
| **Review sets (6)** | **study mode** | **study + sit, unlimited** |
| Score, topic breakdown, percentile estimate | ✅ every attempt | ✅ every attempt |
| Attempt history | last 10 | full |
| Personalised study plan | manual checklist | generated + adaptive |
| Predicted percentile band | ❌ | ✅ |
| Priority support | ❌ | ✅ |

**Free timed papers: 40** (10 original + 30 practice sets). Free study access
to all 21 official/review papers.

### 4b. Why this model

- **The free tier still delivers the promise.** The landing page says "start a
  free mock" — 40 timed papers makes that true.
- **Pro's value is specific, not vague.** "Unlimited attempts" on 155 papers
  you can already sit twice is a weak pitch; "sit the *official* papers on the
  clock, unlimited, with the published key" is a strong one.
- **Official papers stay studyable for free.** Gating the reading would kill
  the SEO funnel that `/question-papers` already feeds.
- **Practice sets are capped by position, not by count.** Sets 01–03 per
  subject are the free reps; the rest are Pro. Derivable from the slug — no
  schema change.

### 4c. Implementation

`src/lib/attempts.ts` — replace the flat limit with a tier-aware function:

```ts
export type Entitlement = {
  canSit: boolean;
  attemptsLeft: number;   // -1 = unlimited
  reason: "OK" | "LIMIT" | "STUDY_ONLY" | "PLAN";
};

export function entitlementFor(
  user: { plan: string; proExpiresAt: Date | null },
  mock: { paper: string | null; slug: string },
  submittedCount: number,
): Entitlement
```

Rules:

| `mock.paper` | Free | Pro |
|---|---|---|
| `Paper 01` | 2 attempts | unlimited |
| `Practice Set` | 2 attempts if set number ≤ 3, else 0 | unlimited |
| `Official` / `Review` | 0 timed (study only) | unlimited |

`startMockAction` calls it; the mock briefing page renders the state
("You've used both free attempts on this paper" vs "Unlock unlimited attempts
with Pro" vs "Study this paper instead").

**No Prisma schema change.** `User.plan`, `User.proExpiresAt` and `Coupon`
already exist. `Coupon` becomes the Pro distribution mechanism (already
implemented) — Pro is sold as a code until a payment processor is added.

---

## 5. Page blueprints

### 5a. `/app/mocks` — Mock tests library

Header: eyebrow "Mock tests", title *"155 papers. Sit one on the clock."*

- **Two tabs**: `Original mocks (5)` · `Practice sets (150)`
- **Subject filter** chips with counts
- **A "Start here" panel** for a student with no attempts: recommended subject,
  why, one button.
- **Cards** carry: title, subject badge, questions, duration, diagram count,
  your best score, attempts used, and one primary action (`Start` / `Retake` /
  `Resume` / `Unlock with Pro`).

### 5b. `/app/official` — Official papers library

Header: eyebrow "Official papers", title *"The real sittings, digitised."*

- **Two tabs**: `Past papers (15)` · `Review sets (6)`
- **Year filter** (2026, 2025) — carried over from the current page
- **Cards** carry: subject, sitting label, questions, duration, whether it is
  full-length or a short paper, and **two** actions: `Study` (always free) and
  `Sit on the clock` (gated for Free).
- A provenance strip at the top of each card: *"Transcribed from the official
  sitting with its published answer key"* / *"Reconstructed module — not an
  official paper"*.

### 5c. `/app/dashboard` — the daily driver

Keep the current structure. Changes:
- "New mock" → `/app/mocks`
- "Pick your first paper" → `/app/mocks`
- "Papers to sit next" → `/app/mocks`
- Add an **Official papers** entry point: *"Try the March 2026 Mathematics
  sitting — study mode is free."*
- Add a **plan tier banner**: what the student gets on Free vs what Pro adds,
  shown once, dismissible.

### 5d. `/pricing` — rewrite

- Comparison table rebuilt from the §4a matrix (it currently overstates what
  Pro adds).
- Two clear plans: **Free** (¥0, forever) and **Pro** (¥99 per admission
  cycle).
- What happens at the end of the cycle (Pro lapses, papers become Free-tier).
- Coupon redemption note ("have a code?").

### 5e. `/app/billing` — align with the matrix

- Current plan, renewal date, what Pro unlocks, coupon redemption.

---

## 6. Data model

**No new tables required.** `User.plan`, `User.proExpiresAt`, `Coupon`,
`Redemption` already exist and cover the tier model.

Additions worth considering later, not now:
- `Attempt.source` — to distinguish a mock attempt from an official-paper
  attempt in analytics.
- `Attempt.studyMode` — if study mode is ever recorded as an attempt.

---

## 7. Build order

| Phase | Work | Status |
|---|---|---|
| **1. Structure** | Sidebar groups; `/app/mocks` and `/app/official` rebuilt as two libraries; redirects in place | ✅ done |
| **2. Product page** | New public `/mocks` landing page; nav and footer updated | ✅ done |
| **3. Entitlements** | `entitlementFor()` + gated `startMockAction` + locked-state UI on every card | ✅ done |
| **4. Pricing & billing** | Rewrite `/pricing` and `/app/billing` from the matrix | ✅ done |
| **5. Copy & data audit** | Six sittings everywhere; provenance rewritten ("we share the official questions and answers"); every numeric claim matched to the database | ✅ done |
| **6. Polish** | Empty states, loading states, error states, mobile pass, Lighthouse | in progress — **16/16 public pages now at 1.0 / 1.0 / 1.0** |

### What was built, in files

| Area | Files |
|---|---|
| Entitlement model | `src/lib/entitlements.ts` (new), `src/lib/attempts.ts`, `src/lib/actions/attempts.ts` |
| Mock tests library | `src/app/app/mocks/page.tsx` (rebuilt), `src/app/app/mocks/[slug]/page.tsx` |
| Official papers library | `src/app/app/official/page.tsx` (rebuilt), `src/app/app/official/[slug]/page.tsx` (now serves review sets too) |
| Public product page | `src/app/(marketing)/mocks/page.tsx` (new) |
| Navigation | `src/components/app/app-sidebar.tsx` (four groups), `src/components/app/mobile-tab-bar.tsx`, `src/lib/site.ts` |
| Redirects | `src/app/app/papers`, `src/app/app/practice-sets`, `src/app/app/reviews`, `src/app/app/reviews/[slug]` |
| Pricing | `src/app/(marketing)/pricing/page.tsx`, `src/app/app/billing/page.tsx` |
| Pro CTA (account-aware, page stays static) | `src/components/site/pro-cta.tsx` (new) |
| Paper counts (single source of truth) | `src/lib/paper-stats.ts` (new) — the marketing pages read from it and `prisma/seed.ts` asserts it against the database, so a count can never silently drift |

---

## 8. Decisions I need

1. **Sittings per year — five or six?**
   The site says **five** (Jan, Mar, Apr, Jun, Dec) in seven places, but its own
   `EXAM_SITTINGS` array lists **six** (it includes 14–15 Nov 2026). The
   Shanghai government source says five; csca.ai says six. Is the November
   2026 sitting real? If not, remove it from the data; if yes, the copy and
   the "5× sittings" stat are both wrong.

2. **Price and Pro shape.** ¥99 per intake as the plan doc assumes? Is Pro
   sold as a manual code (current mechanism) or should a payment processor go
   in first? A processor changes the funnel a lot.

3. **Is "study mode free on official papers" the right free/paid line?**
   It is the most generous option and it protects the SEO funnel. The
   alternative is 1 timed attempt per official paper on Free.

4. **Do the transcribed official papers stay?**
   The README still says the site "does not copy official papers", while the
   product now depends on 21 transcribed papers. Either the claim changes or
   the content goes. This also affects the "Original questions" badge on the
   homepage.

---

## 9. What already exists (no rebuild needed)

- The timed exam runner, autosave, server-side deadline, review ladder.
- Scoring, percentile model, topic breakdown, readiness score.
- 54 concept lessons with diagrams.
- 2,260-question drill bank, quick drill, spaced repetition.
- Study plan generator.
- Auth, sessions, rate limiting, coupons.
- 21 SEO pages, JSON-LD, `llms.txt`, sitemap.
- The edge cache and the Cloudflare pipeline.

The gap is **structure and packaging**, not capability. Every feature exists;
the problem is that a student cannot tell what to do with it, or what it
costs.
