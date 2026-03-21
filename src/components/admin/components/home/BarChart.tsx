'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { db } from '@/server/firebaseApi';
import { collection, getDocs } from 'firebase/firestore';
import { TrendingUp, BarChart3, Loader2 } from 'lucide-react';

interface ChartData {
  name: string;
  pv: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-red-500/30 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-white font-bold text-lg">
            {payload[0].value.toLocaleString()} <span className="text-xs font-normal text-gray-500">views</span>
            </p>
        </div>
      </div>
    );
  }
  return null;
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'pageViews'));
        const data: ChartData[] = [];

        snapshot.forEach((docSnap) => {
          const docId = docSnap.id;
          const docData = docSnap.data();

          if (docId !== 'allView' && docData?.count) {
            // Shorten name if it's too long for the X-axis
            const displayName = docId.length > 10 ? `${docId.substring(0, 10)}...` : docId;
            data.push({ name: displayName, pv: docData.count });
          }
        });

        // Sort by views and take top 7
        const topPages = data.sort((a, b) => b.pv - a.pv).slice(0, 7);
        setChartData(topPages);
      } catch (err) {
        console.error('Failed to fetch top page views:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageViews();
  }, []);

  return (
    <div className="w-full h-[350px] bg-[#090909] border border-[#222] rounded-3xl p-6 relative overflow-hidden group">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-500" />
            Most Viewed Pages
            </h2>
            <p className="text-xs text-gray-500 mt-1">Traffic performance overview</p>
        </div>
        <div className="bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#333] flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs text-gray-400">Live Data</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-[220px]">
        {loading ? (
           <div className="h-full w-full flex flex-col items-center justify-center text-gray-600 gap-3">
             <Loader2 className="w-8 h-8 animate-spin text-red-600" />
             <span className="text-xs">Analyzing traffic...</span>
           </div>
        ) : chartData.length === 0 ? (
           <div className="h-full w-full flex items-center justify-center text-gray-600">
             No data available yet
           </div>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                {/* Gradients */}
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                
                <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10 }}
                    dy={10}
                />
                
                <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10 }}
                />

                <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ fill: '#ffffff05' }}
                />

                <Bar 
                    dataKey="pv" 
                    fill="url(#colorPv)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={32}
                    animationDuration={1500}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="url(#colorPv)" strokeWidth={0} />
                    ))}
                </Bar>
            </ReBarChart>
            </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarChart;
