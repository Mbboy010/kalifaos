'use client';

import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Terminal 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 bg-slate-50 text-slate-800 dark:bg-[#050505] dark:text-red-500">
      
      {/* --- ERROR VISUAL --- */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 blur-3xl opacity-20 rounded-full bg-slate-300 dark:bg-red-600"></div>
        
        <h1 className="text-9xl font-black tracking-tighter relative z-10 flex items-center justify-center text-slate-900 dark:text-white">
          4
          <span className="inline-block animate-pulse mx-2 text-slate-400 dark:text-red-600">0</span>
          4
        </h1>
        
        {/* Decorative "Glitch" Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-mono tracking-[1em] opacity-20 pointer-events-none whitespace-nowrap">
           SYSTEM_FAILURE
        </div>
      </div>

      {/* --- TERMINAL ERROR LOG --- */}
      <div className="w-full max-w-md rounded-xl overflow-hidden border mb-10 text-left font-mono text-xs shadow-2xl bg-white border-slate-300 dark:bg-[#0a0a0a] dark:border-red-900/50">
         <div className="flex items-center gap-2 px-4 py-2 border-b bg-slate-100 border-slate-200 text-slate-500 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
            <Terminal size={12} />
            <span className="uppercase tracking-wider">Error_Log.txt</span>
         </div>
         <div className="p-6 space-y-2 text-slate-600 dark:text-slate-400">
            <p>
               <span className="text-red-600 dark:text-red-500">[CRITICAL]</span> Page resource not found.
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
        <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2 text-slate-900 dark:text-white">
           <AlertTriangle size={24} className="text-yellow-500" />
           Path Vector Invalid
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The requested sector does not exist or has been quarantined. Reroute navigation to resume operations on **Kalifa OS**.
        </p>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border font-bold uppercase text-xs tracking-wider transition-all bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:bg-transparent dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Abort
        </button>
        
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-500 dark:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          <Home size={16} />
          System Root
        </Link>
      </div>

      {/* --- SUPPORT LINK --- */}
      <div className="mt-12 text-center text-xs font-mono opacity-50 hover:opacity-100 transition-opacity text-slate-400 dark:text-slate-500">
        <p>
          Error Code: 404_NOT_FOUND | Need Diagnostics?{' '}
          <Link href="/contact" className="underline text-blue-600 dark:text-red-400">
            Contact Admin
          </Link>
        </p>
      </div>
    </div>
  );
}
