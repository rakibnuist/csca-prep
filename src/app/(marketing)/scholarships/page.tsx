import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
} from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { BangladeshPartnerBanner } from "@/components/site/bangladesh-partner-banner";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { OFFICIAL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "China scholarships 2027 — CGS, provincial and university",
  description:
    "How the Chinese Government Scholarship works (coverage, stipend, eligibility, two routes), plus provincial, city, Confucius Institute and university scholarships for international undergraduates.",
  path: "/scholarships",
  keywords: [
    "Chinese Government Scholarship",
    "CGS scholarship",
    "study in China scholarship 2027",
    "CSC scholarship coverage",
    "provincial scholarship China",
    "Confucius Institute Scholarship",
  ],
});

const CGS_COVERAGE = [
  { item: "Tuition fees", value: "Fully covered" },
  { item: "Accommodation", value: "Free university dormitory, or a housing subsidy" },
  { item: "Living stipend", value: "¥2,500 / month (undergraduates)" },
  { item: "Medical insurance", value: "¥800 / year" },
];

const ROUTES = [
  {
    type: "Type A — Bilateral Program",
    who: "Apply through the Chinese embassy or the dispatching authority in your country.",
    note: "This is the main undergraduate route. You apply via CGSIS (campuschina.org) using your country's agency number, after securing a pre-admission document from a target university.",
  },
  {
    type: "Type B — Chinese University Program",
    who: "Apply directly to the university.",
    note: "Universities run their own sub-programs (High-Level Graduate, Belt & Road, etc.). Undergraduate applicants usually use Type A; Type B is more common at graduate level.",
  },
];

const PROVINCIAL = [
  { name: "Jiangsu Jasmine Scholarship", region: "Jiangsu", note: "Partial or full tuition; apply via Jiangsu universities." },
  { name: "Shanghai Municipal Government Scholarship", region: "Shanghai", note: "Partial or full tuition; via Shanghai universities." },
  { name: "Beijing Government Scholarship", region: "Beijing", note: "Partial or full tuition; via Beijing universities." },
  { name: "Zhejiang Government Scholarship", region: "Zhejiang", note: "Tuition support at Zhejiang universities." },
  { name: "Hubei Government Scholarship", region: "Hubei", note: "Partial tuition; via Hubei universities." },
  { name: "Guangdong Government Scholarship", region: "Guangdong", note: "Partial tuition; via Guangdong universities." },
];

const FAQ = [
  {
    q: "How much does the Chinese Government Scholarship pay?",
    a: "The full CGS covers tuition, on-campus accommodation (or a subsidy), a monthly stipend — ¥2,500 for undergraduates, ¥3,000 for master's, ¥3,500 for doctoral — and medical insurance of ¥800 a year. It does not usually cover international travel.",
  },
  {
    q: "Do I need a CSCA score to get a CGS scholarship?",
    a: "For undergraduate programmes, yes. CGS undergraduate applicants must register for and sit the CSCA before the application deadline and upload a valid score report. Official CSCA rules make Mathematics and Professional Chinese (Humanities or STEM) compulsory for all CGS applicants regardless of teaching language, plus Physics/Chemistry where your major requires them.",
  },
  {
    q: "What is the difference between Type A and Type B?",
    a: "Type A (Bilateral Program) is applied for through the Chinese embassy or dispatching authority in your country and is the standard undergraduate route. Type B (Chinese University Program) is applied for directly with the university. The agency numbers and deadlines differ.",
  },
  {
    q: "Can I combine scholarships?",
    a: "Usually not the big ones — you cannot hold a full CGS and a full provincial scholarship at the same time. University-level awards and partial support sometimes stack. Always ask the university's scholarship office.",
  },
];

