import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";
import { CONCEPT_MAP } from "@/lib/concepts";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import {
  defaultSubjectFor,
  displaySubject,
  isSubjectInTrack,
  parseProgramme,
  subjectQuestionWhere,
  trackLink,
  trackMetaTitle,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Quick drill", "快速 10 题");
}

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;

function difficultyZh(value: string) {
  return value === "EASY" ? "简单" : value === "HARD" ? "困难" : "中等";
}

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
  searchParams: Promise<{
    subject?: string;
    difficulty?: string;
    n?: string;
    timer?: string;
    mode?: string;
    taught?: string;
  }>;
}) {
  const user = await requireUser();
  const { subject: subjectParam, difficulty, n, timer, mode, taught } = await searchParams;

  const track = await getResolvedTrack(taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const subjectCode = (
    subjectParam && isSubjectInTrack(subjectParam, track, programme)
      ? subjectParam
      : defaultSubjectFor(track, programme)
  ) as SubjectCode;
  const subject = SUBJECT_MAP[subjectCode];

  const difficultyValue = DIFFICULTIES.includes(difficulty as (typeof DIFFICULTIES)[number])
    ? (difficulty as (typeof DIFFICULTIES)[number])
    : undefined;
  const modeValue = mode === "weak" || mode === "bookmarked" ? mode : "all";
  const timerMin = Math.min(120, Math.max(0, Number(timer) || 0));
  const count = Math.min(48, Math.max(5, Number(n) || 10));

  let modeQuestionIds: string[] | undefined;
  if (modeValue === "weak" || modeValue === "bookmarked") {
    const modeRows = await prisma.reviewItem.findMany({
      where: {
        userId: user.id,
        ...(modeValue === "weak" ? { wrongCount: { gt: 0 } } : { bookmarked: true }),
      },
      select: { questionId: true },
    });
    modeQuestionIds = modeRows.map((r) => r.questionId);
  }

  const pool =
    modeQuestionIds && modeQuestionIds.length === 0
      ? []
      : await prisma.question.findMany({
          where: {
            active: true,
            ...subjectQuestionWhere(subjectCode, track),
            ...(difficultyValue ? { difficulty: difficultyValue } : {}),
            ...(modeQuestionIds ? { id: { in: modeQuestionIds } } : {}),
          },
          include: { topic: { select: { code: true, titleEn: true, titleZh: true } } },
          orderBy: { id: "asc" },
        });

  const picked = shuffle(pool).slice(0, count);
  const reviewRows =
    picked.length > 0
      ? await prisma.reviewItem.findMany({
          where: {
            userId: user.id,
            questionId: { in: picked.map((q) => q.id) },
          },
          select: { questionId: true, bookmarked: true, note: true },
        })
      : [];
  const reviewMap = new Map(reviewRows.map((r) => [r.questionId, r]));

  const questions: PracticeQuestion[] = picked.map((question) => {
    const meta = reviewMap.get(question.id);
    return {
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
      topicTitle: track === "CN" ? question.topic.titleZh : question.topic.titleEn,
      hasConcept: CONCEPT_MAP.has(question.topic.code),
      bookmarked: meta?.bookmarked ?? false,
      note: meta?.note ?? null,
    };
  });

  const backHref = trackLink("/app/practice", track, {
    subject: subjectCode,
    difficulty: difficultyValue,
  });

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <p className="font-display text-2xl text-ink">
          {track === "CN" ? "暂无可用题目" : "No questions match this filter yet"}
        </p>
        <p className="mt-2 text-[13px] text-ink-soft">
          {modeValue === "bookmarked"
            ? track === "CN"
              ? "你还没有在该科目中收藏过题目。"
              : "You haven't bookmarked any questions in this subject yet."
            : modeValue === "weak"
              ? track === "CN"
                ? "你还没有该科目的错题记录。"
                : "No missed items recorded in this subject yet."
              : track === "CN"
                ? "当前科目和难度下暂无可用中文题目，请尝试调整难度或更换科目。"
                : "Try switching the difficulty or choosing another subject."}
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
      title={
        track === "CN"
          ? `${displaySubject(subject, track)} · ${timerMin > 0 ? `计时 ${timerMin} 分钟` : "自定义练习"}`
          : `${displaySubject(subject, track)} · ${timerMin > 0 ? `Timed ${timerMin}m drill` : count === 10 && modeValue === "all" ? "Quick drill" : "Custom drill"}`
      }
      subtitle={
        track === "CN"
          ? `共 ${questions.length} 道题${difficultyValue ? ` · ${difficultyZh(difficultyValue)}` : ""}${timerMin > 0 ? ` · 限时 ${timerMin} 分钟` : ""}`
          : `${questions.length} questions${difficultyValue ? ` · ${difficultyValue.toLowerCase()}` : ""}${timerMin > 0 ? ` · ${timerMin} min timer` : ""}`
      }
      backHref={backHref}
      restartHref={trackLink("/app/practice/quick", track, {
        subject: subjectCode,
        difficulty: difficultyValue,
      })}
      language={track === "CN" ? "zh" : "en"}
      durationMin={timerMin > 0 ? timerMin : undefined}
    />
  );
}
