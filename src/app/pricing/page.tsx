import Price from '../../components/price/Price';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Pricing"
  title: 'Pricing',
  
  // ✅ Description optimized for "Cost" and "Affordability" searches
  description: "Check our affordable prices for FRP Bypass, iCloud Removal, and Phone Unlocking in Zaria. Best rates for dealers and individuals in Nigeria.",
  
  // ✅ Keywords targeting price-conscious customers
  keywords: [
    "Phone Unlock Price Zaria",
    "FRP Bypass Cost Nigeria",
    "Cheap iPhone Unlock",
    "Kalifa Os Price List",
    "Mobile Software Repair Cost",
    "Samsung Unlock Price",
    "Wholesale Unlock Credits"
  ],

  // ✅ Social Share Preview
  openGraph: {
    title: "Kalifa Os Pricing - Affordable Unlocking Plans",
    description: "Get the best rates for mobile unlocking and software tools in Nigeria. Single & Bulk plans available.",
    url: "https://kalifaos.site/pricing",
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Pricing Plans",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kalifa Os - Unlocking Service Prices",
    description: "Affordable FRP & iCloud unlocking services in Zaria. Check our plans.",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ Service Schema: Tells Google "I sell these specific services"
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobile Device Unlocking & Software Repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Kalifa Os',
      telephone: '+2349161963225',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zaria',
        addressRegion: 'Kaduna',
        addressCountry: 'NG'
      }
    },
    areaServed: {
      '@type': 'City',
      name: 'Zaria'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Unlocking Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FRP Bypass'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'iCloud Removal'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Unlocking'
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto min-h-full">
        <Price />
      </div>
    </>
  );
}
