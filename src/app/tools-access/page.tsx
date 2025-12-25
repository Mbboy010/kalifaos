import React from 'react'
import ToolCom from "../../components/toolsAccess/ToolCom"
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Access Tools"
  title: 'Access Tools',
  
  // ✅ Description: Focuses on the "Gateway" aspect of this page
  description: "Access your Kalifa Os dashboard. Manage your subscriptions, download premium FRP bypass tools, and view your unlocking history in Zaria, Nigeria.",
  
  // ✅ Keywords: Targeting users trying to log in or find their dashboard
  keywords: [
    "Kalifa Os Login",
    "Access Bypass Tools",
    "FRP Dashboard",
    "Premium Tool Access",
    "Unlock Tool Portal",
    "Kalifa Os Account",
    "Zaria Tech Portal"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Kalifa Os - Tools Access Portal",
    description: "Login to access premium mobile and PC unlocking tools.",
    url: "https://kalifaos.site/tools-access", // Adjust if your route is different
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Tools Access",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kalifa Os - Tools Dashboard",
    description: "Manage your tools and downloads.",
    images: ["/opengraph-image.png"],
  },
};

export default function page() {
  // ✅ WebPage Schema: Identifies this as a specific part of the site (Profile/Account/Dashboard)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Tools Access Portal',
    description: 'Gateway to access and manage Kalifa Os software tools and subscriptions.',
    potentialAction: {
      '@type': 'ControlAction',
      name: 'Access Tools',
      target: 'https://kalifaos.site/tools-access'
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
          name: 'Access Tools',
          item: 'https://kalifaos.site/tools-access'
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="access-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <ToolCom />
      </div>
    </>
  )
}
