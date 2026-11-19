import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lightbulb,
  ListChecks,
  Play,
  Sigma,
  TriangleAlert,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody } from "@/components/app/page-header";
import { ConceptVisual } from "@/components/learn/concept-visual";
import { MathText } from "@/components/math-text";
import { CONCEPT_MAP, CONCEPTS } from "@/lib/concepts";
import { toggleConceptCompleteAction } from "@/lib/actions/learn";
import { Pill } from "@/components/site/section";
import { plural } from "@/lib/utils";
import { isSubjectInTrack, trackLink } from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";

export async function generateMetadata({ params }: { params: Promise<{ topicCode: string }> }) {
  const { topicCode } = await params;
  const concept = CONCEPT_MAP.get(topicCode);
  return { title: concept ? `Learn · ${concept.titleEn}` : "Learn" };
}

export default async function ConceptPage({
  params,
  searchParams,
}: {
  params: Promise<{ topicCode: string }>;
  searchParams: Promise<{ taught?: string }>;
}) {
  const user = await requireUser();
  const { topicCode } = await params;
  const { taught } = await searchParams;
  const track = await getResolvedTrack(taught, user.teachingTrack);
  if (track === "CN") redirect(trackLink("/app/practice", track));

  const concept = CONCEPT_MAP.get(topicCode);
  if (!concept || !isSubjectInTrack(concept.subjectCode, track)) notFound();

  const [topic, progress] = await Promise.all([
    prisma.topic.findUnique({
      where: { code: topicCode },
      include: { _count: { select: { questions: true } } },
    }),
    prisma.conceptProgress.findUnique({
      where: { userId_topicCode: { userId: user.id, topicCode } },
    }),
  ]);

  const done = Boolean(progress);
  const siblings = CONCEPTS.filter((item) => item.subjectCode === concept.subjectCode);
  const index = siblings.findIndex((item) => item.topicCode === concept.topicCode);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;
  const questionCount = topic?._count.questions ?? 0;

  return (
    <>
      <div className="border-b border-line bg-paper-deep/30">
        <div className="mx-auto max-w-[920px] px-5 py-8 sm:px-8">
          <Link
            href={trackLink("/app/learn", track, { subject: concept.subjectCode })}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All concepts
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Pill>{concept.unitEn}</Pill>
            <span className="text-[11px] text-ink-faint">{concept.topicCode}</span>
            {index >= 0 && (
              <span className="text-[11px] text-ink-faint tabular">
                · Lesson {index + 1} of {siblings.length}
              </span>
            )}
            {done && (
              <Pill tone="jade">
                <CheckCircle2 className="h-3 w-3" /> Understood
              </Pill>
            )}
          </div>

          <h1 className="display-md mt-3 text-balance">{concept.titleEn}</h1>
          <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">
            <MathText inline>{concept.summary}</MathText>
          </p>
        </div>
      </div>

      <AppBody className="max-w-[920px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          {/* main lesson */}
          <div className="min-w-0 space-y-6">
            {concept.figureKey && <ConceptVisual figureKey={concept.figureKey} />}

            {concept.sections.map((section) => (
              <section key={section.heading} className="panel p-5">
                <h2 className="font-display text-xl text-ink">{section.heading}</h2>
                <div className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                  <MathText>{section.body}</MathText>
                </div>
              </section>
            ))}

            {/* quiz */}
            <section className="rounded-2xl border border-vermillion/25 bg-vermillion/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-1.5 font-display text-lg text-ink">
                    <ListChecks className="h-4 w-4 text-vermillion" /> Self-check quiz
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                    {questionCount > 0
                      ? `${questionCount} ${plural(questionCount, "question")} in the bank for this topic. Test yourself now — instant explanations.`
                      : "Questions for this topic are being authored. Try another topic meanwhile."}
                  </p>
                </div>
                {questionCount > 0 && (
                  <Link
                    href={trackLink(`/app/practice/topic/${concept.topicCode}`, track, { n: 10 })}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    <Play className="h-3.5 w-3.5" /> Start quiz
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* side rail */}
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-8 lg:self-start">
            {concept.formulas.length > 0 && (
              <section className="panel p-4">
                <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  <Sigma className="h-3.5 w-3.5" /> Key formulas
                </p>
                <ul className="mt-3 space-y-2">
                  {concept.formulas.map((formula) => (
                    <li
                      key={formula}
                      className="overflow-x-auto rounded-lg bg-paper-deep/60 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-ink"
                    >
                      <MathText inline>{formula}</MathText>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {concept.traps.length > 0 && (
              <section className="rounded-xl border border-gold/30 bg-gold-soft/40 p-4">
                <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] text-gold uppercase">
                  <TriangleAlert className="h-3.5 w-3.5" /> Watch out for
                </p>
                <ul className="mt-3 space-y-2">
                  {concept.traps.map((trap) => (
                    <li key={trap} className="flex gap-2 text-[12px] leading-relaxed text-ink-soft">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span className="min-w-0 flex-1">
                        <MathText inline>{trap}</MathText>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <form action={toggleConceptCompleteAction}>
              <input type="hidden" name="topicCode" value={concept.topicCode} />
              <button
                type="submit"
                className={
                  done
                    ? "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-jade/40 bg-jade-soft text-[12.5px] font-medium text-jade"
                    : "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
                }
              >
                {done ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Understood — tap to undo
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" /> Mark as understood
                  </>
                )}
              </button>
            </form>
          </aside>
        </div>

        {/* prev / next */}
        <nav className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={trackLink(`/app/learn/${prev.topicCode}`, track)}
              className="group panel flex items-center gap-3 p-4 transition hover:border-line-strong"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-ink-faint" />
              <div className="min-w-0">
                <p className="text-[10px] tracking-wide text-ink-faint uppercase">Previous</p>
                <p className="truncate text-[12.5px] font-medium text-ink">{prev.titleEn}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={trackLink(`/app/learn/${next.topicCode}`, track)}
              className="group panel flex items-center justify-end gap-3 p-4 text-right transition hover:border-line-strong"
            >
              <div className="min-w-0">
                <p className="text-[10px] tracking-wide text-ink-faint uppercase">Next</p>
                <p className="truncate text-[12.5px] font-medium text-ink">{next.titleEn}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" />
            </Link>
          )}
        </nav>
      </AppBody>
    </>
  );
}
