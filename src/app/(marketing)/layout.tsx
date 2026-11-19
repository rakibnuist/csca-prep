import { Navbar } from "@/components/site/navbar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/jsonld";
import { SITE } from "@/lib/site";

const ORGANISATION_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      description: SITE.description,
      email: SITE.email,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#app`,
      name: SITE.name,
      url: `${SITE.url}/pricing`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "CNY",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "99",
          priceCurrency: "CNY",
          description:
            "Unlimited mock retakes, timed official papers, weak-topic adaptive study plan, full attempt history and priority support for one admission cycle.",
        },
      ],
    },
  ],
};

/**
 * Marketing pages are fully static so they can be cached at the edge.
 * The navbar resolves the login state on the client (a small island), which
 * keeps these routes cacheable while still showing the right CTA.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={ORGANISATION_JSONLD} />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
