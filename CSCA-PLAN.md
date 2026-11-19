# CSCA Master — build plan to rank #1 and be the best CSCA product

Derived from [CSCA-MARKET-REVIEW.md](CSCA-MARKET-REVIEW.md) (34 sites) and
[CSCA-SKILLS.md](CSCA-SKILLS.md) (the authentic exam). Plan is ordered so each phase ships and is
measurable on its own.

**Goal:** #1 for every CSCA modifier query (`csca mock test`, `csca practice`, `csca past papers`,
`csca syllabus`, `csca exam dates`, `csca passing score`, `csca test day`, `csca preparation`), top 3
for the brand term, and the best-rated CSCA product in the market.

---

## Phase 0 — Foundations (done)

- Authentic exam data verified against csca.cn + CSC syllabi + Test Rules + Device docs.
- 176 papers, 2,867 questions, 60 topics, all six Chinese item types, 80/90 fidelity.
- Test-client simulation (system check → pledge → full screen → green-left palette → no early submit).
- Server-anchored timer, autosave/resume, topic analytics, spaced review, study plan, daily quiz.
- Technical SEO present: sitemap, robots, canonical, OG image, JSON-LD (Org, FAQ, Course, SoftwareApplication, BreadcrumbList), `llms.txt`.

---

## Phase 1 — Own every intent (content + technical, 2 weeks)

**Principle: one page per intent, 1,500–3,000 words, FAQPage schema, dated, sourced, linked from a hub.**

| Page | Intent it owns | Schema | Status |
| --- | --- | --- | --- |
| `/csca` (existing) | "CSCA exam", "what is CSCA" | FAQ + Course | ✅ 2,901 words: timetable, myths, vs HSK/SAT, timeline, resource map |
| `/csca/faq` | "CSCA FAQ", "CSCA questions" | FAQPage | ✅ shipped — 41 answers |
| `/csca/passing-score` | "CSCA passing score", "CSCA score" | FAQPage | ✅ shipped |
| `/csca/test-centres` | "CSCA test centres", "CSCA home test" | FAQPage | ✅ shipped |
| `/exam-dates` (existing) | "CSCA exam dates 2026" | FAQPage + Event | ✅ FAQ schema + date FAQ block (773 words) |
| `/syllabus` hub (existing) | "CSCA syllabus" | FAQPage + Breadcrumb | ✅ FAQ schema + block |
| `/mocks` (existing) | "CSCA mock test" | FAQ + Course | ✅ title "2026–2027 — 176 Free Full-Length Papers" |
| `/mocks/[subject]` ×5 | "CSCA chemistry mock test", "CSCA physics mock test", "CSCA Chinese mock" | FAQ + Breadcrumb | ✅ shipped: format, topic list, two worked samples, cross-links |
| `/question-papers` (existing) | "CSCA past papers" | FAQ + Breadcrumb | ✅ title now "CSCA Past Papers 2026 — … Free" |
| `/free-exam` (existing) | "free CSCA mock test" | FAQ + Quiz | add worked answers |
| `/sample-questions` (existing) | "CSCA sample questions" | FAQ + Quiz | ✅ 50 questions, all 50 SSR with answers (3,634 words) |
| `/test-day` (existing) | "CSCA test day", "CSCA rules" | FAQPage | keep |
| `/guides/*` (5) | long tail | Article | add 4 guides: 30-day plan, retake strategy, score-to-university fit, Chinese-paper strategy |

**Technical in this phase**

0a. ✅ Live sitemap: `/sitemap.xml` is a route handler with a five-minute edge TTL (a metadata-route
   sitemap gets 24 h, which hides new pages), purged and count-verified by `deploy.sh` on every deploy.
   Production verified at 51 URLs.

0b. ✅ Ownership tags read from env (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, Bing, Yandex) and an
   IndexNow key at `/csca-master-2026.txt` with `npm run seo:indexnow`.

0. ✅ Sitemap `lastModified` now stamped from `CONTENT_UPDATED` (not the request clock), and a public
   `/csca/updates` changelog records every correction with a date.
1. Title template: `{kw} {2026–2027} — {benefit} · CSCA Master` on every money page.
2. BreadcrumbList everywhere; FAQPage on every page with a Q&A block.
3. Internal-link hub block on `/csca` ("CSCA resource map") linking every intent page with keyword anchors.
4. Sitemap priorities by intent value; `lastModified` from content dates.
5. ✅ `hreflang` live on `/` ↔ `/zh`, `/csca` ↔ `/zh/kaoshi`, `/mocks` ↔ `/zh/moniti`, `/csca/faq` ↔ `/zh/wenda`.

