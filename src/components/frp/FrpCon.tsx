'use client';

import { Download, ShieldAlert, Smartphone } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { incrementToolCount } from '@/lib/incrementToolCount';

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
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

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

  const handleDownload = async (title: string, url: string) => {
    try {
      setLoading((prev) => ({ ...prev, [title]: true }));

      await incrementToolCount(title);

      const response = await fetch(url, { mode: 'cors' });

      if (!response.ok) throw new Error('Failed to fetch file.');

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${title}.apk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);

      // Fallback: Open the URL directly
      try {
        window.open(url, '_blank');
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
      }
    } finally {
      setLoading((prev) => ({ ...prev, [title]: false }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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

      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col gap-2">
          {istrue ? (
            data.map((element: ToolData, index: number) => (
              <button
                className="px-1 py-1 block text-left w-full"
                key={index}
                onClick={() => handleDownload(element.title, element.link)}
                disabled={loading[element.title]}
              >
                <div
                  style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                  className="flex items-center p-3 shadow rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  <div className="p-2 mr-3">
                    {loading[element.title] ? (
                      <div className="w-11 h-11 flex items-center justify-center">
                        <svg
                          className="animate-spin h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      <Download className="w-11 h-11 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-500">{element.title}</h2>
                    <p>version: {element.version}</p>
                    {loading[element.title] && (
                      <p className="text-sm text-gray-500">Downloading...</p>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="w-full flex flex-col gap-2">
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