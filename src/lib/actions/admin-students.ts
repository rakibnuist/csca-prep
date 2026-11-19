"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, invalidateSessions, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const ALLOWED_STATUSES = new Set(["PENDING", "APPROVED", "REJECTED"]);
const ALLOWED_PLANS = new Set(["FREE", "PRO", "LIFETIME"]);
const ALLOWED_TEACHING_TRACKS = new Set(["EN", "CN"]);
const ALLOWED_TRACKS = new Set(["HUMANITIES", "STEM"]);
const ALLOWED_TEST_LANGUAGES = new Set(["EN", "ZH"]);
const ALLOWED_LOCALES = new Set(["en", "zh"]);

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function redirectNotice(userId: string, notice: string) {
  redirect(`/admin/students/${encodeURIComponent(userId)}?notice=${encodeURIComponent(notice)}`);
}

function redirectError(userId: string, error: string) {
  redirect(`/admin/students/${encodeURIComponent(userId)}?error=${encodeURIComponent(error)}`);
}

export async function updateStudentAccessAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();

  const userId = str(formData, "userId");
  const status = str(formData, "status");
  const plan = str(formData, "plan");
  const proExpiresAtRaw = str(formData, "proExpiresAt");
  const withFeedback = str(formData, "withFeedback") === "1";

  if (!userId) return;

  const student = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, status: true },
  });
  if (!student || student.role !== "STUDENT") {
    if (withFeedback) redirectError(userId, "Student account not found.");
    return;
  }

  const data: Record<string, unknown> = {};

  if (status && ALLOWED_STATUSES.has(status)) {
    data.status = status;
    if (status === "APPROVED" || status === "REJECTED") {
      data.reviewedAt = new Date();
      data.reviewedBy = admin.id;
    }
    if (status === "REJECTED") {
      data.tokenVersion = { increment: 1 };
    }
  }

  if (plan && ALLOWED_PLANS.has(plan)) {
    data.plan = plan;
    if (plan === "FREE" || plan === "LIFETIME") {
      data.proExpiresAt = null;
    } else if (proExpiresAtRaw) {
      const parsed = new Date(proExpiresAtRaw);
      if (Number.isNaN(parsed.getTime())) {
        if (withFeedback) redirectError(userId, "Invalid Pro expiry date.");
        return;
      }
      data.proExpiresAt = parsed;
    } else {
      data.proExpiresAt = null;
    }
  } else if (proExpiresAtRaw) {
    const parsed = new Date(proExpiresAtRaw);
    if (!Number.isNaN(parsed.getTime())) {
      data.proExpiresAt = parsed;
    }
  }

  if (Object.keys(data).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${userId}`);

  if (withFeedback) {
    redirectNotice(userId, "Access and plan settings updated.");
  }
}

export async function updateStudentProfileAdminAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const userId = str(formData, "userId");
  const name = str(formData, "name");
  const country = str(formData, "country");
  const whatsapp = str(formData, "whatsapp");
  const teachingTrack = str(formData, "teachingTrack");
  const track = str(formData, "track");
  const targetYearRaw = str(formData, "targetYear");
  const testLanguage = str(formData, "testLanguage");
  const uiLocale = str(formData, "uiLocale");

  if (!userId) return;

  const student = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });
  if (!student || student.role !== "STUDENT") {
    redirectError(userId, "Student account not found.");
    return;
  }

  if (!name || name.length < 2) {
    redirectError(userId, "Name must be at least 2 characters.");
    return;
  }

  let targetYear: number | undefined;
  if (targetYearRaw) {
    const parsed = Number.parseInt(targetYearRaw, 10);
    if (Number.isNaN(parsed) || parsed < 2024 || parsed > 2035) {
      redirectError(userId, "Target year must be between 2024 and 2035.");
      return;
    }
    targetYear = parsed;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      country: country || null,
      whatsapp: whatsapp || null,
      teachingTrack: ALLOWED_TEACHING_TRACKS.has(teachingTrack) ? teachingTrack : undefined,
      track: ALLOWED_TRACKS.has(track) ? track : null,
      targetYear,
      testLanguage: ALLOWED_TEST_LANGUAGES.has(testLanguage) ? testLanguage : undefined,
      uiLocale: ALLOWED_LOCALES.has(uiLocale) ? uiLocale : undefined,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${userId}`);
  redirectNotice(userId, "Student study profile saved.");
}

export async function resetStudentPasswordAdminAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const userId = str(formData, "userId");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (!userId) return;

  const student = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });
  if (!student || student.role !== "STUDENT") {
    redirectError(userId, "Student account not found.");
    return;
  }

  if (newPassword.length < 8 || newPassword.length > 128) {
    redirectError(userId, "New password must be 8–128 characters.");
    return;
  }

  const hashed = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashed,
      tokenVersion: { increment: 1 },
    },
  });

  revalidatePath(`/admin/students/${userId}`);
  redirectNotice(userId, "Password reset and active sessions revoked.");
}

export async function revokeStudentSessionsAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const userId = str(formData, "userId");
  if (!userId) return;

  const student = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });
  if (!student || student.role !== "STUDENT") {
    redirectError(userId, "Student account not found.");
    return;
  }

  await invalidateSessions(userId);
  revalidatePath(`/admin/students/${userId}`);
  redirectNotice(userId, "All active sessions signed out.");
}

export async function deleteStudentAttemptAdminAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const attemptId = str(formData, "attemptId");
  const userId = str(formData, "userId");
  if (!attemptId || !userId) return;

  await prisma.attempt.deleteMany({
    where: { id: attemptId, userId },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${userId}`);
  redirectNotice(userId, "Mock attempt removed.");
}
