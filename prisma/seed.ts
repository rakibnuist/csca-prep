/**
 * Seeds the CSCA Master database.
 *
 *   npm run db:seed
 *
 * Idempotent: subjects, topics, questions, mocks and universities use stable
 * identifiers, so re-running updates content in place without touching a
 * student's attempts (mock rows are reused, only their item list is rebuilt).
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

import { subjects, topics } from "./seed-data/syllabus";
import { loadLegacyBank } from "./seed-data/legacy";
import { mathQuestions } from "./seed-data/questions/math";
import { mathFigureQuestions } from "./seed-data/questions/math-figures";
import { physicsFigureQuestions } from "./seed-data/questions/phys-figures";
import { chemistryFigureQuestions } from "./seed-data/questions/chem-figures";
import { physicsQuestions } from "./seed-data/questions/physics";
import { chemistryQuestions } from "./seed-data/questions/chemistry";
import { chineseHumanitiesQuestions } from "./seed-data/questions/chinese-humanities";
import { chineseHumanitiesExtraQuestions } from "./seed-data/questions/chinese-humanities-extra";
import { chineseStemQuestions } from "./seed-data/questions/chinese-stem";
import { chineseStemExtraQuestions } from "./seed-data/questions/chinese-stem-extra";
import { officialMathQuestions } from "./seed-data/questions/official-math";
import { officialMathApr2026Questions } from "./seed-data/questions/official-math-apr-2026";
import { officialMathJun2026Questions } from "./seed-data/questions/official-math-jun-2026";
import { officialMathJan2026Questions } from "./seed-data/questions/official-math-jan-2026";
import { officialMathDec2025Questions } from "./seed-data/questions/official-math-dec-2025";
import { officialChemistryQuestions } from "./seed-data/questions/official-chemistry";
import { officialChemistryMar2026Questions } from "./seed-data/questions/official-chemistry-mar-2026";
import { officialChemistryAprReviewQuestions } from "./seed-data/questions/official-chemistry-apr-review";
import { officialChemistryDec2025Questions } from "./seed-data/questions/official-chemistry-dec-2025";
import { officialChineseHumanitiesDec2025Questions } from "./seed-data/questions/official-chinese-humanities-dec-2025";
import { officialMathOct2025Part1Questions } from "./seed-data/questions/official-math-oct-2025-part1";
import { officialMathOct2025Part2Questions } from "./seed-data/questions/official-math-oct-2025-part2";
import { officialMathAprReviewM1Questions } from "./seed-data/questions/review-math-apr-2026-m1";
import { officialMathAprReviewM2Questions } from "./seed-data/questions/review-math-apr-2026-m2";
import { officialMathAprReviewM3Questions } from "./seed-data/questions/review-math-apr-2026-m3";
import { officialMathAprReviewM4Questions } from "./seed-data/questions/review-math-apr-2026-m4";
import { officialPhysicsAprReviewM1Questions } from "./seed-data/questions/review-physics-apr-2026-m1";
import { officialPhysicsAprReviewM2Questions } from "./seed-data/questions/review-physics-apr-2026-m2";
import { officialPhysicsQuestions } from "./seed-data/questions/official-physics";
import { officialPhysicsMar2026Questions } from "./seed-data/questions/official-physics-mar-2026";
import { officialPhysicsApr2026Questions } from "./seed-data/questions/official-physics-apr-2026";
import { officialPhysicsDec2025Questions } from "./seed-data/questions/official-physics-dec-2025";
import type { SeedQuestion } from "./seed-data/types";
import { EXAM_SITTINGS } from "../src/lib/site";
import { PAPER_STATS } from "../src/lib/paper-stats";

// `npm run db:seed` runs outside Next, so load .env.local the same way the dev
// script does. Existing shell variables always win.
for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

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
  { code: "CH_HUM", items: [...chineseHumanitiesQuestions, ...chineseHumanitiesExtraQuestions] },
  { code: "CH_SCI", items: [...chineseStemQuestions, ...chineseStemExtraQuestions] },
];

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
        figure: item.figure ?? null,
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

  console.log("→ figure-based questions");
  for (let index = 0; index < mathFigureQuestions.length; index++) {
    const item = mathFigureQuestions[index];
    const id = `math-fig-${String(index + 1).padStart(3, "0")}`;
    const data = {
      subjectCode: "MATH",
      topicId: item.topic,
      difficulty: item.difficulty,
      stem: item.stem,
      stemZh: item.stemZh ?? null,
      options: item.options,
      optionsZh: item.optionsZh ?? [],
      figure: item.figure ?? null,
      correctIndex: item.correct,
      explanation: item.explanation,
      explanationZh: item.explanationZh ?? null,
      tags: item.tags ?? [],
      source: "CSCA Master original",
      active: true,
    };
    await prisma.question.upsert({ where: { id }, create: { id, ...data }, update: data });
  }
  console.log(`   MATH figures: ${mathFigureQuestions.length} items`);

  const seedFigureBank = async (items: typeof mathFigureQuestions, prefix: string, subjectCode: string) => {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const id = `${prefix}-${String(index + 1).padStart(3, "0")}`;
      const data = {
        subjectCode,
        topicId: item.topic,
        difficulty: item.difficulty,
        stem: item.stem,
        stemZh: item.stemZh ?? null,
        options: item.options,
        optionsZh: item.optionsZh ?? [],
        figure: item.figure ?? null,
        correctIndex: item.correct,
        explanation: item.explanation,
        explanationZh: item.explanationZh ?? null,
        tags: item.tags ?? [],
        source: "CSCA Master original",
        active: true,
      };
      await prisma.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    }
    console.log(`   ${subjectCode} figures: ${items.length} items`);
  };

  await seedFigureBank(physicsFigureQuestions, "phys-fig", "PHYS");
  await seedFigureBank(chemistryFigureQuestions, "chem-fig", "CHEM");

  console.log("→ legacy drill bank");
  for (const bank of loadLegacyBank()) {
    for (let index = 0; index < bank.items.length; index++) {
      const item = bank.items[index];
      const id = `drill-${bank.code.toLowerCase()}-${String(index + 1).padStart(4, "0")}`;
      const data = {
        subjectCode: bank.code,
        topicId: item.topic,
        difficulty: item.difficulty,
        stem: item.stem,
        stemZh: null,
        options: item.options,
        optionsZh: [],
        correctIndex: item.correct,
        explanation: item.explanation,
        explanationZh: null,
        tags: item.tags ?? [],
        source: "Legacy drill bank",
        active: true,
      };
      await prisma.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    }
    console.log(`   ${bank.code}: ${bank.items.length} drill items`);
  }

  console.log("→ official past papers");
  const OFFICIAL_PAPERS: {
    code: string;
    subjectCode: string;
    source: string;
    items: SeedQuestion[];
  }[] = [
    {
      code: "math",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2026-03)",
      items: officialMathQuestions,
    },
    {
      code: "math-apr",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2026-04)",
      items: officialMathApr2026Questions,
    },
    {
      code: "math-jun",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2026-06)",
      items: officialMathJun2026Questions,
    },
    {
      code: "math-jan",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2026-01)",
      items: officialMathJan2026Questions,
    },
    {
      code: "math-dec",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2025-12)",
      items: officialMathDec2025Questions,
    },
    {
      code: "chem",
      subjectCode: "CHEM",
      source: "Official CSCA past paper (2026-01)",
      items: officialChemistryQuestions,
    },
    {
      code: "chem-mar",
      subjectCode: "CHEM",
      source: "Official CSCA past paper (2026-03)",
      items: officialChemistryMar2026Questions,
    },
    {
      code: "chem-apr-review",
      subjectCode: "CHEM",
      source: "Official CSCA review (2026-04)",
      items: officialChemistryAprReviewQuestions,
    },
    {
      code: "chem-dec",
      subjectCode: "CHEM",
      source: "Official CSCA past paper (2025-12)",
      items: officialChemistryDec2025Questions,
    },
    {
      code: "ch-hum-dec",
      subjectCode: "CH_HUM",
      source: "Official CSCA past paper (2025-12-chinese)",
      items: officialChineseHumanitiesDec2025Questions,
    },
    {
      code: "math-oct",
      subjectCode: "MATH",
      source: "Official CSCA past paper (2025-10-part1)",
      items: [...officialMathOct2025Part1Questions, ...officialMathOct2025Part2Questions],
    },
    {
      code: "math-apr-review-m1",
      subjectCode: "MATH",
      source: "CSCA review (2026-04-math-module-1)",
      items: officialMathAprReviewM1Questions,
    },
    {
      code: "math-apr-review-m2",
      subjectCode: "MATH",
      source: "CSCA review (2026-04-math-module-2)",
      items: officialMathAprReviewM2Questions,
    },
    {
      code: "math-apr-review-m3",
      subjectCode: "MATH",
      source: "CSCA review (2026-04-math-module-3)",
      items: officialMathAprReviewM3Questions,
    },
    {
      code: "math-apr-review-m4",
      subjectCode: "MATH",
      source: "CSCA review (2026-04-math-module-4)",
      items: officialMathAprReviewM4Questions,
    },
    {
      code: "phy-apr-review-m1",
      subjectCode: "PHYS",
      source: "CSCA review (2026-04-physics-module-1)",
      items: officialPhysicsAprReviewM1Questions,
    },
    {
      code: "phy-apr-review-m2",
      subjectCode: "PHYS",
      source: "CSCA review (2026-04-physics-module-2)",
      items: officialPhysicsAprReviewM2Questions,
    },
    {
      code: "phy",
      subjectCode: "PHYS",
      source: "Official CSCA past paper (2026-01)",
      items: officialPhysicsQuestions,
    },
    {
      code: "phy-mar",
      subjectCode: "PHYS",
      source: "Official CSCA past paper (2026-03)",
      items: officialPhysicsMar2026Questions,
    },
    {
      code: "phy-apr",
      subjectCode: "PHYS",
      source: "Official CSCA past paper (2026-04)",
      items: officialPhysicsApr2026Questions,
    },
    {
      code: "phy-dec",
      subjectCode: "PHYS",
      source: "Official CSCA past paper (2025-12)",
      items: officialPhysicsDec2025Questions,
    },
  ];

  for (const paper of OFFICIAL_PAPERS) {
    for (let index = 0; index < paper.items.length; index++) {
      const item = paper.items[index];
      const id = `official-${paper.code}-${String(index + 1).padStart(3, "0")}`;
      const data = {
        subjectCode: paper.subjectCode,
        topicId: item.topic,
        difficulty: item.difficulty,
        stem: item.stem,
        stemZh: item.stemZh ?? null,
        options: item.options,
        optionsZh: item.optionsZh ?? [],
        figure: item.figure ?? null,
        correctIndex: item.correct,
        explanation: item.explanation,
        explanationZh: item.explanationZh ?? null,
        tags: item.tags ?? [],
        source: paper.source,
        active: true,
      };
      await prisma.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    }
    console.log(`   ${paper.subjectCode} official: ${paper.items.length} items`);
  }

  console.log("→ mock papers");
  for (const bank of BANKS) {
    const subject = subjects.find((entry) => entry.code === bank.code)!;
    const chinese = subject.kind === "CHINESE";
    // Both Professional Chinese papers are 80 questions in 90 minutes; the
    // fundamental papers are 48 in 60. See csca.cn/about/examintro.
    const size = subject.questionCount;
    const slug = `${bank.code.toLowerCase()}-mock-01`;
    const selected = seededShuffle(
      await prisma.question.findMany({
        where: { subjectCode: bank.code, active: true, source: "CSCA Master original" },
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
        titleZh: `${subject.nameZh} · 模拟卷 01`,
        subtitle: chinese
          ? "Full-length paper in the official format: 80 single-answer questions in 90 minutes, scored 0–100."
          : "Full-length paper in the official format: 48 single-answer questions in 60 minutes, scored 0–100.",
        subtitleZh: chinese
          ? "按官方格式组卷：80 道单选题，90 分钟，满分 100 分。"
          : "按官方格式组卷：48 道单选题，60 分钟，满分 100 分。",
        year: 2027,
        paper: "Paper 01",
        durationMin: subject.durationMin,
        questionCount: selected.length,
        isFullLength: true,
        published: true,
      },
      update: {
        title: `${subject.nameEn} · Mock 01`,
        titleZh: `${subject.nameZh} · 模拟卷 01`,
        subtitle: chinese
          ? "Full-length paper in the official format: 80 single-answer questions in 90 minutes, scored 0–100."
          : "Full-length paper in the official format: 48 single-answer questions in 60 minutes, scored 0–100.",
        subtitleZh: chinese
          ? "按官方格式组卷：80 道单选题，90 分钟，满分 100 分。"
          : "按官方格式组卷：48 道单选题，60 分钟，满分 100 分。",
        durationMin: subject.durationMin,
        questionCount: selected.length,
        isFullLength: true,
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

  // Official past papers as takeable mocks.
  const OFFICIAL_MOCKS: {
    slug: string;
    subjectCode: string;
    title: string;
    titleZh: string;
    source: string;
    durationMin: number;
    paper?: "Official" | "Review";
    isFullLength?: boolean;
    note?: string;
  }[] = [
    {
      slug: "math-official-2026-03",
      subjectCode: "MATH",
      title: "Mathematics · Official · March 2026",
      titleZh: "数学 · 官方真题 · 2026年3月",
      source: "Official CSCA past paper (2026-03)",
      durationMin: 60,
    },
    {
      slug: "math-official-2026-04",
      subjectCode: "MATH",
      title: "Mathematics · Official · April 2026",
      titleZh: "数学 · 官方真题 · 2026年4月",
      source: "Official CSCA past paper (2026-04)",
      durationMin: 60,
    },
    {
      slug: "math-official-2026-06",
      subjectCode: "MATH",
      title: "Mathematics · Official · June 2026",
      titleZh: "数学 · 官方真题 · 2026年6月",
      source: "Official CSCA past paper (2026-06)",
      durationMin: 60,
    },
    {
      slug: "math-official-2026-01",
      subjectCode: "MATH",
      title: "Mathematics · Official · January 2026",
      titleZh: "数学 · 官方真题 · 2026年1月",
      source: "Official CSCA past paper (2026-01)",
      durationMin: 60,
    },
    {
      slug: "math-official-2025-12",
      subjectCode: "MATH",
      title: "Mathematics · Official · December 2025",
      titleZh: "数学 · 官方真题 · 2025年12月",
      source: "Official CSCA past paper (2025-12)",
      durationMin: 60,
    },
    {
      slug: "chem-official-2026-01",
      subjectCode: "CHEM",
      title: "Chemistry · Official · January 2026",
      titleZh: "化学 · 官方真题 · 2026年1月",
      source: "Official CSCA past paper (2026-01)",
      durationMin: 60,
    },
    {
      slug: "chem-official-2026-03",
      subjectCode: "CHEM",
      title: "Chemistry · Official · March 2026",
      titleZh: "化学 · 官方真题 · 2026年3月",
      source: "Official CSCA past paper (2026-03)",
      durationMin: 60,
    },
    {
      slug: "chem-official-2026-04-review",
      subjectCode: "CHEM",
      title: "Chemistry · Official · April 2026 (Sprint Review)",
      titleZh: "化学 · 官方真题 · 2026年4月（冲刺复习）",
      source: "Official CSCA review (2026-04)",
      durationMin: 30,
    },
    {
      slug: "chem-official-2025-12",
      subjectCode: "CHEM",
      title: "Chemistry · Official · December 2025",
      titleZh: "化学 · 官方真题 · 2025年12月",
      source: "Official CSCA past paper (2025-12)",
      durationMin: 60,
    },
    {
      slug: "ch-hum-official-2025-12",
      subjectCode: "CH_HUM",
      title: "Humanities Chinese · Official · December 2025 (Language Items)",
      titleZh: "文科中文 · 官方真题 · 2025年12月（语言题部分）",
      source: "Official CSCA past paper (2025-12-chinese)",
      // Partial transcription: the language-item sections only. The full paper
      // is 80 questions in 90 minutes; this excerpt keeps the official timing
      // so the practice conditions stay honest.
      durationMin: 90,
      note: "Official December 2025 language-item section — 40 of the paper's 80 questions, transcribed for study. Timed at the full 90 minutes; ignore the clock if you only want the items.",
      isFullLength: false,
    },
    {
      slug: "math-official-2025-10",
      subjectCode: "MATH",
      title: "Mathematics · Official · October 2025",
      titleZh: "数学 · 官方真题 · 2025年10月",
      source: "Official CSCA past paper (2025-10-part1)",
      durationMin: 60,
    },
    {
      slug: "phy-official-2026-01",
      subjectCode: "PHYS",
      title: "Physics · Official · January 2026",
      titleZh: "物理 · 官方真题 · 2026年1月",
      source: "Official CSCA past paper (2026-01)",
      durationMin: 60,
    },
    {
      slug: "phy-official-2026-03",
      subjectCode: "PHYS",
      title: "Physics · Official · March 2026",
      titleZh: "物理 · 官方真题 · 2026年3月",
      source: "Official CSCA past paper (2026-03)",
      durationMin: 60,
    },
    {
      slug: "phy-official-2026-04",
      subjectCode: "PHYS",
      title: "Physics · Official · April 2026",
      titleZh: "物理 · 官方真题 · 2026年4月",
      source: "Official CSCA past paper (2026-04)",
      durationMin: 60,
    },
    {
      slug: "phy-official-2025-12",
      subjectCode: "PHYS",
      title: "Physics · Official · December 2025",
      titleZh: "物理 · 官方真题 · 2025年12月",
      source: "Official CSCA past paper (2025-12)",
      durationMin: 60,
    },
    {
      slug: "math-review-2026-04-m1",
      subjectCode: "MATH",
      title: "Mathematics · Review · April 2026 (Module 1: Sets & Inequalities)",
      titleZh: "数学 · 复习卷 · 2026年4月（模块一：集合与不等式）",
      source: "CSCA review (2026-04-math-module-1)",
      durationMin: 25,
      paper: "Review",
      isFullLength: false,
      note: "Reconstructed review set, not an official sitting. Six source items are omitted because they had multiple correct options or mismatched options. Cross-check before relying on it.",
    },
    {
      slug: "math-review-2026-04-m2",
      subjectCode: "MATH",
      title: "Mathematics · Review · April 2026 (Module 2: Functions)",
      titleZh: "数学 · 复习卷 · 2026年4月（模块二：函数）",
      source: "CSCA review (2026-04-math-module-2)",
      durationMin: 30,
      paper: "Review",
      isFullLength: false,
      note: "Reconstructed review set, not an official sitting. One source item (Q5 log expression) is omitted because its options do not match the stem. Cross-check before relying on it.",
    },
    {
      slug: "math-review-2026-04-m3",
      subjectCode: "MATH",
      title: "Mathematics · Review · April 2026 (Module 3: Geometry & Algebra)",
      titleZh: "数学 · 复习卷 · 2026年4月（模块三：几何与代数）",
      source: "CSCA review (2026-04-math-module-3)",
      durationMin: 30,
      paper: "Review",
      isFullLength: false,
      note: "Reconstructed review set, not an official sitting. All 20 source items were checked and retained. Cross-check before relying on it.",
    },
    {
      slug: "math-review-2026-04-m4",
      subjectCode: "MATH",
      title: "Mathematics · Review · April 2026 (Module 4: Probability & Statistics)",
      titleZh: "数学 · 复习卷 · 2026年4月（模块四：概率与统计）",
      source: "CSCA review (2026-04-math-module-4)",
      durationMin: 30,
      paper: "Review",
      isFullLength: false,
      note: "Review set, not an official sitting. All 20 items verified against the sheet's printed answer key.",
    },
    {
      slug: "physics-review-2026-04-m1",
      subjectCode: "PHYS",
      title: "Physics · Review · April 2026 (Module 1: Mechanics)",
      titleZh: "物理 · 复习卷 · 2026年4月（模块一：力学）",
      source: "CSCA review (2026-04-physics-module-1)",
      durationMin: 25,
      paper: "Review",
      isFullLength: false,
      note: "Reconstructed review set, not an official sitting. 17 of 20 items are included; Q4, Q9 and Q17 were omitted because they had multiple correct statements. Cross-check before relying on it.",
    },
    {
      slug: "physics-review-2026-04-m2",
      subjectCode: "PHYS",
      title: "Physics · Review · April 2026 (Module 2: Electromagnetism)",
      titleZh: "物理 · 复习卷 · 2026年4月（模块二：电磁学）",
      source: "CSCA review (2026-04-physics-module-2)",
      durationMin: 30,
      paper: "Review",
      isFullLength: false,
      note: "Reconstructed review set, not an official sitting. 19 of 20 items are included; Q4 was omitted because its field-line diagram is ambiguous. Cross-check before relying on it.",
    },
  ];

  for (const paper of OFFICIAL_MOCKS) {
    const officialQuestions = await prisma.question.findMany({
      where: { subjectCode: paper.subjectCode, active: true, source: paper.source },
      orderBy: { id: "asc" },
    });
    const year = Number(paper.slug.match(/(20\d{2})/)?.[1] ?? 2026);

    const mock = await prisma.mock.upsert({
      where: { slug: paper.slug },
      create: {
        slug: paper.slug,
        subjectCode: paper.subjectCode,
        title: paper.title,
        titleZh: paper.titleZh,
        subtitle:
          paper.note ??
          "Official CSCA past paper with the published answer key and explanations. Reconstructed for study — cross-check with official sources before relying on it.",
        subtitleZh:
          paper.paper === "Review"
            ? "根据官方材料整理的复习模块，并非官方试卷。使用前请与官方来源核对。"
            : "官方 CSCA 真题，附官方答案与逐题解析。为学习目的整理，使用前请与官方来源核对。",
        year,
        paper: paper.paper ?? "Official",
        durationMin: paper.durationMin,
        questionCount: officialQuestions.length,
        isFullLength: paper.isFullLength ?? true,
        published: true,
      },
      update: {
        title: paper.title,
        titleZh: paper.titleZh,
        subtitle:
          paper.note ??
          "Official CSCA past paper with the published answer key and explanations. Reconstructed for study — cross-check with official sources before relying on it.",
        subtitleZh:
          paper.paper === "Review"
            ? "根据官方材料整理的复习模块，并非官方试卷。使用前请与官方来源核对。"
            : "官方 CSCA 真题，附官方答案与逐题解析。为学习目的整理，使用前请与官方来源核对。",
        year,
        paper: paper.paper ?? "Official",
        durationMin: paper.durationMin,
        questionCount: officialQuestions.length,
        isFullLength: paper.isFullLength ?? true,
        published: true,
      },
    });

    await prisma.mockItem.deleteMany({ where: { mockId: mock.id } });
    for (let order = 0; order < officialQuestions.length; order++) {
      await prisma.mockItem.create({
        data: { mockId: mock.id, questionId: officialQuestions[order].id, order },
      });
    }
    console.log(`   ${paper.slug}: ${officialQuestions.length} questions (official)`);
  }

  // ── Practice sets ────────────────────────────────────────────────────
  // 30 full-length papers per subject (150 in total), assembled from the
  // question bank. `/app/practice-sets` and the "150+ practice papers"
  // marketing claim both depend on these existing, so they must be part of
  // the seed — previously they were created out-of-band and a `db:reset`
  // wiped all of them.
  console.log("→ practice sets");
  const PRACTICE_SETS_PER_SUBJECT = 30;
  let practiceSetCount = 0;
  for (const subject of subjects) {
    // A practice set matches the real paper length for that subject: 80
    // questions / 90 minutes for Professional Chinese, 48 / 60 otherwise.
    const PRACTICE_SET_SIZE = subject.questionCount;
    // Fundamental sets are bilingual: every item must carry the Chinese paper
    // text, so the same set can be sat from either teaching section. The
    // English-only legacy drills stay available in topic practice, not in a
    // paper a Chinese-taught student might open.
    const bank = await prisma.question.findMany({
      where: {
        subjectCode: subject.code,
        active: true,
        ...(subject.kind === "CHINESE" ? {} : { stemZh: { not: null } }),
      },
      orderBy: { id: "asc" },
      select: { id: true },
    });
    if (bank.length < PRACTICE_SET_SIZE) {
      console.warn(`   skipping ${subject.code}: only ${bank.length} active questions`);
      continue;
    }

    for (let n = 1; n <= PRACTICE_SETS_PER_SUBJECT; n++) {
      const nn = String(n).padStart(2, "0");
      // CH_HUM -> "ch-hum", CH_SCI -> "ch-sci" (underscores become hyphens).
      const prefix = subject.code.toLowerCase().replace(/_/g, "-");
      const slug = `csca-set-${prefix}-${nn}`;
      const existing = await prisma.mock.findUnique({
        where: { slug },
        select: { id: true, _count: { select: { items: true, attempts: true } } },
      });
      const mock = await prisma.mock.upsert({
        where: { slug },
        create: {
          id: slug,
          slug,
          subjectCode: subject.code,
          title: `${subject.nameEn} · Practice Set ${nn}`,
          titleZh: `${subject.nameZh} · 练习卷 ${nn}`,
          subtitle:
            "Full-length paper assembled from official and original CSCA-format questions.",
          subtitleZh: "按官方题量与时长组卷，题目来自官方真题与原创题库。",
          year: 2027,
          paper: "Practice Set",
          durationMin: subject.durationMin,
          questionCount: PRACTICE_SET_SIZE,
          isFullLength: true,
          published: true,
        },
        update: {
          title: `${subject.nameEn} · Practice Set ${nn}`,
          titleZh: `${subject.nameZh} · 练习卷 ${nn}`,
          subtitle:
            "Full-length paper assembled from official and original CSCA-format questions.",
          subtitleZh: "按官方题量与时长组卷，题目来自官方真题与原创题库。",
          durationMin: subject.durationMin,
          questionCount: PRACTICE_SET_SIZE,
          isFullLength: true,
          published: true,
        },
      });
      practiceSetCount += 1;

      // Keep the composition of sets that already exist — students have
      // attempt history against them. Rebuild only when the set is new, has no
      // history, was built to a different paper length, or still mixes
      // English-only items into a fundamental paper.
      const hasHistory = (existing?._count.attempts ?? 0) > 0;
      const alreadyBilingual =
        existing && subject.kind !== "CHINESE"
          ? (await prisma.mockItem.count({
              where: { mockId: existing.id, question: { stemZh: null } },
            })) === 0
          : true;
      if (
        existing &&
        existing._count.items === PRACTICE_SET_SIZE &&
        (subject.kind === "CHINESE" || alreadyBilingual)
      ) {
        continue;
      }
      if (hasHistory) {
        console.log(`   keeping ${slug} composition (attempt history)`);
        continue;
      }

      const selected = seededShuffle(
        bank,
        n * 7919 + subject.code.charCodeAt(0) * 31,
      ).slice(0, PRACTICE_SET_SIZE);
      await prisma.mockItem.deleteMany({ where: { mockId: mock.id } });
      for (let order = 0; order < selected.length; order++) {
        await prisma.mockItem.create({
          data: { mockId: mock.id, questionId: selected[order].id, order },
        });
      }
    }
    console.log(`   ${subject.code}: ${PRACTICE_SETS_PER_SUBJECT} sets of ${PRACTICE_SET_SIZE}`);
  }
  console.log(`   ${practiceSetCount} practice sets ready`);

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

  // The marketing pages quote these counts. If the content ever changes
  // without PAPER_STATS being updated, fail here rather than let the site
  // quietly publish a wrong number.
  const actual = {
    total: await prisma.mock.count({ where: { published: true } }),
    originals: await prisma.mock.count({ where: { published: true, paper: "Paper 01" } }),
    sets: await prisma.mock.count({ where: { published: true, paper: "Practice Set" } }),
    official: await prisma.mock.count({ where: { published: true, paper: "Official" } }),
    review: await prisma.mock.count({ where: { published: true, paper: "Review" } }),
    questions: await prisma.question.count(),
  };
  const drift = (Object.keys(PAPER_STATS) as (keyof typeof PAPER_STATS)[]).filter(
    (key) => actual[key] !== PAPER_STATS[key],
  );
  if (drift.length > 0) {
    console.error(
      "✗ PAPER_STATS is out of date with the database. Update src/lib/paper-stats.ts:",
    );
    for (const key of drift) {
      console.error(`    ${key}: says ${PAPER_STATS[key]}, database has ${actual[key]}`);
    }
    process.exitCode = 1;
    throw new Error("PAPER_STATS does not match the seeded content.");
  }
  console.log(`   ${PAPER_STATS.total} papers, ${PAPER_STATS.questions} questions — counts match`);

  console.log("→ demo accounts");
  // Demo credentials are for local development only. In production the admin
  // password must come from the environment, and re-seeding must never reset
  // an existing account's password (the old behaviour silently handed anyone
  // with the README a working admin login).
  const isProduction = process.env.NODE_ENV === "production";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (isProduction && !adminPassword) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be set when seeding production. Generate one with `openssl rand -base64 18`.",
    );
  }
  const password = await bcrypt.hash(adminPassword ?? "password123", 11);

  // The demo student only exists for local development. On a live site it is
  // an account with a published password — anyone could sign in as it.
  const student = isProduction
    ? null
    : await prisma.user.upsert({
        where: { email: "student@cscamaster.com" },
        create: {
          email: "student@cscamaster.com",
          name: "Amina Yusuf",
          password,
          role: "STUDENT",
          status: "APPROVED",
          emailVerifiedAt: new Date(),
          whatsapp: "+234 812 345 6789",
          country: "Nigeria",
          track: "STEM",
          targetYear: 2027,
        },
        update: { password, status: "APPROVED", whatsapp: "+234 812 345 6789" },
      });
  if (isProduction) {
    console.log("   skipped the demo student account (production)");
  }

  await prisma.user.upsert({
    where: { email: "admin@cscamaster.com" },
    create: {
      email: "admin@cscamaster.com",
      name: "CSCA Master Admin",
      password,
      role: "ADMIN",
      status: "APPROVED",
      track: "STEM",
      targetYear: 2027,
    },
    // Never overwrite an existing password outside local development.
    update: isProduction ? { status: "APPROVED" } : { password, status: "APPROVED" },
  });

  console.log("→ demo leads");
  const existingLeads = await prisma.lead.count();
  if (existingLeads === 0) {
    const demoLeads = [
      {
        name: "Daniel Okafor", email: "daniel.okafor@example.com", whatsapp: "+234 812 345 6789",
        country: "Nigeria", goal: "September 2027", source: "pricing-waitlist",
        status: "NEW", priority: "P1", tags: ["scholarship", "stem"],
        message: "Need a full mock before my November sitting — scholarship deadline is soon.",
      },
      {
        name: "Maria Ilyas", email: "maria.ilyas@example.com", whatsapp: null,
        country: "Pakistan", goal: "September 2028", source: "contact",
        status: "CONTACTED", priority: "P2", tags: ["humanities"],
        message: "Do you offer a payment plan for the Pro tier?",
      },
      {
        name: "Kenji Watanabe", email: "kenji.w@example.com", whatsapp: "+81 90 1234 5678",
        country: "Japan", goal: "Not sure yet", source: "pricing-waitlist",
        status: "CONVERTED", priority: "P3", tags: ["pro", "paid"],
      },
      {
        name: "Sara Al-Mansoori", email: "sara.m@example.com", whatsapp: "+971 50 987 6543",
        country: "United Arab Emirates", goal: "September 2027", source: "about-newsletter",
        status: "NEW", priority: "P1", tags: ["uae", "urgent"],
        message: "When does the next 8-week study plan start?",
      },
      {
        name: "Lucas Ferreira", email: "lucas.ferreira@example.com", whatsapp: null,
        country: "Brazil", goal: "Later", source: "contact",
        status: "CLOSED", priority: "P3", tags: ["deferred"],
        note: "Moved target year to 2029; follow up next year.",
      },
    ];

    for (const lead of demoLeads) {
      await prisma.lead.create({ data: lead });
    }
  }

  console.log("→ demo attempt history");
  const existingAttempts = student
    ? await prisma.attempt.count({ where: { userId: student.id } })
    : 1; // no demo student in production — never seed its history
  if (existingAttempts === 0 && student) {
    const demoStudent = student;
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
          userId: demoStudent.id,
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
        where: { userId_questionId: { userId: demoStudent.id, questionId } },
        create: {
          userId: demoStudent.id,
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
