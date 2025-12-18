// app/components/loading/Loading.tsx
'use client';

import OrbitingDotsSpinner from './OrbitingDotsSpinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import type { RootState } from '../redux/store';
import type { AppDispatch } from '../redux/store';

export default function Loading() {
  const load = useSelector((state: RootState) => state.load.value);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  useEffect(() => {
    // Always scroll to top whenever the route (pathname) changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'auto' }); // 'auto' makes it instant
    }
  }, [pathname]);

  return (
    <div className="flex justify-center items-center w-full h-[75vh]">
      <OrbitingDotsSpinner />
    </div>
  );
}