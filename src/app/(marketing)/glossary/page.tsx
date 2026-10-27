import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/glossary";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA glossary — every term international applicants meet",
  description:
    "CSCA, CGS, HSK, Professional Chinese, Double First Class, JW202 and more: clear definitions for the admissions and exam vocabulary Chinese university applications throw at you.",
  path: "/glossary",
  keywords: [
    "CSCA meaning",
    "what is CSCA",
    "CSCA glossary",
    "CGS scholarship terms",
    "HSK vs CSCA",
    "Double First Class meaning",
  ],
});

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Glossary", path: "/glossary" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "CSCA and China admissions glossary",
          url: `${SITE.url}/glossary`,
          hasDefinedTerm: GLOSSARY.map((entry) => ({
            "@type": "DefinedTerm",
            name: entry.term,
            description: entry.definition,
            url: `${SITE.url}/glossary#${entry.slug}`,
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Reference</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            The CSCA vocabulary that decides your application, defined plainly.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            CSCA, CGS, HSK, Double First Class, JW202 — the vocabulary is not hard, but nobody
            explains it in one place. This is that place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {GLOSSARY_CATEGORIES.map((category) => (
              <a key={category} href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Pill>{category}</Pill>
              </a>
            ))}
            <Pill tone="jade">{GLOSSARY.length} terms</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[0.25fr_0.75fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="eyebrow">Contents</p>
              <nav className="mt-3 space-y-1">
                {GLOSSARY_CATEGORIES.map((category) => (
                  <a
                    key={category}
                    href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block py-1 text-[12px] text-ink-soft transition hover:text-vermillion"
                  >
                    {category}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-xl border border-line bg-card p-4">
                <BookMarked className="h-4 w-4 text-ink-faint" />
                <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
                  Missing a term? Email{" "}
                  <a href={`mailto:${SITE.email}`} className="text-vermillion underline underline-offset-2">
                    {SITE.email}
                  </a>{" "}
                  and we will add it with a source.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-10">
            {GLOSSARY_CATEGORIES.map((category) => (
              <div key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
                <h2 className="border-b border-line pb-2 font-display text-2xl text-ink">{category}</h2>
                <dl className="mt-4 space-y-4">
                  {GLOSSARY.filter((entry) => entry.category === category).map((entry) => (
                    <div
                      key={entry.slug}
                      id={entry.slug}
                      className="scroll-mt-24 rounded-xl border border-line bg-card p-4 sm:p-5"
                    >
                      <dt className="flex flex-wrap items-baseline gap-2">
                        <span className="text-[14px] font-medium text-ink">{entry.term}</span>
                        {entry.zh && (
                          <span className="font-chinese text-[12px] text-vermillion/80">{entry.zh}</span>
                        )}
                      </dt>
                      <dd className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                        {entry.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-line bg-ink px-5 py-5 text-paper sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-xl">Now put the vocabulary to work.</p>
                <p className="mt-1 text-[12px] text-paper/60">
                  Sample questions, syllabus and the university requirement matrix — all free to
                  browse.
                </p>
              </div>
              <Link
                href="/sample-questions"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12px] font-medium text-paper"
              >
                Try sample questions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
