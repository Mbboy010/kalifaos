// app/components/windows/Suggestions.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';

// Mock data fallback
const mockSuggestions = [
  { id: '2', title: 'Bypass Pro v2.3', price: 'Free', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
  { id: '3', title: 'UnlockMate v1.5', price: '$14.99', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
  { id: '4', title: 'EasyBypass v3.0', price: '$19.99', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
];

export default function Suggestions({ currentToolId }: { currentToolId: string }) {
  // Replace Firebase with mock suggestions (exclude current tool)
  const suggestions = mockSuggestions
    .filter((tool) => tool.id !== currentToolId)
    .slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">Suggested Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((tool, index) => (
          <div
            key={tool.id}
            className="flex flex-col p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <img
              src={tool.image}
              alt={tool.title}
              width={150}
              height={150}
              className="w-full h-24 object-cover rounded-md mb-3"
            />
            <h3 className="text-base font-semibold text-blue-500">{tool.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Price: {tool.price}</p>
            <Link
              href={`/windows-tools/${tool.id}`}
              className="mt-3 flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Download className="w-5 h-5" />
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}