import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock3, Target } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { getProgramme, PROGRAMMES } from "@/lib/programmes";
import { SUBJECTS } from "@/lib/exam";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PROGRAMMES.map((programme) => ({ programme: programme.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programme: string }>;
}): Promise<Metadata> {
  const { programme: slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};
  return pageMetadata({
    title: `CSCA for ${programme.shortName ?? programme.name} — which papers to sit`,
    description: `${programme.name} applicants: which CSCA papers the programme usually expects (${programme.combination}), why, what the paper tests, and where the requirement is set by the university rather than by CSCA.`,
    path: `/csca/programmes/${programme.slug}`,
    image: null,
    keywords: [
      `CSCA for ${programme.name}`,
      `CSCA ${programme.name} requirements`,
      `CSCA ${programme.nameZh}`,
      `CSCA subjects ${programme.name}`,
    ],
  });
}

export default async function ProgrammePage({ params }: { params: Promise<{ programme: string }> }) {
  const { programme: slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  const subjects = SUBJECTS.filter((subject) =>
    programme.chineseStream === "either" ? true : subject.code !== (programme.chineseStream === "stem" ? "CH_HUM" : "CH_SCI"),
  );

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Programmes", path: "/csca/programmes" }, { name: programme.name, path: `/csca/programmes/${programme.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: `CSCA preparation for ${programme.name}`,
          description: `${programme.name} applicants: which CSCA papers the programme usually expects (${programme.combination}), the official paper structure, and where the requirement is set by the university.`,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          educationalCredentialAwarded: "CSCA score report (externally issued by the China Scholarship Council)",
          programPrerequisites: "Completed secondary education; non-Chinese citizenship for CSCA eligibility",
          occupationalCategory: programme.group,
          inLanguage: "en",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: programme.faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Link href="/csca/programmes" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All programmes
          </Link>
          <Eyebrow>{programme.group} · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA for {programme.name}: the papers this programme expects.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            <strong className="text-ink">{programme.combination}.</strong> {programme.rationale}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">{programme.nameZh}</Pill>
            <Pill>Mathematics compulsory</Pill>
            <Pill tone="jade">Institution sets the minimum</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="papers">
            <h2>The papers, and why these</h2>
            <p>{programme.academic}</p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Paper</th>
                    <th className="px-3 py-2.5">Questions</th>
                    <th className="px-3 py-2.5">Time</th>
                    <th className="px-3 py-2.5">Status for this programme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {subjects.map((subject) => {
                    const expected =
                      subject.code === "MATH" ||
                      (subject.code === "PHYS" && programme.electives.includes("PHYS")) ||
                      (subject.code === "CHEM" && programme.electives.includes("CHEM")) ||
                      subject.code.startsWith("CH_");
                    return (
                      <tr key={subject.code}>
                        <td className="px-3 py-2.5 text-ink">
                          {subject.nameEn}
                          <span className="ml-1.5 font-chinese text-[11px] text-ink-faint">{subject.nameZh}</span>
                        </td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{subject.questionCount}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{subject.durationMin} min</td>
                        <td className="px-3 py-2.5 text-ink-soft">
                          {subject.code === "MATH"
                            ? "Compulsory"
                            : subject.code.startsWith("CH_")
                              ? "Required if Chinese-taught (or CGS)"
                              : expected
                                ? "Expected elective"
                                : "Optional"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p>
              The structure above is the official one. What is <em>not</em> official is any specific
              minimum for this programme — see below.
            </p>
          </section>

          <section id="uncertainty">
            <h2>Where the requirement is not fixed</h2>
            <p>{programme.uncertainty}</p>
            <p className="not-prose rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <strong className="text-ink">What to do:</strong> send the faculty four numbered questions —
              subjects, Professional Chinese waiver, published minimum, deadline. A template you can copy
              is on{" "}
              <Link href="/csca/universities" className="font-medium text-vermillion underline underline-offset-2">
                the university requirements page
              </Link>
              .
            </p>
          </section>

          <section id="priorities">
            <h2>Where to spend the preparation time</h2>
            <ol>
              {programme.priorities.map((priority) => (
                <li key={priority}>{priority}</li>
              ))}
            </ol>
            <p>
              The paper does not change because of your programme, so the target is the same for every
              candidate: 48 questions in 60 minutes, or 80 in 90 for Professional Chinese. What changes
              is which topics you can afford to be slow on.
            </p>
          </section>

          <section id="next">
            <h2>Do this next</h2>
            <div className="not-prose grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                ["/app/mocks", "Sit a full paper", "48/60 or 80/90, official clock"],
                ["/csca/passing-score", "Understand the scale", "How 0–100 works, no pass mark"],
                ["/csca/universities", "Ask your university", "Copy-paste email in EN and ZH"],
                ["/exam-dates", "Pick a sitting", "Six sittings, two days each"],
              ].map(([href, title, body]) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-xl border border-line bg-card px-4 py-3 transition hover:border-vermillion/40"
                >
                  <p className="flex items-center justify-between gap-2 text-[12.5px] font-medium text-ink">
                    <span className="min-w-0 flex-1">{title}</span>
                    <ArrowRight className="h-3 w-3 shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-vermillion" />
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">{body}</p>
                </Link>
              ))}
            </div>
          </section>

          <section id="faq">
            <h2>{programme.name} questions</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {programme.faqs.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <span className="shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn (exam introduction, subject structure), CSC 2025 syllabi, CSCA Test Rules.
            {SITE.name} is independent; programme requirements are set by each university and must be
            confirmed with its admissions office.
          </p>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink-faint" /> Pace targets
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <li>Maths · 48 questions in 60 min = 75 s each</li>
              <li>Physics / Chemistry · 75 s each</li>
              <li>Professional Chinese · 80 in 90 min = 67.5 s each</li>
            </ul>
          </div>
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Target className="h-3.5 w-3.5 text-ink-faint" /> Other programmes
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {PROGRAMMES.filter((item) => item.slug !== programme.slug).slice(0, 7).map((item) => (
                <li key={item.slug}>
                  <Link href={`/csca/programmes/${item.slug}`} className="text-ink-soft hover:text-vermillion">
                    CSCA for {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <Check className="h-3.5 w-3.5 text-jade" /> Checked against
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              csca.cn subject structure and the 2025 CSC syllabi. No score minimum is quoted because
              none is published.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper-deep/40 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <AlertTriangle className="h-3.5 w-3.5 text-ink-faint" /> Careful
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              Registration locks once the Admission Ticket is generated — wrong subjects cannot be
              changed or refunded.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
