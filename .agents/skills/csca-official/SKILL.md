---
name: csca-official
description: The authentic CSCA record — papers and timings, syllabus scope, sitting calendar (including the 08:00/14:00 start-time trap), fees, registration rules, RHT/CBT delivery, test-day sequence, scoring, penalties — plus the exact api-anything operations that refresh it from csca.cn. Use whenever a page, question, mock, guide, FAQ answer, or marketing claim in this repo states a fact about the real CSCA.
---

# CSCA — the official record

Load this before writing or editing anything that asserts a fact about the CSCA: exam structure,
dates, fees, rules, scoring, eligibility, equipment. The repository's own rule zero applies — **authentic
data only** — and this file is where "authentic" is defined.

**Hierarchy of authority.** The official portal (`csca.cn`) and CSC-published documents win over
everything else. The China Admissions Guidebook is a useful synthesis but it is a **November 2025
snapshot** and parts of it are already stale (see §13). Our own pages, FAQs and guides are downstream:
when they disagree with this file, this file wins and the page gets fixed.

**Freshness.** Last verified **13 November 2026** against `csca.cn`. Every fact below that a user can
see should carry a "verified" date on the page that states it.

---

## 1. What the test is

| Field | Value |
| --- | --- |
| Name | 来华留学本科入学学业水平测试 / China Scholastic Competency Assessment (CSCA) |
| Organiser | China Scholarship Council (CSC), 国家留学基金管理委员会 |
| Purpose | A common academic baseline for international undergraduate applicants to mainland China; a reference in admission and scholarship review, not the sole criterion |
| Recognition | The portal states **300+** recognised Chinese universities (13 Nov 2026). Do not round this up or invent a growth rate |
| Eligible | Non-Chinese citizens applying for undergraduate study in mainland China. **Chinese passports and Hong Kong / Macao / Taiwan residence permits cannot register** |
| Age | **No age limit. Under-18 applicants need parental consent and assistance to register.** (Older internal notes said "under 14" — that was wrong; the official FAQ says 18) |
| ID document | **Passport is the only accepted identification.** Original, valid on test day; expired or photocopied passports are refused entry |
| Attempts | Unlimited. Every score is valid for **two years**; applicants may submit their best valid score, subject to each university |
| Language | Mathematics, Physics, Chemistry: Chinese **or** English, chosen per subject. Professional Chinese: **Chinese only** |
| Subjects per sitting | No cap — candidates choose according to their target universities |

Official source: `csca.cn/about/examintro` (rendered copy in
`research/normalized/csca/rendered-about-examintro.md`), `csca.cn` FAQ
(`resource-rht-faq-common-questions`), Test Rules, and the 2025 syllabi.

## 2. Papers

| Paper | Questions | Time | Language | Score |
| --- | --- | --- | --- | --- |
| 专业中文 — Humanities (文科中文) | 80 | 90 min | Chinese | 0–100 |
| 专业中文 — STEM (理科中文) | 80 | 90 min | Chinese | 0–100 |
| Mathematics 数学 | 48 | 60 min | Chinese / English | 0–100 |
| Physics 物理 | 48 | 60 min | Chinese / English | 0–100 |
| Chemistry 化学 | 48 | 60 min | Chinese / English | 0–100 |

- Every paper is **single-answer multiple choice**; every paper is scored out of 100.
- **No negative marking.** There is **no national pass mark** — each university sets its own minimums.

**Subject selection is now stated verbatim on the portal** (`csca.cn/about/examintro`):

| Applicant | Compulsory | Optional |
| --- | --- | --- |
| Chinese Government Scholarship undergraduate applicant | **Mathematics + Professional Chinese** (Humanities or STEM per the programme) | Physics, Chemistry — per the receiving programme |
| Non-scholarship undergraduate applicant | **Mathematics**; **Professional Chinese if applying to a Chinese-taught programme** | Physics, Chemistry — per the receiving programme |

Read the second row carefully: Chinese-taught applicants sit Professional Chinese, and CGS applicants
sit it regardless of teaching language. Physics and Chemistry are electives in the fee-and-subject
structure — science, engineering and medicine programmes usually require at least one, but the
requirement is the university's, not CSCA's. Never state a combination as universal; publish it as "what
your target programme requires" and link the university.

