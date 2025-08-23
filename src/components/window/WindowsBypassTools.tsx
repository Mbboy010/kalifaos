// app/components/windows/WindowsBypassTools.tsx
'use client';

import { ArrowRight, MoreVertical, Share2, Flag, X } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import { useState,useEffect } from 'react';

const tools = [
  {
    id: '1',
    title: 'Windows FRP Tool v1.0',
    price: 'N15,000',
    size: '25 MB',
    date: '2025-01-15',
    image:
      'https://images.unsplash.com/photo-1755234647026-ecd6f2e6f086?q=80&w=774&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Bypass Pro v2.3',
    price: 'Free',
    size: '15 MB',
    date: '2025-03-22',
    image:
      'https://plus.unsplash.com/premium_photo-1674059169515-d91a32dfda1b?q=80&w=735&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'UnlockMate v1.5',
    price: 'N22,000',
    size: '30 MB',
    date: '2025-05-10',
    image:
      'https://plus.unsplash.com/premium_photo-1674059169486-de3a45461c7e?q=80&w=735&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'EasyBypass v3.0',
    price: 'N30,000',
    size: '40 MB',
    date: '2025-07-01',
    image:
      'https://plus.unsplash.com/premium_photo-1673340684013-db65ff165ddf?q=80&w=1032&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'WinLock Remover v1.2',
    price: 'Free',
    size: '20 MB',
    date: '2025-08-05',
    image:
      'https://images.unsplash.com/photo-1597354681836-9a766292c295?q=80&w=735&auto=format&fit=crop',
  },
];

export default function WindowsBypassTools() {
  const isColor = useAppSelector((state) => state.color.value);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

 useEffect(() =>{
   if(openMenuId){
     document.body.style.overflow = 'hidden';
   }else{
     document.body.style.overflow = '';
   }
 },[openMenuId])

  const handleReport = (toolId: string) => {
    alert(`Thanks, your report for item ${toolId} has been noted.`);
    setOpenMenuId(null);
  };

  return (
    <div className="flex flex-col p-6">
    
     {/* Header */}
      <div className="flex  items-center w-full mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-left">
          Window Bypass Tools
        </h2>
      </div>
    
    
      {/* Tools List */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            className="relative flex items-center gap-4 p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
            style={{
              backgroundColor: isColor ? '#d7d7d719' : '#72727236',
              animationDelay: `${(index + 1) * 100}ms`,
            }}
          >
            {/* Clickable body */}
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
                <p className="text-sm ">Price: {tool.price}</p>
                <p className="text-sm ">Size: {tool.size}</p>
                <p className="text-sm ">Date: {tool.date}</p>
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
                className="p-2 rounded-full  focus:outline-none"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
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
              backgroundColor: isColor ? "#76767625" : "#ffffff3f",
              }}
            
            className="w-full shadow-md backdrop-blur-md max-w-md  rounded-t-2xl border-t border-blue-500 p-4 animate-slide-up"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-sm">Options</h4>
              <button
                onClick={() => setOpenMenuId(null)}
                className="p-1 rounded "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => {
                handleShare(openMenuId!, tools.find((t) => t.id === openMenuId)?.title || '');
              }}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded "
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => handleReport(openMenuId!)}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm rounded "
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
          href="/windows-tools"
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
      `}</style>
    </div>
  );
}