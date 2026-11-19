import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { ChevronDown, ImageIcon, Languages, Plus, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { SUBJECTS } from "@/lib/exam";
import { MathText } from "@/components/math-text";
import {
  createQuestionAdminAction,
  toggleQuestionActiveAction,
  updateQuestionAdminAction,
} from "@/lib/actions/admin-questions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;
const ALLOWED_SUBJECTS = new Set(["MATH", "PHYS", "CHEM", "CH_HUM", "CH_SCI"]);
const ALLOWED_DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);
const OPTION_LABELS = ["A", "B", "C", "D"];

function difficultyBadge(diff: string) {
  if (diff === "EASY") return "border-jade/25 bg-jade/10 text-jade";
  if (diff === "HARD") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-gold/25 bg-gold/10 text-gold";
}

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams: Promise<{
    subject?: string;
    difficulty?: string;
    status?: string;
    filter?: string;
    q?: string;
    page?: string;
    notice?: string;
    error?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const subject = ALLOWED_SUBJECTS.has(params.subject ?? "")
    ? (params.subject as string)
    : "";
  const difficulty = ALLOWED_DIFFICULTIES.has(params.difficulty ?? "")
    ? (params.difficulty as string)
    : "";
  const status =
    params.status === "ACTIVE" || params.status === "PAUSED" ? params.status : "";
  const filter =
    params.filter === "WITH_FIGURE" ||
    params.filter === "MISSING_ZH" ||
    params.filter === "REPORTED"
      ? params.filter
      : "";
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const notice = params.notice;
  const error = params.error;

  const where: Prisma.QuestionWhereInput = {};
  if (subject) where.subjectCode = subject;
  if (difficulty) where.difficulty = difficulty;
  if (status === "ACTIVE") where.active = true;
  if (status === "PAUSED") where.active = false;
  if (filter === "WITH_FIGURE") where.figure = { not: null };
  if (filter === "MISSING_ZH") where.stemZh = null;
  if (filter === "REPORTED") where.tags = { has: "needs-review" };
  if (q) {
    where.OR = [
      { stem: { contains: q, mode: "insensitive" } },
      { stemZh: { contains: q, mode: "insensitive" } },
      { explanation: { contains: q, mode: "insensitive" } },
      { source: { contains: q, mode: "insensitive" } },
      { topic: { titleEn: { contains: q, mode: "insensitive" } } },
      { topic: { code: { contains: q, mode: "insensitive" } } },
    ];
  }

  const [
    totalFiltered,
    questions,
    topics,
    activeGroups,
    zhGroups,
    figureGroups,
  ] = await Promise.all([
    prisma.question.count({ where }),
    prisma.question.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        topic: { select: { id: true, code: true, titleEn: true } },
        _count: { select: { mockItems: true } },
      },
    }),
    prisma.topic.findMany({
      orderBy: [{ subjectCode: "asc" }, { order: "asc" }],
      select: { id: true, code: true, subjectCode: true, titleEn: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { active: true },
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { active: true, stemZh: { not: null } },
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { active: true, figure: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const topicsBySubject = new Map<string, typeof topics>();
  for (const t of topics) {
    const list = topicsBySubject.get(t.subjectCode) ?? [];
    list.push(t);
    topicsBySubject.set(t.subjectCode, list);
  }

  const buildPageHref = (targetPage: number) => {
    const sp = new URLSearchParams();
    if (subject) sp.set("subject", subject);
    if (difficulty) sp.set("difficulty", difficulty);
    if (status) sp.set("status", status);
    if (filter) sp.set("filter", filter);
    if (q) sp.set("q", q);
    if (targetPage > 1) sp.set("page", String(targetPage));
    const qs = sp.toString();
    return `/admin/content${qs ? `?${qs}` : ""}`;
  };

  const currentReturnUrl = buildPageHref(page);

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
            Curriculum &amp; Question Bank
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Content Bank
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Browse bilingual stems, verify diagrams &amp; KaTeX formulas, edit items inline, or author new questions.
          </p>
        </div>

        <Link
          href="/admin/mocks"
          className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-vermillion/40 hover:text-vermillion"
        >
          Mock paper builder →
        </Link>
      </div>

      {notice ? (
        <div className="rounded-xl border border-jade/30 bg-jade/10 px-4 py-2.5 text-sm font-medium text-jade">
          {notice}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      {/* Subject Summary Filter Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {SUBJECTS.map((sub) => {
          const activeCount =
            activeGroups.find((g) => g.subjectCode === sub.code)?._count._all ?? 0;
          const zhCount =
            zhGroups.find((g) => g.subjectCode === sub.code)?._count._all ?? 0;
          const figCount =
            figureGroups.find((g) => g.subjectCode === sub.code)?._count._all ?? 0;
          const selected = subject === sub.code;

          return (
            <Link
              key={sub.code}
              href={selected ? "/admin/content" : `/admin/content?subject=${sub.code}`}
              className={`rounded-2xl border p-4 shadow-xs transition ${
                selected
                  ? "border-vermillion bg-vermillion/6"
                  : "border-line bg-white hover:border-vermillion/35"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                  {sub.code}
                </span>
                <span className="font-display text-xl font-semibold tabular-nums text-ink">
                  {activeCount}
                </span>
              </div>
              <p className="mt-1 truncate text-xs font-medium text-ink">{sub.shortEn}</p>
              <p className="mt-2 text-[11px] text-ink-soft">
                {zhCount} ZH · {figCount} diagrams
              </p>
            </Link>
          );
        })}
      </div>

      {/* Collapsible + Create New Question */}
      <details className="group rounded-2xl border border-line bg-white shadow-xs">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="rounded-lg bg-vermillion/10 p-1.5 text-vermillion">
              <Plus className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Create New Question
              </h2>
              <p className="text-xs text-ink-soft">
                Supports inline/display LaTeX ($…$, $$…$$), bilingual Chinese translation, and `/diagrams/...` figure paths.
              </p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-ink-faint transition group-open:rotate-180" />
        </summary>

        <form
          action={createQuestionAdminAction}
          className="space-y-4 border-t border-line p-5"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Subject
              </label>
              <select
                name="subjectCode"
                defaultValue={subject || "MATH"}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} — {s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Syllabus Topic (match subject)
              </label>
              <select
                name="topicId"
                required
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.subjectCode}] {t.code} — {t.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Difficulty
              </label>
              <select
                name="difficulty"
                defaultValue="MEDIUM"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Stem (English / Primary) *
              </label>
              <textarea
                name="stem"
                required
                rows={3}
                placeholder="If $f(x) = x^2 - 4x + 5$, find the minimum value..."
                className="mt-1 w-full rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Stem Chinese (optional)
              </label>
              <textarea
                name="stemZh"
                rows={3}
                placeholder="若 $f(x) = x^2 - 4x + 5$，则其最小值为..."
                className="mt-1 w-full rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {OPTION_LABELS.map((lbl, idx) => (
              <div key={lbl} className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Option {lbl} *
                </label>
                <input
                  name={`option${idx}`}
                  required
                  placeholder={`Option ${lbl}`}
                  className="h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                />
                <input
                  name={`optionZh${idx}`}
                  placeholder={`选项 ${lbl} (optional)`}
                  className="h-8 w-full rounded-xl border border-line bg-paper-deep/40 px-3 text-xs text-ink focus:border-vermillion focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Correct Option
              </label>
              <select
                name="correctIndex"
                defaultValue="0"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              >
                {OPTION_LABELS.map((lbl, idx) => (
                  <option key={lbl} value={idx}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Diagram Path (optional)
              </label>
              <input
                name="figure"
                placeholder="/diagrams/math-q1.svg"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Source
              </label>
              <input
                name="source"
                defaultValue="CSCA Master original"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Tags (comma-separated)
              </label>
              <input
                name="tags"
                placeholder="quadratic, vertex, official-style"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Explanation (English)
              </label>
              <textarea
                name="explanation"
                rows={2}
                placeholder="Step-by-step worked solution..."
                className="mt-1 w-full rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Explanation Chinese (optional)
              </label>
              <textarea
                name="explanationZh"
                rows={2}
                placeholder="解析步骤..."
                className="mt-1 w-full rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-vermillion px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-95"
            >
              Add Question to Bank
            </button>
          </div>
        </form>
      </details>

      {/* Filter Bar */}
      <form
        method="get"
        className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs sm:grid-cols-2 lg:grid-cols-6"
      >
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search stem, explanation, topic code…"
            className="h-10 w-full rounded-xl border border-line bg-paper-deep/40 pr-3 pl-9 text-sm text-ink placeholder:text-ink-faint focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>

        <select
          name="subject"
          defaultValue={subject}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">All subjects</option>
          {SUBJECTS.map((s) => (
            <option key={s.code} value={s.code}>
              {s.code} — {s.shortEn}
            </option>
          ))}
        </select>

        <select
          name="difficulty"
          defaultValue={difficulty}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">All difficulties</option>
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>

        <select
          name="status"
          defaultValue={status}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">Active &amp; paused</option>
          <option value="ACTIVE">Active only</option>
          <option value="PAUSED">Paused only</option>
        </select>

        <div className="flex items-center gap-2">
          <select
            name="filter"
            defaultValue={filter}
            className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
          >
            <option value="">Any media/lang</option>
            <option value="WITH_FIGURE">With diagram</option>
            <option value="MISSING_ZH">Missing ZH</option>
            <option value="REPORTED">Reported by students</option>
          </select>
          <button
            type="submit"
            className="h-10 rounded-xl bg-vermillion px-4 text-xs font-semibold text-white transition hover:opacity-95"
          >
            Filter
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
        <span>
          Showing{" "}
          <strong className="text-ink">
            {totalFiltered === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, totalFiltered)}
          </strong>{" "}
          of <strong className="text-ink">{totalFiltered}</strong> matching questions
        </span>
        {subject || difficulty || status || filter || q ? (
          <Link href="/admin/content" className="font-medium text-vermillion hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {questions.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-10 text-center text-sm text-ink-soft">
            No questions match the selected filters.
          </div>
        ) : (
          questions.map((item) => {
            const subjectTopics = topicsBySubject.get(item.subjectCode) ?? [];

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded border border-line bg-paper-deep/60 px-2 py-0.5 text-[10.5px] font-semibold text-ink">
                        {item.subjectCode}
                      </span>
                      <span className="rounded border border-line px-2 py-0.5 text-[10.5px] text-ink-soft">
                        {item.topic.code} · {item.topic.titleEn}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${difficultyBadge(
                          item.difficulty
                        )}`}
                      >
                        {item.difficulty}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          item.active
                            ? "border-jade/25 bg-jade/10 text-jade"
                            : "border-line bg-paper-deep text-ink-faint"
                        }`}
                      >
                        {item.active ? "Active" : "Paused"}
                      </span>
                      {item.stemZh ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-indigo/20 bg-indigo/8 px-2 py-0.5 text-[10px] font-medium text-indigo">
                          <Languages className="h-3 w-3" />
                          ZH
                        </span>
                      ) : null}
                      {item.figure ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-vermillion/20 bg-vermillion/8 px-2 py-0.5 text-[10px] font-medium text-vermillion">
                          <ImageIcon className="h-3 w-3" />
                          Diagram
                        </span>
                      ) : null}
                      {item.tags.includes("needs-review") ? (
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 uppercase">
                          Reported
                        </span>
                      ) : null}
                      <span className="text-[11px] text-ink-faint">
                        Used in {item._count.mockItems} mock{item._count.mockItems === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="mt-2.5 text-sm leading-relaxed text-ink">
                      <MathText>{item.stem}</MathText>
                    </div>
                  </div>

                  <form action={toggleQuestionActiveAction} className="shrink-0">
                    <input type="hidden" name="questionId" value={item.id} />
                    <input
                      type="hidden"
                      name="active"
                      value={item.active ? "false" : "true"}
                    />
                    <button
                      type="submit"
                      className={`rounded-lg border px-3 py-1 text-xs font-semibold transition ${
                        item.active
                          ? "border-line bg-paper-deep/50 text-ink-soft hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                          : "border-jade/30 bg-jade/10 text-jade hover:bg-jade hover:text-white"
                      }`}
                    >
                      {item.active ? "Pause" : "Activate"}
                    </button>
                  </form>
                </div>

                {/* Expandable Preview & Inline Edit */}
                <details className="border-t border-line bg-paper-deep/25">
                  <summary className="cursor-pointer px-5 py-2.5 text-xs font-medium text-ink-soft transition hover:text-vermillion">
                    Inspect bilingual preview, diagram &amp; edit inline
                  </summary>

                  <div className="space-y-5 border-t border-line bg-white p-5">
                    {/* Preview block */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-3 rounded-xl border border-line bg-paper-deep/30 p-4">
                        <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                          Rendered Student View
                        </p>
                        <div className="text-sm text-ink">
                          <MathText>{item.stem}</MathText>
                        </div>
                        {item.stemZh ? (
                          <div className="border-t border-line/70 pt-2 text-xs text-ink-soft">
                            <MathText>{item.stemZh}</MathText>
                          </div>
                        ) : null}
                        <ul className="space-y-1.5 pt-1 text-xs">
                          {item.options.map((opt, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 rounded-lg border px-2.5 py-1.5 ${
                                idx === item.correctIndex
                                  ? "border-jade/35 bg-jade/10 font-medium text-ink"
                                  : "border-line bg-white text-ink-soft"
                              }`}
                            >
                              <span className="font-semibold">
                                {OPTION_LABELS[idx] ?? idx + 1}.
                              </span>
                              <div className="flex-1">
                                <MathText inline>{opt}</MathText>
                                {item.optionsZh[idx] ? (
                                  <span className="ml-2 text-ink-faint">
                                    (<MathText inline>{item.optionsZh[idx]}</MathText>)
                                  </span>
                                ) : null}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-line/70 pt-2 text-xs text-ink-soft">
                          <span className="font-semibold text-ink">Explanation: </span>
                          <MathText>{item.explanation}</MathText>
                        </div>
                      </div>

                      {item.figure ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-paper-deep/20 p-4">
                          <p className="mb-2 self-start text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                            Diagram ({item.figure})
                          </p>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.figure}
                            alt="Question diagram"
                            className="max-h-56 w-auto rounded-lg border border-line bg-white p-2"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-xl border border-dashed border-line p-4 text-xs text-ink-faint">
                          No figure attached to this question.
                        </div>
                      )}
                    </div>

                    {/* Inline Edit Form */}
                    <form
                      action={updateQuestionAdminAction}
                      className="space-y-3 rounded-xl border border-line bg-paper-deep/20 p-4"
                    >
                      <input type="hidden" name="questionId" value={item.id} />
                      <input type="hidden" name="returnTo" value={currentReturnUrl} />

                      <p className="text-[11px] font-semibold tracking-[0.12em] text-vermillion uppercase">
                        Edit Question ({item.id})
                      </p>

                      <div className="grid gap-3 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Topic
                          </label>
                          <select
                            name="topicId"
                            defaultValue={item.topicId}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          >
                            {subjectTopics.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.code} — {t.titleEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Difficulty
                          </label>
                          <select
                            name="difficulty"
                            defaultValue={item.difficulty}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          >
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Status
                          </label>
                          <select
                            name="active"
                            defaultValue={item.active ? "true" : "false"}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          >
                            <option value="true">Active</option>
                            <option value="false">Paused</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Stem
                          </label>
                          <textarea
                            name="stem"
                            required
                            rows={2}
                            defaultValue={item.stem}
                            className="mt-1 w-full rounded-xl border border-line bg-white p-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Stem Chinese
                          </label>
                          <textarea
                            name="stemZh"
                            rows={2}
                            defaultValue={item.stemZh ?? ""}
                            className="mt-1 w-full rounded-xl border border-line bg-white p-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        {OPTION_LABELS.map((lbl, idx) => (
                          <div key={lbl} className="space-y-1">
                            <label className="block text-[10.5px] font-semibold text-ink-faint uppercase">
                              Option {lbl}
                            </label>
                            <input
                              name={`option${idx}`}
                              required
                              defaultValue={item.options[idx] ?? ""}
                              className="h-8 w-full rounded-lg border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                            />
                            <input
                              name={`optionZh${idx}`}
                              defaultValue={item.optionsZh[idx] ?? ""}
                              placeholder={`ZH ${lbl}`}
                              className="h-7 w-full rounded-lg border border-line bg-paper-deep/40 px-2.5 text-[11px] text-ink focus:border-vermillion focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Correct Option
                          </label>
                          <select
                            name="correctIndex"
                            defaultValue={String(item.correctIndex)}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          >
                            {OPTION_LABELS.map((lbl, idx) => (
                              <option key={lbl} value={idx}>
                                {lbl}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Diagram Path
                          </label>
                          <input
                            name="figure"
                            defaultValue={item.figure ?? ""}
                            placeholder="/diagrams/..."
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Source
                          </label>
                          <input
                            name="source"
                            defaultValue={item.source}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Tags (comma)
                          </label>
                          <input
                            name="tags"
                            defaultValue={item.tags.join(", ")}
                            className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Explanation
                          </label>
                          <textarea
                            name="explanation"
                            rows={2}
                            defaultValue={item.explanation}
                            className="mt-1 w-full rounded-xl border border-line bg-white p-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                            Explanation Chinese
                          </label>
                          <textarea
                            name="explanationZh"
                            rows={2}
                            defaultValue={item.explanationZh ?? ""}
                            className="mt-1 w-full rounded-xl border border-line bg-white p-2.5 text-xs text-ink focus:border-vermillion focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="rounded-xl bg-vermillion px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </details>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-ink-soft tabular-nums">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={buildPageHref(page - 1)}
                className="rounded-lg border border-line bg-white px-3 py-1.5 font-medium text-ink transition hover:border-vermillion/40"
              >
                ← Previous
              </Link>
            ) : (
              <span className="rounded-lg border border-line bg-paper-deep/40 px-3 py-1.5 text-ink-faint">
                ← Previous
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={buildPageHref(page + 1)}
                className="rounded-lg border border-line bg-white px-3 py-1.5 font-medium text-ink transition hover:border-vermillion/40"
              >
                Next →
              </Link>
            ) : (
              <span className="rounded-lg border border-line bg-paper-deep/40 px-3 py-1.5 text-ink-faint">
                Next →
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
