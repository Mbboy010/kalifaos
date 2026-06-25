"use client"

import { motion } from 'framer-motion';
import { Menu, Lock, Cloud, Cpu, Zap, CreditCard, Landmark, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

// Custom Icons with Official Colors
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const BitcoinIcon = () => (
  <svg className="h-14 w-14 fill-[#F7931A]" viewBox="0 0 24 24">
    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.666 22.038-1.244 15.525.358 9.095 1.96 2.666 8.473-1.244 14.902.358c6.43 1.603 10.34 8.114 8.736 14.546zm-6.524-5.26c.465-3.13-1.89-4.26-4.512-4.9l.92-3.692-2.222-.553-.9 3.61c-.584-.145-1.182-.284-1.786-.41l.9-3.614-2.22-.554-.922 3.695c-.482-.113-.956-.226-1.423-.342V2.85h-3.07s.174 2.213.16 2.167c.806.2.148-.035 1.018.21.3.076.4.303.4.526-.06.258-2.618-10.512-2.628-10.55l-1.378-5.525c-.066-.192-.236-.484-.694-.37.892.22-.162-.04 1.396.347V3.53l-2.02.503-.923 3.7c.607.15 1.22.296 1.815.438-.052.214-.908 3.642-.908 3.642l-2.222-.554-.925 3.708 2.223.553-.873 3.5c-2.483.564-4.35-.12-5.918-2.47-1.134-1.706-1.077-3.414-.153-4.148 1.054-.84 2.673-.615 3.992-1.395.733-.434.997-1.137.945-1.63-.035-.333-.243-.657-.614-.94"/>
  </svg>
);

const PayPalIcon = () => (
  <svg className="h-11 w-auto fill-[#0079C1]" viewBox="0 0 24 24">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
  </svg>
);

const MastercardIcon = () => (
    <svg className="h-14 w-auto" viewBox="0 0 24 24">
      <circle cx="9" cy="12" r="7" fill="#EB001B"/>
      <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
);

const VisaLogo = () => (
   <svg className="h-9 w-auto" viewBox="0 0 50 16">
    <path fill="#1434CB" d="M18.8 15.6l3.1-10.1h-4.9l-2 10.1h4.8zM31 5.3c-1-.3-2.6-.7-4.1-.7-4.5 0-7.7 2.4-7.7 5.8 0 2.5 2.2 4 3.9 4.8 1.8.8 2.4 1.4 2.4 2.1 0 1.1-1.3 1.6-2.5 1.6-2 0-3.1-.3-4.5-.9l-.6-.3-.7 4.1c1.1.5 3.3 1 5.5 1 4.8 0 7.9-2.3 8-6 .0-2-1.2-3.5-3.8-4.7-1.6-.8-2.6-1.3-2.6-2.1 0-.7.8-1.5 2.4-1.5 1.5 0 2.6.3 3.4.7l.4.2.7-4zM43.7 5.3c-.8 0-1.5.5-1.8 1.4L35.2 15.6h5l1-2.7h6.1l.6 2.7h4.8L48 5.3h-4.3zm-1 2.6l1.5 4.3h-3l1.5-4.3zM14.6 5.3H10l-3 10.1H2l4.1-10.1L6.6 5.3c-.4-.1-1.5-.3-2.6-.5l-.1 1.1h1.5l2 10.1H14.6l-0-10.1z"/>
  </svg>
);

export default function MainLayout() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? ' text-white' : 'text-slate-900'} min-h-screen transition-colors duration-300`}>
      <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Banner />
      <Hero />
      <Services />
      <Stats />
      <Payments />
      <FloatingWhatsApp />
    </div>
  );
}

export function Topbar({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (val: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#000000] border-b border-slate-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center justify-between px-4 h-16">
        <button className="p-2 text-slate-700 dark:text-white/90">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-blue-600 dark:text-sky-400" />
            <span className="font-extrabold text-2xl tracking-tighter ml-1">
              <span className="text-blue-600 dark:text-sky-400">KALIFAOS</span>
              <span className="text-sky-500 dark:text-blue-500">NextGen</span>
            </span>
          </div>
          <span className="text-slate-500 dark:text-white/70 text-[10px] tracking-widest font-medium uppercase mt-0.5">
            Professional Unlocking Server
          </span>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-sky-400 border border-slate-200 dark:border-zinc-808 transition-all"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

export function Banner() {
  return (
    <div className="w-full bg-slate-100 dark:bg-[#111622] flex justify-center border-b border-slate-200 dark:border-white/5 transition-colors">
      <div className="relative w-full max-w-lg aspect-[21/9] bg-gradient-to-r from-blue-700 to-sky-900 overflow-hidden flex flex-col justify-center px-6 shadow-inner">
        <h2 className="text-white font-black text-3xl italic tracking-tighter drop-shadow-md">TFM TOOL PRO</h2>
        <div className="flex gap-2 mt-2">
          <span className="bg-sky-500 text-black text-xs font-bold px-2 py-1 rounded">2 YEAR</span>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">3 MONTH</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="px-6 py-10 flex flex-col items-center text-center">
      <div className="mb-8">
        <div className="inline-block border border-[#ff6b00]/50 bg-[#25150c] rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
          <span className="text-[#ff6b00] text-xs font-bold tracking-wide">
            PREMIUM GSM SERVICES PLATFORM
          </span>
        </div>
      </div>

      <h1 className="text-5xl font-black leading-[1.1] mb-6 tracking-tight text-slate-900 dark:text-white">
        Professional <br />
        KALIFAOS <br />
        <span className="text-blue-600 dark:text-sky-400">Solutions</span>
      </h1>

      <p className="text-slate-600 dark:text-gray-300 text-[17px] leading-relaxed mb-10 max-w-md">
        Instant activation, premium unlock services, server credits, bypass tools, and professional KALIFAOS support trusted by users worldwide.
      </p>

      <div className="flex flex-col w-full gap-4 max-w-xs">
        {/* Adjusted to Natural Brand Color (#25D366) */}
        <a href="https://wa.me/2349161963225" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold shadow-[0_4px_20px_rgba(37,211,102,0.25)] transition-all active:scale-95">
          <WhatsAppIcon />
          WhatsApp Support
        </a>
        <a href="https://t.me/+PeoKYiTOWpozNDM0" target="_blank" rel="noopener noreferrer" className="bg-sky-500 hover:bg-sky-600 text-white dark:text-black rounded-xl py-4 flex items-center justify-center gap-2 font-semibold shadow-[0_4px_20px_rgba(14,165,233,0.25)] transition-all active:scale-95">
          <TelegramIcon />
          Telegram Channel
        </a>
      </div>
    </section>
  );
}

const servicesList = [
  {
    title: "Unlock Services",
    description: "Premium factory unlock and network unlock solutions with instant delivery.",
    icon: <Lock className="w-8 h-8 text-white dark:text-black" />,
    iconBg: "bg-blue-600 dark:bg-sky-400",
    glow: "shadow-[0_0_30px_rgba(37,99,235,0.2)] dark:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
  },
  {
    title: "iCloud Bypass",
    description: "Fast and reliable iCloud bypass solutions for supported iPhone and iPad devices.",
    icon: <Cloud className="w-8 h-8 text-white" />,
    iconBg: "bg-sky-500 dark:bg-blue-600", 
    glow: "shadow-[0_0_30px_rgba(14,165,233,0.2)] dark:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
  },
  {
    title: "Tool Activations",
    description: "Activate top KALIFAOS tools, dongles, and premium server packages instantly.",
    icon: <Cpu className="w-8 h-8 text-white dark:text-black" />,
    iconBg: "bg-blue-500 dark:bg-sky-300",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]"
  },
  {
    title: "Instant Delivery",
    description: "24/7 automated API system with lightning-fast processing and support.",
    icon: <Zap className="w-8 h-8 text-white fill-white" />,
    iconBg: "bg-sky-600 dark:bg-blue-700",
    glow: "shadow-[0_0_30px_rgba(3,105,161,0.2)]"
  }
];

export function Services() {
  return (
    <section className="px-6 py-4 pb-12 flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto">
      {servicesList.map((service, idx) => (
        <div key={idx} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm dark:shadow-none transition-all">
          <div className={`w-20 h-20 ${service.iconBg} rounded-[1.5rem] flex items-center justify-center mb-6 ${service.glow}`}>
            {service.icon}
          </div>
          <h3 className="text-slate-900 dark:text-white text-2xl font-medium mb-3">{service.title}</h3>
          <p className="text-slate-500 dark:text-gray-400 text-[15px] leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export function Stats() {
  return (
    <section className="px-6 pb-16 flex flex-col items-center gap-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div className="bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm dark:shadow-none">
          <span className="text-4xl font-bold text-blue-600 dark:text-sky-400 mb-2">25k+</span>
          <span className="text-slate-500 dark:text-gray-400 text-sm">Completed Orders</span>
        </div>
        
        <div className="bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm dark:shadow-none">
          <span className="text-4xl font-bold text-sky-500 dark:text-blue-500 mb-2">24/7</span>
          <span className="text-slate-500 dark:text-gray-400 text-sm">Server Active</span>
        </div>
        
        <div className="bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center col-span-2 lg:col-span-1 shadow-sm dark:shadow-none">
          <span className="text-4xl font-bold text-blue-500 dark:text-sky-300 mb-2">99%</span>
          <span className="text-slate-500 dark:text-gray-400 text-sm">Success Rate</span>
        </div>
      </div>
    </section>
  );
}

export function Payments() {
  return (
    <section className="px-6 pb-24 text-center">
      <h3 className="text-slate-900 dark:text-white text-3xl font-medium mb-8">Secure Payments</h3>
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 max-w-[360px] mx-auto">
        <div className="bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-none p-3 rounded-2xl flex items-center justify-center w-28 h-20 shadow-sm"><PayPalIcon /></div>
        <div className="bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-none p-3 rounded-2xl flex items-center justify-center w-28 h-20 shadow-sm"><BitcoinIcon /></div>
        <div className="bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-none p-3 rounded-2xl flex items-center justify-center w-28 h-20 shadow-sm"><VisaLogo /></div>
        <div className="bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-none p-3 rounded-2xl flex items-center justify-center w-28 h-20 shadow-sm"><MastercardIcon /></div>
        <div className="bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-none p-3 rounded-2xl flex items-center justify-center w-28 h-20 shadow-sm">
          <Landmark className="w-10 h-10 text-blue-600 dark:text-sky-400" />
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  const commonClasses = "w-14 h-14 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
      {/* Telegram Button */}
      <a
        href="https://t.me/+PeoKYiTOWpozNDM0"
        target="_blank"
        rel="noopener noreferrer"
        title="Contact on Telegram"
        className={`${commonClasses} bg-[#33A8E2] shadow-[0_4px_15px_rgba(51,168,226,0.4)]`}
      >
        <TelegramIcon />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2349161963225"
        target="_blank"
        rel="noopener noreferrer"
        title="Contact on WhatsApp"
        className={`${commonClasses} bg-[#25D366] shadow-[0_4px_15px_rgba(37,211,102,0.4)]`}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
