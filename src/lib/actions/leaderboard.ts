"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { revalidateTrackPath } from "@/lib/section";

export async function updateLeaderboardSettingsAction(formData: FormData) {
  const user = await requireUser();
  const optIn = formData.get("optIn") === "on" || formData.get("optIn") === "true";
  const rawName = String(formData.get("name") || "").trim().slice(0, 40);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      leaderboardOptIn: optIn,
      leaderboardName: optIn && rawName ? rawName : null,
    },
  });
  revalidateTrackPath("/leaderboard");
  revalidateTrackPath("/dashboard");
}
