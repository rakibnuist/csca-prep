"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canStartAttempt, findResumeableAttempt, startAttempt } from "@/lib/attempts";

export async function startMockAction(formData: FormData) {
  const user = await requireUser();
  const slug = String(formData.get("slug") ?? "");

  const mock = await prisma.mock.findUnique({
    where: { slug },
    include: { items: { select: { id: true } } },
  });
  if (!mock) redirect("/app/mocks");

  const resume = await findResumeableAttempt(user.id, mock.id);
  if (resume) redirect(`/exam/${slug}`);

  const limit = await canStartAttempt(user.id, mock.id);
  if (!limit.allowed) {
    redirect(`/app/mocks/${slug}?limit=reached`);
  }

  await startAttempt(user.id, mock.id, mock.items.length);
  revalidatePath(`/app/mocks/${slug}`);
  redirect(`/exam/${slug}`);
}

export async function abandonAttemptAction(formData: FormData) {
  const user = await requireUser();
  const attemptId = String(formData.get("attemptId") ?? "");
  const slug = String(formData.get("slug") ?? "");

  await prisma.attempt.deleteMany({
    where: { id: attemptId, userId: user.id, status: "IN_PROGRESS" },
  });

  revalidatePath(`/app/mocks/${slug}`);
  redirect(`/app/mocks/${slug}`);
}
