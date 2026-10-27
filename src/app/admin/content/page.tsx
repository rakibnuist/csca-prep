import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · content" };

export default async function AdminContentPage() {
  const [subjects, mocks, topics, questions] = await Promise.all([
    prisma.subject.findMany({ orderBy: { code: "asc" } }),
    prisma.mock.findMany({
      include: { subject: true, items: { select: { id: true } } },
      orderBy: [{ subjectCode: "asc" }, { createdAt: "asc" }],
    }),
    prisma.topic.groupBy({ by: ["subjectCode"], _count: { _all: true } }),
    prisma.question.findMany({
      include: { topic: true, subject: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const topicCounts = new Map(topics.map((entry) => [entry.subjectCode, entry._count._all]));
  const questionCounts = await prisma.question.groupBy({
    by: ["subjectCode"],
    _count: { _all: true },
  });
  const questionMap = new Map(questionCounts.map((entry) => [entry.subjectCode, entry._count._all]));

  return (
    <div>
      <p className="eyebrow">Content</p>
      <h1 className="display-md mt-2">Curriculum & papers</h1>
      <p className="mt-2 max-w-2xl text-[13px] text-ink-soft">
        Content is seeded from version-controlled files in{" "}
        <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[11px]">
          prisma/seed-data
        </code>
        . Edit there and re-run <code className="font-mono text-[11px]">npm run db:seed</code> — the
        seed is idempotent.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {subjects.map((subject) => (
          <div key={subject.code} className="panel p-4">
            <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">{subject.code}</p>
            <p className="mt-1 text-[13px] font-medium text-ink">{subject.shortEn}</p>
            <p className="mt-2 text-[11px] text-ink-soft">
              {topicCounts.get(subject.code) ?? 0} topics · {questionMap.get(subject.code) ?? 0} questions
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 font-display text-lg text-ink">Published papers</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.5fr_0.5fr_0.5fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase">
          <span>Paper</span>
          <span>Subject</span>
          <span>Items</span>
          <span>Minutes</span>
          <span>Status</span>
        </div>
        {mocks.map((mock) => (
          <div
            key={mock.id}
            className="grid grid-cols-[1.6fr_0.7fr_0.5fr_0.5fr_0.5fr] items-center gap-3 border-b border-line/60 px-4 py-2.5 last:border-0"
          >
            <span className="truncate text-[12px] text-ink">{mock.title}</span>
            <span className="text-[11px] text-ink-soft">{mock.subject.shortEn}</span>
            <span className="text-[11px] text-ink-soft tabular">{mock.items.length}</span>
            <span className="text-[11px] text-ink-soft tabular">{mock.durationMin}</span>
            <span className="text-[10.5px] text-jade">{mock.published ? "live" : "draft"}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 font-display text-lg text-ink">Newest questions</h2>
      <div className="mt-3 space-y-2">
        {questions.map((question) => (
          <div key={question.id} className="rounded-lg border border-line bg-card px-3.5 py-2.5">
            <div className="flex items-center gap-2 text-[10px] text-ink-faint">
              <span className="rounded bg-paper-deep px-1.5 py-0.5">{question.subjectCode}</span>
              <span>{question.topic.code}</span>
              <span>·</span>
              <span>{question.difficulty}</span>
              <span>·</span>
              <span>{formatDate(question.createdAt, true)}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-[12px] text-ink-soft">{question.stem}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
