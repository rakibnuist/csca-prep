# CSCA Master — Product Plan & Launch Playbook

> **Status (v1 delivered, 27 Oct 2026):** all P0–P3 phases are built and running locally at
> http://localhost:3002. P4 (deployment) is the remaining step: point `DATABASE_URL` at managed
> Postgres, set `JWT_SECRET`, deploy to Vercel and submit the sitemap. See README for the checklist.

**Domain:** https://www.cscamaster.com
**Repo:** csca-prep · **Stack:** Next.js 16 · React 19 · Tailwind v4 · Prisma 7 · PostgreSQL
**Research snapshot:** 27 Oct 2026

---

## 1. What CSCA actually is (verified)

The **China Scholastic Competency Assessment (CSCA)** is a standardized exam launched by the
**China Scholarship Council (CSC)** for international students applying to **undergraduate**
programmes in China.

| Fact | Detail |
|---|---|
| Mandatory from | 2026/2027 academic year (applicants to CGS-participating universities) |
| Universal from | 2028 — all undergraduate applicants, with minimum admission standards |
| Subjects | **Professional Chinese** (Humanities / STEM) + **Fundamental**: Mathematics, Physics, Chemistry |
| Format | All single-answer multiple choice, every subject scored **0–100** |
| Length | Professional Chinese: **80 Q / 90 min**. Mathematics, Physics, Chemistry: **48 Q / 60 min** each |
| Language | Fundamental subjects in **Chinese or English**; Professional Chinese in Chinese only |
| Exemptions | English-taught programmes → exempt from Professional Chinese; Chinese Language majors → HSK 4 may exempt |
| Fees | **CNY 450** for one subject; **CNY 700** for two or more |
| Sittings | 5 per year (Jan, Mar, Apr, Jun, Dec), staggered time zones for Asia-Pacific vs Europe/Africa/Americas |
| Modality | Home-based online proctored, computer-based centres, paper-based centres (first centres: Vietnam, Thailand) |
| Results | Online/computer-based: within 7 working days. Paper: within 14 working days |
| Percentile | Universities see each applicant's **global percentile**, not just the raw score |
| Official | csca.cn · sylabus downloads at csca.cn/testprep/examsv · support@csca.cn |

**Official syllabus structure used in this product** (from the 2025 official outlines, bilingual CN/EN):

- **Mathematics** — Sets & Inequalities · Functions · Geometry & Algebra · Probability & Statistics (13 sub-topics)
- **Physics** — Mechanics · Electromagnetism · Thermodynamics · Optics · Modern Physics (17 sub-topics)
- **Chemistry** — Basic Concepts & Calculations · Substance Properties & Reactions · Chemical Theories & Laws · Experiments & Applications (17 sub-topics)
- **Humanities Chinese** — 选词填空 · 选词成段 · 阅读理解 across literature, philosophy, history, law, education, arts
- **STEM Chinese** — same three item types across maths/physics/chemistry terminology, lab language, academic reading

---

## 2. Competitive landscape (audited live)

