"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type SettingsState = { ok?: boolean; error?: string } | null;

export async function updateProfileAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const session = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const track = String(formData.get("track") ?? "");
  const targetYear = Number(formData.get("targetYear") ?? 2027);
  const testLanguage = String(formData.get("testLanguage") ?? "en");

  if (name.length < 2) return { error: "Enter your name." };

  await prisma.user.update({
    where: { id: session.id },
    data: {
      name,
      country: country || null,
      track: track === "STEM" || track === "HUMANITIES" ? track : null,
      targetYear: Number.isFinite(targetYear) && targetYear >= 2026 && targetYear <= 2030 ? targetYear : 2027,
      testLanguage: testLanguage === "zh" ? "zh" : "en",
    },
  });

  revalidatePath("/app/settings");
  revalidatePath("/app/dashboard");
  return { ok: true };
}
