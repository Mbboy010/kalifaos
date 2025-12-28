'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { db } from '@/server/firebaseApi';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { MessageSquare, Send, User, Hash, Clock, Terminal, AlertCircle } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp?: any;
}

export default function Comments({ contentId }: { contentId: string }) {
  // Logic: isColor = true (Dark Mode), isColor = false (Light Mode)
  const isColor = useAppSelector((state) => state.color.value);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  // 🔹 Fetch comments in real-time
  useEffect(() => {
    if (!contentId) return;

    const q = query(
      collection(db, 'Windows-tools', contentId, 'comments'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, 'id'>),
      }));
      setComments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [contentId]);

  // 🔹 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) return;

    try {
      await addDoc(collection(db, 'Windows-tools', contentId, 'comments'), {
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        timestamp: serverTimestamp(),
      });
      setFormData({ name: '', email: '', comment: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className={`mt-12 rounded-2xl border p-6 md:p-8 transition-colors duration-300 ${
      isColor 
        ? 'bg-[#0f0f0f] border-slate-800' 
        : 'bg-white border-slate-200 shadow-sm'
    }`}>
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 mb-8 border-b border-dashed border-slate-700/50 pb-4">
        <Terminal className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
        <h2 className={`text-lg font-mono font-bold uppercase tracking-wider ${
          isColor ? 'text-slate-200' : 'text-slate-800'
        }`}>
          /var/log/user_feedback
        </h2>
      </div>

      {/* --- COMMENT FEED --- */}
      <div className="space-y-6 mb-12 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <div className="flex items-center gap-2 opacity-50 font-mono text-sm">
            <span className="animate-pulse">_</span> Loading data stream...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`relative group rounded-lg p-5 border-l-2 transition-all hover:bg-opacity-50 ${
                isColor 
                  ? 'bg-slate-900/40 border-l-cyan-500/50 border-t border-r border-b border-transparent hover:border-slate-700' 
                  : 'bg-slate-50 border-l-blue-500 border-t border-r border-b border-slate-100'
              }`}
            >
              {/* User Meta */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${
                    isColor ? 'bg-slate-800 text-cyan-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <User size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isColor ? 'text-slate-200' : 'text-slate-800'}`}>
                      {comment.name}
                    </span>
                    <span className="text-[10px] opacity-50 font-mono">{comment.email}</span>
                  </div>
                </div>
                
                {/* Timestamp */}
                <div className={`flex items-center gap-1 text-[10px] font-mono opacity-50 ${
                  isColor ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Clock size={10} />
                  {comment.timestamp?.toDate
                    ? comment.timestamp.toDate().toLocaleString()
                    : 'Syncing...'}
                </div>
              </div>

              {/* Message Content */}
              <p className={`text-sm leading-relaxed font-mono ${
                isColor ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <span className="opacity-30 mr-2 select-none">{'>'}</span>
                {comment.comment}
              </p>
            </div>
          ))
        ) : (
          <div className={`text-center py-8 border border-dashed rounded-lg ${
             isColor ? 'border-slate-800 text-slate-600' : 'border-slate-300 text-slate-400'
          }`}>
            <Hash className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-mono">No log entries found. Be the first to write.</p>
          </div>
        )}
      </div>

      {/* --- INPUT TERMINAL --- */}
      <div className={`rounded-xl p-6 border ${
        isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <h3 className={`text-sm font-bold uppercase mb-4 flex items-center gap-2 ${
           isColor ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <MessageSquare size={14} /> Initialize Transmission
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="relative">
               <input
                type="text"
                name="name"
                placeholder="Agent Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 pl-10 rounded-lg bg-transparent border outline-none font-mono text-sm transition-all ${
                  isColor 
                    ? 'border-slate-700 text-white focus:border-cyan-500 focus:bg-slate-800' 
                    : 'border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
                }`}
              />
              <User size={14} className="absolute left-3 top-3.5 opacity-50" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Secure Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 pl-10 rounded-lg bg-transparent border outline-none font-mono text-sm transition-all ${
                  isColor 
                    ? 'border-slate-700 text-white focus:border-cyan-500 focus:bg-slate-800' 
                    : 'border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
                }`}
              />
              <div className="absolute left-3 top-3.5 opacity-50 text-[10px]">@</div>
            </div>
          </div>

          {/* Comment Area */}
          <textarea
            name="comment"
            placeholder="Input data packet content..."
            value={formData.comment}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-transparent border outline-none font-mono text-sm transition-all min-h-[100px] ${
              isColor 
                ? 'border-slate-700 text-white focus:border-cyan-500 focus:bg-slate-800' 
                : 'border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
            }`}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
              isColor 
                ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
            }`}
          >
            <Send size={16} />
            Transmit Data
          </button>
        </form>
      </div>
    </div>
  );
}
