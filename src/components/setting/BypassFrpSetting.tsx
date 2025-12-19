'use client';

import { useEffect, useState } from 'react';
import { Settings, LockKeyhole, Phone, ChevronRight, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import { trackClick } from '@/lib/trackClick';

export default function BypassFrpSetting() {
  const isColor = useAppSelector((state) => state.color.value); // Dark Mode Check

  const handleTrackClick = (action: string) => {
    trackClick(`/bypass-frp-setting/${action}`);
  };

  const modules = [
    {
      id: 'open-app-setting',
      title: 'System Configuration',
      subtitle: 'Access device settings menu',
      href: 'intent://com.android.settings/#Intent;scheme=android-app;end',
      icon: <Settings size={24} />,
      color: 'blue',
      status: 'READY'
    },
    {
      id: 'set-screen-lock',
      title: 'Security Override',
      subtitle: 'Inject new Pattern/PIN lock',
      href: 'intent://com.google.android.gms/#Intent;scheme=promote_smartlock_scheme;end',
      icon: <LockKeyhole size={24} />,
      color: 'orange',
      status: 'ARMED'
    },
    {
      id: 'phone-call',
      title: 'Dialer Protocol',
      subtitle: 'Launch emergency dialer',
      href: 'tel:+2349013644892',
      icon: <Phone size={24} />,
      color: 'green',
      status: 'ACTIVE'
    }
  ];

  return (
    <div className={`min-h-screen pt-5 pb-12 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-3xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
            isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
          }`}>
            <Terminal size={12} />
            <span>ROOT_ACCESS // SETTINGS_MOD</span>
          </div>
          
          <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            Configuration <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Panel</span>
          </h1>
          
          <p className={`text-lg max-w-xl mx-auto leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct access vectors for FRP bypass. Execute the modules below to modify system parameters or access the dialer.
          </p>
        </div>

        {/* --- MODULE GRID --- */}
        <div className="space-y-4">
          {modules.map((module, index) => (
            <a
              key={module.id}
              href={module.href}
              onClick={() => handleTrackClick(module.id)}
              className={`group relative flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                isColor 
                  ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                module.color === 'blue' 
                  ? (isColor ? 'bg-blue-900/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white')
                  : module.color === 'orange'
                  ? (isColor ? 'bg-orange-900/20 text-orange-400 group-hover:bg-orange-600 group-hover:text-white' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white')
                  : (isColor ? 'bg-green-900/20 text-green-400 group-hover:bg-green-600 group-hover:text-white' : 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white')
              }`}>
                {module.icon}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className={`text-xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
                    {module.title}
                  </h2>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    isColor ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-400'
                  }`}>
                    {module.status}
                  </span>
                </div>
                <p className={`text-sm font-medium ${isColor ? 'text-slate-400' : 'text-slate-500'}`}>
                  {module.subtitle}
                </p>
              </div>

              {/* Action Arrow */}
              <div className={`p-2 rounded-full transition-transform duration-300 group-hover:translate-x-2 ${
                isColor ? 'text-slate-500 group-hover:text-cyan-400' : 'text-slate-300 group-hover:text-blue-600'
              }`}>
                <ChevronRight size={24} />
              </div>
            </a>
          ))}
        </div>

        {/* --- SYSTEM FOOTER --- */}
        <div className={`mt-12 p-4 rounded-xl border flex items-start gap-4 ${
          isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className={`text-sm font-bold mb-1 ${isColor ? 'text-slate-200' : 'text-slate-800'}`}>
              Execution Warning
            </h4>
            <p className={`text-xs leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
              These commands interact directly with Android system intents. If a module fails to launch, your device firmware may not support that specific entry point. Ensure Google Play Services are active.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
