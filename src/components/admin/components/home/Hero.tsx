'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { db } from '@/server/firebaseApi';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Eye, Download, Cpu, Layers, CalendarClock } from 'lucide-react';

export default function Hero() {
  const [greeting, setGreeting] = useState('Welcome back');
  const [currentDate, setCurrentDate] = useState('');
  const [dashboardStats, setDashboardStats] = useState({
    visits: 0,
    downloads: 0,
    systems: 0,
    pages: 0,
  });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Time & Date Logic
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString(undefined, options));
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const visitsSnap = await getDoc(doc(db, 'pageViews', 'allView'));
        const downloadsSnap = await getDoc(doc(db, 'toolClicks', 'allDownload'));
        const systemsSnap = await getDoc(doc(db, 'clicks', 'allCheck'));

        const visits = visitsSnap.exists() ? visitsSnap.data().count || 0 : 0;
        const downloads = downloadsSnap.exists() ? downloadsSnap.data().count || 0 : 0;
        const systems = systemsSnap.exists() ? systemsSnap.data().count || 0 : 0;

        const pageViewsSnapshot = await getDocs(collection(db, 'pageViews'));
        const pages = pageViewsSnapshot.size > 0 ? pageViewsSnapshot.size - 1 : 0;

        setDashboardStats({ visits, downloads, systems, pages });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Animation
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [dashboardStats]);

  const statItems = [
    { label: 'Total Visits', value: dashboardStats.visits, icon: Eye, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Downloads', value: dashboardStats.downloads, icon: Download, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { label: 'Systems Check', value: dashboardStats.systems, icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Active Pages', value: dashboardStats.pages, icon: Layers, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  ];

  return (
    <section className="relative mt-14 w-full pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Admin</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Here is what is happening with your projects today.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-[#111] px-4 py-2 rounded-full border border-[#222]">
            <CalendarClock className="w-4 h-4" />
            {currentDate}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className={`relative p-6 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                {/* Optional: Add trend indicator here if needed */}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{item.label}</h3>
                <p className="text-3xl font-bold text-white tracking-tight">
                  {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
