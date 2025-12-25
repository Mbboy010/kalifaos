import Terms from '../../components/terms/Terms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Terms of Service"
  title: 'Terms of Service',
  
  // ✅ Professional description for legal compliance
  description: "Read the Terms of Service for Kalifa Os. Understand the rules, usage rights, and legal disclaimers for using our bypass tools and software services in Nigeria.",
  
  // ✅ Keywords for legal and trust queries
  keywords: [
    "Terms and Conditions",
    "Kalifa Os Legal",
    "User Agreement",
    "Software Usage Policy",
    "Service Disclaimer",
    "Acceptable Use Policy",
    "Nigeria Tech Laws"
  ],

  // ✅ Social Share Preview (Professional)
  openGraph: {
    title: "Terms of Service - Kalifa Os",
    description: "Please read our Terms of Service before using our tools.",
    url: "https://kalifaos.site/terms", // Adjust if your route is different
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Terms of Service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Kalifa Os",
    description: "Legal terms and conditions for using our software.",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ WebPage Schema: Categorizes this as a legal document
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Legal terms and conditions for using Kalifa Os website and services.',
    publisher: {
      '@type': 'Organization',
      name: 'Kalifa Os',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kalifaos.site/logo.png'
      }
    },
    inLanguage: 'en-NG',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-full">
        <Terms />
      </div>
    </>
  );
}
