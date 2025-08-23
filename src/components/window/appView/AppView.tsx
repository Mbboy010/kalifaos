

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import Suggestions from './Suggestions';
import Comments from './Comments';
import { ArrowLeft, Download } from 'lucide-react';

// Mock tool data fallback
const mockTool = {
  id: '1',
  title: 'Windows FRP Tool v1.0',
  price: '$9.99',
  size: '25 MB',
  date: '2025-01-15',
  description:
    'A powerful tool to bypass Factory Reset Protection on Windows devices, compatible with Windows 10 and 11. Features an intuitive interface and step-by-step guides.',
  image: 'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop',
};

// Mock comments data
const mockComments = [
  {
    id: 'c1',
    userName: 'John Doe',
    comment: 'Great tool! Worked perfectly on my laptop.',
    timestamp: '2025-01-20',
  },
  {
    id: 'c2',
    userName: 'Alice',
    comment: 'Easy to use and saved me a lot of time.',
    timestamp: '2025-01-22',
  },
];


export default function AppView() {
  const { contentId } = useParams<{ contentId: string }>();

  // Replace Firebase fetch with local mock (for now)
  const tool = mockTool;

  if (!tool) {
    notFound();
  }

  const comments = mockComments;

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto">
    <h1 className="w-1 h-1 mt-20"></h1>
      {/* Back Link */}
      <Link
        href="/windows-tools"
        className="flex items-center gap-2 text-blue-500 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Windows Tools
      </Link>

      {/* Tool Details */}
      <div className="flex flex-col md:flex-row gap-6 rounded-lg shadow-md p-6 border border-gray-300 dark:border-gray-700 bg-[#72727236] dark:bg-[#d7d7d719]">
        <img
          src={tool.image}
          alt={tool.title}
          width={300}
          height={300}
          className="w-full md:w-1/3 h-48 md:h-64 object-cover rounded-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">
            {tool.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Price: {tool.price}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Size: {tool.size}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Date: {tool.date}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {tool.description}
          </p>
          <Link
            href={`/windows-tools/${tool.id}/download`}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <Download className="w-5 h-5" />
            Download Now
          </Link>
        </div>
      </div>

      {/* Suggestions */}
      <Suggestions currentToolId={contentId} />

      {/* Comments */}
      <Comments comments={comments} toolId={contentId} />

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg text-center text-sm border border-gray-300 dark:border-gray-700 bg-[#72727236] dark:bg-[#d7d7d719]">
        <p>
          Use this tool responsibly and only on devices you legally own. Kalifa
          OS is not responsible for any misuse or device issues.
        </p>
      </div>
    </div>
  );
}