'use client';

import { ArrowRight, MoreVertical, Share2, Flag, X, Terminal, Clock, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

// Firebase imports
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';

interface Tool {
  id: string;
  title: string;
  price: any;
  size: string;
  date: any;
  image: string;
}

export default function WindowsBypassTools() {
  // Logic: isColor = true (Dark Mode), isColor = false (Light Mode)
  const isColor = useAppSelector((state) => state.color.value);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // --- HELPER FUNCTIONS ---
  const getTimeFromValue = (v: any): number => {
    if (!v) return 0;
    if (typeof v?.toDate === 'function') {
      try { return v.toDate().getTime(); } catch { return 0; }
    }
    if (typeof v === 'object' && typeof v.seconds === 'number') {
      return v.seconds * 1000 + Math.floor((v.nanoseconds || 0) / 1e6);
    }
    if (typeof v === 'number' && !Number.isNaN(v)) return v;
    const t = new Date(String(v)).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  const formatPrice = (price: any) => {
    if (price === undefined || price === null || price === '') return '';
    const raw = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.-]+/g, ''));
    if (Number.isNaN(raw)) return String(price);
    if (raw === 0) return 'FREE_ACCESS';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(raw);
  };

  const formatDate = (value: any) => {
    const now = Date.now();
    const then = getTimeFromValue(value);
    if (!then) return '';
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 5) return 'just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const minutes = Math.floor(diffSec / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Windows-tools'));
        let toolsData: Tool[] = querySnapshot.docs.map((doc) => {
          const d = doc.data() as any;
          return {
            id: doc.id,
            title: d.title ?? '',
            price: d.price ?? '',
            size: d.size ?? '',
            date: d.date ?? '',
            image: d.image ?? '',
          } as Tool;
        });

        toolsData = toolsData
          .sort((a, b) => getTimeFromValue(b.date) - getTimeFromValue(a.date))
          .slice(0, 5);

        setTools(toolsData);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const handleShare = async (toolId: string, title: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/windows-tools/${toolId}` : `/windows-tools/${toolId}`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      }
    } catch { /* cancelled */ } finally { setOpenMenuId(null); }
  };

  const handleReport = (toolId: string) => {
    alert(`Report logged for item ID: ${toolId}`);
    setOpenMenuId(null);
  };

  // --- SKELETON COMPONENT (Cyber Scan Style) ---
  const SkeletonCard = () => (
    <div className={`relative overflow-hidden p-4 rounded-xl border ${
      isColor ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Shimmer Effect */}
      <div className={`absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent`}></div>
      
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-lg ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
        <div className="flex-1 space-y-3">
          <div className={`h-4 w-3/4 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
          <div className="flex gap-2">
            <div className={`h-3 w-16 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
            <div className={`h-3 w-16 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full py-16 px-4 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- HEADER --- */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
          isColor ? 'text-cyan-500' : 'text-blue-600'
        }`}>
          <Terminal size={14} />
          <span>/bin/windows_utilities</span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
          Windows <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Bypass Tools</span>
        </h2>
      </div>

      {/* --- TOOLS LIST --- */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : tools.length === 0 ? (
          <div className={`text-center py-10 rounded-xl border border-dashed ${
            isColor ? 'border-slate-800 text-slate-500' : 'border-slate-300 text-slate-500'
          }`}>
            <AlertTriangle className="mx-auto w-8 h-8 mb-2 opacity-50" />
            No tools currently indexed in database.
          </div>
        ) : (
          tools.map((tool, index) => (
            <div
              key={tool.id}
              className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 animate-fade-in hover:scale-[1.01] ${
                isColor 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/windows-tools/${tool.id}`} className="flex items-center gap-4 flex-1 relative z-10 min-w-0">
                {/* Image Container */}
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border shrink-0 ${
                  isColor ? 'border-slate-700 bg-slate-950' : 'border-slate-100 bg-slate-100'
                }`}>
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Status Dot */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  {/* --- UPDATED TITLE SECTION --- */}
                  <h3 className={`text-base md:text-lg font-bold truncate mb-1 md:mb-2 w-full max-w-[160px] xs:max-w-[200px] sm:max-w-none ${
                    isColor ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {tool.title}
                  </h3>
                  
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono">
                     <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                        isColor ? 'bg-slate-800 text-cyan-400' : 'bg-blue-50 text-blue-600'
                     }`}>
                        <Cpu size={10} className="md:w-3 md:h-3" /> {formatPrice(tool.price)}
                     </span>
                     <span className={`flex items-center gap-1 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                        <HardDrive size={10} className="md:w-3 md:h-3" /> {tool.size}
                     </span>
                     <span className={`flex items-center gap-1 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                        <Clock size={10} className="md:w-3 md:h-3" /> {formatDate(tool.date)}
                     </span>
                  </div>
                </div>
              </Link>

              {/* Action Menu Button */}
              <button
                onClick={(e) => { e.stopPropagation(); setOpenMenuId(tool.id); }}
                className={`p-2 rounded-lg transition-colors z-20 shrink-0 ${
                  isColor 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* --- SEE MORE LINK --- */}
      <div className="max-w-4xl mx-auto mt-8">
        <Link
          href="/windows-tools?list_page=1"
          className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase transition-all ${
            isColor ? 'text-cyan-500 hover:text-cyan-400 hover:tracking-widest' : 'text-blue-600 hover:text-blue-700 hover:tracking-widest'
          }`}
        >
          <span>View Archive</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* --- DISCLAIMER --- */}
      <div className={`mt-12 p-5 rounded-lg border text-xs font-mono max-w-4xl mx-auto ${
        isColor 
          ? 'bg-red-950/10 border-red-900/30 text-red-400/80' 
          : 'bg-orange-50 border-orange-200 text-orange-800'
      }`}>
        <p className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            LEGAL WARNING: All tools provided here are for educational and repair purposes only. 
            Kalifa OS assumes no liability for hardware damage or misuse.
          </span>
        </p>
      </div>

      {/* --- BOTTOM SHEET MODAL --- */}
      {openMenuId && (
        <div
          onClick={() => setOpenMenuId(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-end animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-t-2xl border-t p-6 animate-in slide-in-from-bottom duration-300 ${
              isColor 
                ? 'bg-[#0f0f0f] border-cyan-500/50 text-slate-200 shadow-[0_-5px_30px_rgba(0,0,0,0.8)]' 
                : 'bg-white border-blue-500 text-slate-900 shadow-2xl'
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-bold text-lg">Tool Options</h4>
                <p className="text-xs font-mono opacity-50">ID: {openMenuId}</p>
              </div>
              <button onClick={() => setOpenMenuId(null)} className="p-2 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="space-y-3">
              <button
                onClick={() => handleShare(openMenuId!, tools.find((t) => t.id === openMenuId)?.title || '')}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all ${
                  isColor ? 'bg-slate-900 hover:bg-cyan-900/20 hover:text-cyan-400' : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Share2 className="w-5 h-5" />
                Share Link
              </button>
              
              <button
                onClick={() => handleReport(openMenuId!)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all ${
                  isColor ? 'bg-slate-900 hover:bg-red-900/20 hover:text-red-400' : 'bg-slate-100 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Flag className="w-5 h-5" />
                Report Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
