import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Play,
  ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { Pill } from "@/components/site/section";
import { TrackSwitch } from "@/components/app/track-switch";
import { entitlementFor, paperKind } from "@/lib/entitlements";
import {
  displaySubjectShort,
  parseProgramme,
  trackLink,
  trackMetaTitle,
  trackPaperWhere,
  trackSubjectCodes,
  trackSubjects,
} from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Official papers", "官方真题");
}

/**
 * Official papers — the real sittings, transcribed with their published
 * answer keys. Studying them is free for everyone; sitting them on the clock
 * is a Pro feature. This is a separate product from mock tests and is never
 * mixed into the same list.
 */
export default async function OfficialPapersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; subject?: string; year?: string; taught?: string }>;
}) {
  const user = await requireUser();
  const access = await getAccess(user.id);
  const params = await searchParams;

  const track = await getResolvedTrack(params.taught, user.teachingTrack);
  const programme = parseProgramme(user.track);
  const lang = track === "CN" ? "zh" : "en";
  const trackCodes = trackSubjectCodes(track, programme);
  const subjectsForTrack = trackSubjects(track, programme);

  const tab = params.tab === "review" ? "review" : "official";
  const activeSubject =
    params.subject && (trackCodes as string[]).includes(params.subject) ? params.subject : undefined;
  const activeYear = params.year;

  const papers = await prisma.mock.findMany({
    where: {
      published: true,
      subjectCode: { in: trackCodes },
      AND: [
        { OR: [{ paper: "Official" }, { paper: "Review" }] },
        trackPaperWhere(track, programme),
      ],
    },
    include: {
      subject: true,
      _count: { select: { items: true } },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: "desc" },
        select: { id: true, status: true, score: true },
      },
    },
    orderBy: [{ year: "desc" }, { subjectCode: "asc" }, { title: "asc" }],
  });

  const entries = papers
    .map((mock) => ({ mock, kind: paperKind(mock.paper, mock.slug) }))
    .filter((entry) => entry.kind === tab)
    .filter((entry) => !activeSubject || entry.mock.subjectCode === activeSubject)
    .filter((entry) => !activeYear || String(entry.mock.year) === activeYear);

  const allPapers = papers.map((mock) => ({ mock, kind: paperKind(mock.paper, mock.slug) }));
  const officialPapers = allPapers.filter((e) => e.kind === "official");
  const reviewPapers = allPapers.filter((e) => e.kind === "review");

  const yearOptions = Array.from(new Set(officialPapers.map((e) => e.mock.year))).sort((a, b) => b - a);

  const chip = (active: boolean) =>
    cn(
      "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-medium transition",
      active
        ? "border-ink bg-ink text-paper"
        : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink",
    );

  const href = (next: { tab?: string; subject?: string | null; year?: string | null }) => {
    return trackLink("/app/official", track, {
      tab: (next.tab ?? tab) === "official" ? undefined : (next.tab ?? tab),
      subject: next.subject === null ? undefined : (next.subject ?? activeSubject),
      year: next.year === null ? undefined : (next.year ?? activeYear),
    });
  };

  const subjectCount = (list: typeof officialPapers) =>
    subjectsForTrack.reduce<Record<string, number>>((acc, subject) => {
      acc[subject.code] = list.filter((e) => e.mock.subjectCode === subject.code).length;
      return acc;
    }, {});

  const officialCounts = subjectCount(officialPapers);
  const reviewCounts = subjectCount(reviewPapers);

  return (
    <>
      <PageHeader
        eyebrow={
          track === "CN"
            ? tab === "review"
              ? "复习卷"
              : "官方真题"
            : tab === "review"
              ? "Review sets"
              : "Official papers"
        }
        title={
          tab === "review"
            ? track === "CN"
              ? "重整复习模块。"
              : "Reconstructed review modules."
            : track === "CN"
              ? "中文真题，逐题整理。"
              : "The real sittings, digitised."
        }
        body={
          tab === "review"
            ? track === "CN"
              ? "根据官方材料按专题重整的复习模块，已明确标注，避免与真实场次混淆——所有账号免费学习。"
              : "Topic-focused modules rebuilt from the official papers. They are labelled clearly so they are never mistaken for an official sitting — and they are free to study."
            : track === "CN"
              ? "我们整理的中文官方试卷：原始题目、官方答案与逐题解析。免费学习，专业版可计时作答。英文来源的试卷不会出现在这里。"
              : "Every official CSCA sitting we have transcribed, with the published answer key and a worked explanation for each question. Study them free; sit them on the clock with Pro."
        }
        action={
          <Link
            href={trackLink("/app/mocks", track)}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            <Play className="h-3.5 w-3.5" /> {track === "CN" ? "模拟考试" : "Mock tests"}
          </Link>
        }
      />

      <AppBody>
        <TrackSwitch track={track} />

        {/* Collection selector */}

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            {
              key: "official" as const,
              label: track === "CN" ? "官方真题" : "Past papers",
              count: officialPapers.length,
              desc:
                track === "CN"
                  ? "真实场次 · 官方答案"
                  : "Real sittings · published answer keys",
            },
            {
              key: "review" as const,
              label: track === "CN" ? "复习卷" : "Review sets",
              count: reviewPapers.length,
              desc:
                track === "CN"
                  ? "重整模块 · 明确标注"
                  : "Reconstructed modules · labelled clearly",
            },
          ].map((c) => {
            const on = tab === c.key;
            return (
              <Link
                key={c.key}
                href={href({ tab: c.key })}
                className={cn(
                  "group relative flex items-start gap-3 rounded-xl border px-4 py-3.5 transition",
                  on
                    ? "border-ink bg-ink text-paper shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                    : "border-line bg-card text-ink hover:border-line-strong hover:bg-paper-deep/30",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold tabular",
                    on ? "bg-white/12 text-paper" : "bg-paper-deep text-ink-soft",
                  )}
                >
                  {c.count}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-[13.5px] font-semibold", on ? "text-paper" : "text-ink")}>{c.label}</p>
                  <p className={cn("mt-0.5 text-[11.5px]", on ? "text-paper/65" : "text-ink-faint")}>{c.desc}</p>
                </div>
                {on && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-paper/70" />}
              </Link>
            );
          })}
        </div>

        {/* subject chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Link href={href({ subject: null })} className={chip(!activeSubject)}>
            {t(lang, "All subjects")}
          </Link>
          {subjectsForTrack.map((subject) => {
            const count = tab === "review" ? reviewCounts[subject.code] : officialCounts[subject.code];
            return (
              <Link
                key={subject.code}
                href={href({ subject: subject.code })}
                className={chip(activeSubject === subject.code)}
              >
                {displaySubjectShort(subject, track)}
                <span className="text-[10px] opacity-60 tabular">{count ?? 0}</span>
              </Link>
            );
          })}
        </div>

        {/* year chips — only for dated sittings */}
        {tab === "official" && yearOptions.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
              {t(lang, "Sitting")}
            </span>
            <Link href={href({ year: null })} className={chip(!activeYear)}>
              {t(lang, "All years")}
            </Link>
            {yearOptions.map((year) => (
              <Link
                key={year}
                href={href({ year: String(year) })}
                className={chip(activeYear === String(year))}
              >
                {year}
              </Link>
            ))}
          </div>
        )}

        {entries.length === 0 ? (
          <div className="panel card-elevate mt-8 p-10 text-center">
            <BookOpen className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-2xl text-ink">
              {track === "CN" ? "暂时没有内容" : "Nothing here yet"}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              {track === "CN"
                ? "我们仍在整理该场次的中文试卷，请换一个科目或年份。"
                : "We are still transcribing sittings. Try another subject or year."}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {entries.map(({ mock, kind }) => {
              const submitted = mock.attempts.filter((a) => a.status === "SUBMITTED");
              const inProgress = mock.attempts.find((a) => a.status === "IN_PROGRESS");
              const best = submitted.reduce((max, a) => Math.max(max, a.score), 0);
              const ent = entitlementFor(access, kind, mock.slug, submitted.length, lang);
              const isOfficial = kind === "official";

              return (
                <div
                  key={mock.id}
                  className="flex h-full min-w-0 flex-col gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 transition hover:border-line-strong hover:shadow-[var(--shadow-card)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-[13px] font-medium text-ink">
                        {track === "CN" && mock.titleZh ? mock.titleZh : mock.title}
                      </p>
                      <Pill tone={isOfficial ? "red" : "gold"}>
                        {t(lang, isOfficial ? "Official" : "Reconstructed")}
                      </Pill>
                      {inProgress ? (
                        <Pill tone="gold">{t(lang, "In progress")}</Pill>
                      ) : submitted.length > 0 ? (
                        <Pill tone="jade">
                          <CheckCircle2 className="h-3 w-3" /> {best}/100
                        </Pill>
                      ) : null}
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ink-faint">
                      <span className="inline-flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {mock._count.items}{" "}
                        {track === "CN" ? "题" : "questions"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3 w-3" /> {mock.durationMin}{" "}
                        {track === "CN" ? "分钟" : "min"}
                      </span>
                      {!mock.isFullLength && (
                        <span className="text-gold">{t(lang, "Short paper")}</span>
                      )}
                      {isOfficial && (
                        <span>{track === "CN" ? "附官方答案" : "Published answer key"}</span>
                      )}
                    </div>

                    <p
                      className={cn(
                        "mt-2 flex items-start gap-1.5 text-[10.5px]",
                        ent.canSit ? "text-ink-faint" : "text-vermillion",
                      )}
                    >
                      {!ent.canSit && <ShieldCheck className="mt-px h-3 w-3 shrink-0" />}
                      {ent.note}
                    </p>
                  </div>

                  <div className="mt-auto flex shrink-0 flex-wrap items-center gap-2 pt-1">
                    <Link
                      href={trackLink(`/app/official/${mock.slug}`, track)}
                      className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md border border-line-strong px-3 text-[11.5px] font-medium text-ink transition hover:border-ink/30"
                    >
                      <BookOpen className="h-3 w-3" /> {t(lang, "Study")}
                    </Link>

                    {inProgress ? (
                      <Link
                        href={trackLink(`/exam/${mock.slug}`, track)}
                        className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper transition hover:bg-ink/85"
                      >
                        <Play className="h-3 w-3" /> {t(lang, "Resume")}
                      </Link>
                    ) : ent.canSit ? (
                      <Link
                        href={trackLink(`/app/mocks/${mock.slug}`, track)}
                        className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md bg-vermillion px-3 text-[11.5px] font-medium text-paper transition hover:bg-vermillion-deep"
                      >
                        <Play className="h-3 w-3" /> {t(lang, "Sit timed")}
                      </Link>
                    ) : (
                      <Link
                        href={trackLink("/app/billing#redeem", track)}
                        className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-md bg-ink px-3 text-[11.5px] font-medium text-paper"
                      >
                        {t(lang, "Redeem Pro")} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 space-y-2 rounded-xl border border-line bg-card p-4 text-[11px] leading-relaxed text-ink-soft">
          {track === "CN" ? (
            <>
              <p>
                <span className="font-medium text-ink">题目来源。</span>
                官方真题按真实场次整理，附官方答案并注明来源。复习卷是根据官方材料重整的模块，已明确标注，并非官方试卷。
              </p>
              <p>
                <span className="font-medium text-ink">学习或作答。</span>
                所有账号都可免费使用学习模式：先做题，再展开解析。专业版可按计时作答，并按官方答案评分。
              </p>
            </>
          ) : (
            <>
              <p>
                <span className="font-medium text-ink">Where these come from.</span> Official past
                papers are transcribed from the real sittings with their published answer keys, and
                attributed to the source. Review sets are modules reconstructed from official material
                and are labelled as reconstructions — they are not official papers.
              </p>
              <p>
                <span className="font-medium text-ink">Study or sit.</span> Study mode is free for
                every account: work the question, then reveal the working. Pro adds the ability to sit
                these papers on the clock and be scored against the official key.
              </p>
            </>
          )}
        </div>
      </AppBody>
    </>
  );
}
