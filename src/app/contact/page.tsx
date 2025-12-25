import Contact from '../../components/contact/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Contact"
  title: 'Contact',
  
  // ✅ Description includes your location and phone for immediate visibility
  description: "Contact Kalifa Os in PZ Zaria for professional mobile & PC unlocking services. Call +234 916 196 3225 or visit us for support.",
  
  // ✅ Keywords for people searching for your contact info
  keywords: [
    "Kalifa Os Phone Number",
    "Kalifa Os Address",
    "Contact Kalifa Os",
    "Zaria Phone Repair Shop",
    "PZ Zaria Tech Support",
    "WhatsApp Kalifa Os",
    "+2349161963225"
  ],

  // ✅ Facebook / WhatsApp Share Preview
  openGraph: {
    title: "Contact Kalifa Os - Zaria's Tech Experts",
    description: "Need help with your device? Call us at +234 916 196 3225 or visit our shop in PZ Zaria.",
    url: "https://kalifaos.site/contact",
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this exists in public/ folder
        width: 1200,
        height: 630,
        alt: "Contact Kalifa Os Team",
      },
    ],
  },

  // ✅ Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "Contact Kalifa Os",
    description: "Reach out to us for bypass tools and software repairs in Zaria. Call +234 916 196 3225.",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ Specific Schema for Contact Pages
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'LocalBusiness', // Tells Google you are a physical shop
      name: 'Kalifa Os',
      image: 'https://kalifaos.site/logo.png',
      telephone: '+2349161963225', // ✅ Your Number
      email: 'support@kalifaos.site', // Replace with your real email
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'PZ Zaria',
        addressLocality: 'Zaria',
        addressRegion: 'Kaduna',
        addressCountry: 'NG'
      },
      // Optional: Add opening hours if you want
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "09:00",
        closes: "18:00"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-full">
        <Contact />
      </div>
    </>
  );
}