## 3. Syllabus scope (official 2025 edition)

The portal currently publishes **four** syllabus PDFs (Physics zh, Chemistry zh, Mathematics zh,
Mathematics en) at `csca.cn/about/testprep`. There is **no public Professional Chinese syllabus PDF** in
that bundle — the six official item types come from the CSC-published 2025 syllabus and are reproduced
in `CSCA-SKILLS.md` §1.

- **Mathematics** — sets and inequalities; functions (domain/range, monotonicity, parity, power /
  exponential / logarithmic / trigonometric, sequences, basics of derivatives); geometry and algebra
  (lines, circles, ellipses, hyperbolas, parabolas, vectors, complex numbers, spatial coordinates);
  probability and statistics (classical probability, mean/variance, normal distribution basics).
- **Physics** — mechanics (kinematics, Newton's laws, momentum/impulse, work–energy, circular motion and
  gravitation, SHM and waves); electromagnetism (Coulomb, field and potential, DC circuits, induction,
  Ampère and Lorentz, Faraday and Lenz); thermal (kinetic theory, ideal gas, first law); optics
  (reflection/refraction, interference, diffraction); modern physics (photoelectric effect, atomic
  structure, nuclear basics).
- **Chemistry** — matter and state changes; notation and equations; concentration and pH; amount of
  substance; ideal gas; inorganic properties; basic organic compounds; redox; ionic reactions and
  identification; atomic structure and periodic law; bonding and intermolecular forces; rates and
  equilibrium; electrolyte solutions; lab safety, gas preparation, separation and purification,
  industrial processes.
- **Professional Chinese** — 识解汉字, 选词填空, 辨析词语, 选词成段, 补全语句, 阅读理解. Humanities
  topics: literature, philosophy, law, education, history, arts. STEM topics: symbols and formulas,
  physical laws, chemical equations, lab terminology, university-level basics, programming terms, data
  and graph interpretation, academic reading.

Extracted text of all four syllabi: `research/raw/csca/syllabus/*.txt`.

## 4. Sitting calendar — the 08:00/14:00 trap

Six sittings a year (January, March, April, June, November, December). Each runs over **two days**:
day 1 Professional Chinese then Mathematics, day 2 Physics then Chemistry, all Beijing time (UTC+8).

Published 2026–27 calendar (**verified 13 Nov 2026**; structured copy in
`research/normalized/csca/exam-calendar.json`):

| Sitting | Days | First paper starts |
| --- | --- | --- |
| November 2026 | 14–15 Nov (registration closed 15–21 Oct) | **14:00** |
| December 2026 | 19–20 Dec | **08:00** |
| January 2027 | 23–24 Jan | **14:00** |
| March 2027 | 13–14 Mar | **14:00** |
| April 2027 | 24–25 Apr | **14:00** |
| June 2027 | 26–27 Jun | **08:00** |

**Do not hardcode "14:00".** The official notice says start times alternate between an 08:00 block and
a 14:00 block depending on the sitting, and candidates must check the table for their own sitting. The
two blocks are:

- **14:00 block** — 专业中文 14:00–15:30, 数学 17:00–18:00, 物理 14:00–15:00, 化学 16:30–17:30.
- **08:00 block** — 专业中文 08:00–09:30, 数学 11:00–12:00, 物理 08:00–09:00, 化学 10:30–11:30.

Any page that prints a timetable should show the sitting's own times, or say "check your sitting" and
link the official notice. A time-zone converter must convert from the sitting's actual start time, not
from a fixed 14:00.

Results: **within 10 working days** of the sitting (from the November 2026 sitting onward).

## 5. Fees and registration

- Fee: **CNY 450 for one subject, CNY 700 for two or more**, paid by Visa or Mastercard on the portal.
  The official exam-intro page publishes this table (`csca.cn/about/examintro`, rendered copy in
  `research/normalized/csca/rendered-about-examintro.md`), so it can be cited as official — the
  Guidebook agrees. Re-confirm at checkout before publishing a price change.
- Registration happens **only on `csca.cn`** — create an account, complete the information, choose
  sitting / format / subjects, pay; a confirmation email completes it. No third party can register a
  candidate.
