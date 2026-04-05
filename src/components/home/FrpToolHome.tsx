'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowDown } from 'lucide-react';

const tools = [
  {
    name: 'QuickShortcutMaker',
    desc: 'Create shortcuts to hidden settings and apps...',
    href: 'https://albastuz3d.net/FRP%20apps/Quickshortcut%20maker%202019%20(Albastuz3d).apk',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#FBBF24"/>
        <path d="M14.5 15.5C14.5 15.5 16.5 19.5 18.5 19.5C20.5 19.5 22.5 15.5 22.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14.5 15.5L14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5V15.5L14.5 15.5Z" fill="white"/>
        <circle cx="12" cy="4.5" r="1.5" fill="white"/>
        <path d="M9.5 15.5C9.5 15.5 7.5 14 6 15.5C4.5 17 6 19.5 6 19.5L9.5 15.5Z" fill="white"/>
      </svg>
    )
  },
  {
    name: 'Apex Launcher',
    desc: 'Customize your Android home screen with Apex...',
    href: 'https://albastuz3d.net/FRP%20apps/Apex%20Launcher(Albastuz3d).apk',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#3B82F6"/>
        <path d="M12 6L5 12H7V18H17V12H19L12 6Z" fill="white"/>
      </svg>
    )
  },
  {
    name: 'FRP Bypass',
    desc: 'Bypass Factory Reset Protection on Android...',
    href: 'https://albastuz3d.net/FRP%20apps/Frpbypass%20(Albastuz3d).apk',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6 8.48L19.54 5.11C19.68 4.87 19.6 4.56 19.36 4.42C19.12 4.28 18.81 4.36 18.67 4.6L16.78 7.87C15.35 7.21 13.73 6.83 12 6.83C10.27 6.83 8.65 7.21 7.22 7.87L5.33 4.6C5.19 4.36 4.88 4.28 4.64 4.42C4.4 4.56 4.32 4.87 4.46 5.11L6.4 8.48C3.89 10.03 2.15 12.78 2 16H22C21.85 12.78 20.11 10.03 17.6 8.48ZM8.5 13.5C7.67 13.5 7 12.83 7 12C7 11.17 7.67 10.5 8.5 10.5C9.33 10.5 10 11.17 10 12C10 12.83 9.33 13.5 8.5 13.5ZM15.5 13.5C14.67 13.5 14 12.83 14 12C14 11.17 14.67 10.5 15.5 10.5C16.33 10.5 17 11.17 17 12C17 12.83 16.33 13.5 15.5 13.5Z" fill="#A4C639"/>
      </svg>
    )
  },
  {
    name: 'Nova Launcher',
    desc: 'Highly customizable, performance driven home screen...',
    href: 'https://albastuz3d.net/FRP%20apps/Nova%20Launcher(Albastuz3d).apk',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#1E293B"/>
        <path d="M12 4L20 8.5V15.5L12 20L4 15.5V8.5L12 4Z" fill="#EF4444"/>
        <path d="M12 8L8 11H10V15H14V11H16L12 8Z" fill="white"/>
      </svg>
    )
  },
  {
    name: 'Android G.A.M',
    desc: 'Google Account Manager for modern Android versions.',
    href: 'https://github.com/vnrom/bypass/raw/master/Android_8-9-10_GAM.apk',
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  }
];

export default function FrpToolHome() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="min-h-screen font-sans relative overflow-hidden flex flex-col items-center transition-colors duration-500 bg-slate-50 text-slate-900 dark:bg-[#050505] dark:text-slate-300 selection:bg-blue-500/30 dark:selection:bg-cyan-500/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-all bg-blue-500/10 opacity-60 dark:bg-cyan-500/10 dark:opacity-100" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] transition-all bg-indigo-500/10 opacity-60 dark:bg-purple-500/10 dark:opacity-100" />
      </div>

      <div className="w-full max-w-3xl px-6 py-12 flex flex-col items-center z-10 flex-1">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center tracking-tight leading-tight mb-10 max-w-2xl transition-colors text-slate-900 dark:text-white">
          BYPASS ANDROID 5 TO<br/>ANDROID 16 + TOOLS
        </h1>

        {/* Phone Mockup */}
        <div className="relative w-[360px] h-[460px] flex justify-center mb-8  hover:scale-[1.02] transition-transform duration-700">
          
          {/* Power Button Hardware Accent */}
          <div className="absolute right-[11px] top-[140px] w-[4px] h-[50px] bg-[#81c995] rounded-r-md shadow-sm z-0" />
          
          {/* Phone Hardware Body */}
          <div className="relative w-[330px] h-full bg-[#111] rounded-t-[2.5rem] border-[4px] border-b-0 border-slate-800 overflow-hidden flex flex-col z-10 shadow-2xl">
            
            <div className="h-[72px] w-full shrink-0 relative flex items-center">
              <div className="absolute left-[22%] flex gap-5">
                <div className="w-4 h-4 rounded-full bg-[#050505] ring-1 ring-[#222] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                </div>
                <div className="w-4 h-4 rounded-full bg-[#050505] ring-1 ring-[#222] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#1a1a1a] rounded-full shadow-inner" />
            </div>

            {/* Locked Screen UI */}
            <div className="flex-1 bg-white flex flex-col relative">
              <div className="bg-[#5A7DB0] text-white text-center py-4 text-[1.2rem] font-medium shadow-sm">
                Verify your account
              </div>

              <div className="px-8 py-6 flex flex-col flex-1 bg-gray-50">
                <div className="text-[1.5rem] font-bold mb-6 flex items-center">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </div>

                <p className="text-[#202124] text-[14px] leading-relaxed mb-10 font-medium">
                  This device was reset. To continue,<br/>
                  sign in with a Google Account that was<br/>
                  previously synced on this device.
                </p>

                <div className="border-b-[1.5px] border-gray-300 pb-1.5">
                  <span className="text-gray-400 text-[14px]">Email or phone</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Bottom Fade Overlay */}
          <div className="absolute bottom-0 left-[-20px] right-[-20px] h-[240px] z-20 pointer-events-none transition-all bg-gradient-to-t from-slate-50 via-slate-50/95 dark:from-[#050505] dark:via-[#050505]/95 to-transparent" />
        </div>

        {/* List Header */}
        <div className="w-full max-w-xl text-center mb-8 relative z-30">
          <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-slate-900 dark:text-white">
            Featured Tools
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600/80 dark:text-cyan-500/80">
            Tap to download
          </p>
        </div>

        {/* Tools List */}
        <div className="w-full max-w-xl flex flex-col gap-4 mb-16 relative z-30">
          {tools.map((tool, idx) => (
            <Link 
              href={tool.href}
              key={idx} 
              className="rounded-2xl p-4 flex items-center gap-5 cursor-pointer border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border-slate-200 hover:border-blue-500/30 dark:bg-[#0a0a0a]/80 dark:border-slate-800 dark:hover:border-cyan-500/30"
            >
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                {tool.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                  {tool.name}
                </h3>
                <p className="text-xs font-medium leading-snug text-slate-500 dark:text-slate-400">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className="w-full py-8 flex justify-center mt-auto z-30">
        <Link 
          href="/tools" 
          className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] transition-colors uppercase text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-cyan-400"
        >
          See more
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
