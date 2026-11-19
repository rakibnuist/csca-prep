# CSCA Master — Two-Track Separation Roadmap
**English-taught applicants ↔ Chinese-taught applicants**

| Field | Value |
| --- | --- |
| Document | CSCA-TRACK-SEPARATION-ROADMAP.md |
| Owner | Project Manager (CSCA Master) |
| Status | **AWAITING APPROVAL — no execution started** |
| Version | 1.0 |
| Prepared | 13 Nov 2026 |
| Scope | Restructure the whole product so English-taught and Chinese-taught applicants live in two fully separated surfaces — from the homepage to the dashboard to the exam client — with per-track data isolation, a more professional mobile-first UI, maximum free data, and #1 search/LLM visibility. |

---

## 1. Executive summary

CSCA Master already reproduces the real exam more faithfully than any competitor
(176 papers, 2,867 questions, the documented test-client sequence, server-anchored timer,
per-topic analytics, spaced review). The current EN/ZH split exists **only as a soft, URL-driven
section** inside the logged-in app: the marketing homepage is unified, the track is carried as a
`?taught=` query param that any user can flip, and the "teaching track" is stored by reusing the
`testLanguage` column (interface language). That conflates *which exams you sit* with *which
language the buttons are written in*.

This roadmap converts that soft split into a **hard, account-bound, two-track architecture**:

- A student is assigned **one** teaching track at sign-up (English-taught **or** Chinese-taught).
- Every surface — marketing landing → sign-up → onboarding → dashboard → mocks → exam → results →
  analytics — is rendered inside that track, with track-scoped URLs, track-scoped content, and
  track-scoped data.
- Data isolation is enforced **server-side**, not by URL param: a user can only ever query their
  own track's papers, questions, attempts, leaderboard, review queue, study plan and analytics.
- The exam client becomes **mobile-first for practice** while the *Official* simulation keeps its
  desktop fidelity (the real RHT is Windows-only — we preserve that honesty).
- Free users get **maximum data** within their track (syllabus, sample questions, official archive
  study mode, score calculator, requirement fit, PDF report, pacing, spaced review). Pro unlocks
  unlimited *timed* attempts + advanced analytics — never content.
- SEO/LLM authority is rebuilt **per track** so each track owns its own query space and its own
  `llms.txt` surface.

---

## 2. Goal & success criteria

**Goal.** The #1-rated and #1-ranked CSCA product, with two cleanly separated applicant
experiences, each independently ranking for its own query space and each maximally useful on a
phone.

**Primary success metrics (targets, to be validated in Phase 0):**

| KPI | Target |
| --- | --- |
| Track-correct content exposure | 100% of surfaced papers/questions match the user's assigned track (automated test) |
| Cross-track data leakage | 0 incidents (automated guard + manual audit) |
| Sign-up → first timed attempt (per track) | +30% vs current baseline |
| Mobile completion rate of a 48-question paper | ≥ current desktop completion |
| Mobile Lighthouse performance / accessibility | ≥ 90 / ≥ 95 |
| Track landing pages indexed | `/en` + `/zh` (or equivalent) each indexed within 30 days |
| Search impressions (GSC, per-track page set) | ×3 in 60 days |
| LLM citation surface | `llms.txt` + `llms-full.txt` expose both tracks; structured data valid |
| Referring domains (authority) | 30+ |

**Non-negotiables (carried from CSCA-SKILLS.md rule zero):** authentic data only, no invented
facts, every modelled percentile/band labelled as an estimate, and any deviation from real-client
behaviour is labelled in-product.

---

## 3. Current state vs target

