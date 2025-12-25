import { db } from '@/server/firebaseApi';
import { doc, getDoc } from 'firebase/firestore';
import AppCom from '../../../components/window/appView/AppCom';
import Script from 'next/script';
import type { Metadata } from 'next'; // ✅ Added missing import

interface PageProps {
  params: Promise<{ contentId: string }>;
}

// ---------------------------------------------------------
// 1. HELPER: Fetch Data (Used in both Metadata & Page)
// ---------------------------------------------------------
async function getToolData(contentId: string) {
  try {
    const docRef = doc(db, 'Windows-tools', contentId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Error fetching tool data:", error);
    return null;
  }
}

// ==============================
// 📌 Dynamic Metadata
// ==============================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { contentId } = await params; // ✅ Await params (Next.js 15 standard)
  const data = await getToolData(contentId);

  const toolName = data?.title || 'Windows Repair Tool';
  const toolDesc = data?.description || 'Download verified Windows bypass tools and drivers for Samsung, Tecno, and Infinix.';
  const toolImage = data?.ogImage || data?.image || '/opengraph-image.png';

  return {
    metadataBase: new URL('https://kalifaos.site'), // ✅ Fixes URL warnings
    title: toolName,
    description: toolDesc,
    keywords: [
      toolName,
      `${toolName} download`,
      `${toolName} free`,
      "Windows FRP Tool",
      "Mobile Repair Software",
      "Kalifa Os Tools"
    ],
    openGraph: {
      title: `${toolName} - Free Download`,
      description: toolDesc,
      url: `/windows-tools/${contentId}`, // ✅ Simplified URL
      images: [
        {
          url: toolImage,
          width: 1200,
          height: 630,
          alt: `${toolName} Preview`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${toolName} - Download`,
      description: `Get ${toolName} for Windows. Working 100%.`,
      images: [toolImage],
    },
  };
}

// ==============================
// 📌 Page Component
// ==============================
export default async function ContentPage({ params }: PageProps) {
  const { contentId } = await params; // ✅ Await params here too
  
  const data = await getToolData(contentId);

  // Fallbacks if data is missing
  const toolName = data?.title || 'Windows Tool';
  const toolDesc = data?.description || 'Windows utility software for mobile repair.';
  const toolImage = data?.ogImage || data?.image || 'https://kalifaos.site/logo.png';
  const toolFileUrl = data?.downloadUrl || `https://kalifaos.site/windows-tools/${contentId}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    operatingSystem: 'Windows 10, Windows 11, Windows 8, Windows 7',
    applicationCategory: 'UtilitiesApplication',
    description: toolDesc,
    image: toolImage,
    url: `https://kalifaos.site/windows-tools/${contentId}`,
    downloadUrl: toolFileUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data?.rating || '4.8', 
      ratingCount: data?.ratingCount || '350'
    },
    author: {
      '@type': 'Organization',
      name: 'Kalifa Os'
    }
  };

  return (
    <>
      <Script
        id={`product-jsonld-${contentId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto min-h-screen">
        <AppCom />
      </div>
    </>
  );
}
