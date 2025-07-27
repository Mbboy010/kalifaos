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
  description:
    "Discover Kalifa OS, the next-generation operating system. Unlock your device with FRP bypass tools and system app management. Try our free diagnostic service today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"  >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ProvCom>{children}</ProvCom>
        </Providers>
      </body>
    </html>
  );
}