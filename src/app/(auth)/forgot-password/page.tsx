'use client';

import { useState } from 'react';
import { useAppSelector } from '../../../components/redux/hooks';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Terminal, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const isColor = useAppSelector((state) => state.color.value);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Firebase reset password logic here
      console.log('Resetting password for:', email);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className={`min-h-screen flex  justify-center p-4 transition-colors duration-500 ${
      isColor ? 'bg-[#050505] text-slate-300' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] ${isColor ? 'opacity-100' : 'opacity-50'}`}></div>
      </div>

      <div className={`relative w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500 ${
        isColor ? 'bg-[#0a0a0a]/80 border-slate-800 shadow-[0_0_40px_rgba(239,68,68,0.05)]' : 'bg-white/80 border-slate-200'
      }`}>
        
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${
            isColor ? 'bg-slate-900 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            <KeyRound size={24} />
          </div>
          <h2 className={`text-2xl font-black tracking-tight ${isColor ? 'text-white' : 'text-slate-900'}`}>
            RESET_CREDENTIALS
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] font-mono uppercase tracking-widest opacity-50">
            <Terminal size={12} />
            <span>Recovery Protocol</span>
          </div>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
            <input
              type="email"
              placeholder="System Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none font-medium transition-all ${
                isColor ? 'bg-slate-900/50 border-slate-800 focus:border-red-500/50 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-red-500/50 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold tracking-wider uppercase transition-all mt-4 ${
            isColor ? 'bg-red-500 hover:bg-red-400 text-[#050505]' : 'bg-red-600 hover:bg-red-700 text-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? 'Processing...' : <><ArrowRight size={18} /> Transmit Reset Link</>}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm font-medium ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
          <Link href="/login" className={`font-bold flex items-center justify-center gap-2 w-full transition-colors ${
            isColor ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <ShieldCheck size={16} /> Return to Secure Login
          </Link>
        </div>
      </div>
    </div>
  );
}
