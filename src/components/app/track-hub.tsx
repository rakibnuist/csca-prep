import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileStack,
  GraduationCap,
  PenLine,
  ScrollText,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { TrackSwitch } from "@/components/app/track-switch";
import { conceptsForSubject } from "@/lib/concepts";
import {
  TRACKS,
  displayBlurb,
  displaySubject,
  trackLink,
  trackPaperWhere,
  trackQuestionWhere,
  trackSubjectCodes,
  type Programme,
  type TaughtTrack,
} from "@/lib/tracks";

/**
 * Section hub for one teaching track.
 *
 * Everything is scoped: the subject list, the bank counts, the paper counts and
 * every link carry `taught=` so a student cannot drift into the other track by
 * following a card.
 */
export async function TrackHub({ track, programme }: { track: TaughtTrack; programme?: Programme | null }) {
  const spec = TRACKS[track];
  const codes = trackSubjectCodes(track, programme);
  const questionWhere = trackQuestionWhere(track, programme);
  const paperScope = trackPaperWhere(track, programme);

  const [topicRows, questionRows, paperRows] = await Promise.all([
    prisma.topic.groupBy({
      by: ["subjectCode"],
      where: { subjectCode: { in: codes } },
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["subjectCode"],
      where: { subjectCode: { in: codes }, active: true, ...questionWhere },
      _count: { _all: true },
    }),
    prisma.mock.findMany({
      where: {
        published: true,
        subjectCode: { in: codes },
        AND: [
          { OR: [{ paper: "Paper 01" }, { paper: "Practice Set" }, { paper: "Official" }, { paper: "Review" }] },
          paperScope,
        ],
      },
      select: { subjectCode: true, paper: true },
    }),
  ]);

  const topicCount = new Map(topicRows.map((row) => [row.subjectCode, row._count._all]));
  const questionCount = new Map(questionRows.map((row) => [row.subjectCode, row._count._all]));

  const paperCount = (code: string, kind: "mock" | "official") =>
    paperRows.filter(
      (row) =>
        row.subjectCode === code &&
        (kind === "mock"
          ? row.paper === "Paper 01" || row.paper === "Practice Set"
          : row.paper === "Official" || row.paper === "Review"),
    ).length;

  const totalQuestions = questionRows.reduce((sum, row) => sum + row._count._all, 0);
  const totalPapers = paperRows.length;
  const zh = track === "CN";
  const label = {
    contains: zh ? "本区内容" : "What this section contains",
    glance: zh ? "本区一览" : "This section at a glance",
    subjects: zh ? "个科目" : "subjects",
    questions: zh ? "道题" : "questions",
    papers: zh ? "套试卷" : "papers",
    language: zh ? "试卷语言" : "paper language",
    practice: zh ? "练习" : "Practice",
    mocks: zh ? "模拟" : "Mocks",
    official: zh ? "官方真题" : "Official",
    learn: zh ? "概念课" : "Learn",
    topics: zh ? "个知识点" : "topics",
    mocksCount: zh ? "套模拟" : "mocks",
    officialCount: zh ? "套真题" : "official",
    practiceSubject: zh ? "练习这个科目" : "Practice this subject",
    mockTests: zh ? "模拟考试" : "Mock tests",
    officialPapers: zh ? "官方真题" : "Official papers",
    concepts: zh ? "个概念" : "concepts",
    notIn: zh ? "本区不包含：" : "Not in this section:",
    notInBody: zh
      ? "仅英文的试卷、英文练习题，以及没有中文来源的复习模块。"
      : "English-only papers, English drill items and review modules that have no Chinese source text.",
    quiz: zh ? "今日十题（本区）" : "Today's quiz in this track",
  };

  return (
    <>
      <PageHeader
        eyebrow={zh ? "中文授课项目" : spec.eyebrow}
        title={spec.tagline}
        body={spec.body}
      />

      <AppBody>
        <TrackSwitch track={track} />

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1.45fr_1fr]">
          <div className="min-w-0 rounded-xl border border-jade/25 bg-jade-soft/40 p-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-jade uppercase">
              {label.contains}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {spec.includes.map((line) => (
                <li key={line} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-jade/15 pt-2.5 text-[11.5px] leading-relaxed text-ink-faint">
              {spec.boundary}
            </p>
          </div>

          <div className="min-w-0 rounded-xl border border-line bg-card p-4">
            <p className="text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {label.glance}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl leading-none text-ink tabular">{codes.length}</p>
                <p className="mt-1 text-[10.5px] text-ink-faint">{label.subjects}</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl leading-none text-ink tabular">
                  {totalQuestions.toLocaleString()}
                </p>
                <p className="mt-1 text-[10.5px] text-ink-faint">{label.questions}</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl leading-none text-ink tabular">{totalPapers}</p>
                <p className="mt-1 text-[10.5px] text-ink-faint">{label.papers}</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl leading-none text-ink tabular">
                  {track === "CN" ? "中文" : "EN"}
                </p>
                <p className="mt-1 text-[10.5px] text-ink-faint">{label.language}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Link
                href={trackLink("/app/practice", track)}
                className="inline-flex h-8 items-center gap-1 rounded-md bg-ink px-2.5 text-[11px] font-medium text-paper"
              >
                <PenLine className="h-3 w-3" /> {label.practice}
              </Link>
              <Link
                href={trackLink("/app/mocks", track)}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-paper px-2.5 text-[11px] font-medium text-ink"
              >
                <FileStack className="h-3 w-3" /> {label.mocks}
              </Link>
              <Link
                href={trackLink("/app/official", track)}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-paper px-2.5 text-[11px] font-medium text-ink"
              >
                <ScrollText className="h-3 w-3" /> {label.official}
              </Link>
              {track === "EN" && (
                <Link
                  href={trackLink("/app/learn", track)}
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-paper px-2.5 text-[11px] font-medium text-ink"
                >
                  <GraduationCap className="h-3 w-3" /> {label.learn}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {codes.map((code) => {
            const concepts = conceptsForSubject(code).length;
            return (
              <section
                key={code}
                className="rounded-xl border border-line bg-paper px-4 py-4 sm:px-5"
                aria-label={displaySubject(code, track)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-[21px] leading-tight text-ink">
                        {displaySubject(code, track)}
                      </h2>
                      <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[9.5px] font-medium text-ink-faint">
                        {code}
                      </span>

                    </div>
                    <p className="mt-1 max-w-2xl text-[11.5px] leading-relaxed text-ink-faint">
                      {displayBlurb(code, track)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ink-faint">
                    <span>
                      {topicCount.get(code) ?? 0} {label.topics}
                    </span>
                    <span>
                      {(questionCount.get(code) ?? 0).toLocaleString()} {label.questions}
                    </span>
                    <span>
                      {paperCount(code, "mock")} {label.mocksCount}
                    </span>
                    <span>
                      {paperCount(code, "official")} {label.officialCount}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Link
                    href={trackLink("/app/practice", track, { subject: code })}
                    className="inline-flex h-8 items-center gap-1 rounded-md bg-vermillion px-2.5 text-[11px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    <PenLine className="h-3 w-3" /> {label.practiceSubject}
                  </Link>
                  <Link
                    href={trackLink("/app/mocks", track, { subject: code })}
                    className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-ink/30"
                  >
                    <FileStack className="h-3 w-3" /> {label.mockTests}
                  </Link>
                  <Link
                    href={trackLink("/app/official", track, { subject: code })}
                    className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-ink/30"
                  >
                    <ScrollText className="h-3 w-3" /> {label.officialPapers}
                  </Link>
                  {concepts > 0 && track === "EN" && (
                    <Link
                      href={trackLink("/app/learn", track, { subject: code })}
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-ink/30"
                    >
                      <BookOpen className="h-3 w-3" /> {concepts} {label.concepts}
                    </Link>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-card p-4 text-[11.5px] leading-relaxed text-ink-soft">
          <p>
            <span className="font-medium text-ink">{label.notIn}</span>{" "}
            {zh ? label.notInBody : "Professional Chinese (Humanities or STEM), Chinese-only items and Chinese paper text."}{" "}
            <Link
              href={trackLink("/app/settings", track)}
              className="ml-1 font-medium text-vermillion underline underline-offset-2"
            >
              {zh ? "在设置中更改分区" : "Change your section in Settings"}
            </Link>
            {zh ? "。" : "."}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href={trackLink("/app/daily", track)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-3.5 text-[12px] font-medium text-paper"
          >
            {label.quiz} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </AppBody>
    </>
  );
}
