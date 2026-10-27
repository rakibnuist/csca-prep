import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import {
  OfficialQaBrowser,
  type OfficialQaQuestion,
} from "@/components/official/official-qa-browser";
import { Pill } from "@/components/site/section";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = await prisma.mock.findUnique({ where: { slug }, select: { title: true } });
  return { title: paper?.title ?? "Official Q&A" };
}

export default async function OfficialQaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireUser();
  const { slug } = await params;

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

  if (!paper || paper.paper !== "Official") notFound();

  const questions: OfficialQaQuestion[] = paper.items.map((item, index) => ({
    id: item.question.id,
    index: index + 1,
    stem: item.question.stem,
    stemZh: item.question.stemZh,
    options: item.question.options,
    optionsZh: item.question.optionsZh,
    correctIndex: item.question.correctIndex,
    explanation: item.question.explanation,
    explanationZh: item.question.explanationZh,
    topicCode: item.question.topic.code,
    topicTitle: item.question.topic.titleEn,
    difficulty: item.question.difficulty,
  }));

  return (
    <>
      <PageHeader
        backHref={{ href: "/app/official", label: "All official papers" }}
        eyebrow="Official Q&A"
        title={paper.title}
        body="Answer key and step-by-step analysis for every question. Hide the answers to self-test, or sit the timed version when you are ready."
        action={
          <div className="flex items-center gap-2">
            <Pill tone="red">Official</Pill>
            <Pill>{paper.subject.nameEn}</Pill>
          </div>
        }
      />

      <AppBody className="max-w-[1120px]">
        <OfficialQaBrowser
          questions={questions}
          title={paper.title}
          subjectName={paper.subject.nameEn}
          paperNote={
            paper.subtitle ??
            "Official CSCA past paper. Cross-check with official sources before relying on it."
          }
        />
      </AppBody>
    </>
  );
}
