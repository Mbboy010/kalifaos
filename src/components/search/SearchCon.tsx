// app/search/page.tsx
"use client";

import { useState } from "react";
import { useAppSelector } from "../../components/redux/hooks";
import Link from "next/link";

// ✅ Define type with optional route
interface Tool {
  id: string;
  title: string;
  image: string;
  route?: string;
}

const mockWindowsTools: Tool[] = [
  {
    id: "1",
    title: "Windows FRP Tool v1.0",
    image:
      "https://images.unsplash.com/photo-1587202372775-98927a6d68e0?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    title: "Bypass Pro v2.3",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    title: "UnlockMate v1.5",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?w=800&auto=format&fit=crop&q=60",
  },
];

const mockMobileTools: Tool[] = [
  {
    id: "frp-tools",
    title: "FRP Tools APK",
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=800&auto=format&fit=crop&q=60",
    route: "/frp-tools-apk-download",
  },
  {
    id: "system-apps",
    title: "System Apps",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60",
    route: "/system-apps",
  },
  {
    id: "settings",
    title: "Settings & Lock Screen",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=60",
    route: "/bypass-frp-setting",
  },
];

export default function SearchCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [activeTab, setActiveTab] = useState<"windows" | "mobile">("windows");

  const results = activeTab === "windows" ? mockWindowsTools : mockMobileTools;

  // Swipe detection
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return; // ignore tiny swipes

    if (swipeDistance < 0 && activeTab === "windows") {
      // swipe left → go to mobile
      setActiveTab("mobile");
    } else if (swipeDistance > 0 && activeTab === "mobile") {
      // swipe right → go to windows
      setActiveTab("windows");
    }
  };

  return (
    <div
      className="flex flex-col p-6 max-w-3xl mx-auto min-h-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Toggle Tabs */}
      <div className="flex mt-16 justify-between mb-6">
        <button
          onClick={() => setActiveTab("windows")}
          className={`flex-1 py-2 text-center font-semibold rounded-l-lg transition-all ${
            activeTab === "windows"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => setActiveTab("mobile")}
          className={`flex-1 py-2 text-center font-semibold rounded-r-lg transition-all ${
            activeTab === "mobile"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Mobile
        </button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {results.length > 0 ? (
          results.map((item) => (
            <Link
              key={item.id}
              href={
                activeTab === "windows"
                  ? `/windows-tools/${item.id}`
                  : item.route || "#"
              }
              className="flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors bg-black/5 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-800"
              style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {item.title}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            No results found
          </p>
        )}
      </div>

    </div>
  );
}