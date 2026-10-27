import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AlertTriangle, ArrowRight, Clock3, FileText, Languages, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";
import { startMockAction } from "@/lib/actions/attempts";
import { canStartAttempt, findResumeableAttempt, FREE_ATTEMPTS_PER_MOCK } from "@/lib/attempts";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mock = await prisma.mock.findUnique({ where: { slug }, select: { title: true } });
  return { title: mock?.title ?? "Mock exam" };
}

export default async function MockBriefingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ limit?: string }>;
}) {
  const user = await requireUser();
  const { slug } = await params;
  const { limit } = await searchParams;

  const mock = await prisma.mock.findUnique({
    where: { slug },
    include: {
      subject: true,
      items: { select: { id: true } },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: "desc" },
      },
    },
  });

  if (!mock) notFound();

  const resume = await findResumeableAttempt(user.id, mock.id);
  if (resume) redirect(`/exam/${slug}`);

  const submitted = mock.attempts.filter((attempt) => attempt.status === "SUBMITTED");
  const best = submitted.reduce((max, attempt) => Math.max(max, attempt.score), 0);
  const { allowed } = await canStartAttempt(user.id, mock.id);
  const remaining = Math.max(0, FREE_ATTEMPTS_PER_MOCK - submitted.length);

  const specs = [
    { icon: FileText, label: "Questions", value: `${mock.items.length} single-answer multiple choice` },
    { icon: Clock3, label: "Time limit", value: `${mock.durationMin} minutes, no pause` },
    { icon: ShieldCheck, label: "Scoring", value: "0–100 scale, no negative marking" },
    {
      icon: Languages,
      label: "Language",
      value: mock.subject.language === "zh" ? "Chinese only" : "Chinese and English",
    },
  ];

  return (
    <>
      <PageHeader
        backHref={{ href: "/app/mocks", label: "All mock exams" }}
        eyebrow={`${mock.subject.nameEn} · ${mock.paper ?? "Paper"}`}
        title={mock.title}
        body={mock.subtitle}
        action={
          <div className="flex items-center gap-2">
            <Pill tone={mock.isFullLength ? "jade" : "gold"}>
              {mock.isFullLength ? "Full length" : "Short paper"}
            </Pill>
            <Pill>{mock.subject.nameZh}</Pill>
          </div>
        }
      />

      <AppBody className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-8">
          {limit === "reached" && (
            <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold-soft/60 px-4 py-3 text-[12.5px] text-gold">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              You have used both free attempts on this paper. Retakes unlock with Pro when it
              opens — until then, drill the topics you missed in Practice.
            </div>
          )}

          <section>
            <h2 className="font-display text-xl text-ink">What to expect</h2>
            <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-3 px-4 py-3">
                  <spec.icon className="h-4 w-4 shrink-0 text-ink-faint" />
                  <span className="w-28 shrink-0 text-[12px] text-ink-faint">{spec.label}</span>
                  <span className="text-[13px] text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Exam rules</h2>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {[
                "One answer per question. Changing an answer is allowed until you submit.",
                "The timer runs from the moment you start and cannot be paused. Refreshing or closing the tab does not stop it.",
                "Answers are saved automatically every few seconds. If you lose connection, reopen the paper and your progress returns.",
                "When the timer reaches zero the paper submits itself with the answers saved at that moment.",
                "You can flag questions and jump back to them from the palette before submitting.",
                "There is no negative marking — an educated guess is never worse than a blank.",
              ].map((rule) => (
                <li key={rule} className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vermillion/70" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">How this paper was built</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {mock.items.length} original questions mapped to the official{" "}
              <Link
                href={`/syllabus/${mock.subjectCode.toLowerCase()}`}
                className="text-vermillion underline underline-offset-2"
              >
                {mock.subject.nameEn} syllabus
              </Link>
              . Each question carries one topic tag, which is how your post-paper breakdown is
              calculated. Nothing here is copied from official papers.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              Your record
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl text-ink tabular">{submitted.length}</p>
                <p className="text-[10.5px] text-ink-faint">Attempts used</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl text-ink tabular">
                  {submitted.length ? best : "—"}
                </p>
                <p className="text-[10.5px] text-ink-faint">Best score</p>
              </div>
            </div>

            {submitted.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {submitted.slice(0, 3).map((attempt) => (
                  <Link
                    key={attempt.id}
                    href={`/app/results/${attempt.id}`}
                    className="flex items-center justify-between rounded-md px-1 py-1 text-[11.5px] text-ink-soft hover:bg-paper-deep/60"
                  >
                    <span>{attempt.completedAt ? formatDate(attempt.completedAt) : "—"}</span>
                    <span className="font-medium text-ink tabular">{attempt.score}/100</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-5 border-t border-line pt-4">
              {allowed ? (
                <form action={startMockAction}>
                  <input type="hidden" name="slug" value={mock.slug} />
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    {submitted.length > 0 ? (
                      <>
                        <RotateCcw className="h-4 w-4" /> Retake paper
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> Start the paper
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <Link
                  href="/pricing"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-line-strong text-[13px] font-medium text-ink-soft"
                >
                  Join the Pro waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <p className="mt-2 text-center text-[10.5px] text-ink-faint">
                {remaining} free {remaining === 1 ? "attempt" : "attempts"} remaining · timer starts
                immediately
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-card/60 p-4">
            <p className="text-[11px] font-medium text-ink">Nice to know</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              The real paper is sat under proctoring. Practise without notes or a calculator — the
              exam does not allow either unless your centre says otherwise.
            </p>
          </div>
        </aside>
      </AppBody>
    </>
  );
}
