// src/LoadingDots.jsx
'use client';

import React from 'react';
import { useAppSelector } from '../redux/hooks'; // Assuming you have this hook available

const OrbitingDotsSpinner = () => {
  // Logic: isColor = true (Dark Mode), isColor = false (Light Mode)
  // If you don't have access to redux here, you can remove this and default to the Dark style
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-40">
      
      {/* --- SPINNER CONTAINER --- */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        
        {/* Layer 1: Outer Glow (Static) */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${
          isColor ? 'bg-cyan-500' : 'bg-blue-600'
        }`}></div>

        {/* Layer 2: Outer Rotating Ring (Dashed) */}
        <div className={`absolute inset-0 rounded-full border-2 border-dashed animate-[spin_3s_linear_infinite] ${
          isColor ? 'border-slate-700' : 'border-slate-300'
        }`}></div>

        {/* Layer 3: Main Active Arc (Fast Spin) */}
        <div className={`absolute inset-0 rounded-full border-[3px] border-transparent border-t-current animate-[spin_1s_linear_infinite] ${
          isColor ? 'text-cyan-400' : 'text-blue-600'
        }`}></div>

        {/* Layer 4: Inner Counter-Rotating Arc */}
        <div className={`absolute inset-2 rounded-full border-[3px] border-transparent border-b-current animate-[spin_1.5s_linear_infinite_reverse] ${
          isColor ? 'text-blue-600' : 'text-cyan-500'
        }`}></div>

        {/* Layer 5: Central Pulsing Core */}
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          isColor ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-blue-600'
        }`}></div>
      </div>

      {/* --- TEXT LABEL --- */}
      <div className="flex flex-col items-center gap-1">
        <span className={`text-xs font-mono font-bold tracking-[0.2em] animate-pulse ${
          isColor ? 'text-cyan-500' : 'text-blue-600'
        }`}>
          PROCESSING
        </span>
      </div>

    </div>
  );
};

export default OrbitingDotsSpinner;
