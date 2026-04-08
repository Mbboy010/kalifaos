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
  getCountFromServer, // Faster than fetching all docs
} from "firebase/firestore";

type Tool = {
  id: string;
  title: string;
  price: string;
  size: string;
  date: string;
  image: string;
};

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

  useEffect(() => { setMounted(true); }, []);

  // 1. Fetch metadata (Total Count) - Run once on mount
  useEffect(() => {
    async function initMetadata() {
      try {
        const coll = collection(db, "Windows-tools");
        const snapshot = await getCountFromServer(coll);
        setTotalDocs(snapshot.data().count);
      } catch (e) {
        console.error("Metadata Sync Error:", e);
      }
    }
    initMetadata();
  }, []);

  // 2. Fetch specific page data - Triggered by currentPage or totalDocs changes
  const fetchPage = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      // Validate page range once totalDocs is known
      const totalPages = Math.ceil(totalDocs / itemsPerPage);
      if (totalDocs > 0 && page > totalPages) {
        setTools([]);
        setError("Sector empty: Target out of bounds.");
        setLoading(false);
        return;
      }

      let q = query(
        collection(db, "Windows-tools"), 
        orderBy("date", "desc"), 
        limit(itemsPerPage)
      );

      // Pagination Logic
      if (page > 1) {
        const prevSnapshot = await getDocs(
          query(
            collection(db, "Windows-tools"), 
            orderBy("date", "desc"), 
            limit((page - 1) * itemsPerPage)
          )
        );
        const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];
        if (lastVisible) {
          q = query(
            collection(db, "Windows-tools"), 
            orderBy("date", "desc"), 
            startAfter(lastVisible), 
            limit(itemsPerPage)
          );
        }
      }

      const snapshot = await getDocs(q);
      const toolsData = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Tool[];

      if (toolsData.length === 0 && page === 1 && totalDocs > 0) {
          setError("Database empty or records archived.");
      }
      
      setTools(toolsData);
    } catch (err) {
      console.error(err);
      setError("Connection failure. Repository unreachable.");
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage, totalDocs]);

  // Main Trigger Effect: Runs when page changes or count is loaded
  useEffect(() => {
    if (mounted) {
        fetchPage(currentPage);
    }
  }, [currentPage, totalDocs, fetchPage, mounted]);

  // UI Utilities
  const formatPrice = (price: string) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    return num === 0 ? "Free" : new Intl.NumberFormat("en-NG", {
      style: "currency", currency: "NGN", minimumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    const days = Math.floor(diff / (3600 * 24));
    if (days < 30) return days === 0 ? "Today" : `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const handlePageChange = (page: number) => router.push(`?page=${page}`);
  const totalPages = Math.ceil(totalDocs / itemsPerPage);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col pt-5 px-4 pb-12 transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-slate-200">
      
      {/* HEADER */}
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
           <span>Live Records: {totalDocs}</span>
        </div>
      </div>

      {/* DATA VIEW */}
      {loading ? (
        <SystemScanner />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-70">
           <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
           <p className="font-mono text-red-500">{error}</p>
           <button onClick={() => fetchPage(currentPage)} className="mt-4 text-xs underline font-mono">Retry Connection</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
          {tools.length === 0 ? (
            <div className="text-center py-10 font-mono opacity-50 text-sm">NO DATA DETECTED IN SECTOR</div>
          ) : (
            tools.map((tool, index) => (
              <div
                key={tool.id}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-cyan-500/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/windows-tools/${tool.id}`} className="relative flex-shrink-0 w-full sm:w-24 h-40 sm:h-24">
                  <img src={tool.image} alt={tool.title} className="w-full h-full object-cover rounded-lg border border-slate-500/10" />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/80 text-blue-600 dark:bg-black/70 dark:text-cyan-400">WIN</div>
                </Link>

                <Link href={`/windows-tools/${tool.id}`} className="flex flex-col flex-1 min-w-0 gap-1 w-full">
                  <h3 className="text-lg font-bold truncate transition-colors text-slate-800 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                    {tool.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                       <Cpu size={12} className="text-blue-500 dark:text-cyan-500" /> {formatPrice(tool.price)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                       <HardDrive size={12} /> {tool.size}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500">
                       <Clock size={12} /> {formatDate(tool.date)}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border disabled:opacity-30 dark:border-slate-800"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg border font-mono text-sm ${
                  page === currentPage ? 'bg-blue-600 text-white dark:bg-cyan-600' : 'bg-transparent'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border disabled:opacity-30 dark:border-slate-800"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
