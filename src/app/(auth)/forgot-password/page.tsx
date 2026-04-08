import React from 'react'
import ForgotCom from "../../../components/forgot/ForgotCom"
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ 1. Metadata Base for absolute URL resolution
  metadataBase: new URL('https://kalifaos.site'),

  // ✅ 2. Clear Title for the browser tab
  title: 'Reset Password',
  
  // ✅ 3. Description for social previews
  description: "Recover your Kalifa Os account access. Follow the steps to reset your password and get back to your mobile repair and bypass tools dashboard.",
  
  // ✅ 4. ROBOTS: Best practice is to hide recovery pages from search engines
  robots: {
    index: false,
    follow: false,
  },

  // ✅ 5. Social Media Sharing (OpenGraph)
  openGraph: {
    title: "Reset Your Password - Kalifa Os",
    description: "Securely recover your account access.",
    url: "/forgot-password", // Adjust this path if your folder name is different
    siteName: "Kalifa Os",
    images: [
      {
        url: "/Logo.jpg", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Password Recovery",
      },
    ],
    type: "website",
  },

  // ✅ 6. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Kalifa Os - Account Recovery",
    description: "Follow the instructions to reset your secure password.",
    images: ["/Logo.jpg"],
  },
};

export default function ForgotPasswordPage() {
  // ✅ Breadcrumb Schema: Helps Google understand the site hierarchy
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Password Recovery Portal',
    description: 'The secure portal for resetting Kalifa Os account passwords.',
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
          name: 'Reset Password',
          item: 'https://kalifaos.site/forgot-password'
        }
      ]
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <Script
        id="forgot-password-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <ForgotCom />
      </div>
    </>
  )
}
