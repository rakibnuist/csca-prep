"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function toggleSaveUniversityAction(formData: FormData) {
  const session = await getSession();
  const slug = String(formData.get("slug") ?? "");

  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent(`/universities/${slug}`)}`);
  }

  const university = await prisma.university.findUnique({ where: { slug } });
  if (!university) return;

  const existing = await prisma.savedUniversity.findUnique({
    where: { userId_universityId: { userId: session.id, universityId: university.id } },
  });

  if (existing) {
    await prisma.savedUniversity.delete({ where: { userId_universityId: existing } });
  } else {
    await prisma.savedUniversity.create({
      data: { userId: session.id, universityId: university.id },
    });
  }

  revalidatePath(`/universities/${slug}`);
  revalidatePath("/app/universities");
  revalidatePath("/app/dashboard");
}

export async function removeSavedUniversityAction(formData: FormData) {
  const session = await requireUser();
  const universityId = String(formData.get("universityId") ?? "");

  await prisma.savedUniversity.deleteMany({
    where: { userId: session.id, universityId },
  });

  revalidatePath("/app/universities");
  revalidatePath("/app/dashboard");
}
