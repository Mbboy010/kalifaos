"use client";

import {
  MoreVertical,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  Clock,
  Database,
  Terminal,
  Cpu,
  Loader2,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Firebase
import { db } from "@/server/firebaseApi";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

type Tool = {
  id: string;
  title: string;
  price: string;
  size: string;
  date: string;
  image: string;
};

// --- Custom Skeleton for this specific view ---
const SystemScanner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed animate-[spin_3s_linear_infinite] border-blue-600 dark:border-cyan-500">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-cyan-400" />
    </div>
    <div className="font-mono text-sm tracking-widest opacity-70 animate-pulse">
      SCANNING REPOSITORY...
    </div>
  </div>
);

export default function WinContent() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const itemsPerPage = 5;
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDocs, setTotalDocs] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---- Format Price ----
  const formatPrice = (price: string) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    if (num === 0) return "Free";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(num);
  };

  // ---- Format Date ----
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    const days = Math.floor(diff / (3600 * 24));
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const fetchTotalDocs = useCallback(async () => {
    try {
      const snapshot = await getDocs(query(collection(db, "Windows-tools"), orderBy("date", "desc")));
      setTotalDocs(snapshot.size);
    } catch (e) { console.error(e); }
  }, []);

  const fetchPage = useCallback(async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const totalPages = Math.ceil(totalDocs / itemsPerPage);
        if (totalDocs > 0 && (page < 1 || page > totalPages)) {
          setTools([]);
          setError("Sector empty: Page out of range.");
          setLoading(false);
          return;
        }

        let q = query(collection(db, "Windows-tools"), orderBy("date", "desc"), limit(itemsPerPage));

        if (page > 1) {
          const prevSnapshot = await getDocs(
            query(collection(db, "Windows-tools"), orderBy("date", "desc"), limit((page - 1) * itemsPerPage))
          );
          const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];
          if (lastVisible) {
            q = query(collection(db, "Windows-tools"), orderBy("date", "desc"), startAfter(lastVisible), limit(itemsPerPage));
          }
        }

        const snapshot = await getDocs(q);
        const toolsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Tool[];

        if (toolsData.length === 0 && page === 1) setError("Database empty.");
        setTools(toolsData);
      } catch (err) {
        console.error(err);
        setError("Connection failure. Unable to retrieve index.");
      } finally {
        setLoading(false);
      }
    }, [itemsPerPage, totalDocs]);

  useEffect(() => {
    fetchTotalDocs().then(() => {
       if (totalDocs > 0) fetchPage(currentPage);
       else if (totalDocs === 0 && !loading) fetchPage(1); 
    });
  }, [totalDocs, fetchTotalDocs, fetchPage, loading]); 
  
  useEffect(() => {
     if(totalDocs > 0) fetchPage(currentPage);
  }, [currentPage, totalDocs, fetchPage]);

  const handlePageChange = (page: number) => router.push(`?page=${page}`);
  const totalPages = Math.ceil(totalDocs / itemsPerPage);

  const handleShare = async (toolId: string, title: string) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/windows-tools/${toolId}` : "";
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); alert("Link copied to clipboard"); }
    } catch {} finally { setOpenMenuId(null); }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col pt-5 px-4 pb-12 transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-slate-200">
      
      {/* --- HEADER BAR --- */}
      <div className="max-w-4xl w-full mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 text-xs font-mono mb-1 text-blue-600 dark:text-cyan-500">
             <Terminal size={14} />
             <span>/root/repository/win_tools</span>
           </div>
           <h1 className="text-2xl font-bold uppercase tracking-tight">Windows Bypass Index</h1>
        </div>
        <div className="px-4 py-2 rounded-lg border font-mono text-xs flex items-center gap-2 bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
           <Database size={14} />
           <span>Total Records: {totalDocs}</span>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {loading ? (
        <SystemScanner />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-70">
           <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
           <p className="font-mono text-red-500">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-lg dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] animate-in slide-in-from-bottom-2 fade-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Thumbnail */}
              <Link href={`/windows-tools/${tool.id}`} className="relative flex-shrink-0 w-full sm:w-24 h-40 sm:h-24">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover rounded-lg border border-slate-500/10"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-white/80 text-blue-600 backdrop-blur dark:bg-black/70 dark:text-cyan-400">
                   WIN
                </div>
              </Link>

              {/* Info Section */}
              <Link href={`/windows-tools/${tool.id}`} className="flex flex-col flex-1 min-w-0 gap-1 w-full">
                <h3 className="text-lg font-bold truncate transition-colors text-slate-800 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                  {tool.title}
                </h3>
                
                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                     <Cpu size={12} className="text-blue-500 dark:text-cyan-500" />
                     {formatPrice(tool.price)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                     <HardDrive size={12} />
                     {tool.size}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500">
                     <Clock size={12} />
                     {formatDate(tool.date)}
                  </div>
                </div>
              </Link>

              {/* Action Menu */}
              <div className="absolute top-3 right-3 sm:relative sm:top-0 sm:right-0">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(tool.id); }}
                  className="p-2 rounded-lg transition-colors hover:bg-slate-100 text-slate-600 dark:hover:bg-slate-800 dark:text-slate-400"
                >
                  <MoreVertical size={20} />
                </button>
                
                {openMenuId === tool.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                    <div className="absolute right-0 top-10 z-20 w-48 rounded-lg border shadow-xl p-1 animate-in zoom-in-95 bg-white border-slate-200 dark:bg-[#0f0f0f] dark:border-slate-700">
                       <button onClick={() => handleShare(tool.id, tool.title)} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors hover:bg-slate-50 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-300">
                          <Share2 size={14} /> Share Link
                       </button>
                       <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors hover:bg-red-50 text-red-600 dark:hover:bg-red-900/20 dark:text-red-400">
                          <Flag size={14} /> Report Issue
                       </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PAGINATION (Sector Navigation) --- */}
      {!loading && !error && tools.length > 0 && (
        <div className="flex flex-wrap justify-center mt-12 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all bg-white border-slate-200 text-slate-600 disabled:opacity-30 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
          >
            <ChevronLeft size={16} />
            <span className="text-xs font-bold hidden sm:inline">PREV_SECTOR</span>
          </button>

          <div className="flex gap-2 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg border text-sm font-mono font-bold transition-all ${
                  page === currentPage
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md dark:bg-cyan-600 dark:border-cyan-500 dark:shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all bg-white border-slate-200 text-slate-600 disabled:opacity-30 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
          >
            <span className="text-xs font-bold hidden sm:inline">NEXT_SECTOR</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
