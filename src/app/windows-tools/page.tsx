import type { Metadata } from "next";
import WinCom from "../../components/window/WinCom";
import Script from "next/script";

// ✅ Fix 1: Define searchParams as a Promise
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 🔹 Dynamic Metadata for Windows Tools
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // ✅ Fix 2: Await searchParams
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page ?? 1);

  return {
    title: `Windows Tools Page ${currentPage}`,
    
    description: `Page ${currentPage}: Download essential Windows PC tools for mobile repair. Get USB Drivers (MTK, SPD, Qualcomm), Odin Flash Tool, Miracle Box, and FRP Unlockers from Kalifa Os Zaria.`,
    
    keywords: [
      "Samsung Odin Download",
      "MTK USB Drivers Windows",
      "Qualcomm USB Drivers",
      "SPD Flash Tool",
      "Miracle Box Crack",
      "UnlockTool Free",
      "Windows FRP Tool",
      "GSM Flashing Software",
      "Kalifa Os PC Tools"
    ],

    openGraph: {
      title: `Windows Mobile Repair Tools - Page ${currentPage}`,
      description: "Download verified PC software for flashing and unlocking Samsung, Tecno, and Infinix phones.",
      url: `https://kalifaos.site/windows-tools?page=${currentPage}`,
      siteName: "Kalifa Os",
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Windows Repair Tools Collection",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Windows Tools Collection - Page ${currentPage}`,
      description: "Get the best Drivers and Flash tools for Windows.",
      images: ["/opengraph-image.png"],
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 🔹 Page Component
// ✅ Fix 3: Make component async
export default async function WindowsPage({ searchParams }: Props) {
  // ✅ Fix 4: Await searchParams
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page ?? 1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Windows Repair Tools - Page ${currentPage}`,
    description: 'A comprehensive collection of Windows-based software for mobile phone flashing, unlocking, and repair.',
    url: `https://kalifaos.site/windows-tools?page=${currentPage}`,
    hasPart: [
      {
        '@type': 'SoftwareApplication',
        name: 'Samsung Odin Tool',
        operatingSystem: 'WINDOWS',
        applicationCategory: 'UtilitiesApplication'
      },
      {
        '@type': 'SoftwareApplication',
        name: 'MTK/Qualcomm/SPD Drivers',
        operatingSystem: 'WINDOWS',
        applicationCategory: 'Driver' 
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Miracle Box / Thunder',
        operatingSystem: 'WINDOWS',
        applicationCategory: 'UtilitiesApplication'
      }
    ]
  };

  return (
    <>
      <Script
        id="windows-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto min-h-screen">
        <WinCom />
      </div>
    </>
  );
}
