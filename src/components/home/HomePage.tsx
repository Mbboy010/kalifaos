'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import BannerCarousel from "./BannerCarousel"
// Components
import YouTubeVideos from './YouTubeVideos';
import WindowsBypassTools from '../window/WindowsBypassTools';
import FrpLanding from './FrpLanding';
import FrpToolHome from "./FrpToolHome";

// Icons
import { 
  Smartphone, Shield, Zap, HelpCircle, 
  Terminal, Cpu, ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrice = (price: string, name: string): void => {
    setSelectedPrice(price);
    const phoneNumber = '2349013644892';
    const message = `Hello Kalifaos Admin,\n\nI need access to the ${name} plan (${price}).\nRequest ID: ${Math.floor(Math.random() * 100000)}\n\nInitiating unlock protocol...`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-slate-200 selection:bg-blue-200 dark:selection:bg-cyan-500/30">
      <BannerCarousel />
      {/* --- HERO SECTION --- */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        {/* Background Grid Effect */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(${isDark ? '#06b6d4' : '#2563eb'} 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }}
        />

      
        <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">

          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
            Root. Flash. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-600">Unlock.</span>
          </h1>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed text-slate-600 dark:text-slate-400">
            Advanced mobile diagnostics and firmware solutions. Bypass FRP, unlock bootloaders, and restore devices with professional-grade tools.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/tools-access"
              className="group relative px-8 py-4 font-bold rounded-xl overflow-hidden transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] dark:shadow-none"
            >
              <Terminal size={20} /> Initialize Tools
            </Link>
            
            <Link
              href="/docs"
              className="px-8 py-4 border rounded-xl transition-all flex items-center justify-center gap-2 font-medium border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Cpu size={20} /> View Documentation
            </Link>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border p-2 shadow-2xl backdrop-blur-sm border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-500/50 to-transparent" />
            <Image
              src="/Bypass.jpg"
              alt="Dashboard Interface"
              width={1200}
              height={675}
              className="rounded-lg opacity-90"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-slate-900">
        <WindowsBypassTools />
      </section> 

      {/* --- CORE TOOLS --- */}
      <div className="relative z-20 -mt-10 pt-10">
        <FrpLanding />
        <FrpToolHome />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
        <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border p-2 shadow-2xl backdrop-blur-sm border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-500/50 to-transparent" />
          <Image
            src="/W.png"
            alt="Windows Bypass Tools"
            width={1200}
            height={675}
            className="rounded-lg opacity-90"
          />
        </div>
      </div>
      
      <div className="py-20">
        <YouTubeVideos />
      </div>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">System Capabilities</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-blue-600 dark:bg-cyan-600"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: 'IMEI Repair', desc: 'Advanced diagnostics for carrier unlocking and network repair.' },
              { icon: <Shield className="w-8 h-8" />, title: 'FRP Protocol', desc: 'Secure Google account removal for Samsung, Xiaomi, and more.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Instant Flash', desc: 'High-speed firmware deployment with zero latency.' },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden border-slate-200 bg-white hover:shadow-xl hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 dark:hover:border-cyan-500/30"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {feature.icon}
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXECUTION SEQUENCE --- */}
      <section className="py-24 border-y bg-slate-100 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">Execution Sequence</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0 bg-slate-300 dark:bg-slate-800" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'Input Data', desc: 'Submit Device IMEI or Serial.' },
                { step: '02', title: 'Processing', desc: 'Server validates & generates token.' },
                { step: '03', title: 'Unlock', desc: 'Receive code via secure channel.' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl border text-center shadow-xl bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-lg mx-auto mb-4 border bg-blue-50 text-blue-600 border-blue-100 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-500/20">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 font-mono text-slate-900 dark:text-white">
            /var/log/faq
          </h2>
          <div className="space-y-4">
            {[
              { question: 'Is the bypass permanent?', answer: 'Yes. Once unlocked, your device remains unlocked even after updates.' },
              { question: 'Do I need a PC?', answer: 'Most tools require a Windows PC, but we offer some APKs for direct mobile use.' },
              { question: 'Is it safe?', answer: 'Our tools operate in a sandbox environment to ensure zero risk to your hardware.' },
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg p-5 bg-white border-slate-200 text-slate-800 shadow-sm dark:bg-[#0f0f0f] dark:border-slate-800 dark:text-slate-200 dark:shadow-none">
                <div className="flex items-center font-medium mb-2">
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600 dark:text-cyan-500" />
                  {faq.question}
                </div>
                <p className="text-sm pl-8 leading-relaxed text-slate-600 dark:text-slate-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
