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
import { auth, db } from '@/server/firebaseApi';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { logoutUser } from '@/server/firebaseApi';

// Icons
import { 
  Unlock, Menu, X, Search, Terminal, ChevronRight, 
  User, LogIn, LogOut, Shield, UserPlus, Settings, Loader2
} from 'lucide-react';

interface NavigateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigate({ darkMode, setDarkMode }: NavigateProps) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value); // Mobile Menu State
  
  // Direct Firebase Auth State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen to Firebase Auth state directly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check Firestore for Admin Role
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

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
      if (chat) dispatch(setChat(false)); // Close menu on mobile after logout
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

            {/* --- CONTROLS & AUTH (DESKTOP) --- */}
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

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>

              {/* Desktop Auth Section */}
              <div className="hidden md:flex items-center gap-2 border-l border-slate-800/50 pl-5 min-w-[120px] justify-end">
                {isAuthLoading ? (
                  <Loader2 size={20} className={`animate-spin ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                ) : !user ? (
                  // NOT LOGGED IN
                  <>
                    <Link href="/login" className={`text-xs font-bold uppercase px-3 py-2 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>
                      Login
                    </Link>
                    <Link href="/register" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      <UserPlus size={14} /> Join
                    </Link>
                  </>
                ) : (
                  // LOGGED IN
                  <div className="flex items-center gap-3">
                    {isAdmin ? (
                      <Link href="/admin" title="Admin Panel" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}>
                        <Shield size={18} />
                      </Link>
                    ) : (
                      <Link href="/profile" title="User Profile" className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                        <User size={18} />
                      </Link>
                    )}
                    <button onClick={handleLogout} title="Logout" className={`p-2 rounded-lg transition-all ${darkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800' : 'text-slate-500 hover:text-red-500 hover:bg-slate-100'}`}>
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
            
            {/* --- MOBILE USER CARD --- */}
            <div className={`p-5 rounded-2xl border-2 border-dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
              {isAuthLoading ? (
                 <div className="flex justify-center py-4">
                    <Loader2 size={24} className={`animate-spin ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                 </div>
              ) : !user ? (
                // Not Logged In Mobile
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={toggleMenu} className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase border ${darkMode ? 'border-slate-700 text-white hover:bg-slate-800' : 'border-slate-300 text-slate-900 hover:bg-slate-100'}`}>
                    <LogIn size={16} /> Login
                  </Link>
                  <Link href="/register" onClick={toggleMenu} className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase transition-all ${darkMode ? 'bg-cyan-500 text-black' : 'bg-blue-600 text-white'}`}>
                    <UserPlus size={16} /> Join
                  </Link>
                </div>
              ) : (
                // Logged In Mobile
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${isAdmin ? 'bg-gradient-to-br from-red-500 to-orange-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'}`}>
                      {isAdmin ? <Shield size={24} /> : <User size={24} />}
                    </div>
                    <div>
                      <p className={`text-base font-bold leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.displayName || 'Operator'}</p>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${isAdmin ? 'text-red-500' : 'text-cyan-500'}`}>
                        {isAdmin ? 'SEC_LEVEL_ADMIN' : 'SEC_LEVEL_USER'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Auth Actions Mobile */}
                  <div className={`grid grid-cols-2 gap-3 pt-4 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    {isAdmin ? (
                      <Link href="/admin" onClick={toggleMenu} className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border ${darkMode ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-orange-200 text-orange-600 bg-orange-50'}`}>
                        <Shield size={16} /> Admin Panel
                      </Link>
                    ) : (
                      <Link href="/profile" onClick={toggleMenu} className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border ${darkMode ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
                        <User size={16} /> Profile
                      </Link>
                    )}
                    <button onClick={handleLogout} className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase border transition-colors ${darkMode ? 'border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-900/50' : 'border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50'}`}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
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
                  <span className="font-semibold uppercase text-xs tracking-wider">{link.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            ))}

            {/* Mobile System Controls */}
            <div className="pt-4 space-y-3">
               <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-2">System Config</p>
               <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-700">
                <span className={`text-xs font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  DARK_MODE_STATUS
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
