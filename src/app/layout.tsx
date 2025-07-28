import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/redux/Provider";
import { ProvCom } from "./ProvCom";

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
  description: "This page could not be found on Kalifa OS.",
  other: {
    "google-site-verification": "CTf3k5K1pHcDm8TDmu_Qp6AjT-opf6Bn2rny8MrWEoc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense script stays here */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9241182560906060"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ProvCom>{children}</ProvCom>
        </Providers>
      </body>
    </html>
  );
}