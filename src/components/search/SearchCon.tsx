'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ToolItem {
  id: string;
  title: string;
  image: string;
  route: string; // ✅ unify type
}

const mockWindowsTools: ToolItem[] = [
  {
    id: '1',
    title: 'Windows FRP Tool v1.0',
    image: 'https://images.unsplash.com/photo-1587202372775-98927a6d68e0?w=800',
    route: '/windows-tools/1',
  },
  {
    id: '2',
    title: 'Bypass Pro v2.3',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800',
    route: '/windows-tools/2',
  },
  {
    id: '3',
    title: 'UnlockMate v1.5',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=800',
    route: '/windows-tools/3',
  },
];

const mockMobileTools: ToolItem[] = [
  {
    id: 'a',
    title: 'Samsung FRP Tool',
    image:
      'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=800&auto=format&fit=crop&q=60',
    route: '/mobile-tools/a',
  },
  {
    id: 'b',
    title: 'Infinix System App Remover',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
    route: '/mobile-tools/b',
  },
  {
    id: 'c',
    title: 'Tecno Windows Bypass Tool',
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=60',
    route: '/mobile-tools/c',
  },
];

export default function SearchCon() {
  const [activeTab, setActiveTab] = useState<'windows' | 'mobile'>('windows');
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 50) {
      setActiveTab('windows'); // swipe right → windows
    } else if (deltaX < -50) {
      setActiveTab('mobile'); // swipe left → mobile
    }
  };

  const tools = activeTab === 'windows' ? mockWindowsTools : mockMobileTools;

  return (
    <div
      className="w-full max-w-2xl mx-auto mt-6 p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tabs */}
      <div className="flex mt-16 justify-between items-center mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'windows'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
          }`}
          onClick={() => setActiveTab('windows')}
        >
          Windows
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'mobile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
          }`}
          onClick={() => setActiveTab('mobile')}
        >
          Mobile
        </button>
      </div>

      {/* Tool List */}
      <div className="space-y-3">
        {tools.map((item) => (
          <Link
            key={item.id}
            href={item.route} // ✅ always works now
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors bg-black/5 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}