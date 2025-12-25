import type { Metadata } from "next";
import WinCom from "../../components/window/WinCom";
import Script from "next/script";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// 🔹 Dynamic Metadata for Windows Tools
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const currentPage = Number(searchParams?.page ?? 1);

  return {
    // ✅ Result: "Kalifa Os - Windows Tools Page 1"
    title: `Windows Tools Page ${currentPage}`,
    
    // ✅ Description lists high-demand tools to catch search traffic
    description: `Page ${currentPage}: Download essential Windows PC tools for mobile repair. Get USB Drivers (MTK, SPD, Qualcomm), Odin Flash Tool, Miracle Box, and FRP Unlockers from Kalifa Os Zaria.`,
    
    // ✅ Keywords targeting PC technicians
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

    // ✅ Social Share Preview
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
    
    // ✅ SEO Best Practice for Pagination:
    // Prevents Google from getting confused by "Page 2", "Page 3" duplicate content issues
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 🔹 Page Component
export default function WindowsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page ?? 1);

  // ✅ CollectionPage Schema: Tells Google "This is a library of PC Software"
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
        applicationCategory: 'Driver' // Specific category for Drivers
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
