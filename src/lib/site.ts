export const SITE = {
  name: "CSCA Master",
  domain: "cscamaster.com",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://www.cscamaster.com",
  tagline: "The exam-accurate way to prepare for the CSCA.",
  description:
    "Full-length CSCA mock exams with official timing, topic-level analytics and the university requirement matrix. Prepare for the China Scholastic Competency Assessment the way it is actually sat.",
  email: "hello@cscamaster.com",
  support: "support@cscamaster.com",
  founded: 2026,
} as const;

export const OFFICIAL = {
  site: "https://csca.cn/home",
  syllabus: "https://csca.cn/testprep/examsv",
  campusChina: "https://www.campuschina.org/",
  csc: "https://www.csc.edu.cn/",
  support: "cscasupport@cscdf.org",
} as const;

export const NAV_LINKS = [
  { href: "/app/mocks", label: "Mock exams" },
  { href: "/app/practice", label: "Practice" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/universities", label: "Universities" },
  { href: "/csca", label: "Exam guide" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Prepare",
    links: [
      { href: "/app/mocks", label: "Mock exams" },
      { href: "/app/practice", label: "Topic practice" },
      { href: "/syllabus", label: "Official syllabus" },
      { href: "/app/plan", label: "Study plan" },
    ],
  },
  {
    title: "Apply",
    links: [
      { href: "/universities", label: "University directory" },
      { href: "/exam-dates", label: "Exam dates & fees" },
      { href: "/csca", label: "CSCA exam guide" },
      { href: "/app/universities", label: "My shortlist" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/sample-questions", label: "Free sample questions" },
      { href: "/guides", label: "Guides" },
      { href: "/glossary", label: "Glossary" },
      { href: "/tools/score-calculator", label: "Score calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
      { href: "/csca#faq", label: "FAQ" },
    ],
  },
] as const;

/** 2026–2027 sittings published by CSCA (Beijing time). */
export const EXAM_SITTINGS = [
  {
    id: "2026-11",
    date: "2026-11-14",
    label: "14–15 Nov 2026",
    registration: "15–21 Oct 2026",
    status: "closed" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
  },
  {
    id: "2026-12",
    date: "2026-12-19",
    label: "19–20 Dec 2026",
    registration: "Opens Oct 2026",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
  },
  {
    id: "2027-01",
    date: "2027-01-23",
    label: "23–24 Jan 2027",
    registration: "Opens Oct 2026",
    status: "upcoming" as const,
    region: "Europe, Africa & Americas",
    intake: "September 2027",
  },
  {
    id: "2027-03",
    date: "2027-03-13",
    label: "13–14 Mar 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Europe, Africa & Americas",
    intake: "September 2027",
  },
  {
    id: "2027-04",
    date: "2027-04-24",
    label: "24–25 Apr 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2027",
  },
  {
    id: "2027-06",
    date: "2027-06-26",
    label: "26–27 Jun 2027",
    registration: "TBA",
    status: "upcoming" as const,
    region: "Asia-Pacific friendly",
    intake: "September 2028",
  },
];

/** Exam-day timetable, Beijing time (UTC+8). */
export const EXAM_TIMETABLE = [
  { subject: "Professional Chinese (Humanities & STEM)", time: "13:00 – 14:30", minutes: 90 },
  { subject: "Mathematics", time: "15:30 – 16:30", minutes: 60 },
  { subject: "Physics", time: "17:30 – 18:30", minutes: 60 },
  { subject: "Chemistry", time: "19:30 – 20:30", minutes: 60 },
];

export const FAQS = [
  {
    q: "Who has to take the CSCA?",
    a: "From the 2026/2027 academic year, international applicants to undergraduate programmes at universities participating in the Chinese Government Scholarship must sit the CSCA and submit the score report. From 2028, all undergraduate applicants to Chinese universities will need it, with minimum admission standards set by institutions. The exam is open to any student planning to study in China, even without a scholarship.",
  },
  {
    q: "Which subjects do I need?",
    a: "Mathematics is mandatory for every applicant. Physics and Chemistry are required by programme: science, engineering, agriculture and medicine applicants usually need at least one. Professional Chinese is required for Chinese-taught programmes — Humanities or STEM stream depending on your major — and is waived for fully English-taught degrees. Always confirm the exact combination with your target university.",
  },
  {
    q: "How long is the exam and how is it scored?",
    a: "Professional Chinese is 80 multiple-choice questions in 90 minutes. Mathematics, Physics and Chemistry are 48 questions in 60 minutes each. Every subject is scored 0–100. Universities also see your global percentile, so relative performance matters as much as the raw number.",
  },
  {
    q: "Can I take the exam in English?",
    a: "Mathematics, Physics and Chemistry are offered in Chinese and English. Professional Chinese is Chinese-only. Choose the language allowed by your target university — your score report records the language you sat.",
  },
  {
    q: "How much does it cost and when are the sittings?",
    a: "CNY 450 for one subject and CNY 700 for two or more. From 2026 there are five sittings a year: January, March, April, June and December. December, April and June sessions are easier for Asia-Pacific candidates; January and March suit Europe, Africa and the Americas.",
  },
  {
    q: "When do results come out?",
    a: "Home-based online and computer-based tests are scored within 7 working days; paper-based tests take up to 14 working days. Scores are published on your CSCA account.",
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
  { value: "48 / 60", label: "Questions / minutes" },
  { value: "306+", label: "Universities accepting CSCA" },
  { value: "5×", label: "Sittings every year" },
];
