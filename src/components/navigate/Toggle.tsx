"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Power } from "lucide-react";

const Toggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-16 rounded-full bg-slate-800/20 border-2 border-transparent" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex items-center h-8 w-16 rounded-full border-2 transition-all duration-300 focus:outline-none 
                 bg-slate-200 dark:bg-slate-950 border-slate-300 dark:border-cyan-500 
                 shadow-inner dark:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
      aria-label="Toggle System Theme"
    >
      {/* Background Icons (Stationary) */}
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <Sun className="w-3 h-3 text-slate-500 transition-opacity duration-300 opacity-100 dark:opacity-0" />
        <Moon className="w-3 h-3 text-slate-700 transition-opacity duration-300 opacity-0 dark:opacity-100" />
      </div>

      {/* Sliding Knob */}
      <span
        className="absolute left-0.5 top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform 
                   translate-x-0 dark:translate-x-8 
                   bg-white dark:bg-cyan-500 
                   text-yellow-500 dark:text-slate-900 
                   rotate-180 dark:rotate-0"
      >
        {isDark ? (
          <Power className="w-3.5 h-3.5" strokeWidth={3} />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </span>
      
      {/* Glow Effect - Hidden in light mode, pulsing in dark mode */}
      <span className="absolute right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-0 dark:opacity-100"></span>
    </button>
  );
};

export default Toggle;
