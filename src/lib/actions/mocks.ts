"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { SUBJECT_MAP } from "@/lib/exam";
import { revalidateTrackPath } from "@/lib/section";

function normalise(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function slugify(input: string) {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "paper"}-${Date.now().toString(36)}`;
}

async function syncCount(mockId: string) {
  const count = await prisma.mockItem.count({ where: { mockId } });
  await prisma.mock
    .update({
      where: { id: mockId },
      data: {
        questionCount: count,
        ...(count === 0 ? { published: false } : {}),
      },
    })
    .catch(() => undefined);
}

/** Admin: create an empty paper, then add questions from the bank. */
export async function createMockAction(formData: FormData) {
  await requireAdmin();

  const title = normalise(formData.get("title")).slice(0, 160);
  const subjectCode = normalise(formData.get("subjectCode"));
  const rawDuration = Number(normalise(formData.get("durationMin")));
  const durationMin = Math.min(
    240,
    Math.max(5, Number.isFinite(rawDuration) && rawDuration > 0 ? Math.round(rawDuration) : 60),
  );
  const rawYear = Number(normalise(formData.get("year")));
  const year =
    Number.isFinite(rawYear) && rawYear >= 2024 && rawYear <= 2035 ? Math.round(rawYear) : 2027;
  const paper = normalise(formData.get("paper")).slice(0, 80) || null;
  const isFullLength = normalise(formData.get("isFullLength")) !== "false";

  if (title.length < 3 || !Object.prototype.hasOwnProperty.call(SUBJECT_MAP, subjectCode)) return;

  const mock = await prisma.mock.create({
    data: {
      slug: slugify(title),
      title,
      subjectCode,
      durationMin,
      year,
      paper,
      isFullLength,
      questionCount: 0,
      published: false,
    },
  });

  revalidatePath("/admin/mocks");
  redirect(`/admin/mocks/${mock.id}`);
}

/** Admin: edit a paper's metadata / publish state. */
export async function updateMockAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  if (!id) return;

  let published = normalise(formData.get("published")) === "true";
  if (published) {
    const itemCount = await prisma.mockItem.count({ where: { mockId: id } });
    if (itemCount === 0) published = false;
  }
  const data: {
    title?: string;
    durationMin?: number;
    year?: number;
    paper?: string | null;
    published?: boolean;
  } = { published };

  const title = normalise(formData.get("title")).slice(0, 160);
  const durationMin = Number(normalise(formData.get("durationMin")));
  const year = Number(normalise(formData.get("year")));
  const paper = normalise(formData.get("paper")).slice(0, 80);

  if (title.length >= 3) data.title = title;
  if (Number.isFinite(durationMin) && durationMin > 0) {
    data.durationMin = Math.min(240, Math.max(5, Math.round(durationMin)));
  }
  if (Number.isFinite(year) && year >= 2024 && year <= 2035) {
    data.year = Math.round(year);
  }
  data.paper = paper || null;

  await prisma.mock.update({ where: { id }, data }).catch(() => undefined);
  revalidatePath("/admin/mocks");
  revalidatePath(`/admin/mocks/${id}`);
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
}

/** Admin: add a question from the bank to the paper. */
export async function addQuestionAction(formData: FormData) {
  await requireAdmin();
  const mockId = normalise(formData.get("mockId"));
  const questionId = normalise(formData.get("questionId"));
  if (!mockId || !questionId) return;

  const existing = await prisma.mockItem.findUnique({
    where: { mockId_questionId: { mockId, questionId } },
  });
  if (existing) return;

  const last = await prisma.mockItem.findFirst({
    where: { mockId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.mockItem
    .create({ data: { mockId, questionId, order: (last?.order ?? 0) + 1 } })
    .catch(() => undefined);

  await syncCount(mockId);
  revalidatePath(`/admin/mocks/${mockId}`);
  revalidatePath("/admin/mocks");
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
}

/** Admin: remove a question from the paper. */
export async function removeQuestionAction(formData: FormData) {
  await requireAdmin();
  const mockId = normalise(formData.get("mockId"));
  const itemId = normalise(formData.get("itemId"));
  if (!mockId || !itemId) return;

  await prisma.mockItem.deleteMany({ where: { id: itemId, mockId } }).catch(() => undefined);
  await syncCount(mockId);
  revalidatePath(`/admin/mocks/${mockId}`);
  revalidatePath("/admin/mocks");
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
}

/** Admin: delete a paper entirely. */
export async function deleteMockAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  if (!id) return;

  await prisma.mock.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/admin");
  revalidatePath("/admin/mocks");
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
  redirect("/admin/mocks");
}

/** Admin: toggle published state of a mock paper. */
export async function toggleMockPublishAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  let published = normalise(formData.get("published")) === "true";
  if (!id) return;

  if (published) {
    const itemCount = await prisma.mockItem.count({ where: { mockId: id } });
    if (itemCount === 0) published = false;
  }

  await prisma.mock.updateMany({ where: { id }, data: { published } });
  revalidatePath("/admin");
  revalidatePath("/admin/mocks");
  revalidatePath(`/admin/mocks/${id}`);
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
}

/** Admin: fill remaining slots in a mock paper balanced across syllabus topics. */
export async function autoFillMockAction(formData: FormData) {
  await requireAdmin();
  const mockId = normalise(formData.get("mockId"));
  const rawTarget = Number.parseInt(normalise(formData.get("targetCount")), 10);
  if (!mockId) return;

  const mock = await prisma.mock.findUnique({
    where: { id: mockId },
    include: {
      subject: { select: { questionCount: true } },
      items: {
        select: {
          questionId: true,
          order: true,
          question: { select: { topicId: true } },
        },
      },
    },
  });
  if (!mock) return;

  const defaultTarget = mock.isFullLength ? mock.subject.questionCount : 24;
  const targetCount =
    Number.isInteger(rawTarget) && rawTarget > 0
      ? Math.min(rawTarget, 120)
      : defaultTarget;
  const needed = targetCount - mock.items.length;
  if (needed <= 0) return;

  const existingIds = new Set(mock.items.map((i) => i.questionId));
  const countByTopic = new Map<string, number>();
  for (const item of mock.items) {
    countByTopic.set(
      item.question.topicId,
      (countByTopic.get(item.question.topicId) ?? 0) + 1
    );
  }

  const [topics, candidates] = await Promise.all([
    prisma.topic.findMany({
      where: { subjectCode: mock.subjectCode },
      orderBy: { order: "asc" },
      select: { id: true, weight: true },
    }),
    prisma.question.findMany({
      where: {
        subjectCode: mock.subjectCode,
        active: true,
        id: { notIn: Array.from(existingIds) },
      },
      orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
      select: { id: true, topicId: true },
    }),
  ]);

  const poolByTopic = new Map<string, string[]>();
  for (const c of candidates) {
    const arr = poolByTopic.get(c.topicId) ?? [];
    arr.push(c.id);
    poolByTopic.set(c.topicId, arr);
  }

  const picked: string[] = [];
  while (picked.length < needed) {
    let bestTopicId: string | null = null;
    let bestRatio = Number.POSITIVE_INFINITY;

    for (const t of topics) {
      const pool = poolByTopic.get(t.id);
      if (!pool || pool.length === 0) continue;
      const weight = t.weight > 0 ? t.weight : 1 / Math.max(1, topics.length);
      const ratio = (countByTopic.get(t.id) ?? 0) / weight;
      if (ratio < bestRatio) {
        bestRatio = ratio;
        bestTopicId = t.id;
      }
    }

    if (!bestTopicId) break;
    const nextQ = poolByTopic.get(bestTopicId)?.shift();
    if (!nextQ) break;

    picked.push(nextQ);
    countByTopic.set(bestTopicId, (countByTopic.get(bestTopicId) ?? 0) + 1);
  }

  if (picked.length > 0) {
    const maxOrder = mock.items.reduce((m, i) => Math.max(m, i.order), 0);
    await prisma.mockItem.createMany({
      data: picked.map((questionId, idx) => ({
        mockId,
        questionId,
        order: maxOrder + 1 + idx,
      })),
      skipDuplicates: true,
    });
    await syncCount(mockId);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/mocks/${mockId}`);
  revalidatePath("/admin/mocks");
  revalidateTrackPath("/mocks");
  revalidateTrackPath("/official");
  revalidateTrackPath("/dashboard");
}
