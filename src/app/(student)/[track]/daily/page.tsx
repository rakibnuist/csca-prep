import { Flame, Target, Trophy } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { DailyQuizClient } from "@/components/app/daily-quiz-client";
import { pickDailyQuestions, todayKey, DAILY_QUIZ_SIZE } from "@/lib/daily-quiz";
import { TrackSwitch } from "@/components/app/track-switch";
import { parseProgramme, trackMetaTitle, trackQuestionWhere } from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { plural } from "@/lib/utils";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Daily quiz", "每日十题");
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function DailyQuizPage({
  searchParams,
}: {
  searchParams: Promise<{ taught?: string }>;
}) {
  const user = await requireUser();
  const { taught } = await searchParams;
  const track = await getResolvedTrack(taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const lang = track === "CN" ? "zh" : "en";
  const date = todayKey();

  const [completion, recentCompletions, pool] = await Promise.all([
    prisma.dailyQuizCompletion.findUnique({ where: { userId_date: { userId: user.id, date } } }),
    prisma.dailyQuizCompletion.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 60,
      select: { date: true },
    }),
    prisma.question.findMany({
      where: { active: true, ...trackQuestionWhere(track, programme) },
      select: {
        id: true, subjectCode: true, stem: true, stemZh: true,
        options: true, optionsZh: true, correctIndex: true,
        explanation: true, explanationZh: true, figure: true,
      },
      orderBy: { id: "asc" },
    }),
  ]);

  // streak: consecutive days ending today (or yesterday if today not done yet)
  const doneDays = new Set(recentCompletions.map((c) => c.date));
  let streak = 0;
  let cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  if (!doneDays.has(ymd(cursor))) cursor = new Date(cursor.getTime() - 86_400_000);
  while (doneDays.has(ymd(cursor))) {
    streak++;
    cursor = new Date(cursor.getTime() - 86_400_000);
  }

  const questions = pickDailyQuestions(pool, date, DAILY_QUIZ_SIZE);

  return (
    <>
      <PageHeader
        eyebrow={track === "CN" ? "每日练习" : "Daily habit"}
        title={track === "CN" ? "每日十题" : "Daily quiz"}
        body={
          track === "CN"
            ? `每天 10 道中文题，覆盖本区科目。坚持打卡，保持手感 — ${date} 已准备 ${questions.length} 道题。`
            : `10 questions from the English bank, a fresh mix every day. Build a streak, keep the material warm, and see where you stand — ${questions.length} ${plural(questions.length, "question")} ready for ${date}.`
        }
      />
      <AppBody>
        <TrackSwitch track={track} className="mb-5" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-vermillion/10 text-vermillion"><Flame className="h-4.5 w-4.5" /></span>
            <div>
              <p className="font-display text-xl leading-none text-ink tabular">
                {streak}
                <span className="ml-1 text-[12px] text-ink-faint">
                  {lang === "zh" ? "天" : `day${streak === 1 ? "" : "s"}`}
                </span>
              </p>
              <p className="mt-0.5 text-[10.5px] text-ink-faint">
                {t(lang, "Daily quiz streak")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-paper-deep text-ink-soft"><Target className="h-4.5 w-4.5" /></span>
            <div>
              <p className="font-display text-xl leading-none text-ink tabular">{DAILY_QUIZ_SIZE}</p>
              <p className="mt-0.5 text-[10.5px] text-ink-faint">{t(lang, "Questions today")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-jade/10 text-jade"><Trophy className="h-4.5 w-4.5" /></span>
            <div>
              <p className="font-display text-xl leading-none text-ink tabular">{completion ? `${completion.score}/100` : "—"}</p>
              <p className="mt-0.5 text-[10.5px] text-ink-faint">
                {completion ? t(lang, "Today's score") : t(lang, "Not done yet")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {questions.length === 0 ? (
            <div className="panel p-8 text-center text-[13px] text-ink-soft">
              {track === "CN" ? "今日十题还没有可用题目。" : "No questions available for today's quiz yet."}
            </div>
          ) : (
            <DailyQuizClient
              date={date}
              questions={questions}
              language={track === "CN" ? "zh" : "en"}
              alreadyDone={completion ? { score: completion.score, correct: completion.correct, total: completion.total } : null}
            />
          )}
        </div>
      </AppBody>
    </>
  );
}
