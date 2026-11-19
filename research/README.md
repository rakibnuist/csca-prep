# research/ — the evidence behind the CSCA facts

Everything in this directory was collected to answer one question: **what is actually true about the
CSCA, and what is the rest of the market doing?** The skills in `.agents/skills/` summarise it; this
directory holds the evidence they cite.

Collected **13 November 2026** through the **api-anything** plugin (`api-anything` CLI 0.4.0), which
learns a site's own requests and replays them as named operations instead of scraping rendered HTML
twice.

## What is authoritative

1. `csca.cn` — the official portal, and the only source for dates, rules, fees and documents.
2. CSC-published syllabi (PDFs mirrored in `raw/csca/syllabus/`).
3. Everything else — the Guidebook, competitor pages, our own copy — is secondary and must be dated.

When a secondary source and the portal disagree, the portal wins and the secondary source is marked
stale here.

## Layout

```
raw/                                  exact captures, unedited
  csca/*.json                         25 API answers (announcements, policies, calendar, file list)
  csca/syllabus/                      the four official syllabus PDFs + extracted text
  csca/timetable-*.png                the official 2026–27 timetable image (the table is a picture)
  csca/syllabus-files.json            file metadata and download hashes
  guidebook/                          China Admissions "Guide to the CSCA Exam" (Nov 2025), PDF + text
  sites/<site>/pages/*.json           67 competitor pages: title, meta, headings, text, links, JSON-LD
  sites/<site>/index.json             per-site page inventory

normalized/                           readable, citable versions of the above
  csca/*.md                           23 official documents as markdown with source + fetch date
  csca/exam-calendar.json             the 2026–27 sitting calendar, structured, with per-paper times
  guidebook/CSCA-Guidebook.md         cleaned guide text, with a staleness warning
  sites/<site>.md                     each competitor's captured pages, concatenated for reading

scripts/
  harvest_csca.py                     calls the four learned `csca` operations, writes raw/csca/
  harvest_sites.py                    api-anything browser capture for the six competitor sites
  normalize.py                        raw -> normalized (.md + index)
```

## The learned operations

`api-anything sites` shows site `csca` with four operations. They are plain, unauthenticated reads of
the portal's own JSON API:

| Operation | Call | Returns |
| --- | --- | --- |
| `announcements(xxlx)` | `api-anything call csca announcements xxlx=考试公告` | article list by category (考试公告, 新闻页面, 滚动通知, 院校风采) |
| `resource(zydm)` | `api-anything call csca resource zydm=GYKS_KSXZ_JJWK_KSGZ` | one policy/notice document, zh + en HTML |
| `config(confCode)` | `api-anything call csca config confCode=SY_KSRQ` | sitting calendar JSON |
| `syllabus_files(zydm)` | `api-anything call csca syllabus_files zydm=GYKS_BKZY` | official syllabus PDF list |

The browser is only needed to *learn* a page's requests; the calls above run without it. For the
competitor sites the browser is the reader (csca.app answers curl with a Vercel checkpoint).

`API_ANYTHING_BROWSER` must point at a Chromium binary for capture work:

```sh
export API_ANYTHING_BROWSER=/home/rakib/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome
```

## Refresh

```sh
python3 research/scripts/harvest_csca.py     # ~1 min, 25 calls, writes raw/csca/
python3 research/scripts/harvest_sites.py    # ~25 min, 67 pages; --only <site> for one
python3 research/scripts/normalize.py        # rebuild normalized/
```

Then re-read `.agents/skills/csca-official/SKILL.md` and correct anything the new capture contradicts.
Re-date every page whose fact changed.

## Compliance and ethics

- Every call is a **read of public content**. No account, no login, no personal data is stored, and
  nothing was requested from a page behind authentication.
- The harvest was **one-off and low-rate**: 25 requests to the portal, one page load per competitor
  page. `csca.cn/robots.txt` allows all paths. Its Terms of Use do prohibit automated copying, so do not
  turn this into a scheduled scraper — refresh when a fact matters, not on a cron.
- Competitor pages are stored for **analysis**: no page is republished, and the notes in the skills
  quote short phrases only.
- The Guidebook is third-party copyrighted material (China Admissions, all rights reserved). It is kept
  locally as a reference; do not republish it or lift long passages into product copy.
- Official syllabus PDFs carry a CSC banner restricting redistribution. They are here to support our
  own summaries — not to be re-hosted.

## Known gaps

- `csca.app` exposes almost nothing without signing in; the capture is its public landing surface only.
- csca.cn's `/about/examintro` and `/about/registprocess` render their copy from the SPA bundle rather
  than an API, so they were captured as rendered browser text into `raw/csca/rendered/` and normalized
  to `normalized/csca/rendered-*.md`. `/about/testcenter` redirects to `/login` — the test-centre finder
  is behind an account, so there is nothing public to capture there.