| Dimension | Today | Target |
| --- | --- | --- |
| Track model | Soft: `tracks.ts` + `?taught=` param; `testLanguage` doubles as track | Hard: `teachingTrack` account field; track is an identity property, not a URL param |
| Surface separation | Only `/app/english` + `/app/chinese` inside the app | Homepage → sign-up → onboarding → dashboard → exam → results, all track-scoped |
| Chinese sub-track | `User.track` = HUMANITIES \| STEM (used loosely) | `chineseSubTrack` = HUMANITIES \| STEM, enforced only for ZH track |
| Data isolation | Query filters in `tracks.ts` (`trackQuestionWhere`/`trackPaperWhere`) applied inconsistently | Enforced at the data-access layer on every query; leaderboard/review/plan/analytics all scoped |
| Marketing homepage | One unified homepage | Track chooser landing + per-track homepages |
| Exam client | Desktop-first (viewport ≥1024 gate) | Mobile-first Practice mode; desktop-faithful Official mode |
| Design | Editorial marketing + console exam (good base) | Unified professional design system with purposeful motion, mobile-first |
| SEO/LLM | Strong: sitemap, JSON-LD, hreflang, `llms.txt`, country pages | Extended per track + answer-engine optimization |

**Key files that change or anchor the work:** `prisma/schema.prisma`,
`src/lib/tracks.ts`, `src/lib/access.ts`, `src/lib/entitlements.ts`,
`src/lib/actions/*`, `src/app/(marketing)/*`, `src/app/app/*`, `src/components/exam/*`,
`src/components/app/*`.

---

## 4. Core architecture decision

### 4.1 The two-track model

| Track | Who | Papers (authentic) | Our surfaces |
| --- | --- | --- | --- |
| **EN — English-taught** | Applicants to English-medium programmes | Mathematics (EN), Physics (EN), Chemistry (EN) | `/en` → `/en/app/...` |
| **ZH — Chinese-taught** | Applicants to Chinese-medium programmes | Professional Chinese (文科/理科) + Mathematics/Physics/Chemistry (Chinese) | `/zh` → `/zh/app/...` |

Within ZH, a second dimension already exists and is kept: **HUMANITIES (文科中文)** vs **STEM
(理科中文)** for the Professional Chinese paper.

### 4.2 Two decoupled concepts (the bug this roadmap fixes)

- **Teaching track** = *which exams you sit* → `teachingTrack: EN | ZH` (account-bound).
- **Interface locale** = *which language the chrome is in* → `uiLocale: en | zh` (a preference, may
  differ from the track).

Today these are the same column. They must be split so a Chinese-taught applicant can still read
the dashboard in English if they want, without being shown English-taught content.

### 4.3 Data isolation model

- Every server action and route handler resolves the signed-in user, loads their `teachingTrack`,
  and applies a **non-optional** scope filter. No client-supplied value can widen scope.
- `Attempt`, `ReviewItem`, `PlanTask`, `DailyQuizCompletion`, `PracticeActivity`, leaderboard and
  analytics queries all carry the track scope (or a foreign key back to a track-scoped parent).
