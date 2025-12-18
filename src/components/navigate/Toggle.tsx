"use client";

import { Sun, Moon, Power } from "lucide-react";

interface ToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Toggle = ({ darkMode, setDarkMode }: ToggleProps) => {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 w-16 rounded-full border-2 transition-all duration-300 focus:outline-none ${
        darkMode
          ? "bg-slate-950 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          : "bg-slate-200 border-slate-300 shadow-inner"
      }`}
      aria-label="Toggle System Theme"
    >
      {/* Background Icons (Stationary) */}
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100 text-slate-500'}`} />
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${darkMode ? 'opacity-100 text-slate-700' : 'opacity-0'}`} />
      </div>

      {/* Sliding Knob */}
      <span
        className={`absolute left-0.5 top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform ${
          darkMode
            ? "translate-x-8 bg-cyan-500 text-slate-900 rotate-0"
            : "translate-x-0 bg-white text-yellow-500 rotate-180"
        }`}
      >
        {darkMode ? (
          <Power className="w-3.5 h-3.5" strokeWidth={3} />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </span>
      
      {/* Glow Effect in Dark Mode (Optional decoration) */}
      {darkMode && (
         <span className="absolute right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span>
      )}
    </button>
  );
};

export default Toggle;
