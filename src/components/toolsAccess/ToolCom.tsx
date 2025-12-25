// app/tools-access/page.tsx
'use client';

import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  Settings, 
  ArrowRight, 
  Cpu, 
  ShieldAlert, 
  Database
} from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks'; // Adjust path as needed

export default function ToolCom() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode

  const toolCategories = [
    {
      id: 'windows',
      title: 'Windows PC Tools',
      subtitle: 'Desktop Executables & Unlockers',
      icon: <Monitor size={40} />,
      href: '/windows-tools', // Adjust to your actual route for windows tools list
      colorTheme: 'blue'
    },
    {
      id: 'android',
      title: 'Android Payloads',
      subtitle: 'APK Files & Bypass Apps',
      icon: <Smartphone size={40} />,
      href: '/frp-tools', // Adjust to your actual route for APK downloads
      colorTheme: 'green'
    },
    {
      id: 'settings',
      title: 'System Settings Mod',
      subtitle: 'Direct Intent Links & Dialers',
      icon: <Settings size={40} />,
      href: '/bypass-settings', // Adjust to your actual route for settings bypass
      colorTheme: 'orange'
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-6xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
             isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
           }`}>
             <Database size={14} />
             <span>SYSTEM_CORE // TOOLS_GATEWAY</span>
           </div>

           <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
             KALIFA <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>ARMORY</span>
           </h1>
           
           <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
             Select your required tool vector below. Access specialized software for desktop environments, mobile payloads, or system-level modifications.
           </p>
        </div>

        {/* --- CATEGORY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {toolCategories.map((cat) => {
            
            // Determine colors based on theme and category color
            const mainColorClass = cat.colorTheme === 'blue' 
                ? (isColor ? 'text-cyan-500' : 'text-blue-600')
                : cat.colorTheme === 'green'
                ? (isColor ? 'text-green-500' : 'text-green-600')
                : (isColor ? 'text-orange-500' : 'text-orange-600');

            const glowClass = cat.colorTheme === 'blue'
                ? (isColor ? 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-500/50' : 'hover:shadow-xl hover:border-blue-300')
                : cat.colorTheme === 'green'
                ? (isColor ? 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:border-green-500/50' : 'hover:shadow-xl hover:border-green-300')
                : (isColor ? 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/50' : 'hover:shadow-xl hover:border-orange-300');
            
            const bgHover = cat.colorTheme === 'blue'
                ? (isColor ? 'group-hover:bg-cyan-950/30' : 'group-hover:bg-blue-50')
                : cat.colorTheme === 'green'
                ? (isColor ? 'group-hover:bg-green-950/30' : 'group-hover:bg-green-50')
                : (isColor ? 'group-hover:bg-orange-950/30' : 'group-hover:bg-orange-50');

            return (
              <Link 
                key={cat.id}
                href={cat.href}
                className={`group relative rounded-3xl border p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                    isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                } ${glowClass}`}
              >
                 {/* Background decoration on hover */}
                 <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${bgHover}`}></div>
                 
                 <div>
                    {/* Icon Header */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className={`p-4 rounded-2xl ${
                            isColor ? 'bg-slate-900' : 'bg-slate-100'
                        } ${mainColorClass}`}>
                            {cat.icon}
                        </div>
                        <div className={`font-mono text-xs font-bold uppercase tracking-wider opacity-50 ${mainColorClass}`}>
                            ACCESS_POINT // {cat.id.toUpperCase()}
                        </div>
                    </div>

                    {/* Title Info */}
                    <div className="relative z-10">
                        <h2 className={`text-2xl font-bold mb-2 ${isColor ? 'text-white' : 'text-slate-900'}`}>
                            {cat.title}
                        </h2>
                        <p className={`font-mono text-sm ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
                            {cat.subtitle}
                        </p>
                    </div>
                 </div>

                 {/* Action Footer */}
                 <div className={`mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-4 relative z-10 ${mainColorClass}`}>
                    <span>Initialize Portal</span>
                    <ArrowRight size={18} />
                 </div>
              </Link>
            );
          })}
        </div>

        {/* --- FOOTER INFO --- */}
        <div className={`mt-16 p-6 rounded-2xl border flex items-start gap-4 ${
           isColor ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
           <div className={`p-3 rounded-full shrink-0 ${isColor ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
              <ShieldAlert size={24} />
           </div>
           <div>
              <h3 className={`text-lg font-bold mb-2 ${isColor ? 'text-white' : 'text-slate-900'}`}>Usage Protocol Warning</h3>
              <p className={`text-sm leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
                These tools interact directly with device firmware and security partitions. Ensure you have proper authorization before executing any bypass procedures. Kalifa OS is not responsible for bricked devices due to misuse.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