- `?taught=` is **removed** as a cross-track switch. Track switching becomes an explicit settings
  action (re-runs onboarding, keeps the old track's history read-only, resets no data).
- Admin remains the only actor who can view across tracks, and even then through a segmented view.

---

## 5. Decision points requiring your approval

> Recommendation is in **bold**. These are the gates before execution begins.

| # | Decision | Options | Recommended |
| --- | --- | --- | --- |
| D1 | URL topology | (a) top-level `/en/**` + `/zh/**`; (b) `/english/**` + `/chinese/**`; (c) keep unified + scoped app only | **(a) `/en` + `/zh`** — shortest, cleanest for SEO and international users |
| D2 | Track assignment | account-bound at sign-up, switchable in settings | **Account-bound, switchable in settings with re-onboarding** |
| D3 | Schema | add `teachingTrack` + `uiLocale`, rename `track`→`chineseSubTrack`; or keep `track` name | **Add `teachingTrack` + `uiLocale`, keep `track` column name but redefine as Chinese sub-track (lower migration risk); backfill** |
| D4 | Interface language vs track | allow any `uiLocale` in any track | **Allow — decoupled preference** (improves Chinese-taught applicants who prefer English UI) |
| D5 | Pricing | unified Pro across both tracks vs per-track pricing | **Unified Pro** (simpler; "maximum data" per track still holds) |
| D6 | Cross-track history on switch | keep old track history read-only vs wipe | **Keep read-only** (no data loss, honest record) |
| D7 | Official-mode on mobile | keep desktop-only (fidelity) vs relax | **Official stays desktop-faithful; Practice becomes mobile-first** (honest + matches real RHT) |
| D8 | Homepage split | hard fork at `/` vs chooser + redirect to track home | **Chooser at `/` with per-track `/en` + `/zh` homepages** (one brand, two funnels) |

---

## 6. Workstreams (epics)

### WS1 — Data model & identity
- Add `User.teachingTrack` (`EN|ZH`, default `EN`), `User.uiLocale` (`en|zh`), redefine `User.track`
  as the ZH sub-track (`HUMANITIES|STEM`).
- Add `Attempt.teachingTrack` snapshot (already partly present as `track`; align + enforce).
- Backfill: `teachingTrack` ← `testLanguage`; `uiLocale` ← `testLanguage`; `track` ← existing.
- Add Prisma indexes for per-track leaderboards/analytics.
- **Deliverable:** migration + backfill script + seed assertions.

### WS2 — Track-scoped routing & navigation
- New route groups: `/en/**` and `/zh/**` for marketing **and** app surfaces.
- Redirects and rewrites from legacy `/app/english`, `/app/chinese`, `/app/*` to the track-scoped
  paths with 301s (preserve SEO equity).
- Navigation, breadcrumbs, footer, sitemap, robots all track-aware.
- **Deliverable:** full route map + redirect table + updated nav.

### WS3 — Auth & onboarding
- Track chooser at sign-up with plain-language consequences (which papers you sit).
- Onboarding flow per track: EN → Math/Phys/Chem; ZH → 文科中文 vs 理科中文 selection + Math/Phys/Chem.
- Settings: switch track (explicit, re-onboarding), change `uiLocale` independently.
- **Deliverable:** new sign-up/onboarding + settings with track/locale controls.

### WS4 — Data isolation & privacy (hard guarantees)
- Central server-side scope helper (`withTrackScope`) applied to all actions/route handlers.
- Remove `?taught=` cross-track override; make track an account property.
- Scope leaderboard, review queue, study plan, daily quiz, analytics, recommendations per track.
- Privacy: leaderboard stays opt-in + pseudonym; no cross-user PII anywhere.
- **Deliverable:** isolation guard + integration tests that assert 0 cross-track leakage.

### WS5 — Mobile-first exam client
- Responsive question card (fluid type, KaTeX reflow, no horizontal scroll).
- Touch targets ≥44px; swipe/next-prev navigation; sticky bottom answer palette + flag strip.
- Sticky timer pill; autosave hardened for flaky mobile networks (retry/queue).
- Practice mode: fully mobile. Official mode: keeps desktop fidelity + fullscreen/visibility lock.
- **Deliverable:** redesigned `exam-runner.tsx` + palette + gate, verified on ≤390px viewport.

### WS6 — Per-track dashboard & analytics
- Track-scoped dashboard: progress, streak, weakest topics, next paper, study plan.
- Per-track score report, PDF report, pacing analysis, requirement fit.
- Separate leaderboards per track.
- **Deliverable:** track-scoped dashboard + result/analytics components.

### WS7 — Content coverage per track
- Fill ZH content gaps (bilingual explanations for all questions — currently partial).
- Verify each track's paper/question inventory via `trackQuestionWhere`/`trackPaperWhere` assertions.
- Ensure EN track has zero Chinese-only leakage and ZH track has zero English-only legacy leakage.
- **Deliverable:** per-track content inventory + completeness report + bilingual explanations.

### WS8 — Professional design system & motion
- Tokens: two-track colour/label identity (distinct but same brand), editorial serif for marketing,
  console sans for exam; refined dark/light.
- Purposeful motion (GSAP / Motion): entrance, page transitions, micro-interactions, reduced-motion
  respected. Reference the `frontend-design`, `design-motion-principles`, `gsap-core` skills.
- **Deliverable:** design tokens + component refresh + motion pass.

### WS9 — SEO & LLM optimization (per track)
- Track homepages `/en` + `/zh` with unique H1/title/description, FAQPage + Breadcrumb + Course schema.
- Track-specific syllabus, exam dates, sample questions, mocks, guides, FAQ, requirements — each
  owning distinct keywords (e.g. "CSCA English-taught", "CSCA Chinese-taught", "CSCA Professional
  Chinese", "CSCA 文科中文", "CSCA 理科中文").
- `llms.txt` + `llms-full.txt` expose both tracks; structured data valid (Rich Results).
- hreflang + canonical per track; internal-link hub per track; sitemap priorities.
- **Deliverable:** per-track content map + schema + `llms.txt` update + validation script.

### WS10 — Testing, accessibility, performance
- Data-authenticity, timing, integrity, fidelity (Playwright EN + ZH), SEO schema tests.
- Accessibility (keyboard, focus, ARIA on palette/runner), Lighthouse ≥90.
- **Deliverable:** CI test suite green + a11y/perf report.

### WS11 — Launch, migration & measurement
- Zero-downtime schema migration + backfill; feature flag to cut over.
- Analytics events per track (signup→attempt→result→return).
- Rollback plan + verification (deploy scripts already exist in `deploy/`).
- **Deliverable:** cutover runbook + post-launch measurement dashboard.

---

## 7. Phased execution plan

> Timeboxes assume a focused small team; adjust once Phase 0 baselines are confirmed.

| Phase | Workstreams | Focus | Exit criteria |
| --- | --- | --- | --- |
| **P0 — Decisions & baseline** (2–3 d) | D1–D8, WS1 design | Lock decisions, capture baselines (SEO, mobile, funnel) | Decisions approved; baselines recorded |
| **P1 — Data & identity** (3–4 d) | WS1, WS4 | Schema migration + backfill + hard scope guard | Migration applied, guard on every action, 0-leak tests green |
| **P2 — Track-scoped surfaces** (7–10 d) | WS2, WS3, WS6 | Routes, nav, onboarding, dashboard all separated | Homepage→dashboard fully track-scoped; legacy 301s live |
| **P3 — Mobile exam + content** (7–10 d) | WS5, WS7 | Mobile-first Practice runner + per-track content completeness | 48/60 + 80/90 papers complete on mobile; content report clean |
| **P4 — Design & SEO/LLM** (7–10 d) | WS8, WS9 | Professional UI + motion + per-track SEO/LLM | Design pass shipped; `/en` + `/zh` indexed-ready; schema valid |
| **P5 — QA & launch** (3–4 d) | WS10, WS11 | Full test suite, a11y/perf, cutover + rollback | CI green, Lighthouse ≥90, launch runbook approved |

**Total:** roughly **4–6 weeks** of focused execution.

**Sequencing rationale:** identity (P1) before surfaces (P2) because every surface reads the
track from the account; surfaces before content (P3) so content lands in the right place; design &
SEO (P4) last because they polish and rank what already exists; launch (P5) only after green.

---

## 8. Data migration & rollout

1. **Expand schema** (additive, non-breaking): `teachingTrack`, `uiLocale`; keep `track`.
2. **Backfill** in a script: `teachingTrack ← testLanguage` (`zh`→`ZH`, else `EN`);
   `uiLocale ← testLanguage`; `track` unchanged.
3. **Deploy migration** behind a feature flag; old behaviour untouched until cutover.
4. **Switch reads** to the new fields; enforce scope server-side.
5. **Cut over routes** (`/en`, `/zh`) with 301s from legacy paths.
6. **Verify + monitor**; keep rollback scripts (`deploy/rollback.sh`, `deploy/verify-live.sh`).

---

## 9. Design system & motion direction

- **Brand:** keep "editorial paper" for marketing, "console" for exam — now with a clear
  **two-track identity**: EN = one accent/eyebrow, ZH = another, sharing typography and grid.
- **Typography:** serif display (marketing H1) + tabular-numeral sans (scores, timers, analytics).
- **Motion (GSAP):** purposeful only — staggered entrances, page transitions, count-up scores,
  scroll reveal on marketing; `prefers-reduced-motion` respected; transforms/opacity only.
- **Mobile-first:** every screen designed at 390px first, then desktop; touch-first controls.

---

## 10. Mobile exam UX spec

| Element | Mobile behaviour |
| --- | --- |
| Question card | Fluid type scale; KaTeX reflows; no horizontal scroll |
| Navigation | Sticky bottom bar: prev/next, answer palette (bottom sheet), flag |
| Palette | Bottom sheet, answered = green, flagged = amber, current = ringed (kept from fidelity map) |
| Timer | Sticky pill, server-anchored; autosave with retry/queue |
| Official mode | Desktop-only (real RHT is Windows); label this in-product |
| Practice mode | Fully mobile, offline-tolerant save |

---

## 11. SEO & LLM plan (per track)

- Two authoritative track hubs (`/en`, `/zh`) + per-track intent pages (syllabus, dates, sample
  questions, mocks, guides, FAQ, passing score, requirements, test day).
- Per-track schema: `FAQPage`, `BreadcrumbList`, `Course`, `SoftwareApplication`.
- `llms.txt` + `llms-full.txt` list both tracks with canonical, self-contained descriptions.
- Answer-engine optimization: direct, dated, sourced answers to high-intent questions on each page.
- Internal-link hub per track; sitemap priority by intent; IndexNow ping on publish.

---

## 12. Testing & definition of done

Reuse and extend the existing testing system (CSCA-PLAN.md §"Testing system"), plus:

1. **Isolation test** — a ZH user can never query/see an EN-only paper or question (and vice versa);
   cross-track leaderboard/analytics return nothing.
2. **Fidelity test** — Playwright runs gate → pledge → exam → submit → result on EN (48/60) and ZH
   (80/90), asserting palette counts, no-early-submit, server-anchored timer.
3. **Mobile test** — Playwright at 390px runs a full Practice paper to submit.
4. **SEO test** — every per-track page has unique title/description, one H1, canonical, FAQPage
   schema, and is in the sitemap.
5. **A11y/perf** — Lighthouse ≥90, keyboard/touch operable.

---

## 13. Risks & mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Migration breaks existing user data | High | Additive schema + backfill + feature flag + rollback scripts |
| Cross-track leakage regressions | High | Server-side guard + automated 0-leak tests in CI |
| Mobile exam lower fidelity perception | Med | Practice = mobile-first, Official = desktop-faithful, both labelled |
| SEO equity lost during URL restructure | Med | 301 redirects, preserve canonical signals, verify sitemap |
| ZH content gaps (bilingual explanations partial) | Med | WS7 completeness report + backlog before launch |
| "Be #1" is a goal, not a guarantee | — | Ship all levers (content, schema, llms.txt, authority); track KPIs honestly |

---

## 14. KPIs & measurement

- Funnel per track: sign-up → onboarding complete → first attempt → first result → return.
- Content: 100% track-correct exposure (automated), 0 leakage incidents.
- Mobile: completion rate, time-to-answer, Lighthouse ≥90.
- SEO: per-track indexed pages, impressions, first-page rankings for the two track keyword clusters.
- LLM: structured-data validity, `llms.txt` reach, citations/referrals.

---

## 15. Open questions for you

1. Confirm D1 (URL topology) — `/en` + `/zh`?
2. Confirm D3 (rename `track`→`chineseSubTrack` vs keep name) — recommended: keep name, redefine.
3. Confirm D7 (Official stays desktop, Practice goes mobile-first)?
4. Any preference on brand accent colour per track (EN vs ZH), or keep one shared brand?

---

## 16. Approval checklist

- [ ] Decisions D1–D8 approved (or defaulted to recommendations)
- [ ] Phase 0 baseline captured (SEO, mobile, funnel)
- [ ] Execute P1 → P5 in order, gating each phase on its exit criteria
- [ ] Launch only after CI green + Lighthouse ≥90 + isolation tests green
