import Search from "../../components/search/Search";
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

// ✅ Fix 1: Define searchParams as a Promise
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Fix 2: Await searchParams inside generateMetadata
export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams; // 🔹 Await here
  
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";
  const type = typeof resolvedSearchParams?.type === "string" ? resolvedSearchParams.type : "windows";

  const sectionName = type === "mobile" ? "Mobile Tools" : "Windows Tools";

  const pageTitle = query
    ? `Search results for "${query}" - Kalifa Os`
    : `Search ${sectionName} - Kalifa Os`;

  const description = query
    ? `Find download links for "${query}" in Kalifa OS ${sectionName}. Get trusted ${type} bypass tools and software.`
    : `Browse our database of ${sectionName}. Search and download reliable ${type} utilities from Kalifa Os Zaria.`;

  return {
    title: pageTitle,
    description,
    robots: {
      index: false,
      follow: true,
    },
    keywords: [
      "Kalifa OS Search",
      "Find Firmware",
      "Search Bypass Tools",
      query,
      `${type} tools download`
    ],
    openGraph: {
      title: pageTitle,
      description: description,
      url: `https://kalifaos.site/search?query=${query}`,
      siteName: "Kalifa Os",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `Search results for ${query}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: ["/opengraph-image.png"],
    },
  };
}

// ✅ Fix 3: Make component async and await searchParams
export default async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams; // 🔹 Await here
  
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: query ? `Results for ${query}` : 'All Tools',
        }
      ]
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://kalifaos.site'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Search',
          item: `https://kalifaos.site/search?query=${query}`
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="search-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        {/* Pass the query down to Search component if needed, or it can read from useSearchParams() client-side */}
        <Search />
      </div>
    </>
  );
}
