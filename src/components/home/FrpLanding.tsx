'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Smartphone, Settings, ChevronRight } from 'lucide-react';

export default function FrpLanding() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const tools = [
    {
      title: "System Apps",
      subtitle: "Core Android Access",
      desc: "Force launch hidden system activities on Samsung, Xiaomi, and Pixel devices.",
      href: "/system-apps",
      icon: <Smartphone className="w-6 h-6" />,
      tag: "ROOT_ACCESS",
      id: "MOD_01"
    },
    {
      title: "Config & Security",
      subtitle: "Settings Injection",
      desc: "Modify lock screen parameters and security protocols to bypass FRP gates.",
      href: "/setting-and-lock-screen",
      icon: <Settings className="w-6 h-6" />,
      tag: "CONFIG_EDIT",
      id: "MOD_02"
    }
  ];

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full py-16 px-4 transition-colors duration-300 bg-slate-50 border-b border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Android Bypass <span className="text-slate-400 dark:text-slate-500">Suite</span>
            </h2>
          </div>
          
          <div className="h-px flex-1 mx-8 hidden md:block bg-slate-300 dark:bg-slate-800"></div>

          <div className="text-sm font-medium px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-900/20 dark:text-green-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            All Systems Operational
          </div>
        </div>

        {/* Tools Grid - centered if items < 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className="group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900/80 dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              {/* Top Row: Tag & Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 bg-blue-50 text-blue-600 group-hover:bg-blue-100 dark:bg-slate-800 dark:text-cyan-400 dark:group-hover:bg-cyan-950 dark:group-hover:text-cyan-300">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-mono border px-2 py-1 rounded uppercase tracking-wider border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600 dark:border-slate-700 dark:text-slate-500 dark:group-hover:border-cyan-500/30 dark:group-hover:text-cyan-400">
                  {tool.tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-xs font-bold uppercase mb-1 text-slate-400 dark:text-slate-500">
                  {tool.id}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4 text-slate-900 decoration-blue-500 dark:text-white dark:decoration-cyan-500">
                  {tool.title}
                </h3>
                <h4 className="text-sm font-medium mb-3 text-blue-600 dark:text-cyan-500">
                  {tool.subtitle}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {tool.desc}
                </p>
              </div>

              {/* Hover Arrow Effect */}
              <div className="absolute bottom-6 right-6 transition-transform duration-300 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-blue-600 dark:text-cyan-400">
                <ChevronRight />
              </div>

              {/* Decoration: Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-transparent opacity-10 transition-all group-hover:opacity-20 group-hover:to-blue-500 dark:group-hover:to-cyan-500 rounded-bl-3xl"></div>
            </a>
          ))}
          
          {/* Third Card Placeholder (Optional) */}
          <div className="hidden lg:flex items-center justify-center border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-800 opacity-50">
             <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Module_Slot_03_Empty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
