"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidateTrackPath } from "@/lib/section";
import { parseTrack } from "@/lib/tracks";

export type SettingsState = { ok?: boolean; error?: string } | null;

export async function updateProfileAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const session = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim().slice(0, 80);
  const track = String(formData.get("track") ?? "");
  const targetYear = Number(formData.get("targetYear") ?? 2027);
  const testLanguage = String(formData.get("testLanguage") ?? "en");

  const prevTrack = parseTrack(session.teachingTrack) ?? "EN";
  const nextTrack = testLanguage === "zh" ? "CN" : "EN";
  const zh = prevTrack === "CN" || nextTrack === "CN";

  if (name.length < 2) {
    return { error: zh ? "请输入姓名（至少 2 个字符）。" : "Enter your name." };
  }
  if (name.length > 120) {
    return { error: zh ? "姓名过长，请控制在 120 个字符以内。" : "Name must be 120 characters or fewer." };
  }

  await prisma.user.update({
    where: { id: session.id },
    data: {
      name,
      country: country || null,
      track: track === "STEM" || track === "HUMANITIES" ? track : null,
      targetYear: Number.isFinite(targetYear) && targetYear >= 2026 && targetYear <= 2030 ? targetYear : 2027,
      testLanguage: nextTrack === "CN" ? "zh" : "en",
      uiLocale: nextTrack === "CN" ? "zh" : "en",
      teachingTrack: nextTrack,
    },
  });

  const store = await cookies();
  store.set("csca_taught", nextTrack, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });

  revalidateTrackPath("/settings");
  revalidateTrackPath("/dashboard");

  if (nextTrack !== prevTrack) {
    redirect(`/${nextTrack === "CN" ? "cn" : "en"}/settings?saved=1`);
  }

  return { ok: true };
}
