'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, Mail, Phone, Shield, Terminal, 
  Settings, LogOut, Cpu, Activity, Clock,
  Edit3, ShieldAlert, Globe, Loader2
} from 'lucide-react';

// Firebase Imports
import { auth, db } from '@/server/firebaseApi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  authMethod: string;
  createdAt?: any;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Real-time listener for user data from the 'users' collection
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          }
          setLoading(false);
        });

        return () => unsubscribeDoc();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050505]">
        <Cpu className="animate-spin text-blue-600 dark:text-cyan-500 mb-4" size={40} />
        <p className="font-mono text-xs tracking-widest opacity-50 dark:text-slate-400">SYNCHRONIZING_CORE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 transition-colors duration-500 bg-slate-100 text-slate-900 dark:bg-[#050505] dark:text-slate-300">
      
      {/* --- TOP NAV / HEADER --- */}
      <header className="w-full p-6 border-b backdrop-blur-md sticky top-0 z-50 bg-white/80 border-slate-200 dark:bg-[#0a0a0a]/80 dark:border-slate-800/50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Terminal size={20} className="text-blue-600 dark:text-cyan-500" />
            <span className="font-black tracking-tighter uppercase">Kernel_Identity_v1</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <LogOut size={14} /> Terminate_Session
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: CORE IDENTITY --- */}
        <section className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-2xl border text-center transition-all bg-white border-slate-200 shadow-xl dark:bg-[#0a0a0a] dark:border-slate-800 dark:shadow-2xl dark:shadow-cyan-500/5">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl border-2 flex items-center justify-center text-4xl font-black bg-blue-50 border-blue-200 text-blue-600 dark:bg-slate-900 dark:border-cyan-500/30 dark:text-white dark:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl border bg-blue-600 text-white border-white dark:bg-cyan-500 dark:text-black dark:border-slate-900">
                <Shield size={16} />
              </div>
            </div>
            
            <h1 className="text-2xl font-black tracking-tighter mb-1 text-slate-900 dark:text-white">
              {userData?.displayName || 'Unknown_Operator'}
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 dark:text-slate-400">
              Access_Level: {userData?.role || 'User'}
            </p>

            <button className="w-full py-3 rounded-xl border font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-400 dark:hover:text-white">
              <Edit3 size={14} /> Modify_Registry
            </button>
          </div>

          {/* SYSTEM STATUS CARD */}
          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2 dark:text-slate-400">
              <Activity size={14} /> System_Diagnostics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono opacity-60">Status:</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-500 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {userData?.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono opacity-60">Auth_Method:</span>
                <span className="text-xs font-bold uppercase">{userData?.authMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono opacity-60">Uptime_Since:</span>
                <span className="text-xs font-bold">
                   {userData?.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- RIGHT COLUMN: PARAMETERS --- */}
        <section className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
              <Settings className="text-blue-600 dark:text-cyan-500" /> Core_Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Param */}
              <div className="p-4 rounded-xl border bg-slate-50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-1 opacity-50">
                  <Mail size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Network_Address</span>
                </div>
                <div className="text-sm font-bold font-mono truncate">{userData?.email}</div>
              </div>

              {/* Phone Param */}
              <div className="p-4 rounded-xl border bg-slate-50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-1 opacity-50">
                  <Phone size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Comms_Line</span>
                </div>
                <div className="text-sm font-bold font-mono">{userData?.phoneNumber || 'No_Line_Assigned'}</div>
              </div>

              {/* UID Param */}
              <div className="p-4 rounded-xl border md:col-span-2 bg-slate-50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-1 opacity-50">
                  <ShieldAlert size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Unique_Identifier (UID)</span>
                </div>
                <div className="text-[10px] font-mono break-all opacity-80">{userData?.uid}</div>
              </div>
            </div>
          </div>

          {/* ACTION HUB */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/settings/security" className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900">
              <Lock size={24} className="text-blue-600 dark:text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Security_Keys</span>
            </Link>
            
            <Link href="/settings/notifications" className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900">
              <Activity size={24} className="text-blue-600 dark:text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sys_Logs</span>
            </Link>

            <Link href="/" className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900">
              <Globe size={24} className="text-blue-600 dark:text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Public_View</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
