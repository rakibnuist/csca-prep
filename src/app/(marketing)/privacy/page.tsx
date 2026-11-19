import type { Metadata } from "next";
import { Eyebrow } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { CONTENT_UPDATED } from "@/lib/content-dates";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What CSCA Master collects, why, how long it is kept, and the controls you have — written in plain language, no dark patterns.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "An account needs a name, email and a password hash. Sitting a mock stores the answers you give and the score, so you can review them later. Nothing else is required to practise: the free practice pages run entirely in your browser and store nothing.",
  },
  {
    title: "Why we collect it",
    body: "To sign you in, save your practice progress, produce your results and reports, and keep the leaderboard working. We do not sell data, and we do not use your answers for advertising.",
  },
  {
    title: "The leaderboard is opt-in",
    body: "Your name appears on the results leaderboard only if you turn that on from the Leaderboard page. Otherwise you appear under a stable anonymous handle — your rank is still shown to you.",
  },
  {
    title: "Cookies",
    body: "We use a session cookie to keep you signed in. Analytics, if enabled, are aggregate and do not follow you across other sites.",
  },
  {
    title: "How long we keep it",
    body: "Attempts and review history are kept while your account is open so spaced review can work. Ask us to delete your account and the associated attempts and review items are removed.",
  },
  {
    title: "Your controls",
    body: "You can change your teaching track and language in Settings, export or delete your data by emailing us, and opt out of the leaderboard at any time.",
  },
  {
    title: "Contact",
    body: `Questions about privacy go to ${SITE.email}. We answer content and data requests within a few working days.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Privacy", path: "/privacy" }])} />
      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Eyebrow>Legal · updated {CONTENT_UPDATED}</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">Privacy policy.</h1>
          <p className="lead mt-5 max-w-2xl">
            Plain language, no dark patterns. Here is what we collect, why, and how to get it
            removed.
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
