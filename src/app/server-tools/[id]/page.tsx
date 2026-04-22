"use client";

import { pricingData } from "../data";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

export default function ItemDetail() {
  const params = useParams();
  
  // Ensure we have a string ID from the dynamic route [id]
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Find the item within all groups based on the URL ID
  const item = pricingData
    .flatMap((group) => group.items)
    .find((i) => i.id === id);

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/server-tools" 
          className="text-sky-500 dark:text-sky-400 hover:text-blue-500 transition-colors text-xs font-mono"
        >
          &lt; BACK_TO_CONSOLE
        </Link>
        
        <div className="mt-10 border border-slate-200 dark:border-[#1a1a1a] p-8 rounded-xl bg-white dark:bg-[#080808] shadow-sm dark:shadow-none">
          <h1 className="text-2xl font-bold mb-6 text-blue-600 dark:text-sky-400">
            Service Details
          </h1>
          
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-slate-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest block mb-1">
                SERVICE_NAME
              </label>
              <div className="text-lg font-medium leading-relaxed">
                {item.name}
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <div>
                <label className="text-slate-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest block mb-1">
                  EST_DELIVERY
                </label>
                <div className="text-slate-600 dark:text-zinc-400">
                  {item.delivery}
                </div>
              </div>
              <div>
                <label className="text-slate-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest block mb-1">
                  CREDITS_REQUIRED
                </label>
                <div className="text-blue-600 dark:text-sky-400 font-bold font-mono text-lg">
                  {item.price}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-[#1a1a1a] pt-6">
              <label className="text-slate-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest block mb-3">
                SERVICE_OVERVIEW
              </label>
              <div 
                className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-[#0c0c0c] p-4 rounded-lg border-l-4 border-blue-500 dark:border-sky-500"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
            
            <div className="border-t border-slate-100 dark:border-[#1a1a1a] mt-2 pt-6">
              <label className="text-slate-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest block mb-1">
                INTERNAL_ID
              </label>
              <div className="text-slate-400 dark:text-zinc-800 text-xs font-mono">
                {item.id}
              </div>
            </div>
          </div>

          <button 
            className="mt-10 w-full bg-blue-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-blue-600 text-white dark:text-black py-4 rounded-lg font-black transition-all duration-200 uppercase tracking-widest active:scale-[0.98]"
          >
            INITIALIZE SERVICE
          </button>
        </div>
      </div>
    </div>
  );
}
