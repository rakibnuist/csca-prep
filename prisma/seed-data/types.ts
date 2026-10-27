export type SeedQuestion = {
  /** Topic code from prisma/seed-data/syllabus.ts */
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  stem: string;
  stemZh?: string;
  options: string[];
  optionsZh?: string[];
  correct: number;
  explanation: string;
  explanationZh?: string;
  tags?: string[];
};

export type SeedSubject = {
  code: string;
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
  accent: string;
};

export type SeedTopic = {
  code: string;
  subjectCode: string;
  unitEn: string;
  unitZh: string;
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  weight: number;
  order: number;
};
