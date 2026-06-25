'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, Mail, Phone, Shield, Terminal, 
  Settings, LogOut, Cpu, Activity, Clock,
  Edit3, ShieldAlert, Globe, Loader2, Lock,
  MapPin, Calendar, SwatchBook, Binary, HardDrive, Map,
  DollarSign, PlusCircle, History, CreditCard,
  Smartphone, Server, Wrench // Added icons for the new services
} from 'lucide-react';

// Firebase Imports
import { auth, db } from '@/server/firebaseApi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Financial types
interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'deposit' | 'withdrawal' | 'payment';
}

// New Service History types
interface ServiceLog {
  id: string;
  serviceType: 'IMEI Service' | 'Server Service' | 'Tool Rent Service';
  details: string; // e.g., "Device Unlock", "FRP Bypass", "Box Rent 24h"
  date: string;
  status: 'success' | 'pending' | 'failed';
}

interface UserData {
  uid: string;
  name: string; 
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
  balance?: number;
  depositId?: string;
  transactions?: Transaction[];
  serviceLogs?: ServiceLog[]; // Added service logs field
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
      <div className="min-h-screen flex flex-col items-center  bg-slate-50 dark:bg-[#050505]">
        <Cpu className="animate-spin mt-20 text-blue-600 dark:text-cyan-500 mb-4" size={40} />
        <p className="font-mono text-xs tracking-widest opacity-50 dark:text-slate-400">SYNCHRONIZING_CORE...</p>
      </div>
    );
  }

  const displayAddress = userData?.address && userData.address !== '6yy' 
    ? userData.address 
    : 'Kargi, Kubau Local Government';
  
  const displayCity = userData?.city || 'Zaria';
  const displayCountry = userData?.country || 'Nigeria';

  return (
    <div className="min-h-screen pb-20 transition-colors duration-500 bg-slate-100 text-slate-900 dark:bg-[#050505] dark:text-slate-300">

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: IDENTITY NODE --- */}
        <section className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-2xl border text-center transition-all bg-white border-slate-200 shadow-xl dark:bg-[#0a0a0a] dark:border-slate-800 dark:shadow-2xl">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl border-2 flex items-center justify-center text-4xl font-black bg-blue-50 border-blue-200 text-blue-600 dark:bg-slate-900 dark:border-cyan-500/30 dark:text-white">
                {userData?.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl border bg-blue-600 text-white border-white dark:bg-cyan-500 dark:text-black dark:border-slate-900 shadow-lg">
                <Shield size={16} />
              </div>
            </div>
            
            <h1 className="text-2xl font-black tracking-tighter mb-1 text-slate-900 dark:text-white">
              {userData?.name || 'Unknown'}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-6 w-full">
               <span className="px-3 py-2 w-full rounded-xl bg-slate-100 dark:bg-slate-900 text-[10px] font-mono border dark:border-slate-800 break-all">
                  ID: {userData?.uid}
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
          
          {/* FINANCIAL MODULE */}
          <div className="p-8 rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest opacity-70 flex items-center gap-2 mb-2 text-cyan-400">
                  <DollarSign size={14} /> Available Balance
                </h3>
                <p className="text-4xl font-mono font-bold tracking-tight">
                  ${userData?.balance?.toFixed(2) || '0.00'}
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded bg-slate-950/50 border border-slate-700/50">
                  <p className="text-[10px] font-mono text-slate-300">
                    DEPOSIT_ID: <span className="text-cyan-400 font-bold">{userData?.depositId || 'NOT_ASSIGNED'}</span>
                  </p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <PlusCircle size={16} /> Add Funds
              </button>
            </div>
          </div>

          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
              <Binary className="text-blue-600 dark:text-cyan-500" /> Encrypted_Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParamCard icon={<Mail size={14} />} label="Network_Address" value={userData?.email} />
              <ParamCard icon={<Phone size={14} />} label="Comms_Line" value={userData?.phone || '+234 ...'} />
              
              <ParamCard icon={<Map size={14} />} label="Street_Address" value={displayAddress} />
              <ParamCard icon={<MapPin size={14} />} label="Geolocation" value={`${displayCity}, ${displayCountry}`} />
              
              <ParamCard icon={<Calendar size={14} />} label="Cycle_Date (DOB)" value={userData?.dob || 'YYYY-MM-DD'} />
              <ParamCard icon={<SwatchBook size={14} />} label="Identity_Type" value={userData?.gender || 'Not_Set'} />
              <ParamCard icon={<ShieldAlert size={14} />} label="Protocol_ID" value={userData?.uid} fullWidth />
            </div>
          </div>

          {/* TRANSACTION HISTORY MODULE */}
          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <History className="text-blue-600 dark:text-cyan-500" /> Transaction_Ledger
            </h2>
            
            <div className="space-y-3">
              {userData?.transactions && userData.transactions.length > 0 ? (
                userData.transactions.map((tx, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl border bg-slate-50 dark:bg-slate-900/30 dark:border-slate-800/80 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-full ${tx.type === 'deposit' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-cyan-400'}`}>
                        {tx.type === 'deposit' ? <PlusCircle size={16} /> : <CreditCard size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider dark:text-slate-200">{tx.type}</p>
                        <p className="text-[10px] font-mono opacity-50 mt-0.5">{tx.date} | Ref: {tx.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-mono font-bold ${tx.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </p>
                      <p className={`text-[9px] font-black uppercase tracking-[0.1em] mt-1 ${tx.status === 'completed' ? 'text-green-500' : tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-mono opacity-50 dark:text-slate-400">NO_TRANSACTION_DATA_FOUND</p>
                </div>
              )}
            </div>
          </div>

          {/* NEW SERVICE HISTORY MODULE */}
          <div className="p-8 rounded-2xl border bg-white border-slate-200 dark:bg-[#0a0a0a] dark:border-slate-800">
            <h2 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <Terminal className="text-blue-600 dark:text-cyan-500" /> Service_Execution_Logs
            </h2>
            
            <div className="space-y-3">
              {userData?.serviceLogs && userData.serviceLogs.length > 0 ? (
                userData.serviceLogs.map((log, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl border bg-slate-50 dark:bg-slate-900/30 dark:border-slate-800/80 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {log.serviceType === 'IMEI Service' && <Smartphone size={16} />}
                        {log.serviceType === 'Server Service' && <Server size={16} />}
                        {log.serviceType === 'Tool Rent Service' && <Wrench size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider dark:text-slate-200">{log.serviceType}</p>
                        <p className="text-[10px] font-mono opacity-50 mt-0.5">{log.date} | {log.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-[9px] font-black uppercase tracking-[0.1em] mt-1 ${log.status === 'success' ? 'text-green-500' : log.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                        {log.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-mono opacity-50 dark:text-slate-400">NO_SERVICE_HISTORY_FOUND</p>
                  <p className="text-[10px] font-mono opacity-40 mt-1 dark:text-slate-500">IMEI | SERVER | TOOL RENT</p>
                </div>
              )}
            </div>
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
