import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileText, Play, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";
import { FREE_ATTEMPTS_PER_MOCK } from "@/lib/attempts";
import { SUBJECTS } from "@/lib/exam";
import { cn } from "@/lib/utils";

export const metadata = { title: "Mock exams" };

export default async function MocksPage() {
  const user = await requireUser();

  const [mocks, topicCounts] = await Promise.all([
    prisma.mock.findMany({
      where: { published: true },
      include: {
        subject: true,
        items: { select: { id: true } },
        attempts: {
          where: { userId: user.id },
          orderBy: { startedAt: "desc" },
          select: { id: true, status: true, score: true, startedAt: true },
        },
      },
      orderBy: [{ subjectCode: "asc" }, { createdAt: "asc" }],
    }),
    prisma.topic.groupBy({ by: ["subjectCode"], _count: { _all: true } }),
  ]);

  const topicCountMap = new Map(topicCounts.map((entry) => [entry.subjectCode, entry._count._all]));

  const grouped = SUBJECTS.map((subject) => ({
    subject,
    papers: mocks.filter((mock) => mock.subjectCode === subject.code),
  })).filter((group) => group.papers.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Mock exams"
        title="Full papers, real timings, no second chances on the clock."
        body="Each paper mirrors the official structure. Once the timer starts it does not pause, exactly like the exam. You can resume after a refresh — the clock keeps running."
      />

      <AppBody className="space-y-4">
        {grouped.length === 0 && (
          <div className="panel p-8 text-center">
            <p className="font-display text-2xl text-ink">No papers published yet</p>
            <p className="mt-2 text-[13.5px] text-ink-soft">
              Run{" "}
              <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[12px]">
                npm run db:seed
              </code>{" "}
              to load the question bank.
            </p>
          </div>
        )}

        {grouped.map(({ subject, papers }) => {
          const submitted = papers.flatMap((paper) =>
            paper.attempts.filter((attempt) => attempt.status === "SUBMITTED"),
          );
          const best = submitted.reduce((max, attempt) => Math.max(max, attempt.score), 0);

          return (
            <section
              key={subject.code}
              className="panel grid gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8"
            >
              <div>
                <div className="flex items-baseline gap-2.5">
                  <h2 className="font-display text-2xl text-ink">{subject.nameEn}</h2>
                  <span className="font-chinese text-sm text-ink-faint">{subject.nameZh}</span>
                </div>
                <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-ink-soft">
                  {subject.blurbEn}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-ink-faint">
                  <span>{topicCountMap.get(subject.code) ?? 0} topics</span>
                  <span>·</span>
                  <span>
                    Official: {subject.questionCount} Q · {subject.durationMin} min
                  </span>
                  <span>·</span>
                  <span>{subject.language === "zh" ? "Chinese only" : "EN / 中文"}</span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <Link
                    href={`/syllabus/${subject.code.toLowerCase()}`}
                    className="text-[11.5px] text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
                  >
                    Syllabus & weights
                  </Link>
                  {submitted.length > 0 && (
                    <span className="text-[11px] text-jade">Best {best}/100</span>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                {papers.map((mock) => {
                  const inProgress = mock.attempts.find(
                    (attempt) => attempt.status === "IN_PROGRESS",
                  );
                  const done = mock.attempts.filter((attempt) => attempt.status === "SUBMITTED");
                  const paperBest = done.reduce((max, attempt) => Math.max(max, attempt.score), 0);
                  const remaining = Math.max(0, FREE_ATTEMPTS_PER_MOCK - done.length);

                  return (
                    <div
                      key={mock.id}
                      className="flex flex-col gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13px] font-medium text-ink">{mock.title}</p>
                          {inProgress ? (
                            <Pill tone="gold">In progress</Pill>
                          ) : done.length > 0 ? (
                            <Pill tone="jade">
                              <CheckCircle2 className="h-3 w-3" /> {paperBest}/100
                            </Pill>
                          ) : (
                            <Pill>New</Pill>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ink-faint">
                          <span className="inline-flex items-center gap-1">
                            <FileText className="h-3 w-3" /> {mock.items.length} questions
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3 w-3" /> {mock.durationMin} min
                          </span>
                          {!mock.isFullLength && <span className="text-gold">Short paper</span>}
                          <span>
                            {done.length === 0
                              ? "Not attempted"
                              : `${done.length} attempt${done.length > 1 ? "s" : ""}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={cn(
                            "hidden text-[10px] sm:inline",
                            remaining === 0 ? "text-vermillion" : "text-ink-faint",
                          )}
                        >
                          {remaining}/{FREE_ATTEMPTS_PER_MOCK} left
                        </span>

                        {inProgress ? (
                          <Link
                            href={`/exam/${mock.slug}`}
                            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
                          >
                            <Play className="h-3 w-3" /> Resume
                          </Link>
                        ) : remaining > 0 ? (
                          <Link
                            href={`/app/mocks/${mock.slug}`}
                            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-vermillion px-3 text-[11.5px] font-medium text-paper"
                          >
                            {done.length > 0 ? (
                              <RotateCcw className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
                            {done.length > 0 ? "Retake" : "Start"}
                          </Link>
                        ) : (
                          <Link
                            href="/pricing"
                            className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong px-3 text-[11.5px] font-medium text-ink-soft"
                          >
                            Pro <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <p className="pt-2 text-[11px] leading-relaxed text-ink-faint">
          Chinese papers are CSCA-format short papers: 48 questions in 54 minutes, covering the same
          item types as the official 80-in-90 paper. The card labels this, because pretending
          otherwise would be dishonest.
        </p>
      </AppBody>
    </>
  );
}
