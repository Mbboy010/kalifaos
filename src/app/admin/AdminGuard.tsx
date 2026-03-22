'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/server/firebaseApi';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppSelector } from '@/components/redux/hooks';
import { Loader2, ShieldAlert } from 'lucide-react';

// Authorized Root Admins
const ADMIN_EMAILS = ['musa@kalifaos.site', 'mbboy@kalifaos.site']; 

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const isColor = useAppSelector((state) => state.color.value);
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        setStatus('authorized');
      } else {
        setStatus('denied');
        // Redirect to main app login after a short delay
        setTimeout(() => {
          window.location.href = 'https://app.kalifaos.site/login';
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, []);

  if (status === 'loading') {
    return (
      <div className={`h-screen w-full flex flex-col items-center justify-center ${
        isColor ? 'bg-[#050505] text-cyan-500' : 'bg-white text-blue-600'
      }`}>
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-70">
          Initialising_Secure_Session...
        </p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className={`h-screen w-full flex flex-col items-center justify-center ${
        isColor ? 'bg-[#050505] text-red-500' : 'bg-white text-red-600'
      }`}>
        <ShieldAlert size={48} className="mb-4" />
        <h2 className="text-xl font-black uppercase tracking-tighter">Access Denied</h2>
        <p className="font-mono text-[10px] uppercase mt-2 opacity-60">
          Redirecting to Authorization Portal...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
