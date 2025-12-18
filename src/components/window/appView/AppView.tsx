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
  ShieldCheck,
  Star,
  X,
  AlertTriangle,
  Home,
  Terminal,
  Activity,
  CreditCard,
  Maximize2,
  FileCode
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { db } from "@/server/firebaseApi";
import { doc, getDoc, updateDoc, increment, Timestamp } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

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

// --- CYBER SKELETON LOADER ---
function SkeletonLoader({ isColor }: { isColor: boolean }) {
  return (
    <div className={`container mx-auto px-4 py-12 animate-pulse ${isColor ? 'text-slate-700' : 'text-slate-200'}`}>
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className={`w-32 h-32 rounded-2xl ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
        <div className="flex-1 space-y-4">
          <div className={`h-8 w-2/3 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          <div className="flex gap-4">
            <div className={`h-4 w-24 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            <div className={`h-4 w-24 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-16 rounded-lg ${isColor ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
         <div className={`h-4 w-full rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
         <div className={`h-4 w-5/6 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
         <div className={`h-4 w-4/6 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
      </div>
    </div>
  );
}

function formatDescription(text: string) {
  let formatted = text.replace(/\r\n/g, "\n");
  formatted = formatted
    .replace(/\[red\](.*?)\[\/red\]/g, '<span class="text-red-500 font-bold">$1</span>')
    .replace(/\[green\](.*?)\[\/green\]/g, '<span class="text-green-500 font-bold">$1</span>')
    .replace(/\[blue\](.*?)\[\/blue\]/g, '<span class="text-blue-500 font-bold">$1</span>')
    .replace(
      /\[img\](.*?)\[\/img\]/g,
      '<img src="$1" alt="tool image" class="rounded-lg shadow-md my-4 border border-slate-700/50" />'
    );
  return formatted;
}

function formatDownloads(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return (num / 1000).toFixed(1) + "k";
  return (num / 1_000_000).toFixed(1) + "M";
}

export default function AppView() {
  const isColor = useAppSelector((state) => state.color.value); // Dark Mode Check
  const params = useParams();
  const id = params.contentId as string;
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

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
        } else {
          setTool(null);
        }
      } catch (error) {
        console.error("Error fetching tool:", error);
        setTool(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTool();
  }, [id]);

  // Fullscreen Logic
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = "";
      setAnimate(false);
    }
  }, [fullscreen]);

  const formatPrice = (price: string | number) => {
    const num = Number(price);
    if (isNaN(num) || num === 0) return "Free Access";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleDownload = async () => {
    if (!tool) return;
    try {
      const docRef = doc(db, "Windows-tools", tool.id);
      await updateDoc(docRef, { downloads: increment(1) });
      setTool((prev) => (prev ? { ...prev, downloads: (prev.downloads || 0) + 1 } : prev));
    } catch (error) { console.error(error); }
  };

  const handleBuy = async () => {
    if (!tool) return;
    try {
      const res = await fetch("/api/opay/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(tool.price), toolId: tool.id, title: tool.title }),
      });
      const data = await res.json();
      if (data?.paymentUrl) window.location.href = data.paymentUrl;
      else alert("Payment initialization failed");
    } catch (error) { alert("Payment error, please try again"); }
  };

  if (loading) return <SkeletonLoader isColor={isColor} />;

  if (!tool) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[70vh] px-4 ${isColor ? 'text-slate-300' : 'text-slate-700'}`}>
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">System Error: 404</h2>
        <p className="mb-8 opacity-70">The requested package ID was not found in the repository.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-20 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200 selection:bg-cyan-500/30' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- HERO / HEADER SECTION --- */}
      <div className={`relative pt-24 pb-12 border-b ${isColor ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono mb-6 opacity-50">
            <Home size={12} />
            <span>/ repository / windows / {tool.id.substring(0, 8)}...</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* App Icon */}
            <div className={`relative group w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 rounded-2xl overflow-hidden border-2 shadow-2xl ${
              isColor ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}>
              <img src={tool.image} alt={tool.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* App Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className={`text-3xl md:text-5xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
                  {tool.title}
                </h1>
                
                {/* Security Badge */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                  tool.security === 'Safe' 
                    ? (isColor ? 'bg-green-950/30 border-green-800 text-green-400' : 'bg-green-50 border-green-200 text-green-700')
                    : 'bg-red-950/30 border-red-800 text-red-400'
                }`}>
                  <ShieldCheck size={14} />
                  <span>{tool.security.toUpperCase()}</span>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-8 font-mono opacity-80">
                <div className="flex items-center gap-2">
                   <Activity size={16} className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
                   <span>{formatDownloads(tool.downloads)} Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                   <Star size={16} className="text-yellow-500" />
                   <span>{tool.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar size={16} className={isColor ? 'text-red-400' : 'text-red-500'} />
                   <span>Updated: {tool.createdAt}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {Number(tool.price) > 0 ? (
                  <button
                    onClick={handleBuy}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
                  >
                    <CreditCard size={20} />
                    <span>Purchase License ({formatPrice(tool.price)})</span>
                  </button>
                ) : (
                  <a
                    href={tool.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDownload}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-bold transition-all ${
                      isColor 
                        ? 'bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    }`}
                  >
                    <Download size={20} />
                    <span>Initialize Download</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* --- METADATA GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Tag />, label: "License", value: formatPrice(tool.price), color: "text-blue-500" },
            { icon: <HardDrive />, label: "File Size", value: tool.size, color: "text-green-500" },
            { icon: <Monitor />, label: "Platform", value: tool.os, color: "text-purple-500" },
            { icon: <Cpu />, label: "Architecture", value: tool.architecture, color: "text-orange-500" },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border ${
              isColor ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`mb-2 ${item.color} opacity-80`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
              </div>
              <div className="text-xs uppercase opacity-50 font-bold tracking-wider mb-1">{item.label}</div>
              <div className={`font-mono font-bold ${isColor ? 'text-slate-200' : 'text-slate-800'}`}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- MAIN CONTENT (LEFT) --- */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* SCREENSHOTS */}
            {tool.screenshots && tool.screenshots.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileCode size={20} className="text-slate-500" />
                  <h3 className={`text-xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>Visual Evidence</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                  {tool.screenshots.map((src, idx) => (
                    <div 
                      key={idx} 
                      className={`relative flex-shrink-0 snap-center group cursor-pointer overflow-hidden rounded-lg border shadow-md ${
                        isColor ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                      }`}
                      onClick={() => setFullscreen(src)}
                    >
                      <img src={src} alt="screen" className="h-48 w-auto object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize2 className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DESCRIPTION */}
            <section className={`rounded-2xl p-6 border ${
              isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-6 border-b border-dashed border-slate-700/50 pb-4">
                <Terminal size={18} className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
                <h3 className="font-mono font-bold uppercase tracking-widest text-sm">/var/log/readme.md</h3>
              </div>
              
              <div className={`prose max-w-none ${isColor ? 'prose-invert prose-p:text-slate-400 prose-headings:text-slate-200' : 'prose-slate'}`}>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-4 my-6">{children}</h2>,
                    img: ({ ...props }) => <img {...props} className="rounded-lg border border-slate-700/50 shadow-lg" />,
                  }}
                >
                  {formatDescription(tool.description)}
                </ReactMarkdown>
              </div>
            </section>
            
            {/* COMMENTS */}
            <section>
               <Comments contentId={tool.id} />
            </section>
          </div>

          {/* --- SIDEBAR (RIGHT) --- */}
          <div className="space-y-8">
             <div className="sticky top-24">
               <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4">Related Packages</h3>
               <Suggestions currentToolId={tool.id} />
             </div>
          </div>

        </div>
      </div>

      {/* --- FULLSCREEN MODAL --- */}
      {fullscreen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setFullscreen(null)}
        >
          <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
            <X size={24} />
          </button>
          <img
            src={fullscreen}
            alt="fullscreen"
            className={`max-w-[95vw] max-h-[90vh] rounded shadow-2xl transition-transform duration-300 ${
              animate ? "scale-100" : "scale-90"
            }`}
          />
        </div>
      )}
    </div>
  );
}
