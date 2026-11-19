import Link from "next/link";
import { Medal } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { updateLeaderboardSettingsAction } from "@/lib/actions/leaderboard";
import { cn } from "@/lib/utils";
import { getSectionTrack } from "@/lib/section";
import { SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { parseProgramme, trackMetaTitle, trackSubjectCodes } from "@/lib/tracks";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Leaderboard", "排行榜");
}

function anonHandle(id: string, zh = false) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  const suffix = Math.abs(h % 10000).toString().padStart(4, "0");
  return zh ? `考生 ${suffix}` : `Student ${suffix}`;
}

function displayName(
  u: { id: string; name: string | null; leaderboardOptIn: boolean; leaderboardName: string | null },
  zh = false,
) {
  if (u.leaderboardOptIn) {
    const n = (u.leaderboardName || u.name || "").trim();
    if (n) return n.split(" ")[0].slice(0, 24);
  }
  return anonHandle(u.id, zh);
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const user = await requireUser();
  const track = await getSectionTrack(user.teachingTrack);
  const zh = track === "CN";
  const params = await searchParams;
  const subjectCodes = trackSubjectCodes(track, parseProgramme(user.track));
  const activeSubject = (
    (subjectCodes as string[]).includes(params.subject ?? "") ? params.subject : subjectCodes[0]
  ) as SubjectCode;

  // Mock-test results only: rank every student by their AVERAGE mock score
  // for the chosen subject. The top three names are public; each student also
  // sees their own rank even when it falls outside the top three.
  const subjectAttempts = await prisma.attempt.findMany({
    where: { status: "SUBMITTED", track, mock: { subjectCode: activeSubject } },
    select: { userId: true, score: true },
  });
  const agg = new Map<string, { sum: number; count: number }>();
  for (const entry of subjectAttempts) {
    const current = agg.get(entry.userId) ?? { sum: 0, count: 0 };
    current.sum += entry.score;
    current.count += 1;
    agg.set(entry.userId, current);
  }
  const ranked = [...agg.entries()]
    .map(([userId, { sum, count }]) => ({ userId, average: Math.round(sum / count), count }))
    .sort((a, b) => b.average - a.average || b.count - a.count);
  const top = ranked.slice(0, 3);
  const ids = [...new Set([...top.map((r) => r.userId), user.id])];
  const people = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, leaderboardOptIn: true, leaderboardName: true },
  });
  const peopleMap = new Map(people.map((p) => [p.id, p]));
  const me = peopleMap.get(user.id);
  const myIndex = ranked.findIndex((r) => r.userId === user.id);

  return (
    <>
      <PageHeader
        eyebrow={zh ? "学习进度" : "Your progress"}
        title={zh ? "排行榜" : "Leaderboard"}
        body={
          zh
            ? "按模拟卷平均分排名 · 所有考生。展示前三名，以及你自己的排名。"
            : "Ranked by average mock-test score across all students. Shows the top three, and your own rank."
        }
      />

      <AppBody>
        <div className="flex flex-wrap gap-1.5">
          {subjectCodes.map((code) => (
            <Link
              key={code}
              href={`/${track === "CN" ? "cn" : "en"}/leaderboard?subject=${code}`}
              className={cn(
                "inline-flex h-8 items-center rounded-full border px-3 text-[11.5px] font-medium",
                code === activeSubject
                  ? "border-line-strong bg-paper-deep text-ink"
                  : "border-line bg-card text-ink-soft hover:text-ink",
              )}
            >
              {track === "CN" ? SUBJECT_MAP[code].nameZh : SUBJECT_MAP[code].shortEn}
            </Link>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-paper">
          <div className="grid grid-cols-[3rem_minmax(0,1fr)_5rem] gap-2 border-b border-line bg-card/60 px-4 py-2 text-[10.5px] font-medium tracking-[0.08em] text-ink-faint uppercase">
            <span>#</span>
            <span>{zh ? "学生" : "Student"}</span>
            <span className="text-right">{zh ? "平均分" : "Average"}</span>
          </div>
          {ranked.length === 0 ? (
            <div className="px-4 py-10 text-center text-[13px] text-ink-soft">
              {zh ? "还没有成绩。做一套模拟卷即可上榜。" : "No scores yet. Sit a mock paper to get on the board."}
            </div>
          ) : (
            <ul>
              {top.map((row, i) => {
                const person = peopleMap.get(row.userId);
                const name = person ? displayName(person, zh) : anonHandle(row.userId, zh);
                const isMe = row.userId === user.id;
                return (
                  <li
                    key={row.userId}
                    className={cn(
                      "grid grid-cols-[3rem_minmax(0,1fr)_5rem] items-center gap-2 px-4 py-2.5 text-[13px]",
                      isMe ? "bg-vermillion/5" : "",
                      i > 0 ? "border-t border-line/70" : "",
                    )}
                  >
                    <span className="flex items-center gap-1 font-display text-[15px] text-ink tabular">
                      <Medal
                        className={cn(
                          "h-4 w-4",
                          i === 0 ? "text-gold" : i === 1 ? "text-ink-faint" : "text-vermillion/70",
                        )}
                      />
                      {i + 1}
                    </span>
                    <span className={cn("truncate", isMe ? "font-medium text-ink" : "text-ink-soft")}>
                      {name}
                      {isMe ? (zh ? "（你）" : " (you)") : ""}
                    </span>
                    <span className="text-right font-medium text-ink tabular">
                      {row.average}
                      <span className="text-ink-faint">/100</span>
                    </span>
                  </li>
                );
              })}
              {myIndex >= 3 && (
                <li className="grid grid-cols-[3rem_minmax(0,1fr)_5rem] items-center gap-2 border-t border-line/70 bg-vermillion/5 px-4 py-2.5 text-[13px]">
                  <span className="text-center font-display text-[15px] text-ink tabular">{myIndex + 1}</span>
                  <span className="truncate font-medium text-ink">
                    {me ? displayName(me, zh) : anonHandle(user.id, zh)}
                    {zh ? "（你）" : " (you)"}
                  </span>
                  <span className="text-right font-medium text-ink tabular">
                    {ranked[myIndex].average}
                    <span className="text-ink-faint">/100</span>
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-line bg-card p-4">
          <p className="text-[13px] font-medium text-ink">{zh ? "你在榜上的显示方式" : "How you appear on the board"}</p>
          <p className="mt-1 text-[11.5px] text-ink-soft">
            {zh
              ? "默认以匿名编号显示。你可以选择显示昵称（建议只写名字），我们绝不会公开邮箱。"
              : "By default you're shown as an anonymous handle. Opt in to show a display name instead (first name recommended). No email is ever shown."}
          </p>
          <form action={updateLeaderboardSettingsAction} className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex items-center gap-2 text-[12.5px] text-ink">
              <input
                type="checkbox"
                name="optIn"
                defaultChecked={me?.leaderboardOptIn ?? false}
                className="h-4 w-4 rounded border-line-strong"
              />
              {zh ? "显示我的名字" : "Show my name"}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10.5px] text-ink-faint">{zh ? "昵称（可选）" : "Display name (optional)"}</span>
              <input
                name="name"
                defaultValue={me?.leaderboardName ?? ""}
                placeholder={me?.name?.split(" ")[0] ?? (zh ? "例如：李明" : "e.g. Aisha")}
                className="h-9 w-48 max-w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink outline-none focus:border-line-strong"
              />
            </label>
            <button type="submit" className="inline-flex h-9 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper">
              {zh ? "保存" : "Save"}
            </button>
          </form>
        </div>
      </AppBody>
    </>
  );
}
