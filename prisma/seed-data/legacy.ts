import { readFileSync } from "node:fs";
import path from "node:path";
import type { SeedQuestion } from "./types";

/** stem -> Chinese explanation for the templated drill bank. */
const LEGACY_ZH: Record<string, string> = (() => {
  try {
    return JSON.parse(
      readFileSync(path.join(process.cwd(), "prisma/seeds/legacy-zh.json"), "utf8"),
    );
  } catch {
    return {};
  }
})();

/**
 * Legacy drill bank.
 *
 * These are the original CSCA Master question packs (templated, high-volume).
 * They are loaded as practice/drill items only — full mock papers are built
 * exclusively from the curated bank in `./questions/*`, so a template's rough
 * edges never leak into a scored paper.
 */

type LegacyRaw = {
  topic?: string;
  question?: string;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  difficulty?: string;
};

const MATH_TOPICS: Record<string, string> = {
  Sets: "M1.1",
  Inequalities: "M1.2",
  Functions: "M2.1",
  Calculus: "M2.4",
  Sequences: "M2.3",
  "Complex Numbers": "M3.3",
  Probability: "M4.1",
  Statistics: "M4.2",
  Geometry: "M3.1",
};

const PHYS_TOPICS: Record<string, string> = {
  Kinematics: "P1.1",
  "Newton's Laws": "P1.2",
  Momentum: "P1.3",
  "Here Impulse": "P1.3",
  "Work & Energy": "P1.4",
  "Circular Motion": "P1.5",
  Waves: "P1.6",
  Electrostatics: "P2.1",
  Circuits: "P2.2",
  Thermodynamics: "P3.2",
  "Modern Physics": "P5.2",
  Optics: "P4.1",
  "Physics Concepts": "P1.2",
};

const CHEM_TOPICS: Record<string, string> = {
  Moles: "C1.4",
  "Ideal Gas Law": "C1.5",
  "Atomic Structure": "C3.1",
  Solutions: "C1.3",
  "Acids & Bases": "C3.4",
  "Organic Chemistry": "C2.2",
  "Periodic Table": "C3.1",
  "Redox Reactions": "C2.3",
  "Lab Safety": "C4.1",
  "Chemical Equilibrium": "C3.3",
};

const ZH_TOPICS: Record<string, string> = {
  Literature: "H1",
  文学: "H1",
  "Mathematics Terminology": "S1",
  数学: "S1",
};

function load(file: string): LegacyRaw[] {
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), "prisma/seeds", file), "utf8"));
  } catch {
    return [];
  }
}

function difficulty(raw?: string): SeedQuestion["difficulty"] {
  const value = (raw ?? "").toLowerCase();
  if (value === "easy") return "EASY";
  if (value === "hard") return "HARD";
  return "MEDIUM";
}

function toSeed(
  code: string,
  topicMap: Record<string, string>,
  fallback: string,
  items: LegacyRaw[],
  readingTopic?: string,
): SeedQuestion[] {
  const seen = new Set<string>();
  const out: SeedQuestion[] = [];

  for (const raw of items) {
    const stem = (raw.question ?? "").trim();
    const options = (raw.options ?? []).map((option) => String(option).trim());
    if (!stem || options.length !== 4) continue;

    const correct = options.indexOf(String(raw.correct_answer ?? "").trim());
    if (correct < 0) continue;

    const key = stem.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    let topic = topicMap[raw.topic ?? ""] ?? fallback;
    if (readingTopic && stem.length > 120) topic = readingTopic;

    out.push({
      topic,
      difficulty: difficulty(raw.difficulty),
      stem,
      options,
      correct,
      explanation:
        (raw.explanation ?? "").trim() ||
        "Practise this topic and check the reasoning against the syllabus notes.",
      explanationZh: LEGACY_ZH[stem],
      tags: [raw.topic || "drill"],
    });
  }

  return out;
}

export function loadLegacyBank(): { code: string; items: SeedQuestion[] }[] {
  return [
    {
      code: "MATH",
      items: [
        ...toSeed("MATH", MATH_TOPICS, "M2.1", load("full_math_quiz.json")),
        ...toSeed("MATH", { "Sets and Inequalities": "M1.1" }, "M2.1", load("generated_math_questions.json")),
      ],
    },
    {
      code: "PHYS",
      items: [
        ...toSeed("PHYS", PHYS_TOPICS, "P1.1", load("full_physics_quiz.json")),
        ...toSeed("PHYS", { Mechanics: "P1.4" }, "P1.1", load("generated_physics_questions.json")),
      ],
    },
    {
      code: "CHEM",
      items: [
        ...toSeed("CHEM", CHEM_TOPICS, "C1.4", load("full_chemistry_quiz.json")),
        ...toSeed("CHEM", { "Basic Concepts": "C1.4" }, "C1.4", load("generated_chemistry_questions.json")),
      ],
    },
    {
      code: "CH_HUM",
      items: [
        ...toSeed("CH_HUM", ZH_TOPICS, "H1", load("generated_chinese_humanities_questions.json"), "H3"),
        ...toSeed("CH_HUM", ZH_TOPICS, "H1", load("generated_chinese_humanities_15_sets.json"), "H3"),
      ],
    },
    {
      code: "CH_SCI",
      items: [...toSeed("CH_SCI", ZH_TOPICS, "S1", load("generated_chinese_science_questions.json"), "S3")],
    },
  ];
}
