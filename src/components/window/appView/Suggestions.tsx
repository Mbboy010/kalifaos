'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';

interface Tool {
  id: string;
  title: string;
  priceType: 'Free' | 'Paid';
  price?: number;
  image?: string;
}

export default function Suggestions({ currentToolId }: { currentToolId: string }) {
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Windows-tools'));
        let tools: Tool[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Tool, 'id'>), // ✅ Fix duplicate `id`
        }));

        // Exclude the current tool
        tools = tools.filter((tool) => tool.id !== currentToolId);

        // Shuffle and take 5
        tools = tools.sort(() => Math.random() - 0.5).slice(0, 5);

        setSuggestions(tools);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentToolId]);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Suggested Tools</h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-[180px] h-[200px] flex-shrink-0 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Suggested Tools</h2>

      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {suggestions.map((tool, index) => (
          <Link
            key={tool.id}
            href={`/windows-tools/${tool.id}`}
            className=" h-[200px] flex-shrink-0 flex flex-col items-center justify-between p-2 rounded-xl shadow-m hover:shadow-lg hover:-translate-y-1 transition-all animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <img
              src={tool.image || '/default-tool.png'}
              alt={tool.title}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="text-left w-full mt-2">
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 truncate">
                {tool.title}
              </h3>
              <p className="text-xs">
                {tool.priceType === 'Free'
                  ? 'Free'
                  : `₦${tool.price?.toLocaleString() || '0'}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}