import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Globe2, Mail, MapPin } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { EMAIL_TEMPLATE_EN, UNIVERSITIES } from "@/lib/universities";

export function generateStaticParams() {
  return UNIVERSITIES.map((university) => ({ slug: university.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const university = UNIVERSITIES.find((item) => item.slug === slug);
  if (!university) return {};
  return pageMetadata({
    title: `${university.name} CSCA requirements — subjects and how to confirm them`,
    description: `${university.name} (${university.nameZh}) CSCA requirements: which subjects applicants usually need, the official baseline, and a template that gets the programme-specific answer in writing.`,
    path: `/universities/${university.slug}`,
    keywords: [
      `${university.name} CSCA`,
      `${university.name} requirements`,
      `${university.nameZh} CSCA`,
    ],
  });
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const university = UNIVERSITIES.find((item) => item.slug === slug);
  if (!university) notFound();

  const faq = [
    {
      q: `What CSCA subjects does ${university.name} require?`,
      a: `Mathematics is compulsory. Most science, engineering and medicine programmes require Physics or Chemistry; humanities, law and business usually do not. Professional Chinese is compulsory for Chinese Government Scholarship (CGS) applicants and Chinese-taught programmes (some universities waive it for non-CGS English-taught degrees). ${university.name} publishes the exact combination per programme, so confirm it with the admissions office.`,
    },
    {
      q: `What CSCA score does ${university.name} need?`,
      a: `${university.name} sets its own minimum per programme and changes it between cycles. Confirm the figure with the international admissions office in writing before you book a sitting.`,
    },
    {
      q: `Does ${university.name} teach in English?`,
      a: `${university.note} Check the specific programme page — Chinese-taught tracks and CGS applicants must sit Professional Chinese, while non-CGS English-taught tracks often waive it (confirm any waiver in writing).`,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: university.name,
          alternateName: university.nameZh,
          url: `https://${university.domain}`,
          address: { "@type": "PostalAddress", addressLocality: university.city, addressCountry: "CN" },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Universities", path: "/universities" },
          { name: university.name, path: `/universities/${university.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-20">
          <Link
            href="/universities"
            className="text-[12px] text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            ← All universities
          </Link>
          <Eyebrow className="mt-4">{university.city} · China</Eyebrow>
          <h1 className="display-lg mt-4 max-w-3xl text-balance">
            {university.name} CSCA requirements.
          </h1>
          <p className="mt-2 text-[14px] text-ink-faint">{university.nameZh}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>
              <MapPin className="h-3 w-3" /> {university.city}
            </Pill>
            <Pill>
              <Globe2 className="h-3 w-3" /> {university.domain}
            </Pill>
          </div>
          <p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">
            {university.note}
          </p>
          <a
            href={`https://${university.domain}`}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-paper px-4 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            Official admissions site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-w-0 space-y-6">
            <div>
              <h2 className="font-display text-xl text-ink">The baseline every applicant meets</h2>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {[
                  ["Mathematics", "Compulsory for every applicant, every programme."],
                  ["Physics or Chemistry", "Required for science, engineering, computing, agriculture and medicine."],
                  ["Professional Chinese", "Compulsory for CGS applicants and Chinese-taught programmes (Humanities or STEM Chinese); confirm any non-CGS English-taught waiver with admissions."],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="flex items-start justify-between gap-3 rounded-lg border border-line bg-card px-3 py-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium text-ink">{title}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-soft">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink">Get it in writing</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                Requirements vary by programme and change between cycles. Send this to{" "}
                {university.name}&apos;s international admissions office and keep the reply.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-line bg-paper-deep p-4 text-[11.5px] leading-relaxed whitespace-pre-wrap text-ink-soft">
                {EMAIL_TEMPLATE_EN}
              </pre>
              <a
                href={`https://${university.domain}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12px] font-medium text-paper"
              >
                <Mail className="h-3.5 w-3.5" /> Find the admissions contact
              </a>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
                Related
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/requirements"
                  className="inline-flex items-center justify-between text-[12.5px] text-ink-soft hover:text-ink"
                >
                  CSCA requirements <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-between text-[12.5px] text-ink-soft hover:text-ink"
                >
                  Subject syllabus <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/guides/csca-subjects-by-major"
                  className="inline-flex items-center justify-between text-[12.5px] text-ink-soft hover:text-ink"
                >
                  Subjects by major <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/practice"
                  className="inline-flex items-center justify-between text-[12.5px] text-ink-soft hover:text-ink"
                >
                  Free practice <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-12">
          <h2 className="font-display text-xl text-ink">Frequently asked</h2>
          <dl className="mt-4 divide-y divide-line/70">
            {faq.map((item) => (
              <div key={item.q} className="py-3">
                <dt className="text-[13px] font-medium text-ink">{item.q}</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
