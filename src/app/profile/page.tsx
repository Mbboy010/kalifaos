'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, Mail, Phone, Shield, Terminal, 
  Settings, LogOut, Cpu, Activity, Clock,
  Edit3, ShieldAlert, Globe, Loader2, Lock,
  MapPin, Calendar, SwatchBook, Binary, HardDrive
} from 'lucide-react';

// Firebase Imports
import { auth, db } from '@/server/firebaseApi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface UserData {
  uid: string;
  name: string; // Map to the 'name' field in your registry
  email: string;
  phone: string;
  role: string;
  status: string;
  authMethod: string;
  country: string;
  city: string;
  address: string;
  gender: string;
  dob: string;
  createdAt?: any;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          }
          setLoading(false);
        });

        return () => unsubscribeDoc();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col  justify-center bg-slate-50 dark:bg-[#050505]">
        <Cpu className="animate-spin mt-20 text-blue-600 dark:text-cyan-500 mb-4" size={40} />
        <p className="font-mono text-xs tracking-widest opacity-50 dark:text-slate-400">SYNCHRONIZING_CORE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 transition-colors duration-500 bg-slate-100 text-slate-900 dark:bg-[#050505] dark:text-slate-300">

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: IDENTITY NODE --- */}
        <section className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-2xl border text-center transition-all bg-white border-slate-200 shadow-xl dark:bg-[#0a0a0a] dark:border-slate-800 dark:shadow-2xl">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl border-2 flex items-center justify-center text-4xl font-black bg-blue-50 border-blue-200 text-blue-600 dark:bg-slate-900 dark:border-cyan-500/30 dark:text-white">
                {userData?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl border bg-blue-600 text-white border-white dark:bg-cyan-500 dark:text-black dark:border-slate-900 shadow-lg">
                <Shield size={16} />
              </div>
            </div>
            
            <h1 className="text-2xl font-black tracking-tighter mb-1 text-slate-900 dark:text-white">
              {userData?.name || 'Musa Hakilu'}
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-500 mb-6">
              Full-Stack Developer & Security Expert
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
               <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-[10px] font-mono border dark:border-slate-800">
                  ID: {userData?.uid?.slice(0, 8)}...
               </span>
            </div>

            <button className="w-full py-3 rounded-xl border font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-400 dark:hover:text-white">
              <Edit3 size={14} /> Update_Core_Registry
            </button>
          </div>

          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2 dark:text-slate-400">
              <Activity size={14} /> Live_Telemetry
            </h3>
            <div className="space-y-4">
              <StatusRow label="System_Status" value={userData?.status || 'Active'} isStatus />
              <StatusRow label="Auth_Authority" value={userData?.authMethod || 'Firebase'} />
              <StatusRow 
                label="Node_Uptime" 
                value={userData?.createdAt?.toDate ? userData.createdAt.toDate().toLocaleDateString() : 'Established'} 
              />
            </div>
          </div>
        </section>

        {/* --- RIGHT: DATA MODULES --- */}
        <section className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
              <Binary className="text-blue-600 dark:text-cyan-500" /> Encrypted_Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParamCard icon={<Mail size={14} />} label="Network_Address" value={userData?.email} />
              <ParamCard icon={<Phone size={14} />} label="Comms_Line" value={userData?.phone || '+234 ...'} />
              <ParamCard icon={<MapPin size={14} />} label="Geolocation" value={`${userData?.city || 'Kaduna'}, ${userData?.country || 'Nigeria'}`} />
              <ParamCard icon={<Calendar size={14} />} label="Cycle_Date (DOB)" value={userData?.dob || 'YYYY-MM-DD'} />
              <ParamCard icon={<SwatchBook size={14} />} label="Identity_Type" value={userData?.gender || 'Not_Set'} />
              <ParamCard icon={<ShieldAlert size={14} />} label="Protocol_ID" value={userData?.uid} fullWidth />
            </div>
          </div>

          {/* ASSET ARCHIVE / PROJECTS SECTION */}
          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <HardDrive className="text-blue-600 dark:text-cyan-500" /> Active_Asset_Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProjectNode name="Asstudio" type="Marketplace" />
              <ProjectNode name="Kalifa OS" type="Firmware" />
              <ProjectNode name="SolDevHub" type="Web3" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard icon={<Lock size={20} />} label="Security_Vault" href="/settings/security" />
            <ActionCard icon={<Activity size={20} />} label="System_Logs" href="/settings/logs" />
            <ActionCard icon={<Globe size={20} />} label="Global_Sync" href="/" />
          </div>
        </section>
      </main>
    </div>
  );
}

// Sub-components for cleaner structure
function StatusRow({ label, value, isStatus = false }: { label: string, value: string, isStatus?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-mono opacity-60 uppercase">{label}:</span>
      <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${isStatus ? 'text-green-500' : ''}`}>
        {isStatus && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
        {value}
      </span>
    </div>
  );
}

function ParamCard({ icon, label, value, fullWidth = false }: { icon: any, label: string, value?: string, fullWidth?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border bg-slate-50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center gap-3 mb-1 opacity-50">
        {icon} <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-sm font-bold font-mono truncate">{value || 'DATA_PENDING'}</div>
    </div>
  );
}

function ProjectNode({ name, type }: { name: string, type: string }) {
  return (
    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 text-center">
      <p className="font-black text-xs uppercase tracking-tighter mb-1">{name}</p>
      <p className="text-[8px] font-mono opacity-50 uppercase tracking-[0.2em]">{type}</p>
    </div>
  );
}

function ActionCard({ icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <Link href={href} className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-900">
      <div className="text-blue-600 dark:text-cyan-500">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
}
