---
name: csca-competitors
description: The CSCA prep market as it actually is — csca.app, csca.ai, cscaprep.academy, cscaprepare.com, csca.space and cscainternational.com, plus the China Admissions guidebook — what each one sells, what it charges, what it is good at, where it is wrong or thin, and how to refresh the evidence from research/. Use for positioning, pricing, comparison pages, content gaps, outreach and any claim about "other CSCA sites".
---

# The CSCA prep market

Captured **13 November 2026** through `research/scripts/harvest_sites.py` (api-anything browser
capture → text in `research/normalized/sites/`). Read the site's own page before repeating a fact from
this file: prices and calendars move, and a competitor is not a source of truth about the CSCA.

**Rules for using this file**

- Compare on capability, not on insults. "They do not publish full 80/90 Chinese papers" is fine;
  "they are a scam" is not, and is not something we can evidence.
- Their numbers are their claims. Quote them as claims ("CSCA Space advertises 93.8% student success"),
  never as facts, and never copy one into our copy.
- Never put a competitor's name in our page metadata or schema to farm comparisons. A comparison page
  exists only if it genuinely helps a student choose.
- Their factual errors are an opportunity for *our* accuracy, not for public mockery.

## 1. The field at a glance

| Site | What it is | Free / paid | Content depth | Distinctive | Honest weakness |
| --- | --- | --- | --- | --- | --- |
| **csca.app** (CSCA Academy) | Practice + mocks + past papers, AI coach | Free practice; paid past-paper access | 13 real past papers, 1,800+ free questions, 12/21/15 topics by subject | AI coach ("find weak spots, predict score"), polished onboarding | Claims (90,000+ students, 95% coverage) are unverifiable; paper set is recent-only, no Chinese 80/90 archive |
| **csca.ai** | Freemium practice, 30 mocks, live classes, big blog | 5 free questions/subject; Full Access paid; classes $105 per subject, $200 bundles | 10 mocks per subject (Math/Phys/Chem), Professional Chinese track page | Live teaching + ~45 SEO articles; strongest content marketing | No full Chinese papers; classes are per-sitting cohorts; pricing opaque until checkout |
| **cscaprep.academy** | Free practice + guides, 2027-intake focus | Genuinely free, no paid tier | 48-question timed mocks, Math/Phys/Chem only, spaced repetition, syllabus guides | Speed, clean answers, WhatsApp community, visible "last reviewed" dates | No Professional Chinese papers, no official archive, thin analytics |
| **cscaprepare.com** | Freemium practice + shop + subject routing | 45 practice sets (2,160 Q) free; packs $5.99–$9.99; past-paper bundles via Creem | 15 sets per subject, mock packs, recent-exam bundles, AI assistant "coming soon" | Multilingual (EN/ID/VI/RU), subject picker, commerce | Exam calendar is stale (still calls Dec 2026 "date pending"); bundles are download-first, no timed client |
| **csca.space** | "CBT simulator + academy" in beta | Free tier; paid tier advertised $0–$29/mo | 48 curriculum topics, 58 formulas, 25-question diagnostic, bilingual | Formula knowledge base with derivations; aggressive self-ranking | Self-published comparison table ranks itself first; "99.8% fidelity"/"93.8% success" are marketing; beta polish |
| **cscainternational.com** | Guidance site + handbooks + admissions referral | Free content; paid application support | Blog, exam overview, handbooks | Admissions-side services and a named consultancy | Not a practice platform; some copy speculative (MS/PhD "in near future") |
| **cscamaster.com (us)** | Exam-faithful prep + client simulation | Free tier; Pro via coupon | 176 papers, 2,867 questions, 60 topics, full 80/90 Chinese papers, official archive | Only full-length Chinese papers **and** a documented client start sequence | No live classes, no AI coach, no checkout |

## 2. What each one actually does

### csca.app — CSCA Academy
Positioning: "Put study time where it raises your score." Free instant-graded mocks, 13 real past papers,
AI coach that "predicts your score" and builds a daily plan. Topic counts: Mathematics 12 (588
questions), Physics 21 (721), Chemistry 15 (576) — so roughly 1,800 free questions. Claims 90,000+
students across 100+ countries, 95% topic coverage and "39/48 matched on the latest exam". A countdown to
the 14–15 Nov 2026 sitting sits in the header. Past papers have historically been the paid layer.
**Read:** the strongest product surface of the six; the AI coach is the feature students will compare us
against. It stops at Math/Phys/Chem.

### csca.ai
Positioning: "Prepare for the CSCA with official syllabus and sample PDFs… free practice and full timed
mocks." Five free questions per subject against a two-minute timer; full mocks (10 per subject, 48 Q /
60 min, 0–100) require Full Access. Live classes for December 2026: Mathematics $105, bundles
Mathematics+Physics and Mathematics+Chemistry $200. The blog is the real asset — roughly 45 posts
covering format, per-country registration, MBBS, study plans, books, past papers, "is CSCA mandatory".
**Read:** they beat us on teaching and on organic reach; we beat them on paper depth and the Chinese
papers. Their country posts (Bangladesh, India, Pakistan, Indonesia) are the audience we also want.

