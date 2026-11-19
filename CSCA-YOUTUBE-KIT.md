# CSCA video series — YouTube upload kit

Nothing here is a substitute for filming. It is the last mile: once an episode exists, the title,
description, chapters, tags and end screen are already written, so publishing is paste-and-go.

Episode outlines and shot lists live in `CSCA-VIDEO-SERIES.md`.
IDs get pasted into `src/lib/videos.ts` — the page then flips from "In production" to an embed and
emits `VideoObject` schema automatically.

---

## Universal settings

| Field | Value |
| --- | --- |
| Visibility at upload | Unlisted → review → Public |
| Category | Education |
| Language | English (episode 3 also gets a Chinese title + subtitles) |
| Captions | EN manual (auto-captions mangle "CSCA", "csca.cn", "0–100") |
| Playlist | "CSCA explained" |
| End screen | Subscribe + the episode's page link |
| Cards | At each chapter mark |
| Thumbnail | 1280×720, warm paper `#faf8f3`, one line of text, the crimson `#d31d3c` accent |

**Thumbnail formula:** left 60% a real screen from the episode (palette, timer, checklist), right 40%
cream panel with 3–5 words in the display face. No faces, no arrows, no red circles.

---

## Episode 1 — What the CSCA actually is

**Title:** `What the CSCA actually is — in 4 minutes (2027 intake)`

**Description**

```
The CSCA in four minutes: who runs it, who has to sit it, the five papers and how long each one
lasts, and why "0–100" matters more than people expect.

Everything here is sourced to csca.cn and dated. We are independent — not affiliated with the China
Scholarship Council.

Chapters
0:00 Who runs it and who needs it
0:45 The five papers and their lengths
2:00 0–100 scoring, no pass mark
3:00 Where to register (and where not to)

Read the full guide: https://www.cscamaster.com/csca
Free 10-question sample: https://www.cscamaster.com/free-exam
Full paper library: https://www.cscamaster.com/app/mocks

Corrections: hello@cscamaster.com — every fix is logged at /csca/updates
```

**Tags:** `CSCA, CSCA exam, China Scholarship Council, study in China, CSCA 2027, CSCA test, CSCA mock test, CSCA preparation`

---

## Episode 2 — 48 questions in 60 minutes

**Title:** `48 questions in 60 minutes: the only CSCA strategy that matters`

**Description**

```
75 seconds a question, no negative marking, and a palette that tells you exactly how far behind you
are. This is the pacing method we teach, shown on a real paper.

Chapters
0:00 The arithmetic of 75 seconds
1:20 Two passes: harvest, then hunt
2:30 No negative marking — never leave a blank
3:00 Using the palette: answered, flagged, current
4:30 What an auto-submit at 00:00 looks like
5:20 Rehearse it today

Sit a timed paper: https://www.cscamaster.com/app/mocks
Exam guide: https://www.cscamaster.com/csca
Scoring, and why there is no pass mark: https://www.cscamaster.com/csca/passing-score
```

**Tags:** `CSCA strategy, CSCA timing, CSCA mathematics, mock test strategy, exam pacing, CSCA 2027`

---

## Episode 3 — Professional Chinese

**Title:** `Professional Chinese: the CSCA paper nobody prepares for`

**Description**

```
80 questions, 90 minutes, six item types — and why reading speed beats vocabulary lists. Both
streams covered: 文科中文 (humanities) and 理科中文 (STEM).

Chapters
0:00 Humanities vs STEM stream
1:10 The six item types, shown
3:00 67.5 seconds a question
4:40 How to build reading speed

中文样题与解析: https://www.cscamaster.com/zh/moniti
中文指南: https://www.cscamaster.com/zh
Exam guide (EN): https://www.cscamaster.com/csca
```

**Tags:** `CSCA Chinese, 专业中文, 文科中文, 理科中文, CSCA 中文, 来华留学, CSCA mock test Chinese`

---

## Episode 4 — Test-day setup

**Title:** `CSCA test-day setup that does not cost you a sitting`

**Description**

```
Windows-only client, two cameras, 20 Mbps symmetric — the checklist that runs in 15 minutes. Four
things cost candidates a sitting; this is how to eliminate all four the night before.

Chapters
0:00 The four things that cost a sitting
1:40 Equipment list: Windows 10/11, 1366×768, 720p, mic, second device at 45°
2:40 Room and desk: whiteboard or transparent bag only
3:40 Check-in timeline: 30–60 minutes early, 5-minute cut-off
4:30 Run the checklist

Full rules: https://www.cscamaster.com/test-day
Simulate the client: https://www.cscamaster.com/app/mocks
Test centres vs home: https://www.cscamaster.com/csca/test-centres
```

**Tags:** `CSCA test day, CSCA proctoring, CSCA home test, exam setup checklist, CSCA rules, China Scholarship Council`

---

## Episode 5 — Reading your score report

**Title:** `How to read a CSCA score report (and what universities do with it)`

**Description**

```
There is no pass mark. That makes the number harder, not easier: five subjects reported separately,
a two-year validity, and a minimum set by each university rather than by CSCA.

Chapters
0:00 "There is no pass mark" — and why that matters
1:20 The arithmetic: correct ÷ total × 100
2:40 Percentiles: ours are modelled, and labelled as models
3:30 What universities do with it
4:00 When a retake actually helps

Scoring guide: https://www.cscamaster.com/csca/passing-score
University requirements: https://www.cscamaster.com/csca/universities
Requirements by programme: https://www.cscamaster.com/csca/programmes
```

**Tags:** `CSCA score, CSCA results, CSCA percentile, CSCA retake, China university admission, CSCA 2027`

---

## Publishing checklist

- [ ] Upload unlisted, add the chapters above verbatim (YouTube needs `0:00` as the first mark).
- [ ] Upload EN captions; ZH subtitles for episodes 3 and 4.
- [ ] Paste the 11-character id into `EPISODES[n].youtubeId` in `src/lib/videos.ts`.
- [ ] Deploy — `/video` flips to the embed, `VideoObject` schema goes live.
- [ ] Add a line to `UPDATES` in `src/lib/content-dates.ts` so the changelog and sitemap date agree.
- [ ] `npm run seo:indexnow`.
