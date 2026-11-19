import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Building2, Check, Mail, ShieldCheck, Target } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { FAQ_TOTAL } from "@/lib/faq";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { EMAIL_TEMPLATE_EN, EMAIL_TEMPLATE_ZH, UNIVERSITIES } from "@/lib/universities";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CSCA requirements by university — how to ask",
  description:
    "Universities set their own CSCA subject combinations and minimums. What the official rule does fix, how to check any Chinese university's requirement, and a copy-paste email that gets a written answer.",
  path: "/csca/universities",
  keywords: [
    "CSCA university requirements",
    "CSCA requirements Peking University",
    "CSCA requirements Tsinghua",
    "CSCA score requirement university",
    "does my university need CSCA",
  ],
});

const FAQ = [
  {
    q: "Does every Chinese university require the CSCA?",
    a: "No. CSCA is required where the receiving university requires it, and for Chinese Government Scholarship applicants. Recognition is broad — 300+ institutions accept the score — but each one decides which subjects it wants and what minimum it will accept.",
  },
  {
    q: "Where do I find a specific university's CSCA requirement?",
    a: "The university's own international-admissions pages (usually under International Students / 留学生招生), or a written reply from its admissions office. Third-party lists — including ours — cannot see the internal cut-offs, and they change between cycles.",
  },
  {
    q: "Why doesn't this page list minimum scores?",
    a: "Because they are not public in most cases, and inventing them would be worse than useless: a candidate can plan a whole cycle around a number a prep site made up. The page gives the official baseline, the institution's own domain, and a message that gets the answer in writing.",
  },
  {
    q: "What if the university doesn't reply?",
    a: "Send the same message to the school or faculty international office rather than the central one, ask your embassy's education section, or check the programme's page on CampusChina, which lists participating institutions and their scholarship programmes.",
  },
  {
    q: "Does a higher CSCA score compensate for the wrong subjects?",
    a: "No. Each subject is reported separately, so a missing required paper is visible regardless of how strong the others are. Sitting the right combination matters more than lifting one score.",
  },
];

