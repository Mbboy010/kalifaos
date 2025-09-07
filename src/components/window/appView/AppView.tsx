
"use client";

import Comments from "./Comments";
import Link from "next/link";
import { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import {
  Download,
  Tag,
  HardDrive,
  Monitor,
  Cpu,
  Calendar,
  Shield,
  Star,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { db } from "@/server/firebaseApi";
import { doc, getDoc, updateDoc, increment, Timestamp } from "firebase/firestore";
import { useParams } from "next/navigation";

interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  price: string | number;
  size: string;
  os: string;
  architecture: string;
  createdAt: string;
  downloads: number;
  rating: string;
  security: string;
  screenshots: string[];
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Tool Header Skeleton */}
      <div className="flex mt-16 flex-col gap-6 my-6">
        <div className="flex flex-row items-center gap-4">
          <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>

        {/* Tool Info Skeleton */}
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      {/* Screenshots Skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-36 w-64 bg-gray-300 rounded-lg"
            ></div>
          ))}
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="py-5 rounded-xl mb-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      {/* Download Button Skeleton */}
      <div className="flex flex-col md:flex-row gap-6 my-6">
        <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
      </div>
    </div>
  );
}

function formatDescription(text: string) {
  let formatted = text.replace(/\r\n/g, "\n");

  formatted = formatted
    .replace(/\[red\](.*?)\[\/red\]/g, '<span class="text-red-500 font-bold">$1</span>')
    .replace(/\[green\](.*?)\[\/green\]/g, '<span class="text-green-500 font-bold">$1</span>')
    .replace(/\[blue\](.*?)\[\/blue\]/g, '<span class="text-blue-500 font-bold">$1</span>');

  formatted = formatted.replace(
    /\[img\](.*?)\[\/img\]/g,
    '<img src="$1" alt="tool image" class="rounded-lg shadow-md my-2" />'
  );

  return formatted;
}

// ✅ Format downloads into K, M, B
function formatDownloads(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return (num / 1000).toFixed(2).replace(/\.00$/, "") + "k";
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
}

export default function AppView() {
  const params = useParams();
  const id = params.contentId as string;
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  // Fetch tool data from Firebase
  useEffect(() => {
    async function fetchTool() {
      try {
        const docRef = doc(db, "Windows-tools", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setTool({
            id: docSnap.id,
            ...data,
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt.toDate().toLocaleDateString()
                : String(data.createdAt ?? ""),
          } as Tool);
        }
      } catch (error) {
        console.error("Error fetching tool:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTool();
  }, [id]);

  // disable/enable scroll on fullscreen open
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = "";
      setAnimate(false);
    }
  }, [fullscreen]);

  // Format price
  const formatPrice = (price: string | number) => {
    const num = Number(price);
    if (isNaN(num) || num === 0) return "Free";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Handle download click
  const handleDownload = async () => {
    if (!tool) return;

    try {
      const docRef = doc(db, "Windows-tools", tool.id);
      await updateDoc(docRef, {
        downloads: increment(1),
      });

      // Update local state immediately for better UI response
      setTool((prev) =>
        prev ? { ...prev, downloads: (prev.downloads || 0) + 1 } : prev
      );
    } catch (error) {
      console.error("Error updating downloads:", error);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        Tool not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tool Header */}
      <div className="flex mt-16 flex-col gap-6 my-6">
        <div className="flex h-full flex-row items-center gap-4">
          <img
            src={tool.image}
            alt={tool.title}
            width={100}
            height={100}
            className="rounded-xl shadow-md"
          />
          <div className="flex flex-col h-full gap-2 text-[1rem]">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-500" /> Downloads:{" "}
              {formatDownloads(tool.downloads)}
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-4 text-yellow-500" /> Rating: {tool.rating}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" /> Security:{" "}
              {tool.security}
            </div>
          </div>
        </div>

        {/* Tool Info */}
        <div>
          <p className="text-3xl text-blue-500 font-bold mb-3">{tool.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm ">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" /> Price:{" "}
              {formatPrice(tool.price)}
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-green-500" /> Size: {tool.size}
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-500" /> System: {tool.os}
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" /> Arch:{" "}
              {tool.architecture}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" /> Date: {tool.createdAt}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      {tool.screenshots && tool.screenshots.length > 0 && (
        <div className="mb-6">
          <p className="text-xl font-semibold mb-3">Screenshots</p>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {tool.screenshots.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="screenshot"
                className="h-36 rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
                onClick={() => setFullscreen(src)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-all duration-300">
          <button
            onClick={() => setFullscreen(null)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={fullscreen}
            alt="fullscreen"
            className={`max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg transform transition-all duration-300 ${
              animate ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />
        </div>
      )}

      {/* Description */}
      <div className="py-5 rounded-xl mb-6">
        <div className="space-y-4">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <p className="text-2xl font-bold mt-6 mb-3">{children}</p>
              ),
              h2: ({ children }) => (
                <p className="text-xl font-semibold mt-5 mb-2">{children}</p>
              ),
              h3: ({ children }) => (
                <p className="text-lg font-semibold mt-4 mb-2">{children}</p>
              ),
              p: ({ children }) => (
                <p className="leading-relaxed">{children}</p>
              ),
            }}
          >
            {formatDescription(tool.description)}
          </ReactMarkdown>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 my-6">
        <a
          href={tool.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>

      <Suggestions currentToolId={tool.id} />
      <Comments  contentId={tool.id} />
    </div>
  );
}