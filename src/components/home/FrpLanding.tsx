'use client';

import { Download, Smartphone, Settings, ShieldCheck, ChevronRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

export default function FrpLanding() {
  // Logic: isColor = true (Dark Mode), isColor = false (Light Mode)
  const isColor = useAppSelector((state) => state.color.value);

  const tools = [
    {
      title: "APK Depository",
      subtitle: "FRP Tools & Utilities",
      desc: "Direct download links for essential bypass APKs. No redirects, high-speed servers.",
      href: "/frp-tools-apk-download",
      icon: <Download className="w-6 h-6" />,
      tag: "v3.0.1",
      id: "MOD_01"
    },
    {
      title: "System Apps",
      subtitle: "Core Android Access",
      desc: "Force launch hidden system activities on Samsung, Xiaomi, and Pixel devices.",
      href: "/system-apps",
      icon: <Smartphone className="w-6 h-6" />,
      tag: "ROOT_ACCESS",
      id: "MOD_02"
    },
    {
      title: "Config & Security",
      subtitle: "Settings Injection",
      desc: "Modify lock screen parameters and security protocols to bypass FRP gates.",
      href: "/setting-and-lock-screen",
      icon: <Settings className="w-6 h-6" />,
      tag: "CONFIG_EDIT",
      id: "MOD_03"
    }
  ];

  return (
    <div className={`w-full py-16 px-4 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] border-b border-slate-800' : 'bg-slate-50 border-b border-slate-200'
    }`}>
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
              isColor ? 'text-cyan-500' : 'text-blue-600'
            }`}>
              <Terminal size={14} />
              <span>/root/tools/android_bypass</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isColor ? 'text-white' : 'text-slate-900'
            }`}>
              Android Bypass <span className={isColor ? 'text-slate-500' : 'text-slate-400'}>Suite</span>
            </h2>
          </div>
          
          <div className={`h-px flex-1 mx-8 hidden md:block ${
            isColor ? 'bg-slate-800' : 'bg-slate-300'
          }`}></div>

          <div className={`text-sm font-medium px-3 py-1 rounded-full border ${
            isColor 
              ? 'border-green-500/30 bg-green-900/20 text-green-400' 
              : 'border-green-200 bg-green-50 text-green-700'
          }`}>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            All Systems Operational
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
              className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                isColor 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
              }`}
            >
              {/* Top Row: Tag & Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isColor 
                    ? 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-950 group-hover:text-cyan-300' 
                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                }`}>
                  {tool.icon}
                </div>
                <span className={`text-[10px] font-mono border px-2 py-1 rounded uppercase tracking-wider ${
                  isColor 
                    ? 'border-slate-700 text-slate-500 group-hover:border-cyan-500/30 group-hover:text-cyan-400' 
                    : 'border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600'
                }`}>
                  {tool.tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`text-xs font-bold uppercase mb-1 ${
                  isColor ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {tool.id}
                </div>
                <h3 className={`text-xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4 ${
                  isColor ? 'text-white decoration-cyan-500' : 'text-slate-900 decoration-blue-500'
                }`}>
                  {tool.title}
                </h3>
                <h4 className={`text-sm font-medium mb-3 ${
                  isColor ? 'text-cyan-500' : 'text-blue-600'
                }`}>
                  {tool.subtitle}
                </h4>
                <p className={`text-sm leading-relaxed ${
                  isColor ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {tool.desc}
                </p>
              </div>

              {/* Hover Arrow Effect */}
              <div className={`absolute bottom-6 right-6 transition-transform duration-300 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                isColor ? 'text-cyan-400' : 'text-blue-600'
              }`}>
                <ChevronRight />
              </div>

              {/* Decoration: Corner Accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-transparent opacity-10 transition-all group-hover:opacity-20 ${
                 isColor ? 'group-hover:to-cyan-500' : 'group-hover:to-blue-500'
              } rounded-bl-3xl`}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
