import type { Metadata } from "next";
import { SITE } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * Social image URL. Defaults to the root `opengraph-image` file, which every
   * page shares. Pass `null` when the route has its own `opengraph-image.tsx`:
   * an explicit image would override that file-based image.
   */
  image?: string | null;
};

/** One place for canonical URLs, OpenGraph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  image,
}: MetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const imageUrl = image === undefined ? "/opengraph-image" : image;
  const images = imageUrl ? [imageUrl] : undefined;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: "en_US",
      ...(images ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.published,
    dateModified: input.modified,
    mainEntityOfPage: `${SITE.url}${input.path}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    inLanguage: "en",
  };
}

export function itemListLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE.url}${item.path}`,
    })),
  };
}
