// app/components/home/HomePage.tsx
'use client';

import YouTubeVideos from './YouTubeVideos';
import WindowsBypassTools from '../window/WindowsBypassTools';
import FrpLanding from './FrpLanding';
import { Smartphone, Shield, Zap, HelpCircle, Terminal, Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '../redux/hooks';
import { useState } from 'react';

export default function HomePage() {
  // Logic Update: isColor = true (Dark Mode), isColor = false (Light Mode)
  const isColor = useAppSelector((state) => state.color.value);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handlePrice = (price: string, name: string): void => {
    setSelectedPrice(price);
    const phoneNumber = '2349013644892';
    const message = `Hello Kalifaos Admin,\n\nI need access to the ${name} plan (${price}).\nRequest ID: ${Math.floor(Math.random() * 100000)}\n\nInitiating unlock protocol...`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(${isColor ? '#06b6d4' : '#2563eb'} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-6 animate-pulse ${
            isColor ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400' : 'border-blue-200 bg-blue-50 text-blue-600'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isColor ? 'bg-cyan-500' : 'bg-blue-600'}`}></span>
            SYSTEM ONLINE: KALIFAOS v2.0
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            Root. Flash. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Unlock.</span>
          </h1>
          
          <p className={`text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
            Advanced mobile diagnostics and firmware solutions. Bypass FRP, unlock bootloaders, and restore devices with professional-grade tools.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#tools-access"
              className={`group relative px-8 py-4 font-bold rounded-xl overflow-hidden transition-all flex items-center justify-center gap-2 ${
                isColor 
                  ? 'bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
              }`}
            >
              <Terminal size={20} /> Initialize Tools
            </Link>
            
            <Link
              href="/docs"
              className={`px-8 py-4 border rounded-xl transition-all flex items-center justify-center gap-2 font-medium ${
                isColor
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 hover:shadow-sm'
              }`}
            >
              <Cpu size={20} /> View Documentation
            </Link>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className={`mt-16 relative mx-auto max-w-5xl rounded-xl border p-2 shadow-2xl backdrop-blur-sm ${
            isColor ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'
          }`}>
            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent ${!isColor && 'hidden'}`}></div>
            <Image
              src="/Bypass.jpg"
              alt="Kalifaos Dashboard Interface"
              width={1200}
              height={675}
              className="rounded-lg opacity-90"
              priority
            />
          </div>
        </div>
      </section>

      {/* --- STATS / TRUST INDICATORS --- */}
      <div className={`border-y backdrop-blur ${
        isColor ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/60'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Devices Supported', value: '5,000+' },
            { label: 'Success Rate', value: '99.9%' },
            { label: 'Active Users', value: '12k+' },
            { label: 'Uptime', value: '100%' },
          ].map((stat, i) => (
            <div key={i}>
              <div className={`text-3xl font-bold mb-1 ${isColor ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
              <div className={`text-sm font-mono uppercase tracking-wider ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CORE TOOLS COMPONENTS --- */}
      <div className="relative z-20 -mt-10 pt-10">
        <FrpLanding />
      </div>

      <section className={`py-20 ${isColor ? 'bg-gradient-to-b from-[#0a0a0a] to-slate-900' : 'bg-slate-50'}`}>
        <WindowsBypassTools />
      </section>
      
      
      <div className={`mt-16 relative mx-auto max-w-5xl rounded-xl border p-2 shadow-2xl backdrop-blur-sm ${
            isColor ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'
          }`}>
            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent ${!isColor && 'hidden'}`}></div>
            <Image
              src="/Bypass.jpg"
              alt="Kalifaos WindowsBypassTools"
              width={1200}
              height={675}
              className="rounded-lg opacity-90"
              priority
            />
          </div>
      
      

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isColor ? 'text-white' : 'text-slate-900'}`}>System Capabilities</h2>
            <div className={`h-1 w-20 mx-auto rounded-full ${isColor ? 'bg-cyan-600' : 'bg-blue-600'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: 'IMEI Repair', desc: 'Advanced diagnostics for carrier unlocking and network repair.' },
              { icon: <Shield className="w-8 h-8" />, title: 'FRP Protocol', desc: 'Secure Google account removal for Samsung, Xiaomi, and more.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Instant Flash', desc: 'High-speed firmware deployment with zero latency.' },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isColor 
                    ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-cyan-500/30' 
                    : 'border-slate-200 bg-white hover:shadow-xl hover:border-blue-200'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {feature.icon}
                </div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  isColor ? 'bg-slate-800 text-cyan-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isColor ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                <p className={`leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Timeline Style) --- */}
      <section className={`py-24 border-y ${
        isColor ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-16 ${isColor ? 'text-white' : 'text-slate-900'}`}>Execution Sequence</h2>
          <div className="relative">
             {/* Connector Line */}
            <div className={`hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0 ${
              isColor ? 'bg-slate-800' : 'bg-slate-300'
            }`}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'Input Data', desc: 'Submit Device IMEI or Serial.' },
                { step: '02', title: 'Processing', desc: 'Server validates & generates token.' },
                { step: '03', title: 'Unlock', desc: 'Receive code via secure channel.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-xl border text-center shadow-xl ${
                  isColor 
                    ? 'bg-[#0a0a0a] border-slate-800' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-lg mx-auto mb-4 border ${
                    isColor 
                      ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/20' 
                      : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {item.step}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isColor ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm ${isColor ? 'text-slate-500' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING (Hacker Plan Style) --- */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isColor ? 'text-white' : 'text-slate-900'}`}>Access Passes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Standard', price: 'N5,000', label: 'Single Use', features: ['1 Device Unlock', 'Standard Speed', 'Email Support'] },
              { name: 'Developer', price: 'N13,000', label: 'Most Popular', features: ['3 Device Unlocks', 'Priority Queue', 'Direct WhatsApp Support'] },
              { name: 'Root Admin', price: 'N49,000', label: 'Enterprise', features: ['Unlimited Unlocks', 'API Access', '24/7 VIP Channel'] },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                  index === 1 
                    ? (isColor 
                        ? 'border-cyan-500 bg-slate-900/80 shadow-[0_0_40px_rgba(6,182,212,0.15)] scale-105 z-10' 
                        : 'border-blue-500 bg-white shadow-xl scale-105 z-10')
                    : (isColor 
                        ? 'border-slate-800 bg-slate-900/30 hover:border-slate-600' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md')
                }`}
              >
                {index === 1 && (
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    isColor ? 'bg-cyan-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    Recommended
                  </div>
                )}
                
                <h3 className={`text-lg font-mono font-bold mb-2 ${
                  index === 1 
                    ? (isColor ? 'text-cyan-400' : 'text-blue-600') 
                    : (isColor ? 'text-slate-300' : 'text-slate-700')
                }`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className="text-slate-500 text-sm">/param</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-start text-sm ${isColor ? 'text-slate-300' : 'text-slate-600'}`}>
                      <ChevronRight className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${isColor ? 'text-cyan-500' : 'text-blue-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePrice(plan.price, plan.name)}
                  className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all ${
                    index === 1 
                      ? (isColor ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-blue-600 text-white hover:bg-blue-700')
                      : (isColor ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200')
                  }`}
                >
                  Acquire Access
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className={`py-20 ${isColor ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className={`text-2xl font-bold text-center mb-10 font-mono ${isColor ? 'text-white' : 'text-slate-900'}`}>
            /var/log/faq
          </h2>
          <div className="space-y-4">
            {[
              { question: 'Is the bypass permanent?', answer: 'Yes. Once unlocked, your device remains unlocked even after updates.' },
              { question: 'Do I need a PC?', answer: 'Most tools require a Windows PC, but we offer some APKs for direct mobile use.' },
              { question: 'Is it safe?', answer: 'Our tools operate in a sandbox environment to ensure zero risk to your hardware.' },
            ].map((faq, index) => (
              <div key={index} className={`border rounded-lg p-5 ${
                isColor 
                  ? 'bg-[#0f0f0f] border-slate-800 text-slate-200' 
                  : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}>
                <div className="flex items-center font-medium mb-2">
                  <HelpCircle className={`w-5 h-5 mr-3 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`} />
                  {faq.question}
                </div>
                <p className={`text-sm pl-8 leading-relaxed ${isColor ? 'text-slate-500' : 'text-slate-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VIDEO FEED --- */}
      <div className="py-20">
        <YouTubeVideos />
      </div>

    </div>
  );
}
