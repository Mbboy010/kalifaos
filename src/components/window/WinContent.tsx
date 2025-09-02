// app/components/windows/WindowsBypassTools.tsx
'use client';

import {
  ArrowRight,
  MoreVertical,
  Share2,
  Flag,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

// Firebase
import { db } from '@/server/firebaseApi'; // ensure you have firebase.ts config
import { collection, getDocs } from 'firebase/firestore';

type Tool = {
  id: string;
  title: string;
  price: string;
  size: string;
  date: string;
  image: string;
};

export default function WinContent() {
  const isColor = useAppSelector((state) => state.color.value);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [tools, setTools] = useState<Tool[]>([]);
  const [paginatedTools, setPaginatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Firestore
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Windows-tools'));
        const toolsData: Tool[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tool[];
        setTools(toolsData);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Update pagination slice
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedTools(tools.slice(start, end));
  }, [currentPage, tools]);

  const totalPages = Math.ceil(tools.length / itemsPerPage);

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

  return (
    <div className="flex min-h-screen flex-col pt-20 p-6">
      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-gray-500">Loading tools...</p>
      )}

      {/* Tools List */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {paginatedTools.map((tool, index) => (
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
                <p className="text-sm">Price: {tool.price}</p>
                <p className="text-sm">Size: {tool.size}</p>
                <p className="text-sm">Date: {tool.date}</p>
              </div>
            </Link>

            {/* 3-dots menu */}
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
        ))}
      </div>

      {/* Pagination */}
      {!loading && tools.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-full border disabled:opacity-50 flex items-center"
            style={{
              backgroundColor: isColor ? '#d7d7d719' : '#72727236',
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 rounded-full border transition ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white border-blue-500'
                  : ''
              }`}
              style={{
                backgroundColor: isColor ? '#d7d7d719' : '#72727236',
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-full border disabled:opacity-50 flex items-center"
            style={{
              backgroundColor: isColor ? '#d7d7d719' : '#72727236',
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

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
            className="w-full max-w-md shadow-md backdrop-blur-md rounded-t-2xl border-t border-blue-500 p-4 animate-slide-up"
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
              onClick={() =>
                handleShare(
                  openMenuId!,
                  tools.find((t) => t.id === openMenuId)?.title || ''
                )
              }
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={() => handleReport(openMenuId!)}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded"
            >
              <Flag className="w-4 h-4" /> Report
            </button>
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
}