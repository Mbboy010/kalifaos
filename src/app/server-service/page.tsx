"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingData, PricingGroup } from "./data";

export default function ResellerPricingIMEI() {
  const [search, setSearch] = useState<string>("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [showHotOnly, setShowHotOnly] = useState<boolean>(false);

  const toggle = (cat: string) =>
    setOpenGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const filtered = pricingData.filter((group: PricingGroup) => {
    if (showHotOnly && !group.hot) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    // Filter out groups where neither the category nor any items match the search
    const matchesCategory = group.category.toLowerCase().includes(q);
    const matchingItems = group.items.filter((i) =>
      i.name.toLowerCase().includes(q)
    );

    return matchesCategory || matchingItems.length > 0;
  }).map(group => {
    // If we have a search term, only show the specific items that match within that group 
    // (unless the category name itself matched, then show all)
    if (search && !group.category.toLowerCase().includes(search.toLowerCase())) {
        return {
            ...group,
            items: group.items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        }
    }
    return group;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#050505] dark:text-[#e0e0e0] font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50 px-6 py-10 dark:border-[#1a1a1a] dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#050505]">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-gray-500 dark:text-[#666]">
              TERMINAL SECURE ACCESS
            </span>
          </div>
          <h1 className="m-0 text-3xl font-extrabold sm:text-4xl">
            IMEI <span className="text-sky-500 dark:text-sky-400">Services</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#888]">
            Managed Pricing API • Secure Distributor Console
          </p>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="border-b border-gray-200 bg-white/80 p-4 backdrop-blur-xl dark:border-[#1a1a1a] dark:bg-[#050505]/80">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center gap-3">
          
          {/* Search Input with Icon */}
          <div className="relative flex-1 min-w-[280px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-sky-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="SEARCH SERVICE"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-sm font-mono outline-none transition-all focus:ring-1 focus:ring-sky-400 dark:border-[#1a1a1a] dark:bg-[#0a0a0a] dark:text-sky-400 dark:placeholder-gray-700"
            />
          </div>

          <button
            onClick={() => setShowHotOnly(!showHotOnly)}
            className={`rounded px-5 py-2.5 text-[11px] font-bold transition-all ${
              showHotOnly 
              ? "bg-blue-600 text-white" 
              : "border border-gray-300 bg-transparent text-gray-500 hover:border-sky-400 dark:border-[#333] dark:text-[#888]"
            }`}
          >
            🔥 URGENT_PRIORITY
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[960px] px-4 py-8 pb-20">
        {filtered.length === 0 ? (
          /* Empty State / Not Found UI */
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 py-16 text-center dark:border-[#1a1a1a] dark:bg-[#080808]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 text-gray-400 dark:text-sky-900" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#e0e0e0]">NO SERVICES FOUND</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-[#666]">
              Database scan for <span className="font-mono text-sky-500 dark:text-sky-400">"{search}"</span> returned zero results.
            </p>
            <button 
              onClick={() => { setSearch(""); setShowHotOnly(false); }}
              className="mt-6 rounded bg-blue-600 px-6 py-2 text-xs font-bold text-white transition-opacity hover:opacity-80"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          /* Normal List Rendering */
          filtered.map((group) => {
            // Auto-open groups when searching
            const isOpen = search ? true : openGroups[group.id] !== false;
            
            return (
              <div key={group.id} className="mb-3 overflow-hidden rounded border border-gray-200 bg-white dark:border-[#111] dark:bg-[#080808]">
                <button 
                  onClick={() => toggle(group.id)} 
                  className="flex w-full items-center justify-between gap-3 p-4 text-left transition-hover hover:bg-gray-50 dark:hover:bg-[#0a0a0a]"
                >
                  <div className="flex items-center gap-3">
                    {group.hot && (
                      <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-black text-white">
                        HOT
                      </span>
                    )}
                    <span className="break-words text-sm font-semibold">{group.category}</span>
                  </div>
                  <span className="shrink-0 font-mono text-lg text-sky-500 dark:text-sky-400">
                    {isOpen ? "[−]" : "[+]"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50 dark:border-[#1a1a1a] dark:bg-[#050505]">
                    {group.items.map((item, i) => (
                      <Link 
                        key={item.id} 
                        href={`/server-tools/${item.id}`}
                        className={`grid grid-cols-[1fr_100px_80px] p-4 text-decoration-none transition-colors hover:bg-sky-50/50 dark:hover:bg-sky-900/10 ${
                          i < group.items.length - 1 ? "border-b border-gray-100 dark:border-[#111]" : ""
                        }`}
                      >
                        <span className="break-words pr-2 text-sm text-gray-700 dark:text-[#bbb]">
                          {item.name}
                        </span>
                        <span className="self-center text-[11px] text-gray-400 dark:text-[#666]">
                          {item.delivery}
                        </span>
                        <span className={`self-center text-right font-mono text-[13px] font-bold ${
                          item.price === "$0.00" ? "text-gray-300 dark:text-[#444]" : "text-sky-500 dark:text-sky-400"
                        }`}>
                          {item.price === "$0.00" ? "FREE" : item.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
