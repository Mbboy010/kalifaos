'use client';

import { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  Trash2, 
  Smartphone, 
  Mail, 
  Fingerprint, 
  User, 
  Copy, 
  Check, 
  Users 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface UserSummary {
  id: string;
  imei: string;
  email: string;
  deviceType: string;
}

// Modern Skeleton Card
const SkeletonCard = () => (
  <div className="bg-[#111] border border-[#222] p-5 rounded-2xl animate-pulse flex items-start gap-4">
    <div className="w-12 h-12 bg-[#222] rounded-full" />
    <div className="flex-1 space-y-3">
      <div className="h-4 bg-[#222] rounded w-1/2" />
      <div className="h-3 bg-[#222] rounded w-3/4" />
      <div className="h-8 bg-[#222] rounded w-full mt-2" />
    </div>
  </div>
);

const UserSummaryComponent: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          collection(db, 'trialRequests'),
          orderBy('timestamp', 'desc'),
          limit(6) // Even number looks better in grid
        );
        const querySnapshot = await getDocs(q);
        const usersData: UserSummary[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imei: doc.data().imei || 'Unknown IMEI',
          email: doc.data().email || 'No Email Provided',
          deviceType: doc.data().deviceType || 'Unknown Device',
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this request?")) return;
    try {
      await deleteDoc(doc(db, 'trialRequests', id));
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSeeMore = () => {
    router.push('/users');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[#222] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Requests</h2>
              <p className="text-sm text-gray-500">Trial access applications</p>
            </div>
          </div>
          
          {!loading && users.length > 0 && (
             <button
             onClick={handleSeeMore}
             className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
           >
             View All <ChevronRight className="w-4 h-4" />
           </button>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          ) : users.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 bg-[#111] rounded-2xl border border-dashed border-[#333]">
                No recent requests found.
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="group relative bg-[#111] border border-[#222] hover:border-red-600/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/10 flex flex-col gap-4 overflow-hidden"
              >
                {/* Top Row: Avatar & Actions */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-[#333] flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <span className="block text-sm font-semibold text-white">
                            {user.deviceType}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-500 bg-green-900/20 px-1.5 py-0.5 rounded w-fit mt-0.5">
                            <Smartphone className="w-3 h-3" /> New Device
                        </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-gray-600 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                    title="Delete Request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Info Block */}
                <div className="space-y-3">
                    {/* Email */}
                    <div className="flex items-center gap-3 text-sm text-gray-400 bg-[#1a1a1a] p-2 rounded-lg border border-[#2a2a2a]">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="truncate">{user.email}</span>
                    </div>

                    {/* IMEI (Copyable) */}
                    <div 
                        onClick={() => copyToClipboard(user.imei, user.id)}
                        className="flex items-center justify-between gap-3 text-sm text-red-200/80 bg-red-900/10 p-2 rounded-lg border border-red-900/20 cursor-pointer hover:bg-red-900/20 transition-colors group/imei"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <Fingerprint className="w-4 h-4 shrink-0 text-red-500" />
                            <span className="font-mono tracking-wide truncate">{user.imei}</span>
                        </div>
                        {copiedId === user.id ? (
                            <Check className="w-3 h-3 text-green-400" />
                        ) : (
                            <Copy className="w-3 h-3 opacity-50 group-hover/imei:opacity-100" />
                        )}
                    </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-red-600/10 transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserSummaryComponent;
