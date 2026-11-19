import { notFound, redirect } from "next/navigation";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  finalizeAttempt,
  findResumeableAttempt,
  getMockWithQuestions,
  remainingSeconds,
  toPayload,
} from "@/lib/attempts";
import { ExamRunner } from "@/components/exam/exam-runner";
import { getResolvedTrack } from "@/lib/section";
import { isPaperAllowedInTrack, parseProgramme, trackLink } from "@/lib/tracks";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ taught?: string }>;
}) {
  const [{ slug }, { taught }, user] = await Promise.all([
    params,
    searchParams,
    getCurrentUser(),
  ]);
  const track = await getResolvedTrack(taught, user?.teachingTrack);
  const zh = track === "CN";
  const mock = await prisma.mock.findUnique({
    where: { slug },
    select: { title: true, titleZh: true },
  });
  const title = zh && mock?.titleZh ? mock.titleZh : mock?.title;
  return {
    title: title ?? (zh ? "正在考试" : "Exam in progress"),
    robots: { index: false, follow: false },
  };
}

export default async function ExamPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ taught?: string }>;
}) {
  const user = await requireUser();
  const { slug } = await params;
  const { taught } = await searchParams;
  const track = await getResolvedTrack(taught, user.teachingTrack);

  const mock = await getMockWithQuestions(slug);
  if (!mock || (!mock.published && user.role !== "ADMIN")) notFound();
  if (mock.items.length === 0) redirect(trackLink(`/app/mocks/${slug}`, track));

  const programme = parseProgramme(user.track);
  // A Chinese-taught student must never be handed an English-only or cross-track paper.
  if (
    (track === "CN" && mock.subject.kind !== "CHINESE" && mock.items.some((item) => !item.question.stemZh)) ||
    (user.role !== "ADMIN" && !isPaperAllowedInTrack(mock, track, programme))
  ) {
    redirect(trackLink("/app/mocks", track));
  }

  const attempt = await findResumeableAttempt(user.id, mock.id);
  if (!attempt) redirect(trackLink(`/app/mocks/${slug}`, track));

  const remaining = remainingSeconds(attempt.startedAt, mock.durationMin);
  const answers = (attempt.answers ?? {}) as Record<string, number>;

  if (remaining <= 0) {
    const result = await finalizeAttempt(attempt.id, user.id, {
      answers,
      flagged: attempt.flagged,
    });
    redirect(trackLink(`/app/results/${result?.id ?? attempt.id}`, track, { auto: 1 }));
  }

  const questions = toPayload(mock, track === "CN" ? "zh" : "en");
  const endAtMs = attempt.startedAt.getTime() + mock.durationMin * 60 * 1000;

  return (
    <ExamRunner
      attemptId={attempt.id}
      slug={slug}
      title={track === "CN" && mock.titleZh ? mock.titleZh : mock.title}
      subjectName={track === "CN" ? mock.subject.nameZh : mock.subject.nameEn}
      subjectCode={mock.subject.code}
      questions={questions}
      initialAnswers={answers}
      initialFlagged={attempt.flagged}
      initialRemaining={remaining}
      endAtMs={endAtMs}
      durationMin={mock.durationMin}
      bilingual={mock.subject.language === "en+zh"}
      language={track === "CN" ? "zh" : "en"}
    />
  );
}
