import type { Metadata } from "next";
import { Eyebrow } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { CONTENT_UPDATED } from "@/lib/content-dates";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms that apply to CSCA Master: what the platform is, what it is not, account rules, content ownership, and how scores shown here relate to the official exam.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "What this platform is",
    body: "CSCA Master is an independent study tool for the China Scholastic Competency Assessment. It provides practice questions, full-length mock papers, explanations and planning tools. It is not the official exam and does not administer, register for, or report scores for it.",
  },
  {
    title: "What it is not",
    body: "We are not affiliated with, endorsed by, or sponsored by the China Scholarship Council, csca.cn, or China's Ministry of Education. Registration windows, fees and official results are handled only on csca.cn. Always confirm requirements with the university you are applying to.",
  },
  {
    title: "Accounts",
    body: "One account per person. Keep your password private; you are responsible for activity under your account. New accounts verify their email on sign-up, and accounts may be paused or suspended if misuse is detected.",
  },
  {
    title: "Your teaching track",
    body: "Your track (English-taught or Chinese-taught) is chosen at sign-up and can be changed only in Settings. Practice, mocks and results are scoped to that track, so switching it changes which subjects you see.",
  },
  {
    title: "Content and ownership",
    body: "Our questions, explanations, papers and interface are original work unless explicitly labelled as a transcription of a public paper. You may use them for personal study. You may not resell, scrape or redistribute them.",
  },
  {
    title: "Scores shown here",
    body: "Mock scores, percentiles and predicted bands are estimates from the questions on this platform. They are not official CSCA results and should not be treated as a guarantee of admission or of an official score.",
  },
  {
    title: "Acceptable use",
    body: "Do not attempt to break authentication, scrape the bank at scale, or use the platform to cheat on an official sitting. The official test client has its own rules; ours is a simulation for practice.",
  },
  {
    title: "Changes",
    body: "These terms and the content may change as the exam and our platform evolve. Material changes are noted on the changelog page.",
  },
  {
    title: "Contact",
    body: `Questions about these terms go to ${SITE.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Terms", path: "/terms" }])} />
      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Legal · updated {CONTENT_UPDATED}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">Terms of use.</h1>
          <p className="lead mt-5 max-w-2xl">
            What this platform is, what it is not, and the rules that keep it useful for everyone.
          </p>
        </div>
      </section>

      <section className="shell py-12">
        <div className="max-w-2xl space-y-7">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg text-ink">{section.title}</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
