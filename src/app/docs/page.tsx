import React from 'react'
import DocCom from "../../components/docs/DocCom"
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Documentation & User Guides"
  title: 'Documentation & User Guides',
  
  // ✅ Description: clearly explains that this page contains instructions
  description: "Read the official documentation for Kalifa Os tools. Step-by-step guides for FRP bypass, Windows unlock tools, and mobile software repairs in Zaria.",
  
  // ✅ Keywords: Targeting users looking for help/manuals
  keywords: [
    "Kalifa Os Documentation",
    "FRP Bypass Guide",
    "How to use Kalifa Os Tools",
    "Mobile Repair Tutorials",
    "Samsung Unlock Manual",
    "Windows Tool Instructions",
    "Software User Guide"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Kalifa Os Docs - User Guides & Tutorials",
    description: "Learn how to use our bypass tools safely and effectively. Complete manuals available.",
    url: "https://kalifaos.site/docs", // Adjust if your route is different
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "article", // 'article' fits better for documentation than 'website'
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Documentation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kalifa Os - Official Documentation",
    description: "Step-by-step guides for all our unlocking tools.",
    images: ["/opengraph-image.png"],
  },
};

export default function DocsPage() {
  // ✅ Breadcrumb Schema: Helps Google understand structure (Home > Docs)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Kalifa Os Documentation',
    description: 'Central hub for user guides, tutorials, and manuals for mobile and PC unlocking tools.',
    publisher: {
      '@type': 'Organization',
      name: 'Kalifa Os',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kalifaos.site/logo.png'
      }
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
          name: 'Documentation',
          item: 'https://kalifaos.site/docs'
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="docs-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div>
        <DocCom />
      </div>
    </>
  )
}
