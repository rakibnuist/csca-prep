/**
 * Shared CSCA domain rules.
 *
 * Figures below come from the official CSCA documentation published by the
 * China Scholarship Council (csca.cn) and its embassy notices: every subject is
 * single-answer multiple choice and scored out of 100. Keep this file free of
 * server-only imports so client components can use it.
 */

export type SubjectCode = "MATH" | "PHYS" | "CHEM" | "CH_HUM" | "CH_SCI";

export type SubjectSpec = {
  code: SubjectCode;
  nameEn: string;
  nameZh: string;
  shortEn: string;
  kind: "FUNDAMENTAL" | "CHINESE";
  durationMin: number;
  questionCount: number;
  totalMarks: number;
  language: "en+zh" | "zh";
  blurbEn: string;
  blurbZh: string;
  accent: "vermillion" | "jade" | "gold" | "ink";
};

export const SUBJECTS: SubjectSpec[] = [
  {
    code: "MATH",
    nameEn: "Mathematics",
    nameZh: "数学",
    shortEn: "Math",
    kind: "FUNDAMENTAL",
    durationMin: 60,
    questionCount: 48,
    totalMarks: 100,
    language: "en+zh",
    blurbEn:
      "Sets, inequalities, functions, sequences, calculus basics, analytic geometry, vectors, complex numbers, probability and statistics.",
    blurbZh: "集合与不等式、函数、数列、导数、解析几何、向量、复数、概率与统计。",
    accent: "vermillion",
  },
  {
    code: "PHYS",
    nameEn: "Physics",
    nameZh: "物理",
    shortEn: "Physics",
    kind: "FUNDAMENTAL",
    durationMin: 60,
    questionCount: 48,
    totalMarks: 100,
    language: "en+zh",
    blurbEn:
      "Mechanics, electromagnetism, thermodynamics, optics and modern physics at Chinese senior-high / early-university level.",
    blurbZh: "力学、电磁学、热学、光学与现代物理。",
    accent: "jade",
  },
  {
    code: "CHEM",
    nameEn: "Chemistry",
    nameZh: "化学",
    shortEn: "Chem",
    kind: "FUNDAMENTAL",
    durationMin: 60,
    questionCount: 48,
    totalMarks: 100,
    language: "en+zh",
    blurbEn:
      "Chemical calculations, substance properties and reactions, theories and laws, laboratory practice and industrial processes.",
    blurbZh: "化学计算、物质性质与反应、化学理论与规律、实验与应用。",
    accent: "gold",
  },
  {
    code: "CH_HUM",
    nameEn: "Professional Chinese — Humanities",
    nameZh: "文科中文",
    shortEn: "Humanities 中文",
    kind: "CHINESE",
    durationMin: 90,
    questionCount: 80,
    totalMarks: 100,
    language: "zh",
    blurbEn:
      "Character recognition, word discrimination, sentence completion and reading comprehension across humanities disciplines.",
    blurbZh: "识汉字、辨析词语、补全语句与阅读理解，覆盖文学、哲学、历史、法学、教育学等。",
    accent: "ink",
  },
  {
    code: "CH_SCI",
    nameEn: "Professional Chinese — STEM",
    nameZh: "理科中文",
    shortEn: "STEM 中文",
    kind: "CHINESE",
    durationMin: 90,
    questionCount: 80,
    totalMarks: 100,
    language: "zh",
    blurbEn:
      "The same item types applied to maths, physics and chemistry terminology, lab language and academic reading.",
    blurbZh: "识汉字、辨析词语、补全语句与阅读理解，聚焦数理化术语、实验与学术阅读。",
    accent: "ink",
  },
];

export const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map((s) => [s.code, s])) as Record<
  SubjectCode,
  SubjectSpec
>;

export const KIND_LABEL: Record<string, string> = {
  FUNDAMENTAL: "Fundamental subject",
  CHINESE: "Professional Chinese",
};

/* ───────────────────────────── Scoring ───────────────────────────── */

/** Raw correct answers → 0–100 score, matching the official scale. */
export function scaleScore(correct: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

// Normal CDF (Abramowitz & Stegun 7.1.26)
function normalCdf(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const poly =
    t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const cdf = 1 - (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;
  return z >= 0 ? cdf : 1 - cdf;
}

/**
 * Percentile estimate. Universities are shown a global percentile alongside the
 * raw score; we model the cohort as a normal distribution rather than claim we
 * know real candidates. Always render this with an "estimate" label.
 */
export function estimatePercentile(score: number, kind: "FUNDAMENTAL" | "CHINESE" = "FUNDAMENTAL") {
  const mean = kind === "CHINESE" ? 60 : 57;
  const sd = kind === "CHINESE" ? 16 : 17;
  const p = normalCdf((score - mean) / sd) * 100;
  return Math.min(99, Math.max(1, Math.round(p)));
}

export type Band = {
  key: "foundation" | "developing" | "competitive" | "strong";
  label: string;
  tone: string;
  blurb: string;
};

export function scoreBand(score: number): Band {
  if (score >= 85) {
    return {
      key: "strong",
      label: "Highly competitive",
      tone: "text-jade",
      blurb: "A score in this range stands out in scholarship shortlisting.",
    };
  }
  if (score >= 70) {
    return {
      key: "competitive",
      label: "Competitive",
      tone: "text-jade",
      blurb: "Comfortably above the typical shortlist band. Tighten your weakest topics.",
    };
  }
  if (score >= 50) {
    return {
      key: "developing",
      label: "Developing",
      tone: "text-gold",
      blurb: "The foundations are there. Targeted drilling will move this quickly.",
    };
  }
  return {
    key: "foundation",
    label: "Foundation",
    tone: "text-vermillion",
    blurb: "Rebuild the core topics before attempting full-length papers again.",
  };
}

/**
 * Readiness is a coaching signal, not a prediction: recent performance carries
 * 60%, syllabus coverage 25%, and practice volume 15%.
 */
export function readinessScore(input: {
  recentScores: number[];
  topicsPracticed: number;
  topicsTotal: number;
  questionsAnswered: number;
}) {
  const { recentScores, topicsPracticed, topicsTotal, questionsAnswered } = input;
  if (!recentScores.length) return 0;

  const performance =
    recentScores.slice(0, 5).reduce((sum, value) => sum + value, 0) /
    Math.min(recentScores.length, 5);
  const coverage = topicsTotal > 0 ? Math.min(1, topicsPracticed / topicsTotal) : 0;
  const volume = Math.min(1, questionsAnswered / 240);

  return Math.round(performance * 0.6 + coverage * 100 * 0.25 + volume * 100 * 0.15);
}

/* ───────────────────────────── Formatting ───────────────────────────── */

export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export function humanMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function percent(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export const SCORE_BANDS = [
  { min: 85, label: "85–100", note: "Highly competitive" },
  { min: 70, label: "70–84", note: "Competitive" },
  { min: 50, label: "50–69", note: "Developing" },
  { min: 0, label: "0–49", note: "Foundation" },
];
