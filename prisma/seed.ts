/**
 * Seeds the CSCA Master database.
 *
 *   npm run db:seed
 *
 * Idempotent: subjects, topics, questions, mocks and universities use stable
 * identifiers, so re-running updates content in place without touching a
 * student's attempts (mock rows are reused, only their item list is rebuilt).
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

import { subjects, topics } from "./seed-data/syllabus";
import { curatedUniversities } from "./seed-data/universities";
import { mathQuestions } from "./seed-data/questions/math";
import { physicsQuestions } from "./seed-data/questions/physics";
import { chemistryQuestions } from "./seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "./seed-data/questions/chinese-humanities";
import { chineseStemQuestions } from "./seed-data/questions/chinese-stem";
import type { SeedQuestion } from "./seed-data/types";
import { EXAM_SITTINGS } from "../src/lib/site";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required. Copy .env.example to .env.local first.");
}

const isEmbedded = /127\.0\.0\.1|localhost/.test(connectionString) && /:55432/.test(connectionString);
const pool = new Pool({ connectionString, max: isEmbedded ? 1 : 5 });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const BANKS: { code: string; items: SeedQuestion[] }[] = [
  { code: "MATH", items: mathQuestions },
  { code: "PHYS", items: physicsQuestions },
  { code: "CHEM", items: chemistryQuestions },
  { code: "CH_HUM", items: chineseHumanitiesQuestions },
  { code: "CH_SCI", items: chineseStemQuestions },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function seededShuffle<T>(items: T[], seed = 7): T[] {
  const copy = [...items];
  let state = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function main() {
  console.log("→ subjects and topics");
  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { code: subject.code },
      create: subject,
      update: subject,
    });
  }

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { code: topic.code },
      create: { id: topic.code, ...topic },
      update: topic,
    });
  }

  console.log("→ question bank");
  for (const bank of BANKS) {
    for (let index = 0; index < bank.items.length; index++) {
      const item = bank.items[index];
      const id = `${bank.code.toLowerCase()}-${String(index + 1).padStart(3, "0")}`;
      const data = {
        subjectCode: bank.code,
        topicId: item.topic,
        difficulty: item.difficulty,
        stem: item.stem,
        stemZh: item.stemZh ?? null,
        options: item.options,
        optionsZh: item.optionsZh ?? [],
        correctIndex: item.correct,
        explanation: item.explanation,
        explanationZh: item.explanationZh ?? null,
        tags: item.tags ?? [],
        source: "CSCA Master original",
        active: true,
      };
      await prisma.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    }
    console.log(`   ${bank.code}: ${bank.items.length} items`);
  }

  console.log("→ mock papers");
  for (const bank of BANKS) {
    const subject = subjects.find((entry) => entry.code === bank.code)!;
    const chinese = subject.kind === "CHINESE";
    const size = 48;
    const slug = `${bank.code.toLowerCase()}-mock-01`;
    const selected = seededShuffle(
      await prisma.question.findMany({
        where: { subjectCode: bank.code, active: true },
        orderBy: { id: "asc" },
      }),
      bank.code.charCodeAt(0),
    ).slice(0, size);

    const mock = await prisma.mock.upsert({
      where: { slug },
      create: {
        slug,
        subjectCode: bank.code,
        title: `${subject.nameEn} · Mock 01`,
        subtitle: chinese
          ? "CSCA-format short paper. The official paper runs 80 questions in 90 minutes; this set covers the same item types at 48 questions."
          : "Full-length paper in the official format: 48 single-answer questions in 60 minutes, scored 0–100.",
        year: 2027,
        paper: "Paper 01",
        durationMin: chinese ? 54 : 60,
        questionCount: selected.length,
        isFullLength: !chinese,
        published: true,
      },
      update: {
        title: `${subject.nameEn} · Mock 01`,
        subtitle: chinese
          ? "CSCA-format short paper. The official paper runs 80 questions in 90 minutes; this set covers the same item types at 48 questions."
          : "Full-length paper in the official format: 48 single-answer questions in 60 minutes, scored 0–100.",
        durationMin: chinese ? 54 : 60,
        questionCount: selected.length,
        isFullLength: !chinese,
        published: true,
      },
    });

    await prisma.mockItem.deleteMany({ where: { mockId: mock.id } });
    for (let order = 0; order < selected.length; order++) {
      await prisma.mockItem.create({
        data: { mockId: mock.id, questionId: selected[order].id, order },
      });
    }
    console.log(`   ${slug}: ${selected.length} questions`);
  }

  console.log("→ exam calendar");
  for (const sitting of EXAM_SITTINGS) {
    await prisma.examDate.upsert({
      where: { id: sitting.id },
      create: {
        id: sitting.id,
        examDate: new Date(`${sitting.date}T13:00:00+08:00`),
        intake: sitting.intake,
        regionNote: sitting.region,
        formats: ["home-online", "computer-based", "paper-based"],
        note: sitting.registration,
      },
      update: {
        examDate: new Date(`${sitting.date}T13:00:00+08:00`),
        intake: sitting.intake,
        regionNote: sitting.region,
        note: sitting.registration,
      },
    });
  }

  console.log("→ universities");
  const base = JSON.parse(
    readFileSync(path.join(process.cwd(), "src/data/csc-universities.json"), "utf8"),
  ) as { nameEn: string; nameZh: string; location: string }[];

  const curatedByName = new Map(curatedUniversities.map((entry) => [entry.nameEn, entry]));

  for (const entry of base) {
    const curated = curatedByName.get(entry.nameEn);
    const slug = slugify(entry.nameEn);
    const data = {
      nameEn: entry.nameEn,
      nameZh: entry.nameZh,
      city: entry.location,
      province: entry.location,
      tier: curated?.tier ?? [],
      languages: curated?.languages ?? ["Chinese", "English"],
      needsChineseTest: true,
      scienceSubjectRule: curated?.scienceSubjectRule ?? "MATH + PHYS or CHEM",
      humanitiesRule: curated?.humanitiesRule ?? "MATH only",
      englishRequirement: curated?.englishRequirement ?? null,
      hskRequirement: curated?.hskRequirement ?? null,
      applicationDeadline: curated?.applicationDeadline ?? null,
      scholarship: true,
      website: curated?.website ?? null,
      summary: curated?.summary ?? null,
      popularMajors: curated?.popularMajors ?? [],
      internationalCount: curated?.internationalCount ?? null,
      rank: curated?.rank ?? null,
      verified: Boolean(curated),
    };

    await prisma.university.upsert({
      where: { slug },
      create: { slug, ...data },
      update: data,
    });
    curatedByName.delete(entry.nameEn);
  }

  // curated entries not present in the base list
  for (const entry of curatedByName.values()) {
    const slug = slugify(entry.nameEn);
    const data = {
      nameEn: entry.nameEn,
      nameZh: entry.nameZh,
      city: entry.city,
      province: entry.province ?? entry.city,
      tier: entry.tier ?? [],
      languages: entry.languages ?? ["Chinese", "English"],
      needsChineseTest: true,
      scienceSubjectRule: entry.scienceSubjectRule ?? "MATH + PHYS or CHEM",
      humanitiesRule: entry.humanitiesRule ?? "MATH only",
      englishRequirement: entry.englishRequirement ?? null,
      hskRequirement: entry.hskRequirement ?? null,
      applicationDeadline: entry.applicationDeadline ?? null,
      scholarship: true,
      website: entry.website ?? null,
      summary: entry.summary ?? null,
      popularMajors: entry.popularMajors ?? [],
      internationalCount: entry.internationalCount ?? null,
      rank: entry.rank ?? null,
      verified: true,
    };
    await prisma.university.upsert({ where: { slug }, create: { slug, ...data }, update: data });
  }

  console.log(`   ${await prisma.university.count()} institutions`);

  console.log("→ demo accounts");
  const password = await bcrypt.hash("password123", 11);

  const student = await prisma.user.upsert({
    where: { email: "student@cscamaster.com" },
    create: {
      email: "student@cscamaster.com",
      name: "Amina Yusuf",
      password,
      role: "STUDENT",
      country: "Nigeria",
      track: "STEM",
      targetYear: 2027,
    },
    update: { password },
  });

  await prisma.user.upsert({
    where: { email: "admin@cscamaster.com" },
    create: {
      email: "admin@cscamaster.com",
      name: "CSCA Master Admin",
      password,
      role: "ADMIN",
      track: "STEM",
      targetYear: 2027,
    },
    update: { password },
  });

  console.log("→ demo attempt history");
  const existingAttempts = await prisma.attempt.count({ where: { userId: student.id } });
  if (existingAttempts === 0) {
    const demoTargets = [
      { slug: "math-mock-01", score: 68, daysAgo: 9, duration: 3010 },
      { slug: "phys-mock-01", score: 75, daysAgo: 4, duration: 2860 },
      { slug: "math-mock-01", score: 79, daysAgo: 1, duration: 2740 },
    ];

    const reviewSeeds: string[] = [];

    for (const target of demoTargets.slice(0, 2)) {
      const mock = await prisma.mock.findUnique({
        where: { slug: target.slug },
        include: {
          items: { include: { question: { include: { topic: true } } }, orderBy: { order: "asc" } },
        },
      });
      if (!mock) continue;

      const total = mock.items.length;
      const targetCorrect = Math.round((target.score / 100) * total);
      const answers: Record<string, number> = {};
      const topicMap: Record<string, { code: string; title: string; correct: number; total: number }> = {};

      mock.items.forEach((item, index) => {
        const correct = index < targetCorrect;
        answers[item.questionId] = correct
          ? item.question.correctIndex
          : (item.question.correctIndex + 1) % item.question.options.length;
        if (!correct && reviewSeeds.length < 18) reviewSeeds.push(item.questionId);

        const entry = (topicMap[item.question.topic.code] ??= {
          code: item.question.topic.code,
          title: item.question.topic.titleEn,
          correct: 0,
          total: 0,
        });
        entry.total += 1;
        if (correct) entry.correct += 1;
      });

      const completedAt = new Date(Date.now() - target.daysAgo * 86_400_000);
      await prisma.attempt.create({
        data: {
          userId: student.id,
          mockId: mock.id,
          status: "SUBMITTED",
          answers,
          flagged: [],
          totalQuestions: total,
          answeredCount: total,
          rawScore: targetCorrect,
          score: target.score,
          topicBreakdown: topicMap,
          durationSec: target.duration,
          startedAt: new Date(completedAt.getTime() - target.duration * 1000),
          completedAt,
        },
      });
    }

    // Populate the review queue so the demo account has work due on first load.
    for (const questionId of reviewSeeds) {
      await prisma.reviewItem.upsert({
        where: { userId_questionId: { userId: student.id, questionId } },
        create: {
          userId: student.id,
          questionId,
          wrongCount: 1,
          streak: 0,
          nextReviewAt: new Date(Date.now() - 86_400_000),
        },
        update: { nextReviewAt: new Date(Date.now() - 86_400_000) },
      });
    }
  }

  console.log("\n✓ Seed complete");
  console.log("  student@cscamaster.com / password123");
  console.log("  admin@cscamaster.com   / password123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
