import React from 'react'
import LogCon from "../../../components/login/LogCon"
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ 1. Metadata Base for social images
  metadataBase: new URL('https://kalifaos.site'),

  // ✅ 2. Clear Title
  title: 'Login',
  
  // ✅ 3. Description (mostly for social media preview)
  description: "Sign in to your Kalifa Os account to access premium mobile repair tools, manage your downloads, and contact support in Zaria.",
  
  // ✅ 4. ROBOTS: This tells Google "Don't show this page in search results"
  // This is a "Best Practice" for login pages to keep your SEO clean.
  robots: {
    index: false,
    follow: false,
  },

  // ✅ 5. Social Media Preview (WhatsApp/Facebook/Twitter)
  openGraph: {
    title: "Login - Kalifa Os Account",
    description: "Access your dashboard and premium bypass tools.",
    url: "/login",
    siteName: "Kalifa Os",
    images: [
      {
        url: "/Logo.jpg", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Login Portal",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sign In to Kalifa Os",
    description: "Secure access to your mobile repair tools and account.",
    images: ["/Logo.jpg"],
  },
};

export default function LoginPage() {
  // ✅ Breadcrumb Schema: Helps with site structure understanding
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Login Portal',
    description: 'Secure login page for Kalifa Os users.',
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
          name: 'Login',
          item: 'https://kalifaos.site/login'
        }
      ]
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <Script
        id="login-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <LogCon />
      </div>
    </>
  )
}
