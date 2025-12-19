// app/not-found.tsx
'use client';

import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Terminal, 
  FileQuestion, 
  WifiOff 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux/hooks'; // Adjust path if needed

export default function NotCon() {
  const router = useRouter();
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
      isColor ? 'bg-[#050505] text-red-500' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* --- ERROR VISUAL --- */}
      <div className="relative mb-8 group">
        <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${
           isColor ? 'bg-red-600' : 'bg-slate-300'
        }`}></div>
        
        <h1 className={`text-9xl font-black tracking-tighter relative z-10 flex items-center justify-center ${
           isColor ? 'text-white' : 'text-slate-900'
        }`}>
          4
          <span className={`inline-block animate-pulse mx-2 ${
             isColor ? 'text-red-600' : 'text-slate-400'
          }`}>0</span>
          4
        </h1>
        
        {/* Decorative "Glitch" Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-mono tracking-[1em] opacity-20 pointer-events-none whitespace-nowrap">
           SYSTEM_FAILURE
        </div>
      </div>

      {/* --- TERMINAL ERROR LOG --- */}
      <div className={`w-full max-w-md rounded-xl overflow-hidden border mb-10 text-left font-mono text-xs shadow-2xl ${
         isColor ? 'bg-[#0a0a0a] border-red-900/50' : 'bg-white border-slate-300'
      }`}>
         <div className={`flex items-center gap-2 px-4 py-2 border-b ${
            isColor ? 'bg-red-950/20 border-red-900/50 text-red-400' : 'bg-slate-100 border-slate-200 text-slate-500'
         }`}>
            <Terminal size={12} />
            <span className="uppercase tracking-wider">Error_Log.txt</span>
         </div>
         <div className={`p-6 space-y-2 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>
               <span className={isColor ? 'text-red-500' : 'text-red-600'}>[CRITICAL]</span> Page resource not found.
            </p>
            <p>
               <span className="opacity-50">{'>'}</span> Scanning directory... <span className="text-yellow-500">Failed</span>
            </p>
            <p>
               <span className="opacity-50">{'>'}</span> Verifying URL path... <span className="text-yellow-500">Invalid</span>
            </p>
            <p className="animate-pulse mt-4">
               _Waiting for user input...
            </p>
         </div>
      </div>

      {/* --- MESSAGE --- */}
      <div className="text-center max-w-md mb-10">
        <h2 className={`text-2xl font-bold mb-3 flex items-center justify-center gap-2 ${
           isColor ? 'text-white' : 'text-slate-900'
        }`}>
           <AlertTriangle size={24} className="text-yellow-500" />
           Path Vector Invalid
        </h2>
        <p className={`text-sm leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
          The requested sector does not exist or has been quarantined. Reroute navigation to resume operations.
        </p>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => router.back()}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border font-bold uppercase text-xs tracking-wider transition-all ${
             isColor 
               ? 'bg-transparent border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white' 
               : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          <ArrowLeft size={16} />
          Abort
        </button>
        
        <Link
          href="/"
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-lg ${
             isColor 
               ? 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
               : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <Home size={16} />
          System Root
        </Link>
      </div>

      {/* --- SUPPORT LINK --- */}
      <div className={`mt-12 text-center text-xs font-mono opacity-50 hover:opacity-100 transition-opacity ${
         isColor ? 'text-slate-500' : 'text-slate-400'
      }`}>
        <p>
          Error Code: 404_NOT_FOUND | Need Diagnostics?{' '}
          <Link href="/contact" className={`underline ${isColor ? 'text-red-400' : 'text-blue-600'}`}>
            Contact Admin
          </Link>
        </p>
      </div>
    </div>
  );
}
