export const SITE = {
  name: "CSCA Master",
  domain: "cscamaster.com",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://www.cscamaster.com",
  tagline: "The exam-accurate way to prepare for the CSCA.",
  description:
    "Free CSCA exam preparation with full-length mock tests, official-format question papers, thousands of syllabus-mapped practice questions, scholarship guidance and a university requirements guide. Prepare for the China Scholastic Competency Assessment (CSCA) the way it is actually sat.",
  email: "hello@cscamaster.com",
  support: "support@cscamaster.com",
  founded: 2026,
} as const;

export const OFFICIAL = {
  site: "https://csca.cn/home",
  syllabus: "https://csca.cn/about/testprep",
  campusChina: "https://www.campuschina.org/",
  csc: "https://www.csc.edu.cn/",
  support: "cscasupport@cscdf.org",
} as const;

export const NAV_LINKS = [
  { href: "/mocks", label: "Mock tests" },
  { href: "/question-papers", label: "Official papers" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/universities", label: "Universities" },
  { href: "/csca", label: "Exam guide" },
  { href: "/test-day", label: "Test day" },
  { href: "/free-exam", label: "Free mock" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Practice",
    links: [
      { href: "/mocks", label: "Mock tests" },
      { href: "/question-papers", label: "Official past papers" },
      { href: "/practice", label: "Free subject practice" },
      { href: "/check", label: "12-question check" },
      { href: "/free-exam", label: "Free 10-question mock" },
      { href: "/tools/score-calculator", label: "Score calculator" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/syllabus", label: "Syllabus" },
      { href: "/formulas", label: "Formula sheet" },
      { href: "/requirements", label: "Requirements" },
      { href: "/csca-vs-hsk-ielts-sat", label: "CSCA vs HSK, IELTS, SAT" },
      { href: "/guides", label: "Guides" },
      { href: "/glossary", label: "Glossary" },
      { href: "/tips", label: "Exam strategy" },
      { href: "/test-day", label: "Test-day rules" },
    ],
  },
  {
    title: "Apply",
    links: [
      { href: "/universities", label: "Universities" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/exam-dates", label: "Exam dates & fees" },
      { href: "/csca/passing-score", label: "Passing score" },
      { href: "/csca/countries", label: "By country" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/partners", label: "Partners" },
      { href: "/csca/updates", label: "Changelog" },
      { href: "/zh", label: "中文指南" },
      { href: "/csca", label: "Exam guide" },
    ],
  },
] as const;

/** The two exam-day blocks the official notice alternates between (Beijing time). */
export type ExamBlock = "08:00" | "14:00";

/**
 * 2026–2027 sittings published by CSCA (Beijing time).
 *
 * `block` is the sitting's published start block: the portal's own timetable
 * alternates an 08:00 block and a 14:00 block between sittings, so a page that
 * prints one fixed set of times is wrong for half the calendar. Source:
 * csca.cn 考试公告 "2026年11月–2027年6月CSCA考试安排" (image timetable) and
 * research/normalized/csca/exam-calendar.json.
 */
export const EXAM_SITTINGS = [
  {
    id: "2026-11",
    date: "2026-11-14",
    label: "14–15 Nov 2026",
    registration: "15–21 Oct 2026",
    status: "closed" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
    block: "14:00" as ExamBlock,
  },
  {
    id: "2026-12",
    date: "2026-12-19",
    label: "19–20 Dec 2026",
    registration: "Not yet announced",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
    block: "08:00" as ExamBlock,
  },
  {
    id: "2027-01",
    date: "2027-01-23",
    label: "23–24 Jan 2027",
    registration: "Not yet announced",
    status: "upcoming" as const,
    region: "Europe, Africa & Americas",
    intake: "September 2027",
    block: "14:00" as ExamBlock,
  },
  {
    id: "2027-03",
    date: "2027-03-13",
    label: "13–14 Mar 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Europe, Africa & Americas",
    intake: "September 2027",
    block: "14:00" as ExamBlock,
  },
  {
    id: "2027-04",
    date: "2027-04-24",
    label: "24–25 Apr 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
    block: "14:00" as ExamBlock,
  },
  {
    id: "2027-06",
    date: "2027-06-26",
    label: "26–27 Jun 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2028",
    block: "08:00" as ExamBlock,
  },
];

export type ExamTimetableRow = {
  day: "Day 1" | "Day 2";
  subject: string;
  /** "HH:MM", Beijing time — use this for timezone conversion. */
  start: string;
  /** "HH:MM", Beijing time. */
  end: string;
  /** Display form, "08:00 – 09:30". */
  time: string;
  minutes: number;
};

/**
 * Exam-day timetable, Beijing time (UTC+8), exactly as published on
 * csca.cn/about/examintro: two days per sitting, Professional Chinese and
 * Mathematics on day one, Physics and Chemistry on day two. The paper order is
 * fixed; only the start block moves between sittings.
 */
export const EXAM_BLOCKS: Record<ExamBlock, ExamTimetableRow[]> = {
  "14:00": [
    { day: "Day 1", subject: "Professional Chinese (文科 / 理科中文)", start: "14:00", end: "15:30", time: "14:00 – 15:30", minutes: 90 },
    { day: "Day 1", subject: "Mathematics", start: "17:00", end: "18:00", time: "17:00 – 18:00", minutes: 60 },
    { day: "Day 2", subject: "Physics", start: "14:00", end: "15:00", time: "14:00 – 15:00", minutes: 60 },
    { day: "Day 2", subject: "Chemistry", start: "16:30", end: "17:30", time: "16:30 – 17:30", minutes: 60 },
  ],
  "08:00": [
    { day: "Day 1", subject: "Professional Chinese (文科 / 理科中文)", start: "08:00", end: "09:30", time: "08:00 – 09:30", minutes: 90 },
    { day: "Day 1", subject: "Mathematics", start: "11:00", end: "12:00", time: "11:00 – 12:00", minutes: 60 },
    { day: "Day 2", subject: "Physics", start: "08:00", end: "09:00", time: "08:00 – 09:00", minutes: 60 },
    { day: "Day 2", subject: "Chemistry", start: "10:30", end: "11:30", time: "10:30 – 11:30", minutes: 60 },
  ],
};

/** The timetable a given sitting actually runs. */
export function timetableFor(sitting: { block: ExamBlock }): ExamTimetableRow[] {
  return EXAM_BLOCKS[sitting.block];
}

/** Sitting labels that use a block, for captions ("Dec 2026, Jun 2027"). */
export function sittingsForBlock(block: ExamBlock): string[] {
  return EXAM_SITTINGS.filter((s) => s.block === block).map((s) => s.label);
}

/** The next sitting whose registration has not closed — the one to quote on general pages. */
export function nextSitting() {
  return EXAM_SITTINGS.find((s) => s.status === "upcoming") ?? EXAM_SITTINGS[EXAM_SITTINGS.length - 1];
}

/**
 * @deprecated The 14:00 block only. Use `timetableFor(sitting)` — printing this
 * for every sitting is wrong for the 08:00 sittings.
 */
export const EXAM_TIMETABLE = EXAM_BLOCKS["14:00"];


/** Delivery formats published by CSCA. */
export const TEST_FORMATS = [
  {
    id: "RHT",
    name: "Remote-proctored home-based test (RHT)",
    zh: "居家网考",
    body: "Sit from home on your own Windows computer with live dual-device proctoring. Offered where no test centre serves your region.",
  },
  {
    id: "CBT",
    name: "Computer-based test at a centre (CBT)",
    zh: "集中机考",
    body: "Travel to an authorised CSCA test centre and sit on equipment the centre provides. Rolled out progressively in key source countries.",
  },
  {
    id: "PAPER",
    name: "Paper-based test (PBT)",
    zh: "纸笔考试",
    body: "Designated in selected regions and sittings; availability is shown per sitting inside csca.cn, with identical papers and 0–100 scoring.",
  },
] as const;

export const FAQS = [
  {
    q: "Who has to take the CSCA?",
    a: "It is the standardised undergraduate entrance test for international students applying to Chinese universities, organised by the China Scholarship Council. Applicants to Chinese Government Scholarship universities need it, and Chinese-taught programmes additionally require one of the two Professional Chinese papers. Anyone else applying for an undergraduate place can sit it too, and an increasing number of institutions use it as an admission reference. It is not the sole criterion and does not guarantee admission.",
  },
  {
    q: "Which subjects do I need?",
    a: "Mathematics is mandatory for every applicant. CSCA lists Professional Chinese — Humanities or STEM depending on your major — as compulsory for Chinese Government Scholarship applicants and for Chinese-taught programmes; some English-taught programmes are waived by the receiving university, so confirm in writing. Physics and Chemistry are electives in the official fee-and-subject structure, but programme requirements are set by each university: science, engineering, agriculture and medicine applicants usually need at least one.",
  },
  {
    q: "How long is the exam and how is it scored?",
    a: "Professional Chinese — Humanities or STEM — is 80 single-answer questions in 90 minutes. Mathematics, Physics and Chemistry are 48 questions in 60 minutes each. Every subject is scored 0–100, there is no negative marking, and each university sets its own minimum.",
  },
  {
    q: "Can I take the exam in English?",
    a: "Mathematics, Physics and Chemistry are offered in Chinese and English. Professional Chinese is Chinese-only. Choose the language allowed by your target university — your score report records the language you sat.",
  },
  {
    q: "How much does it cost and when are the sittings?",
    a: "CNY 450 for one subject and CNY 700 for two or more. CSCA runs six sittings a year — January, March, April, June, November and December — and each sitting runs over two days, in Beijing time: Professional Chinese then Mathematics on day one, Physics then Chemistry on day two. The start time alternates by sitting between an 08:00 block (Professional Chinese 08:00–09:30, Mathematics 11:00–12:00, Physics 08:00–09:00, Chemistry 10:30–11:30) and a 14:00 block (14:00–15:30, 17:00–18:00, 14:00–15:00, 16:30–17:30) — check the timetable for your sitting and the time on your Admission Ticket.",
  },
  {
    q: "When do results come out, and how long are they valid?",
    a: "Scores are released within 10 working days of the test date and published on your CSCA account, where you can download the electronic report. A score report is valid for two years from issue, and there is no limit on the number of attempts — you can sit again and submit your best valid score, subject to each university's policy.",
  },
  {
    q: "Is CSCA Master affiliated with the CSCA organisers?",
    a: "No. CSCA Master is an independent preparation platform built on the publicly published official syllabus, format and fee structure. Registration, payment and score reports only happen on csca.cn. We link you there directly and never ask for your CSCA credentials.",
  },
  {
    q: "How accurate are the mock exams?",
    a: "Our papers mirror the official structure — 48 questions in 60 minutes for Mathematics, Physics and Chemistry, with single-answer options and a 0–100 scale. The questions are our own, written against the official topic list, so they prepare you for the exam without copying protected paper content.",
  },
];

export const TRUST_POINTS = [
  { value: "5", label: "Subjects, official formats" },
  { value: "48–80", label: "Questions per paper" },
  { value: "300+", label: "Universities accepting CSCA" },
  { value: "6×", label: "Sittings every year" },
];
