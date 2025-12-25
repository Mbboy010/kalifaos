import Policy from '../../components/policy/Policy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Result: "Kalifa Os - Privacy Policy"
  title: 'Privacy Policy',
  
  // ✅ Description designed to build trust with Google and Users
  description: "Read the Privacy Policy of Kalifa Os. We are committed to protecting your personal data and ensuring secure downloads for all our mobile and PC software tools.",
  
  // ✅ Keywords for trust and compliance
  keywords: [
    "Kalifa Os Privacy Policy",
    "Data Protection Nigeria",
    "User Privacy",
    "Secure Software Download",
    "GDPR Compliance",
    "Terms of Service"
  ],

  // ✅ Social Share Preview (Professional look)
  openGraph: {
    title: "Privacy Policy - Kalifa Os",
    description: "Your privacy matters. Learn how Kalifa Os protects your data.",
    url: "https://kalifaos.site/policy", // Adjust if your route is different
    siteName: "Kalifa Os",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Kalifa Os Privacy Policy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Kalifa Os",
    description: "Read our commitment to user privacy and data security.",
    images: ["/opengraph-image.png"],
  },
};

export default function InstrumentalPage() {
  // ✅ WebPage Schema: Formally identifies this as a policy page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Privacy Policy for Kalifa Os website and services.',
    publisher: {
      '@type': 'Organization',
      name: 'Kalifa Os',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kalifaos.site/logo.png'
      }
    },
    inLanguage: 'en-NG',
    datePublished: '2024-01-01', // You can update this date
    dateModified: new Date().toISOString().split('T')[0] // Auto-updates to today's date
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-full">
        <Policy />
      </div>
    </>
  );
}
