import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Film, Info } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { EPISODES } from "@/lib/videos";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return EPISODES.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = EPISODES.find((entry) => entry.slug === slug);
  if (!episode) return {};
  return pageMetadata({
    title: `${episode.title} — CSCA video outline`,
    description: `${episode.hook} Chapter list and key takeaways for the ${episode.lengthTarget} CSCA explainer.`,
    path: `/video/${episode.slug}`,
    keywords: ["CSCA video", "CSCA explained", episode.title],
  });
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = EPISODES.find((entry) => entry.slug === slug);
  if (!episode) notFound();

  const index = EPISODES.findIndex((entry) => entry.slug === slug);
  const prev = index > 0 ? EPISODES[index - 1] : null;
  const next = index < EPISODES.length - 1 ? EPISODES[index + 1] : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Video series", path: "/video" },
          { name: episode.title, path: `/video/${episode.slug}` },
        ])}
      />
      {episode.youtubeId && (
        <JsonLd
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
      )}

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Link
            href="/video"
            className="text-[12px] text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            ← Video series
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Eyebrow>Episode {index + 1} of {EPISODES.length}</Eyebrow>
            <Pill>
              <Clock3 className="h-3 w-3" /> {episode.lengthTarget}
            </Pill>
          </div>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">{episode.title}</h1>
          <p className="lead mt-5 max-w-2xl">{episode.hook}</p>
          {!episode.youtubeId && (
            <p className="mt-5 max-w-2xl rounded-xl border border-line bg-paper-deep/50 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <strong className="text-ink">In production:</strong> this episode is scripted and
              chaptered but not filmed yet. The outline below is the full content, so you can use it
              now and judge whether the episode is worth your time.
            </p>
          )}
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">What the episode covers</h2>
            <ol className="mt-3 space-y-2">
              {episode.chapters.map((chapter) => (
                <li
                  key={chapter.at}
                  className="flex items-start gap-3 rounded-lg border border-line bg-card px-3 py-2.5"
                >
                  <span className="mt-0.5 shrink-0 rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                    {chapter.at}
                  </span>
                  <span className="min-w-0 flex-1 text-[12.5px] text-ink-soft">{chapter.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-xl text-ink">What you leave with</h2>
            <ul className="mt-3 space-y-2">
              {episode.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                  {takeaway}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-line bg-paper-deep p-4">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-ink-faint" />
                <p className="text-[12.5px] font-medium text-ink">After the episode</p>
              </div>
              <Link
                href={episode.cta.href}
                className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-vermillion hover:underline"
              >
                {episode.cta.label} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-line bg-card p-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-ink-faint" />
            <p className="text-[12px] text-ink-soft">
              The whole series is five episodes.{" "}
              <Link href="/video" className="underline underline-offset-2 hover:text-ink">
                See all episodes
              </Link>
              .
            </p>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {prev ? (
            <Link
              href={`/video/${prev.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link href="/video" className="text-[12px] text-ink-soft hover:text-ink">
            All episodes
          </Link>
          {next ? (
            <Link
              href={`/video/${next.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              {next.title} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </>
  );
}
