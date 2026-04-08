import React from 'react'
import SignCom from "../../../components/signup/SignCom"
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ 1. Fixes relative paths for social images
  metadataBase: new URL('https://kalifaos.site'),

  // ✅ 2. Clear Title for the browser tab
  title: 'Create Account',
  
  // ✅ 3. Description for social media previews
  description: "Join the Kalifa Os community. Create an account to download premium FRP bypass tools, drivers, and get expert mobile software support in Zaria.",
  

  // ✅ 5. Social Media Sharing (OpenGraph)
  openGraph: {
    title: "Join Kalifa Os - Create Your Account",
    description: "Get instant access to the best mobile repair and bypass tools.",
    url: "/register",
    siteName: "Kalifa Os",
    images: [
      {
        url: "/Logo.jpg", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Registration",
      },
    ],
    type: "website",
  },

  // ✅ 6. Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "Sign Up for Kalifa Os",
    description: "The home of trusted mobile software solutions.",
    images: ["/Logo.jpg"],
  },
};

export default function RegisterPage() {
  // ✅ Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Registration Portal',
    description: 'Create a new account on Kalifa Os.',
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
          name: 'Register',
          item: 'https://kalifaos.site/register'
        }
      ]
    }
  };

  return (
    <>
      {/* Inject Structured Data for Google's understanding */}
      <Script
        id="register-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <SignCom />
      </div>
    </>
  )
}
