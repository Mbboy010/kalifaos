"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "../../components/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/server/firebaseApi"; // ✅ your config
import { Download } from "lucide-react"; // 👈 download icon

interface Tool {
  id: string;
  title: string;
  image: string;
  link?: string; // 👈 Firebase download link for mobile
}

export default function SearchCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"windows" | "mobile">("windows");
  const [query, setQuery] = useState<string>("");

  const [windowsTools, setWindowsTools] = useState<Tool[]>([]);
  const [mobileTools, setMobileTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch both collections from Firestore
  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const [windowsSnap, mobileSnap] = await Promise.all([
          getDocs(collection(db, "Windows-tools")),
          getDocs(collection(db, "download")), // 👈 mobile tools
        ]);

        const winTools: Tool[] = windowsSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Tool, "id">),
        }));

        const mobTools: Tool[] = mobileSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Tool, "id">),
        }));

        setWindowsTools(winTools);
        setMobileTools(mobTools);
      } catch (error) {
        console.error("❌ Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // ✅ On page load, check query params
  useEffect(() => {
    const type = searchParams.get("type");
    const q = searchParams.get("query") || "";
    if (type === "mobile") setActiveTab("mobile");
    else setActiveTab("windows");
    setQuery(q);
  }, [searchParams]);

  // ✅ Update URL when tab changes
  const handleTabChange = (tab: "windows" | "mobile") => {
    setActiveTab(tab);
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("type", tab);
    router.push(`?${params.toString()}`);
  };

  const results = (activeTab === "windows" ? windowsTools : mobileTools).filter(
    (item) => item.title.toLowerCase().includes(query.toLowerCase())
  );

  // --- Swipe detection ---
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
    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance < 0 && activeTab === "windows") {
      handleTabChange("mobile");
    } else if (swipeDistance > 0 && activeTab === "mobile") {
      handleTabChange("windows");
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
          onClick={() => handleTabChange("windows")}
          className={`flex-1 py-2 text-center font-semibold rounded-l-lg transition-all ${
            activeTab === "windows"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => handleTabChange("mobile")}
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
        {loading ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        ) : results.length > 0 ? (
          results.map((item) =>
            activeTab === "windows" ? (
              // --- Windows item navigates ---
              <div
                key={item.id}
                onClick={() => router.push(`/windows-tools/${item.id}`)}
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
              </div>
            ) : (
              // --- Mobile item downloads ---
              <a
                key={item.id}
                href={item.link}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-md transition-colors bg-black/5 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
              >
                <Download className="w-12 h-12 text-blue-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.title}
                </span>
              </a>
            )
          )
        ) : (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}