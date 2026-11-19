import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  RotateCcw,
  Target,
  Timer,
  XCircle,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { AppBody } from "@/components/app/page-header";
import { PrintReportButton } from "@/components/app/print-report-button";
import { ScoreRing } from "@/components/app/score-ring";
import { AnswerGridInteractive } from "@/components/app/answer-grid-interactive";
import { MathText } from "@/components/math-text";
import { QuestionReviewTools } from "@/components/practice/question-review-tools";
import { Pill } from "@/components/site/section";
import { estimatePercentile, scoreBand, SUBJECT_MAP, type SubjectCode } from "@/lib/exam";
import { FORMULAS } from "@/lib/formulas";
import { formatPace, summarizePacing } from "@/lib/pacing";
import { cn, formatDate, ordinal } from "@/lib/utils";
import { trackLink } from "@/lib/tracks";
import { getSectionTrack } from "@/lib/section";
import { t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; id: string }>;
}) {
  const { track, id } = await params;
  const zh = track === "cn";
  // Metadata runs before the page's own ownership check, so it must be
  // scoped by userId as well — otherwise the title leaked any attempt's
  // score to anonymous visitors.
  const user = await getCurrentUser();
  if (!user) return { title: zh ? "成绩" : "Result" };
  const attempt = await prisma.attempt.findFirst({
    where: { id, userId: user.id, status: "SUBMITTED" },
    select: { score: true },
  });
  return {
    title: attempt ? `${zh ? "成绩" : "Result"} ${attempt.score}/100` : zh ? "成绩" : "Result",
  };
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ auto?: string; filter?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { auto, filter = "all" } = await searchParams;
  const preferredTrack = await getSectionTrack(user.teachingTrack);

  /**
   * A result only exists once the paper is scored. If the student opens the
   * URL of a paper that is still running, send them back into it instead of
   * showing a bare 404 — the attempt is still live and the clock is running.
   */
  const live = await prisma.attempt.findFirst({
    where: { id, userId: user.id, status: "IN_PROGRESS" },
    select: { mock: { select: { slug: true } } },
  });
  if (live) redirect(trackLink(`/exam/${live.mock.slug}`, preferredTrack));

  const attempt = await prisma.attempt.findFirst({
    where: { id, userId: user.id, status: "SUBMITTED", track: preferredTrack },
    include: {
      mock: {
        include: {
          subject: true,
          items: {
            orderBy: { order: "asc" },
            include: { question: { include: { topic: true } } },
          },
        },
      },
    },
  });

  if (!attempt) notFound();

  // Language follows the student's current teaching track, not the historical
  // track stored on the attempt — an English-taught student must never see a
  // Chinese report.
  const lang = preferredTrack === "CN" ? "zh" : "en";
  const zh = lang === "zh";
  const answers = (attempt.answers ?? {}) as Record<string, number>;
  const spec = SUBJECT_MAP[attempt.mock.subjectCode as SubjectCode];
  const resultTrack = preferredTrack;
  const band = scoreBand(attempt.score);
  const BAND_ZH: Record<string, { label: string; blurb: string }> = {
    strong: { label: "极具竞争力", blurb: "该分数段在奖学金评审中优势明显。" },
    competitive: { label: "具备竞争力", blurb: "高于常见入围分数区间，建议继续巩固薄弱知识点。" },
    developing: { label: "提升阶段", blurb: "基础已经具备，针对性专项训练可以快速提分。" },
    foundation: { label: "基础阶段", blurb: "建议先系统巩固核心知识点，再进行整卷限时模拟。" },
  };
  const bandLabel = zh ? (BAND_ZH[band.key]?.label ?? band.label) : band.label;
  const bandBlurb = zh ? (BAND_ZH[band.key]?.blurb ?? band.blurb) : band.blurb;
  const PAPER_ZH: Record<string, string> = {
    Official: "官方真题",
    Review: "复习卷",
    "Practice Set": "练习卷",
  };
  const paperLabel = zh ? (PAPER_ZH[attempt.mock.paper ?? ""] ?? "模拟卷") : (attempt.mock.paper ?? "Paper");
  const subjectLabel = zh ? attempt.mock.subject.nameZh : attempt.mock.subject.nameEn;
  const mockTitle = zh && attempt.mock.titleZh ? attempt.mock.titleZh : attempt.mock.title;

  const percentile = estimatePercentile(attempt.score, spec?.kind ?? "FUNDAMENTAL");
  // Ring colour follows the same bands the copy uses, so the graphic and the
  // label can never disagree.
  const ringTone = attempt.score >= 75 ? "jade" : attempt.score >= 50 ? "gold" : "vermillion";
  const total = attempt.mock.items.length;
  const correct = attempt.rawScore;
  const answered = Object.keys(answers).length;
  const minutes = Math.floor(attempt.durationSec / 60);
  const seconds = attempt.durationSec % 60;

  /* Pacing: the exam gives every question the same share of the clock, so
     seconds-per-question is the only honest measure of whether the paper was
     finished on time or rushed at the end. */
  const budgetSec = attempt.mock.durationMin * 60;
  const targetPaceSec = Math.round(budgetSec / Math.max(1, total));
  const answeredForPace = Math.max(1, answered);
  const actualPaceSec = Math.round(attempt.durationSec / answeredForPace);
  const clockUsedPct = Math.round((attempt.durationSec / budgetSec) * 100);
  const blank = Math.max(0, total - answered);
  const paceVerdict =
    blank > total * 0.25
      ? zh
        ? "未完成题量较多——制约分数的是覆盖面而非单纯计时。"
        : "You ran out of paper, not time — the clock was not the constraint, coverage was."
      : actualPaceSec > targetPaceSec * 1.25
        ? zh
          ? "每题平均耗时显著高于目标节奏，正式考试中后半部分题目可能来不及作答。"
          : "You spent well over the target pace per question. In the real paper that ends with questions unread."
        : actualPaceSec < targetPaceSec * 0.6
          ? zh
            ? "作答速度明显快于目标节奏，可核对上方薄弱知识点是否因求快而失分。"
            : "You moved faster than the paper requires. Check whether the speed cost accuracy on the topics above."
          : zh
            ? "整体节奏处于正式考试期望区间内。"
            : "Your pace was inside the band the real paper expects.";

  const topics = Object.values(
    (attempt.topicBreakdown ?? {}) as Record<
      string,
      { code: string; title: string; correct: number; total: number }
    >,
  ).sort((a, b) => a.correct / a.total - b.correct / b.total);

  if (zh && topics.length > 0) {
    const titleRows = await prisma.topic.findMany({
      where: { code: { in: topics.map((topic) => topic.code) } },
      select: { code: true, titleZh: true },
    });
    const titleMap = new Map(titleRows.map((row) => [row.code, row.titleZh]));
    for (const topic of topics) {
      topic.title = titleMap.get(topic.code) ?? topic.title;
    }
  }

  const weak = topics.filter((topic) => topic.correct / topic.total < 0.6).slice(0, 3);

  /* Per-question pacing. The client records the time each question was on
     screen — hidden tabs pause it — so this is measured screen time, not a
     model, and it is only shown when the paper actually recorded some. */
  const dwellMap = (attempt.timePerQuestion ?? {}) as Record<string, number>;
  const topicTitle = new Map(topics.map((topic) => [topic.code, topic.title]));
  const pace = summarizePacing(
    attempt.mock.items.map((item, i) => {
      const given = answers[item.questionId];
      const answeredOne = typeof given === "number";
      return {
        n: i + 1,
        ms: dwellMap[item.questionId] ?? 0,
        answered: answeredOne,
        correct: answeredOne && given === item.question.correctIndex,
        topic:
          topicTitle.get(item.question.topic.code) ??
          (zh ? item.question.topic.titleZh : item.question.topic.titleEn),
      };
    }),
    targetPaceSec,
  );

  const reviewMetaRows =
    attempt.mock.items.length > 0
      ? await prisma.reviewItem.findMany({
          where: {
            userId: user.id,
            questionId: { in: attempt.mock.items.map((i) => i.questionId) },
          },
          select: { questionId: true, bookmarked: true, note: true },
        })
      : [];
  const reviewMetaMap = new Map(reviewMetaRows.map((r) => [r.questionId, r]));

  const reviewItems = attempt.mock.items.map((item, index) => {
    const given = answers[item.questionId];
    const meta = reviewMetaMap.get(item.questionId);
    return {
      index: index + 1,
      question: item.question,
      given,
      isCorrect: given === item.question.correctIndex,
      bookmarked: meta?.bookmarked ?? false,
      note: meta?.note ?? null,
    };
  });

  const missedCount = reviewItems.filter((item) => !item.isCorrect).length;
  const bookmarkedCount = reviewItems.filter((item) => item.bookmarked).length;
  const formulaByTopic = new Map(FORMULAS.map((f) => [f.topicCode, f]));
  const firstWeak = weak[0] ?? topics[0];
  const visible =
    filter === "wrong"
      ? reviewItems.filter((item) => !item.isCorrect)
      : filter === "bookmarked"
        ? reviewItems.filter((item) => item.bookmarked)
        : reviewItems;

  return (
    <>
      <div className="print-report border-b border-line/70 bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-8 sm:px-8">
          <Link
            href={trackLink("/app/results", resultTrack)}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink print:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {zh ? "全部成绩" : "All results"}
          </Link>

          {/* Print cover: the PDF a candidate sends to an admissions office should
              open like a document, not like the middle of a web page. */}
          <div className="print-only mb-6">
            <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-4">
              <div>
                <p className="font-display text-[22pt] leading-none text-ink">CSCA Master</p>
                <p className="mt-1 text-[10pt] tracking-[0.18em] text-ink-faint uppercase">
                  {zh ? "模拟成绩报告" : "Practice score report"}
                </p>
              </div>
              <div className="text-right text-[10pt] text-ink-soft">
                <p>{subjectLabel} · {paperLabel}</p>
                <p>{attempt.completedAt ? formatDate(attempt.completedAt, zh) : ""}</p>
                <p className="mt-1 font-mono text-[8.5pt] text-ink-faint">
                  Ref {attempt.id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-8">
              <div>
                <p className="text-[9pt] tracking-[0.14em] text-ink-faint uppercase">
                  {zh ? "考生" : "Candidate"}
                </p>
                <p className="mt-1 text-[13pt] font-medium text-ink">{user.name ?? user.email}</p>
                <p className="text-[10pt] text-ink-soft">{mockTitle}</p>
                <p className="mt-2 text-[9.5pt] text-ink-soft">
                  {zh
                    ? `答对 ${correct} / ${total} 题 · 已答 ${answered} 题 · 用时 ${minutes} 分 ${seconds} 秒`
                    : `${correct} of ${total} correct · ${answered} answered · ${minutes}m ${seconds}s on the clock`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9pt] tracking-[0.14em] text-ink-faint uppercase">
                  {zh ? "分数" : "Score"}
                </p>
                <p className="font-serif text-[40pt] leading-[0.9] text-ink">{attempt.score}<span className="text-[14pt] text-ink-faint">/100</span></p>
                <p className="text-[10pt] font-medium text-ink-soft">{bandLabel}</p>
                <p className="text-[9pt] text-ink-faint">
                  {zh ? `模型预估第 ${percentile} 百分位` : `modelled percentile ${ordinal(percentile)}`}
                </p>
              </div>
            </div>

            <p className="mt-5 border-t border-line pt-3 text-[8.5pt] leading-relaxed text-ink-faint">
              {zh
                ? "本报告由 cscamaster.com 根据考生个人模拟作答自动生成，并非国家留学基金管理委员会（CSC）签发文件，不具有入学申请效力，亦不可替代 csca.cn 官方成绩单。所示百分位为模型估算值，并非官方统计数据。"
                : "Unofficial practice document generated from this candidate's own attempt on cscamaster.com. It is not issued by the China Scholarship Council, carries no standing in an application, and is not a substitute for the official CSCA score report published through csca.cn. Percentiles shown are modelled estimates, not official figures."}
            </p>
          </div>

          {auto === "1" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold-soft/60 px-3 py-2 text-[12px] text-gold">
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {zh
                ? "计时结束——系统已按到期时刻已保存的答案自动交卷。"
                : "Time expired — the paper was submitted automatically with the answers saved at that moment."}
            </div>
          )}

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between print:hidden">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{subjectLabel}</Pill>
                <Pill>{paperLabel}</Pill>
                <span className="text-[11px] text-ink-faint">
                  {attempt.completedAt ? formatDate(attempt.completedAt, zh) : ""}
                </span>
              </div>
              <h1 className="display-md mt-3 text-balance">{mockTitle}</h1>
              <p className="mt-2 text-[13px] text-ink-soft">
                {zh
                  ? `答对 ${correct} / ${total} 题 · 已答 ${answered} 题 · 用时 ${minutes} 分 ${seconds} 秒`
                  : `${correct} of ${total} correct · ${answered} answered · ${minutes}m ${seconds}s on the clock`}
              </p>
            </div>

            {/* Phones get a two-column grid; the row layout starts at sm. The
                score appears once — inside the ring — so the card cannot repeat
                the same number twice. */}
            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:shrink-0 sm:items-stretch">
              <div className="col-span-2 flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 sm:col-span-1">
                <ScoreRing score={attempt.score} tone={ringTone} size={88} stroke={7} />
                <div>
                  <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                    {zh ? "得分" : "Score"}
                  </p>
                  <p className={cn("mt-1 text-[12px] font-medium", band.tone)}>{bandLabel}</p>
                  <p className="mt-1 text-[10px] text-ink-faint">
                    {zh ? "0–100 分制，答错不倒扣" : "0–100 scale, no negative marking"}
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-card px-4 py-3">
                <p className="text-[10px] tracking-wide text-ink-faint uppercase">
                  {zh ? "预估百分位" : "Est. percentile"}
                </p>
                <p className="mt-1 font-display text-3xl leading-none text-ink tabular">
                  {zh ? `第 ${percentile}` : ordinal(percentile)}
                </p>
                <p className="mt-1 text-[9.5px] text-ink-faint">
                  {zh ? "模型估算，非官方" : "modelled, not official"}
                </p>
              </div>
              <PrintReportButton language={lang} />
            </div>
          </div>
        </div>
      </div>

      <AppBody className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.55fr)_0.85fr]">
        <div className="min-w-0 space-y-8">
          {/* the shape of the paper, before any breakdown by topic */}
          <section className="panel p-5">
            <AnswerGridInteractive
              language={lang}
              cells={attempt.mock.items.map((item, index) => {
                const stem = zh && item.question.stemZh ? item.question.stemZh : item.question.stem;
                const options = (
                  zh && item.question.optionsZh.length === item.question.options.length
                    ? item.question.optionsZh
                    : item.question.options
                ) as string[];
                const explanation =
                  (zh && item.question.explanationZh
                    ? item.question.explanationZh
                    : item.question.explanation) ?? "";
                return {
                  position: index + 1,
                  questionId: item.questionId,
                  stem,
                  options,
                  correctIndex: item.question.correctIndex,
                  // trimmed: the panel shows three lines, so a short slice keeps
                  // the client payload small without losing the teaching point
                  explanation: explanation.slice(0, 420),
                  topicTitle: zh ? item.question.topic?.titleZh : item.question.topic?.titleEn,
                };
              })}
              answers={answers}
              initialFilter={filter === "wrong" ? "wrong" : "all"}
            />
            <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-ink-faint">
              {zh
                ? "题号按从左到右、从上到下排列；方块仅展示作答正误与未答情况，逐题用时统计请查看右侧节奏面板。"
                : "Sequence runs left to right, top to bottom. Each square shows what you answered and missed; for measured per-question screen time, compare the Pacing panel on the right."}
            </p>
          </section>

          {missedCount > 0 && (
            <section className="rounded-2xl border border-vermillion/25 bg-vermillion/[0.04] p-5 print:hidden">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10.5px] font-semibold tracking-[0.14em] text-vermillion uppercase">
                    {zh ? "考后复盘行动计划" : "Post-mock recovery plan"}
                  </p>
                  <h2 className="mt-0.5 font-display text-lg text-ink">
                    {zh ? "考后三步提分方案" : "Three steps to raise this score next sitting"}
                  </h2>
                </div>
                <span className="text-[11px] text-ink-faint tabular">
                  {zh ? `${missedCount} 道错题可立即修补` : `${missedCount} misses to close`}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {firstWeak ? (
                  <Link
                    href={trackLink(`/app/practice/topic/${firstWeak.code}`, resultTrack)}
                    className="group rounded-xl border border-line bg-white p-3.5 transition hover:border-vermillion/45"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.12em] text-vermillion uppercase">
                      {zh ? "第 1 步 · 补最弱考点" : "Step 1 · Priority topic"}
                    </span>
                    <p className="mt-1 line-clamp-2 text-[12.5px] font-semibold text-ink">
                      {firstWeak.title} ({firstWeak.code})
                    </p>
                    <p className="mt-1 text-[11px] text-ink-soft">
                      {firstWeak.correct}/{firstWeak.total}{" "}
                      {zh ? "正确 · 点击做专项训练 →" : "correct · Drill topic →"}
                    </p>
                  </Link>
                ) : null}

                <Link
                  href={trackLink("/app/practice/quick", resultTrack, {
                    subject: attempt.mock.subjectCode,
                    mode: "weak",
                    n: "20",
                    timer: "15",
                  })}
                  className="group rounded-xl border border-line bg-white p-3.5 transition hover:border-vermillion/45"
                >
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-indigo uppercase">
                    {zh ? "第 2 步 · 限时重刷错题" : "Step 2 · Timed mistake drill"}
                  </span>
                  <p className="mt-1 text-[12.5px] font-semibold text-ink">
                    {zh ? "15 分钟错题快练" : "15-min weak-spot sprint"}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {zh
                      ? `本次 ${missedCount} 题未拿分${pace.overTarget > 0 ? `，${pace.overTarget} 题超时` : ""} · 立即重做 →`
                      : `${missedCount} missed${pace.overTarget > 0 ? ` · ${pace.overTarget} slow` : ""} · Start 15m sprint →`}
                  </p>
                </Link>

                <Link
                  href={trackLink("/app/learn", resultTrack, {
                    subject: attempt.mock.subjectCode,
                    view: "formulas",
                  })}
                  className="group rounded-xl border border-line bg-white p-3.5 transition hover:border-vermillion/45"
                >
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-jade uppercase">
                    {zh ? "第 3 步 · 核对公式陷阱" : "Step 3 · Formula & trap check"}
                  </span>
                  <p className="mt-1 text-[12.5px] font-semibold text-ink">
                    {zh ? `${subjectLabel}核心公式表` : `${subjectLabel} formula sheet`}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {zh ? "查看考官常见陷阱再二刷 →" : "Review key traps before retaking →"}
                  </p>
                </Link>
              </div>
            </section>
          )}

          <section>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl text-ink">
                {zh ? "知识点分布" : "Topic breakdown"}
              </h2>
              <p className="text-[11px] text-ink-faint">{zh ? "最弱优先" : "Weakest first"}</p>
            </div>
            <div className="mt-4 space-y-2.5">
              {topics.map((topic) => {
                const pct = Math.round((topic.correct / topic.total) * 100);
                return (
                  <div key={topic.code} className="rounded-xl border border-line bg-card px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-medium text-ink">{topic.title}</p>
                        <p className="text-[10.5px] text-ink-faint">{topic.code}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <p className="text-[12px] text-ink-soft tabular">
                          {topic.correct}/{topic.total}
                          <span className="ml-2 inline-block w-8 text-right font-medium text-ink">
                            {pct}%
                          </span>
                        </p>
                        <Link
                          href={trackLink(`/app/practice/topic/${topic.code}`, resultTrack)}
                          className="text-[11px] font-medium text-indigo hover:underline"
                        >
                          {zh ? "去练习 →" : "Drill →"}
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pct >= 75 ? "bg-jade" : pct >= 50 ? "bg-gold" : "bg-rose-600",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="review" className="scroll-mt-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-display text-xl text-ink">
                {zh ? "逐题回顾" : "Question review"}
              </h2>
              <div className="flex gap-1.5">
                <Link
                  href={trackLink(`/app/results/${attempt.id}`, resultTrack)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    filter !== "wrong" && filter !== "bookmarked"
                      ? "border-line-strong bg-paper-deep font-medium text-ink"
                      : "border-line text-ink-soft",
                  )}
                >
                  {zh ? `全部 ${total}` : `All ${total}`}
                </Link>
                <Link
                  href={trackLink(`/app/results/${attempt.id}?filter=wrong`, resultTrack)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    filter === "wrong"
                      ? "border-rose-500/30 bg-rose-500/10 font-medium text-rose-700"
                      : "border-line text-ink-soft",
                  )}
                >
                  {zh ? `错题 ${missedCount}` : `Missed ${missedCount}`}
                </Link>
                <Link
                  href={trackLink(`/app/results/${attempt.id}?filter=bookmarked`, resultTrack)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    filter === "bookmarked"
                      ? "border-gold/40 bg-gold-soft font-medium text-gold-deep"
                      : "border-line text-ink-soft",
                  )}
                >
                  {zh ? `收藏 ${bookmarkedCount}` : `Bookmarked ${bookmarkedCount}`}
                </Link>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {visible.length === 0 && (
                <div className="panel p-6 text-center text-[13px] text-ink-soft">
                  {zh
                    ? "这套试卷没有错题，可以挑战下一套难度更高的模拟卷。"
                    : "No missed questions on this paper. Move to a harder mock."}
                </div>
              )}

              {visible.map((item) => {
                const qStem = zh && item.question.stemZh ? item.question.stemZh : item.question.stem;
                const qOptions =
                  zh && item.question.optionsZh.length === item.question.options.length
                    ? item.question.optionsZh
                    : item.question.options;
                const qExplanation =
                  zh && item.question.explanationZh
                    ? item.question.explanationZh
                    : item.question.explanation;
                const topicFormula = !item.isCorrect
                  ? formulaByTopic.get(item.question.topic.code)
                  : undefined;
                return (
                <details
                  key={item.question.id}
                  id={`review-q-${item.index}`}
                  open={!item.isCorrect && missedCount <= 12}
                  className="group panel min-w-0 scroll-mt-20 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex min-w-0 cursor-pointer list-none items-center gap-3 px-4 py-2.5 transition hover:bg-paper-deep/40">
                    <span className="min-w-[2.75rem] shrink-0 whitespace-nowrap text-[11px] font-medium text-ink tabular">
                      {zh ? `第${item.index}题` : `Q${item.index}`}
                    </span>
                    {item.isCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-jade" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">
                      <MathText inline className="whitespace-nowrap">{qStem}</MathText>
                    </span>
                    <span className="hidden shrink-0 text-[10px] text-ink-faint sm:inline">
                      {item.question.topic.code}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint transition group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-line px-4 pt-3 pb-4">
                    <div className="text-[13.5px] leading-relaxed text-ink">
                      <MathText>{qStem}</MathText>
                    </div>

                    {item.question.figure && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.question.figure}
                          alt={zh ? "试卷插图" : "Official exam diagram"}
                          className="mx-auto max-h-[280px] w-auto"
                        />
                      </div>
                    )}

                    <div className="mt-3 space-y-1.5">
                      {qOptions.map((option, optionIndex) => {
                        const isCorrectOption = optionIndex === item.question.correctIndex;
                        const isGiven = optionIndex === item.given;
                        return (
                          <div
                            key={optionIndex}
                            className={cn(
                              "flex items-start gap-2.5 rounded-lg border px-3 py-2 text-[12.5px]",
                              isCorrectOption && "border-jade/40 bg-jade-soft/60",
                              !isCorrectOption && isGiven && "border-rose-500/40 bg-rose-500/8",
                              !isCorrectOption && !isGiven && "border-line text-ink-soft",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                                isCorrectOption
                                  ? "border-jade bg-jade text-paper"
                                  : isGiven
                                    ? "border-rose-600 bg-rose-600 text-white"
                                    : "border-line-strong text-ink-faint",
                              )}
                            >
                              {LETTERS[optionIndex]}
                            </span>
                            <span className="min-w-0 flex-1 text-ink">
                              <MathText inline>{option}</MathText>
                            </span>
                            {isCorrectOption && (
                              <span className="shrink-0 text-[9px] font-medium tracking-wide text-jade uppercase">
                                {zh ? "正确" : "Correct"}
                              </span>
                            )}
                            {!isCorrectOption && isGiven && (
                              <span className="shrink-0 text-[9px] font-medium tracking-wide text-rose-600 uppercase">
                                {zh ? "你的选择" : "Yours"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2.5">
                      <p className="text-[9.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                        {zh ? "解析" : "Explanation"}
                      </p>
                      <div className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                        <MathText>{qExplanation}</MathText>
                      </div>
                    </div>

                    {topicFormula && (
                      <div className="mt-2.5 rounded-lg border border-gold/35 bg-gold-soft/60 px-3 py-2.5 text-[11.5px] leading-relaxed text-ink">
                        <p className="text-[9.5px] font-semibold tracking-[0.12em] text-gold-deep uppercase">
                          {zh
                            ? `关联公式与陷阱 (${topicFormula.topicCode})`
                            : `Formula & Examiner Trap (${topicFormula.topicCode})`}
                        </p>
                        <div className="mt-1 overflow-x-auto rounded bg-white/80 px-2.5 py-1.5 text-[12px]">
                          <MathText>{topicFormula.formula}</MathText>
                        </div>
                        <p className="mt-1.5 text-ink-soft">
                          <MathText>{zh ? topicFormula.trapZh : topicFormula.trapEn}</MathText>
                        </p>
                      </div>
                    )}

                    <QuestionReviewTools
                      questionId={item.question.id}
                      initialBookmarked={item.bookmarked}
                      initialNote={item.note}
                      zh={zh}
                    />
                  </div>
                </details>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-8 lg:self-start">
          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {zh ? "水平解读" : "What this means"}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{bandBlurb}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-xl text-ink tabular">{answered}</p>
                <p className="text-[10px] text-ink-faint">{zh ? "已答" : "Answered"}</p>
              </div>
              <div className="rounded-lg bg-paper-deep/70 p-3">
                <p className="font-display text-xl text-ink tabular">{blank}</p>
                <p className="text-[10px] text-ink-faint">{zh ? "未答" : "Blank"}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-line p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                <Timer className="h-3.5 w-3.5 text-ink-faint" /> {zh ? "答题节奏" : "Pacing"}
              </p>
              <dl className="mt-2 space-y-1.5 text-[11.5px]">
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-ink-faint">{zh ? "用时" : "Time on paper"}</dt>
                  <dd className="text-ink tabular">
                    {zh
                      ? `${minutes} 分 ${String(seconds).padStart(2, "0")} 秒 · 已用 ${clockUsedPct}%`
                      : `${minutes}m ${String(seconds).padStart(2, "0")}s · ${clockUsedPct}% of the clock`}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-ink-faint">
                    {zh ? "每题用时" : "Per answered question"}
                  </dt>
                  <dd className="text-ink tabular">{actualPaceSec}s</dd>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-ink-faint">{zh ? "目标节奏" : "Target pace"}</dt>
                  <dd className="text-ink tabular">
                    {targetPaceSec}s{" "}
                    <span className="text-ink-faint">
                      ({zh ? `${total} 题 / ${attempt.mock.durationMin} 分钟` : `${total} in ${attempt.mock.durationMin} min`})
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">{paceVerdict}</p>
              <p className="mt-1.5 text-[9.5px] text-ink-faint">
                {zh ? "学习节奏参考，非 CSCA 官方指标。" : "Coaching read, not an official CSCA metric."}
              </p>

              {pace.measured > 0 && (
                <div className="mt-3 border-t border-line pt-2.5">
                  <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                    {zh ? "逐题用时" : "Where the clock went"}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {pace.slowest.map((row) => (
                      <li key={row.n} className="flex items-baseline justify-between gap-2 text-[11px]">
                        <span className="min-w-0 truncate text-ink-soft">
                          <span
                            className={
                              row.correct ? "text-jade" : row.answered ? "text-rose-600" : "text-ink-faint"
                            }
                          >
                            #{row.n}
                          </span>{" "}
                          {row.topic}
                        </span>
                        <span className="shrink-0 text-ink tabular">{formatPace(row.ms)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10.5px] leading-relaxed text-ink-soft">
                    {zh
                      ? `${
                          pace.overTarget > 0
                            ? `${total} 题中有 ${pace.overTarget} 题用时超过目标节奏（${targetPaceSec}s）两倍。`
                            : `没有题目用时超过目标节奏（${targetPaceSec}s）两倍。`
                        }${pace.wrongShare > 0 ? `已记录用时中有 ${pace.wrongShare}% 花在了答错的题目上。` : ""}`
                      : `${
                          pace.overTarget > 0
                            ? `${pace.overTarget} of ${total} questions ran past twice the ${targetPaceSec}s target pace. `
                            : `No question ran past twice the ${targetPaceSec}s target pace. `
                        }${
                          pace.wrongShare > 0
                            ? `${pace.wrongShare}% of your measured time went to questions you answered wrongly.`
                            : ""
                        }`}
                  </p>
                  <p className="mt-1 text-[9.5px] text-ink-faint">
                    {zh
                      ? `仅统计当前页面停留时间（切换后台标签会自动暂停）· 已记录 ${pace.measured}/${total} 题。`
                      : `Measured while each question was on screen — a hidden tab pauses the clock. ${pace.measured}/${total} questions measured.`}
                  </p>
                </div>
              )}
            </div>

            {weak.length > 0 && (
              <div className="mt-4 rounded-lg border border-rose-500/25 bg-rose-500/5 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-rose-700">
                  <Target className="h-3.5 w-3.5" /> {t(lang, "Drill these next")}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {weak.map((topic) => (
                    <li key={topic.code} className="text-[11.5px] text-ink-soft">
                      {topic.title} · {topic.correct}/{topic.total}
                    </li>
                  ))}
                </ul>
                <Link
                  href={trackLink("/app/practice", resultTrack, {
                    subject: attempt.mock.subjectCode,
                  })}
                  className="mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-indigo hover:underline"
                >
                  {t(lang, "Open practice")} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="panel p-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {t(lang, "Next step")}
            </p>
            <Link
              href={trackLink(`/app/mocks/${attempt.mock.slug}`, resultTrack)}
              className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2.5 text-[12.5px] text-ink transition hover:border-line-strong"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5 shrink-0 text-ink-faint" /> {t(lang, "Retake this paper")}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
            </Link>
            <Link
              href={trackLink("/app/mocks", resultTrack)}
              className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2.5 text-[12.5px] text-ink transition hover:border-line-strong"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-ink-faint" /> {t(lang, "Try another subject")}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
            </Link>
          </div>
        </aside>
      </AppBody>
    </>
  );
}
