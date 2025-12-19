"use client";

import { Download, ShieldAlert, Smartphone, FileCode, Terminal, AlertTriangle, CheckCircle2, Loader2, HardDrive } from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/server/firebaseApi";
import { incrementToolCount } from "@/lib/incrementToolCount";

interface ToolData {
  id: string;
  title: string;
  version: string;
  link: string;
}

export default function FrpCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [data, setData] = useState<ToolData[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "download"));
        const sortedData: ToolData[] = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as ToolData))
          .sort((a, b) => a.title.localeCompare(b.title));

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchData();
  }, []);

  const handleDownload = async (title: string, url: string) => {
    try {
      setLoading((prev) => ({ ...prev, [title]: true }));
      await incrementToolCount(title);

      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch file.");

      const blob = await response.blob();
      
      // ✅ FIX: Force the correct Android MIME type to prevent .zip/.jar renaming
      const apkBlob = new Blob([blob], { type: "application/vnd.android.package-archive" });
      const downloadUrl = URL.createObjectURL(apkBlob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      // ✅ FIX: Ensure specific filename sanitization
      a.download = `${title.replace(/\s+/g, '_')}_KalifaOS.apk`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed, attempting fallback:", error);
      // Fallback: Direct open (Browser handles headers)
      window.open(url, "_blank");
    } finally {
      setLoading((prev) => ({ ...prev, [title]: false }));
    }
  };

  // --- SKELETON LOADER ---
  if (isFetching) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-20 min-h-screen ${isColor ? 'text-slate-200' : 'text-slate-800'}`}>
         <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`relative w-16 h-16 border-2 border-dashed rounded-full animate-spin ${
              isColor ? 'border-cyan-500' : 'border-blue-600'
            }`}></div>
            <div className="flex items-center gap-2 text-sm font-mono opacity-70">
               <Terminal size={14} />
               <span className="animate-pulse">DECRYPTING_REPOSITORY...</span>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-5xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
             isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
           }`}>
             <Smartphone size={14} />
             <span>APK_VAULT // v.LATEST</span>
           </div>

           <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
             FRP Bypass <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Payloads</span>
           </h1>
           
           <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
             Direct download links for specialized Android unlocking utilities. 
             Files are verified and hosted on high-speed secure servers.
           </p>
        </div>

        {/* --- LEGAL WARNING --- */}
        <div className={`mb-12 rounded-xl border p-4 flex items-start gap-4 ${
           isColor ? 'bg-red-950/10 border-red-900/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
        }`}>
           <ShieldAlert className="flex-shrink-0 mt-0.5" />
           <div>
              <h3 className="font-bold text-sm uppercase tracking-wide mb-1">Liability Protocol</h3>
              <p className="text-xs opacity-80 leading-relaxed">
                 FRP bypass tools interact with device security partitions. Only execute these payloads on hardware you legally own. 
                 Kalifa OS assumes no responsibility for bricked devices or voided warranties.
              </p>
           </div>
        </div>

        {/* --- TOOLS LIST --- */}
        <div className={`rounded-2xl border overflow-hidden ${
           isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
           {/* Table Header (Hidden on mobile) */}
           <div className={`hidden md:flex items-center px-6 py-3 border-b text-xs font-bold uppercase tracking-wider opacity-50 ${
              isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
           }`}>
              <div className="w-1/2">Payload Name</div>
              <div className="w-1/4">Version Info</div>
              <div className="w-1/4 text-right">Action</div>
           </div>

           {/* Items */}
           <div className="divide-y divide-slate-800/50">
             {data.map((tool, index) => (
               <div
                 key={tool.id}
                 className={`group flex flex-col md:flex-row md:items-center px-6 py-4 transition-all duration-200 ${
                    isColor 
                      ? 'hover:bg-slate-900/40' 
                      : 'hover:bg-slate-50'
                 }`}
               >
                 {/* Title Column */}
                 <div className="flex items-center gap-4 w-full md:w-1/2 mb-3 md:mb-0">
                    <div className={`p-2 rounded-lg ${
                       isColor ? 'bg-slate-800 text-green-500' : 'bg-green-100 text-green-600'
                    }`}>
                       <FileCode size={20} />
                    </div>
                    <div>
                       <h3 className={`font-bold text-base ${isColor ? 'text-slate-200' : 'text-slate-800'}`}>
                         {tool.title}
                       </h3>
                       <div className="flex items-center gap-2 md:hidden text-xs opacity-50 font-mono mt-1">
                          <span>VER: {tool.version}</span>
                       </div>
                    </div>
                 </div>

                 {/* Version Column (Desktop) */}
                 <div className="hidden md:block w-1/4 text-xs font-mono opacity-60">
                    <span className={`px-2 py-1 rounded border ${
                       isColor ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'
                    }`}>
                       v{tool.version}
                    </span>
                 </div>

                 {/* Action Column */}
                 <div className="w-full md:w-1/4 flex justify-end">
                    <button
                      onClick={() => handleDownload(tool.title, tool.link)}
                      disabled={loading[tool.title]}
                      className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                         loading[tool.title]
                           ? (isColor ? 'bg-slate-800 text-slate-500 cursor-wait' : 'bg-slate-100 text-slate-400 cursor-wait')
                           : (isColor 
                               ? 'bg-green-600 text-white hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                               : 'bg-green-600 text-white hover:bg-green-700 shadow-md')
                      }`}
                    >
                       {loading[tool.title] ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Fetching...</span>
                          </>
                       ) : (
                          <>
                            <Download size={14} />
                            <span>Download APK</span>
                          </>
                       )}
                    </button>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* --- FOOTER STATUS --- */}
        <div className={`mt-8 text-center flex items-center justify-center gap-2 text-xs font-mono opacity-50 ${
           isColor ? 'text-slate-500' : 'text-slate-400'
        }`}>
           <CheckCircle2 size={12} />
           <span>Secure Connection Established. All files scanned for malware.</span>
        </div>

      </div>
    </div>
  );
}
