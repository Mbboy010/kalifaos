'use client';

import { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  Trash2, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  Inbox,
  User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp?: Timestamp | null;
}

// Helper to format Firestore timestamp
const formatDate = (timestamp?: Timestamp | null) => {
  if (!timestamp) return 'Unknown Date';
  return timestamp.toDate().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const SkeletonMessage = () => (
  <div className="flex gap-4 p-4 border-b border-[#222] bg-[#111] animate-pulse rounded-lg">
    <div className="w-10 h-10 rounded-full bg-[#222]" />
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <div className="w-32 h-4 bg-[#222] rounded" />
        <div className="w-20 h-4 bg-[#222] rounded" />
      </div>
      <div className="w-3/4 h-3 bg-[#222] rounded" />
      <div className="w-full h-12 bg-[#222] rounded mt-2" />
    </div>
  </div>
);

const ContractMessagesComponent: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
            collection(db, 'contactMessages'), 
            orderBy('timestamp', 'desc'),
            limit(5)
        );
        const snapshot = await getDocs(q);
        const data: ContactMessage[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Anonymous',
          email: doc.data().email || 'No Email',
          phone: doc.data().phone || 'No Phone',
          subject: doc.data().subject || 'No Subject',
          message: doc.data().message || '',
          timestamp: doc.data().timestamp || null,
        }));
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contact messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(!confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleSeeMore = () => {
    router.push('/contact-messages');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
              <Inbox className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Inbox</h2>
              <p className="text-sm text-gray-500">Recent contact form submissions</p>
            </div>
        </div>

        {/* Message List */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
            {loading ? (
                <div className="p-4 space-y-4">
                    {[1,2,3].map(i => <SkeletonMessage key={i}/>)}
                </div>
            ) : messages.length === 0 ? (
                <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                    <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                    <p>No messages received yet.</p>
                </div>
            ) : (
                <div className="divide-y divide-[#222]">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="group relative p-5 hover:bg-[#111] transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-[#333] flex items-center justify-center text-gray-300 font-bold shadow-inner">
                                        {message.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-white font-medium truncate pr-2">{message.name}</h3>
                                        <span className="flex items-center gap-1 text-[10px] text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#2a2a2a] whitespace-nowrap">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(message.timestamp)}
                                        </span>
                                    </div>

                                    {/* Subject */}
                                    <p className="text-red-400 text-sm font-medium mb-2">{message.subject}</p>

                                    {/* Contact Chips */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#151515] text-gray-400 border border-[#222]">
                                            <Mail className="w-3 h-3" /> {message.email}
                                        </span>
                                        {message.phone && message.phone !== 'N/A' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#151515] text-gray-400 border border-[#222]">
                                                <Phone className="w-3 h-3" /> {message.phone}
                                            </span>
                                        )}
                                    </div>

                                    {/* Message Body */}
                                    <div className="relative">
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 border-l-2 border-[#333] pl-3">
                                            {message.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="ml-2">
                                    <button
                                        onClick={(e) => handleDelete(message.id, e)}
                                        className="p-2 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Footer Action */}
            {!loading && messages.length > 0 && (
                <div className="bg-[#0f0f0f] p-3 border-t border-[#222] text-center">
                    <button
                        onClick={handleSeeMore}
                        className="text-xs font-semibold text-gray-400 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors py-2"
                    >
                        View All Messages <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>

      </div>
    </section>
  );
};

export default ContractMessagesComponent;
