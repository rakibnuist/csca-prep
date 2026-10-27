import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Clock3, FileText, Play } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";

export const metadata = { title: "Official Q&A" };

export default async function OfficialQaPage() {
  const user = await requireUser();

  const papers = await prisma.mock.findMany({
    where: { paper: "Official", published: true },
    include: {
      subject: true,
      items: { select: { id: true } },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: "desc" },
        select: { id: true, status: true, score: true },
      },
    },
    orderBy: { year: "desc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Official Q&A"
        title="The real papers, with the real answers."
        body="Official CSCA past papers, digitised with their published answer key and step-by-step explanations. Study them here at your own pace, or sit them as timed mocks."
      />

      <AppBody>
        {papers.length === 0 ? (
          <div className="panel p-10 text-center">
            <p className="font-display text-2xl text-ink">No official papers published yet</p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              Run <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[12px]">npm run db:seed</code>{" "}
              to load them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {papers.map((paper) => {
              const submitted = paper.attempts.filter((attempt) => attempt.status === "SUBMITTED");
              const best = submitted.reduce((max, attempt) => Math.max(max, attempt.score), 0);

              return (
                <div
                  key={paper.id}
                  className="panel grid gap-5 p-5 lg:grid-cols-[1.2fr_0.9fr] lg:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="red">
                        <BadgeCheck className="h-3 w-3" /> Official past paper
                      </Pill>
                      <Pill>{paper.subject.nameEn}</Pill>
                    </div>
                    <h2 className="mt-2 font-display text-2xl text-ink">{paper.title}</h2>
                    <p className="mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-ink-soft">
                      {paper.subtitle}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ink-faint">
                      <span className="inline-flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {paper.items.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3 w-3" /> {paper.durationMin} min
                      </span>
                      {submitted.length > 0 && (
                        <span className="text-jade">Best {best}/100</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Link
                      href={`/app/official/${paper.slug}`}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
                    >
                      <BookOpen className="h-3.5 w-3.5" /> Study Q&A
                    </Link>
                    <Link
                      href={`/app/mocks/${paper.slug}`}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
                    >
                      <Play className="h-3.5 w-3.5" /> Take as timed mock
                    </Link>
                  </div>
                </div>
              );
            })}

            <p className="rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-[11.5px] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">Note:</span> these are official CSCA exam
              materials reproduced for study. They are kept free, attributed to the original source,
              and should be cross-checked against official channels. Full papers are also available
              from the official portal. Questions that depend on a diagram show the official figure
              where it has been digitised; a few figures are still being added.
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between rounded-xl border border-line bg-paper-deep/50 px-5 py-4">
          <p className="text-[12px] text-ink-soft">
            Prefer to practise against original questions? The full drill bank covers 2,200+ items.
          </p>
          <Link
            href="/app/practice"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-vermillion hover:underline"
          >
            Practice <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </AppBody>
    </>
  );
}
