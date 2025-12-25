import type { Metadata } from 'next';
import Frp from '../../components/frp/Frp';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - FRP Bypass Tools"
  title: 'FRP Bypass Tools',
  
  // ✅ Description targeted for high Click-Through Rate (CTR)
  description: 'Download the latest FRP Bypass Tools 2025 for Samsung, Tecno, Infinix, and more. Free, secure, and working Android unlock solutions from Kalifa Os Zaria.',
  
  // ✅ High-traffic keywords for Nigeria
  keywords: [
    "FRP Bypass Tool Download",
    "Samsung FRP Bypass",
    "Tecno FRP Reset",
    "Infinix Google Lock Removal",
    "Android 13 FRP Bypass",
    "Android 14 FRP Tool",
    "Universal FRP Tool",
    "Kalifa Os Tools",
    "Zaria Mobile Software"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Download Premium FRP Bypass Tools - Kalifa Os",
    description: "Get the best working FRP tools for Android 14/13/12. 100% Free Download at Kalifa Os.",
    url: "https://kalifaos.site/frp-tools", // Adjust if your route is different
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "FRP Bypass Tools Download",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Download FRP Bypass Tools 2025",
    description: "Unlock Samsung, Tecno, and Infinix devices easily. Download now from Kalifa Os.",
    images: ["/opengraph-image.png"],
  },
};

export default function DownloandPage() {
  // ✅ Software Schema: Tells Google "This is a downloadable app"
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kalifa Os FRP Bypass Tool Collection',
    operatingSystem: 'ANDROID',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150'
    },
    description: 'A collection of the best FRP bypass tools for Android devices including Samsung, Tecno, and Infinix.',
    publisher: {
      '@type': 'Organization',
      name: 'Kalifa Os',
      url: 'https://kalifaos.site'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-full">
        <Frp />
      </div>
    </>
  );
}
