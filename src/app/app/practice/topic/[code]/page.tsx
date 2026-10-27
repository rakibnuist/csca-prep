import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const topic = await prisma.topic.findUnique({ where: { code } });
  return { title: topic ? `Practice · ${topic.titleEn}` : "Practice" };
}

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default async function TopicPracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ difficulty?: string; n?: string }>;
}) {
  await requireUser();
  const { code } = await params;
  const { difficulty, n } = await searchParams;

  const topic = await prisma.topic.findUnique({ where: { code } });
  if (!topic) notFound();

  const difficultyValue = DIFFICULTIES.includes(difficulty as (typeof DIFFICULTIES)[number])
    ? (difficulty as (typeof DIFFICULTIES)[number])
    : undefined;
  const count = Math.min(30, Math.max(5, Number(n) || 10));

  const pool = await prisma.question.findMany({
    where: {
      topicId: topic.id,
      active: true,
      ...(difficultyValue ? { difficulty: difficultyValue } : {}),
    },
    select: {
      id: true,
      stem: true,
      stemZh: true,
      options: true,
      optionsZh: true,
      figure: true,
      correctIndex: true,
      explanation: true,
      explanationZh: true,
      difficulty: true,
    },
  });

  const questions: PracticeQuestion[] = shuffle(pool)
    .slice(0, count)
    .map((question) => ({
      ...question,
      topicCode: topic.code,
      topicTitle: topic.titleEn,
    }));

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <p className="font-display text-2xl text-ink">No questions for this topic yet</p>
        <p className="mt-2 text-[13px] text-ink-soft">
          We are still authoring items for {topic.titleEn}
          {difficultyValue ? ` at ${difficultyValue.toLowerCase()} difficulty` : ""}. Try another
          topic or difficulty in the meantime.
        </p>
      </div>
    );
  }

  const suffix = difficultyValue ? `?difficulty=${difficultyValue}` : "";

  return (
    <PracticeRunner
      questions={questions}
      title={topic.titleEn}
      subtitle={`${topic.code} · ${topic.unitEn}${difficultyValue ? ` · ${difficultyValue.toLowerCase()}` : ""} · ${questions.length} questions`}
      backHref={`/app/practice?subject=${topic.subjectCode}${suffix}`}
      restartHref={`/app/practice/topic/${topic.code}${suffix}`}
    />
  );
}
