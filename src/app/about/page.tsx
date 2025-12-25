import About from '../../components/about/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Title results in: "Kalifa Os - About"
  title: 'About',
  
  description: "Learn about Kalifa Os, the trusted mobile and PC software solution provider in PZ Zaria, Kaduna State. We specialize in secure bypass tools and unlocking services.",
  
  // ✅ Expanded Keywords for better search ranking
  keywords: [
    "About Kalifa Os",
    "Kalifa Os Contact",
    "Zaria Tech Team",
    "Mobile Software Engineers Nigeria",
    "PZ Zaria Business",
    "Trustworthy Unlockers",
    "Phone Repair Zaria",
    "FRP Bypass Experts",
    "Kaduna Tech Support"
  ],

  // ✅ Facebook / WhatsApp Share Settings
  openGraph: {
    title: "Kalifa Os - About Our Team",
    description: "Meet the experts behind the best bypass tools in Zaria, Kaduna. Call us: +234 916 196 3225",
    url: "https://kalifaos.site/about",
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this image is in your public folder
        width: 1200,
        height: 630,
        alt: "About Kalifa Os Team",
      },
    ],
  },

  // ✅ Twitter (X) Share Settings
  twitter: {
    card: "summary_large_image",
    title: "Kalifa Os - About Us",
    description: "Trusted mobile & PC solutions in PZ Zaria. Contact: +234 916 196 3225",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ Google Schema with Phone Number & Location
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Kalifa Os',
      url: 'https://kalifaos.site',
      logo: 'https://kalifaos.site/logo.png',
      description: "Professional Mobile and PC Software Solutions in Zaria.",
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+2349161963225', // ✅ Your Number
        contactType: 'customer service',
        areaServed: 'NG',
        availableLanguage: ['en', 'ha'] // Added Hausa ('ha') since you are in Zaria
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zaria',
        addressRegion: 'Kaduna',
        addressCountry: 'NG',
        streetAddress: 'PZ Zaria'
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
        <About />
      </div>
    </>
  );
}
