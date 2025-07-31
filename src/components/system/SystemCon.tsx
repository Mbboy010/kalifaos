'use client';

import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { trackClick } from '@/lib/trackClick';

import {
  AndroidLogoCustom,
  SamsungLogoCustom,
  InfinixLogoCustom,
  TecnoLogoCustom,
} from '../svg/Icons';

type AppData = {
  id: string;
  title: string;
  link: string;
};

type Brand = 'samsung' | 'infinix' | 'tecno' | 'others';

const BRAND_CONFIG: Record<
  Brand,
  {
    label: string;
    color: string;
    Logo: React.FC;
  }
> = {
  samsung: { label: 'Samsung apps', color: 'text-blue-500', Logo: SamsungLogoCustom },
  infinix: { label: 'Infinix apps', color: 'text-green-500', Logo: InfinixLogoCustom },
  tecno: { label: 'Tecno apps', color: 'text-blue-500', Logo: TecnoLogoCustom },
  others: { label: 'Others mobile apps', color: 'text-red-500', Logo: AndroidLogoCustom },
};

export default function SystemCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [appsData, setAppsData] = useState<Record<Brand, AppData[]>>({
    samsung: [],
    infinix: [],
    tecno: [],
    others: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const brands: Brand[] = ['samsung', 'infinix', 'tecno', 'others'];

      try {
        const results = await Promise.all(
          brands.map(async (brand) => {
            const querySnapshot = await getDocs(collection(db, 'contents', 'system', brand));
            const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AppData[];
            return { brand, items };
          }),
        );

        const updatedData = results.reduce(
          (acc, { brand, items }) => {
            acc[brand] = items;
            return acc;
          },
          {} as Record<Brand, AppData[]>,
        );

        setAppsData(updatedData);
      } catch (error) {
        console.error('Error fetching system apps:', error);
      }
    };

    fetchData();
  }, []);

  const hasData = Object.values(appsData).some((arr) => arr.length > 0);

  const AppSection = ({ brand, data }: { brand: Brand; data: AppData[] }) => {
    const { label, color, Logo } = BRAND_CONFIG[brand];

    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col mb-10">
        <h2 className={`text-2xl md:text-3xl font-bold text-center ${color} mb-8`}>{label}</h2>
        {data.map(({ id, title, link }) => (
          <a
            className="w-full mb-3 block"
            href={`intent://${link}/#Intent;scheme=android-app;end`}
            key={id}
            onClick={(e) => {
              if (!navigator.userAgent.includes('Android')) {
                e.preventDefault();
                alert('This feature is available on Android devices only.');
              } else {
                // Save click info by brand + title
                trackClick(`system-apps/${brand}/${title}`);
              }
            }}
          >
            <div
              style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
              className="flex items-center hover:bg-gray-700 p-3 shadow rounded-lg transition-all duration-200 border border-gray-300 dark:border-gray-700"
            >
              <div className="rounded-3xl text-white p-2 mr-4">
                <Logo />
              </div>
              <div>
                <h2 className={`text-base md:text-lg font-semibold ${color}`}>Open {title}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="p-6  mb-7">
          <h1 className="text-3xl mt-16 font-bold mb-2">System Applications</h1>
          <p>Access and manage your system applications</p>
        </div>

        <div className="w-full mb-4 flex flex-col gap-2 min-h-screen">
          {hasData ? (
            <div className="w-full px-4">
              {(Object.keys(appsData) as Brand[]).map((brand) => (
                <AppSection key={brand} brand={brand} data={appsData[brand]} />
              ))}
            </div>
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </div>
    </div>
  );
}

const SkeletonLoader = () => (
  <div className="w-full flex flex-col gap-2 min-h-screen">
    {[...Array(2)].map((_, sectionIdx) => (
      <div key={sectionIdx} className="w-full max-w-5xl mx-auto flex flex-col mb-10">
        <div className="flex justify-center items-center text-center mb-8">
          <div className="h-5 w-[50%] bg-gray-300 animate-pulse rounded" />
        </div>
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="px-4 py-1">
            <div
              style={{ backgroundColor: '#72727236' }}
              className="flex items-center p-2 shadow rounded-lg border border-gray-300 dark:border-gray-700"
            >
              <div className="p-3 mr-4">
                <div className="w-11 h-11 bg-gray-300 animate-pulse rounded-3xl" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-[50%] bg-gray-300 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

