import Link from "next/link";
import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { ArrowLeft, Search, Sparkles, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { MathText } from "@/components/math-text";
import {
  addQuestionAction,
  autoFillMockAction,
  deleteMockAction,
  removeQuestionAction,
  toggleMockPublishAction,
  updateMockAction,
} from "@/lib/actions/mocks";

export const dynamic = "force-dynamic";

const ALLOWED_DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);

function difficultyBadge(diff: string) {
  if (diff === "EASY") return "border-jade/25 bg-jade/10 text-jade";
  if (diff === "HARD") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-gold/25 bg-gold/10 text-gold";
}

export default async function AdminMockDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; topicId?: string; difficulty?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { q: rawQ, topicId: rawTopicId, difficulty: rawDiff } = await searchParams;

  const q = (rawQ ?? "").trim();
  const topicId = (rawTopicId ?? "").trim();
  const difficulty = ALLOWED_DIFFICULTIES.has(rawDiff ?? "") ? (rawDiff as string) : "";

  const mock = await prisma.mock.findUnique({
    where: { id },
    include: {
      subject: true,
      items: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              topic: { select: { id: true, code: true, titleEn: true } },
            },
          },
        },
      },
      _count: { select: { attempts: true } },
    },
  });

  if (!mock) notFound();

  const existingIds = mock.items.map((i) => i.questionId);
  const spec = SUBJECT_MAP[mock.subjectCode as SubjectCode];
  const defaultTarget = mock.isFullLength ? spec?.questionCount ?? mock.subject.questionCount : 24;

  const bankWhere: Prisma.QuestionWhereInput = {
    subjectCode: mock.subjectCode,
    active: true,
    ...(existingIds.length > 0 ? { id: { notIn: existingIds } } : {}),
  };
  if (topicId) bankWhere.topicId = topicId;
  if (difficulty) bankWhere.difficulty = difficulty;
  if (q) {
    bankWhere.OR = [
      { stem: { contains: q, mode: "insensitive" } },
      { stemZh: { contains: q, mode: "insensitive" } },
      { topic: { titleEn: { contains: q, mode: "insensitive" } } },
    ];
  }

  const [topics, bankCandidates] = await Promise.all([
    prisma.topic.findMany({
      where: { subjectCode: mock.subjectCode },
      orderBy: { order: "asc" },
      select: { id: true, code: true, titleEn: true, weight: true },
    }),
    prisma.question.findMany({
      where: bankWhere,
      orderBy: [{ createdAt: "desc" }],
      take: 60,
      include: {
        topic: { select: { id: true, code: true, titleEn: true } },
      },
    }),
  ]);

  // Topic coverage inside current mock
  const topicCounts = new Map<string, number>();
  for (const item of mock.items) {
    topicCounts.set(
      item.question.topicId,
      (topicCounts.get(item.question.topicId) ?? 0) + 1
    );
  }

  const remainingSlots = Math.max(0, defaultTarget - mock.items.length);

  return (
    <div className="space-y-7">
      <div>
        <Link
          href="/admin/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition hover:text-vermillion"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to mock builder
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-line bg-paper-deep/60 px-2 py-0.5 text-[11px] font-semibold text-ink">
                {mock.subjectCode}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${
                  mock.published
                    ? "border-jade/25 bg-jade/10 text-jade"
                    : "border-gold/30 bg-gold/10 text-gold"
                }`}
              >
                {mock.published ? "Published Live" : "Draft"}
              </span>
              <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-ink-soft tabular-nums">
                {mock.items.length} / {defaultTarget} items
              </span>
              <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-ink-soft tabular-nums">
                {mock._count.attempts} student attempts
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
              {mock.title}
            </h1>
            <p className="mt-0.5 text-xs text-ink-faint">
              Slug: {mock.slug} · {mock.durationMin}m · {mock.year}
              {mock.paper ? ` · ${mock.paper}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {remainingSlots > 0 ? (
              <form action={autoFillMockAction} className="flex items-center gap-1.5">
                <input type="hidden" name="mockId" value={mock.id} />
                <input
                  type="number"
                  name="targetCount"
                  defaultValue={defaultTarget}
                  min={1}
                  max={120}
                  className="h-9 w-16 rounded-xl border border-line bg-white px-2 text-center text-xs font-medium text-ink tabular-nums"
                  title="Target question count"
                />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-indigo px-3.5 text-xs font-semibold text-white shadow-xs transition hover:opacity-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Auto-fill balanced set (+{remainingSlots})
                </button>
              </form>
            ) : null}

            <form action={toggleMockPublishAction}>
              <input type="hidden" name="id" value={mock.id} />
              <input
                type="hidden"
                name="published"
                value={mock.published ? "false" : "true"}
              />
              <button
                type="submit"
                disabled={!mock.published && mock.items.length === 0}
                className={`h-9 rounded-xl border px-4 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${
                  mock.published
                    ? "border-line bg-white text-ink hover:border-ink/30"
                    : "border-jade/30 bg-jade text-white hover:opacity-95"
                }`}
              >
                {mock.published ? "Unpublish" : "Publish Paper"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Metadata Editor + Topic Breakdown */}
      <div className="grid gap-5 lg:grid-cols-12">
        <section className="rounded-2xl border border-line bg-white p-5 shadow-xs lg:col-span-7">
          <h2 className="font-display text-base font-semibold text-ink">
            Paper Settings
          </h2>
          <form
            action={updateMockAction}
            className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            <input type="hidden" name="id" value={mock.id} />
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                Title
              </label>
              <input
                name="title"
                required
                defaultValue={mock.title}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                Duration (min)
              </label>
              <input
                type="number"
                name="durationMin"
                defaultValue={mock.durationMin}
                min={5}
                max={240}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                Year
              </label>
              <input
                type="number"
                name="year"
                defaultValue={mock.year}
                min={2024}
                max={2035}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                Paper Code
              </label>
              <input
                name="paper"
                defaultValue={mock.paper ?? ""}
                placeholder="Paper A / 2027"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                Status
              </label>
              <select
                name="published"
                defaultValue={mock.published ? "true" : "false"}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="h-9 w-full rounded-xl bg-vermillion px-3 text-xs font-semibold text-white transition hover:opacity-95"
              >
                Save
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-xs text-ink-faint">
              Removing a paper permanently deletes its questions order and student attempts.
            </span>
            <form action={deleteMockAction}>
              <input type="hidden" name="id" value={mock.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Paper
              </button>
            </form>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-xs lg:col-span-5">
          <h2 className="font-display text-base font-semibold text-ink">
            Topic Balance ({topics.length} syllabus units)
          </h2>
          <p className="text-xs text-ink-soft">
            Current question allocation per topic in this paper.
          </p>
          <div className="mt-3 max-h-44 space-y-1.5 overflow-y-auto pr-1">
            {topics.map((t) => {
              const count = topicCounts.get(t.id) ?? 0;
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-line/70 bg-paper-deep/30 px-2.5 py-1.5 text-xs"
                >
                  <span className="truncate pr-2 text-ink">
                    <span className="font-semibold text-ink-soft">{t.code}</span>{" "}
                    {t.titleEn}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-ink">
                    {count} Q
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 2-Column Paper Builder */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: In this paper */}
        <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                In this paper ({mock.items.length})
              </h2>
              <p className="text-xs text-ink-soft">
                Ordered exam sequence delivered to students.
              </p>
            </div>
          </div>

          {mock.items.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">
              No questions added yet. Use Auto-fill above or pick items from the right panel.
            </p>
          ) : (
            <div className="mt-4 max-h-[720px] space-y-2.5 overflow-y-auto pr-1">
              {mock.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-line bg-paper-deep/25 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                      <span className="rounded bg-ink px-1.5 py-0.5 font-semibold text-white tabular-nums">
                        Q{idx + 1}
                      </span>
                      <span className="rounded border border-line bg-white px-1.5 py-0.5 text-ink-soft">
                        {item.question.topic.code}
                      </span>
                      <span
                        className={`rounded-full border px-1.5 py-0.5 font-semibold uppercase ${difficultyBadge(
                          item.question.difficulty
                        )}`}
                      >
                        {item.question.difficulty}
                      </span>
                    </div>
                    <div className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink">
                      <MathText inline>{item.question.stem}</MathText>
                    </div>
                  </div>
                  <form action={removeQuestionAction} className="shrink-0">
                    <input type="hidden" name="mockId" value={mock.id} />
                    <input type="hidden" name="itemId" value={item.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right: Add from the bank */}
        <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="border-b border-line pb-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Add from the bank ({mock.subjectCode})
            </h2>
            <p className="text-xs text-ink-soft">
              Showing up to 60 available active questions not yet in this paper.
            </p>

            <form method="get" className="mt-3 grid gap-2 sm:grid-cols-4">
              <div className="relative sm:col-span-2">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search stem…"
                  className="h-9 w-full rounded-xl border border-line bg-paper-deep/40 pr-2.5 pl-8 text-xs text-ink focus:border-vermillion focus:bg-white focus:outline-none"
                />
              </div>

              <select
                name="topicId"
                defaultValue={topicId}
                className="h-9 rounded-xl border border-line bg-white px-2 text-xs text-ink focus:border-vermillion focus:outline-none"
              >
                <option value="">All topics</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code} — {t.titleEn}
                  </option>
                ))}
              </select>

              <div className="flex gap-1.5">
                <select
                  name="difficulty"
                  defaultValue={difficulty}
                  className="h-9 flex-1 rounded-xl border border-line bg-white px-2 text-xs text-ink focus:border-vermillion focus:outline-none"
                >
                  <option value="">Any diff</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
                <button
                  type="submit"
                  className="h-9 rounded-xl bg-vermillion px-3 text-xs font-semibold text-white transition hover:opacity-95"
                >
                  Go
                </button>
              </div>
            </form>
          </div>

          {bankCandidates.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">
              No matching available questions left in the {mock.subjectCode} bank.
            </p>
          ) : (
            <div className="mt-4 max-h-[640px] space-y-2.5 overflow-y-auto pr-1">
              {bankCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-line bg-white p-3 transition hover:border-vermillion/35"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                      <span className="rounded border border-line bg-paper-deep/60 px-1.5 py-0.5 text-ink-soft">
                        {cand.topic.code} · {cand.topic.titleEn}
                      </span>
                      <span
                        className={`rounded-full border px-1.5 py-0.5 font-semibold uppercase ${difficultyBadge(
                          cand.difficulty
                        )}`}
                      >
                        {cand.difficulty}
                      </span>
                      {cand.figure ? (
                        <span className="rounded border border-vermillion/20 bg-vermillion/8 px-1.5 py-0.5 text-vermillion">
                          Diagram
                        </span>
                      ) : null}
                      {cand.stemZh ? (
                        <span className="rounded border border-indigo/20 bg-indigo/8 px-1.5 py-0.5 text-indigo">
                          ZH
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink">
                      <MathText inline>{cand.stem}</MathText>
                    </div>
                  </div>
                  <form action={addQuestionAction} className="shrink-0">
                    <input type="hidden" name="mockId" value={mock.id} />
                    <input type="hidden" name="questionId" value={cand.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-vermillion/30 bg-vermillion/10 px-2.5 py-1 text-[11px] font-semibold text-vermillion transition hover:bg-vermillion hover:text-white"
                    >
                      + Add
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
