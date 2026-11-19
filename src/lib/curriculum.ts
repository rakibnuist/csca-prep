import { subjects as seedSubjects, topics as seedTopics } from "../../prisma/seed-data/syllabus";
import { mathQuestions } from "../../prisma/seed-data/questions/math";
import { physicsQuestions } from "../../prisma/seed-data/questions/physics";
import { chemistryQuestions } from "../../prisma/seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "../../prisma/seed-data/questions/chinese-humanities";
import { chineseHumanitiesExtraQuestions } from "../../prisma/seed-data/questions/chinese-humanities-extra";
import { chineseStemQuestions } from "../../prisma/seed-data/questions/chinese-stem";
import { chineseStemExtraQuestions } from "../../prisma/seed-data/questions/chinese-stem-extra";
import type { SeedSubject, SeedTopic } from "../../prisma/seed-data/types";

/**
 * Static view of the curriculum.
 *
 * Marketing pages read from here instead of the database: the syllabus cannot
 * change without a deploy anyway, and static rendering keeps the SEO pages fast
 * and available even during a database incident.
 */
export const SUBJECT_SEEDS: SeedSubject[] = seedSubjects;
export const TOPIC_SEEDS: SeedTopic[] = seedTopics;

const BANK_SIZES: Record<string, number> = {
  MATH: mathQuestions.length,
  PHYS: physicsQuestions.length,
  CHEM: chemistryQuestions.length,
  CH_HUM: chineseHumanitiesQuestions.length + chineseHumanitiesExtraQuestions.length,
  CH_SCI: chineseStemQuestions.length + chineseStemExtraQuestions.length,
};

export type CurriculumSubject = SeedSubject & {
  topics: SeedTopic[];
  practiceItems: number;
};

export const CURRICULUM: CurriculumSubject[] = SUBJECT_SEEDS.map((subject) => ({
  ...subject,
  topics: TOPIC_SEEDS.filter((topic) => topic.subjectCode === subject.code).sort(
    (a, b) => a.order - b.order,
  ),
  practiceItems: BANK_SIZES[subject.code] ?? 0,
}));

export function getSubject(code: string) {
  return CURRICULUM.find((subject) => subject.code === code.toUpperCase()) ?? null;
}

export function getTopic(code: string) {
  return TOPIC_SEEDS.find((topic) => topic.code === code) ?? null;
}
