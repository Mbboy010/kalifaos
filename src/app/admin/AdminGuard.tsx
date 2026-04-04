'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/server/firebaseApi'; // Ensure 'db' (Firestore) is exported here
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 
import { useAppSelector } from '@/components/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const isColor = useAppSelector((state) => state.color.value);
  const pathname = usePathname();
  const router = useRouter();
  
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');

  const isLoginPage = pathname === '/os/login';

  useEffect(() => {
    if (isLoginPage) {
      setStatus('authorized');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // 1. Reference the user's document in the 'users' collection
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // 2. Check the 'role' field in the database
            if (userData.role === 'admin') {
              setStatus('authorized');
            } else {
              console.warn(`User ${user.uid} is not an admin.`);
              setStatus('denied');
              handleRedirect();
            }
          } else {
            console.error('No user document found in database.');
            setStatus('denied');
            handleRedirect();
          }
        } catch (error) {
          console.error('Database fetch error:', error);
          setStatus('denied');
          handleRedirect();
        }
      } else {
        setStatus('denied');
        handleRedirect();
      }
    });

    return () => unsubscribe();
  }, [isLoginPage]);

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/os/login');
    }, 2000);
  };

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
          Querying_Security_Database...
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
          Insufficient Permissions. Redirecting...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
