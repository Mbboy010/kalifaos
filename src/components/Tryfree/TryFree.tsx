'use client';

import TryCon from './TryCon';
import Loading from '@/components/loading/Loading';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from '@/components/redux/slicer/Load';
import { setChat } from '@/components/redux/slicer/CheckChat';

export default function TryFree() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChat(false));
    dispatch(setLoad(false));
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return <div>{loading ? <TryCon /> : <Loading />}</div>;
}