'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/server/firebaseApi';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppSelector } from '@/components/redux/hooks';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';

// Authorized Root Admins - Keep this synced with your Login Page
const ADMIN_EMAILS = ['m880yka@gmail.com', 'mbboy@kalifaos.site']; 

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const isColor = useAppSelector((state) => state.color.value);
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');

  useEffect(() => {
    const cookieName = 'admin-token'; // Match your login cookie
    const hasToken = document.cookie
      .split('; ')
      .some(row => row.startsWith(`${cookieName}=`));

    let timeout: NodeJS.Timeout;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        setStatus('authorized');
      } else if (!hasToken) {
        setStatus('denied');
        handleRedirect();
      } else {
        // Cookie exists but Firebase not ready, wait a bit
        timeout = setTimeout(() => {
          if (!auth.currentUser) {
            setStatus('denied');
            handleRedirect();
          }
        }, 3000);
      }
    });

    return () => {
      unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const handleRedirect = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const redirectUrl = isProduction 
      ? 'https://app.kalifaos.site/login' 
      : 'http://localhost:3000/login';
    
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  };

  if (status === 'loading') {
    return (
      <div className={`h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 ${
        isColor ? 'bg-[#050505] text-cyan-500' : 'bg-slate-50 text-blue-600'
      }`}>
        <div className="relative flex items-center justify-center">
          <Loader2 className="animate-spin mb-4 opacity-20" size={80} strokeWidth={1} />
          <Lock className="absolute mb-4 animate-pulse" size={24} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
          Synchronizing_Admin_Session...
        </p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className={`h-screen w-full flex flex-col items-center justify-center ${
        isColor ? 'bg-[#050505] text-red-500' : 'bg-white text-red-600'
      }`}>
        <ShieldAlert size={48} className="mb-4 animate-bounce" />
        <h2 className="text-xl font-black uppercase tracking-tighter">Access Denied</h2>
        <p className="font-mono text-[10px] uppercase mt-2 opacity-60">
          Redirecting to Authorization Portal...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}