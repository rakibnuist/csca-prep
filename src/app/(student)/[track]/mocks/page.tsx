import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Play,
  Target,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { MockSubjectSection, type MockCardItem } from "@/components/app/mock-subject-section";
import { TrackSwitch } from "@/components/app/track-switch";
import { entitlementFor, paperKind, setNumber, FREE_SETS_PER_SUBJECT } from "@/lib/entitlements";
import {
  TRACKS,
  displaySubject,
  displaySubjectShort,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackPaperWhere,
  trackSubjectCodes,
  trackSubjects,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Mock tests", "模拟考试");
}

type MockEntry = {
  mock: {
    id: string;
    slug: string;
    title: string;
    titleZh: string | null;
    paper: string | null;
    durationMin: number;
    isFullLength: boolean;
    subjectCode: string;
    subject: { nameEn: string; shortEn: string; nameZh: string };
    _count: { items: number };
    attempts: { id: string; status: string; score: number }[];
  };
  kind: ReturnType<typeof paperKind>;
};

const FILTERS = [
  { key: "all", en: "All", zh: "全部" },
  { key: "free", en: "Free mocks", zh: "免费" },
  { key: "todo", en: "Not started", zh: "未作答" },
  { key: "done", en: "Completed", zh: "已完成" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/**
 * Mock tests for one teaching track. The library is unified inside a section
 * (originals and practice sets together), but the section itself is scoped:
 * English-taught lists Mathematics, Physics and Chemistry only; Chinese-taught
 * adds the two Professional Chinese streams and hides English-only papers.
 */
export default async function MocksPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; filter?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const access = await getAccess(user.id);
  const params = await searchParams;

  const track = await getResolvedTrack(params.taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const lang = track === "CN" ? "zh" : "en";
  const zh = track === "CN";
  const trackCodes = trackSubjectCodes(track, programme);
  const subjectsForTrack = trackSubjects(track, programme);
  const activeSubject =
    params.subject && (trackCodes as string[]).includes(params.subject) ? params.subject : undefined;
  const activeFilter: FilterKey =
    FILTERS.some((f) => f.key === params.filter) ? (params.filter as FilterKey) : "all";

  const mocks = await prisma.mock.findMany({
    where: {
      published: true,
      subjectCode: { in: trackCodes },
      AND: [
        { OR: [{ paper: "Paper 01" }, { paper: "Practice Set" }] },
        trackPaperWhere(track, programme),
      ],
    },
    include: {
      subject: true,
      _count: { select: { items: true } },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: "desc" },
        select: { id: true, status: true, score: true },
      },
    },
    orderBy: [{ subjectCode: "asc" }, { title: "asc" }],
  });

  const figures = await prisma.mockItem.groupBy({
    by: ["mockId"],
    where: { question: { figure: { not: null } } },
    _count: { _all: true },
  });
  const figureMap = new Map(figures.map((row) => [row.mockId, row._count._all]));

  const all = mocks.map((mock) => ({ mock, kind: paperKind(mock.paper, mock.slug) })) as MockEntry[];
  const inProgressEntry = all.find((entry) =>
    entry.mock.attempts.some((attempt) => attempt.status === "IN_PROGRESS"),
  );

  const bySubject = (code: string) =>
    all
      .filter((entry) => entry.mock.subjectCode === code)
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "original" ? -1 : 1;
        return setNumber(a.mock.slug) - setNumber(b.mock.slug);
      });

  const toCardItem = (entry: MockEntry): MockCardItem => {
    const { mock, kind } = entry;
    const submitted = mock.attempts.filter((attempt) => attempt.status === "SUBMITTED");
    const inProgress = mock.attempts.some((attempt) => attempt.status === "IN_PROGRESS");
    const bestScore = submitted.reduce((max, attempt) => Math.max(max, attempt.score), 0);
    const entitlement = entitlementFor(access, kind, mock.slug, submitted.length, lang);
    const figureCount = figureMap.get(mock.id) ?? 0;
    const isOriginal = kind === "original";
    const sn = setNumber(mock.slug);
    const isFreeMock = isOriginal || (kind === "set" && sn > 0 && sn <= FREE_SETS_PER_SUBJECT);

    return {
      id: mock.id,
      slug: mock.slug,
      title: zh && mock.titleZh ? mock.titleZh : mock.title,
      durationMin: mock.durationMin,
      itemCount: mock._count.items,
      figureCount,
      isOriginal,
      setNum: sn,
      isFreeMock,
      submittedCount: submitted.length,
      bestScore,
      inProgress,
      canSit: entitlement.canSit,
      entitlementNote: entitlement.note,
      examHref: trackLink(`/exam/${mock.slug}`, track),
      briefingHref: trackLink(`/app/mocks/${mock.slug}`, track),
      redeemHref: trackLink("/app/billing#redeem", track),
    };
  };

  const matchesFilter = (item: MockCardItem) => {
    if (activeFilter === "free") return item.isFreeMock && item.canSit;
    if (activeFilter === "todo") return item.submittedCount === 0 && !item.inProgress;
    if (activeFilter === "done") return item.submittedCount > 0;
    return true;
  };

  const subjectsToShow = activeSubject
    ? subjectsForTrack.filter((subject) => subject.code === activeSubject)
    : subjectsForTrack;

  const subjectBlocks = subjectsToShow.map((subject) => {
    const fullList = bySubject(subject.code).map(toCardItem);
    const sat = fullList.filter((item) => item.submittedCount > 0).length;
    const bestScoreValues = fullList
      .filter((item) => item.submittedCount > 0)
      .map((item) => item.bestScore);
    const bestSubjectScore =
      bestScoreValues.length > 0 ? Math.max(...bestScoreValues) : null;
    const filtered = fullList.filter(matchesFilter);
    return {
      subject,
      totalInSubject: fullList.length,
      satCount: sat,
      bestSubjectScore,
      items: filtered,
    };
  });

  const totalAllSubjects = subjectsForTrack.reduce(
    (sum, subject) => sum + bySubject(subject.code).length,
    0,
  );
  const totalShown = subjectBlocks.reduce((total, block) => total + block.items.length, 0);
  const nothing = totalShown === 0;

  const filterHref = (next: { subject?: string | null; filter?: FilterKey }) => {
    const sub = next.subject === null ? undefined : (next.subject ?? activeSubject);
    const fil = next.filter ?? activeFilter;
    return trackLink("/app/mocks", track, {
      subject: sub,
      filter: fil === "all" ? undefined : fil,
    });
  };

  return (
    <>
      <PageHeader
        eyebrow={zh ? "模拟考试" : "Exam · Mock tests"}
        title={zh ? "中文模拟卷" : "English mock tests"}
        body={
          zh
            ? `本区统一模拟题库：原创卷与练习卷合并在同一个列表中，按官方格式组卷，0–100 分。每个科目可免费做 5 套（1 套原创 + 练习卷 01–0${FREE_SETS_PER_SUBJECT}）。`
            : `One unified mock library inside the English-taught section — originals and practice sets together, in the real format, scored 0–100. Every subject gives you 5 free mocks to sit (1 original + sets 01–0${FREE_SETS_PER_SUBJECT}).`
        }
        action={
          <Link
            href={trackLink("/app/official", track)}
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            <BookOpen className="h-3.5 w-3.5" /> {t(lang, "Official papers")}
          </Link>
        }
      />

      <AppBody>
        <TrackSwitch track={track} />

        {/* Full Sitting-Day Simulator banner */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.14em] text-vermillion uppercase">
              {zh ? "考场连考模式" : "Full Exam-Day Mode"}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold text-ink">
              {zh
                ? "全真场次连考模拟（严格按 08:00 / 14:00 两天日程顺序）"
                : "Full Sitting-Day Back-to-Back Simulator (08:00 / 14:00 official timetable)"}
            </p>
            <p className="mt-0.5 text-[11.5px] text-ink-soft">
              {zh
                ? "把你报考科目的全真模拟卷按两天真实考试时段串联作答，并统计综合均分。"
                : "Chain your required subject papers across Day 1 and Day 2 slots and track your composite sitting score."}
            </p>
          </div>
          <Link
            href={`${zh ? "/cn" : "/en"}/sitting`}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12px] font-medium text-paper transition hover:bg-ink/85"
          >
            {zh ? "进入场次模拟" : "Open sitting simulator"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {inProgressEntry && (
          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border border-gold/40 bg-gold-soft/50 px-4 py-3.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <Clock3 className="h-4 w-4 shrink-0 text-gold" />
              <p className="text-[12.5px] text-ink">
                {zh ? (
                  <>
                    <span className="font-medium">
                      {inProgressEntry.mock.titleZh ?? inProgressEntry.mock.title}
                    </span>{" "}
                    正在进行——计时仍在继续。
                  </>
                ) : (
                  <>
                    <span className="font-medium">{inProgressEntry.mock.title}</span> is in
                    progress — the timer is still running.
                  </>
                )}
              </p>
            </div>
            <Link
              href={trackLink(`/exam/${inProgressEntry.mock.slug}`, track)}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-ink px-3.5 text-[11.5px] font-medium text-paper transition hover:bg-ink/85"
            >
              <Play className="h-3 w-3" /> {t(lang, "Resume")}
            </Link>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            {t(lang, "Subject")}
          </span>
          <Link
            href={filterHref({ subject: null })}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[11.5px] font-medium transition",
              !activeSubject
                ? "border-ink bg-ink text-paper"
                : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {t(lang, "All")}
            <span className="text-[10px] opacity-60 tabular">{totalAllSubjects}</span>
          </Link>
          {subjectsForTrack.map((subject) => {
            const count = bySubject(subject.code).length;
            return (
              <Link
                key={subject.code}
                href={filterHref({ subject: subject.code })}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[11.5px] font-medium transition",
                  activeSubject === subject.code
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {displaySubjectShort(subject, track)}
                <span className="text-[10px] opacity-60 tabular">{count}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            {zh ? "筛选" : "Filter"}
          </span>
          {FILTERS.map((entry) => {
            const active = activeFilter === entry.key;
            return (
              <Link
                key={entry.key}
                href={filterHref({ filter: entry.key })}
                className={cn(
                  "inline-flex h-7 items-center whitespace-nowrap rounded-full border px-3 text-[11px] font-medium transition",
                  active
                    ? "border-vermillion bg-vermillion text-paper"
                    : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {zh ? entry.zh : entry.en}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line bg-card/70 px-4 py-2.5 text-[11px] text-ink-soft">
          <span>
            <span className="font-medium text-ink">{zh ? "分区：" : "Section:"}</span>{" "}
            {zh ? "中文授课" : "English-taught"} ·{" "}
            {zh ? "中文试卷" : "English papers"}
          </span>
          <span>
            {zh ? (
              <>
                每科 <span className="font-medium text-jade">5 套免费</span>（1 套原创 + 练习卷 01–0
                {FREE_SETS_PER_SUBJECT}）
              </>
            ) : (
              <>
                <span className="font-medium text-jade">5 free</span> mocks per subject (1 original +
                sets 01–0{FREE_SETS_PER_SUBJECT})
              </>
            )}
          </span>
          <span>{zh ? "官方格式 · 0–100 分" : "Real format · 0–100"}</span>
        </div>

        {zh && (
          <p className="mt-3 rounded-lg border border-gold/30 bg-gold-soft/40 px-3 py-2 text-[11px] leading-relaxed text-ink-soft">
            {TRACKS.CN.boundary}
          </p>
        )}

        {nothing ? (
          <div className="panel mt-8 p-10 text-center">
            <Target className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-2xl text-ink">
              {activeFilter !== "all"
                ? zh
                  ? "没有符合条件的试卷"
                  : "No matching papers"
                : zh
                  ? "这个科目暂无中文试卷"
                  : "Nothing here yet"}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              {activeFilter !== "all"
                ? zh
                  ? "当前筛选条件下没有试卷，可以切换筛选条件查看全部。"
                  : "No papers match this filter yet. Clear the filter to see all available mocks."
                : zh
                  ? "该科目没有完整的中文来源试卷，因此不会出现在中文区。请换一个科目或查看英文区。"
                  : "No mock tests for this selection. Try another subject."}
            </p>
            <Link
              href={activeFilter !== "all" ? filterHref({ filter: "all" }) : TRACKS[track].appHref}
              className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
            >
              {activeFilter !== "all"
                ? zh
                  ? "显示全部试卷"
                  : "Show all papers"
                : zh
                  ? "中文区总览"
                  : `${TRACKS[track].label} overview`}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {subjectBlocks.map((block) => (
              <MockSubjectSection
                key={block.subject.code}
                subjectCode={block.subject.code}
                subjectName={displaySubject(block.subject, track)}
                subjectAltName={zh ? block.subject.nameEn : block.subject.nameZh}
                totalInSubject={block.totalInSubject}
                freeCount={1 + FREE_SETS_PER_SUBJECT}
                satCount={block.satCount}
                bestSubjectScore={block.bestSubjectScore}
                items={block.items}
                lang={lang}
                defaultExpanded={Boolean(activeSubject) || activeFilter !== "all"}
              />
            ))}
          </div>
        )}

        <div className="mt-10 rounded-xl border border-line bg-card p-4 text-[11.5px] leading-relaxed text-ink-soft">
          <p>
            {zh ? (
              <>
                <span className="font-medium text-ink">想做真实场次？</span> 我们免费提供官方真题——包含原始题目、官方答案与逐步解析。{" "}
                <Link
                  href={trackLink("/app/official", track)}
                  className="font-medium text-vermillion underline underline-offset-2"
                >
                  打开官方真题库
                </Link>
                。
              </>
            ) : (
              <>
                <span className="font-medium text-ink">Looking for the real sittings?</span> We share the
                official past papers free — the actual questions, the published answer keys and the
                working.{" "}
                <Link
                  href={trackLink("/app/official", track)}
                  className="font-medium text-vermillion underline underline-offset-2"
                >
                  Open the official archive
                </Link>
                .
              </>
            )}
          </p>
        </div>
      </AppBody>
    </>
  );
}
