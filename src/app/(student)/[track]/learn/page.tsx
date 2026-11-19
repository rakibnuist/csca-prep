import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { TrackSwitch } from "@/components/app/track-switch";
import { MathText } from "@/components/math-text";
import { SUBJECT_MAP } from "@/lib/exam";
import { conceptsForSubject } from "@/lib/concepts";
import { formulasForSubject } from "@/lib/formulas";
import {
  defaultSubjectFor,
  displayBlurb,
  displaySubject,
  displaySubjectShort,
  isSubjectInTrack,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackSubjects,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Concepts & Formula Sheet", "核心公式与概念精讲");
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; view?: string; q?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  const track = await getResolvedTrack(params.taught, user.teachingTrack);
  const programme = parseProgramme(sessionTrack(user.track));
  const zh = track === "CN";
  const base = zh ? "/cn" : "/en";

  const subjectCode =
    params.subject && isSubjectInTrack(params.subject, track, programme)
      ? params.subject
      : defaultSubjectFor(track, programme);
  const subject = SUBJECT_MAP[subjectCode as keyof typeof SUBJECT_MAP];
  const q = (params.q ?? "").trim().toLowerCase();

  const [topics, progress] = await Promise.all([
    prisma.topic.findMany({
      where: { subjectCode },
      orderBy: { order: "asc" },
      include: { _count: { select: { questions: true } } },
    }),
    prisma.conceptProgress.findMany({
      where: { userId: user.id },
      select: { topicCode: true },
    }),
  ]);

  const completed = new Set(progress.map((entry) => entry.topicCode));
  const concepts = conceptsForSubject(subjectCode);
  const conceptCodes = new Set(concepts.map((c) => c.topicCode));
  const allFormulas = formulasForSubject(subjectCode);
  const filteredFormulas = q
    ? allFormulas.filter((f) => {
        const hay = `${f.topicCode} ${f.titleEn} ${f.titleZh} ${f.summaryEn} ${f.summaryZh} ${f.trapEn} ${f.trapZh}`.toLowerCase();
        return hay.includes(q);
      })
    : allFormulas;

  const canShowConcepts = track === "EN" && concepts.length > 0;
  const view =
    params.view === "formulas" || !canShowConcepts ? "formulas" : "concepts";

  const topicByCode = new Map(topics.map((topic) => [topic.code, topic]));
  const units = concepts.reduce<Record<string, typeof concepts>>((acc, concept) => {
    const key = concept.unitEn;
    acc[key] = acc[key] ?? [];
    acc[key].push(concept);
    return acc;
  }, {});

  const doneInSubject = concepts.filter((concept) => completed.has(concept.topicCode)).length;
  const pct = concepts.length ? Math.round((doneInSubject / concepts.length) * 100) : 0;

  return (
    <>
      <PageHeader
        eyebrow={zh ? "知识与公式" : "Learn & Reference"}
        title={
          zh
            ? "先吃透公式与高频陷阱，再下场刷题。"
            : "Master the concepts, formulas & examiner traps."
        }
        body={
          zh
            ? "按考纲单元整理的 CSCA 核心公式、易错陷阱与一键专题训练入口。"
            : "Visual concept lessons plus a searchable formula and examiner-trap sheet mapped directly to CSCA syllabus topics."
        }
      />

      <AppBody>
        <TrackSwitch track={track} />

        {/* Subject tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {trackSubjects(track, programme).map((item) => (
            <Link
              key={item.code}
              href={trackLink("/app/learn", track, {
                subject: item.code,
                view,
              })}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition",
                item.code === subjectCode
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {displaySubjectShort(item, track)}
            </Link>
          ))}
        </div>

        {/* View switcher: Concepts vs Formula & Trap Sheet */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {canShowConcepts && (
              <Link
                href={trackLink("/app/learn", track, {
                  subject: subjectCode,
                  view: "concepts",
                })}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition",
                  view === "concepts"
                    ? "border-vermillion bg-vermillion text-paper"
                    : "border-line bg-card text-ink-soft hover:text-ink",
                )}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Concept Lessons ({concepts.length})
              </Link>
            )}
            <Link
              href={trackLink("/app/learn", track, {
                subject: subjectCode,
                view: "formulas",
              })}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition",
                view === "formulas"
                  ? "border-vermillion bg-vermillion text-paper"
                  : "border-line bg-card text-ink-soft hover:text-ink",
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {zh
                ? `核心公式与陷阱 (${allFormulas.length})`
                : `Formula & Trap Sheet (${allFormulas.length})`}
            </Link>
          </div>

          {view === "formulas" && (
            <form method="get" action={`${base}/learn`} className="relative w-full sm:w-64">
              <input type="hidden" name="subject" value={subjectCode} />
              <input type="hidden" name="view" value="formulas" />
              <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                name="q"
                defaultValue={params.q ?? ""}
                placeholder={zh ? "搜索公式、概念或陷阱…" : "Search formulas or traps…"}
                className="h-9 w-full rounded-lg border border-line bg-card pr-3 pl-8 text-[12px] text-ink placeholder:text-ink-faint focus:border-vermillion focus:outline-none"
              />
            </form>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-line bg-card p-4">
          <p className="text-[12.5px] font-medium text-ink">
            {displaySubject(subject, track)}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">
            {displayBlurb(subject, track)}
          </p>
        </div>

        {view === "formulas" ? (
          <div className="mt-6">
            {filteredFormulas.length === 0 ? (
              <div className="panel p-8 text-center">
                <p className="font-display text-xl text-ink">
                  {zh ? "没有匹配的公式或陷阱卡片" : "No matching formulas found"}
                </p>
                <Link
                  href={trackLink("/app/learn", track, {
                    subject: subjectCode,
                    view: "formulas",
                  })}
                  className="mt-3 inline-flex text-[12px] font-medium text-vermillion hover:underline"
                >
                  {zh ? "重置搜索" : "Reset search"}
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredFormulas.map((card) => (
                  <article
                    key={card.code}
                    className="flex flex-col justify-between rounded-xl border border-line bg-card p-5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-paper-deep px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                          {card.topicCode} · {zh ? card.unitZh : card.unitEn}
                        </span>
                        <span className="text-[10px] font-mono text-ink-faint">
                          {card.code}
                        </span>
                      </div>

                      <h2 className="mt-2 font-display text-lg text-ink">
                        {zh ? card.titleZh : card.titleEn}
                      </h2>

                      <div className="mt-3 overflow-x-auto rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[13px] text-ink">
                        <MathText>{card.formula}</MathText>
                      </div>

                      <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
                        <MathText>{zh ? card.summaryZh : card.summaryEn}</MathText>
                      </p>

                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold-soft/60 px-3 py-2 text-[11.5px] leading-relaxed text-ink">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                        <div>
                          <span className="font-semibold text-gold-deep">
                            {zh ? "考官陷阱：" : "Examiner trap: "}
                          </span>
                          <MathText>{zh ? card.trapZh : card.trapEn}</MathText>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                      {!zh && conceptCodes.has(card.topicCode) ? (
                        <Link
                          href={trackLink(`/app/learn/${card.topicCode}`, track)}
                          className="text-[11.5px] font-medium text-indigo hover:underline"
                        >
                          Concept lesson →
                        </Link>
                      ) : (
                        <span />
                      )}
                      <Link
                        href={trackLink(`/app/practice/topic/${card.topicCode}`, track)}
                        className="inline-flex items-center gap-1 rounded-lg border border-line bg-paper px-3 py-1.5 text-[11.5px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                      >
                        {zh ? "专题训练 10 题" : "Drill this topic"}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : concepts.length === 0 ? (
          <div className="mt-6 panel p-8 text-center">
            <GraduationCap className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-xl text-ink">Concept notes are being authored</p>
            <p className="mx-auto mt-2 max-w-md text-[13px] text-ink-soft">
              Every topic in {displaySubject(subject, track)} already has practice questions. Written
              concept lessons are on the way — start with a drill in the meantime.
            </p>
            <Link
              href={trackLink("/app/practice", track, { subject: subjectCode })}
              className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              Practice {displaySubject(subject, track)} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 rounded-xl border border-line bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-medium text-ink">
                  {displaySubject(subject, track)} · {doneInSubject}/{concepts.length} concepts
                  understood
                </p>
                <span className="text-[11px] font-medium text-ink-soft tabular">{pct}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-deep">
                <div
                  className="h-full rounded-full bg-vermillion transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {Object.entries(units).map(([unit, unitConcepts]) => (
                <section key={unit}>
                  <h2 className="border-b border-line pb-2 font-display text-lg text-ink">{unit}</h2>
                  <div className="mt-3 divide-y divide-line/70">
                    {unitConcepts.map((concept) => {
                      const topic = topicByCode.get(concept.topicCode);
                      const isDone = completed.has(concept.topicCode);
                      const hasQuestions = (topic?._count?.questions ?? 0) > 0;
                      return (
                        <Link
                          key={concept.topicCode}
                          href={trackLink(`/app/learn/${concept.topicCode}`, track)}
                          className="group flex items-center justify-between gap-4 py-3.5 transition"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            {isDone ? (
                              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-jade" />
                            ) : (
                              <Circle className="h-4.5 w-4.5 shrink-0 text-line-strong" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-[13.5px] font-medium text-ink">
                                {concept.titleEn}
                              </p>
                              <p className="mt-0.5 truncate text-[11px] text-ink-faint">
                                {concept.topicCode}
                                {hasQuestions
                                  ? ` · ${topic?._count?.questions} practice questions`
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-medium text-ink-soft transition group-hover:text-indigo">
                            {isDone ? "Review" : "Open"}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-8 flex items-center gap-1.5 text-[11px] text-ink-faint">
              <BookOpen className="h-3.5 w-3.5" />
              {conceptCodes.size} concept lessons in this subject. Every lesson ends with a self-check
              quiz drawn from the question bank.
            </p>
          </>
        )}
      </AppBody>
    </>
  );
}

function sessionTrack(track: string | null | undefined) {
  return track ?? undefined;
}
