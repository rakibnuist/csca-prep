import { SUBJECTS, SUBJECT_MAP, type SubjectCode, type SubjectSpec } from "@/lib/exam";

/**
 * Teaching tracks and programmes.
 *
 * CSCA splits applicants by the language their degree is taught in:
 *
 *   EN — English-taught: Mathematics, Physics and Chemistry, in English.
 *   CN — Chinese-taught: a Professional Chinese paper plus the fundamental
 *        papers, in Chinese. Within CN the student picks a *programme*:
 *        HUMANITIES (文科) or STEM (理科), and the subject set changes.
 *
 * "No unnecessary data" is the rule: a student only ever sees the subjects
 * that belong to their chosen path — never the other Professional Chinese
 * stream, never an English-only set inside the Chinese section, and never a
 * Chinese paper inside the English section.
 *
 * Keep this file client-safe: it is imported by navigation components.
 */

export type TaughtTrack = "EN" | "CN";

/** CN-only: the Professional Chinese stream a Chinese-taught student follows. */
export type Programme = "HUMANITIES" | "STEM";

export type TrackSpec = {
  key: TaughtTrack;
  /** English label, e.g. "English-taught". */
  label: string;
  /** Chinese label, e.g. "中文授课". */
  labelZh: string;
  /** Compact label for chips. */
  short: string;
  eyebrow: string;
  tagline: string;
  body: string;
  /** What this section contains, one line per item. */
  includes: string[];
  /** The line that makes the boundary explicit. */
  boundary: string;
  /** Union of every subject this track can show (programme-aware listing uses `programmeSubjects`). */
  subjects: SubjectCode[];
  defaultSubject: SubjectCode;
  /** Language every question, paper and worked solution is rendered in. */
  lang: "en" | "zh";
  /** Public, canonical track homepage (D1 URL). */
  href: string;
  /** Authed in-app section hub. */
  appHref: string;
  programmes: Programme[];
};

export const CHINESE_SUBJECT_CODES: SubjectCode[] = ["CH_HUM", "CH_SCI"];

/** English-taught applicants sit exactly these three, in English. */
const EN_SUBJECTS: SubjectCode[] = ["MATH", "PHYS", "CHEM"];
/** Chinese-taught, Humanities (文科): Professional Chinese (Humanities) + Mathematics. */
const CN_HUMANITIES_SUBJECTS: SubjectCode[] = ["CH_HUM", "MATH"];
/** Chinese-taught, STEM (理科): Professional Chinese (STEM) + Mathematics + Physics + Chemistry. */
const CN_STEM_SUBJECTS: SubjectCode[] = ["CH_SCI", "MATH", "PHYS", "CHEM"];

export const TRACKS: Record<TaughtTrack, TrackSpec> = {
  EN: {
    key: "EN",
    label: "English-taught",
    labelZh: "英文授课",
    short: "English",
    eyebrow: "English-taught programmes",
    tagline: "Mathematics, Physics and Chemistry — sat in English.",
    body: "For applicants to English-medium degree programmes. Only the CSCA fundamental papers, in English: Mathematics, Physics and Chemistry. No Professional Chinese, no Chinese-language material.",
    includes: [
      "Mathematics · Physics · Chemistry",
      "English question text, options and analysis",
      "English-medium mock papers and official sittings",
    ],
    boundary: "Many non-CGS English-taught programmes waive Professional Chinese, so no Chinese paper appears in this section (CGS applicants still sit it separately).",
    subjects: EN_SUBJECTS,
    defaultSubject: "MATH",
    lang: "en",
    href: "/en",
    appHref: "/en/dashboard",
    programmes: ["STEM"],
  },
  CN: {
    key: "CN",
    label: "Chinese-taught",
    labelZh: "中文授课",
    short: "中文",
    eyebrow: "Chinese-taught programmes",
    tagline: "专业中文 + 数学（理科方向加物理、化学）。",
    body: "面向中文授课本科项目。根据你的方向只显示相关科目：文科 = 文科中文 + 数学；理科 = 理科中文 + 数学 + 物理 + 化学。",
    includes: [
      "文科中文 或 理科中文（专业中文）",
      "数学（中文卷）",
      "理科方向：物理 · 化学（中文卷）",
    ],
    boundary: "与你的方向无关的专业中文试卷，以及英文试卷，都不会出现在本区。",
    subjects: ["CH_HUM", "CH_SCI", "MATH", "PHYS", "CHEM"],
    defaultSubject: "CH_HUM",
    lang: "zh",
    href: "/cn",
    appHref: "/cn/dashboard",
    programmes: ["HUMANITIES", "STEM"],
  },
};

export const TRACK_LIST: TrackSpec[] = [TRACKS.EN, TRACKS.CN];

/* ─────────────────────────── Parsing ─────────────────────────── */

