"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import ScrollToTopHandler from './ScrollToTopHandler';
import Footer from '../components/footer/Footer';
import Navigate from "../components/navigate/Navigate";
import RouteTracker from "./View";

// Note: Redux imports (setColor/isColor) are removed as next-themes handles this.

export function ProvCom({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Hydration fix: ensures the UI matches the theme only after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a loader or a skeleton that matches your default theme (Dark) 
    // to prevent a "flash" of white during page load.
    return <div className="min-h-screen bg-[#121212]" />;
  }

  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
      <div className="min-h-screen w-screen transition-colors duration-500 bg-gray-100 text-gray-800 dark:bg-[#121212] dark:text-white">
        <Navigate />
        <RouteTracker />
        
        <main className="flex-1">
          {children}
        </main>

        <ScrollToTopHandler />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