- Prepare first: a long-lived email address, a valid passport, a compliant digital photo, and a bank card.
- After submission the registration is **locked**. Corrections need a modification request **before the
  admission ticket is generated**; after that, nothing can change.
- **Withdrawal only — no transfers** between sittings, and only before the admission ticket is generated.
- The admission ticket (准考证) carries the login credentials and must be **printed**. No ticket or no
  ID means marked absent, no refund.

## 6. Delivery modes

Three modes, **identical in content, duration and scoring**:

1. **RHT — remote-proctored home-based test** (居家网考). Own Windows computer; live remote proctoring;
   two devices. Offered where no test centre serves the region.
2. **CBT — computer-based test at a centre** (集中机考). Authorised centre, centre equipment and
   proctoring; bring passport and printed ticket.
3. **Paper-based** (纸笔考试) — the portal publishes a test introduction for this mode; availability is
   set per region/sitting.

Both RHT and CBT run in the same window for a sitting.

## 7. RHT equipment and environment (strictly enforced)

- **Genuine 64-bit Windows 10/11** (or Windows 7 SP1+). **macOS is not supported.** Physical hardware
  only: single physical display, no remote desktop / cloud PC / virtualisation (Hyper-V, Windows
  Sandbox, WSL/WSL2, VBS). Some Surface-class devices are known-incompatible.
- ≥1366×768, ≥4 GB RAM, ≥2 GB free on the client partition (avoid C:), mains power connected.
- Webcam ≥720p at the **top of the screen**; speakers and microphone. **No wireless headphones.** No
  privacy/anti-glare filters, no external monitor.
- **Secondary device**: phone or tablet on a stand at **45° rear-side**, running the browser-based
  proctoring page, covering side face, shoulders, arms, hands and the primary screen; stable power,
  non-essential apps closed, do-not-disturb on, **airplane mode + Wi-Fi** (airplane on first, then Wi-Fi).
- **Network**: ≥20 Mbps symmetric up/down, ≥500 KB/s to the test platform; wired broadband recommended;
  a 4G hotspot as backup. **VPNs, proxies, accelerators and any tool that changes/hides/forwards the
  connection or IP are prohibited** — if the connection only works through one, the environment does not
  meet the requirement.
- **Room**: independent, quiet, well-lit, enclosed; clean desk; nobody else may enter; no bed/sofa.
- **Scratch tool only**: a small whiteboard with an erasable marker, **or** a blank sheet inside a
  transparent file bag written on with an erasable marker. Paper, sticky notes, pens and pencils are
  prohibited. Show it blank before the test; erase it on camera after.

## 8. Test-day sequence

1. **Mandatory pre-test checks**: the equipment/software check **and** a proctored mock test. Skipping
   them can make the real test impossible and **the fee is not refunded**.
2. Login opens **60 minutes before** the paper; complete device check, facial recognition, ID
   verification, 360° room scan, present passport and blank scratch tool.
3. Read and accept the **Integrity Commitment Form**.
4. Countdown → full screen → timer starts. **Entry is not permitted after the official start time.**
5. During: answers save continuously; **answered question numbers turn green in the left-hand palette**;
   review and revise until time expires.
6. End: **automatic submission at zero — early submission is not permitted**; leaving without
   authorisation is a violation. Wait for the submission confirmation, then erase the scratch tool on
   camera.

## 9. Scoring, results, and the percentile question

- Each paper is scored 0–100; there is no national pass mark and no negative marking.
- Results are published **within 10 working days**; the candidate downloads an **electronic score
  report** from the registration system. It is the official document — universities accept it directly;
  there is no separate score-send request.
- Universities can **verify the report and see the candidate's global percentile ranking**. So an
  official percentile exists. Anything we compute is a *model*: label ours "modelled estimate" and never
  present it as the official percentile, and never imply we can see the official one.

## 10. Penalties (official tiers)

| Tier | Consequence |
| --- | --- |
| Minor | Affected paper's result cancelled |
| Serious | Results cancelled + 2-year registration ban |
| Severe | All previous results cancelled + permanent ban |
| Extremely severe | Referred to judicial authorities; can affect study-in-China eligibility and visas |

Candidate-side equipment, power or network failure: **fees are not refunded**. CSCA-side failure: CSCA
may add time, reschedule, arrange a make-up test, or refund.

