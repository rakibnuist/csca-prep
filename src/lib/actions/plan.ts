"use server";

import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { prisma } from "@/lib/db";
import { EXAM_SITTINGS } from "@/lib/site";
import { getSectionTrack, revalidateTrackPath } from "@/lib/section";

const TEMPLATE = [
  {
    phase: "FOUNDATION",
    fraction: 0.2,
    items: [
      ["Read the official syllabus for every required subject", "Mark the topics you have never studied."],
      ["Sit one diagnostic paper per subject", "No revision first — you want the honest baseline."],
      ["Build a one-page formula sheet", "Only what you keep getting wrong. Rewrite it by hand."],
      ["Fix your exam-day logistics", "Check registration dates, ID document and the proctoring setup."],
    ],
  },
  {
    phase: "INTENSIFICATION",
    fraction: 0.55,
    items: [
      ["Drill your two weakest topics each week", "20 questions per topic, then re-read the explanations."],
      ["Sit one timed paper every week", "Same time of day as your real sitting if possible."],
      ["Keep an error log", "One line per miss: topic, cause, and the rule you forgot."],
      ["Re-measure", "Compare topic mastery with the baseline and drop what is solved."],
    ],
  },
  {
    phase: "SPRINT",
    fraction: 0.85,
    items: [
      ["Full paper every third day", "Alternate subjects so no skill goes cold."],
      ["Simulate the real timetable", "Sit papers back-to-back at the official times."],
      ["Review only your error log", "No new material in the last week."],
      ["Protect sleep", "Shift your wake-up time to match exam day."],
    ],
  },
] as const;

const TEMPLATE_ZH = [
  {
    phase: "FOUNDATION",
    fraction: 0.2,
    items: [
      ["通读所有必考科目的官方大纲", "标出你从未学过的知识点。"],
      ["每个科目做一套摸底卷", "先不要复习——你需要真实的起点。"],
      ["整理一页公式表", "只写你反复做错的内容，并手写一遍。"],
      ["确认考试当天安排", "核对报名日期、身份证件与监考设备。"],
    ],
  },
  {
    phase: "INTENSIFICATION",
    fraction: 0.55,
    items: [
      ["每周练两个最弱的知识点", "每个知识点 20 题，然后重读解析。"],
      ["每周做一套计时卷", "尽量与真实考试同一时间段。"],
      ["建立错题本", "每次错题一行：知识点、原因、忘记的规则。"],
      ["重新测量", "把知识点掌握度与摸底对比，删掉已解决的内容。"],
    ],
  },
  {
    phase: "SPRINT",
    fraction: 0.85,
    items: [
      ["每三天做一套完整卷", "科目交替，避免手生。"],
      ["模拟真实时间表", "按官方时间连续做卷。"],
      ["只复习错题本", "最后一周不再学新内容。"],
      ["保证睡眠", "把起床时间调整到与考试日一致。"],
    ],
  },
] as const;

export async function generatePlanAction(formData?: FormData) {
  const session = await requireUser();
  const now = Date.now();
  const track = await getSectionTrack(session.teachingTrack);
  const zh = track === "CN";
  const template = zh ? TEMPLATE_ZH : TEMPLATE;
  const access = await getAccess(session.id);
  const requestedSittingId = formData
    ? String(formData.get("sittingId") ?? "").trim()
    : "";

  // Adaptive weak-topic drills for Pro accounts derived from recent attempts.
  let adaptiveDrills: Array<[string, string]> = [];
  if (access.isPro) {
    const recent = await prisma.attempt.findMany({
      where: { userId: session.id, status: "SUBMITTED", track },
      orderBy: { completedAt: "desc" },
      take: 5,
      select: { topicBreakdown: true },
    });
    const agg = new Map<string, { code: string; title: string; correct: number; total: number }>();
    for (const attempt of recent) {
      const breakdown = (attempt.topicBreakdown ?? {}) as Record<
        string,
        { code: string; title: string; correct: number; total: number }
      >;
      for (const entry of Object.values(breakdown)) {
        const cur = agg.get(entry.code) ?? { ...entry, correct: 0, total: 0 };
        cur.correct += entry.correct;
        cur.total += entry.total;
        agg.set(entry.code, cur);
      }
    }
    const weak = [...agg.values()]
      .filter((t) => t.total > 0 && t.correct / t.total < 0.75)
      .sort((a, b) => a.correct / a.total - b.correct / b.total)
      .slice(0, 3);
    if (weak.length > 0) {
      const titleMap = zh
        ? new Map(
            (
              await prisma.topic.findMany({
                where: { code: { in: weak.map((w) => w.code) } },
                select: { code: true, titleZh: true },
              })
            ).map((row) => [row.code, row.titleZh]),
          )
        : new Map<string, string>();
      adaptiveDrills = weak.map((t) => {
        const pct = Math.round((t.correct / t.total) * 100);
        const label = zh ? (titleMap.get(t.code) ?? t.title) : t.title;
        return zh
          ? [`专项巩固：${label}（${t.code}）`, `近期正确率 ${pct}%（${t.correct}/${t.total}）——先完成 20 道专项题再重做解析。`]
          : [`Target weak topic: ${label} (${t.code})`, `Recent accuracy ${pct}% (${t.correct}/${t.total}) — drill 20 questions and review every miss.`];
      });
    }
  }

  const upcoming = EXAM_SITTINGS.filter(
    (sitting) =>
      sitting.status !== "closed" &&
      new Date(`${sitting.date}T${sitting.block}:00+08:00`).getTime() > now,
  );
  const next =
    (requestedSittingId
      ? upcoming.find((sitting) => sitting.id === requestedSittingId)
      : undefined) ??
    upcoming[0] ??
    EXAM_SITTINGS[EXAM_SITTINGS.length - 1];

  const examTime = new Date(`${next.date}T${next.block}:00+08:00`).getTime();
  const horizon = Math.max(examTime - now, 7 * 86_400_000);

  let order = 0;
  const rows: Array<{
    userId: string;
    phase: string;
    title: string;
    detail: string;
    order: number;
    dueDate: Date;
  }> = [];
  for (const block of template) {
    const items: Array<readonly [string, string]> =
      block.phase === "INTENSIFICATION" && adaptiveDrills.length > 0
        ? [...adaptiveDrills, ...block.items.slice(1)]
        : [...block.items];
    for (const [title, detail] of items) {
      const taggedDetail =
        order === 0
          ? `${detail} [${zh ? "目标场次" : "Sitting"}: ${next.label}]`
          : detail;
      rows.push({
        userId: session.id,
        phase: block.phase,
        title,
        detail: taggedDetail,
        order: order++,
        dueDate: new Date(now + horizon * block.fraction),
      });
    }
  }

  await prisma.$transaction(async (tx) => {
    await tx.planTask.deleteMany({ where: { userId: session.id } });
    if (rows.length > 0) {
      await tx.planTask.createMany({ data: rows });
    }
  });

  revalidateTrackPath("/plan");
  revalidateTrackPath("/dashboard");
}

export async function togglePlanTaskAction(formData: FormData) {
  const session = await requireUser();
  const id = String(formData.get("id") ?? "");

  const task = await prisma.planTask.findFirst({ where: { id, userId: session.id } });
  if (!task) return;

  await prisma.planTask.update({ where: { id: task.id }, data: { done: !task.done } });
  revalidateTrackPath("/plan");
  revalidateTrackPath("/dashboard");
}
