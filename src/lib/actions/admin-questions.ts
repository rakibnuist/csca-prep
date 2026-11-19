"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const ALLOWED_SUBJECTS = new Set(["MATH", "PHYS", "CHEM", "CH_HUM", "CH_SCI"]);
const ALLOWED_DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safeAdminContentReturn(raw: string): string {
  if (raw.startsWith("/admin/content") && !raw.startsWith("//")) {
    return raw;
  }
  return "/admin/content";
}

function appendFeedback(basePath: string, key: "notice" | "error", msg: string) {
  const url = new URL(basePath, "http://localhost");
  url.searchParams.delete("notice");
  url.searchParams.delete("error");
  url.searchParams.set(key, msg);
  return `${url.pathname}${url.search}`;
}

function cleanTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function cleanFigure(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (!v.startsWith("/") || v.startsWith("//")) return null;
  return v;
}

export async function toggleQuestionActiveAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const questionId = str(formData, "questionId");
  const nextActive = str(formData, "active") === "true";

  if (!questionId) return;

  await prisma.question.updateMany({
    where: { id: questionId },
    data: { active: nextActive },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/content");
  revalidatePath("/admin/mocks");
}

export async function updateQuestionAdminAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const questionId = str(formData, "questionId");
  const returnTo = safeAdminContentReturn(str(formData, "returnTo"));
  const topicId = str(formData, "topicId");
  const difficulty = str(formData, "difficulty");
  const stem = str(formData, "stem");
  const stemZh = str(formData, "stemZh") || null;
  const explanation = str(formData, "explanation");
  const explanationZh = str(formData, "explanationZh") || null;
  const figure = cleanFigure(str(formData, "figure"));
  const source = str(formData, "source") || "CSCA Master original";
  const tags = cleanTags(str(formData, "tags"));
  const active = str(formData, "active") !== "false";
  const correctIndex = Number.parseInt(str(formData, "correctIndex"), 10);

  const options = [
    str(formData, "option0"),
    str(formData, "option1"),
    str(formData, "option2"),
    str(formData, "option3"),
  ];
  const optionsZhRaw = [
    str(formData, "optionZh0"),
    str(formData, "optionZh1"),
    str(formData, "optionZh2"),
    str(formData, "optionZh3"),
  ];
  const optionsZh = optionsZhRaw.some(Boolean) ? optionsZhRaw : [];

  if (!questionId) {
    redirect(appendFeedback(returnTo, "error", "Missing question ID."));
  }

  const existing = await prisma.question.findUnique({
    where: { id: questionId },
    select: { id: true, subjectCode: true },
  });
  if (!existing) {
    redirect(appendFeedback(returnTo, "error", "Question not found."));
  }

  if (!stem) {
    redirect(appendFeedback(returnTo, "error", "Question stem is required."));
  }
  if (options.some((opt) => !opt)) {
    redirect(appendFeedback(returnTo, "error", "All 4 options (A–D) are required."));
  }
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    redirect(appendFeedback(returnTo, "error", "Correct option index must be A–D."));
  }
  if (!ALLOWED_DIFFICULTIES.has(difficulty)) {
    redirect(appendFeedback(returnTo, "error", "Invalid difficulty selected."));
  }

  const topic = await prisma.topic.findFirst({
    where: { id: topicId, subjectCode: existing.subjectCode },
    select: { id: true },
  });
  if (!topic) {
    redirect(appendFeedback(returnTo, "error", "Topic does not belong to this subject."));
  }

  await prisma.question.update({
    where: { id: questionId },
    data: {
      topicId: topic.id,
      difficulty,
      stem,
      stemZh,
      options,
      optionsZh,
      figure,
      correctIndex,
      explanation: explanation || "See key steps in the topic notes.",
      explanationZh,
      source,
      tags,
      active,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/content");
  revalidatePath("/admin/mocks");
  redirect(appendFeedback(returnTo, "notice", "Question updated."));
}

export async function createQuestionAdminAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const subjectCode = str(formData, "subjectCode");
  const topicId = str(formData, "topicId");
  const difficulty = str(formData, "difficulty");
  const stem = str(formData, "stem");
  const stemZh = str(formData, "stemZh") || null;
  const explanation = str(formData, "explanation");
  const explanationZh = str(formData, "explanationZh") || null;
  const figure = cleanFigure(str(formData, "figure"));
  const source = str(formData, "source") || "CSCA Master original";
  const tags = cleanTags(str(formData, "tags"));
  const correctIndex = Number.parseInt(str(formData, "correctIndex"), 10);

  const options = [
    str(formData, "option0"),
    str(formData, "option1"),
    str(formData, "option2"),
    str(formData, "option3"),
  ];
  const optionsZhRaw = [
    str(formData, "optionZh0"),
    str(formData, "optionZh1"),
    str(formData, "optionZh2"),
    str(formData, "optionZh3"),
  ];
  const optionsZh = optionsZhRaw.some(Boolean) ? optionsZhRaw : [];

  if (!ALLOWED_SUBJECTS.has(subjectCode)) {
    redirect(appendFeedback("/admin/content", "error", "Invalid subject selected."));
  }
  if (!ALLOWED_DIFFICULTIES.has(difficulty)) {
    redirect(appendFeedback("/admin/content", "error", "Invalid difficulty selected."));
  }
  if (!stem) {
    redirect(appendFeedback("/admin/content", "error", "Question stem is required."));
  }
  if (options.some((opt) => !opt)) {
    redirect(appendFeedback("/admin/content", "error", "All 4 options (A–D) are required."));
  }
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    redirect(appendFeedback("/admin/content", "error", "Correct option index must be A–D."));
  }

  const topic = await prisma.topic.findFirst({
    where: { id: topicId, subjectCode },
    select: { id: true },
  });
  if (!topic) {
    redirect(
      appendFeedback(
        "/admin/content",
        "error",
        "Selected topic does not match the selected subject."
      )
    );
  }

  await prisma.question.create({
    data: {
      subjectCode,
      topicId: topic.id,
      difficulty,
      stem,
      stemZh,
      options,
      optionsZh,
      figure,
      correctIndex,
      explanation: explanation || "Review the underlying theorem or definition.",
      explanationZh,
      source,
      tags,
      active: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/content");
  revalidatePath("/admin/mocks");
  redirect(
    appendFeedback(
      `/admin/content?subject=${encodeURIComponent(subjectCode)}`,
      "notice",
      "New question created and added to bank."
    )
  );
}