export function parseTrack(value: string | null | undefined): TaughtTrack | null {
  const normalised = String(value ?? "").trim().toLowerCase();
  if (["en", "eng", "english", "en-taught", "english-taught", "english_taught"].includes(normalised)) {
    return "EN";
  }
  if (
    ["cn", "zh", "chi", "chinese", "zh-taught", "cn-taught", "chinese-taught", "chinese_taught", "中文", "中文授课"].includes(
      normalised,
    )
  ) {
    return "CN";
  }
  return null;
}

/** `User.track` stores the CN programme (HUMANITIES | STEM). */
export function parseProgramme(value: string | null | undefined): Programme | null {
  const normalised = String(value ?? "").trim().toLowerCase();
  if (["stem", "science", "sci", "理科", "理科中文"].includes(normalised)) return "STEM";
  if (["humanities", "humanity", "arts", "hum", "文科", "文科中文"].includes(normalised)) return "HUMANITIES";
  return null;
}

/** Normalise a stored teaching-track or legacy interface-language value to a track. */
export function trackFromPreference(value: string | null | undefined): TaughtTrack {
  return parseTrack(value) ?? "EN";
}

/** Explicit `?taught=` wins, then the saved preference, then English-taught. */
export function resolveTrack(
  value: string | null | undefined,
  testLanguage: string | null | undefined,
): TaughtTrack {
  return parseTrack(value) ?? trackFromPreference(testLanguage);
}

export function otherTrack(track: TaughtTrack): TaughtTrack {
  return track === "EN" ? "CN" : "EN";
}

/* ─────────────────────────── Subject scope ─────────────────────────── */

/**
 * The subjects a student sees, for their track and (on CN) their programme.
 * EN ignores the programme and always returns Mathematics, Physics, Chemistry.
 */
export function programmeSubjects(track: TaughtTrack, programme?: Programme | null): SubjectCode[] {
  if (track === "EN") return [...EN_SUBJECTS];
  return programme === "STEM" ? [...CN_STEM_SUBJECTS] : [...CN_HUMANITIES_SUBJECTS];
}

/** Convenience: (teachingTrack, chineseSubTrack) → subject codes. */
export function studentSubjects(teachingTrack: TaughtTrack, chineseSubTrack: string | null | undefined): SubjectCode[] {
  return programmeSubjects(teachingTrack, parseProgramme(chineseSubTrack));
}

export function trackSubjects(track: TaughtTrack, programme?: Programme | null): SubjectSpec[] {
  return programmeSubjects(track, programme).map((code) => SUBJECT_MAP[code]);
}

export function trackSubjectCodes(track: TaughtTrack, programme?: Programme | null): SubjectCode[] {
  return programmeSubjects(track, programme);
}

export function isSubjectInTrack(code: string, track: TaughtTrack, programme?: Programme | null): boolean {
  return (programmeSubjects(track, programme) as string[]).includes(code);
}

export function isChineseSubject(code: string): boolean {
  return code === "CH_HUM" || code === "CH_SCI";
}

export function defaultSubjectFor(track: TaughtTrack, programme?: Programme | null): SubjectCode {
  if (track === "EN") return "MATH";
  return programme === "STEM" ? "CH_SCI" : "CH_HUM";
}

function asSubject(code: string): SubjectSpec | null {
  return SUBJECT_MAP[code as SubjectCode] ?? null;
}

/* ─────────────────────────── Display ─────────────────────────── */

export function displaySubject(subject: SubjectSpec | string, track: TaughtTrack): string {
  const spec = typeof subject === "string" ? asSubject(subject) : subject;
  if (!spec) return String(subject);
  return track === "CN" ? spec.nameZh : spec.nameEn;
}

export function displaySubjectShort(subject: SubjectSpec | string, track: TaughtTrack): string {
  const spec = typeof subject === "string" ? asSubject(subject) : subject;
  if (!spec) return String(subject);
  return track === "CN" ? spec.nameZh : spec.shortEn;
}

export function displayBlurb(subject: SubjectSpec | string, track: TaughtTrack): string {
  const spec = typeof subject === "string" ? asSubject(subject) : subject;
  if (!spec) return "";
  return track === "CN" ? spec.blurbZh : spec.blurbEn;
}

type TopicLike = { titleEn: string; titleZh: string; unitEn: string; unitZh: string };

export function displayTopic(topic: TopicLike, track: TaughtTrack): string {
  return track === "CN" ? topic.titleZh : topic.titleEn;
}

export function displayUnit(topic: TopicLike, track: TaughtTrack): string {
  return track === "CN" ? topic.unitZh : topic.unitEn;
}

/** Language label for a paper in this track. */
export function paperLanguageLabel(subject: SubjectSpec | string, track: TaughtTrack): string {
  const spec = typeof subject === "string" ? asSubject(subject) : subject;
  if (track === "CN") return spec?.kind === "CHINESE" ? "中文 only" : "中文";
  return "English";
}

