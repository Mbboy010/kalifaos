// app/components/loading/Loading.tsx
'use client';

import OrbitingDotsSpinner from './OrbitingDotsSpinner';
import ScrollToTop from '../startTopPage/ScrollToTop';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '../redux/store';
import type { AppDispatch } from '../redux/store';

export default function Loading() {
  const load = useSelector((state: RootState) => state.load.value);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // Add navigation logic here if needed (replacing useNavigate)
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <ScrollToTop />
      <OrbitingDotsSpinner />
    </div>
  );
}