export default function ScholarshipsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Scholarships", path: "/scholarships" }])} />
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
          <Eyebrow>Funding guide · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Scholarships to study in China, from full CGS to tuition waivers.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Most international undergraduates in China study on a scholarship, and the{" "}
            <strong className="text-ink">Chinese Government Scholarship</strong> is the biggest of
            them. Here is what it pays, who qualifies, and where the provincial and university awards
            fit.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Full coverage available</Pill>
            <Pill tone="jade">CSCA required for undergrads</Pill>
            <Pill>Two application routes</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <article className="prose-edu min-w-0 max-w-none">
            <h2>The Chinese Government Scholarship (CGS)</h2>
            <p>
              Run by the China Scholarship Council (CSC), the CGS is China&apos;s flagship funding
              programme for international students. The full award is one of the most complete
              scholarships available anywhere, which is why competition for it is real.
            </p>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line bg-card">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-4 py-2.5">What it covers</th>
                    <th className="px-4 py-2.5">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {CGS_COVERAGE.map((row) => (
                    <tr key={row.item}>
                      <td className="px-4 py-2.5 font-medium text-ink">{row.item}</td>
                      <td className="px-4 py-2.5 text-ink-soft">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-ink-faint">
              Figures are the published CGS rates; a specific programme may state a different
              arrangement, so read the award letter carefully.
            </p>

            <h2>The two routes</h2>
            <div className="not-prose my-6 space-y-3">
              {ROUTES.map((route) => (
                <div key={route.type} className="rounded-xl border border-line bg-card p-4">
                  <p className="text-[13px] font-medium text-ink">{route.type}</p>
                  <p className="mt-1 text-[12px] text-ink-soft">{route.who}</p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-faint">{route.note}</p>
                </div>
              ))}
            </div>

            <h2>Eligibility, in one breath</h2>
            <ul>
              <li>Non-Chinese citizen, in good physical and mental health.</li>
              <li>
                Undergraduate: high-school graduate under age 25. Master&apos;s: bachelor&apos;s holder
                under 35. Doctoral: master&apos;s holder under 40.
              </li>
              <li>
                Chinese-taught undergraduate: HSK Level 3 (Chinese-language majors are exempt).
                Master&apos;s and doctoral: HSK Level 4.
              </li>
              <li>
                English-taught programmes: IELTS/TOEFL as the university requires, instead of HSK.
              </li>
              <li>
                <strong>Undergraduates must sit the CSCA</strong> and upload a valid score report —
                this is the new requirement and it is not optional.
              </li>
            </ul>

            <h2>Documents you will gather</h2>
            <ul>
              <li>Completed CGS application form (from campuschina.org).</li>
              <li>Passport information page (12+ months validity).</li>
              <li>Notarised diploma and transcripts, translated into Chinese or English.</li>
              <li>HSK or IELTS/TOEFL certificate.</li>
              <li>CSCA score report (undergraduates).</li>
              <li>Pre-admission document from a target university.</li>
              <li>Study plan (200+ words for undergraduates).</li>
              <li>Foreigner Physical Examination Form and a non-criminal record (for study over 6 months).</li>
              <li>Two recommendation letters (graduate applicants).</li>
            </ul>

            <h2>Provincial and city scholarships</h2>
            <p>
              Beyond the CGS, many provinces and municipalities fund international students through
              their own awards, usually administered by the university. They typically cover partial
              or full tuition and sometimes a small stipend — and they are often{" "}
              <em>less competitive than CGS</em> because fewer applicants know they exist.
            </p>
            <div className="not-prose my-6 overflow-hidden rounded-xl border border-line bg-card">
              <div className="hidden grid-cols-[1.4fr_0.6fr_1.2fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase sm:grid">
                <span>Scholarship</span>
                <span>Region</span>
                <span>Typical coverage</span>
              </div>
              {PROVINCIAL.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-1 gap-1 border-b border-line/60 px-4 py-2.5 last:border-0 sm:grid-cols-[1.4fr_0.6fr_1.2fr] sm:items-center sm:gap-3"
                >
                  <p className="text-[12.5px] font-medium text-ink">{row.name}</p>
                  <p className="text-[11.5px] text-ink-soft">{row.region}</p>
                  <p className="text-[11.5px] text-ink-soft">{row.note}</p>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] text-ink-faint">
              Names and coverage change between cycles — confirm with the university&apos;s
              international office before relying on any single award.
            </p>

            <h2>Other funding worth knowing</h2>
            <ul>
              <li>
                <strong>Confucius Institute / International Chinese Language Teachers Scholarship:</strong>{" "}
                funds Chinese-language study and Chinese-teaching degrees, based on HSK/HSKK scores.
                It is a language scholarship, not an undergraduate-degree CSCA route.
              </li>
              <li>
                <strong>University scholarships:</strong> many universities offer their own partial or
                full tuition waivers, first-year merit awards, or monthly allowances. Apply together
                with admission.
              </li>
              <li>
                <strong>MOFCOM (China Aid) scholarship:</strong> for citizens of developing countries
                in designated programmes, via the China Scholarship Council.
              </li>
              <li>
                <strong>Bilateral and exchange agreements:</strong> your home government or a partner
                university may fund a term or a full degree. Check with your own institution first.
              </li>
            </ul>

            <h2>Timeline that repeats every year</h2>
            <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { when: "Oct – Nov", what: "Shortlist universities and majors; check CSCA subject requirements." },
                { when: "Nov – Feb", what: "CGS applications open (embassy deadlines vary, often Dec–Feb)." },
                { when: "Before deadline", what: "Sit the CSCA and secure a pre-admission document." },
                { when: "Jul – Aug", what: "Results announced; prepare visa (JW202) and travel." },
              ].map((step) => (
                <div key={step.when} className="rounded-xl border border-line bg-card p-4">
                  <p className="text-[10px] font-medium tracking-[0.12em] text-vermillion uppercase">
                    {step.when}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{step.what}</p>
                </div>
              ))}
            </div>

            <p>
              Apply early, secure the pre-admission document first, and treat the CSCA as part of the
              scholarship application — a strong score is the cheapest way to stand out in a
              competitive shortlist.
            </p>
            <div className="not-prose">
              <BangladeshPartnerBanner className="mt-8 mb-0" />
            </div>
          </article>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel card-elevate p-5">
              <Banknote className="h-4 w-4 text-ink-faint" />
              <p className="mt-2 font-display text-3xl text-ink">¥2,500<span className="text-base text-ink-faint">/mo</span></p>
              <p className="text-[11.5px] text-ink-soft">CGS undergraduate stipend, on top of free tuition and housing.</p>
            </div>

            <div className="panel card-elevate p-5">
              <p className="eyebrow">CSCA links to funding</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                Since the 2026/27 cycle, undergraduate CGS applicants must submit a CSCA score
                (Mathematics and Professional Chinese are compulsory for CGS applicants; Physics and
                Chemistry depend on your major).
              </p>
              <Link
                href="/requirements"
                className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-indigo hover:underline"
              >
                Which papers you need <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="panel card-elevate p-5">
              <p className="eyebrow">Official sources</p>
              <div className="mt-2 space-y-1.5">
                {[
                  [OFFICIAL.campusChina, "Campus China — CGS applications"],
                  [OFFICIAL.csc, "China Scholarship Council"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-8 items-center justify-between py-1 text-[11.5px] text-ink-soft hover:text-indigo"
                  >
                    {label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-ink p-5 text-paper">
              <p className="font-display text-lg">Fund the future. First, earn the score.</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-paper/60">
                One full paper tells you where you stand before you spend a week on applications.
              </p>
              <Link
                href="/app/mocks"
                className="mt-3 inline-flex h-9 items-center rounded-lg bg-vermillion px-3.5 text-[12px] font-medium text-paper"
              >
                Take a free mock
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-card/60 py-14">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow="FAQ"
            title="Scholarship questions, answered."
            body="If yours is not here, the fastest answer usually comes from the university's scholarship office."
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
          </div>
        </div>
      </section>
    </>
  );
}
