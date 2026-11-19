# CSCA video series — production scripts

Five episodes, all chaptered to match the pages they end on. Nothing is published until the video
exists: `src/lib/videos.ts` holds a `youtubeId` per episode, the page renders "In production" while
that is null, and `VideoObject` schema is emitted only for episodes that have an id.

**Production rules**

1. Screen recording first, talking head second. Candidates want to see the palette, the clock and the
   clock's behaviour.
2. Every claim on screen must match a page on the site; when a rule changes, the page is dated in
   `/csca/updates` and the video is re-cut or re-shot.
3. No thumbnails with fake scores, no "guaranteed 90+", no borrowed exam screenshots — the client
   shown is our simulation and is labelled as such on screen.

**Delivery spec** — 1080p, 16:9, voice-over + captions (EN, plus ZH subtitles for episodes 3 and 4),
chapter markers matching `src/lib/videos.ts`, end card linking the page.

---

## 1. What the CSCA actually is — 4 min

*Ends on: `/csca`*

| Time | Beat | On screen |
| --- | --- | --- |
| 0:00 | Hook: "Five papers, 300+ universities, and a rulebook most applicants meet for the first time on test day." | Title card |
| 0:15 | Who runs it: CSC with university experts; who needs it: CGS applicants + Chinese-taught programmes | Text: 国家留学基金委 (CSC) |
| 0:45 | The five papers table: 48/60 ×3, 80/90 ×2, 0–100 each | Real table, our site |
| 2:00 | No national pass mark; each university sets its own minimum | Site: `/csca/passing-score` |
| 2:45 | Screening clip: the test client start sequence (system check → pledge → full screen) | Our simulation, labelled "simulation" |
| 3:20 | Where to register: csca.cn only; never through a prep site | csca.cn on screen |
| 3:45 | CTA | End card: `/csca` |

## 2. 48 questions in 60 minutes — 6 min

*Ends on: `/app/mocks`*

| Time | Beat | On screen |
| --- | --- | --- |
| 0:00 | The arithmetic: 60 min ÷ 48 = 75 s, including reading | Live timer |
| 1:20 | Two-pass method: harvest the ones you know, then hunt the rest | Palette, flagging 4 questions |
| 2:20 | No negative marking: a blank is strictly worse than a guess | Option grid |
| 3:00 | Using the palette: green = answered, amber = flagged | Recording of the left palette |
| 4:30 | What an auto-submit at 00:00 looks like | Countdown → submission screen |
| 5:20 | Rehearse it: sit one full paper today | CTA `/app/mocks` |

## 3. Professional Chinese — 6 min

*Ends on: `/zh/moniti`*

| Time | Beat | On screen |
| --- | --- | --- |
| 0:00 | 80 questions, 90 minutes, 67.5 seconds each | Bilingual title |
| 1:10 | Humanities vs STEM stream: who sits which | 文科中文 / 理科中文 |
| 1:50 | The six item types, one example each (识解汉字 → 阅读理解) | Worked items from `/zh/moniti` |
| 3:40 | Why reading speed beats vocabulary lists | Timer over a reading passage |
| 4:40 | Two drills that build speed (timed reading, error re-read) | Drill screen |
| 5:30 | CTA | End card: `/zh/moniti` |

## 4. Test-day setup — 5 min

*Ends on: `/test-day`*

| Time | Beat | On screen |
| --- | --- | --- |
| 0:00 | The four things that cost a sitting: OS, network, camera, scratch tool | Checklist |
| 1:40 | Equipment list: Windows 10/11, 1366×768, 720p, mic, second device at 45° | Spec table |
| 2:40 | Room: enclosed, desk, no paper — whiteboard or transparent bag only | Photos of a compliant desk |
| 3:40 | Check-in timeline: 30–60 min login, 5 min before cut-off | Timeline graphic |
| 4:30 | CTA | End card: `/test-day` |

## 5. Reading your score report — 5 min

*Ends on: `/csca/passing-score`*

| Time | Beat | On screen |
| --- | --- | --- |
| 0:00 | "There is no pass mark" — and why that makes the number harder, not easier | Title |
| 1:20 | The arithmetic: correct ÷ total × 100; 2.08 vs 1.25 points per question | Table from `/csca/passing-score` |
| 2:40 | Percentiles: ours are modelled, label them as models | Dashboard, label visible |
| 3:30 | What universities do: five subjects reported separately, programme minimums | Requirements page |
| 4:20 | When a retake helps, and when it does not | Two-case graphic |
| 4:45 | CTA | End card: `/csca/passing-score` |

---

## Publishing checklist

- [ ] Upload as unlisted, add chapters from `src/lib/videos.ts`, captions EN (+ZH for 3 and 4).
- [ ] Paste the 11-character id into `EPISODES[n].youtubeId`.
- [ ] Deploy — `VideoObject` + embeds appear automatically, `/video` flips from "In production".
- [ ] Add the episode to `/csca/updates` so the changelog and the sitemap date stay truthful.
- [ ] Run `npm run seo:indexnow` so Bing/Copilot see the new page state.
