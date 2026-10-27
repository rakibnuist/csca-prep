import Link from "next/link";
import { ArrowUpRight, Users, FileStack, Target, Mail, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { SUBJECTS } from "@/lib/exam";

export const metadata = { title: "Admin overview" };

export default async function AdminOverviewPage() {
  const [users, attempts, questions, mocks, reviews, leads, recent, bySubject] =
    await Promise.all([
      prisma.user.count(),
      prisma.attempt.count({ where: { status: "SUBMITTED" } }),
      prisma.question.count({ where: { active: true } }),
      prisma.mock.count({ where: { published: true } }),
      prisma.reviewItem.count(),
      prisma.lead.count(),
      prisma.attempt.findMany({
        where: { status: "SUBMITTED" },
        include: { user: true, mock: { include: { subject: true } } },
        orderBy: { completedAt: "desc" },
        take: 8,
      }),
      prisma.question.groupBy({ by: ["subjectCode"], _count: { _all: true } }),
    ]);

  const avg = await prisma.attempt.aggregate({
    where: { status: "SUBMITTED" },
    _avg: { score: true },
  });

  const subjectCounts = new Map(bySubject.map((entry) => [entry.subjectCode, entry._count._all]));

  const stats = [
    { label: "Students", value: users, icon: Users, note: "registered accounts" },
    { label: "Papers submitted", value: attempts, icon: FileStack, note: `${avg._avg.score?.toFixed(1) ?? "—"} avg score` },
    { label: "Questions live", value: questions, icon: Target, note: `${mocks} published papers` },
    { label: "Review cards", value: reviews, icon: TrendingUp, note: "spaced-repetition" },
    { label: "Leads", value: leads, icon: Mail, note: "waitlist & contact" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Operations</p>
          <h1 className="display-md mt-2">Platform overview</h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink"
        >
          View public site <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="panel p-4">
            <stat.icon className="h-4 w-4 text-ink-faint" />
            <p className="mt-2 font-display text-3xl text-ink tabular">{stat.value}</p>
            <p className="text-[11px] font-medium text-ink">{stat.label}</p>
            <p className="text-[10px] text-ink-faint">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section>
          <h2 className="font-display text-lg text-ink">Recent submissions</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
            <div className="grid grid-cols-[1.2fr_1fr_0.5fr_0.7fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase">
              <span>Student</span>
              <span>Paper</span>
              <span>Score</span>
              <span>Date</span>
            </div>
            {recent.length === 0 && (
              <p className="px-4 py-8 text-center text-[12.5px] text-ink-faint">No attempts yet.</p>
            )}
            {recent.map((attempt) => (
              <div
                key={attempt.id}
                className="grid grid-cols-[1.2fr_1fr_0.5fr_0.7fr] items-center gap-3 border-b border-line/60 px-4 py-2.5 last:border-0"
              >
                <span className="truncate text-[11.5px] text-ink">
                  {attempt.user.name ?? attempt.user.email}
                </span>
                <span className="truncate text-[11px] text-ink-soft">
                  {attempt.mock.subject.shortEn} · {attempt.mock.paper}
                </span>
                <span className="text-[12px] font-medium text-ink tabular">{attempt.score}</span>
                <span className="text-[10.5px] text-ink-faint">
                  {attempt.completedAt ? formatDate(attempt.completedAt, true) : "—"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg text-ink">Bank coverage</h2>
          <div className="panel mt-3 p-4">
            <div className="space-y-3">
              {SUBJECTS.map((subject) => {
                const count = subjectCounts.get(subject.code) ?? 0;
                return (
                  <div key={subject.code}>
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="text-ink-soft">{subject.shortEn}</span>
                      <span className="tabular text-ink">{count}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className="h-full rounded-full bg-ink/70"
                        style={{ width: `${Math.min(100, (count / 80) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[10.5px] leading-relaxed text-ink-faint">
              Target: at least 80 items per subject so every paper can differ. Current bank is
              original content written against the official syllabus.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
