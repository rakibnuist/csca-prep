import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AlertTriangle, ArrowRight, BookOpen, Clock3, FileText, Languages, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";
import { startMockAction } from "@/lib/actions/attempts";
import { canStartAttempt, findResumeableAttempt } from "@/lib/attempts";
import { formatDate } from "@/lib/utils";
import { isPaperAllowedInTrack, parseProgramme, trackLink } from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const mock = await prisma.mock.findUnique({ where: { slug }, select: { title: true, titleZh: true } });
  const title = track === "cn" && mock?.titleZh ? mock.titleZh : mock?.title;
  return { title: title ?? (track === "cn" ? "模拟考试" : "Mock exam") };
}

export default async function MockBriefingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ limit?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const { slug } = await params;
  const { limit, taught } = await searchParams;
  const track = await getResolvedTrack(taught, user.teachingTrack);
  const lang = track === "CN" ? "zh" : "en";
  const zh = track === "CN";

  const mock = await prisma.mock.findUnique({
    where: { slug },
    include: {
      subject: true,
      items: { select: { id: true, question: { select: { stemZh: true } } } },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: "desc" },
      },
    },
  });

  if (!mock || (!mock.published && user.role !== "ADMIN")) notFound();

  const programme = parseProgramme(user.track);
  // Keep the sections monolingual: never loop onto self or leak cross-track papers.
  if (
    (track === "CN" && mock.subject.kind !== "CHINESE" && mock.items.some((item) => !item.question.stemZh)) ||
    (user.role !== "ADMIN" && !isPaperAllowedInTrack(mock, track, programme))
  ) {
    redirect(trackLink("/app/mocks", track));
  }

  const resume = await findResumeableAttempt(user.id, mock.id);
  if (resume) redirect(trackLink(`/exam/${slug}`, track));

  const submitted = mock.attempts.filter((attempt) => attempt.status === "SUBMITTED");
  const best = submitted.reduce((max, attempt) => Math.max(max, attempt.score), 0);
  const access = await getAccess(user.id);
  const ent = await canStartAttempt(user.id, mock.id, access, lang);
  const remaining = access.isPro ? null : ent.attemptsLeft;

  // Be explicit about where the items came from. Only the "Paper 01" mocks
  // are written from scratch; practice sets mix official and original items,
  // and the official/review archives are transcribed.
  const provenance =
    mock.paper === "Official"
      ? "Transcribed from the official sitting, with the published answer key and source attributed."
      : mock.paper === "Review"
        ? "A reconstructed review module, labelled so it is never mistaken for an official paper."
        : mock.paper === "Practice Set"
          ? "Assembled from our bank of official and original CSCA-format questions."
          : "Original questions written against the published syllabus and format.";

  const specs = [
    {
      icon: FileText,
      label: zh ? "题目" : "Questions",
      value: zh
        ? `${mock.items.length} 道单选题`
        : `${mock.items.length} single-answer multiple choice`,
    },
    {
      icon: Clock3,
      label: zh ? "时长" : "Time limit",
      value: zh ? `${mock.durationMin} 分钟，不可暂停` : `${mock.durationMin} minutes, no pause`,
    },
    {
      icon: ShieldCheck,
      label: zh ? "计分" : "Scoring",
      value: zh ? "0–100 分，无倒扣" : "0–100 scale, no negative marking",
    },
    {
      icon: Languages,
      label: zh ? "语言" : "Language",
      value:
        track === "CN"
          ? mock.subject.language === "zh"
            ? "仅中文 · 中文试卷"
            : "中文 · 中文试卷"
          : "English only · English paper text",
    },
  ];

  return (
    <>
      <PageHeader
        backHref={{
          href: trackLink("/app/mocks", track),
          label: track === "CN" ? "全部中文模拟卷" : "All English mock tests",
        }}
        eyebrow={
          zh
            ? `${mock.subject.nameZh} · ${
                mock.paper === "Official"
                  ? "官方真题"
                  : mock.paper === "Review"
                    ? "复习卷"
                    : mock.paper === "Practice Set"
                      ? "练习卷"
                      : "模拟卷"
              } · 中文`
            : `${mock.subject.nameEn} · ${mock.paper ?? "Paper"}`
        }
        title={zh && mock.titleZh ? mock.titleZh : mock.title}
        body={zh && mock.subtitleZh ? mock.subtitleZh : mock.subtitle}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={mock.isFullLength ? "jade" : "gold"}>
              {mock.isFullLength ? t(lang, "Full length") : t(lang, "Short paper")}
            </Pill>
            <Pill>{zh ? mock.subject.nameZh : mock.subject.nameEn}</Pill>
          </div>
        }
      />

      <AppBody className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="min-w-0 space-y-8">
          {limit === "reached" && (
            <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold-soft/60 px-4 py-3 text-[12.5px] text-gold">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                {ent.reason === "STUDY_ONLY" ? (
                  zh ? (
                    <>这是一套官方真题，你可以免费在学习模式下查看题目与解析；计时模考需开通专业版。</>
                  ) : (
                    <>
                      This is an official paper. Study it free — read the question, then reveal the
                      working. Sitting it on the clock is a Pro feature.
                    </>
                  )
                ) : zh ? (
                  <>
                    本卷免费作答次数已用完。{" "}
                    <Link
                      href={trackLink("/app/billing#redeem", track)}
                      className="font-medium underline underline-offset-2"
                    >
                      兑换专业版兑换码
                    </Link>{" "}
                    即可不限次数作答——或前往{" "}
                    <Link
                      href={trackLink("/app/practice", track)}
                      className="font-medium underline underline-offset-2"
                    >
                      专题练习
                    </Link>{" "}
                    巩固薄弱知识点。
                  </>
                ) : (
                  <>
                    You have used your free attempts on this paper.{" "}
                    <Link
                      href={trackLink("/app/billing#redeem", track)}
                      className="font-medium underline underline-offset-2"
                    >
                      Redeem a Pro code
                    </Link>{" "}
                    for unlimited attempts — or drill the topics you missed in{" "}
                    <Link
                      href={trackLink("/app/practice", track)}
                      className="font-medium underline underline-offset-2"
                    >
                      Topic practice
                    </Link>
                    .
                  </>
                )}
              </div>
            </div>
          )}

          <section>
            <h2 className="font-display text-xl text-ink">
              {zh ? "考试说明" : "What to expect"}
            </h2>
            <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3 px-4 py-3 sm:items-center">
                  <spec.icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint sm:mt-0" />
                  <span className="w-28 shrink-0 text-[12px] text-ink-faint">{spec.label}</span>
                  <span className="min-w-0 flex-1 text-[13px] text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl text-ink">
                {zh ? "考试规则" : "Exam rules"}
              </h2>
              <Link
                href={zh ? "/zh/kaoshi" : "/test-day"}
                className="text-[11.5px] text-vermillion hover:underline"
              >
                {zh ? "官方考试规则 →" : "Official test-day rules →"}
              </Link>
            </div>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {(zh
                ? [
                    "每题一个答案，四个选项。交卷前可以修改。",
                    "计时从开始作答时启动，无法暂停。刷新或关闭标签页不会停止计时。",
                    "答案每隔几秒自动保存。断线后重新打开试卷即可恢复进度。",
                    "时间归零时，系统会用当时已保存的答案自动交卷。",
                    "可以标记题目，并在交卷前从答题卡跳回。",
                    "没有倒扣分，有依据的猜测不会比留空更差。",
                    "真实考试中只能在白板或透明文件袋内的纸上作答，不能使用普通纸张，且系统不允许提前交卷。这里可以提前结束练习。",
                  ]
                : [
                    "One answer per question, four options. Changing an answer is allowed until you submit.",
                    "The timer runs from the moment you start and cannot be paused. Refreshing or closing the tab does not stop it.",
                    "Answers are saved automatically every few seconds. If you lose connection, reopen the paper and your progress returns.",
                    "When the timer reaches zero the paper submits itself with the answers saved at that moment.",
                    "You can flag questions and jump back to them from the palette before submitting.",
                    "There is no negative marking — an educated guess is never worse than a blank.",
                    "In the real test you work on a whiteboard or a sheet in a transparent file bag, never on paper, and the system does not allow early submission. Here you may end a drill early.",
                  ]
              ).map((rule) => (
                <li key={rule} className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vermillion/70" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">
              {zh ? "试卷说明" : "How this paper was built"}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {zh
                ? `${mock.items.length} 道题，全部对应官方${mock.subject.nameZh}考试大纲。每道题都带一个知识点标签，成绩页的知识点分布就是这样计算的。`
                : `${mock.items.length} questions mapped to the official ${mock.subject.nameEn} syllabus. ${provenance} Each question carries one topic tag, which is how your post-paper breakdown is calculated.`}
            </p>
          </section>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {zh ? "你的记录" : "Your record"}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl text-ink tabular">{submitted.length}</p>
                <p className="text-[10.5px] text-ink-faint">{zh ? "已用次数" : "Attempts used"}</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-2xl text-ink tabular">
                  {submitted.length ? best : "—"}
                </p>
                <p className="text-[10.5px] text-ink-faint">{zh ? "最高分" : "Best score"}</p>
              </div>
            </div>

            {submitted.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {submitted.slice(0, 3).map((attempt) => (
                  <Link
                    key={attempt.id}
                    href={trackLink(`/app/results/${attempt.id}`, track)}
                    className="flex items-center justify-between rounded-md px-1 py-1 text-[11.5px] text-ink-soft hover:bg-paper-deep/60"
                  >
                    <span>{attempt.completedAt ? formatDate(attempt.completedAt) : "—"}</span>
                    <span className="font-medium text-ink tabular">{attempt.score}/100</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-5 border-t border-line pt-4">
              {ent.canSit ? (
                <form action={startMockAction}>
                  <input type="hidden" name="slug" value={mock.slug} />
                  <input type="hidden" name="taught" value={track} />
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    {submitted.length > 0 ? (
                      <>
                        <RotateCcw className="h-4 w-4" /> {zh ? "重做试卷" : "Retake paper"}
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> {zh ? "开始作答" : "Start the paper"}
                      </>
                    )}
                  </button>
                </form>
              ) : ent.reason === "STUDY_ONLY" ? (
                <div className="space-y-2">
                  <Link
                    href={trackLink(`/app/official/${slug}`, track)}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
                  >
                    <BookOpen className="h-4 w-4" /> {t(lang, "Study this paper free")}
                  </Link>
                  <Link
                    href={trackLink("/app/billing#redeem", track)}
                    className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-line-strong text-[12.5px] font-medium text-ink transition hover:border-ink/30"
                  >
                    {t(lang, "Have a Pro code? Sit it on the clock")}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <Link
                  href={trackLink("/app/billing#redeem", track)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
                >
                  {t(lang, "Redeem Pro")} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <p className="mt-2 text-center text-[10.5px] text-ink-faint">
                {remaining === null ? (
                  <>{zh ? "专业版 · 不限次数 · 计时立即开始" : "Pro plan · unlimited attempts · timer starts immediately"}</>
                ) : ent.reason === "STUDY_ONLY" ? (
                  <>{zh ? "所有账号均可免费使用学习模式" : "Study mode is free for every account"}</>
                ) : (
                  <>
                    {zh
                      ? `剩余 ${remaining} 次免费机会 · 计时立即开始`
                      : `${remaining} free ${remaining === 1 ? "attempt" : "attempts"} remaining · timer starts immediately`}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-card/60 p-4">
            <p className="text-[11px] font-medium text-ink">{zh ? "提醒" : "Nice to know"}</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              {zh
                ? "真实考试有监考。练习时不要看笔记、不要用计算器——除非考点另有说明。"
                : "The real paper is sat under proctoring. Practise without notes or a calculator — the exam does not allow either unless your centre says otherwise."}
            </p>
          </div>
        </aside>
      </AppBody>
    </>
  );
}
