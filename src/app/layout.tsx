import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/redux/Provider";
import { ProvCom } from "./ProvCom";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kalifa Os",
    template: "%s - Kalifa Os",
  },
  description:
    "Discover Kalifa OS, the next-generation operating system. Unlock your device with FRP bypass tools and system app management. Try our free diagnostic service today",
  other: {
    "google-site-verification":
      "CTf3k5K1pHcDm8TDmu_Qp6AjT-opf6Bn2rny8MrWEoc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
     {/* ✅ Load Google AdSense script client-side */}
        <script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9241182560906060"
          crossOrigin="anonymous"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ProvCom>{children}</ProvCom>
        </Providers>
      </body>
    </html>
  );
}