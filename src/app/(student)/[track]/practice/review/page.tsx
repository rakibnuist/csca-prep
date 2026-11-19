import Link from "next/link";
import { Flame } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";
import { CONCEPT_MAP } from "@/lib/concepts";
import { plural } from "@/lib/utils";
import { displayTopic, parseProgramme, trackLink, trackMetaTitle, trackQuestionWhere } from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Smart review", "智能复习");
}

export default async function ReviewPracticePage({
  searchParams,
}: {
  searchParams: Promise<{ taught?: string }>;
}) {
  const session = await requireUser();
  const { taught } = await searchParams;
  const track = await getResolvedTrack(taught, session.teachingTrack);
  const programme = parseProgramme(session.track);

  const due = await prisma.reviewItem.findMany({
    where: {
      userId: session.id,
      nextReviewAt: { lte: new Date() },
      question: trackQuestionWhere(track, programme),
    },
    include: { question: { include: { topic: true } } },
    orderBy: { nextReviewAt: "asc" },
    take: 12,
  });

  const questions: PracticeQuestion[] = due.map((item) => ({
    id: item.question.id,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    figure: item.question.figure,
    correctIndex: item.question.correctIndex,
    explanation: item.question.explanation,
    explanationZh: item.question.explanationZh,
    topicCode: item.question.topic.code,
    topicTitle: displayTopic(item.question.topic, track),
    difficulty: item.question.difficulty,
    hasConcept: CONCEPT_MAP.has(item.question.topic.code),
  }));

  const backHref = trackLink("/app/practice", track);
  const restartHref = trackLink("/app/practice/review", track);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <Flame className="mx-auto h-6 w-6 text-ink-faint" />
        <p className="mt-3 font-display text-2xl text-ink">
          {track === "CN" ? "暂时没有需要复习的题目" : "Nothing due right now"}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
          {track === "CN"
            ? "错题会按间隔复习（1 天、3 天，然后更长）回到这里。做一套题或练一个知识点即可加入。"
            : "Missed questions return on a spaced schedule (1 day, 3 days, then longer). Sit a paper or drill a topic to add cards."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href={backHref}
            className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            {track === "CN" ? "返回练习" : "Back to practice"}
          </Link>
          <Link
            href={trackLink("/app/mocks", track)}
            className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
          >
            {track === "CN" ? "做一套模拟卷" : "Take a paper"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PracticeRunner
      questions={questions}
      title={track === "CN" ? "智能复习" : "Smart review"}
      subtitle={
        track === "CN"
          ? `${questions.length} 道待复习 · 做错的题会按间隔回到这里`
          : `${questions.length} ${plural(questions.length, "question")} due · missed items resurface here`
      }
      backHref={backHref}
      restartHref={restartHref}
      language={track === "CN" ? "zh" : "en"}
    />
  );
}