### cscaprep.academy
Positioning: free, no paid tier, no upsell — "Genuinely free". Mathematics, Physics and Chemistry:
48-question, 60-minute mocks, spaced repetition, syllabus guides per subject, exam dates sourced from
csca.cn, WhatsApp community support. Every resource page carries a "Last reviewed 27 October 2026"
line and a sources section. Explicitly independent.
**Read:** the closest match to our *ethics* (independence, review dates, no invented statistics) and the
weakest on depth: no Chinese papers, no official archive, no client simulation. Their dated-review
convention is one we should match on every factual page.

### cscaprepare.com
Positioning: "Start CSCA in the right order" — pick subjects, practise in sets of 48, then sit a mock.
45 practice sets × 48 = 2,160 questions, progress in-browser with no account. Shop: mock packs
$5.99–$9.99 and subject past-paper bundles ("22 subject-session combinations, 11 complete sessions
released across five packs") through Creem checkout with ZIP delivery. AI assistant is a "coming soon"
page. Four languages: EN, ID, VI, RU.
**Read:** the most commercially mature of the small sites, and the only one selling past-paper bundles
directly. Its exam calendar is materially out of date — that is a content gap we should own, not mock.

### csca.space
Positioning: beta "official CSCA preparation portal and student exam simulator" — CBT simulator with
48 curriculum topics, a 58-formula knowledge base with derivations and "examiner trap alerts", a
25-question diagnostic claiming a C9 admission-probability rating, and a comparison page that ranks
itself first against tutoring and PDFs. Free tier advertised at $0 with a paid tier around $0–$29/mo.
**Read:** the formula reference and the curriculum topic pages are good SEO surfaces we do not fully
match. Treat every percentage on that site as marketing.

### cscainternational.com
Positioning: "Your gateway to study in China starts with CSCA" — a guidance and admissions site with
handbooks, an exam overview, a blog and application support. WordPress. Some copy describes CSCA
expanding to master's and doctoral admissions "in the near future", which the official portal does not
say.
**Read:** a lead-gen site for admissions services, not a competitor for practice. Useful as a signal of
what consultancies tell students.

### The Guidebook (China Admissions, Nov 2025)
31 pages, free PDF, strong on the *why* and on the two-device test-day logic; its calendar (5 sittings,
first exam 21 Dec 2025) and some 2025–26 dates are stale. Text: `research/normalized/guidebook/`.
**Read:** the best-written third-party explainer in the market and the benchmark for our own long-form
guide. Do not copy its dates.

## 3. Where we win, where they win

**We win on**
- Paper depth: 176 papers and 2,867 questions against 30–45 mocks or 13 past papers.
- Full-length Professional Chinese papers at the official 80 questions / 90 minutes — no competitor
  publishes these at length.
- A free official-paper archive, and transcriptions that state how complete they are.
- Client fidelity: the documented start sequence (check → pledge → fullscreen → green palette → no early
  submit → auto-submit) is still unique.
- A current six-sitting calendar with each sitting's real start time (the 08:00/14:00 model shipped on
  13 Nov 2026) — no competitor prints per-sitting times.

**They win on**
- Teaching: live classes (csca.ai) and an AI coach (csca.app) — we have neither.
- Organic reach: csca.ai's ~45 posts and csca.app's topic hubs out-publish us.
- Commerce: visible prices and a working checkout (cscaprepare, csca.ai); our Pro is coupon-only.
- Formula/reference surfaces (csca.space) and WhatsApp-speed support (academy).

We *do* match the printable score report: the result page is a print-ready document with a "print /
PDF" button and `@media print` rules in `globals.css`. Do not re-list it as a gap.

**Do not compete on**: unverifiable percentages, "official" badges we do not have, or price-cutting on
past papers we do not own.

## 4. Facts competitors get wrong (our accuracy opportunity)

- **cscaprepare.com exam calendar** — "December 2026 (date pending)" while the official portal publishes
  19–20 Dec 2026; its 2026 rows are past sittings.
- **cscaprep.academy** — says Mathematics is required for every applicant (correct) but frames
  Professional Chinese as "Chinese-taught only". CGS-track applicants are commonly required to sit it
  too, so the simplification can mislead scholarship applicants — call it a gap in their page, not a
  proven error.
- **cscainternational.com** — implies CSCA is expanding to master's/PhD admissions "in the near future";
  the official portal does not say that.
- **Everyone** prints one timetable (usually the 14:00 block) although the official notice alternates
  08:00 and 14:00 blocks by sitting. We must not join them.
- **csca.space** — self-ranked "2026 Competitive Benchmark" with invented scoring for rivals.

## 5. Refresh

```sh
export API_ANYTHING_BROWSER=/home/rakib/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome
python3 research/scripts/harvest_sites.py            # all sites (≈25 min)
python3 research/scripts/harvest_sites.py --only csca-ai
python3 research/scripts/normalize.py                # refresh the readable notes
```

Page lists are in `SITES` inside the script; add a path there when a site publishes something new.
`csca.app` needs the browser (Vercel checkpoint) — curl gets a 429. `cscainternational.com` sometimes
serves a Cloudflare interstitial on the first load; re-run that page.

## 6. Keeping the older analysis honest

`CSCA-SKILLS.md` §3 carries a competitor table dated 12 Nov 2026. It is now partly stale: it lists
csca.app as "43 mocks" (today: 13 past papers, 1,800 free questions, AI coach), does not mention
csca.ai's live classes or cscaprepare's shop, and repeats the 14:00 timetable. When you touch it, update
it from this file and the raw captures rather than editing numbers from memory.