export default function UniversitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "CSCA guide", path: "/csca" }, { name: "Universities", path: "/csca/universities" }])} />
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
          <Eyebrow>Universities · verified November 2026</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Every university sets its own CSCA requirement. Here is how to get yours in writing.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            The exam is standardised; the requirement is not. What CSCA fixes — the five papers, the
            lengths, the 0–100 scale — is below. What each institution wants is decided by that
            institution, and the only reliable source is a written reply from its admissions office.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">No invented cut-offs</Pill>
            <Pill>22 institutions mapped</Pill>
            <Pill tone="jade">Copy-paste email included</Pill>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
        <article className="prose-edu min-w-0 max-w-none">
          <section id="official">
            <h2>What CSCA actually fixes</h2>
            <ul>
              <li>Mathematics is compulsory for every applicant.</li>
              <li>
                Professional Chinese (Humanities or STEM) is compulsory for Chinese Government
                Scholarship applicants and for Chinese-taught programmes; some universities waive it
                for non-CGS English-taught degrees (confirm in writing).
              </li>
              <li>Physics and Chemistry are electives in the official structure — programme-dependent in practice.</li>
              <li>There is no national pass mark; each institution sets its own minimum.</li>
            </ul>
            <p className="not-prose rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
              <strong className="text-ink">The gap that catches people:</strong> the structure is
              official, the requirement is institutional. A page that tells you &ldquo;university X
              needs 75&rdquo; without a source is guessing, and the guess can cost a cycle.
            </p>
          </section>

          <section id="matrix">
            <h2>Which papers each programme group usually expects</h2>
            <p>
              Use this as the question to ask, not as the answer. It reflects the official subject
              structure plus what international offices most commonly state.
            </p>
            <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                    <th className="px-3 py-2.5">Programme group</th>
                    <th className="px-3 py-2.5">Usually required</th>
                    <th className="px-3 py-2.5">Usually optional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-card">
                  {[
                    ["Engineering & technology", "Maths + Professional Chinese + Physics", "Chemistry (materials, chemical engineering)"],
                    ["Pure sciences & computer science", "Maths + Professional Chinese + Physics", "Chemistry"],
                    ["Chemistry, pharmacy, materials", "Maths + Professional Chinese + Chemistry", "Physics"],
                    ["Medicine, dentistry, nursing", "Maths + Professional Chinese + Chemistry", "Physics; some add an interview"],
                    ["Agriculture & life sciences", "Maths + Professional Chinese + one science", "Either Physics or Chemistry"],
                    ["Economics, business, finance", "Maths + Professional Chinese", "—"],
                    ["Law, humanities, education, arts", "Maths + Professional Chinese (Humanities)", "—"],
                  ].map(([group, required, optional]) => (
                    <tr key={group}>
                      <td className="px-3 py-3 font-medium text-ink">{group}</td>
                      <td className="px-3 py-3 text-ink-soft">{required}</td>
                      <td className="px-3 py-3 text-ink-soft">{optional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="check">
            <h2>How to check one university</h2>
            <ol>
              <li>
                <strong>Open the international-admissions site</strong> — not the university homepage.
                Look for 留学生招生 / International Students / Admissions.
              </li>
              <li>
                <strong>Find the programme page, not the university page.</strong> Requirements are set
                per programme and per teaching language.
              </li>
              <li>
                <strong>Look for the words CSCA / 学业水平测试.</strong> If the page predates the CSCA
                cycle, ask directly instead of assuming.
              </li>
              <li>
                <strong>Get the answer in writing</strong> using the template below, and keep the reply
                — it is your defence if the requirement changes.
              </li>
            </ol>
          </section>

          <section id="template">
            <h2>The email that gets a usable answer</h2>
            <p>
              Vague questions get vague answers. Ask for the subject list, the Professional Chinese
              waiver, the minimum (if published) and the deadline — four numbered points, so a busy
              officer can reply line by line.
            </p>
            <div className="not-prose my-5 grid grid-cols-1 gap-4">
              <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-card">
                <p className="border-b border-line bg-paper-deep/60 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  English
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-3 font-sans text-[11.5px] leading-relaxed text-ink-soft">
                  {EMAIL_TEMPLATE_EN}
                </pre>
              </div>
              <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-card">
                <p className="border-b border-line bg-paper-deep/60 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  中文
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-3 font-sans text-[11.5px] leading-relaxed text-ink-soft">
                  {EMAIL_TEMPLATE_ZH}
                </pre>
              </div>
            </div>
          </section>

          <section id="list">
            <h2>Institutions applicants ask about</h2>
            <p>
              Twenty-two universities that come up most in applications and search. Each links to the
              institution&apos;s own domain — start at its international office. Nothing here is a
              ranking, and no requirement is implied by a listing.
            </p>
            <div className="not-prose my-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {UNIVERSITIES.map((university) => (
                <div key={university.slug} className="rounded-xl border border-line bg-card px-3.5 py-3">
                  <p className="text-[12.5px] font-medium text-ink">
                    {university.name}
                    <span className="ml-1.5 font-chinese text-[11px] font-normal text-ink-faint">
                      {university.nameZh}
                    </span>
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {university.city} ·{" "}
                    <a
                      href={`https://www.${university.domain}`}
                      target="_blank"
                      rel="noreferrer noopener nofollow"
                      className="underline decoration-line-strong underline-offset-2 hover:text-ink"
                    >
                      {university.domain}
                    </a>
                  </p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{university.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq">
            <h2>Requirement questions</h2>
            <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {FAQ.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12.5px] font-medium text-ink">
                    {item.q}
                    <span className="text-ink-faint transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
            Sources: csca.cn exam introduction and candidate notices; CampusChina participating-institution
            list; each university&apos;s own domain. {SITE.name} is independent, has no affiliation with
            any listed university, and does not publish requirements it cannot verify.
          </p>
        </article>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Target className="h-3.5 w-3.5 text-ink-faint" /> Before you register
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Programme name confirmed</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Subject list in writing</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Language of each paper confirmed</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Score deadline known</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-jade" /> Retake window fits the intake</li>
            </ul>
          </div>
          <div className="panel p-5">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Mail className="h-3.5 w-3.5 text-ink-faint" /> Related
            </p>
            <ul className="mt-2 space-y-1.5 text-[11.5px]">
              {[
                ["/requirements", "Subject matrix by programme group"],
                ["/csca/faq", `${FAQ_TOTAL} CSCA answers`],
                ["/csca/passing-score", "Score bands and validity"],
                ["/exam-dates", "Sittings and registration windows"],
                ["/app/mocks", "Practise the papers you need"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-ink-soft hover:text-vermillion">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-jade/25 bg-jade-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Our rule
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              We publish what CSCA publishes, link to what universities publish, and never fill the gap
              with a number we made up.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper-deep/40 p-4">
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
              <AlertTriangle className="h-3.5 w-3.5 text-ink-faint" /> Changed your mind?
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              Registration details lock once the Admission Ticket is generated — no subject or date
              changes, no withdrawals.
            </p>
            <Link href="/csca/test-centres" className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline">
              Format and centre rules <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>

      <section className="border-t border-line">
        <div className="shell py-10">
          <SectionHead
            eyebrow="Then practise the right papers"
            title="Sit the combination your programme expects"
            body="Mathematics in 60 minutes, Professional Chinese in 90, science electives in 60 — the same clock as the real sitting."
            action={
              <Link
                href="/app/mocks"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
              >
                <Building2 className="h-3.5 w-3.5" /> Open the paper library
              </Link>
            }
          />
          <p className="mt-4 text-[11px] text-ink-faint">
            Official institution list: <a href={OFFICIAL.campusChina} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:text-ink">CampusChina</a>.
          </p>
        </div>
      </section>
    </>
  );
}