/* ─────────────────────────── Links ─────────────────────────── */

export function trackHref(href: string, track: TaughtTrack): string {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}taught=${track}`;
}

/**
 * Build a link into the student app under the account's track.
 *
 * The app is served from `/{track}/...` (e.g. `/en/dashboard`), so callers pass
 * the app-relative path (`/app/practice`) and the helper rewrites it with the
 * right track prefix.
 */
export function trackLink(
  basePath: string,
  track: TaughtTrack,
  params: Record<string, string | number | undefined | null> = {},
): string {
  const slug = track === "CN" ? "cn" : "en";
  // Only app-internal paths (`/app/...`) are re-rooted under the track. Other
  // absolute paths (e.g. the full-screen `/exam/...` client) pass through.
  const isAppPath = basePath === "/app" || basePath.startsWith("/app/");
  const path = isAppPath ? basePath.slice(4) || "/" : basePath;
  const prefix = isAppPath ? `/${slug}` : "";
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    query.set(key, String(value));
  }
  const qs = query.toString();
  const base = `${prefix}${path === "/" && isAppPath ? "" : path}`;
  return `${base}${qs ? `?${qs}` : ""}`;
}

/* ─────────────────────────── Question scope ─────────────────────────── */

/**
 * Prisma filter for questions that belong to a track (and, on CN, a programme).
 *
 * English-taught: only Mathematics, Physics, Chemistry — nothing Chinese.
 * Chinese-taught: the chosen Professional Chinese paper is Chinese by
 * construction; fundamental items must carry a Chinese stem. English-only
 * legacy drills and review items therefore never surface in the CN section.
 */
export function trackQuestionWhere(track: TaughtTrack, programme?: Programme | null) {
  const subjects = programmeSubjects(track, programme);
  if (track === "EN") return { subjectCode: { in: subjects } };

  const chinese = subjects.filter((code) => CHINESE_SUBJECT_CODES.includes(code));
  const fundamentals = subjects.filter((code) => !CHINESE_SUBJECT_CODES.includes(code));
  return {
    OR: [
      { subjectCode: { in: chinese } },
      { subjectCode: { in: fundamentals }, stemZh: { not: null } },
    ],
  };
}

/**
 * Prisma filter for papers that belong to a track (and, on CN, a programme).
 *
 * Chinese-taught papers must either be the chosen Professional Chinese paper
 * or carry Chinese text on *every* item. This keeps English-only review
 * modules and any legacy mixed set out of the CN section: a paper is either
 * Chinese or it is not shown there.
 */
export function trackPaperWhere(track: TaughtTrack, programme?: Programme | null) {
  const subjects = programmeSubjects(track, programme);
  if (track === "EN") return { subjectCode: { in: subjects } };

  const chinese = subjects.filter((code) => CHINESE_SUBJECT_CODES.includes(code));
  const fundamentals = subjects.filter((code) => !CHINESE_SUBJECT_CODES.includes(code));
  return {
    OR: [
      { subjectCode: { in: chinese } },
      { subjectCode: { in: fundamentals }, NOT: { items: { some: { question: { stemZh: null } } } } },
    ],
  };
}

/**
 * Filter for questions in a specific subject, respecting the track's language
 * rule. Unlike `trackQuestionWhere` (which returns a subject *set*), this is
 * meant to be spread next to a single `subjectCode` without clobbering it.
 */
export function subjectQuestionWhere(subjectCode: string, track: TaughtTrack) {
  if (track === "EN") return { subjectCode };
  return isChineseSubject(subjectCode)
    ? { subjectCode }
    : { subjectCode, stemZh: { not: null } };
}

/** Whether a loaded mock/paper belongs to this track, programme, and language rule. */
export function isPaperAllowedInTrack(
  paper: {
    subjectCode: string;
    items: Array<{ question: { stemZh: string | null } }>;
  },
  track: TaughtTrack,
  programme?: Programme | null,
): boolean {
  if (!isSubjectInTrack(paper.subjectCode, track, programme)) return false;
  if (track === "CN" && !isChineseSubject(paper.subjectCode)) {
    return paper.items.every((item) => Boolean(item.question.stemZh));
  }
  return true;
}

/** Subject ordering used by section listings. */
export function orderedTrackSubjects(track: TaughtTrack, programme?: Programme | null): SubjectSpec[] {
  return programmeSubjects(track, programme)
    .map((code) => SUBJECTS.find((subject) => subject.code === code))
    .filter((subject): subject is SubjectSpec => Boolean(subject));
}

/** Route `<title>` helper for `(student)/[track]/*` segments. */
export function trackMetaTitle(track: string, en: string, zh: string) {
  return { title: track === "cn" ? zh : en };
}
