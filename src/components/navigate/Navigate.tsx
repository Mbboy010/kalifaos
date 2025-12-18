// app/components/layout/Navigate.tsx
'use client';

import Toggle from './Toggle';
import SearchBar from './SearchBar';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setChat } from '../redux/slicer/CheckChat';
import Link from 'next/link';
import { Unlock, Menu, X, Search, Terminal, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavigateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigate({ darkMode, setDarkMode }: NavigateProps) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value);
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (searchOpen) setSearchOpen(false);
    dispatch(setChat(!chat));
  };

  const toggleSearch = () => {
    if (chat) dispatch(setChat(false));
    setSearchOpen(!searchOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'FRP Vault', href: '/frp-tools-apk-download' },
    { name: 'System Core', href: '/system-apps' },
    { name: 'Win Tools', href: '/windows-tools?list_page=1' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? darkMode 
              ? 'bg-[#050505]/90 backdrop-blur-xl border-slate-800 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-sm'
            : darkMode
              ? 'bg-transparent border-transparent'
              : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* --- LOGO --- */}
            <Link href="/" className="group flex items-center gap-3 relative z-50">
              <div className={`p-2 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-cyan-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                  : 'bg-white border-slate-200 text-blue-600 group-hover:border-blue-400'
              }`}>
                <Unlock size={20} />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl tracking-tight leading-none ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  KALIFA<span className={darkMode ? 'text-cyan-500' : 'text-blue-600'}>OS</span>
                </span>
                <span className="text-[10px] font-mono opacity-50 tracking-widest uppercase">
                  System v2.0
                </span>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group py-2 ${
                    darkMode 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {/* Cyber Underline Effect */}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    darkMode ? 'bg-cyan-500' : 'bg-blue-600'
                  } ${pathname === link.href ? 'w-full' : ''}`}></span>
                </Link>
              ))}
            </nav>

            {/* --- CONTROLS --- */}
            <div className="flex items-center gap-4">
              
              {/* Search Toggle */}
              <button 
                onClick={toggleSearch}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode 
                    ? searchOpen ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : searchOpen ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMenu}
                  className={`p-2 rounded-lg border transition-all ${
                    darkMode 
                      ? 'border-slate-800 text-slate-300 bg-slate-900' 
                      : 'border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  {chat ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR DROPDOWN --- */}
        <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          searchOpen ? 'max-h-96 border-b border-slate-800/50' : 'max-h-0'
        }`}>
          <SearchBar darkMode={darkMode} open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          chat ? 'max-h-screen opacity-100 border-b border-slate-800' : 'max-h-0 opacity-0'
        } ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          
          <div className="container mx-auto px-6 py-6 space-y-2">
            
            {/* Mobile Links */}
            {[
              ...navLinks, 
              { name: 'Settings & Lock', href: '/setting-and-lock-screen' },
              { name: 'About System', href: '/about' }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400' 
                    : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="opacity-50" />
                  <span className="font-semibold">{link.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            ))}

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between p-4 mt-4 rounded-xl border border-dashed border-slate-700">
              <span className={`text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                SYSTEM THEME
              </span>
              <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" /> 
    </>
  );
}
