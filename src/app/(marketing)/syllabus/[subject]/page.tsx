import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { CURRICULUM, getSubject } from "@/lib/curriculum";
import { OFFICIAL } from "@/lib/site";

const CODES = ["math", "phys", "chem", "ch_hum", "ch_sci"] as const;

export function generateStaticParams() {
  return CODES.map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const record = getSubject(subject);
  if (!record) return { title: "Syllabus" };

  return pageMetadata({
    title: `CSCA ${record.nameEn} syllabus — topics, weights and practice`,
    description: `${record.nameEn} topics in the official CSCA syllabus: ${record.topics
      .slice(0, 5)
      .map((topic) => topic.titleEn)
      .join(", ")} and more.`,
    path: `/syllabus/${record.code.toLowerCase()}`,
    keywords: [
      `CSCA ${record.nameEn} syllabus`,
      `CSCA ${record.nameEn} topics`,
      `CSCA ${record.nameEn} questions`,
    ],
  });
}

export default async function SubjectSyllabusPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!CODES.includes(subject as (typeof CODES)[number])) notFound();

  const record = getSubject(subject);
  if (!record) notFound();

  const units = record.topics.reduce<Record<string, typeof record.topics>>((accumulator, topic) => {
    accumulator[topic.unitEn] = accumulator[topic.unitEn] ?? [];
    accumulator[topic.unitEn].push(topic);
    return accumulator;
  }, {});

  const index = CODES.indexOf(subject as (typeof CODES)[number]);
  const previous = CODES[(index - 1 + CODES.length) % CODES.length];
  const next = CODES[(index + 1) % CODES.length];
  const others = CURRICULUM.filter((entry) => entry.code !== record.code);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Syllabus", path: "/syllabus" },
          { name: record.nameEn, path: `/syllabus/${record.code.toLowerCase()}` },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All subjects
          </Link>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>
                {record.kind === "CHINESE" ? "Professional Chinese" : "Fundamental subject"}
              </Eyebrow>
              <h1 className="display-lg mt-3">
                {record.nameEn}
                <span className="ml-3 align-middle font-chinese text-2xl text-vermillion">
                  {record.nameZh}
                </span>
              </h1>
              <p className="lead mt-4 max-w-2xl">{record.blurbEn}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>{record.questionCount} questions</Pill>
                <Pill>{record.durationMin} minutes</Pill>
                <Pill tone="jade">{record.practiceItems} practice items</Pill>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/app/practice?subject=${record.code}`}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
              >
                Practise this subject <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={OFFICIAL.syllabus}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
              >
                Official PDF <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="space-y-10">
            {Object.entries(units).map(([unit, unitTopics]) => {
              const unitWeight = unitTopics.reduce((sum, topic) => sum + topic.weight, 0);
              return (
                <div key={unit}>
                  <div className="flex items-baseline justify-between border-b border-line pb-2">
                    <h2 className="font-display text-2xl text-ink">
                      {unit}
                      <span className="ml-2 font-chinese text-sm text-ink-faint">
                        {unitTopics[0]?.unitZh}
                      </span>
                    </h2>
                    <span className="text-[11px] text-ink-faint">
                      ~{Math.round(unitWeight * 100)}% of the paper
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    {unitTopics.map((topic) => (
                      <div key={topic.code} className="rounded-xl border border-line bg-card p-4 sm:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-paper-deep px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
                                {topic.code}
                              </span>
                              <h3 className="text-[14px] font-medium text-ink">{topic.titleEn}</h3>
                            </div>
                            <p className="mt-0.5 text-[11.5px] text-ink-faint">{topic.titleZh}</p>
                          </div>
                          <span className="text-[10.5px] text-ink-faint">
                            ~{Math.round(topic.weight * 100)}%
                          </span>
                        </div>

                        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
                          {topic.summaryEn}
                        </p>
                        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-faint">
                          {topic.summaryZh}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <Link
                            href={`/app/practice/topic/${topic.code}`}
                            className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[11px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                          >
                            <BookOpen className="h-3 w-3" /> Drill this topic
                          </Link>
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-paper-deep">
                            <div
                              className="h-full bg-vermillion/60"
                              style={{ width: `${Math.max(4, topic.weight * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-4">
              <p className="eyebrow">Weight map</p>
              <div className="mt-3 space-y-2">
                {record.topics.map((topic) => (
                  <div key={topic.code} className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[9.5px] text-ink-faint">{topic.code}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className="h-full rounded-full bg-ink/70"
                        style={{ width: `${Math.max(5, topic.weight * 400)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-4">
              <p className="eyebrow">Other subjects</p>
              <div className="mt-2 space-y-1.5">
                {others.map((entry) => (
                  <Link
                    key={entry.code}
                    href={`/syllabus/${entry.code.toLowerCase()}`}
                    className="flex items-center justify-between text-[11.5px] text-ink-soft hover:text-vermillion"
                  >
                    {entry.nameEn}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep/60 p-4">
              <p className="text-[11.5px] font-medium text-ink">Reading the weights</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                Percentages are our estimate of each topic&apos;s share of a paper, derived from the
                official outline. They guide revision order; they are not a guarantee.
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/syllabus/${previous}`}
                className="inline-flex flex-1 items-center gap-1 rounded-lg border border-line px-3 py-2 text-[11.5px] text-ink-soft hover:text-ink"
              >
                <ArrowLeft className="h-3 w-3" /> Prev
              </Link>
              <Link
                href={`/syllabus/${next}`}
                className="inline-flex flex-1 items-center justify-end gap-1 rounded-lg border border-line px-3 py-2 text-[11.5px] text-ink-soft hover:text-ink"
              >
                Next <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
