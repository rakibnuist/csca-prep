import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Play,
  RotateCcw,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { TrackSwitch } from "@/components/app/track-switch";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import {
  EXAM_BLOCKS,
  nextSitting,
  sittingsForBlock,
  type ExamBlock,
  type ExamTimetableRow,
} from "@/lib/site";
import {
  displaySubject,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackPaperWhere,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Sitting-Day Simulator", "全真场次连考模拟");
}

type ComboSpec = {
  key: string;
  labelEn: string;
  labelZh: string;
  codes: SubjectCode[];
};

const EN_COMBOS: ComboSpec[] = [
  {
    key: "stem-full",
    labelEn: "STEM Full (Math + Physics + Chemistry)",
    labelZh: "理工完整组合（数学 + 物理 + 化学）",
    codes: ["MATH", "PHYS", "CHEM"],
  },
  {
    key: "math-phys",
    labelEn: "Math + Physics",
    labelZh: "数学 + 物理",
    codes: ["MATH", "PHYS"],
  },
  {
    key: "math-chem",
    labelEn: "Math + Chemistry",
    labelZh: "数学 + 化学",
    codes: ["MATH", "CHEM"],
  },
];

const CN_COMBOS: ComboSpec[] = [
  {
    key: "cn-stem",
    labelEn: "STEM Full (STEM 中文 + Math + Phys + Chem)",
    labelZh: "理工全科（理科中文 + 数学 + 物理 + 化学）",
    codes: ["CH_SCI", "MATH", "PHYS", "CHEM"],
  },
  {
    key: "cn-hum",
    labelEn: "Humanities (Humanities 中文 + Math)",
    labelZh: "人文社科组合（文科中文 + 数学）",
    codes: ["CH_HUM", "MATH"],
  },
  {
    key: "cn-sci-core",
    labelEn: "STEM Core (STEM 中文 + Math)",
    labelZh: "理工核心（理科中文 + 数学）",
    codes: ["CH_SCI", "MATH"],
  },
];

