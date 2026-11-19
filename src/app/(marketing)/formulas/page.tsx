import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Sigma } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { MathText } from "@/components/math-text";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SUBJECTS } from "@/lib/exam";
import { FORMULAS, formulasForSubject } from "@/lib/formulas";

export const metadata: Metadata = pageMetadata({
  title: "CSCA Formula Sheet & Examiner Traps — Math, Physics, Chemistry & Chinese",
  description:
    "High-frequency CSCA formulas, derivations, and common examiner traps mapped to the official 2025 syllabus across Mathematics, Physics, Chemistry, and Professional Chinese.",
  path: "/formulas",
  keywords: [
    "CSCA formula sheet",
    "CSCA math formulas",
    "CSCA physics equations",
    "CSCA chemistry calculations",
    "CSCA examiner traps",
  ],
});

export default function PublicFormulasPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Formula sheet", path: "/formulas" }])} />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Syllabus Reference</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            CSCA formulas, core equations &amp; examiner traps.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            High-yield formulas and language patterns mapped to the official 2025 syllabus — plus
            the recurring traps candidates fall into on exam day.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SUBJECTS.map((sub) => (
              <a key={sub.code} href={`#${sub.code.toLowerCase()}`}>
                <Pill>{sub.shortEn}</Pill>
              </a>
            ))}
            <Pill tone="jade">{FORMULAS.length} formula cards</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.25fr_minmax(0,0.75fr)]">
          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24">
              <p className="eyebrow">Subjects</p>
              <nav className="mt-3 space-y-1.5">
                {SUBJECTS.map((sub) => {
                  const count = formulasForSubject(sub.code).length;
                  return (
                    <a
                      key={sub.code}
                      href={`#${sub.code.toLowerCase()}`}
                      className="flex items-center justify-between py-1 text-[12px] text-ink-soft transition hover:text-vermillion"
                    >
                      <span>{sub.shortEn}</span>
                      <span className="text-[11px] text-ink-faint tabular">{count}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 rounded-xl border border-line bg-card p-4">
                <Sigma className="h-4 w-4 text-vermillion" />
                <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
                  Signed-in students can search these inside{" "}
                  <Link href="/en/learn?view=formulas" className="font-medium text-indigo hover:underline">
                    Learn &amp; Reference
                  </Link>{" "}
                  and launch a 10-question drill from any card.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-12">
            {SUBJECTS.map((subject) => {
              const cards = formulasForSubject(subject.code);
              const lower = subject.code.toLowerCase();
              return (
                <section key={subject.code} id={lower} className="scroll-mt-24">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2.5">
                    <div>
                      <h2 className="font-display text-2xl text-ink">
                        {subject.nameEn}{" "}
                        <span className="font-chinese text-base text-vermillion">
                          {subject.nameZh}
                        </span>
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 text-[11.5px] font-medium">
                      <Link
                        href={`/syllabus/${lower}`}
                        className="text-ink-soft hover:text-ink"
                      >
                        Syllabus →
                      </Link>
                      <Link
                        href={`/practice/${lower}`}
                        className="text-vermillion hover:underline"
                      >
                        Free practice →
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {cards.map((card) => (
                      <article
                        key={card.code}
                        className="flex flex-col justify-between rounded-xl border border-line bg-card p-4 sm:p-5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded bg-paper-deep px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                              {card.topicCode} · {card.unitEn}
                            </span>
                            <span className="font-mono text-[10px] text-ink-faint">
                              {card.code}
                            </span>
                          </div>
                          <h3 className="mt-2 font-display text-lg text-ink">
                            {card.titleEn}
                            <span className="ml-2 font-chinese text-xs font-normal text-ink-faint">
                              {card.titleZh}
                            </span>
                          </h3>

                          <div className="mt-3 overflow-x-auto rounded-lg border border-line bg-paper px-3 py-2 text-[13px] text-ink">
                            <MathText>{card.formula}</MathText>
                          </div>

                          <p className="mt-3 text-[12px] leading-relaxed text-ink-soft">
                            <MathText>{card.summaryEn}</MathText>
                          </p>
                        </div>

                        <div className="mt-3 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold-soft/60 px-3 py-2 text-[11.5px] leading-relaxed text-ink">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                          <div>
                            <span className="font-semibold text-gold-deep">
                              Examiner trap:{" "}
                            </span>
                            <MathText>{card.trapEn}</MathText>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-line bg-ink px-5 py-5 text-paper sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl">Ready to test these formulas under real timing?</p>
                <p className="mt-1 text-[12px] text-paper/65">
                  Sit full 48- or 80-question mocks with worked solutions and automatic error tracking.
                </p>
              </div>
              <Link
                href="/sign-up"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12px] font-medium text-paper"
              >
                Create free account <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
