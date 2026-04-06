'use client';

import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  { id: 0, src: '/177549835001.jpeg', alt: 'Chimera_Protocol_Alpha' },
  { id: 1, src: '/177549879739.jpeg', alt: 'System_Flash_Utility' },
  { id: 2, src: '/177549765806.jpeg', alt: 'Kernel_Bypass_v2' },
  { id: 3, src: '/177549836768.jpeg', alt: 'Network_Diagnostic_Tool' },
];

const AUTO_SLIDE_MS = 4000;

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // --- AUTO-SLIDE ENGINE ---
  useEffect(() => {
    const timer = setInterval(nextSlide, AUTO_SLIDE_MS);
    return () => clearInterval(timer); // Critical cleanup to prevent memory leaks
  }, [nextSlide]);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="relative w-full max-w-[1400px] aspect-[21/9] overflow-hidden rounded-xl shadow-2xl bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* --- MOVING TRACK --- */}
        <div 
          className="flex w-full h-full transition-transform duration-700 cubic-bezier(0.65, 0, 0.35, 1)"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="min-w-full h-full shrink-0">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* --- SYSTEM OVERLAY (Aesthetic) --- */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em] uppercase">
              Live_Broadcast_v4.0
            </span>
          </div>
        </div>

        {/* --- PAGINATION DOTS --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? 'w-8 h-2 bg-blue-600 dark:bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                  : 'w-2 h-2 bg-slate-400/50 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* --- VIGNETTE EFFECT --- */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60" />
      </div>
    </div>
  );
}
