'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setChat } from '../redux/slicer/CheckChat';

// UI Components
import Toggle from './Toggle';
import SearchBar from './SearchBar';

// Firebase Logic
import { auth, db } from '@/server/firebaseApi';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { logoutUser } from '@/server/firebaseApi';

// Icons
import { 
  Unlock, Menu, X, Search, Terminal, ChevronRight, 
  User, LogIn, LogOut, Shield, UserPlus, Loader2,
  Users, HardDrive, Monitor, Youtube, MessageSquare, Globe
} from 'lucide-react';

export default function Navigate() {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value); // chat acts as mobile menu toggle
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminSection, setIsAdminSection] = useState(false);

  // Determine if we are in admin section
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setIsAdminSection(hostname.startsWith('admin.') || pathname.startsWith('/admin'));
    }
  }, [pathname]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
        } catch (error) {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Scroll listener for Navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NEW: Block Body Scroll when Menu or Search is Open ---
  useEffect(() => {
    if (chat || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount to ensure scrolling is restored
    return () => {
      document.body.style.overflow = '';
    };
  }, [chat, searchOpen]);
  // ----------------------------------------------------------

  if (!mounted) return <div className="h-20 w-full" />;

  const toggleMenu = () => {
    if (searchOpen) setSearchOpen(false);
    dispatch(setChat(!chat));
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      if (chat) dispatch(setChat(false));
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'FRP APKS', href: '/frp-tools-apk-download' },
    { name: 'Windows tools', href: '/windows-tools?list_page=1' },
  ];

  const adminLinks = [
    { name: 'Users', href: '/users', icon: <Users size={16}/> },
    { name: 'Downloads', href: '/downloads', icon: <HardDrive size={16}/> },
    { name: 'Windows', href: '/windows-files', icon: <Monitor size={16}/> },
    { name: 'YouTube', href: '/youtube-videos', icon: <Youtube size={16}/> },
    { name: 'Messages', href: '/contact-messages', icon: <MessageSquare size={16}/> },
  ];

  const currentLinks = isAdminSection ? adminLinks : publicLinks;

  return (
    <>
      <header
        className={`fixed bg-white/90 dark:bg-[#050505]/90 top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled || isAdminSection
            ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* --- LOGO --- */}
            <a href="/" className="group flex items-center gap-3 relative z-50">
              <div className={`p-2 rounded-lg border transition-all duration-300 ${
                isAdminSection
                  ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-blue-600 dark:text-cyan-500 group-hover:border-blue-400 dark:group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              }`}>
                {isAdminSection ? <Shield size={20} /> : <Unlock size={20} />}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none text-slate-900 dark:text-white">
                  KALIFA<span className={isAdminSection ? 'text-red-500' : 'text-blue-600 dark:text-cyan-500'}>OS</span>
                </span>
                <span className="text-[10px] font-mono opacity-50 tracking-widest text-black dark:text-gray-100 uppercase">
                  {isAdminSection ? 'Admin Console' : 'System v2.0'}
                </span>
              </div>
            </a>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden md:flex items-center space-x-8">
              {currentLinks.map((link: any) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 text-sm font-medium transition-colors duration-200 group py-2 
                    text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white 
                    ${pathname === link.href ? 'text-blue-600 dark:text-white' : ''}`}
                >
                  {isAdminSection} 
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isAdminSection ? 'bg-red-500' : 'bg-blue-600 dark:bg-cyan-500'
                  } ${pathname === link.href ? 'w-full' : ''}`}></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-5">
              {!isAdminSection && (
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-2 rounded-full transition-all hover:scale-110 
                    ${searchOpen 
                      ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-black' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                >
                  {searchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              )}

              <div className="hidden sm:block">
                <Toggle />
              </div>

              {/* Desktop Auth Section */}
              <div className="hidden md:flex items-center gap-2 border-l border-slate-800/50 pl-5 min-w-[120px] justify-end">
                {isAuthLoading ? (
                  <Loader2 size={20} className="animate-spin text-slate-400 dark:text-slate-600" />
                ) : !user ? (
                  <>
                    <a href="/login" className="text-xs font-bold uppercase px-3 py-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white">
                      Login
                    </a>
                    <a href="/register" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-500/10 dark:text-cyan-400 dark:border dark:border-cyan-500/20 dark:hover:bg-cyan-500 dark:hover:text-black">
                      <UserPlus size={14} /> Join
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    {isAdmin ? (
                      <a href={isAdminSection ? "https://kalifaos.site" : "/admin"} className={`p-2 rounded-lg transition-all ${isAdminSection ? 'bg-blue-50 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400' : 'bg-orange-50 text-orange-600 dark:bg-red-500/10 dark:text-red-400'}`}>
                        {isAdminSection ? <Globe size={18} /> : <Shield size={18} />}
                      </a>
                    ) : (
                      <a href="/profile" className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                        <User size={18} />
                      </a>
                    )}
                    <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-slate-800">
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden relative z-50">
                <button 
                  onClick={toggleMenu}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 transition-all"
                >
                  {chat ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        {!isAdminSection && (
          <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white dark:bg-[#0a0a0a] ${
            searchOpen ? 'max-h-96 border-b border-slate-800/50 shadow-xl' : 'max-h-0'
          }`}>
            <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        )}

        {/* --- MOBILE MENU --- */}
        <div className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-white dark:bg-[#0a0a0a] fixed left-0 w-full ${
          chat ? 'top-20 opacity-100' : '-top-[100vh] opacity-0 pointer-events-none'
        }`} style={{ height: 'calc(100vh - 80px)' }}>
          
          <div className="container mx-auto px-6 py-8 space-y-4 pb-24">
            {/* User Card Mobile */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <a href="/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                    <LogIn size={16} /> Login
                  </a>
                  <a href="/register" onClick={toggleMenu} className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase bg-blue-600 dark:bg-cyan-500 text-white dark:text-black">
                    <UserPlus size={16} /> Join
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${isAdmin ? 'from-red-500 to-orange-600' : 'from-cyan-500 to-blue-600'}`}>
                      {isAdmin ? <Shield size={24} /> : <User size={24} />}
                    </div>
                    <div>
                      <p className="text-base font-bold leading-tight text-slate-900 dark:text-white">{user.displayName || 'Operator'}</p>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${isAdmin ? 'text-red-500' : 'text-cyan-500'}`}>
                        {isAdmin ? 'SEC_LEVEL_ADMIN' : 'SEC_LEVEL_USER'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile User/Admin Links */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {isAdmin ? (
                      <a 
                        href={isAdminSection ? "https://kalifaos.site" : "/admin"} 
                        onClick={toggleMenu} 
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border transition-all ${
                          isAdminSection 
                            ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30' 
                            : 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30'
                        }`}
                      >
                        {isAdminSection ? <><Globe size={16} /> Client</> : <><Shield size={16} /> Admin</>}
                      </a>
                    ) : (
                      <a 
                        href="/profile" 
                        onClick={toggleMenu} 
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <User size={16} /> Profile
                      </a>
                    )}
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 dark:hover:text-red-400"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Main Links */}
            {currentLinks.map((link: any, index) => (
              <a
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className="flex items-center justify-between p-4 rounded-xl border transition-all border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-3">
                  <span className={isAdminSection ? 'text-red-500' : 'opacity-50'}>
                    {<Terminal size={16} />}
                  </span>
                  <span className="font-semibold uppercase text-xs tracking-wider">{link.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </a>
            ))}

            <div className="pt-4 space-y-3">
               <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-2">System Config</p>
               <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-700">
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">DARK_MODE_STATUS</span>
                <Toggle />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-20" /> 
    </>
  );
}
