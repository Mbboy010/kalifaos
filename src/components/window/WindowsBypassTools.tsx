'use client';

import { ArrowRight, MoreVertical, Share2, Flag, X, Terminal, Clock, Cpu, AlertTriangle, ShieldCheck } from 'lucide-react';
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
  date: any;
  image: string;
}

export default function WindowsBypassTools() {
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
            // Size removed from mapping
            date: d.date ?? '',
            image: d.image ?? '',
          };
        });

        toolsData = toolsData
          .sort((a, b) => getTimeFromValue(b.date) - getTimeFromValue(a.date))
          .slice(0, 6); // Showing 6 for a better grid/list balance

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
    <div className={`p-4 rounded-lg border ${isColor ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex gap-4 animate-pulse">
        <div className={`w-14 h-14 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
        <div className="flex-1 space-y-3">
          <div className={`h-3 w-1/2 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
          <div className={`h-2 w-1/4 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full py-12 px-6 transition-all duration-500 ${
      isColor ? 'bg-[#050505] text-slate-300' : 'bg-white text-slate-900'
    }`}>
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="space-y-2">
          <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${isColor ? 'text-cyan-500' : 'text-blue-600'}`}>
            <ShieldCheck size={14} />
            <span>Verified System Utilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Windows <span className={`italic ${isColor ? 'text-white underline decoration-cyan-500/30' : 'text-slate-900'}`}>Bypass</span>
          </h2>
        </div>
        <a href="/windows-tools" className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 group ${isColor ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-blue-600'}`}>
          Tools Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Tools List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          tools.map((tool) => (
            <div
              key={tool.id}
              className={`relative group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                isColor 
                  ? 'bg-[#0c0c0c] border-slate-800/60 hover:border-cyan-500/40 hover:bg-[#111111]' 
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-white hover:shadow-xl'
              }`}
            >
              {/* Image with Tech Frame */}
              <div className={`relative w-16 h-16 shrink-0 rounded-xl p-1 border ${
                isColor ? 'bg-slate-900 border-slate-800 group-hover:border-cyan-500/50' : 'bg-white border-slate-200'
              }`}>
                <img src={tool.image} alt="" className="w-full h-full object-cover rounded-lg transition-all" />
              </div>

              {/* Tool Info */}
              <div className="flex-1 min-w-0">
                <a href={`/windows-tools/${tool.id}`}>
                  <h3 className={`font-bold truncate text-lg ${isColor ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tool.title}
                  </h3>
                </a>
                
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isColor ? 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5' : 'border-blue-200 text-blue-600 bg-blue-50'
                  }`}>
                    {formatPrice(tool.price)}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-medium opacity-40">
                    <Clock size={10} />
                    {formatDate(tool.date)}
                  </div>
                </div>
              </div>

              {/* Interaction Button */}
              <button
                onClick={() => setOpenMenuId(tool.id)}
                className={`p-2 rounded-full transition-all ${
                  isColor ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-200 text-slate-400'
                }`}
              >
                <MoreVertical size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className={`max-w-5xl mx-auto mt-16 p-6 rounded-2xl border border-dashed flex items-center justify-between ${
        isColor ? 'bg-slate-900/20 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-300 text-slate-500'
      }`}>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <Terminal size={14} className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
          <span>SECURE_ACCESS_PROTOCOL: ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase">
          <ShieldCheck size={14} />
          <span>Kalifa Security Verified</span>
        </div>
      </div>

      {/* Bottom Sheet Logic - Kept similar but styled for the new UI */}
      {openMenuId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-end" onClick={() => setOpenMenuId(null)}>
          <div 
            className={`w-full max-w-lg p-8 rounded-t-[2.5rem] border-t-4 animate-in slide-in-from-bottom duration-500 ${
              isColor ? 'bg-[#0a0a0a] border-cyan-600 text-white' : 'bg-white border-blue-600 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
             <div className="w-12 h-1.5 bg-slate-700/30 rounded-full mx-auto mb-8" />
             <h4 className="text-2xl font-black mb-2">Security Options</h4>
             <p className="text-sm opacity-50 mb-8 font-mono">HASH_ID: {openMenuId}</p>

             <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => handleShare(openMenuId!, tools.find(t => t.id === openMenuId)?.title || '')}
                  className={`flex items-center justify-between p-5 rounded-2xl font-bold transition-all ${
                    isColor ? 'bg-slate-900 hover:bg-cyan-600 hover:text-white' : 'bg-slate-100 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  Share Repository <Share2 size={20} />
                </button>
                <button className={`flex items-center justify-between p-5 rounded-2xl font-bold text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all`}>
                  Report Integrity Issue <Flag size={20} />
                </button>
             </div>
             <button onClick={() => setOpenMenuId(null)} className="w-full mt-6 py-4 text-sm font-bold opacity-40 hover:opacity-100 transition-opacity">
                CLOSE INTERFACE
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
