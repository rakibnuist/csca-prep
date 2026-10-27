import Link from "next/link";
import { ArrowRight, Flame, Layers, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { SUBJECTS, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { cn } from "@/lib/utils";

export const metadata = { title: "Practice" };

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const session = await requireUser();
  const { subject: subjectParam } = await searchParams;
  const subjectCode = (SUBJECTS.find((subject) => subject.code === subjectParam)?.code ??
    "MATH") as SubjectCode;

  const [topics, counts, dueReviews, attempts] = await Promise.all([
    prisma.topic.findMany({
      where: { subjectCode },
      orderBy: { order: "asc" },
    }),
    prisma.question.groupBy({
      by: ["topicId"],
      where: { subjectCode, active: true },
      _count: { _all: true },
    }),
    prisma.reviewItem.count({
      where: { userId: session.id, nextReviewAt: { lte: new Date() } },
    }),
    prisma.attempt.findMany({
      where: { userId: session.id, status: "SUBMITTED", mock: { subjectCode } },
      select: { topicBreakdown: true },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
  ]);

  const countMap = new Map(counts.map((entry) => [entry.topicId, entry._count._all]));

  const masteryMap = new Map<string, { correct: number; total: number }>();
  for (const attempt of attempts) {
    const breakdown = (attempt.topicBreakdown ?? {}) as Record<
      string,
      { code: string; correct: number; total: number }
    >;
    for (const entry of Object.values(breakdown)) {
      const existing = masteryMap.get(entry.code) ?? { correct: 0, total: 0 };
      existing.correct += entry.correct;
      existing.total += entry.total;
      masteryMap.set(entry.code, existing);
    }
  }

  const subject = SUBJECT_MAP[subjectCode];
  const grouped = topics.reduce<Record<string, typeof topics>>((accumulator, topic) => {
    accumulator[topic.unitEn] = accumulator[topic.unitEn] ?? [];
    accumulator[topic.unitEn].push(topic);
    return accumulator;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title="Drill one topic until it stops being a problem."
        body="Short sets with instant explanations. Every answer updates your review queue, so misses come back at the right interval."
        action={
          <Link
            href="/app/practice/review"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            <Flame className="h-3.5 w-3.5" /> Smart review
            {dueReviews > 0 && (
              <span className="ml-1 rounded-full bg-vermillion px-1.5 py-0.5 text-[10px] text-paper">
                {dueReviews}
              </span>
            )}
          </Link>
        }
      />

      <AppBody>
        <div className="flex flex-wrap gap-1.5">
          {SUBJECTS.map((item) => (
            <Link
              key={item.code}
              href={`/app/practice?subject=${item.code}`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] transition",
                item.code === subjectCode
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {item.shortEn}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-card p-4">
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
          <div>
            <p className="text-[12.5px] font-medium text-ink">
              {subject.nameEn} · {topics.length} topics
            </p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">{subject.blurbEn}</p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([unit, unitTopics]) => (
            <section key={unit}>
              <h2 className="border-b border-line pb-2 font-display text-lg text-ink">{unit}</h2>
              <div className="mt-3 divide-y divide-line/70">
                {unitTopics.map((topic) => {
                  const count = countMap.get(topic.id) ?? 0;
                  const mastery = masteryMap.get(topic.code);
                  const pct = mastery && mastery.total > 0 ? Math.round((mastery.correct / mastery.total) * 100) : null;
                  return (
                    <div
                      key={topic.id}
                      className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[9.5px] font-medium text-ink-faint">
                            {topic.code}
                          </span>
                          <p className="text-[13px] font-medium text-ink">{topic.titleEn}</p>
                        </div>
                        <p className="mt-0.5 text-[11px] text-ink-faint">
                          {topic.titleZh} · {Math.round(topic.weight * 100)}% of paper
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {pct !== null ? (
                          <div className="hidden w-24 sm:block">
                            <div className="flex items-center justify-between text-[9.5px] text-ink-faint">
                              <span>mastery</span>
                              <span className="tabular">{pct}%</span>
                            </div>
                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-paper-deep">
                              <div
                                className={cn(
                                  "h-full",
                                  pct >= 75 ? "bg-jade" : pct >= 50 ? "bg-gold" : "bg-vermillion",
                                )}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="hidden text-[10px] text-ink-faint sm:inline">not measured</span>
                        )}

                        <span className="w-16 text-right text-[10.5px] text-ink-faint">
                          {count} Q
                        </span>

                        <Link
                          href={`/app/practice/topic/${topic.code}`}
                          className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                        >
                          Drill <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
          <p className="text-[12px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">How to use this:</span> drill the weakest topic from
            your last result, then take a paper again within 48 hours. Retrieval beats re-reading.
          </p>
        </div>
      </AppBody>
    </>
  );
}
