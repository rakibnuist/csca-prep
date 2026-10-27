import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";
import { SUBJECTS, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";

export const metadata = { title: "Quick drill" };

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default async function QuickDrillPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; difficulty?: string; n?: string }>;
}) {
  await requireUser();
  const { subject: subjectParam, difficulty, n } = await searchParams;

  const subjectCode = (SUBJECTS.find((subject) => subject.code === subjectParam)?.code ??
    "MATH") as SubjectCode;
  const subject = SUBJECT_MAP[subjectCode];

  const difficultyValue = DIFFICULTIES.includes(difficulty as (typeof DIFFICULTIES)[number])
    ? (difficulty as (typeof DIFFICULTIES)[number])
    : undefined;
  const count = Math.min(30, Math.max(5, Number(n) || 10));

  const pool = await prisma.question.findMany({
    where: {
      subjectCode,
      active: true,
      ...(difficultyValue ? { difficulty: difficultyValue } : {}),
    },
    include: { topic: { select: { code: true, titleEn: true } } },
    orderBy: { id: "asc" },
  });

  const questions: PracticeQuestion[] = shuffle(pool)
    .slice(0, count)
    .map((question) => ({
      id: question.id,
      stem: question.stem,
      stemZh: question.stemZh,
      options: question.options,
      optionsZh: question.optionsZh,
      figure: question.figure,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
      explanationZh: question.explanationZh,
      difficulty: question.difficulty,
      topicCode: question.topic.code,
      topicTitle: question.topic.titleEn,
    }));

  const suffix = difficultyValue ? `&difficulty=${difficultyValue}` : "";

  return (
    <PracticeRunner
      questions={questions}
      title={`${subject.nameEn} · Quick drill`}
      subtitle={`${questions.length} random questions across every topic${difficultyValue ? ` · ${difficultyValue.toLowerCase()}` : ""}`}
      backHref={`/app/practice?subject=${subjectCode}${suffix ? `&difficulty=${difficultyValue}` : ""}`}
      restartHref={`/app/practice/quick?subject=${subjectCode}${suffix}`}
    />
  );
}
