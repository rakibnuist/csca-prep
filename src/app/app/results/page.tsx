import Link from "next/link";
import { ArrowRight, Clock3, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { estimatePercentile, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { formatDate, ordinal } from "@/lib/utils";

export const metadata = { title: "Results" };

export default async function ResultsPage() {
  const session = await requireUser();

  const attempts = await prisma.attempt.findMany({
    where: { userId: session.id, status: "SUBMITTED" },
    include: { mock: { include: { subject: true } } },
    orderBy: { completedAt: "desc" },
  });

  const bestBySubject = new Map<string, number>();
  for (const attempt of attempts) {
    const current = bestBySubject.get(attempt.mock.subjectCode) ?? 0;
    bestBySubject.set(attempt.mock.subjectCode, Math.max(current, attempt.score));
  }

  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="Every paper you have sat."
        body="Scores are scaled to the official 0–100 range. Percentiles are modelled estimates, not official figures."
      />

      <AppBody>
        {attempts.length === 0 ? (
          <div className="panel p-10 text-center">
            <TrendingUp className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-2xl text-ink">No results yet</p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              Sit a full paper and your score, topic breakdown and review will appear here.
            </p>
            <Link
              href="/app/mocks"
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              Choose a paper <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">Papers sat</p>
                <p className="mt-1 font-display text-3xl text-ink tabular">{attempts.length}</p>
              </div>
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">Best score</p>
                <p className="mt-1 font-display text-3xl text-ink tabular">
                  {Math.max(...attempts.map((attempt) => attempt.score))}
                </p>
              </div>
              <div className="panel p-4">
                <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  Subjects covered
                </p>
                <p className="mt-1 font-display text-3xl text-ink tabular">
                  {bestBySubject.size}
                  <span className="text-base text-ink-faint">/5</span>
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-card">
              <div className="hidden grid-cols-[1.6fr_0.8fr_0.6fr_0.7fr_0.8fr_0.3fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.12em] text-ink-faint uppercase sm:grid">
                <span>Paper</span>
                <span>Subject</span>
                <span>Score</span>
                <span>Percentile</span>
                <span>Date</span>
                <span />
              </div>
              {attempts.map((attempt) => {
                const spec = SUBJECT_MAP[attempt.mock.subjectCode as SubjectCode];
                const percentile = estimatePercentile(attempt.score, spec?.kind ?? "FUNDAMENTAL");
                return (
                  <Link
                    key={attempt.id}
                    href={`/app/results/${attempt.id}`}
                    className="grid gap-1 border-b border-line/70 px-4 py-3.5 transition last:border-0 hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_0.8fr_0.6fr_0.7fr_0.8fr_0.3fr] sm:items-center sm:gap-3"
                  >
                    <div>
                      <p className="text-[12.5px] font-medium text-ink">{attempt.mock.title}</p>
                      <p className="text-[10.5px] text-ink-faint">
                        {attempt.rawScore}/{attempt.totalQuestions} correct ·{" "}
                        {Math.floor(attempt.durationSec / 60)} min
                      </p>
                    </div>
                    <p className="text-[11.5px] text-ink-soft">{attempt.mock.subject.shortEn}</p>
                    <p className="font-display text-lg text-ink tabular">{attempt.score}</p>
                    <p className="text-[11.5px] text-ink-soft tabular">{ordinal(percentile)}</p>
                    <p className="inline-flex items-center gap-1 text-[11px] text-ink-faint">
                      <Clock3 className="h-3 w-3" />
                      {attempt.completedAt ? formatDate(attempt.completedAt, true) : "—"}
                    </p>
                    <ArrowRight className="hidden h-3.5 w-3.5 text-ink-faint sm:block" />
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </AppBody>
    </>
  );
}
