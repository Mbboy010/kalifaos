import type { Metadata } from 'next';
import System from '../../components/system/System';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - System Apps & FRP Shortcuts"
  title: 'System Apps & FRP Shortcuts',
  
  // ✅ Description lists the actual apps (High SEO value)
  description:
    'Download essential system apps for FRP Bypass: Google Account Manager (GAM 6, 8, 9, 10), QuickShortcutMaker, Package Disabler, and Android Setup APKs for Samsung, Infinix, and Tecno.',
  
  // ✅ Keywords targeting specific file names technicians search for
  keywords: [
    "Google Account Manager 6 APK",
    "GAM 8 9 10 Download",
    "QuickShortcutMaker APK",
    "Android Setup APK",
    "Development Settings APK",
    "Package Disabler Pro Free",
    "Alliance Shield X APK",
    "FRP File Tools",
    "Samsung System Apps"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Download FRP System Apps & Shortcuts",
    description: "Get Google Account Manager, QuickShortcutMaker, and more. Essential tools for bypassing Android locks.",
    url: "https://kalifaos.site/system", // Adjust route if needed
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "FRP System Applications List",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FRP System Apps Download",
    description: "Download GAM, QuickShortcutMaker, and Settings APKs.",
    images: ["/opengraph-image.png"],
  },
};

export default function SystemPage() {
  // ✅ CollectionPage Schema: Tells Google "This is a library of software"
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FRP System Applications Library',
    description: 'A collection of essential Android system applications for bypassing FRP locks.',
    url: 'https://kalifaos.site/system',
    hasPart: [
      {
        '@type': 'SoftwareApplication',
        name: 'Google Account Manager (GAM)',
        operatingSystem: 'ANDROID',
        applicationCategory: 'UtilitiesApplication'
      },
      {
        '@type': 'SoftwareApplication',
        name: 'QuickShortcutMaker',
        operatingSystem: 'ANDROID',
        applicationCategory: 'UtilitiesApplication'
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Package Disabler',
        operatingSystem: 'ANDROID',
        applicationCategory: 'UtilitiesApplication'
      }
    ]
  };

  return (
    <>
      <Script
        id="collection-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-full">
        <System  />
      </div>
    </>
  );
}
