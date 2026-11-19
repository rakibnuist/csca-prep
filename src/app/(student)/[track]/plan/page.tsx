import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { generatePlanAction, togglePlanTaskAction } from "@/lib/actions/plan";
import { EXAM_SITTINGS } from "@/lib/site";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { getSectionTrack } from "@/lib/section";
import { trackLink, trackMetaTitle, type TaughtTrack } from "@/lib/tracks";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Study plan", "学习计划");
}

const PHASES = [
  {
    key: "FOUNDATION",
    title: "Foundation",
    titleZh: "基础阶段",
    body: "Cover the syllabus, sit your baseline, learn where you actually stand.",
    bodyZh: "覆盖考纲，完成摸底，弄清自己真实的水平。",
  },
  {
    key: "INTENSIFICATION",
    title: "Intensification",
    titleZh: "强化阶段",
    body: "Targeted drills, timed papers, and an error log you actually re-read.",
    bodyZh: "针对性练习、计时套卷，以及会反复回看的错题本。",
  },
  {
    key: "SPRINT",
    title: "Sprint",
    titleZh: "冲刺阶段",
    body: "Full papers under exam conditions. No new material.",
    bodyZh: "按考试条件做完整套卷，不再学新内容。",
  },
];

function taskActionLink(
  title: string,
  detail: string | null,
  track: TaughtTrack,
  zh: boolean,
): { href: string; label: string } | null {
  const combined = `${title} ${detail ?? ""}`;
  const base = zh ? "/cn" : "/en";
  const topicMatch = combined.match(/\b([MPC]\d\.\d|[HS]\d)\b/);
  if (topicMatch) {
    return {
      href: trackLink(`/app/practice/topic/${topicMatch[1]}`, track),
      label: zh ? "去刷专项 →" : "Drill topic →",
    };
  }
  if (/(formula|公式)/i.test(combined)) {
    return {
      href: trackLink("/app/learn", track, { view: "formulas" }),
      label: zh ? "打开公式表 →" : "Formula sheet →",
    };
  }
  if (/(error|mistake|错题)/i.test(combined)) {
    return {
      href: `${base}/practice/mistakes`,
      label: zh ? "打开错题本 →" : "Error notebook →",
    };
  }
  if (/(diagnostic|paper|sprint|mock|摸底|套卷|计时卷|模拟)/i.test(combined)) {
    return {
      href: trackLink("/app/mocks", track),
      label: zh ? "去做模拟卷 →" : "Open mocks →",
    };
  }
  if (/(syllabus|大纲)/i.test(combined)) {
    return {
      href: trackLink("/app/practice", track),
      label: zh ? "查看专题练习 →" : "Browse topics →",
    };
  }
  if (/(logistics|registration|proctor|报名|监考|考试当天)/i.test(combined)) {
    return {
      href: "/test-day",
      label: zh ? "考前指南 →" : "Test-day rules →",
    };
  }
  return null;
}