function timetableRowFor(code: SubjectCode, block: ExamBlock): ExamTimetableRow {
  const rows = EXAM_BLOCKS[block];
  if (code === "CH_HUM" || code === "CH_SCI") return rows[0];
  if (code === "MATH") return rows[1];
  if (code === "PHYS") return rows[2];
  return rows[3];
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export default async function SittingSimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ block?: string; combo?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const track = await getResolvedTrack(params.taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const zh = track === "CN";
  const base = zh ? "/cn" : "/en";

  const activeBlock: ExamBlock =
    params.block === "08:00" || params.block === "14:00"
      ? params.block
      : nextSitting().block;

  const combos = zh ? CN_COMBOS : EN_COMBOS;
  const defaultComboKey = zh
    ? programme === "HUMANITIES"
      ? "cn-hum"
      : "cn-stem"
    : "stem-full";
  const activeCombo =
    combos.find((c) => c.key === params.combo) ??
    combos.find((c) => c.key === defaultComboKey) ??
    combos[0];

  const selectedCodes = activeCombo.codes;

  const mocks = await prisma.mock.findMany({
    where: {
      published: true,
      isFullLength: true,
      subjectCode: { in: selectedCodes },
      AND: [trackPaperWhere(track, programme)],
    },
    include: {
      _count: { select: { items: true } },
      attempts: {
        where: { userId: user.id, track },
        orderBy: { startedAt: "desc" },
        select: { id: true, status: true, score: true, completedAt: true },
      },
    },
    orderBy: [{ paper: "asc" }, { title: "asc" }],
  });

  // Prefer "Paper 01" (original full mock) for each subject when available.
  const bestMockBySubject = new Map<string, (typeof mocks)[number]>();
  for (const mock of mocks) {
    const existing = bestMockBySubject.get(mock.subjectCode);
    if (!existing) {
      bestMockBySubject.set(mock.subjectCode, mock);
    } else if (mock.paper === "Paper 01" && existing.paper !== "Paper 01") {
      bestMockBySubject.set(mock.subjectCode, mock);
    }
  }

  const slots = selectedCodes
    .map((code) => {
      const row = timetableRowFor(code, activeBlock);
      const mock = bestMockBySubject.get(code) ?? null;
      const submitted = mock?.attempts.filter((a) => a.status === "SUBMITTED") ?? [];
      const inProgress = mock?.attempts.find((a) => a.status === "IN_PROGRESS") ?? null;
      const latestSubmitted = submitted[0] ?? null;
      const bestScore =
        submitted.length > 0 ? Math.max(...submitted.map((a) => a.score)) : null;

      return {
        code,
        subject: SUBJECT_MAP[code],
        row,
        mock,
        latestSubmitted,
        bestScore,
        inProgress,
      };
    })
    .sort((a, b) => {
      if (a.row.day !== b.row.day) return a.row.day === "Day 1" ? -1 : 1;
      return toMinutes(a.row.start) - toMinutes(b.row.start);
    });

  const dayGroups: Array<{ day: "Day 1" | "Day 2"; items: typeof slots }> = [
    { day: "Day 1" as const, items: slots.filter((s) => s.row.day === "Day 1") },
    { day: "Day 2" as const, items: slots.filter((s) => s.row.day === "Day 2") },
  ].filter((g) => g.items.length > 0);

  const completedSlots = slots.filter((s) => s.latestSubmitted !== null);
  const completedCount = completedSlots.length;
  const averageScore =
    completedCount > 0
      ? Math.round(
          completedSlots.reduce((sum, s) => sum + (s.bestScore ?? 0), 0) /
            completedCount,
        )
      : null;
  const totalMinutes = slots.reduce((sum, s) => sum + s.row.minutes, 0);
  const nextPaper = slots.find((s) => !s.latestSubmitted && s.mock !== null);

  const buildHref = (opts: { block?: ExamBlock; combo?: string }) =>
    `${base}/sitting?block=${opts.block ?? activeBlock}&combo=${opts.combo ?? activeCombo.key}`;

  return (
    <>
      <PageHeader
        eyebrow={zh ? "全真场次模拟" : "Sitting-Day Simulator"}
        title={
          zh
            ? "按真实 CSCA 两天考试时刻表连考。"
            : "Simulate the real two-day sitting timetable."
        }
        body={
          zh
            ? "按照官方 08:00 或 14:00 交替时间表顺序完成各科整卷，追踪场次综合均分与连续考试体力节奏。"
            : "Run back-to-back full papers on the official 08:00 or 14:00 Beijing timetable block and track your composite sitting score."
        }
        action={
          <Link
            href={trackLink("/app/mocks", track)}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {zh ? "返回模拟卷列表" : "All mock papers"}
          </Link>
        }
      />

      <AppBody>
        <TrackSwitch track={track} />

        {/* Controls: Timetable Block + Subject Combination */}
        <div className="mt-4 space-y-3 rounded-xl border border-line bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              {zh ? "开考时间档" : "Start block"}
            </span>
            {(["08:00", "14:00"] as const).map((blk) => {
              const sittings = sittingsForBlock(blk);
              return (
                <Link
                  key={blk}
                  href={buildHref({ block: blk })}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                    activeBlock === blk
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
                  )}
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>{blk} UTC+8</span>
                  <span className="hidden text-[10.5px] opacity-70 sm:inline">
                    ({sittings.slice(0, 2).join(", ")})
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-line/70 pt-3">
            <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              {zh ? "报考科目组合" : "Subject combo"}
            </span>
            {combos.map((c) => (
              <Link
                key={c.key}
                href={buildHref({ combo: c.key })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition",
                  activeCombo.key === c.key
                    ? "border-vermillion bg-vermillion text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {zh ? c.labelZh : c.labelEn}
              </Link>
            ))}
          </div>
        </div>

        {/* Readiness Summary Strip */}
        <section className="mt-5 grid gap-3 sm:grid-cols-4">
          <div className="panel p-4">
            <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {zh ? "已完成科目" : "Papers completed"}
            </p>
            <p className="mt-1.5 font-display text-3xl text-ink tabular">
              {completedCount}
              <span className="text-lg text-ink-faint">/{slots.length}</span>
            </p>
          </div>

          <div className="panel p-4">
            <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {zh ? "场次综合均分" : "Composite avg score"}
            </p>
            <p className="mt-1.5 font-display text-3xl text-jade tabular">
              {averageScore !== null ? `${averageScore}/100` : "—"}
            </p>
          </div>

          <div className="panel p-4">
            <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {zh ? "总计考试时长" : "Total exam clock"}
            </p>
            <p className="mt-1.5 font-display text-3xl text-ink tabular">
              {totalMinutes}
              <span className="ml-1 text-sm font-normal text-ink-faint">min</span>
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-vermillion/30 bg-vermillion/[0.05] p-4">
            <p className="text-[10.5px] font-semibold tracking-[0.12em] text-vermillion uppercase">
              {zh ? "下一步" : "Next paper in queue"}
            </p>
            {nextPaper && nextPaper.mock ? (
              <Link
                href={trackLink(`/exam/${nextPaper.mock.slug}`, track)}
                className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-vermillion px-3 text-[12px] font-semibold text-white transition hover:bg-vermillion-deep"
              >
                <Play className="h-3.5 w-3.5" />
                {zh
                  ? `开始 ${nextPaper.subject.nameZh}`
                  : `Launch ${nextPaper.subject.shortEn}`}
              </Link>
            ) : (
              <div className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-jade">
                <CheckCircle2 className="h-4 w-4" />
                {zh ? "全场次已完成" : "All papers sat!"}
              </div>
            )}
          </div>
        </section>

        {/* Day 1 & Day 2 Timetable Cards */}
        <div className="mt-8 space-y-8">
          {dayGroups.map((group) => (
            <section key={group.day}>
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-vermillion" />
                  <h2 className="font-display text-xl text-ink">
                    {group.day === "Day 1"
                      ? zh
                        ? "第 1 天考试日程"
                        : "Day 1 Sitting Sequence"
                      : zh
                        ? "第 2 天考试日程"
                        : "Day 2 Sitting Sequence"}
                  </h2>
                </div>
                <span className="text-[11px] text-ink-faint">
                  {activeBlock} {zh ? "北京时间 (UTC+8)" : "Beijing Time (UTC+8)"}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {group.items.map((slot, idx) => {
                  const nextSlot = group.items[idx + 1];
                  const breakMin =
                    nextSlot !== undefined
                      ? Math.max(
                          0,
                          toMinutes(nextSlot.row.start) - toMinutes(slot.row.end),
                        )
                      : 0;
                  const done = slot.latestSubmitted !== null;

                  return (
                    <div key={slot.code} className="space-y-2.5">
                      <div className="flex flex-col gap-4 rounded-xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded bg-paper-deep px-2 py-0.5 font-mono text-[11px] font-semibold text-ink tabular">
                              {slot.row.time}
                            </span>
                            <span className="text-[11px] text-ink-faint">
                              {slot.row.minutes} min · {slot.code}
                            </span>
                            {slot.inProgress ? (
                              <span className="rounded-full border border-gold/40 bg-gold-soft px-2 py-0.5 text-[10px] font-semibold text-gold-deep">
                                {zh ? "作答中" : "In progress"}
                              </span>
                            ) : done ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-jade/30 bg-jade-soft px-2 py-0.5 text-[10px] font-semibold text-jade">
                                <CheckCircle2 className="h-3 w-3" />
                                {zh ? `最高 ${slot.bestScore}/100` : `Best ${slot.bestScore}/100`}
                              </span>
                            ) : null}
                          </div>

                          <h3 className="mt-2 font-display text-lg text-ink">
                            {displaySubject(slot.subject, track)}
                          </h3>
                          {slot.mock ? (
                            <p className="mt-0.5 text-[12px] text-ink-soft">
                              {zh && slot.mock.titleZh ? slot.mock.titleZh : slot.mock.title} ·{" "}
                              {slot.mock._count.items} {zh ? "题" : "questions"}
                            </p>
                          ) : (
                            <p className="mt-0.5 text-[12px] text-ink-faint">
                              {zh ? "暂无整卷" : "No full-length paper configured yet."}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2">
                          {slot.latestSubmitted ? (
                            <Link
                              href={trackLink(
                                `/app/results/${slot.latestSubmitted.id}`,
                                track,
                              )}
                              className="inline-flex h-9 items-center rounded-lg border border-line bg-paper px-3 text-[12px] font-medium text-ink transition hover:border-line-strong"
                            >
                              {zh ? "查看成绩单" : "View result"}
                            </Link>
                          ) : null}

                          {slot.mock ? (
                            <Link
                              href={trackLink(`/exam/${slot.mock.slug}`, track)}
                              className={cn(
                                "inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[12px] font-semibold transition",
                                slot.inProgress || !done
                                  ? "bg-vermillion text-white hover:bg-vermillion-deep"
                                  : "border border-line-strong bg-card text-ink hover:border-ink/30",
                              )}
                            >
                              {slot.inProgress ? (
                                <>
                                  <Play className="h-3.5 w-3.5" />
                                  {zh ? "继续作答" : "Resume paper"}
                                </>
                              ) : done ? (
                                <>
                                  <RotateCcw className="h-3.5 w-3.5" />
                                  {zh ? "重刷本场" : "Retake"}
                                </>
                              ) : (
                                <>
                                  <Play className="h-3.5 w-3.5" />
                                  {zh ? "开始本场模拟" : "Start paper"}
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </>
                              )}
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      {breakMin > 0 && (
                        <div className="flex items-center justify-center">
                          <span className="rounded-full border border-dashed border-line-strong bg-paper px-3 py-1 text-[11px] font-medium text-ink-faint">
                            {zh
                              ? `↕ 场间休息 ${breakMin} 分钟（官方考试时刻表间隔）`
                              : `↕ ${breakMin}-minute official inter-paper break before next session`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </AppBody>
    </>
  );
}
