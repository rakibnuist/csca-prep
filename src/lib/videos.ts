/**
 * The video series.
 *
 * Nothing here claims a video exists. `youtubeId` stays null until a video is
 * published; the page renders the plan and the chapter list, and only emits
 * VideoObject schema once an ID is present — so a search engine can never index
 * a video that a candidate cannot watch.
 *
 * To publish: upload the episode, paste the 11-character id, deploy.
 */

export type Episode = {
  slug: string;
  title: string;
  hook: string;
  lengthTarget: string;
  chapters: { at: string; label: string }[];
  /** Three or four things the viewer should leave with. */
  takeaways: string[];
  youtubeId: string | null;
  /** What the viewer can do on the site when the episode ends. */
  cta: { href: string; label: string };
};

export const EPISODES: Episode[] = [
  {
    slug: "what-is-csca",
    title: "What the CSCA actually is — in four minutes",
    hook: "Five papers, 300+ universities, and a rulebook most applicants meet for the first time in the exam client.",
    lengthTarget: "4 min",
    chapters: [
      { at: "0:00", label: "Who runs it and who needs it" },
      { at: "0:45", label: "The five papers and their lengths" },
      { at: "2:00", label: "0–100 scoring, no pass mark" },
      { at: "3:00", label: "Where to register (and where not to)" },
    ],
    takeaways: [
      "The CSCA is run by the China Scholarship Council with university experts — not by the universities that admit you.",
      "Mathematics is compulsory; Physics or Chemistry is required for science-related majors; Professional Chinese is compulsory for CGS applicants and Chinese-taught programmes.",
      "Every paper is scored 0–100 with no pass mark — each university sets its own minimum.",
      "Register only on csca.cn; once the Admission Ticket is generated your details can no longer change.",
    ],
    youtubeId: null,
    cta: { href: "/csca", label: "Read the full guide" },
  },
  {
    slug: "48-in-60",
    title: "48 questions in 60 minutes: the only strategy that matters",
    hook: "75 seconds a question, no negative marking, and a palette that tells you exactly how much you are behind.",
    lengthTarget: "6 min",
    chapters: [
      { at: "0:00", label: "The arithmetic of 75 seconds" },
      { at: "1:20", label: "Two passes: harvest, then hunt" },
      { at: "3:00", label: "When to guess (always)" },
      { at: "4:30", label: "Using flags and the palette" },
    ],
    takeaways: [
      "75 seconds per question, and there is no negative marking — never leave a blank.",
      "Run two passes: harvest the easy marks first, then hunt the ones that need thought.",
      "The question palette shows how far behind you are at a glance; learn to read it.",
      "Flag and return rather than sinking three minutes into a single item.",
    ],
    youtubeId: null,
    cta: { href: "/app/mocks", label: "Sit a timed paper" },
  },
  {
    slug: "professional-chinese",
    title: "Professional Chinese: the paper nobody prepares for",
    hook: "80 questions, 90 minutes, six item types — and why reading speed beats vocabulary lists.",
    lengthTarget: "6 min",
    chapters: [
      { at: "0:00", label: "Humanities vs STEM stream" },
      { at: "1:10", label: "The six item types, shown" },
      { at: "3:00", label: "67.5 seconds a question" },
      { at: "4:40", label: "How to build reading speed" },
    ],
    takeaways: [
      "80 questions in 90 minutes — 67.5 seconds each, so reading speed is the skill that matters.",
      "The Humanities and STEM streams test different text types; pick the one your programme lists.",
      "A handful of item types repeat — recognising them early saves time.",
      "Build speed with timed reading against the clock, not vocabulary lists alone.",
    ],
    youtubeId: null,
    cta: { href: "/zh/moniti", label: "中文模拟题与样题" },
  },
  {
    slug: "test-day-setup",
    title: "Test-day setup that does not cost you a sitting",
    hook: "Windows-only client, two cameras, 20 Mbps — the checklist that runs in 15 minutes.",
    lengthTarget: "5 min",
    chapters: [
      { at: "0:00", label: "The equipment list, item by item" },
      { at: "1:40", label: "Room and desk setup" },
      { at: "3:00", label: "The scratch-tool rule" },
      { at: "4:00", label: "Check-in timeline" },
    ],
    takeaways: [
      "The home client runs on Windows only — test the exact machine before test day.",
      "Two cameras are required: your webcam plus a phone positioned behind you at roughly 45°.",
      "A stable connection of about 20 Mbps; wired is safer than Wi-Fi.",
      "The scratch tool has strict rules and check-in has a deadline — read both before you start.",
    ],
    youtubeId: null,
    cta: { href: "/test-day", label: "Open the rules page" },
  },
  {
    slug: "reading-your-score",
    title: "Reading your score report like an admissions officer",
    hook: "No pass mark, two-year validity, and five separately reported subjects — what the number actually says.",
    lengthTarget: "5 min",
    chapters: [
      { at: "0:00", label: "How 0–100 is calculated" },
      { at: "1:20", label: "Percentiles: modelled vs official" },
      { at: "2:40", label: "What universities do with it" },
      { at: "4:00", label: "Retakes: when a second sitting helps" },
    ],
    takeaways: [
      "Scores are reported per subject, 0–100 each — there is no combined pass mark.",
      "Universities set their own minimums and may weight subjects differently.",
      "Results are valid for two years from the sitting.",
      "A retake is a new registration at the full fee; only resit when the gap is fixable.",
    ],
    youtubeId: null,
    cta: { href: "/csca/passing-score", label: "Read the scoring guide" },
  },
];

export const PUBLISHED_EPISODES = EPISODES.filter((episode) => episode.youtubeId);
