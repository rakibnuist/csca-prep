import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import {
  OfficialQaBrowser,
  type OfficialQaQuestion,
} from "@/components/official/official-qa-browser";
import { Pill } from "@/components/site/section";
import { isPaperAllowedInTrack, parseProgramme, trackLink } from "@/lib/tracks";
import { getResolvedTrack } from "@/lib/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const paper = await prisma.mock.findUnique({ where: { slug }, select: { title: true, titleZh: true } });
  const title = track === "cn" && paper?.titleZh ? paper.titleZh : paper?.title;
  return { title: title ?? (track === "cn" ? "真题解析" : "Official Q&A") };
}

export default async function OfficialQaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ taught?: string }>;
}) {
  const user = await requireUser();
  const { slug } = await params;
  const { taught } = await searchParams;
  const track = await getResolvedTrack(taught, user.teachingTrack);

  const paper = await prisma.mock.findUnique({
    where: { slug },
    include: {
      subject: true,
      items: {
        orderBy: { order: "asc" },
        include: { question: { include: { topic: true } } },
      },
    },
  });

  if (!paper || (!paper.published && user.role !== "ADMIN") || (paper.paper !== "Official" && paper.paper !== "Review")) {
    notFound();
  }
  if (user.role !== "ADMIN" && !isPaperAllowedInTrack(paper, track, parseProgramme(user.track))) {
    notFound();
  }
  if (track === "CN" && paper.subject.kind !== "CHINESE" && paper.items.some((item) => !item.question.stemZh)) {
    notFound();
  }

  const isOfficial = paper.paper === "Official";
  const zh = track === "CN";

  const questions: OfficialQaQuestion[] = paper.items.map((item, index) => ({
    id: item.question.id,
    index: index + 1,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    figure: item.question.figure,
    correctIndex: item.question.correctIndex,
    explanation: item.question.explanation,
    explanationZh: item.question.explanationZh,
    topicCode: item.question.topic.code,
    topicTitle:
      track === "CN" ? item.question.topic.titleZh : item.question.topic.titleEn,
    difficulty: item.question.difficulty,
  }));

  return (
    <>
      <PageHeader
        backHref={{
          href: trackLink("/app/official", track, {
            tab: isOfficial ? undefined : "review",
          }),
          label: isOfficial
            ? zh
              ? "全部中文真题"
              : "All official papers"
            : zh
              ? "全部复习卷"
              : "All review sets",
        }}
        eyebrow={
          track === "CN"
            ? isOfficial
              ? "官方真题"
              : "复习卷"
            : `${isOfficial ? "Official paper" : "Review set"} · English`
        }
        title={zh && paper.titleZh ? paper.titleZh : paper.title}
        body={
          isOfficial
            ? zh
              ? "每道题都有答案与逐步解析。可先隐藏答案自测，准备好后再计时作答。"
              : "Answer key and step-by-step analysis for every question. Hide the answers to self-test, or sit the timed version when you are ready."
            : zh
              ? "根据官方材料重整的复习模块，附答案与逐题解析。免费学习，专业版可计时作答。"
              : "A reconstructed module with the answer key and analysis for every question. Study it free; sit it on the clock with Pro."
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={isOfficial ? "red" : "gold"}>
              {isOfficial ? (zh ? "官方" : "Official") : zh ? "复习卷" : "Review"}
            </Pill>
            <Pill>{track === "CN" ? paper.subject.nameZh : paper.subject.nameEn}</Pill>
          </div>
        }
      />

      <AppBody className="max-w-[1120px]">
        <OfficialQaBrowser
          questions={questions}
          title={zh && paper.titleZh ? paper.titleZh : paper.title}
          subjectName={track === "CN" ? paper.subject.nameZh : paper.subject.nameEn}
          language={track === "CN" ? "zh" : "en"}
          mocksHref={trackLink("/app/mocks", track)}
          paperNote={
            (zh ? paper.subtitleZh : paper.subtitle) ??
            (zh
              ? "官方 CSCA 真题，使用前请与官方来源核对。"
              : "Official CSCA past paper. Cross-check with official sources before relying on it.")
          }
        />
      </AppBody>
    </>
  );
}
