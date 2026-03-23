import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/redux/Provider";
import { ProvCom } from "./ProvCom";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ✅ 1. metadataBase is REQUIRED for social images to work
  metadataBase: new URL("https://kalifaos.site"),
  
  title: {
    default: "Kalifa Os - Best Bypass Tools & Mobile Tech | Zaria",
    template: "%s | Kalifa Os",
  },
  
  description: "Download the best mobile and PC bypass tools in Zaria, Kaduna State. Kalifa Os offers FRP bypass, unlocking software, and tech solutions at PZ Zaria.",
  
  keywords: [
    "Bypass Tools Zaria",
    "FRP Bypass Nigeria",
    "Mobile Unlocking Zaria",
    "PZ Zaria Tech",
    "Kalifa Os",
    "Kaduna Phone Repair",
    "iCloud Bypass Tools",
    "GSM Tools Nigeria",
    "Software Repair Zaria"
  ],

  authors: [{ name: "Kalifa Os" }],
  
  other: {
    "google-site-verification": "CTf3k5K1pHcDm8TDmu_Qp6AjT-opf6Bn2rny8MrWEoc",
  },
  
  // ✅ 2. FACEBOOK / WHATSAPP / LINKEDIN CONFIGURATION
  openGraph: {
    title: "Kalifa Os - Mobile & PC Bypass Tools in Zaria",
    description: "Get the latest unlocking software, FRP bypass tools, and mobile tech services at PZ Zaria, Kaduna. Visit Kalifa Os now.",
    url: "https://kalifaos.site",
    siteName: "Kalifa Os",
    locale: "en_NG", // Targeting Nigeria
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Make sure this image exists in your public folder!
        width: 1200,
        height: 630,
        alt: "Kalifa Os Tech Services Zaria",
      },
    ],
  },

  // ✅ 3. TWITTER (X) CARD CONFIGURATION
  twitter: {
    card: "summary_large_image", // Makes the image big and attractive
    title: "Kalifa Os - Mobile & PC Bypass Tools",
    description: "Unlock your devices with Kalifa Os. Best tech services in PZ Zaria, Kaduna State.",
    images: ["/opengraph-image.png"], // Uses the same image as above
    creator: "@KalifaOs", // Replace with your actual Twitter handle if you have one
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ JSON-LD for Local Business (Google Maps/Search context)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // Changed to LocalBusiness since you are in PZ Zaria
    name: 'Kalifa Os',
    image: 'https://kalifaos.site/opengraph-image.png',
    description: 'Best source for Mobile and PC Bypass tools in Zaria, Kaduna State.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zaria',
      addressRegion: 'Kaduna',
      addressCountry: 'NG',
      streetAddress: 'PZ Zaria'
    },
    url: 'https://kalifaos.site'
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9241182560906060"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Providers>
          <ProvCom>{children}</ProvCom>
        </Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}
