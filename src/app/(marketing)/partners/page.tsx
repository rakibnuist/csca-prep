import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, FileText, Globe2, Mail, ShieldCheck } from "lucide-react";
import { Eyebrow, Pill, SectionHead } from "@/components/site/section";
import { BangladeshPartnerBanner } from "@/components/site/bangladesh-partner-banner";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { PAPER_STATS } from "@/lib/paper-stats";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Partner with CSCA Master — free mocks for universities",
  description:
    "University international offices, scholarship agencies and study-abroad media can link applicants to a free CSCA starter library: 25 full-length mock papers, 21 official and review papers in Study mode, 54 concept lessons and all topic drills.",
  path: "/partners",
  keywords: [
    "CSCA partner",
    "CSCA free mock tests for universities",
    "CSCA resources for agencies",
    "CSCA press",
  ],
});

const OFFER = [
  {
    icon: FileText,
    title: "Substantial free tier, zero lesson paywall",
    body: "All 54 concept lessons, every topic drill, 25 full-length mock papers (5 per subject, two attempts each), and Study mode on all 21 official & review papers are free forever. Pro only adds unlimited timed attempts across practice sets 05–30 and timed official sittings.",
  },
  {
    icon: Globe2,
    title: "Bilingual and exam-faithful",
    body: "Maths, Physics and Chemistry in English and Chinese; both Professional Chinese papers at the true 80/90 length with all six official item types.",
  },
  {
    icon: ShieldCheck,
    title: "Sourced, dated, and honest about the gaps",
    body: "Every exam fact traces to csca.cn, a CSC-syllabus PDF or the official Test Rules. Modelled percentiles are labelled as models; no invented cut-offs, no fake centre lists.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Partners", path: "/partners" }])} />

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Eyebrow>For institutions and agencies</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            Give your applicants a free, exam-faithful CSCA mock library.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            If you advise students applying to China, the most useful thing you can send them is a
            paper that behaves like the real exam. Ours are free to use, honest about what is official,
            and safe to link from any admissions page.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="red">Free lessons, drills & 25 mocks</Pill>
            <Pill>No affiliate scheme</Pill>
            <Pill tone="jade">Sources published on every page</Pill>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <BangladeshPartnerBanner className="mt-0 mb-10" />
        <SectionHead eyebrow="What we offer" title="A resource, not a funnel" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {OFFER.map((item) => (
            <div key={item.title} className="panel min-w-0 p-5">
              <item.icon className="h-4 w-4 text-vermillion" />
              <p className="mt-2 text-[12.5px] font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/40">
        <div className="shell grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHead eyebrow="For university offices" title="What to link, and where it fits" />
            <ul className="mt-4 space-y-2">
              {[
                ["Free mock test", "/free-exam", "A 10-question sample a prospective applicant can finish in five minutes"],
                ["Paper library", "/app/mocks", "Full-length papers under the official clock, free account"],
                ["Exam guide", "/csca", "Format, timetable, fees and the rules that decide eligibility"],
                ["Test-day rules", "/test-day", "Equipment, room and check-in so nobody loses a sitting to a webcam"],
                ["Score guide", "/csca/passing-score", "How 0–100 works, and why there is no pass mark"],
              ].map(([label, href, why]) => (
                <li key={href} className="rounded-xl border border-line bg-card px-3.5 py-3">
                  <p className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-ink">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-jade" />
                    <span>{label}</span>
                    <Link href={href} className="ml-auto text-[11px] font-normal text-vermillion hover:underline">
                      {href}
                    </Link>
                  </p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{why}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <SectionHead eyebrow="For media" title="The story, in facts" />
            <div className="mt-4 space-y-3">
              {[
                "We reproduced the CSCA Test Client sequence — system check, Integrity Commitment, full-screen start, left palette with green answered numbers, no early submission — from the official Device & Environment document.",
                `${PAPER_STATS.questions.toLocaleString()} questions across five papers, with both Professional Chinese papers at the true 80 questions in 90 minutes.`,
                "Every exam claim is dated and sourced; modelled percentiles are labelled as models.",
                "Independent: not affiliated with the China Scholarship Council and not an exam administrator.",
              ].map((fact) => (
                <p key={fact} className="flex gap-2 rounded-xl border border-line bg-card px-3.5 py-3 text-[12px] leading-relaxed text-ink-soft">
                  <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
                  <span className="min-w-0 flex-1">{fact}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-line bg-card p-4">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <Mail className="h-3.5 w-3.5 text-ink-faint" /> Contact
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                Partnerships and press: <a href={`mailto:${SITE.email}`} className="font-medium text-vermillion hover:underline">{SITE.email}</a>
                . Content corrections get priority — if an explanation is wrong, tell us and we will fix it before the next sitting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12">
        <div className="rounded-2xl border border-line bg-ink px-6 py-7 text-paper">
          <p className="font-display text-2xl">What we ask in return</p>
          <p className="mt-1.5 max-w-2xl text-[12.5px] text-paper/65">
            Nothing commercial. If the resource helps your applicants, link it where students actually
            look — the international-admissions page, the pre-departure pack, the scholarship FAQ. We
            do not pay for links and we do not run an affiliate scheme.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/free-exam" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-vermillion px-4 text-[12.5px] font-medium text-paper">
              See the free mock <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/about" className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[12.5px] font-medium text-paper">
              How the bank is sourced
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
