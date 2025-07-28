// app/not-found.tsx
'use client';

import { Frown, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux/hooks';


export default function NotCon() {
  const router = useRouter();
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* 404 text with animated zero */}
      <div className="text-center mt-16 mb-8 animate-fade-in">
        <h1 className="text-9xl font-bold relative">
          4
          <span className="inline-block text-blue-600 animate-bounce">0</span>
          4
        </h1>
      </div>

      {/* Message section */}
      <div className="text-center max-w-md mb-10 animate-fade-in animation-delay-100">
        <div className="flex justify-center mb-4">
          <Frown className="w-12 h-12 text-yellow-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Oops! Page Not Found</h2>
        <p className="mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-200">
        <button
          onClick={() => router.back()}
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>

      {/* Additional help */}
      <div className="mt-12 text-center text-sm animate-fade-in animation-delay-300">
        <p>
          Need help?{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}