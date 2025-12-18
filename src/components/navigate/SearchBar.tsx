'use client';

import { Search, Download, HardDrive, Smartphone, Package, Loader2, Terminal, ChevronRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { useRouter, usePathname } from 'next/navigation';

interface SearchBarProps {
  darkMode: boolean;
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

export default function SearchBar({ darkMode, open, onClose }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'window' | 'mobile'>('window');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Close search when route changes
  useEffect(() => {
    if (open) onClose();
  }, [pathname]);

  // Fetch Data
  useEffect(() => {
    if (!open) return; // Only fetch when opened

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

  if (!open) return null;

  return (
    <div className={`w-full px-4 py-4 border-b shadow-lg animate-in slide-in-from-top-2 duration-300 ${
      darkMode 
        ? 'bg-[#0a0a0a] border-slate-800' 
        : 'bg-white border-slate-200'
    }`}>
      
      {/* --- COMMAND INPUT --- */}
      <form
        onSubmit={(e) => handleSearch(e, activeTab)}
        className={`flex items-center rounded-lg border px-3 py-3 mb-4 transition-all focus-within:ring-1 ${
          darkMode 
            ? 'bg-slate-900 border-slate-700 focus-within:border-cyan-500 focus-within:ring-cyan-500/30' 
            : 'bg-slate-50 border-slate-300 focus-within:border-blue-500 focus-within:ring-blue-500/30'
        }`}
      >
        <Terminal className={`w-5 h-5 mr-3 ${darkMode ? 'text-cyan-500' : 'text-slate-500'}`} />
        <input
          type="text"
          placeholder="Enter command or search keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 bg-transparent outline-none text-sm font-mono ${
            darkMode ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'
          }`}
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
                ? darkMode ? 'bg-cyan-900/20 border-cyan-500 text-cyan-400' : 'bg-blue-100 border-blue-500 text-blue-700'
                : darkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <HardDrive size={14} />
            Win_Tools <span className="opacity-50">[{windowCount}]</span>
          </button>
          
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-md border transition-all ${
              activeTab === 'mobile'
                 ? darkMode ? 'bg-cyan-900/20 border-cyan-500 text-cyan-400' : 'bg-blue-100 border-blue-500 text-blue-700'
                 : darkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <Smartphone size={14} />
            Mobile_Pkg <span className="opacity-50">[{mobileCount}]</span>
          </button>
        </div>
      )}

      {/* --- QUERY RESULTS --- */}
      {search && (
        <div className={`rounded-xl border max-h-[60vh] overflow-y-auto custom-scrollbar ${
          darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 opacity-50">
               <Loader2 className={`w-6 h-6 animate-spin mb-2 ${darkMode ? 'text-cyan-500' : 'text-blue-500'}`} />
               <span className="text-xs font-mono">Accessing Database...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="divide-y divide-slate-800/50">
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
                  className={`group flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    darkMode 
                      ? 'hover:bg-slate-800/80 text-slate-300 hover:text-white' 
                      : 'hover:bg-white text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon / Image */}
                    {item.type === 'window' ? (
                      <div className={`w-10 h-10 rounded overflow-hidden flex-shrink-0 border ${
                        darkMode ? 'border-slate-700' : 'border-slate-200'
                      }`}>
                         {item.image ? (
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-slate-800">
                             <HardDrive size={18} />
                           </div>
                         )}
                      </div>
                    ) : (
                      <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${
                        darkMode ? 'bg-slate-800 text-green-500' : 'bg-green-100 text-green-600'
                      }`}>
                        <Package size={20} />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold line-clamp-1">{item.title}</span>
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider">
                        {item.type === 'window' ? 'Utility Software' : 'Flash File'}
                      </span>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className={`p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 ${
                    darkMode ? 'bg-cyan-900/30 text-cyan-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.type === 'window' ? <ChevronRight size={16} /> : <Download size={16} />}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className={`text-sm font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Result: 0 records found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
