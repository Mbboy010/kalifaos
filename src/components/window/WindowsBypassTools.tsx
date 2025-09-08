'use client';

import { ArrowRight, MoreVertical, Share2, Flag, X } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

// Firebase imports
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';

interface Tool {
  id: string;
  title: string;
  price: any;
  size: string;
  date: any;
  image: string;
}

export default function WindowsBypassTools() {
  const isColor = useAppSelector((state) => state.color.value);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper: convert various date representations to millis
  const getTimeFromValue = (v: any): number => {
    if (!v) return 0;
    if (typeof v?.toDate === 'function') {
      try {
        return v.toDate().getTime();
      } catch {
        return 0;
      }
    }
    if (typeof v === 'object' && typeof v.seconds === 'number') {
      return v.seconds * 1000 + Math.floor((v.nanoseconds || 0) / 1e6);
    }
    if (typeof v === 'number' && !Number.isNaN(v)) return v;
    const t = new Date(String(v)).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  // Price formatting (₦) and Free when 0
  const formatPrice = (price: any) => {
    if (price === undefined || price === null || price === '') return '';
    const raw = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.-]+/g, ''));
    if (Number.isNaN(raw)) return String(price);
    if (raw === 0) return 'Free';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(raw);
  };

  // WhatsApp-style relative date
  const formatDate = (value: any) => {
    const now = Date.now();
    const then = getTimeFromValue(value);
    if (!then) return '';
    const diffSec = Math.floor((now - then) / 1000);

    if (diffSec < 5) return 'now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const minutes = Math.floor(diffSec / 60);
    if (minutes < 60) return `${minutes}min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  };

  // Fetch from Firestore: sort newest first and keep only latest 5
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Windows-tools'));
        let toolsData: Tool[] = querySnapshot.docs.map((doc) => {
          const d = doc.data() as any;
          return {
            id: doc.id,
            title: d.title ?? '',
            price: d.price ?? '',
            size: d.size ?? '',
            date: d.date ?? '',
            image: d.image ?? '',
          } as Tool;
        });

        toolsData = toolsData
          .sort((a, b) => getTimeFromValue(b.date) - getTimeFromValue(a.date))
          .slice(0, 5);

        setTools(toolsData);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleShare = async (toolId: string, title: string) => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/windows-tools/${toolId}`
        : `/windows-tools/${toolId}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      } else {
        alert(url);
      }
    } catch {
      // cancelled
    } finally {
      setOpenMenuId(null);
    }
  };

  useEffect(() => {
    if (openMenuId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openMenuId]);

  const handleReport = (toolId: string) => {
    alert(`Thanks, your report for item ${toolId} has been noted.`);
    setOpenMenuId(null);
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div
      className="flex items-center gap-4 p-4 rounded-lg shadow-md"
      style={{
        backgroundColor: isColor ? '#d7d7d719' : '#72727236',
      }}
    >
      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="absolute right-2 top-3">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center w-full mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-left">
          Window Bypass Tools
        </h2>
      </div>

      {/* Tools List or Skeleton */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {loading ? (
          // Render 5 skeleton cards during loading
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : tools.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No tools available.</p>
        ) : (
          tools.map((tool, index) => (
            <div
              key={tool.id}
              className="relative flex items-center gap-4 p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
              style={{
                backgroundColor: isColor ? '#d7d7d719' : '#72727236',
                animationDelay: `${(index + 1) * 100}ms`,
              }}
            >
              <Link
                href={`/windows-tools/${tool.id}`}
                className="flex items-center gap-4 flex-1"
              >
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-base font-semibold truncate">
                    {tool.title}
                  </h3>
                  <p className="text-sm">Price: {formatPrice(tool.price)}</p>
                  <p className="text-sm">Size: {tool.size}</p>
                  <p className="text-sm">Date: {formatDate(tool.date)}</p>
                </div>
              </Link>

              {/* 3-dots menu top-right */}
              <div className="absolute right-2 top-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(tool.id);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === tool.id}
                  className="p-2 rounded-full focus:outline-none"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Modal */}
      {openMenuId && (
        <div
          onClick={() => setOpenMenuId(null)}
          className="fixed inset-0 bg-black/40 z-40 flex justify-center items-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isColor ? '#76767625' : '#ffffff3f',
            }}
            className="w-full shadow-md backdrop-blur-md max-w-md rounded-t-2xl border-t border-blue-500 p-4 animate-slide-up"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-sm">Options</h4>
              <button
                onClick={() => setOpenMenuId(null)}
                className="p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => {
                handleShare(
                  openMenuId!,
                  tools.find((t) => t.id === openMenuId)?.title || ''
                );
              }}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => handleReport(openMenuId!)}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded"
            >
              <Flag className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>
      )}

      {/* See More */}
      <div className="mt-8 flex justify-start max-w-4xl w-full mx-auto">
        <Link
          href="/windows-tools?list_page=1"
          className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
        >
          <ArrowRight className="w-5 h-5" />
          See More
        </Link>
      </div>

      {/* Disclaimer */}
      <div
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
        className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg text-xs sm:text-sm max-w-3xl w-full mx-auto border border-gray-700"
      >
        <p>
          Use these tools responsibly and only on devices you legally own.
          Kalifa OS is not responsible for any misuse or device issues.
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}