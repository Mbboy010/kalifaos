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
    return (
      group.category.toLowerCase().includes(q) ||
      group.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#050505] dark:text-[#e0e0e0] font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50 px-6 py-10 dark:border-[#1a1a1a] dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#050505]">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#00ff66] shadow-[0_0_10px_#00ff66]" />
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-gray-500 dark:text-[#666]">
              TERMINAL SECURE ACCESS
            </span>
          </div>
          <h1 className="m-0 text-3xl font-extrabold sm:text-4xl">
            IMEI <span className="text-[#00ff66]">Services</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#888]">
            Managed Pricing API • Secure Distributor Console
          </p>
        </div>
      </header>

      {/* Sticky Search & Filter */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 p-4 backdrop-blur-xl dark:border-[#1a1a1a] dark:bg-[#050505]/80">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center gap-3">
          
          {/* Search Input with Icon */}
          <div className="relative flex-1 min-w-[280px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#00ff66]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="SEARCH SERVICE"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-sm font-mono outline-none transition-all focus:ring-1 focus:ring-[#00ff66] dark:border-[#1a1a1a] dark:bg-[#0a0a0a] dark:text-[#00ff66] dark:placeholder-gray-700"
            />
          </div>

          <button
            onClick={() => setShowHotOnly(!showHotOnly)}
            className={`rounded px-5 py-2.5 text-[11px] font-bold transition-all ${
              showHotOnly 
              ? "bg-[#00ff66] text-black" 
              : "border border-gray-300 bg-transparent text-gray-500 hover:border-[#00ff66] dark:border-[#333] dark:text-[#888]"
            }`}
          >
            🔥 URGENT_PRIORITY
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[960px] px-4 py-8 pb-20">
        {filtered.map((group) => {
          const isOpen = openGroups[group.id] !== false;
          return (
            <div key={group.id} className="mb-3 overflow-hidden rounded border border-gray-200 bg-white dark:border-[#111] dark:bg-[#080808]">
              <button 
                onClick={() => toggle(group.id)} 
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-hover hover:bg-gray-50 dark:hover:bg-[#0a0a0a]"
              >
                <div className="flex items-center gap-3">
                  {group.hot && (
                    <span className="rounded bg-[#00ff66] px-2 py-0.5 text-[10px] font-black text-black">
                      HOT
                    </span>
                  )}
                  <span className="break-words text-sm font-semibold">{group.category}</span>
                </div>
                <span className="shrink-0 font-mono text-lg text-[#00ff66]">
                  {isOpen ? "[−]" : "[+]"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 bg-gray-50 dark:border-[#1a1a1a] dark:bg-[#050505]">
                  {group.items.map((item, i) => (
                    <Link 
                      key={item.id} 
                      href={`/server-tools/${item.id}`}
                      className={`grid grid-cols-[1fr_100px_80px] p-4 text-decoration-none transition-colors hover:bg-gray-100 dark:hover:bg-[#0a0a0a] ${
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
                        item.price === "$0.00" ? "text-gray-300 dark:text-[#444]" : "text-[#00ff66]"
                      }`}>
                        {item.price === "$0.00" ? "FREE" : item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
