// app/components/loading/Loading.tsx
'use client';

import OrbitingDotsSpinner from './OrbitingDotsSpinner';
import { useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter,usePathname } from 'next/navigation';
import type { RootState } from '../redux/store';
import type { AppDispatch } from '../redux/store';

export default function Loading() {
  const load = useSelector((state: RootState) => state.load.value);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  
  useEffect(() => {
    
    
    
      document.body.scrollTo({ top: 0, behavior: 'smooth' });

    
    
  },[pathname]);

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <OrbitingDotsSpinner />
    </div>
  );
}