// app/windows/page.tsx
import type { Metadata } from "next";
import WinCom from "../../components/window/WinCom"; // ✅ ensure correct path

// 🔹 Dynamic Metadata for Windows Tools
export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const currentPage = Number(searchParams?.page ?? 1);

  return {
    title: `Windows Tools Page ${currentPage}`,
    description: `Browse page ${currentPage} of Windows bypass tools, system applications, and utilities for Samsung, Infinix, Tecno, and other devices with Kalifa OS.`,
    openGraph: {
      title: `Windows Tools - Page ${currentPage}`,
      description: `Page ${currentPage} of Windows bypass tools and utilities for different devices.`,
      url: `/windows?page=${currentPage}`,
    },
  };
}

// 🔹 Page Component
export default function WindowsPage() {
  return (
    <div className="container mx-auto min-h-screen">
      <WinCom />
    </div>
  );
}