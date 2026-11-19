/**
 * When the content was actually reviewed.
 *
 * Sitemap `lastModified` is a promise about the content, not about the server
 * clock — stamping every URL with `new Date()` on each request teaches search
 * engines to ignore the field. Bump CONTENT_UPDATED when you change copy, and
 * add an entry to UPDATES so the changelog and the sitemap agree.
 */
export const CONTENT_UPDATED = "2026-11-16";

export const UPDATES: { date: string; title: string; body: string; href?: string }[] = [
  {
    date: "2026-11-16",
    title: "08:00 and 14:00 sitting blocks synced across country guides, FAQs and /llms.txt",
    body: "All country timetable pages, exam-dates FAQs and machine-readable LLM indexes now list both the 14:00 and 08:00 Beijing start blocks per sitting, matching the alternating CSC calendar.",
    href: "/exam-dates",
  },
  {
    date: "2026-11-12",
    title: "Chinese papers corrected to the official 80 questions in 90 minutes",
    body: "Both Professional Chinese papers now match csca.cn exactly: 80 single-answer questions, 90 minutes, all six official item types. The exam guide and the paper cards were rebuilt around it.",
    href: "/csca",
  },
  {
    date: "2026-11-12",
    title: "Test-client simulation published",
    body: "System check, Integrity Commitment, full-screen start, left palette with green answered numbers, no early submission and proctor focus warnings — reproduced from CSCA's Device & Environment document.",
    href: "/test-day",
  },
  {
    date: "2026-11-12",
    title: "Timetable, results and score facts re-verified",
    body: "Two-day Beijing timetable, results within 10 working days, two-year validity, unlimited attempts and the CNY 450/700 fee structure, all traced to the official pages.",
    href: "/exam-dates",
  },
  {
    date: "2026-11-12",
    title: "University requirements page added",
    body: "22 institutions mapped to their own domains, with a copy-paste email that gets the subject list in writing. No invented cut-offs.",
    href: "/csca/universities",
  },
  {
    date: "2026-11-12",
    title: "Chinese-language guides published",
    body: "中文指南, 考试介绍 and 模拟题 pages with reciprocal hreflang, aimed at the queries the English market leaves open.",
    href: "/zh",
  },
];
