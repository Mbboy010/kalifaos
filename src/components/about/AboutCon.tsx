// app/components/about/AboutCon.tsx
'use client';

import { 
  Mail, 
  Facebook, 
  Smartphone, 
  Globe, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Code,
  CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '../redux/hooks';

export default function AboutCon() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-5xl mx-auto px-4">
        
        {/* --- HEADER: IDENTITY CARD --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className={`relative p-6 rounded-3xl border mb-8 transition-all duration-500 hover:scale-105 ${
            isColor 
              ? 'bg-slate-900 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]' 
              : 'bg-white border-blue-200 shadow-xl'
          }`}>
            {/* Animated Glow Behind Logo */}
            <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 ${
               isColor ? 'bg-cyan-500' : 'bg-blue-600'
            }`}></div>
            
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/Logo.jpg"
                alt="Kalifa OS Logo"
                width={160}
                height={160}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            {/* Status Dot */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg border-2 border-slate-900">
               Operational
            </div>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            KALIFA <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>OS</span>
          </h1>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm border ${
            isColor ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <Terminal size={14} />
            <span>v2.0 // Mobile Security Architecture</span>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* LEFT: MISSION PROTOCOL */}
          <div className={`lg:col-span-2 rounded-2xl p-8 border ${
            isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
               isColor ? 'text-white' : 'text-slate-900'
            }`}>
              <Code className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
              System Manifesto
            </h2>
            
            <div className={`space-y-6 leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>
                <strong className={isColor ? 'text-slate-200' : 'text-slate-900'}>Kalifa OS</strong> is a specialized research unit focused on mobile device forensics, unlocking protocols, and firmware integrity. We engineer solutions for when standard access methods fail.
              </p>
              <p>
                Our mission is to democratize access to professional-grade diagnostic tools, ensuring that device owners retain full sovereignty over their hardware regardless of software locks or carrier restrictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
               {[
                 { icon: <ShieldCheck />, label: "Data Integrity", desc: "No data loss during bypass." },
                 { icon: <Globe />, label: "Global Unlock", desc: "Supports all major carriers." },
                 { icon: <Cpu />, label: "Hardware Safe", desc: "Optimized for stability." },
                 { icon: <Zap />, label: "Instant Access", desc: "Real-time server processing." },
               ].map((item, i) => (
                 <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isColor ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                 }`}>
                    <div className={isColor ? 'text-cyan-500' : 'text-blue-600'}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isColor ? 'text-slate-200' : 'text-slate-900'}`}>{item.label}</h4>
                      <p className="text-xs opacity-70 mt-1">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT: TECH STACK / INFO */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 border ${
              isColor ? 'bg-gradient-to-br from-slate-900 to-[#0a0a0a] border-slate-800' : 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-500'
            }`}>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-70`}>Core Capabilities</h3>
              <ul className="space-y-4">
                {['FRP Bypass', 'Bootloader Unlock', 'IMEI Repair', 'Firmware Flashing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className={isColor ? 'text-green-500' : 'text-blue-200'} />
                    <span className="font-mono font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl p-6 border text-center ${
              isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
               <div className="text-4xl font-bold mb-1">5k+</div>
               <div className="text-xs font-mono uppercase opacity-50">Devices Unlocked</div>
            </div>
            
            <div className={`rounded-2xl p-6 border text-center ${
              isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
               <div className="text-4xl font-bold mb-1">24/7</div>
               <div className="text-xs font-mono uppercase opacity-50">Server Uptime</div>
            </div>
          </div>
        </div>

        {/* --- COMMS UPLINK (CONTACT) --- */}
        <div className={`rounded-3xl p-8 md:p-12 border relative overflow-hidden ${
          isColor ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          {/* Background Decoration */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-transparent opacity-10 rounded-bl-[100px] ${
             isColor ? 'to-cyan-500' : 'to-blue-500'
          }`}></div>

          <h2 className={`text-2xl font-bold mb-8 relative z-10 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            Communication Uplinks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { 
                label: 'Email Support', 
                value: 'Kalifaos763@gmail.com', 
                href: 'mailto:Kalifaos763@gmail.com', 
                icon: <Mail />,
                color: 'text-red-500' 
              },
              { 
                label: 'Direct Line', 
                value: '+251 916 196 3225', 
                href: 'tel:09161963225', 
                icon: <Smartphone />,
                color: 'text-green-500' 
              },
              { 
                label: 'Facebook', 
                value: 'Follow Updates', 
                href: 'https://www.facebook.com/share/1CfnPzT4jk/?mibextid=wwXIfr', 
                icon: <Facebook />,
                color: 'text-blue-600' 
              },
              { 
                label: 'TikTok Feed', 
                value: '@kalifaos.frp', 
                href: 'https://www.tiktok.com/@kalifaos.frp.bypa?_t=ZM-8wEil1SbIyl&_r=1', 
                icon: <Globe />,
                color: 'text-pink-500' 
              },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isColor 
                    ? 'bg-[#0a0a0a] border-slate-800 hover:border-cyan-500/50' 
                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  isColor ? 'bg-slate-800 group-hover:bg-slate-700' : 'bg-white shadow-sm'
                } ${contact.color}`}>
                  {React.cloneElement(contact.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className={`text-sm font-bold opacity-50 mb-1 ${isColor ? 'text-slate-400' : 'text-slate-500'}`}>
                  {contact.label}
                </h3>
                <p className={`font-mono text-sm truncate font-medium ${
                  isColor ? 'text-slate-200 group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {contact.value}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center relative z-10">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
                isColor
                  ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl'
              }`}
            >
              <Terminal size={18} />
              Open Support Ticket
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