| Player | What they do | Weakness we exploit |
|---|---|---|
| **csca.cn** (official) | Registration, dates, scores, syllabus PDFs, university showcase | Zero practice engine, no analytics, no guidance. We integrate, never compete. |
| **sicyes.com** | Dumps huge PDF packs (official papers, vocab) behind Facebook/Telegram/GitHub links | File-sharing UX, no scoring, no feedback, no progress. We turn static PDFs into adaptive practice. |
| **csca.school** (sicyes' "free online test") | Was a free online test portal | **Currently offline (connection refused, Oct 2026).** A dead competitor tells you the free-test market is unserved. |
| **CSCA Academy** (iOS/Android) | Mobile app, paid course content | App-only, no browser exam simulation, weak analytics, no university requirement matrix. |
| **Hock International** | Paid CSCA membership course | Expensive, generic LMS, no CSCA-specific exam engine. |
| **BCU / university prep series** | Publisher-led training products, WeChat courses | High friction, not self-serve, no global access. |
| **Facebook group csca.cn** | Community + shared materials | Unstructured; high-intent traffic we can capture with SEO + free tools. |

### The gap (our wedge)

Nobody combines: **exam-accurate simulator + topic-level mastery analytics + university requirement intelligence + official-dated planning**, in a fast, bilingual, browser-first product. That is the product.

**Positioning:** *The exam-accurate CSCA preparation platform. Free full-length mocks, honest analytics, and the university requirement matrix the official site doesn't publish.*

---

## 3. Product principles

1. **Exam fidelity over gamification.** Exact question counts, timings, navigation and review behaviour. Students should feel the real exam before they pay CNY 700.
2. **Honest analytics.** Every projection is labelled as an estimate; percentile is modelled, not invented. No fake testimonials, no fake pass rates.
3. **Bilingual by default.** CN/EN question toggle; Chinese UI labels where it matters. Most competitors are monolingual.
4. **Free core, paid depth later.** Free tier = one full mock per subject + drills. Pro (waitlist now) = unlimited mocks, adaptive plans, mentor review.
5. **Fast and offline-tolerant.** No external auth vendor, no third-party UI kit at runtime. Server-rendered, <150 KB JS on marketing pages.

---

## 4. Information architecture

```
/                          Landing (conversion)
/csca                      Exam guide: what, who, dates, fees, format, scoring, FAQ
/exam-dates                All 2026–2027 sittings + registration windows + timezone notes
/syllabus                  Syllabus hub (5 subjects)
/syllabus/[subject]        Bilingual topic tree, weights, practice links
/scholarships              CGS, provincial, city and university funding (public, read-only)
/requirements              Which CSCA subjects each programme group needs + exemptions
/tips                      Exam strategy, time budget, per-subject technique, error log
/sample-questions          25 free questions, no account
/guides  /glossary  /tools/score-calculator   Long-tail SEO cluster
/pricing                   Free vs Pro waitlist (honest)
/about  /contact           Trust + lead capture
/sign-in  /sign-up         Auth

/app/dashboard             Readiness, countdown, next actions, score trend, weak topics
/app/mocks                 Mock library by subject, attempt state
/app/mocks/[slug]          Briefing: format, rules, sections, start
/exam/[slug]               Full-screen exam simulator (timer, palette, flags, review)
/app/practice              Topic drills + difficulty filter + smart review queue
/app/practice/quick        Mixed 10-question drill (any subject, any difficulty)
/app/results  /app/results/[id]   Score, topic breakdown, percentile, full review
/app/plan                  Personalised 3-phase study plan + checklist
/admin                     Content + attempt + lead overview
```

---

## 5. Data model (Prisma)

`User` · `Subject` · `Topic` · `Question` · `Mock` · `MockItem` · `Attempt` · `ReviewItem`
`ExamDate` · `Lead`

Design notes:
- `Question.options` is a Postgres `String[]` with `correctIndex`; CN variants sit alongside EN.
- `Attempt.answers` is JSON (`{questionId: optionIndex}`) so partial autosave is cheap.
- `Attempt.topicBreakdown` is a materialised JSON summary for fast analytics without re-joining.
- `ReviewItem` implements a light spaced-repetition ladder (`nextReviewAt`, `streak`).
- Scoring: `score = round(correct / total * 100)`; percentile is modelled from a normal curve, labelled "estimated".

---

## 6. Content plan

| Asset | Target | Source |
|---|---|---|
| Syllabus topic tree | 50 topics, bilingual | Official 2025 outlines (transcribed) |
| Question bank | 300+ original items with explanations | Authored in-house, tagged to topics |
| Full-length mocks | 3 × 48 Q (Math/Phys/Chem) | Curated from bank, official timing |
| Chinese papers | 48 Q short papers (clearly labelled) | Authored, official item types |
| Universities | 60 curated + 306 names | Official lists + public prospectuses |
| Exam dates | 2026 Nov → 2027 Jun | csca.cn announcements |

**Content integrity rules:** every question tagged to one syllabus topic; every explanation shows the working;
no copied official paper text; requirement data marked "verify with the university" with a last-verified date.

---

## 7. Build phases

- **P0 — Foundations (done):** local Postgres-free dev DB (PGlite wire server), Prisma schema, auth, design system.
- **P1 — Exam engine (done):** simulator, autosave, server-side scoring, review, analytics.
- **P2 — Content (done):** syllabus, curated bank (272) + legacy drill bank (~1,940), mocks, exam dates, seeding.
- **P3 — Growth (done):** SEO cluster (sample questions, score calculator, glossary, five guides,
  scholarships, requirements, tips), sitemap, JSON-LD, static rendering, landing conversion, lead capture, admin.
- **P4 — Launch (next):** deploy to cscamaster.com (Vercel + managed Postgres), verify Search Console,
  add email verification/password reset, then start content cadence (one guide per fortnight).

---

## 8. Launch checklist

- [ ] `DATABASE_URL` points at managed Postgres (Neon/Supabase) in production
- [ ] `JWT_SECRET` set to a 32+ char random value
- [ ] Domain + `www` + canonical redirects, `NEXT_PUBLIC_APP_URL` set
- [ ] Google Search Console verification + sitemap submission
- [ ] Analytics (Plausible/GA4) consent-safe
- [ ] Terms, Privacy, refund policy for any paid tier
- [ ] Verify university requirement data with admissions offices before Pro launch
- [ ] Load test /api and simulator autosave

## 9. Monetisation (after free launch)

Free: 1 full mock per subject, all drills, syllabus, university directory.
Pro (CNY 99 / intake): unlimited mocks, adaptive study plan, score guarantees content, mentor feedback.
B2B: agency/consultancy seats (SICYES-style partners), white-label for universities, referral fee on application services.
