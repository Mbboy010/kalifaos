import Search from "../../components/search/Search";
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// ✅ Dynamic Metadata Generator
export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const query = typeof searchParams?.query === "string" ? searchParams.query : "";
  const type = typeof searchParams?.type === "string" ? searchParams.type : "windows";

  const sectionName = type === "mobile" ? "Mobile Tools" : "Windows Tools";

  // If a user searches, we want a specific title. If just browsing, a generic one.
  const pageTitle = query
    ? `Search results for "${query}" - Kalifa Os`
    : `Search ${sectionName} - Kalifa Os`;

  const description = query
    ? `Find download links for "${query}" in Kalifa OS ${sectionName}. Get trusted ${type} bypass tools and software.`
    : `Browse our database of ${sectionName}. Search and download reliable ${type} utilities from Kalifa Os Zaria.`;

  return {
    title: pageTitle,
    description,
    // ✅ Preventing "Search within Search" penalties
    robots: {
      index: false, // Don't show this search page in Google results
      follow: true, // BUT do follow the links to the actual tool pages
    },
    keywords: [
      "Kalifa OS Search",
      "Find Firmware",
      "Search Bypass Tools",
      query, // Dynamic keyword based on what they searched
      `${type} tools download`
    ],
    // ✅ Dynamic Social Sharing (looks great on WhatsApp/Facebook)
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

// ✅ Updated Component to accept searchParams for JSON-LD
export default function Page({ searchParams }: Props) {
  const query = typeof searchParams?.query === "string" ? searchParams.query : "";

  // ✅ SearchResultsPage Schema
  // This helps Google understand that this page is a collection of results
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
        <Search />
      </div>
    </>
  );
}
