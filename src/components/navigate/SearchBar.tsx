'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/server/firebaseApi'; // ✅ using your config

interface SearchBarProps {
  darkMode: boolean;
  open: boolean;
  onClose: () => void;
}

interface ResultItem {
  id: string;
  title: string;
  image: string;
  type: 'window' | 'mobile';
}

export default function SearchBar({ darkMode, open, onClose }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'window' | 'mobile'>('window');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch both collections
  useEffect(() => {
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
          ...(doc.data() as Omit<ResultItem, 'id' | 'type'>),
          type: 'mobile',
        }));

        setResults([...windowsTools, ...mobileTools]);
      } catch (error) {
        console.error('❌ Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent, type: 'window' | 'mobile' = 'window') => {
    e.preventDefault();
    if (!search.trim()) return;
    onClose();
    window.location.href = `/search?query=${encodeURIComponent(search)}&type=${type}`;
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
    <div className="w-full px-4 pb-3 animate-slide-down">
      {/* Search Input */}
      <form
        onSubmit={(e) => handleSearch(e, activeTab)}
        className="flex items-center bg-gray-800/40 rounded-full px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 placeholder:text-gray-200 bg-transparent outline-none text-sm text-white"
          autoFocus
        />
        <button type="submit">
          <Search className="w-5 text-white h-5 ml-2 " />
        </button>
      </form>
      
      
      
      {/* Bottom Tabs */}
      {search && (
        <div className="flex justify-around my-3 border-b border-gray-600 pb-2">
          <button
            onClick={() => {
              setActiveTab('window');
              handleSearch(new Event('submit') as any, 'window');
            }}
            className={`text-sm px-3 py-1 rounded-md ${
              activeTab === 'window'
                ? 'bg-blue-600 text-white'
                : darkMode
                ? 'text-gray-300'
                : 'text-gray-700'
            }`}
          >
            Window FRP Tools ({windowCount})
          </button>
          <button
            onClick={() => {
              setActiveTab('mobile');
              handleSearch(new Event('submit') as any, 'mobile');
            }}
            className={`text-sm px-3 py-1 rounded-md ${
              activeTab === 'mobile'
                ? 'bg-blue-600 text-white'
                : darkMode
                ? 'text-gray-300'
                : 'text-gray-700'
            }`}
          >
            Mobile FRP Tools ({mobileCount})
          </button>
        </div>
      )}

      {/* Results */}
      {search && (
        <div className="mt-3 rounded-lg p-3 space-y-2 max-h-60 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-center text-gray-400">Loading...</p>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-black/20 space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))
          ) : (
            <p
              className={`text-sm text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              No results found
            </p>
          )}
        </div>
      )}


      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}