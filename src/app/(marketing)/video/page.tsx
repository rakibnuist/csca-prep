import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Film, Play } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { EPISODES, PUBLISHED_EPISODES } from "@/lib/videos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA video series — five chaptered explainers",
  description:
    "The five CSCA explainers we are producing: what the exam is, the 48-in-60 strategy, the Professional Chinese paper, test-day setup and how to read a score report. Chapter lists published before filming.",
  path: "/video",
  keywords: ["CSCA video", "CSCA explained", "CSCA strategy video"],
});

export default function VideoPage() {
  const published = PUBLISHED_EPISODES.length > 0;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Video series", path: "/video" }])} />

      {/* VideoObject is emitted only for episodes that exist, never for the plan. */}
      {PUBLISHED_EPISODES.map((episode) => (
        <JsonLd
          key={episode.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: episode.title,
            description: episode.hook,
            uploadDate: "2026-11-12",
            embedUrl: `https://www.youtube-nocookie.com/embed/${episode.youtubeId}`,
            contentUrl: `https://www.youtube.com/watch?v=${episode.youtubeId}`,
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
            inLanguage: "en",
            hasPart: episode.chapters.map((chapter) => ({
              "@type": "Clip",
              name: chapter.label,
              startOffset: chapter.at,
            })),
          }}
        />
      ))}

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Video · five episodes</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Five CSCA explainers, chaptered before they were filmed.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            No CSCA prep site owns video, and most of the questions candidates ask are visual — what
            the palette looks like, how the clock behaves, what “80 in 90” feels like. Here is the
            series, with chapter marks and the page each episode ends on.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">
              {PUBLISHED_EPISODES.length > 0 ? `${PUBLISHED_EPISODES.length} published` : "In production"}
            </Pill>
            <Pill>Chaptered, not rambling</Pill>
            <Pill tone="jade">Every episode ends on a page</Pill>
          </div>
          {!published && (
            <p className="mt-5 max-w-2xl rounded-xl border border-line bg-paper-deep/50 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <strong className="text-ink">Status, honestly:</strong> the episodes below are scripted
              and chaptered but not yet filmed. We publish the outline first so you can judge whether
              the series is worth your time — and so no page on this site claims a video that does not
              exist.
            </p>
          )}
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {EPISODES.map((episode, index) => (
            <article key={episode.slug} className="panel flex min-w-0 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                    Episode {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-display text-lg leading-tight text-ink">
                    <Link
                      href={`/video/${episode.slug}`}
                      className="transition hover:text-vermillion"
                    >
                      {episode.title}
                    </Link>
                  </h2>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-soft">
                  <Clock3 className="h-3 w-3" /> {episode.lengthTarget}
                </span>
              </div>

              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{episode.hook}</p>

              {episode.youtubeId ? (
                <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-line bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}`}
                    title={episode.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <div className="mt-4 flex aspect-video items-center justify-center rounded-xl border border-dashed border-line bg-paper-deep/40">
                  <div className="text-center">
                    <Film className="mx-auto h-5 w-5 text-ink-faint" />
                    <p className="mt-2 text-[11.5px] text-ink-soft">In production</p>
                    <p className="text-[10.5px] text-ink-faint">Chapters below are final</p>
                  </div>
                </div>
              )}

              <ol className="mt-4 space-y-1.5">
                {episode.chapters.map((chapter) => (
                  <li key={chapter.at} className="flex gap-2.5 text-[11.5px] text-ink-soft">
                    <span className="w-9 shrink-0 tabular text-ink-faint">{chapter.at}</span>
                    {chapter.label}
                  </li>
                ))}
              </ol>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/video/${episode.slug}`}
                  className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink hover:underline"
                >
                  Read the full outline <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href={episode.cta.href}
                  className="inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
                >
                  {episode.cta.label} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-card p-5">
          <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
            <Play className="h-3.5 w-3.5 text-ink-faint" /> Why chaptered, and why on-site first
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
            A candidate watching “CSCA explained” wants to see the palette, not a talking head. Each
            episode is cut to the questions the pages already answer, so the video and the page do not
            contradict each other — and when the rules change, the page is updated with a date in the{" "}
            <Link href="/csca/updates" className="text-vermillion hover:underline">
              changelog
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
