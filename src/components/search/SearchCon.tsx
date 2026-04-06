"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/server/firebaseApi";
import { 
  Download, 
  HardDrive, 
  Smartphone, 
  Search, 
  Terminal, 
  ChevronRight, 
  FileCode, 
  Loader2,
  FolderOpen
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  image: string; // Windows tools use this
  link?: string; // Mobile tools use this
}

export default function SearchCon() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"windows" | "mobile">("windows");
  const [query, setQuery] = useState<string>("");

  const [windowsTools, setWindowsTools] = useState<Tool[]>([]);
  const [mobileTools, setMobileTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const [windowsSnap, mobileSnap] = await Promise.all([
          getDocs(collection(db, "Windows-tools")),
          getDocs(collection(db, "download")),
        ]);

        const winTools = windowsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tool[];

        const mobTools = mobileSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tool[];

        setWindowsTools(winTools);
        setMobileTools(mobTools);
      } catch (error) {
        console.error("System Error: Database Unreachable", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // --- SYNC URL PARAMS ---
  useEffect(() => {
    const type = searchParams.get("type");
    const q = searchParams.get("query") || "";
    if (type === "mobile") setActiveTab("mobile");
    else setActiveTab("windows");
    setQuery(q);
  }, [searchParams]);

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

  // --- SWIPE GESTURES ---
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX = e.changedTouches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0 && activeTab === "windows") handleTabChange("mobile");
      else if (swipeDistance > 0 && activeTab === "mobile") handleTabChange("windows");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-5 pb-12 flex flex-col items-center justify-center gap-4 bg-slate-50 text-slate-800 dark:bg-[#0a0a0a] dark:text-slate-200">
         <div className="relative w-16 h-16 border-2 border-dashed rounded-full animate-spin border-blue-600 dark:border-cyan-500"></div>
         <div className="flex items-center gap-2 text-sm font-mono opacity-70">
            <Terminal size={14} />
            <span className="animate-pulse">INDEXING_FILES...</span>
         </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-24 pb-20 transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-slate-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-4xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
           <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 mb-2">
             <Search className="text-blue-600 dark:text-cyan-500" />
             <span>Query Results</span>
           </h1>
           <p className="font-mono text-xs opacity-60">
             Target Keyword: "{query}" // Found {results.length} Records
           </p>
        </div>

        {/* --- TABS (PARTITION SELECTOR) --- */}
        <div className="flex p-1 rounded-xl mb-8 border bg-white border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <button
            onClick={() => handleTabChange("windows")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "windows"
                ? 'bg-blue-50 text-blue-600 shadow-sm dark:bg-slate-800 dark:text-cyan-400 dark:shadow-lg'
                : 'text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
            }`}
          >
            <HardDrive size={16} />
            <span>Windows (PC)</span>
          </button>
          
          <button
            onClick={() => handleTabChange("mobile")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "mobile"
                ? 'bg-green-50 text-green-600 shadow-sm dark:bg-slate-800 dark:text-green-400 dark:shadow-lg'
                : 'text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
            }`}
          >
            <Smartphone size={16} />
            <span>Mobile (APK)</span>
          </button>
        </div>

        {/* --- RESULTS GRID --- */}
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((item) => (
              activeTab === "windows" ? (
                // --- WINDOWS ITEM (Now using <a>) ---
                <a
                  key={item.id}
                  href={`/windows-tools/${item.id}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:border-cyan-500/50"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-mono opacity-50 uppercase">Executable // Utility</p>
                  </div>

                  <div className="p-2 rounded-full transition-transform group-hover:translate-x-1 bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-500">
                    <ChevronRight size={16} />
                  </div>
                </a>
              ) : (
                // --- MOBILE ITEM (Already using <a>) ---
                <a
                  key={item.id}
                  href={item.link}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-white border-slate-200 hover:border-green-300 shadow-sm hover:shadow-md dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:border-green-500/50"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center border bg-green-50 border-green-100 text-green-600 dark:bg-slate-800 dark:border-slate-700 dark:text-green-500">
                    <FileCode size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-mono opacity-50 uppercase">Android Package // APK</p>
                  </div>

                  <div className="p-2 rounded-full transition-transform group-hover:scale-110 bg-green-50 text-green-600 dark:bg-slate-800 dark:text-green-500">
                    <Download size={16} />
                  </div>
                </a>
              )
            ))
          ) : (
            // --- EMPTY STATE ---
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600">
               <FolderOpen size={48} className="mb-4 opacity-50" />
               <p className="font-mono text-sm">No artifacts found in this sector.</p>
               <a 
                 href="/"
                 className="mt-4 text-xs hover:underline opacity-70"
               >
                 Return to Root Directory
               </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
