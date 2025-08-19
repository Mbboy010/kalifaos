// app/components/home/HomeClient.js
"use client";

import HomePage from './HomePage';
import Loading from '../loading/Loading';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from '../redux/slicer/Load';
import { setChat } from '../redux/slicer/CheckChat';

export default function HomeClient() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChat(false));
    dispatch(setLoad(false));

    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div>
            <HomePage />  
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
