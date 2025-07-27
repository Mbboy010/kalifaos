// app/components/home/HomeClient.js
"use client";

import HomePage from './HomePage';
import HomeCon from './HomeCon';
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
    <div>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-screen min-h-screen">
            <HomePage />  
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
