"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { CONCEPT_MAP } from "@/lib/concepts";
import { revalidateTrackPath } from "@/lib/section";

/** Toggle a concept's "understood" state for the signed-in student. */
export async function toggleConceptCompleteAction(formData: FormData) {
  const user = await requireUser();
  const topicCode = String(formData.get("topicCode") ?? "").trim();
  if (!topicCode || !CONCEPT_MAP.has(topicCode)) return;

  const existing = await prisma.conceptProgress.findUnique({
    where: { userId_topicCode: { userId: user.id, topicCode } },
  });

  if (existing) {
    await prisma.conceptProgress.delete({ where: { id: existing.id } }).catch(() => undefined);
  } else {
    await prisma.conceptProgress.create({ data: { userId: user.id, topicCode } }).catch(() => undefined);
  }

  revalidateTrackPath("/learn");
  revalidateTrackPath(`/learn/${topicCode}`);
}