## 11. Refreshing this data — the api-anything operations

The portal is a Vue SPA over an unauthenticated JSON API under `/sv/open/`. Three operations are learned
once in the api-anything plugin (site `csca`):

```sh
api-anything call csca announcements xxlx=考试公告     # articles by category
api-anything call csca resource zydm=GYKS_KSXZ_JJWK_KSGZ   # one policy/notice document
api-anything call csca config confCode=SY_KSRQ       # sitting calendar (JSON in confContent)
api-anything call csca syllabus_files zydm=GYKS_BKZY # official syllabus PDFs
```

`announcements` categories: 考试公告, 新闻页面, 滚动通知, 院校风采. Useful `zydm` codes:

| Code | Document |
| --- | --- |
| `GYKS_BKZY` | 备考资源 — syllabus PDFs |
| `GYKS_KSXZ_JJWK_KSJJ` / `_KSGZ` / `_KSHJ` / `_SBYWL` / `_KSRLC` / `_FAQ` | RHT intro, rules, environment, devices & network, candidate workflow, FAQ (`_CJWT`) |
| `GYKS_KSXZ_JZJK_*` | The same set for the centre-based CBT |
| `GYKS_KSXZ_ZBKS_KSJJ` | Paper-based test introduction |
| `KSBM_YHXY` / `KSBM_YSTK` | Platform terms of use / privacy guidelines |

Refresh everything in one go:

```sh
python3 research/scripts/harvest_csca.py     # writes research/raw/csca/*.json
python3 research/scripts/normalize.py        # writes research/normalized/csca/*.md
```

Then re-read this file and correct it. If the browser path is needed, `API_ANYTHING_BROWSER` must point
at a Chromium binary (on this machine:
`/home/rakib/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome`).

Official source pages: `csca.cn/home` (calendar), `/about/examintro`, `/about/testprep`,
`/about/examnotice`, `/about/registprocess`, `/about/testcenter`, `/registration/notice`,
`/scores/scoredelivery`, `/scores/scoreinquiry`, `/scores/scoreverify`.

## 12. Claim rules

- State the source and the date on the page: "Official CSCA schedule, verified 13 Nov 2026".
- Do not invent university minimums, pass marks, cohort statistics, acceptance rates or global
  percentiles.
- Do not describe a third-party mock as an official paper. Transcriptions say which sitting they come
  from and how many of its items they contain; reconstructions are labelled as ours.
- Do not promise visa or admission outcomes from a score.
- Fees, dates and rules change between sittings — re-verify before publishing a change, and never
  back-date an edit.

## 13. Known traps (already-burned mistakes)

1. **"Under 14 needs guardian consent"** — wrong; the official FAQ says under **18**. Fixed in
   `faq.ts` / `test-day.ts` on 13 Nov 2026; do not let it back in.
2. **"Day 1 starts 14:00, day 2 starts 14:00"** — wrong for the 08:00 sittings (Dec 2026, Jun 2027 so
   far). The official notice alternates blocks. The codebase now models this with `ExamBlock` +
   `EXAM_BLOCKS` + `timetableFor()`; `EXAM_TIMETABLE` is a deprecated alias for the 14:00 block only.
3. **`OFFICIAL.syllabus = "https://csca.cn/testprep/examsv"`** — a dead path; the live syllabus page is
   `csca.cn/about/testprep`, and it publishes four PDFs, not a page of links. Fixed in `site.ts` on
   13 Nov 2026.
4. **Treating the Guidebook as current.** It says "5 sessions annually", "first exam 21 December 2025",
   and gives 2025–26 dates. It is right about fees, the two-device logic and the discipline rules; it is
   stale on the calendar.
5. **Presenting our modelled percentile as official.** Universities see an official global percentile;
   ours is an estimate and must say so.
6. **Claiming the client blocks full-screen exit or watches the webcam.** Our browser simulation reports
   honestly what a browser can check; see `CSCA-SKILLS.md` §4 for the fidelity map.
7. **`OFFICIAL.support = "cscasupport@cscdf.org"`** in `src/lib/site.ts` — the live portal footer lists
   **support@csca.cn** for 考务支持 (test administration). Verify which mailbox CSCA actually answers
   before changing a public contact address; do not delete the old one without evidence it is dead.
