'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/server/firebaseApi';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppSelector } from '@/components/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';

// Authorized Root Admins
const ADMIN_EMAILS = ['m880yka@gmail.com', 'mbboy@kalifaos.site']; 

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const isColor = useAppSelector((state) => state.color.value);
  const pathname = usePathname();
  const router = useRouter();
  
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');

  // 1. If we are on the login page, don't guard it.
  const isLoginPage = pathname === '/os/login';

  useEffect(() => {
    // Skip logic if we are already on the login page
    if (isLoginPage) {
      setStatus('authorized');
      return;
    }

    const cookieName = 'admin-token';
    const hasToken = document.cookie
      .split('; ')
      .some(row => row.startsWith(`${cookieName}=`));

    // Fast check: If no cookie exists, middleware should have caught this, 
    // but we deny here as a fallback.
    if (!hasToken) {
      setStatus('denied');
      handleRedirect();
      return;
    }

    let timeout: NodeJS.Timeout;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        setStatus('authorized');
      } else {
        // If Firebase says no user but we have a token, give Firebase 3 seconds to sync
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
  }, [isLoginPage]);

  const handleRedirect = () => {
    // Since we are already on the admin subdomain, we just need to go to /login
    // router.push is better than window.location to avoid full page flickers
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  // If on login page, just show the login page immediately
  if (isLoginPage) return <>{children}</>;

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
          Authenticating_Operator...
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
          Redirecting to Login...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