export default async function PlanPage() {
  const session = await requireUser();
  const lang = await getSectionTrack(session.teachingTrack);
  const zh = lang === "CN";

  const availableSittings = EXAM_SITTINGS.filter(
    (sitting) => sitting.status !== "closed" && daysUntil(sitting.date) >= 0,
  );
  const fallbackSitting = EXAM_SITTINGS[EXAM_SITTINGS.length - 1];

  const tasks = await prisma.planTask.findMany({
    where: { userId: session.id },
    orderBy: [{ order: "asc" }],
  });

  const taggedDetail = tasks.map((t) => t.detail ?? "").join(" ");
  const selectedSitting =
    availableSittings.find((s) => taggedDetail.includes(s.label)) ??
    availableSittings[0] ??
    fallbackSitting;

  const done = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <>
      <PageHeader
        eyebrow={zh ? "学习计划" : "Study plan"}
        title={zh ? "一份能真正完成的学习计划。" : "A plan you can actually finish."}
        body={
          zh
            ? `围绕 ${selectedSitting.label} 场次制定——距离今天还有 ${Math.max(0, daysUntil(selectedSitting.date))} 天。支持切换目标考试日期并一键直达训练。`
            : `Built around the ${selectedSitting.label} sitting — ${Math.max(0, daysUntil(selectedSitting.date))} days from today. Choose your target sitting and jump straight into linked drills.`
        }
        action={
          <form action={generatePlanAction} className="flex flex-wrap items-center gap-2">
            {availableSittings.length > 0 && (
              <select
                name="sittingId"
                defaultValue={selectedSitting.id}
                aria-label={zh ? "选择目标考试场次" : "Target exam sitting"}
                className="h-10 rounded-lg border border-line-strong bg-card px-2.5 text-[12px] text-ink focus:border-vermillion focus:outline-none"
              >
                {availableSittings.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} ({s.block})
                  </option>
                ))}
              </select>
            )}
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {tasks.length
                ? zh
                  ? "按此场次重排计划"
                  : "Rebuild plan"
                : zh
                  ? "生成我的计划"
                  : "Generate my plan"}
            </button>
          </form>
        }
      />

      <AppBody>
        {tasks.length === 0 ? (
          <div className="panel p-8 text-center sm:p-10">
            <p className="font-display text-2xl text-ink">
              {zh ? "还没有学习计划" : "No plan yet"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-ink-soft">
              {zh
                ? `选择目标考试场次，点击下方按钮即可倒推生成三个阶段的任务清单，可随时重新生成且不会清除历史成绩。`
                : `Pick your target exam sitting and generate twelve action-linked tasks across three phases. Rebuilding keeps your mock history intact.`}
            </p>
            <form
              action={generatePlanAction}
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
            >
              {availableSittings.length > 0 && (
                <select
                  name="sittingId"
                  defaultValue={selectedSitting.id}
                  aria-label={zh ? "选择目标考试场次" : "Target exam sitting"}
                  className="h-10 rounded-lg border border-line-strong bg-card px-3 text-[12.5px] text-ink focus:border-vermillion focus:outline-none"
                >
                  {availableSittings.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label} · {s.intake}
                    </option>
                  ))}
                </select>
              )}
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {zh ? "生成我的计划" : "Generate my plan"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-3 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[12px] font-medium text-ink">
                  {zh ? `已完成 ${done}/${tasks.length} 项` : `${done} of ${tasks.length} tasks complete`}
                </p>
                <p className="text-[11px] text-ink-faint">
                  {zh ? "目标场次" : "Target sitting"}: {selectedSitting.label} ({selectedSitting.block} UTC+8) ·{" "}
                  {zh ? "入学" : "intake"} {selectedSitting.intake}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-paper-deep">
                  <div className="h-full rounded-full bg-jade" style={{ width: `${progress}%` }} />
                </div>
                <span className="w-9 text-right font-display text-lg text-ink tabular">{progress}%</span>
              </div>
            </div>

            <div className="space-y-8">
              {PHASES.map((phase, phaseIndex) => {
                const phaseTasks = tasks.filter((task) => task.phase === phase.key);
                if (phaseTasks.length === 0) return null;
                const phaseDone = phaseTasks.filter((task) => task.done).length;

                return (
                  <section key={phase.key}>
                    <div className="flex items-baseline justify-between border-b border-line pb-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl text-vermillion/70 tabular">
                          0{phaseIndex + 1}
                        </span>
                        <div>
                          <h2 className="font-display text-xl text-ink">
                            {zh ? phase.titleZh : phase.title}
                          </h2>
                          <p className="text-[11.5px] text-ink-faint">
                            {zh ? phase.bodyZh : phase.body}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-ink-faint tabular">
                        {phaseDone}/{phaseTasks.length}
                      </span>
                    </div>

                    <ul className="mt-3 divide-y divide-line/70">
                      {phaseTasks.map((task) => {
                        const actionLink = taskActionLink(task.title, task.detail, lang, zh);
                        return (
                          <li
                            key={task.id}
                            className="flex flex-wrap items-center justify-between gap-2 py-3 sm:flex-nowrap"
                          >
                            <form action={togglePlanTaskAction} className="min-w-0 flex-1">
                              <input type="hidden" name="id" value={task.id} />
                              <button
                                type="submit"
                                className="flex w-full items-start gap-3 rounded-lg text-left transition hover:bg-paper-deep/30"
                              >
                                {task.done ? (
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                                ) : (
                                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-line-strong" />
                                )}
                                <span className="min-w-0 flex-1">
                                  <span
                                    className={cn(
                                      "block text-[13px] font-medium",
                                      task.done ? "text-ink-faint line-through" : "text-ink",
                                    )}
                                  >
                                    {task.title}
                                  </span>
                                  {task.detail && (
                                    <span className="mt-0.5 block text-[11.5px] text-ink-soft">
                                      {task.detail}
                                    </span>
                                  )}
                                </span>
                                <span className="shrink-0 pt-0.5 text-[10.5px] text-ink-faint">
                                  {task.dueDate ? formatDate(task.dueDate, true) : ""}
                                </span>
                              </button>
                            </form>

                            {actionLink && (
                              <Link
                                href={actionLink.href}
                                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                              >
                                {actionLink.label}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </AppBody>
    </>
  );
}
