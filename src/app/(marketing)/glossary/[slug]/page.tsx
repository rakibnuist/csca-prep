import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookMarked, Info } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { GLOSSARY } from "@/lib/glossary";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return GLOSSARY.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = GLOSSARY.find((entry) => entry.slug === slug);
  if (!term) return {};
  return pageMetadata({
    title: `${term.term} — CSCA glossary`,
    description: `${term.term}: ${term.definition}`.slice(0, 155),
    path: `/glossary/${term.slug}`,
    keywords: [term.term, `${term.term} meaning`, `${term.term} CSCA`],
  });
}

const WHY: Record<string, string> = {
  "The exam":
    "This term belongs to the exam itself — its structure, delivery or scoring. Getting it wrong usually means misreading a registration or a test-day instruction.",
  Admissions:
    "This term sits in the admissions process — who applies, how requirements are set, and how offers are actually made.",
  Preparation:
    "This term is about preparation — how to study, which subjects to choose, and how the scores are used once you have them.",
};

const PAGES: Record<string, { href: string; label: string }[]> = {
  "The exam": [
    { href: "/csca", label: "The complete CSCA exam guide" },
    { href: "/exam-dates", label: "Exam dates and fees" },
    { href: "/test-day", label: "Test-day rules" },
  ],
  Admissions: [
    { href: "/requirements", label: "Subject requirements" },
    { href: "/universities", label: "Universities directory" },
    { href: "/scholarships", label: "Scholarships" },
  ],
  Preparation: [
    { href: "/syllabus", label: "The CSCA syllabus" },
    { href: "/practice", label: "Free subject practice" },
    { href: "/mocks", label: "Full mock tests" },
  ],
};

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = GLOSSARY.find((entry) => entry.slug === slug);
  if (!term) notFound();

  const index = GLOSSARY.findIndex((entry) => entry.slug === slug);
  const prev = index > 0 ? GLOSSARY[index - 1] : null;
  const next = index < GLOSSARY.length - 1 ? GLOSSARY[index + 1] : null;
  const related = GLOSSARY.filter(
    (entry) => entry.category === term.category && entry.slug !== term.slug,
  ).slice(0, 4);
  const pages = PAGES[term.category] ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: term.term,
          description: term.definition,
          url: `${SITE.url}/glossary/${term.slug}`,
          inDefinedTermSet: `${SITE.url}/glossary`,
          ...(term.zh ? { alternateName: term.zh } : {}),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Glossary", path: "/glossary" },
          { name: term.term, path: `/glossary/${term.slug}` },
        ])}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Link
            href="/glossary"
            className="text-[12px] text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            ← Glossary
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Eyebrow>{term.category}</Eyebrow>
            <Pill>{term.term}</Pill>
          </div>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">{term.term}</h1>
          {term.zh && <p className="mt-2 font-chinese text-[15px] text-vermillion">{term.zh}</p>}
          <p className="lead mt-5 max-w-2xl">{term.definition}</p>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0 space-y-6">
            <div>
              <h2 className="font-display text-xl text-ink">Why it matters</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                {WHY[term.category]}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-card p-4">
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-ink-faint" />
                <p className="text-[12.5px] font-medium text-ink">Related terms</p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/glossary/${entry.slug}`}
                      className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[12px] text-ink-soft transition hover:bg-paper-deep hover:text-ink"
                    >
                      <span className="min-w-0 flex-1">{entry.term}</span>
                      <span className="shrink-0 text-[10.5px] text-ink-faint">{entry.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep p-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-ink-faint" />
                <p className="text-[12.5px] font-medium text-ink">Keep reading</p>
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="inline-flex items-center justify-between text-[12px] text-ink-soft hover:text-ink"
                  >
                    {page.label} <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-[10.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                Category
              </p>
              <p className="mt-1.5 text-[12.5px] text-ink">{term.category}</p>
              <p className="mt-1 text-[11px] text-ink-faint">
                {GLOSSARY.filter((entry) => entry.category === term.category).length} terms in this
                group
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {prev ? (
            <Link
              href={`/glossary/${prev.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {prev.term}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/glossary"
            className="text-[12px] text-ink-soft hover:text-ink"
          >
            All terms
          </Link>
          {next ? (
            <Link
              href={`/glossary/${next.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
            >
              {next.term} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </>
  );
}
