// app/frp-tools/page.tsx
'use client';

import { Download, ShieldAlert, Smartphone } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';


// Define the type for Firestore documents
interface ToolData {
  id: string;
  title: string;
  version: string;
  link: string;
}



export default function FrpCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [data, setData] = useState<ToolData[]>([]);
  const [istrue, setIstrue] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, 'download'));
        const sortedData: ToolData[] = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as ToolData))
          .sort((a, b) => a.title.localeCompare(b.title));

        setData(sortedData);
        setIstrue(sortedData.length > 0);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mt-16 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Smartphone className="w-8 h-8 text-blue-600" />
          FRP Bypass Tools
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Download specialized tools to bypass Factory Reset Protection (FRP) on Android devices. Use with caution and only
          on devices you legally own.
        </p>
      </div>

      {/* Security Warning */}
      <div
        style={{ backgroundColor: isColor ? '#4f16164c' : '#f0cece4c' }}
        className="rounded-xl border-l-4 border-red-500 p-4 mb-8"
      >
        <div className="flex items-start">
          <ShieldAlert className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-500">Important Legal Notice</h3>
            <ul className="list-disc pl-5 mt-2 text-red-500 space-y-1">
              <li>FRP bypass may violate terms of service</li>
              <li>Only use on devices you legally own</li>
              <li>Some tools may trigger security warnings</li>
              <li>We are not responsible for bricked devices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download Tools */}
      <div className="flex flex-col  items-center">
        <div className="w-full flex flex-col gap-2">
          {istrue ? (
            data.map((element: ToolData, index: number) => (
              <a className="px-1 py-1 block" href={element.link} key={index}>
                <div
                  style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                  className="flex items-center  p-3 shadow rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  <div className="p-2 mr-3">
                    <Download className="w-11 h-11 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-500">{element.title}</h2>
                    <p>version: {element.version}</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="w-full flex flex-col  gap-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                  className="flex items-center p-2 shadow rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  <div className="p-3 mr-4">
                    <div className="w-11 h-11 bg-gray-300 animate-pulse rounded" />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 w-[50%] bg-gray-300 animate-pulse rounded" />
                    <div className="h-2 w-[70%] bg-gray-300 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
        className="mt-12 p-4 rounded-lg text-center text-sm border border-gray-300 dark:border-gray-700"
      >
        <p>
          These tools are provided for educational purposes only. Use at your own risk. We do not condone illegal use of FRP
          bypass tools.
        </p>
      </div>
    </div>
  );
}