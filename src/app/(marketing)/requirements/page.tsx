import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, FileSearch, Languages, ShieldCheck } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";
import { PAPER_STATS } from "@/lib/paper-stats";
import { RequirementFit } from "@/components/tools/requirement-fit";

export const metadata: Metadata = pageMetadata({
  title: "CSCA requirements — which subjects a major needs",
  description:
    "Which CSCA papers each programme group requires, the language rules, exemptions and how to confirm the exact subjects for any Chinese university before you register.",
  path: "/requirements",
  keywords: [
    "CSCA requirements",
    "CSCA subjects by major",
    "CSCA subject requirements",
    "which CSCA subjects",
    "CSCA exemption",
  ],
});

/**
 * Official baseline (csca.cn/about/examintro):
 *   CGS applicants        — compulsory: Mathematics + Professional Chinese;
 *                           optional: Physics, Chemistry
 *   non-CGS applicants    — compulsory: Mathematics (+ Professional Chinese for
 *                           Chinese-taught programmes); optional: Physics, Chemistry
 * Individual universities narrow this down per programme, which is why the last
 * column tells the reader to confirm.
 */
const MATRIX = [
  { group: "Engineering & technology", subjects: "Maths + Professional Chinese + Physics", note: "Chemistry accepted instead of Physics for materials or chemical engineering at some institutions." },
  { group: "Pure sciences & computer science", subjects: "Maths + Professional Chinese + Physics", note: "CS usually sits with engineering." },
  { group: "Chemistry, pharmacy, materials", subjects: "Maths + Professional Chinese + Chemistry", note: "Physics sometimes accepted as the second elective." },
  { group: "Medicine, dentistry, nursing", subjects: "Maths + Professional Chinese + Chemistry", note: "MBBS may add an interview or a biology check." },
  { group: "Agriculture & life sciences", subjects: "Maths + Professional Chinese + Chemistry or Physics", note: "Rules vary widely — confirm per programme." },
  { group: "Economics, business, finance", subjects: "Maths + Professional Chinese", note: "No science elective, but Mathematics is never waived." },
  { group: "Law, humanities, education, arts", subjects: "Maths + Professional Chinese (Humanities)", note: "STEM Chinese is only for maths/science/engineering applicants." },
];

const FAQ = [
  {
    q: "Is Mathematics always required?",
    a: "Yes. Every undergraduate CSCA applicant sits Mathematics, regardless of programme or teaching language. There is no exemption for it.",
  },
  {
    q: "Do I need Physics and Chemistry?",
    a: "Only if your programme requires them. Science, engineering, agriculture and medicine usually require at least one; engineering tends to expect Physics and medicine tends to expect Chemistry. A few competitive engineering programmes ask for both.",
  },
  {
    q: "Do I need Professional Chinese?",
    a: "CSCA lists it as a compulsory paper for Chinese Government Scholarship applicants, and for Chinese-taught programmes on any scholarship. Some English-taught programmes are waived by the receiving university — that is an institutional exception, not a general rule, so confirm it in writing before you register. Choosing the wrong stream, Humanities versus STEM, is a common and expensive mistake.",
  },
  {
    q: "Is there an HSK exemption?",
    a: "Some universities accept HSK Level 4 or above from Chinese Language majors in place of the Professional Chinese paper. CSCA's own rules do not promise it, so treat it as a per-institution arrangement and confirm with admissions.",
  },
  {
    q: "Who decides my exact subject combination?",
    a: "The university. There is no single national rule, which is why you must confirm with the admissions office for your specific programme before paying the registration fee.",
  },
];

