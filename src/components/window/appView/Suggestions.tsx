'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';
import { useAppSelector } from '../../redux/hooks'; // Adjust path if needed
import { Package, ArrowUpRight, Zap, Loader2, Link as LinkIcon } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  priceType: 'Free' | 'Paid';
  price?: number;
  image?: string;
}

export default function Suggestions({ currentToolId }: { currentToolId: string }) {
  const isColor = useAppSelector((state) => state.color.value);
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Windows-tools'));
        let tools: Tool[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Tool, 'id'>),
        }));

        // Exclude current & Shuffle
        tools = tools.filter((tool) => tool.id !== currentToolId);
        tools = tools.sort(() => Math.random() - 0.5).slice(0, 4); // Limit to 4 for sidebar

        setSuggestions(tools);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentToolId]);

  // --- SKELETON LOADER ---
  if (loading) {
    return (
      <div className={`rounded-xl p-4 border ${isColor ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <Loader2 className="animate-spin w-4 h-4" />
          <span className="text-xs font-mono">Scanning related nodes...</span>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-16 rounded-lg animate-pulse ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`} />
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
      isColor 
        ? 'bg-[#0f0f0f] border-slate-800' 
        : 'bg-white border-slate-200 shadow-sm'
    }`}>
      
      {/* Header with Decorative Line */}
      <div className={`p-4 border-b ${isColor ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${
            isColor ? 'text-slate-200' : 'text-slate-800'
          }`}>
            <LinkIcon size={14} className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
            Linked Modules
          </h2>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
             isColor ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-500'
          }`}>
            {suggestions.length}
          </span>
        </div>
      </div>

      {/* List Container */}
      <div className="flex flex-col">
        {suggestions.map((tool, index) => (
          <Link
            key={tool.id}
            href={`/windows-tools/${tool.id}`}
            className={`group relative flex items-center gap-4 p-4 border-b last:border-0 transition-all duration-200 ${
              isColor 
                ? 'border-slate-800 hover:bg-slate-900 hover:text-cyan-400' 
                : 'border-slate-100 hover:bg-slate-50 hover:text-blue-600'
            }`}
          >
            {/* Hover Indicator Line (Left) */}
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${
              isColor ? 'bg-cyan-500' : 'bg-blue-600'
            } opacity-0 group-hover:opacity-100`}></div>

            {/* Thumbnail */}
            <div className={`relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border ${
              isColor ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <img
                src={tool.image || '/default-tool.png'}
                alt={tool.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              {/* Type Indicator Dot */}
              <div className={`absolute top-0 right-0 w-3 h-3 rounded-bl-lg flex items-center justify-center ${
                 tool.priceType === 'Free' ? 'bg-green-500' : 'bg-purple-500'
              }`}>
                <Zap size={6} className="text-white" fill="currentColor" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-bold truncate mb-1 transition-colors ${
                isColor ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-blue-700'
              }`}>
                {tool.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <p className={`text-xs font-mono opacity-70 ${
                  isColor ? 'text-slate-500' : 'text-slate-500'
                }`}>
                  {tool.priceType === 'Free' ? 'OPEN_SOURCE' : `LIC: ₦${tool.price?.toLocaleString()}`}
                </p>
                
                {/* Arrow Icon on Hover */}
                <ArrowUpRight 
                  size={14} 
                  className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${
                    isColor ? 'text-cyan-500' : 'text-blue-600'
                  }`} 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer / See All */}
      <div className={`p-2 text-center border-t ${isColor ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
        <Link 
          href="/windows-tools?list_page=1"
          className={`text-[10px] font-bold uppercase tracking-widest hover:underline ${
             isColor ? 'text-slate-500 hover:text-cyan-500' : 'text-slate-500 hover:text-blue-600'
          }`}
        >
          View Full Index
        </Link>
      </div>
    </div>
  );
}
