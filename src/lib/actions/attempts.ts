"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { prisma } from "@/lib/db";
import { canStartAttempt, findResumeableAttempt, startAttempt } from "@/lib/attempts";
import { revalidateTrackPath } from "@/lib/section";
import { isChineseSubject, isPaperAllowedInTrack, parseProgramme, trackLink } from "@/lib/tracks";

export async function startMockAction(formData: FormData) {
  const user = await requireUser();
  const slug = String(formData.get("slug") ?? "");
  // The track is the account's property — never a form/URL override.
  const track = user.teachingTrack === "CN" ? "CN" : "EN";

  const mock = await prisma.mock.findUnique({
    where: { slug },
    include: {
      items: { select: { id: true, question: { select: { stemZh: true } } } },
    },
  });
  if (!mock || (!mock.published && user.role !== "ADMIN")) {
    redirect(trackLink("/app/mocks", track));
  }

  const programme = parseProgramme(user.track);
  if (
    (track === "CN" && !isChineseSubject(mock.subjectCode) && mock.items.some((item) => !item.question.stemZh)) ||
    (user.role !== "ADMIN" && !isPaperAllowedInTrack(mock, track, programme))
  ) {
    redirect(trackLink("/app/mocks", track));
  }

  const resume = await findResumeableAttempt(user.id, mock.id);
  if (resume) redirect(trackLink(`/exam/${slug}`, track));

  // The gate lives on the server. The card UI also hides the button, but that
  // is presentation — this is the check that actually counts.
  const access = await getAccess(user.id);
  const limit = await canStartAttempt(user.id, mock.id, access, track === "CN" ? "zh" : "en");
  if (!limit.canSit) {
    if (limit.reason === "STUDY_ONLY") {
      redirect(trackLink(`/app/official/${slug}`, track));
    }
    redirect(trackLink(`/app/mocks/${slug}`, track, { limit: "reached" }));
  }

  await startAttempt(user.id, mock.id, mock.items.length, track);
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath(`/mocks/${slug}`);
  redirect(trackLink(`/exam/${slug}`, track));
}

export async function abandonAttemptAction(formData: FormData) {
  const user = await requireUser();
  const attemptId = String(formData.get("attemptId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const track = user.teachingTrack === "CN" ? "CN" : "EN";

  await prisma.attempt.deleteMany({
    where: { id: attemptId, userId: user.id, status: "IN_PROGRESS" },
  });

  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath(`/mocks/${slug}`);
  redirect(trackLink(`/app/mocks/${slug}`, track));
}
