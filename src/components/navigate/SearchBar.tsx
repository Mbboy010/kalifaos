'use client';

import { Search, Download, HardDrive, Smartphone, Package, Loader2, Terminal, ChevronRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes'; // Added next-themes

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

interface ResultItem {
  id: string;
  title: string;
  image?: string;
  type: 'window' | 'mobile';
  download?: string;
}

export default function SearchBar({ open, onClose }: SearchBarProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'window' | 'mobile'>('window');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (open) onClose();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [windowsSnap, mobileSnap] = await Promise.all([
          getDocs(collection(db, 'Windows-tools')),
          getDocs(collection(db, 'download')),
        ]);

        const windowsTools: ResultItem[] = windowsSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ResultItem, 'id' | 'type'>),
          type: 'window',
        }));

        const mobileTools: ResultItem[] = mobileSnap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          download: doc.data().download,
          type: 'mobile',
        }));

        setResults([...windowsTools, ...mobileTools]);
      } catch (error) {
        console.error('System Error: Database Unreachable', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  if (!open || !mounted) return null;

  const handleSearch = (e: React.FormEvent, type: 'window' | 'mobile' = 'window') => {
    e.preventDefault();
    if (!search.trim()) return;
    onClose();
    router.push(`/search?query=${encodeURIComponent(search)}&type=${type}`);
  };

  const filteredResults = results.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      item.type === activeTab
  );

  const windowCount = results.filter(
    (i) => i.title.toLowerCase().includes(search.toLowerCase()) && i.type === 'window'
  ).length;

  const mobileCount = results.filter(
    (i) => i.title.toLowerCase().includes(search.toLowerCase()) && i.type === 'mobile'
  ).length;

  return (
    <div className="w-full px-4 py-4 border-b shadow-lg animate-in slide-in-from-top-2 duration-300 
                    bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-slate-800">
      
      {/* --- COMMAND INPUT --- */}
      <form
        onSubmit={(e) => handleSearch(e, activeTab)}
        className="flex items-center rounded-lg border px-3 py-3 mb-4 transition-all focus-within:ring-1 
                   bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 
                   focus-within:border-blue-500 dark:focus-within:border-cyan-500 
                   focus-within:ring-blue-500/30 dark:focus-within:ring-cyan-500/30"
      >
        <Terminal className={`w-5 h-5 mr-3 ${isDark ? 'text-cyan-500' : 'text-slate-500'}`} />
        <input
          type="text"
          placeholder="Enter command or search keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm font-mono 
                     text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
          autoFocus
        />
        {search && (
          <button type="button" onClick={() => setSearch('')} className="text-slate-500 hover:text-red-500">
             <X size={16} />
          </button>
        )}
      </form>

      {/* --- SYSTEM TABS --- */}
      {search && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('window')}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-md border transition-all ${
              activeTab === 'window'
                ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-cyan-900/20 dark:border-cyan-500 dark:text-cyan-400'
                : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            <HardDrive size={14} />
            Win_Tools <span className="opacity-50">[{windowCount}]</span>
          </button>
          
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-md border transition-all ${
              activeTab === 'mobile'
                 ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-cyan-900/20 dark:border-cyan-500 dark:text-cyan-400'
                 : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            <Smartphone size={14} />
            Mobile_Pkg <span className="opacity-50">[{mobileCount}]</span>
          </button>
        </div>
      )}

      {/* --- QUERY RESULTS --- */}
      {search && (
        <div className="rounded-xl border max-h-[60vh] overflow-y-auto custom-scrollbar 
                        bg-slate-50 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 opacity-50">
               <Loader2 className={`w-6 h-6 animate-spin mb-2 ${isDark ? 'text-cyan-500' : 'text-blue-500'}`} />
               <span className="text-xs font-mono dark:text-slate-400">Accessing Database...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'window') {
                      router.push(`/windows-tools/${item.id}`);
                    } else if (item.download) {
                      window.open(item.download, '_blank');
                    }
                  }}
                  className="group flex items-center justify-between p-3 cursor-pointer transition-colors 
                             hover:bg-white text-slate-700 hover:text-blue-600 
                             dark:hover:bg-slate-800/80 dark:text-slate-300 dark:hover:text-white"
                >
                  <div className="flex items-center gap-4">
                    {item.type === 'window' ? (
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                         {item.image ? (
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                             <HardDrive size={18} />
                           </div>
                         )}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 
                                      bg-green-100 text-green-600 dark:bg-slate-800 dark:text-green-500">
                        <Package size={20} />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold line-clamp-1">{item.title}</span>
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider">
                        {item.type === 'window' ? 'Utility Software' : 'Flash File'}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 
                                  bg-blue-100 text-blue-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                    {item.type === 'window' ? <ChevronRight size={16} /> : <Download size={16} />}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-mono text-slate-400 dark:text-slate-500">
                Result: 0 records found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