export default function RequirementsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Requirements", path: "/requirements" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>Requirements · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Which CSCA subjects does your programme need?
          </h1>
          <p className="lead mt-5 max-w-2xl">
            The rules follow your <strong className="text-ink">programme</strong>, not the
            university&apos;s reputation. Maths is compulsory for everyone; Physics and Chemistry
            depend on the degree; Professional Chinese is compulsory for CGS applicants and
            Chinese-taught programmes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Maths mandatory</Pill>
            <Pill tone="jade">Science subject optional by major</Pill>
            <Pill>Chinese for CGS &amp; Chinese-taught</Pill>
          </div>
        </div>
      </section>

      <div className="shell pt-10">
        <RequirementFit chineseRequired />
      </div>


      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="min-w-0">
            <h2 className="font-display text-2xl text-ink">Subject rules by programme group</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
              <div className="hidden grid-cols-[1fr_1fr_1.1fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase sm:grid">
                <span>Programme group</span>
                <span>CSCA papers</span>
                <span>Notes</span>
              </div>
              {MATRIX.map((row) => (
                <div
                  key={row.group}
                  className="grid grid-cols-1 gap-1 border-b border-line/60 px-4 py-3 last:border-0 sm:grid-cols-[1fr_1fr_1.1fr] sm:items-center sm:gap-3"
                >
                  <p className="text-[12.5px] font-medium text-ink">{row.group}</p>
                  <p className="text-[12px] font-medium text-vermillion-deep">{row.subjects}</p>
                  <p className="text-[11.5px] leading-relaxed text-ink-soft">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-card p-5">
                <Languages className="h-5 w-5 text-ink-faint" />
                <h3 className="mt-3 font-display text-lg text-ink">The CGS &amp; language rule</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                  CSCA lists Professional Chinese as compulsory for Chinese Government Scholarship
                  (CGS) applicants and for Chinese-taught programmes. Some universities waive it for
                  non-CGS English-taught degrees — confirm in writing before you register.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-card p-5">
                <ShieldCheck className="h-5 w-5 text-ink-faint" />
                <h3 className="mt-3 font-display text-lg text-ink">The exemptions</h3>
                <ul className="mt-1.5 space-y-1 text-[12.5px] text-ink-soft">
                  <li>Non-CGS English-taught degree → often waived (confirm with admissions).</li>
                  <li>Chinese Language major → HSK 4 may replace it.</li>
                  <li>Nothing exempts you from Mathematics.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-gold/30 bg-gold-soft/50 p-5">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-gold-deep uppercase">
                <BadgeCheck className="h-3.5 w-3.5" /> Cost note
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                The CSCA fee is CNY 450 for one subject and CNY 700 for two or more. If a competitive
                programme needs three papers, budget for the higher fee — and for a retake.
              </p>
            </div>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel card-elevate p-5">
              <FileSearch className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 font-display text-xl text-ink">Confirm in five minutes</p>
              <ol className="mt-3 space-y-2.5 text-[12px] text-ink-soft">
                {[
                  "Open the programme page on the university's international admissions site.",
                  "Look for the CSCA section — most list required papers by programme.",
                  "If unpublished, email admissions with your programme name and intake year.",
                  "Write the answer into your application spreadsheet; rules change each cycle.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-2.5">
                    <span className="font-display text-vermillion tabular">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="panel card-elevate p-5">
              <p className="eyebrow">Then prepare it</p>
              <div className="mt-2 space-y-1.5">
                {[
                  ["/app/mocks", "Full-length mock papers"],
                  ["/syllabus", "Syllabus by subject"],
                  ["/app/practice", `Topic drills (${PAPER_STATS.questions.toLocaleString()} questions)`],
                  ["/guides/csca-registration-step-by-step", "Registration guide"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between rounded-md border border-line px-2.5 py-2 text-[11.5px] text-ink-soft transition hover:border-line-strong hover:text-ink"
                  >
                    {label} <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-paper-deep/50 p-4">
              <p className="text-[11px] leading-relaxed text-ink-soft">
                Subject rules are institution-specific and updated each cycle. This page is guidance
                from the official CSCA structure — always get the final word in writing from
                admissions.
              </p>
              <a
                href={OFFICIAL.site}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-indigo hover:underline"
              >
                Official CSCA portal <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow="FAQ"
            title="The questions that decide your papers."
            body="Choosing the wrong subjects is the most expensive CSCA mistake — it costs a retake, not just a fee."
          />
          <div className="min-w-0 space-y-2.5">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-line bg-paper px-4 py-3">
                <summary className="cursor-pointer list-none text-[12.5px] font-medium text-ink">
                  {item.q}
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
            <div className="flex flex-wrap gap-3 pt-2 text-[11.5px]">
              <Link href="/guides/csca-subjects-by-major" className="text-vermillion underline underline-offset-4">
                Deep-dive guide
              </Link>
              <Link href="/scholarships" className="text-vermillion underline underline-offset-4">
                Scholarships
              </Link>
              <Link href="/csca" className="text-vermillion underline underline-offset-4">
                Exam guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
