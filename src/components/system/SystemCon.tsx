'use client';

import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { trackClick } from '@/lib/trackClick';
import { 
  Terminal, 
  Cpu, 
  Smartphone, 
  Layers, 
  AlertOctagon, 
  ChevronRight, 
  Play,
  Loader2
} from 'lucide-react';

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

// Configuration with Cyber Colors
const BRAND_CONFIG: Record<
  Brand,
  {
    label: string;
    subLabel: string;
    textColor: string;
    borderColor: string;
    bgGradient: string;
    Logo: React.FC<any>;
  }
> = {
  samsung: { 
    label: 'SAMSUNG_CORE', 
    subLabel: 'OneUI Services',
    textColor: 'text-blue-500', 
    borderColor: 'border-blue-500',
    bgGradient: 'from-blue-500/10',
    Logo: SamsungLogoCustom 
  },
  infinix: { 
    label: 'INFINIX_XOS', 
    subLabel: 'System Daemons',
    textColor: 'text-green-500', 
    borderColor: 'border-green-500',
    bgGradient: 'from-green-500/10',
    Logo: InfinixLogoCustom 
  },
  tecno: { 
    label: 'TECNO_HIOS', 
    subLabel: 'Root Processes',
    textColor: 'text-indigo-500', 
    borderColor: 'border-indigo-500',
    bgGradient: 'from-indigo-500/10',
    Logo: TecnoLogoCustom 
  },
  others: { 
    label: 'GENERIC_ANDROID', 
    subLabel: 'AOSP Utilities',
    textColor: 'text-red-500', 
    borderColor: 'border-red-500',
    bgGradient: 'from-red-500/10',
    Logo: AndroidLogoCustom 
  },
};

export default function SystemCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [appsData, setAppsData] = useState<Record<Brand, AppData[]>>({
    samsung: [],
    infinix: [],
    tecno: [],
    others: [],
  });
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasData = Object.values(appsData).some((arr) => arr.length > 0);

  // --- BRAND SECTION COMPONENT ---
  const AppSection = ({ brand, data }: { brand: Brand; data: AppData[] }) => {
    const { label, subLabel, textColor, borderColor, bgGradient, Logo } = BRAND_CONFIG[brand];
    if (data.length === 0) return null;

    return (
      <div className={`mb-12 rounded-2xl border overflow-hidden transition-all duration-300 ${
        isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isColor ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${isColor ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                <Logo className={`w-5 h-5 ${textColor}`} />
             </div>
             <div>
                <h2 className={`text-sm font-bold tracking-widest ${textColor}`}>{label}</h2>
                <p className="text-[10px] font-mono opacity-50 uppercase">{subLabel}</p>
             </div>
          </div>
          <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
            isColor ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'
          }`}>
            QTY: {data.length}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/20">
          {data.map(({ id, title, link }) => (
            <a
              key={id}
              href={`intent://${link}/#Intent;scheme=android-app;end`}
              onClick={(e) => {
                if (!navigator.userAgent.includes('Android')) {
                  e.preventDefault();
                  alert('System Warning: Android Kernel required for execution.');
                } else {
                  trackClick(`system-apps/${brand}/${title}`);
                }
              }}
              className={`group relative p-4 flex items-center gap-4 transition-all duration-200 ${
                 isColor 
                   ? 'bg-[#0a0a0a] hover:bg-slate-900' 
                   : 'bg-white hover:bg-slate-50'
              }`}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
              
              {/* Status Indicator (Left Bar) */}
              <div className={`w-1 h-8 rounded-full ${
                 isColor ? 'bg-slate-800 group-hover:bg-current' : 'bg-slate-200 group-hover:bg-current'
              } ${textColor} transition-colors`}></div>

              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-bold truncate transition-colors ${
                  isColor ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-black'
                }`}>
                  {title}
                </h3>
                <p className={`text-[10px] font-mono opacity-40 group-hover:opacity-70 ${textColor}`}>
                  /bin/execute
                </p>
              </div>

              {/* Action Button */}
              <div className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 ${
                 isColor ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'
              }`}>
                <Play size={10} fill="currentColor" />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-6xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
            isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
          }`}>
            <Cpu size={12} />
            <span>SYSTEM_ROOT // APPLICATIONS</span>
          </div>
          
          <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            System <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Access Point</span>
          </h1>
          
          <p className={`text-lg max-w-xl mx-auto leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct launch protocols for hidden system applications. Force-start activities for setup wizard bypass.
          </p>
        </div>

        {/* --- CONTENT --- */}
        <div className="min-h-[50vh]">
          {loading ? (
             <SkeletonLoader isColor={isColor} />
          ) : hasData ? (
             <div>
                {(Object.keys(appsData) as Brand[]).map((brand) => (
                  <AppSection key={brand} brand={brand} data={appsData[brand]} />
                ))}
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
               <AlertOctagon size={48} className="mb-4" />
               <p>No system modules detected.</p>
            </div>
          )}
        </div>

        {/* --- FOOTER WARNING --- */}
        <div className={`mt-8 p-4 rounded-xl border flex items-center gap-4 ${
          isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <Smartphone size={20} className={isColor ? 'text-slate-500' : 'text-slate-400'} />
          <p className="text-xs font-mono opacity-60">
            NOTE: These commands use the `intent://` protocol. They will only function on physical Android hardware. Emulators may fail.
          </p>
        </div>

      </div>
    </div>
  );
}

// --- CYBER SKELETON LOADER ---
const SkeletonLoader = ({ isColor }: { isColor: boolean }) => (
  <div className="space-y-8 animate-pulse">
    {[...Array(2)].map((_, i) => (
      <div key={i} className={`rounded-2xl border overflow-hidden ${isColor ? 'border-slate-800' : 'border-slate-200'}`}>
         {/* Header */}
         <div className={`h-14 border-b flex items-center px-6 gap-4 ${isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`w-8 h-8 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            <div className={`h-4 w-32 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
         </div>
         {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/10">
            {[...Array(6)].map((_, j) => (
               <div key={j} className={`h-20 p-4 flex items-center gap-4 ${isColor ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                  <div className={`w-1 h-8 rounded-full ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  <div className="space-y-2 flex-1">
                     <div className={`h-3 w-3/4 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                     <div className={`h-2 w-1/2 rounded ${isColor ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    ))}
  </div>
);
