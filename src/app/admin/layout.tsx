
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdminGuard from './AdminGuard';

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
    default: "kalifadashbord",
    template: "%s - kalifadashbord",
  },
  description: "kalifadashbord"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-gray-200  `}>
  
         <div className="">
           <AdminGuard>
               {children}
           </AdminGuard>
         </div>
      </body>
    </html>
  );
}
