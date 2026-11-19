import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Plus, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { SUBJECTS, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { createMockAction, toggleMockPublishAction } from "@/lib/actions/mocks";

export const dynamic = "force-dynamic";

const ALLOWED_SUBJECTS = new Set(["MATH", "PHYS", "CHEM", "CH_HUM", "CH_SCI"]);

export default async function AdminMocksPage({
  searchParams,
}: {
  searchParams: Promise<{
    subject?: string;
    kind?: string;
    status?: string;
    q?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const subject = ALLOWED_SUBJECTS.has(params.subject ?? "")
    ? (params.subject as string)
    : "";
  const kind =
    params.kind === "FULL" || params.kind === "SECTION" ? params.kind : "";
  const status =
    params.status === "PUBLISHED" || params.status === "DRAFT"
      ? params.status
      : "";
  const q = (params.q ?? "").trim();

  const where: Prisma.MockWhereInput = {};
  if (subject) where.subjectCode = subject;
  if (kind === "FULL") where.isFullLength = true;
  if (kind === "SECTION") where.isFullLength = false;
  if (status === "PUBLISHED") where.published = true;
  if (status === "DRAFT") where.published = false;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
      { paper: { contains: q, mode: "insensitive" } },
    ];
  }

  const [totalCount, publishedCount, draftCount, totalAttempts, mocks] =
    await Promise.all([
      prisma.mock.count(),
      prisma.mock.count({ where: { published: true } }),
      prisma.mock.count({ where: { published: false } }),
      prisma.attempt.count({ where: { status: "SUBMITTED" } }),
      prisma.mock.findMany({
        where,
        orderBy: [{ subjectCode: "asc" }, { year: "desc" }, { createdAt: "desc" }],
        include: {
          _count: { select: { items: true, attempts: true } },
        },
      }),
    ]);

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
            Exam Paper Assembly
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Mock Builder
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Create full-length 100-mark mocks or topic sectionals, auto-fill balanced syllabus sets, and control publish visibility.
          </p>
        </div>

        <Link
          href="/admin/content"
          className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-vermillion/40 hover:text-vermillion"
        >
          Question bank →
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Total Papers
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">
            {totalCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Published Live
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-jade">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Drafts
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-gold">
            {draftCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Student Submissions
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">
            {totalAttempts}
          </p>
        </div>
      </div>

      {/* Create New Mock Paper */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-vermillion/10 p-1.5 text-vermillion">
            <Plus className="h-4 w-4" />
          </span>
          <h2 className="font-display text-lg font-semibold text-ink">
            Create New Mock Paper
          </h2>
        </div>

        <form
          action={createMockAction}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Paper Title
            </label>
            <input
              name="title"
              required
              minLength={3}
              placeholder="CSCA Mathematics Mock 03"
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
            />
          </div>

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
                  {s.code} — {s.shortEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Duration (min)
            </label>
            <input
              type="number"
              name="durationMin"
              defaultValue={60}
              min={5}
              max={240}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Year / Type
            </label>
            <div className="mt-1 flex gap-1.5">
              <input
                type="number"
                name="year"
                defaultValue={2027}
                min={2024}
                max={2035}
                className="h-9 w-20 rounded-xl border border-line bg-white px-2.5 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
              <select
                name="isFullLength"
                defaultValue="true"
                className="h-9 flex-1 rounded-xl border border-line bg-white px-2 text-xs text-ink focus:border-vermillion focus:outline-none"
              >
                <option value="true">Full-length</option>
                <option value="false">Sectional</option>
              </select>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Paper Code
              </label>
              <input
                name="paper"
                placeholder="Paper C"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-9 shrink-0 rounded-xl bg-vermillion px-4 text-xs font-semibold text-white transition hover:opacity-95"
            >
              Create
            </button>
          </div>
        </form>
      </section>

      {/* Filter Bar */}
      <form
        method="get"
        className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search paper title, slug, code…"
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
          name="kind"
          defaultValue={kind}
          className="h-10 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
        >
          <option value="">Full-length &amp; sectionals</option>
          <option value="FULL">Full-length</option>
          <option value="SECTION">Sectional drill</option>
        </select>

        <div className="flex items-center gap-2">
          <select
            name="status"
            defaultValue={status}
            className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
          <button
            type="submit"
            className="h-10 rounded-xl bg-vermillion px-4 text-xs font-semibold text-white transition hover:opacity-95"
          >
            Filter
          </button>
        </div>
      </form>

      {/* Papers List */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xs">
        {mocks.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink-soft">
            No mock papers match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-line bg-paper-deep/50 text-[11px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                <tr>
                  <th className="px-4 py-3">Paper</th>
                  <th className="px-3 py-3">Subject &amp; Type</th>
                  <th className="px-3 py-3">Items Fill</th>
                  <th className="px-3 py-3">Attempts</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {mocks.map((m) => {
                  const spec = SUBJECT_MAP[m.subjectCode as SubjectCode];
                  const target = m.isFullLength ? spec?.questionCount ?? 48 : 24;
                  const fillPct = Math.min(
                    100,
                    Math.round((m._count.items / Math.max(1, target)) * 100)
                  );
                  const canPublish = m._count.items > 0;

                  return (
                    <tr key={m.id} className="hover:bg-paper-deep/25">
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/admin/mocks/${m.id}`}
                          className="font-medium text-ink hover:text-vermillion"
                        >
                          {m.title}
                        </Link>
                        <div className="mt-0.5 text-[11px] text-ink-faint">
                          {m.slug}
                          {m.paper ? ` · ${m.paper}` : ""} · {m.year} · {m.durationMin}m
                        </div>
                      </td>

                      <td className="px-3 py-3.5 text-xs">
                        <span className="rounded border border-line bg-paper-deep/60 px-2 py-0.5 font-semibold text-ink">
                          {m.subjectCode}
                        </span>
                        <div className="mt-1 text-[11px] text-ink-soft">
                          {m.isFullLength ? "Full-length" : "Sectional"}
                        </div>
                      </td>

                      <td className="px-3 py-3.5 text-xs tabular-nums">
                        <div className="font-semibold text-ink">
                          {m._count.items} / {target} Q
                        </div>
                        <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-paper-deep">
                          <div
                            className={`h-full rounded-full ${
                              fillPct >= 100 ? "bg-jade" : "bg-vermillion"
                            }`}
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                      </td>

                      <td className="px-3 py-3.5 text-xs font-medium tabular-nums text-ink">
                        {m._count.attempts}
                      </td>

                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${
                            m.published
                              ? "border-jade/25 bg-jade/10 text-jade"
                              : "border-gold/30 bg-gold/10 text-gold"
                          }`}
                        >
                          {m.published ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <form action={toggleMockPublishAction}>
                            <input type="hidden" name="id" value={m.id} />
                            <input
                              type="hidden"
                              name="published"
                              value={m.published ? "false" : "true"}
                            />
                            <button
                              type="submit"
                              disabled={!m.published && !canPublish}
                              title={
                                !m.published && !canPublish
                                  ? "Add questions first"
                                  : undefined
                              }
                              className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${
                                m.published
                                  ? "border-line bg-paper-deep/50 text-ink-soft hover:border-ink/30"
                                  : "border-jade/30 bg-jade/10 text-jade hover:bg-jade hover:text-white"
                              }`}
                            >
                              {m.published ? "Unpublish" : "Publish"}
                            </button>
                          </form>
                          <Link
                            href={`/admin/mocks/${m.id}`}
                            className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                          >
                            Edit Paper →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
