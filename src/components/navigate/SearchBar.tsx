'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  darkMode: boolean;
  open: boolean;
  onClose: () => void;
}

interface ResultItem {
  id: number;
  title: string;
  image: string;
}

const dummyResults: ResultItem[] = [
  { id: 1, title: 'Samsung FRP Tool', image: 'https://source.unsplash.com/80x80/?samsung,phone' },
  { id: 2, title: 'Infinix System App Remover', image: 'https://source.unsplash.com/80x80/?infinix,android' },
  { id: 3, title: 'Tecno Windows Bypass Tool', image: 'https://source.unsplash.com/80x80/?windows,computer' },
  { id: 4, title: 'Universal Lock Screen Fixer', image: 'https://source.unsplash.com/80x80/?lock,security' },
];

export default function SearchBar({ darkMode, open, onClose }: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    onClose();
    window.location.href = `/search?query=${encodeURIComponent(search)}`;
  };

  const filteredResults = dummyResults.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="w-full px-4 pb-3 animate-slide-down">
      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 bg-transparent outline-none text-sm ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
          autoFocus
        />
        <button type="submit">
          <Search className="w-5 h-5 ml-2" />
        </button>
      </form>

      {/* Results */}
      {search && (
        <div className="mt-3 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 space-y-2 max-h-60 overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
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