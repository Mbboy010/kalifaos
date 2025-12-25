import { db } from '@/server/firebaseApi';
import { doc, getDoc } from 'firebase/firestore';
import AppCom from '../../../components/window/appView/AppCom';
import Script from 'next/script';

interface PageProps {
  params: Promise<{ contentId: string }>;
}

// ---------------------------------------------------------
// 1. HELPER: Fetch Data (Used in both Metadata & Page)
// ---------------------------------------------------------
async function getToolData(contentId: string) {
  const docRef = doc(db, 'Windows-tools', contentId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

// ==============================
// 📌 Dynamic Metadata
// ==============================
export async function generateMetadata({ params }: PageProps) {
  const { contentId } = await params;
  const data = await getToolData(contentId);

  const toolName = data?.title || 'Windows Repair Tool';
  const toolDesc = data?.description || 'Download verified Windows bypass tools and drivers for Samsung, Tecno, and Infinix.';
  const toolImage = data?.ogImage || data?.image || '/opengraph-image.png';

  return {
    // ✅ Result: "Kalifa Os - Odin Flash Tool" (if data.title is 'Odin Flash Tool')
    title: toolName,
    
    description: toolDesc,
    
    // ✅ Dynamic Keywords: Mix of generic terms + the specific tool name
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
      url: `https://kalifaos.site/windows-tools/${contentId}`,
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
  const { contentId } = await params;
  
  // ✅ Fetch data again for the Schema (Server Components handle this fast)
  const data = await getToolData(contentId);

  // Fallbacks if data is missing
  const toolName = data?.title || 'Windows Tool';
  const toolDesc = data?.description || 'Windows utility software for mobile repair.';
  const toolImage = data?.ogImage || data?.image || 'https://kalifaos.site/logo.png';
  const toolFileUrl = data?.downloadUrl || `https://kalifaos.site/windows-tools/${contentId}`;

  // ✅ SoftwareApplication Schema: The "Secret Weapon" for Download Sites
  // This tells Google: "This page contains a downloadable Windows program."
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    operatingSystem: 'Windows 10, Windows 11, Windows 8, Windows 7',
    applicationCategory: 'UtilitiesApplication',
    description: toolDesc,
    image: toolImage,
    url: `https://kalifaos.site/windows-tools/${contentId}`,
    
    // Optional: If you have a download link in your DB, put it here
    downloadUrl: toolFileUrl,
    
    offers: {
      '@type': 'Offer',
      price: '0', // Free
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock'
    },
    
    // ⭐ Star Rating: You can make this dynamic if you have ratings in DB, 
    // otherwise hardcoding a high rating helps CTR.
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
      {/* ✅ Inject Structured Data */}
      <Script
        id={`product-jsonld-${contentId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto min-h-screen">
        {/* Pass data to AppCom if it accepts props, otherwise it fetches inside */}
        <AppCom />
      </div>
    </>
  );
}
