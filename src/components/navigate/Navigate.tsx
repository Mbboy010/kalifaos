'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setChat } from '../redux/slicer/CheckChat';

// UI Components
import Toggle from './Toggle';
import SearchBar from './SearchBar';

// Firebase Logic
import { logoutUser } from '@/server/firebaseApi';

// Icons
import { 
  Unlock, Menu, X, Search, Terminal, ChevronRight, 
  User, LogIn, LogOut, Shield, UserPlus, Settings 
} from 'lucide-react';

interface NavigateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigate({ darkMode, setDarkMode }: NavigateProps) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value); // Mobile Menu State
  const { user, isAdmin } = useAppSelector((state) => state.auth || { user: null, isAdmin: false });
  
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for glassmorphism
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      if (chat) dispatch(setChat(false));
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
                <span className={`font-bold text-xl tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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
              <button 
                onClick={toggleSearch}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode 
                    ? searchOpen ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : searchOpen ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Theme Toggle (Desktop) */}
              <div className="hidden sm:block">
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>

              {/* Desktop Auth Section */}
              <div className="hidden md:flex items-center gap-2 border-l border-slate-800/50 pl-5">
                {!user ? (
                  <>
                    <Link href="/login" className={`text-xs font-bold uppercase px-3 py-2 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600'}`}>
                      Login
                    </Link>
                    <Link href="/register" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      <UserPlus size={14} /> Join
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    {isAdmin ? (
                      <Link href="/admin" title="Admin Panel" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-orange-50 text-orange-600'}`}>
                        <Shield size={18} />
                      </Link>
                    ) : (
                      <Link href="/profile" title="Profile" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-slate-300 hover:text-cyan-400' : 'bg-slate-100 text-slate-600 hover:text-blue-600'}`}>
                        <User size={18} />
                      </Link>
                    )}
                    <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMenu}
                  className={`p-2 rounded-lg border transition-all ${
                    darkMode ? 'border-slate-800 text-slate-300 bg-slate-900' : 'border-slate-200 text-slate-700 bg-white'
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
        } ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          <SearchBar darkMode={darkMode} open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          chat ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`} style={{ height: 'calc(100vh - 80px)' }}>
          
          <div className="container mx-auto px-6 py-8 space-y-4 pb-24">
            
            {/* Mobile User Card */}
            <div className={`p-5 rounded-2xl border-2 border-dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={toggleMenu} className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase border ${darkMode ? 'border-slate-700 text-white' : 'border-slate-200 text-slate-900'}`}>
                    <LogIn size={16} /> Login
                  </Link>
                  <Link href="/register" onClick={toggleMenu} className="flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase">
                    <UserPlus size={16} /> Join
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                      <User size={20} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.displayName || 'Operator'}</p>
                      <p className={`text-[10px] font-mono ${isAdmin ? 'text-red-400' : 'text-cyan-400'}`}>
                        {isAdmin ? 'SEC_LEVEL_ADMIN' : 'SEC_LEVEL_USER'}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-red-500"><LogOut size={20} /></button>
                </div>
              )}
            </div>

            {/* Mobile Links */}
            {[
              ...navLinks, 
              { name: 'Settings & Lock', href: '/setting-and-lock-screen', icon: <Settings size={18}/> },
              { name: 'About System', href: '/about', icon: <Terminal size={18}/> }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/50 text-slate-300' 
                    : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-50">{link.icon || <Terminal size={16} />}</span>
                  <span className="font-semibold">{link.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            ))}

            {/* Mobile System Controls */}
            <div className="pt-4 space-y-3">
               <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-2">System Config</p>
               <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-700">
                <span className={`text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  DARK_MODE_ACTIVE
                </span>
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="h-20" /> 
    </>
  );
}
