import Link from "next/link";
import { Flame } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/practice-runner";

export const metadata = { title: "Smart review" };

export default async function ReviewPracticePage() {
  const session = await requireUser();

  const due = await prisma.reviewItem.findMany({
    where: { userId: session.id, nextReviewAt: { lte: new Date() } },
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
    correctIndex: item.question.correctIndex,
    explanation: item.question.explanation,
    explanationZh: item.question.explanationZh,
    topicCode: item.question.topic.code,
    topicTitle: item.question.topic.titleEn,
    difficulty: item.question.difficulty,
  }));

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <Flame className="mx-auto h-6 w-6 text-ink-faint" />
        <p className="mt-3 font-display text-2xl text-ink">Nothing due right now</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
          Missed questions return on a spaced schedule (1 day, 3 days, then longer). Sit a paper or
          drill a topic to add cards.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link
            href="/app/practice"
            className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            Back to practice
          </Link>
          <Link
            href="/app/mocks"
            className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
          >
            Take a paper
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PracticeRunner
      questions={questions}
      title="Smart review"
      subtitle={`${questions.length} questions due · missed items resurface here`}
      backHref="/app/practice"
      restartHref="/app/practice/review"
    />
  );
}
