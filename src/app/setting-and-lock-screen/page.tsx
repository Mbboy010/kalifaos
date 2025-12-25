import Setting from '../../components/setting/Setting';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Open Settings & Lock Screen"
  title: 'Open Settings & Lock Screen Shortcuts',
  
  // ✅ Action-oriented description (High CTR)
  description: "Directly open Android Settings, Set Screen Lock (PIN/Pattern), or launch Galaxy Store for FRP Bypass. Essential shortcuts for Samsung, Tecno, and Infinix unlocking.",
  
  // ✅ Targeted Keywords for FRP technicians
  keywords: [
    "Open Settings FRP",
    "Set Screen Lock FRP",
    "Bypass PIN Lock",
    "Open Galaxy Store Shortcut",
    "Android 13 Settings Shortcut",
    "Add Fingerprint FRP",
    "Alliance Shield X Settings",
    "Google Account Manager Settings"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Open Settings & Set Lock Screen - Kalifa Os",
    description: "One-click shortcuts to open Android Settings and set a new PIN/Pattern for FRP bypass.",
    url: "https://kalifaos.site/setting", // Adjust route if needed
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "FRP Settings Shortcuts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FRP Settings & Lock Screen Shortcuts",
    description: "Quickly access phone settings and security menus for bypassing.",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ HowTo Schema: Google loves this for instructional pages
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Open Settings for FRP Bypass',
    description: 'Steps to access Android settings and set a screen lock to bypass Google Verification.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Open Settings',
        text: 'Click the Open Settings button to access the main Android configuration menu.',
        url: 'https://kalifaos.site/setting'
      },
      {
        '@type': 'HowToStep',
        name: 'Set Screen Lock',
        text: 'Select Set Screen Lock to create a new PIN or Pattern that overrides the old lock.',
        url: 'https://kalifaos.site/setting'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Kalifa Os Settings Shortcut'
      }
    ]
  };

  return (
    <>
      <Script
        id="howto-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto min-h-full">
        <Setting />
      </div>
    </>
  );
}