**Done when:** 12 intent pages indexable, each ≥1,200 words, schema valid in Rich Results Test, all
linked from the hub and footer.

---

## Phase 2 — Product depth that earns links (3 weeks)

1. ✅ **PDF/printable score report** — shipped: `print` stylesheet + report masthead + "Report" button on every result.
2. ✅ **Pacing analysis** — shipped on every result: time on paper, per-answered-question vs target, coverage verdict.
3. ✅ **Score-to-requirement fit** — shipped on `/requirements`: programme group + scores → subject verdicts (heuristic thresholds labelled).
4. **Hard full-screen lock** in Official mode (visibility API + overlay), matching proctoring reality.
5. **Bilingual explanations** for all 2,867 questions (currently partial).
6. **Error notebook** with in-place re-attempt, not only scheduled review.
7. **Shareable result card** (OG image per attempt) — link-bait for groups and forums.

Each of these is a page + a feature, so it doubles as content: "CSCA score report explained",
"CSCA pacing", "CSCA score requirements".

---

## Phase 3 — Chinese-language surface + regional pages (3 weeks)

- ✅ `/zh` landing shipped with reciprocal `hreflang` (en ↔ zh); next: `/zh/kaoshi` and `/zh/moniti` sub-pages
  that cucas.cn, e-square and sicas currently own.
- ✅ Country pages shipped: `/csca/countries` + 12 pages (BD, NG, PK, VN, ID, KE, EG, ET, GH, IN, IR, KZ) with the Beijing
timetable converted to each local clock, the RHT-vs-centre rule, CNY fee honesty and FAQ schema.
  No invented centre lists or local fees.
- ✅ University requirements page shipped: `/csca/universities` — 22 institutions mapped to their own
domains, the official baseline, a copy-paste English + Chinese email, and no invented cut-offs.

---

## Phase 4 — Distribution and authority (ongoing)

1. ✅ **Outreach kit** shipped at `/partners` (what to link, press facts, contact); next is sending it to
   university international offices and agencies.
2. **Agencies and consultancies** — partner pages; they rank already (crossline, sfin, e-square).
3. **Answer the questions where they are asked**: Reddit, Quora, Facebook groups — link only where
   genuinely useful, with the free tool.
4. **YouTube** — 5 explainer videos (What is CSCA, 48 in 60 strategy, Chinese paper, test day setup,
   score report). No prep site owns video; embed on the matching pages with VideoObject schema.
5. ✅ **Outreach kit** in `CSCA-OUTREACH.md`: 22 university international offices, 6 agencies, media pitch,
   follow-up rules and a tracking table.

**KPIs by phase:** Phase 1 — 12 pages indexed, GSC impressions ×3, first page-1 rankings for
"csca exam dates" and "csca passing score". Phase 2 — 20% lift in sign-up → mock completion.
Phase 3 — zh impressions, 5 country pages ranking. Phase 4 — 30 referring domains.

---

## UI system (product design rules)

- **Two surfaces, one language.** Marketing = editorial (paper, serif display, red accent, dense
  facts). Exam = console (dark header, white question card, no decoration, zero surprise).
- **Exam fidelity first:** left palette, green answered, amber flags, timer top-right, no early
  submit in Official mode, proctor warnings. Any deviation is labelled in-product.
- **One primary action per screen.** Marketing → start a mock. Exam → answer. Result → next best action.
- **Numbers are always tabular** and dated ("verified November 2026").
- **Never invent:** no fake testimonials, no fake centre lists, no "official partner" claims.

## Testing system (what "complete" means)

1. **Data authenticity tests** — seed asserts paper counts, question counts, per-subject lengths
   (48/60 vs 80/90) and fails the build on drift (`PAPER_STATS`).
2. **Timing tests** — server-anchored end time; a refresh cannot buy minutes; auto-submit at zero.
3. **Integrity tests** — save cannot run after submit (409 path), submit is idempotent, answers are
   scored server-side only.
4. **Fidelity tests** — a Playwright run walks gate → pledge → exam → submit → result on both a
   fundamental and a Chinese paper, asserting 48/60 and 80/90, green palette counts and the
   no-early-submit rule.
5. **SEO tests** — every intent page has unique title/description, one H1, FAQPage schema, a
   canonical, and is in the sitemap; a script fails if a page loses its schema.

## Build order (one by one)

1. `/csca/faq` hub → 2. `/csca/passing-score` → 3. `/csca/test-centres` → 4. deepen `/exam-dates` +
   schema → 5. deepen `/syllabus` hub → 6. hub block + footer → 7. title/meta pass → 8. PDF report →
   9. pacing analysis → 10. requirement fit → 11. zh surface → 12. country pages → 13. video →
    14. link outreach.
