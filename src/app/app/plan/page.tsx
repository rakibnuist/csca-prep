import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { generatePlanAction, togglePlanTaskAction } from "@/lib/actions/plan";
import { EXAM_SITTINGS } from "@/lib/site";
import { cn, daysUntil, formatDate } from "@/lib/utils";

export const metadata = { title: "Study plan" };

const PHASES = [
  {
    key: "FOUNDATION",
    title: "Foundation",
    body: "Cover the syllabus, sit your baseline, learn where you actually stand.",
  },
  {
    key: "INTENSIFICATION",
    title: "Intensification",
    body: "Targeted drills, timed papers, and an error log you actually re-read.",
  },
  {
    key: "SPRINT",
    title: "Sprint",
    body: "Full papers under exam conditions. No new material.",
  },
];

export default async function PlanPage() {
  const session = await requireUser();

  const next =
    EXAM_SITTINGS.find(
      (sitting) => sitting.status !== "closed" && daysUntil(sitting.date) >= 0,
    ) ?? EXAM_SITTINGS[EXAM_SITTINGS.length - 1];

  const tasks = await prisma.planTask.findMany({
    where: { userId: session.id },
    orderBy: [{ order: "asc" }],
  });

  const done = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <>
      <PageHeader
        eyebrow="Study plan"
        title="A plan you can actually finish."
        body={`Built around the ${next.label} sitting — ${Math.max(0, daysUntil(next.date))} days from today. Four tasks per phase, nothing decorative.`}
        action={
          <form action={generatePlanAction}>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {tasks.length ? "Rebuild plan" : "Generate my plan"}
            </button>
          </form>
        }
      />

      <AppBody>
        {tasks.length === 0 ? (
          <div className="panel p-10 text-center">
            <p className="font-display text-2xl text-ink">No plan yet</p>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-ink-soft">
              We will generate twelve tasks across three phases, dated backwards from{" "}
              {next.label}. You can rebuild it at any time without losing your attempt history.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-3 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[12px] font-medium text-ink">
                  {done} of {tasks.length} tasks complete
                </p>
                <p className="text-[11px] text-ink-faint">
                  Target sitting: {next.label} · intake {next.intake}
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
                          <h2 className="font-display text-xl text-ink">{phase.title}</h2>
                          <p className="text-[11.5px] text-ink-faint">{phase.body}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-ink-faint tabular">
                        {phaseDone}/{phaseTasks.length}
                      </span>
                    </div>

                    <ul className="mt-3 divide-y divide-line/70">
                      {phaseTasks.map((task) => (
                        <li key={task.id}>
                          <form action={togglePlanTaskAction}>
                            <input type="hidden" name="id" value={task.id} />
                            <button
                              type="submit"
                              className="flex w-full items-start gap-3 py-3 text-left transition hover:bg-paper-deep/30"
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
                        </li>
                      ))}
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
