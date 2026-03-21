'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';
import { 
  Download, 
  Monitor, 
  Trophy, 
  Activity, 
  BarChart3, 
  Loader2 
} from 'lucide-react';

interface DataItem {
  name: string;
  count: number;
}

export default function Content() {
  const [topDownloads, setTopDownloads] = useState<DataItem[]>([]);
  const [topSystems, setTopSystems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const downloadSnap = await getDocs(collection(db, 'toolClicks'));
        const systemSnap = await getDocs(collection(db, 'clicks'));

        const downloads: DataItem[] = [];
        const systems: DataItem[] = [];

        downloadSnap.forEach((doc) => {
          if (doc.id !== 'allDownload') {
            const data = doc.data();
            downloads.push({ name: doc.id, count: data.count || 0 });
          }
        });

        systemSnap.forEach((doc) => {
          if (doc.id !== 'allCheck') {
            const data = doc.data();
            systems.push({ name: doc.id, count: data.count || 0 });
          }
        });

        setTopDownloads(downloads.sort((a, b) => b.count - a.count).slice(0, 5));
        setTopSystems(systems.sort((a, b) => b.count - a.count).slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
                <Activity className="w-6 h-6 text-red-500" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">System Analytics</h2>
                <p className="text-sm text-gray-500">Real-time performance metrics</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Downloads Card */}
          <LeaderboardCard 
            title="Top Downloads" 
            icon={<Download className="w-5 h-5 text-blue-400" />}
            data={topDownloads}
            loading={loading}
            colorClass="bg-blue-500"
            borderClass="group-hover:border-blue-500/30"
          />

          {/* Systems Card */}
          <LeaderboardCard 
            title="Most Used Systems" 
            icon={<Monitor className="w-5 h-5 text-purple-400" />}
            data={topSystems}
            loading={loading}
            colorClass="bg-purple-500"
            borderClass="group-hover:border-purple-500/30"
          />
        </div>
      </div>
    </section>
  );
}

// --- Sub Components ---

const LeaderboardCard = ({ 
    title, 
    icon, 
    data, 
    loading, 
    colorClass,
    borderClass
}: { 
    title: string, 
    icon: React.ReactNode, 
    data: DataItem[], 
    loading: boolean,
    colorClass: string,
    borderClass: string
}) => {
    // Find max value for progress bar calculation
    const maxVal = data.length > 0 ? data[0].count : 1;

    return (
        <div className={`group bg-[#111] border border-[#222] ${borderClass} rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:bg-[#151515]`}>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1a1a1a] rounded-lg border border-[#333]">
                        {icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-600" />
            </div>

            <div className="space-y-4">
                {loading ? (
                    // Loading Skeletons
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 w-full bg-[#1a1a1a] animate-pulse rounded-lg" />
                    ))
                ) : data.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No data available</p>
                ) : (
                    data.map((item, index) => (
                        <div key={index} className="relative flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-[#222] overflow-hidden group/item hover:border-gray-700 transition-colors">
                            
                            {/* Background Progress Bar */}
                            <div 
                                className={`absolute left-0 top-0 bottom-0 opacity-10 ${colorClass} transition-all duration-1000 ease-out`} 
                                style={{ width: `${(item.count / maxVal) * 100}%` }} 
                            />

                            <div className="flex items-center gap-4 relative z-10">
                                {/* Rank Icon/Number */}
                                <div className="w-8 flex justify-center">
                                    {index === 0 ? <Trophy className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" /> :
                                     index === 1 ? <Trophy className="w-5 h-5 text-gray-400" /> :
                                     index === 2 ? <Trophy className="w-5 h-5 text-amber-700" /> :
                                     <span className="text-gray-600 font-mono font-bold text-sm">#{index + 1}</span>
                                    }
                                </div>
                                
                                <span className="text-gray-300 font-medium text-sm truncate max-w-[150px] sm:max-w-[200px]">
                                    {item.name}
                                </span>
                            </div>

                            <span className="relative z-10 font-mono font-bold text-white text-sm bg-[#1a1a1a] px-2 py-1 rounded border border-[#333]">
                                {item.count.toLocaleString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
