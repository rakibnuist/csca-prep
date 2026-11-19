import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";
import { CONCEPT_MAP } from "@/lib/concepts";
import { plural } from "@/lib/utils";
import {
  displayTopic,
  displayUnit,
  isSubjectInTrack,
  parseProgramme,
  trackLink,
  trackQuestionWhere,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; code: string }>;
}) {
  const { track, code } = await params;
  const zh = track === "cn";
  const topic = await prisma.topic.findUnique({ where: { code } });
  const label = topic ? (zh ? topic.titleZh : topic.titleEn) : "";
  return {
    title: label ? `${zh ? "练习" : "Practice"} · ${label}` : zh ? "练习" : "Practice",
  };
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
  searchParams: Promise<{ difficulty?: string; n?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const { code } = await params;
  const { difficulty, n, taught } = await searchParams;

  const track = await getResolvedTrack(taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const topic = await prisma.topic.findUnique({ where: { code } });
  if (!topic || !isSubjectInTrack(topic.subjectCode, track, programme)) notFound();

  const difficultyValue = DIFFICULTIES.includes(difficulty as (typeof DIFFICULTIES)[number])
    ? (difficulty as (typeof DIFFICULTIES)[number])
    : undefined;
  const count = Math.min(30, Math.max(5, Number(n) || 10));

  const pool = await prisma.question.findMany({
    where: {
      topicId: topic.id,
      active: true,
      ...trackQuestionWhere(track, programme),
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

  const hasConcept = CONCEPT_MAP.has(topic.code);
  const questions: PracticeQuestion[] = shuffle(pool)
    .slice(0, count)
    .map((question) => ({
      ...question,
      topicCode: topic.code,
      topicTitle: displayTopic(topic, track),
      hasConcept,
    }));

  const backHref = trackLink("/app/practice", track, {
    subject: topic.subjectCode,
    difficulty: difficultyValue,
  });
  const restartHref = trackLink(`/app/practice/topic/${topic.code}`, track, {
    difficulty: difficultyValue,
  });

  if (questions.length === 0) {
    const difficultyLabelZh =
      difficultyValue === "EASY" ? "简单" : difficultyValue === "HARD" ? "困难" : "中等";
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <p className="font-display text-2xl text-ink">
          {track === "CN" ? "暂时没有中文题目" : "No questions for this topic yet"}
        </p>
        <p className="mt-2 text-[13px] text-ink-soft">
          {track === "CN"
            ? `${displayTopic(topic, track)} 还没有可用的中文题目${
                difficultyValue ? `（${difficultyLabelZh}）` : ""
              }。请换一个知识点或难度。`
            : `We are still authoring items for ${topic.titleEn}${
                difficultyValue ? ` at ${difficultyValue.toLowerCase()} difficulty` : ""
              }. Try another topic or difficulty in the meantime.`}
        </p>
        <Link
          href={backHref}
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
        >
          {track === "CN" ? "返回练习" : "Back to practice"}
        </Link>
      </div>
    );
  }

  return (
    <PracticeRunner
      questions={questions}
      title={displayTopic(topic, track)}
      subtitle={
        track === "CN"
          ? `${topic.code} · ${displayUnit(topic, track)}${
              difficultyValue
                ? ` · ${difficultyValue === "EASY" ? "简单" : difficultyValue === "HARD" ? "困难" : "中等"}`
                : ""
            } · ${questions.length} 道题`
          : `${topic.code} · ${displayUnit(topic, track)}${
              difficultyValue ? ` · ${difficultyValue.toLowerCase()}` : ""
            } · ${questions.length} ${plural(questions.length, "question")}`
      }
      backHref={backHref}
      restartHref={restartHref}
      language={track === "CN" ? "zh" : "en"}
    />
  );
}
