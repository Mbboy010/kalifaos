'use client';

import Toggle from './Toggle';
import SearchBar from './SearchBar';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setChat } from '../redux/slicer/CheckChat';
import Link from 'next/link';
// Added User, LogIn, LogOut, and Shield icons
import { Unlock, Menu, X, Search, Terminal, ChevronRight, User, LogIn, LogOut, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavigateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigate({ darkMode, setDarkMode }: NavigateProps) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value);
  
  // --- AUTH STATE ---
  // Assuming your auth slice looks like this. Adjust the paths to match your actual Redux store.
  const { user, isAdmin } = useAppSelector((state) => state.auth || { user: null, isAdmin: false });
  
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const handleLogout = () => {
    // Add your Firebase sign-out logic here
    console.log("Logging out...");
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
              ? 'bg-[#050505]/90 backdrop-blur-xl border-slate-800 shadow-lg' 
              : 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* --- LOGO --- */}
            <Link href="/" className="group flex items-center gap-3 relative z-50">
              <div className={`p-2 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-cyan-500 group-hover:border-cyan-500' 
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
                <span className="text-[10px] font-mono opacity-50 tracking-widest uppercase">System v2.0</span>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group py-2 ${
                    darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    darkMode ? 'bg-cyan-500' : 'bg-blue-600'
                  } ${pathname === link.href ? 'w-full' : ''}`}></span>
                </Link>
              ))}
            </nav>

            {/* --- CONTROLS & AUTH --- */}
            <div className="flex items-center gap-3 md:gap-5">
              
              {/* Search Toggle */}
              <button onClick={toggleSearch} className={`p-2 transition-all ${darkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'}`}>
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Theme Toggle (Hidden on very small screens) */}
              <div className="hidden sm:block">
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>

              {/* --- AUTH BUTTONS (Desktop) --- */}
              <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-5">
                {!user ? (
                  <Link href="/login" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-white' : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white'
                  }`}>
                    <LogIn size={14} /> Login
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    {isAdmin ? (
                      <Link href="/admin" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white'}`}>
                        <Shield size={18} />
                      </Link>
                    ) : (
                      <Link href="/profile" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-slate-300 hover:text-cyan-400' : 'bg-slate-100 text-slate-600 hover:text-blue-600'}`}>
                        <User size={18} />
                      </Link>
                    )}
                    <button onClick={handleLogout} className={`p-2 rounded-lg transition-all ${darkMode ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-600'}`}>
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={toggleMenu} className={`p-2 rounded-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {chat ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`md:hidden fixed w-full overflow-y-auto transition-all duration-500 ${
          chat ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } ${darkMode ? 'bg-[#050505]' : 'bg-white'}`} style={{ height: 'calc(100vh - 80px)' }}>
          
          <div className="px-6 py-8 space-y-4">
            
            {/* User Status Card (Mobile) */}
            <div className={`p-5 rounded-2xl border-2 border-dashed mb-6 ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
              {!user ? (
                <div className="space-y-4">
                  <p className="text-xs font-mono opacity-50 uppercase tracking-tighter">Identity: Anonymous</p>
                  <Link href="/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-500 text-white font-bold text-sm">
                    <LogIn size={18} /> Login
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{user.displayName || 'User'}</p>
                      <p className={`text-[10px] font-mono ${isAdmin ? 'text-red-400' : 'text-cyan-400'}`}>
                        {isAdmin ? 'LVL_ADMIN_ACCESS' : 'LVL_USER_ACCESS'}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-red-500"><LogOut size={20} /></button>
                </div>
              )}
            </div>

            {/* Nav Links */}
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} onClick={toggleMenu} className={`flex items-center justify-between p-4 rounded-xl transition-all ${darkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                <span className="font-bold">{link.name}</span>
                <ChevronRight size={18} className="opacity-30" />
              </Link>
            ))}

            {/* Conditional User Links (Mobile) */}
            {user && (
              isAdmin ? (
                <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <Shield size={18} /> <span className="font-bold">Admin Control Panel</span>
                </Link>
              ) : (
                <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <User size={18} /> <span className="font-bold">User Profile Settings</span>
                </Link>
              )
            )}
          </div>
        </div>
      </header>
      <div className="h-20" /> 
    </>
  );
}
