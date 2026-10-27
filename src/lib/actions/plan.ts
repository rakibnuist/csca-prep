"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_SITTINGS } from "@/lib/site";

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

export async function generatePlanAction() {
  const session = await requireUser();
  const now = Date.now();

  const next =
    EXAM_SITTINGS.find(
      (sitting) => sitting.status !== "closed" && new Date(sitting.date).getTime() > now,
    ) ?? EXAM_SITTINGS[EXAM_SITTINGS.length - 1];

  const examTime = new Date(`${next.date}T09:00:00+08:00`).getTime();
  const horizon = Math.max(examTime - now, 7 * 86_400_000);

  await prisma.planTask.deleteMany({ where: { userId: session.id } });

  let order = 0;
  for (const block of TEMPLATE) {
    for (const [title, detail] of block.items) {
      await prisma.planTask.create({
        data: {
          userId: session.id,
          phase: block.phase,
          title,
          detail,
          order: order++,
          dueDate: new Date(now + horizon * block.fraction),
        },
      });
    }
  }

  revalidatePath("/app/plan");
  revalidatePath("/app/dashboard");
}

export async function togglePlanTaskAction(formData: FormData) {
  const session = await requireUser();
  const id = String(formData.get("id") ?? "");

  const task = await prisma.planTask.findFirst({ where: { id, userId: session.id } });
  if (!task) return;

  await prisma.planTask.update({ where: { id: task.id }, data: { done: !task.done } });
  revalidatePath("/app/plan");
  revalidatePath("/app/dashboard");
}
