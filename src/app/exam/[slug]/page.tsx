import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import {
  finalizeAttempt,
  findResumeableAttempt,
  getMockWithQuestions,
  remainingSeconds,
  toPayload,
} from "@/lib/attempts";
import { ExamRunner } from "@/components/exam/exam-runner";

export const metadata = {
  title: "Exam in progress",
  robots: { index: false, follow: false },
};

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;

  const mock = await getMockWithQuestions(slug);
  if (!mock) notFound();

  const attempt = await findResumeableAttempt(user.id, mock.id);
  if (!attempt) redirect(`/app/mocks/${slug}`);

  const remaining = remainingSeconds(attempt.startedAt, mock.durationMin);
  const answers = (attempt.answers ?? {}) as Record<string, number>;

  if (remaining <= 0) {
    const result = await finalizeAttempt(attempt.id, user.id, {
      answers,
      flagged: attempt.flagged,
    });
    redirect(`/app/results/${result?.id ?? attempt.id}?auto=1`);
  }

  const questions = toPayload(mock);
  const endAtMs = attempt.startedAt.getTime() + mock.durationMin * 60 * 1000;

  return (
    <ExamRunner
      attemptId={attempt.id}
      slug={slug}
      title={mock.title}
      subjectName={mock.subject.nameEn}
      subjectCode={mock.subject.code}
      questions={questions}
      initialAnswers={answers}
      initialFlagged={attempt.flagged}
      initialRemaining={remaining}
      endAtMs={endAtMs}
      durationMin={mock.durationMin}
      bilingual={mock.subject.language === "en+zh"}
    />
  );
}
