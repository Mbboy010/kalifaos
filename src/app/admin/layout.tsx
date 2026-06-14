import type { Metadata } from "next";
import AdminGuard from './AdminGuard';

export const metadata: Metadata = {
  title: {
    default: "kalifadashbord",
    template: "%s - kalifadashbord",
  },
  description: "kalifadashbord"
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      {/* 
        We use a wrapper div with your admin specific styles 
        instead of repeating <html> or <body> tags.
      */}
      <div className="min-h-screen w-full bg-black text-gray-200">
        <div>
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
