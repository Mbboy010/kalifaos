'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ArrowRight, MoreVertical, Share2, Flag, Terminal, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Firebase imports
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';

interface Tool {
  id: string;
  title: string;
  price: any;
  date: any;
  image: string;
}

export default function WindowsBypassTools() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // --- HYDRATION FIX ---
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (raw === 0) return 'COMMUNITY_ACCESS';
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
    if (diffSec < 60) return `${diffSec}s ago`;
    const minutes = Math.floor(diffSec / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
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
            date: d.date ?? '',
            image: d.image ?? '',
          };
        });

        toolsData = toolsData
          .sort((a, b) => getTimeFromValue(b.date) - getTimeFromValue(a.date))
          .slice(0, 6); 

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

  // --- UI COMPONENTS ---
  const SkeletonCard = () => (
    <div className="p-8 rounded-[2rem] border bg-white border-slate-200 dark:bg-slate-900/40 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row gap-8 animate-pulse items-center sm:items-start">
        <div className="w-40 h-40 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800"></div>
        <div className="flex-1 w-full space-y-5 pt-2">
          <div className="h-6 w-3/4 mx-auto sm:mx-0 rounded bg-slate-100 dark:bg-slate-800"></div>
          <div className="h-4 w-1/2 mx-auto sm:mx-0 rounded bg-slate-100 dark:bg-slate-800"></div>
          <div className="h-10 w-1/3 mx-auto sm:mx-0 rounded-full bg-slate-100 dark:bg-slate-800 mt-4"></div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="w-full py-24 px-6 md:px-12 transition-all duration-500 bg-white text-slate-900 dark:bg-[#050505] dark:text-slate-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-blue-600 dark:text-cyan-500">
            <ShieldCheck size={20} />
            <span>Verified System Utilities</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Windows <br className="hidden md:block"/> 
            <span className="italic text-slate-900 dark:text-white dark:underline dark:decoration-cyan-500/30">Bypass</span>
          </h2>
        </div>
        <a href="/windows-tools" className="text-base font-bold uppercase tracking-widest flex items-center gap-3 group text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-cyan-400 pb-2">
          Tools Archive <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </a>
      </div>

      {/* Tools List Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          tools.map((tool) => (
            <div
              key={tool.id}
              className="relative group flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-[2.5rem] border transition-all duration-500 bg-slate-50 border-slate-200 hover:border-blue-500/50 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] dark:bg-[#0c0c0c] dark:border-slate-800/60 dark:hover:border-cyan-500/50 dark:hover:bg-[#111111] dark:hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.1)]"
            >
              {/* Interaction Button - Absolute Positioned */}
              <button
                onClick={() => setOpenMenuId(tool.id)}
                className="absolute top-6 right-6 p-3 rounded-full transition-all bg-white shadow-sm hover:bg-blue-50 text-slate-400 hover:text-blue-600 dark:bg-black/50 dark:hover:bg-cyan-500/10 dark:text-slate-500 dark:hover:text-cyan-400 z-10"
              >
                <MoreVertical size={24} />
              </button>

              {/* Large Image with Tech Frame */}
              <div className="relative w-40 h-40 shrink-0 rounded-[1.5rem] p-2 border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:group-hover:border-cyan-500/50 transition-colors duration-500 shadow-inner">
                <img src={tool.image} alt={tool.title} className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" />
              </div>

              {/* Tool Info Content */}
              <div className="flex-1 w-full flex flex-col justify-center text-center sm:text-left pt-2 pr-0 sm:pr-12">
                <a href={`/windows-tools/${tool.id}`} className="block mb-4">
                  <h3 className="font-black text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {tool.title}
                  </h3>
                </a>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-auto">
                  <span className="text-sm font-mono font-bold px-4 py-2 rounded-full border border-blue-200 text-blue-700 bg-blue-100/50 dark:border-cyan-500/30 dark:text-cyan-300 dark:bg-cyan-500/10 shadow-sm">
                    {formatPrice(tool.price)}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold opacity-50 bg-slate-200/50 dark:bg-slate-800/50 px-4 py-2 rounded-full">
                    <Clock size={16} />
                    {formatDate(tool.date)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer System Info */}
      <div className="max-w-7xl mx-auto mt-24 p-8 md:p-10 rounded-[2rem] border-2 border-dashed flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 border-slate-300 text-slate-500 dark:bg-slate-900/20 dark:border-slate-800">
        <div className="flex items-center gap-4 text-sm font-mono font-bold">
          <Terminal size={20} className="text-blue-600 dark:text-cyan-500" />
          <span>SECURE_ACCESS_PROTOCOL: ACTIVE</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-mono font-bold uppercase">
          <ShieldCheck size={20} />
          <span>Kalifa Security Verified</span>
        </div>
      </div>

      {/* Expanded Bottom Sheet Options Interface */}
      {openMenuId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-end" onClick={() => setOpenMenuId(null)}>
          <div 
            className="w-full max-w-2xl p-10 md:p-14 rounded-t-[3rem] border-t-4 animate-in slide-in-from-bottom duration-500 bg-white border-blue-600 text-slate-900 dark:bg-[#0a0a0a] dark:border-cyan-500 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="w-20 h-2 bg-slate-300 dark:bg-slate-800 rounded-full mx-auto mb-12" />
             <h4 className="text-4xl font-black mb-4 tracking-tight">Security Options</h4>
             <p className="text-base opacity-50 mb-12 font-mono tracking-tight bg-slate-100 dark:bg-slate-900 inline-block px-4 py-2 rounded-lg">
                HASH_ID: {openMenuId}
             </p>

             <div className="grid grid-cols-1 gap-5">
                <button 
                  onClick={() => handleShare(openMenuId!, tools.find(t => t.id === openMenuId)?.title || '')}
                  className="flex items-center justify-between p-6 md:p-8 rounded-2xl text-xl font-black transition-all bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-900 dark:hover:bg-cyan-500 dark:hover:text-black group"
                >
                  Share Application <Share2 size={28} className="group-hover:scale-110 transition-transform" />
                </button>
                <button className="flex items-center justify-between p-6 md:p-8 rounded-2xl text-xl font-black text-red-500 border-2 border-red-500/20 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all group">
                  Report Integrity Issue <Flag size={28} className="group-hover:scale-110 transition-transform" />
                </button>
             </div>
             <button onClick={() => setOpenMenuId(null)} className="w-full mt-10 py-6 text-base font-black tracking-widest opacity-40 hover:opacity-100 transition-opacity uppercase">
                CLOSE INTERFACE
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
