'use client';

import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';

export default function WinContentSkeleton() {
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="flex flex-col pt-20 p-6">
      {/* Tools List Skeleton */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative flex items-center gap-4 p-4 rounded-lg shadow-md animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

            {/* Text Content Placeholder */}
            <div className="flex flex-col flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* 3-dots Menu Placeholder */}
            <div className="absolute right-2 top-3">
              <div className="p-2 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-300 dark:text-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-6 space-x-2">
        <div
          className="px-3 py-2 rounded-full border flex items-center bg-gray-300 dark:bg-gray-700 animate-pulse"
          style={{
            backgroundColor: isColor ? '#d7d7d719' : '#72727236',
          }}
        >
          <ChevronLeft className="w-4 h-4 text-gray-300 dark:text-gray-700" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-full border bg-gray-300 dark:bg-gray-700 animate-pulse"
            style={{
              backgroundColor: isColor ? '#d7d7d719' : '#72727236',
            }}
          ></div>
        ))}

        <div
          className="px-3 py-2 rounded-full border flex items-center bg-gray-300 dark:bg-gray-700 animate-pulse"
          style={{
            backgroundColor: isColor ? '#d7d7d719' : '#72727236',
          }}
        >
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700" />
        </div>
      </div>

      {/* Disclaimer Skeleton */}
      <div
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
        className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg max-w-3xl w-full mx-auto border border-gray-700 animate-pulse"
      >
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
      </div>
    </div>
  );
}