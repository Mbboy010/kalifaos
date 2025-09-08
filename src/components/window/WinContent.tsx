// app/components/windows/WindowsBypassTools.tsx
"use client";

import WinContentSkeleton from "./WinContentSkeleton";
import {
  MoreVertical,
  Share2,
  Flag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Firebase
import { db } from "@/server/firebaseApi";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

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

  const itemsPerPage = 5;
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDocs, setTotalDocs] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // ---- Format Price ----
  const formatPrice = (price: string) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    if (num === 0) return "Free";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num);
  };

  // ---- Format Date ----
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 5) return "now";
    if (diff < 60) return `${diff}s ago`;

    const minutes = Math.floor(diff / 60);
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

  // ---- Fetch total docs for pagination ----
  const fetchTotalDocs = useCallback(async () => {
    const snapshot = await getDocs(
      query(collection(db, "Windows-tools"), orderBy("date", "desc"))
    );
    setTotalDocs(snapshot.size);
  }, []);

  // ---- Fetch tools by page ----
  const fetchPage = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        // If page is out of range → show error
        const totalPages = Math.ceil(totalDocs / itemsPerPage);
        if (page < 1 || (totalPages > 0 && page > totalPages)) {
          setTools([]);
          setError("This page does not exist.");
          setLoading(false);
          return;
        }

        let q = query(
          collection(db, "Windows-tools"),
          orderBy("date", "desc"),
          limit(itemsPerPage)
        );

        if (page > 1) {
          const prevSnapshot = await getDocs(
            query(
              collection(db, "Windows-tools"),
              orderBy("date", "desc"),
              limit((page - 1) * itemsPerPage)
            )
          );

          const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];
          if (lastVisible) {
            q = query(
              collection(db, "Windows-tools"),
              orderBy("date", "desc"),
              startAfter(lastVisible),
              limit(itemsPerPage)
            );
          }
        }

        const snapshot = await getDocs(q);
        const toolsData: Tool[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tool[];

        // If no results → page doesn't exist
        if (toolsData.length === 0) {
          setError("This page does not exist.");
        }

        setTools(toolsData);
      } catch (err) {
        console.error("Error fetching tools:", err);
        setError("Failed to load tools. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, totalDocs]
  );

  useEffect(() => {
    fetchTotalDocs();
    fetchPage(currentPage);
  }, [currentPage, fetchPage, fetchTotalDocs]);

  // ---- Handle page change ----
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const totalPages = Math.ceil(totalDocs / itemsPerPage);

  const handleShare = async (toolId: string, title: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/windows-tools/${toolId}`
        : `/windows-tools/${toolId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      } else {
        alert(url);
      }
    } catch {
    } finally {
      setOpenMenuId(null);
    }
  };

  const handleReport = (toolId: string) => {
    alert(`Thanks, your report for item ${toolId} has been noted.`);
    setOpenMenuId(null);
  };

  return (
    <div className="flex min-h-screen flex-col pt-20 p-6">
      {loading && <WinContentSkeleton />}

      {/* Error & Empty Page */}
      {!loading && error && (
        <p className="text-center text-red-500 font-medium py-6">{error}</p>
      )}

      {/* Tools List */}
      <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            className="relative flex items-center gap-4 p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
            style={{
              backgroundColor: isColor ? "#d7d7d719" : "#72727236",
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
      {!loading && !error && tools.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-full border disabled:opacity-50 flex items-center"
            style={{
              backgroundColor: isColor ? "#d7d7d719" : "#72727236",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-full border ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              style={{
                backgroundColor:
                  page === currentPage
                    ? "#2563eb"
                    : isColor
                    ? "#d7d7d719"
                    : "#72727236",
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-full border disabled:opacity-50 flex items-center"
            style={{
              backgroundColor: isColor ? "#d7d7d719" : "#72727236",
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}