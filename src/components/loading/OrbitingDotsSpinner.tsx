'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const OrbitingDotsSpinner = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-40">
      
      {/* --- SPINNER CONTAINER --- */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        
        {/* Layer 1: Outer Glow (Static) */}
        <div className="absolute inset-0 rounded-full blur-xl opacity-20 bg-blue-600 dark:bg-cyan-500" />

        {/* Layer 2: Outer Rotating Ring (Dashed) */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_3s_linear_infinite] border-slate-300 dark:border-slate-700" />

        {/* Layer 3: Main Active Arc (Fast Spin) */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-current animate-[spin_1s_linear_infinite] text-blue-600 dark:text-cyan-400" />

        {/* Layer 4: Inner Counter-Rotating Arc */}
        <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-current animate-[spin_1.5s_linear_infinite_reverse] text-cyan-500 dark:text-blue-600" />

        {/* Layer 5: Central Pulsing Core */}
        <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600 dark:bg-white dark:shadow-[0_0_10px_#fff]" />
      </div>

      {/* --- TEXT LABEL --- */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-mono font-bold tracking-[0.2em] animate-pulse text-blue-600 dark:text-cyan-500">
          PROCESSING
        </span>
      </div>

    </div>
  );
};

export default OrbitingDotsSpinner;
