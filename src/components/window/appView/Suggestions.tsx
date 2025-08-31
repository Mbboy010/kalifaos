// app/components/windows/Suggestions.tsx
import Link from 'next/link';

// Mock data fallback
const mockSuggestions = [
  { id: '2', title: 'Bypass Pro v2.3', price: 'Free', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
  { id: '3', title: 'UnlockMate v1.5', price: '$14.99', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
  { id: '4', title: 'EasyBypass v3.0', price: '$19.99', image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop' },
];

export default function Suggestions({ currentToolId }: { currentToolId: string }) {
  const suggestions = mockSuggestions
    .filter((tool) => tool.id !== currentToolId)
    .slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Suggested Tools</h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {suggestions.map((tool, index) => (
          <Link
            key={tool.id}
            href={`/windows-tools/${tool.id}`}
            className="w-[200px] h-[200px] flex-shrink-0 flex flex-col items-center justify-between p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <img
              src={tool.image}
              alt={tool.title}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="text-left w-full">
              <h3 className="text-sm font-semibold text-blue-500">{tool.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Price: {tool.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}