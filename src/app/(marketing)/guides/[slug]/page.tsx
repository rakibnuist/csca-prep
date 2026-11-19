import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { GUIDES, GUIDE_MAP } from "@/lib/guides";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_MAP[slug];
  if (!guide) return { title: "Guide" };

  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.modified,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDE_MAP[slug];
  if (!guide) notFound();

  return (
    <>
      <JsonLd
        data={articleLd({
          title: guide.title,
          description: guide.description,
          path: `/guides/${guide.slug}`,
          published: guide.published,
          modified: guide.modified,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />

      <article>
        <header className="border-b border-line">
          <div className="shell py-10 sm:py-14">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All guides
            </Link>

            <div className="mt-5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="red">{guide.eyebrow}</Pill>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-faint">
                  <Clock3 className="h-3 w-3" /> {guide.readingMinutes} min read
                </span>
                <span className="text-[11px] text-ink-faint">
                  Updated {formatDate(guide.modified)}
                </span>
              </div>
              <h1 className="display-lg mt-4 text-balance">{guide.h1}</h1>
              <p className="lead mt-5">{guide.intro}</p>
            </div>
          </div>
        </header>

        <div className="shell grid grid-cols-1 gap-12 py-12 lg:grid-cols-[0.26fr_minmax(0,0.74fr)]">
          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24">
              <p className="eyebrow">On this page</p>
              <nav className="mt-3 space-y-1.5">
                {guide.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-[12px] leading-snug text-ink-soft transition hover:text-vermillion"
                  >
                    {section.h2}
                  </a>
                ))}
              </nav>

              <div className="mt-8 rounded-xl border border-line bg-card p-4">
                <p className="text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                  In one line
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                  {guide.takeaway}
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-2xl">
            <div className="space-y-10">
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">{section.h2}</h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vermillion/70" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.table && (
                    <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-card">
                      <table className="w-full text-[12.5px]">
                        <thead>
                          <tr className="bg-paper-deep/70 text-left text-[10px] tracking-[0.1em] text-ink-faint uppercase">
                            {section.table.head.map((cell) => (
                              <th key={cell} className="px-3 py-2.5 font-medium">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {section.table.rows.map((row) => (
                            <tr key={row.join("-")}>
                              {row.map((cell, index) => (
                                <td
                                  key={index}
                                  className={
                                    index === 0
                                      ? "px-3 py-2.5 font-medium text-ink"
                                      : "px-3 py-2.5 text-ink-soft"
                                  }
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.callout && (
                    <div className="mt-5 rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3">
                      <p className="text-[10px] font-medium tracking-[0.12em] text-gold uppercase">
                        Worth knowing
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{section.callout}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-paper-deep/50 p-5">
              <Eyebrow>The short answer</Eyebrow>
              <p className="mt-2 font-display text-xl leading-snug text-ink">{guide.takeaway}</p>
            </div>

            <div className="mt-8">
              <p className="eyebrow">Keep reading</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {guide.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-line bg-card px-3.5 py-2.5 text-[12px] text-ink transition hover:border-line-strong"
                  >
                    <span className="truncate">{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-xl bg-ink px-5 py-5 text-paper sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl">Put this into practice.</p>
                <p className="mt-1 text-[12px] text-paper/60">
                  A full paper tells you more than any guide.
                </p>
              </div>
              <Link
                href="/sign-up"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12px] font-medium text-paper"
              >
                Start free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
