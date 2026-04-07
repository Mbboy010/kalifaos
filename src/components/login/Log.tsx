'use client';

import { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Terminal, Unlock, AlertCircle, Loader2 } from 'lucide-react';

// Firebase Imports
import { auth } from '@/server/firebaseApi';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

export default function Log() {
  const isColor = useAppSelector((state) => state.color.value);
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- UPDATED HELPER: SECURE CROSS-DOMAIN LOGIN ---
  const finalizeLogin = async (user: any) => {
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Get Firebase token
  const token = await user.getIdToken();

  // 2. Send token to backend (THIS IS THE FIX)
  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  // 3. Check admin role
  const ADMIN_EMAILS = ['m880yka@gmail.com', 'mbboy@kalifaos.site'];
  const isAdmin = ADMIN_EMAILS.includes(user.email);

  // 4. Redirect
  if (isProduction) {
    window.location.href = isAdmin
      ? "https://admin.kalifaos.site/"
      : "https://kalifaos.site/";
  } else {
    window.location.href = isAdmin
      ? "http://admin.localhost:3000/"
      : "http://localhost:3000/";
  }
};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await finalizeLogin(result.user);
    } catch (err: any) {
      console.error("Auth Error:", err.code);
      setError(err.code === 'auth/invalid-credential' 
        ? 'Invalid System Credentials' 
        : 'Access Denied: Connection Failure');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      await finalizeLogin(result.user);
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      setError('Google Authority Verification Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center p-4 transition-colors duration-500 ${
      isColor ? 'bg-[#050505] text-slate-300' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] ${isColor ? 'opacity-100' : 'opacity-50'}`}></div>
      </div>

      <div className={`relative w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500 ${
        isColor ? 'bg-[#0a0a0a]/80 border-slate-800 shadow-[0_0_40px_rgba(6,182,212,0.05)]' : 'bg-white/80 border-slate-200'
      }`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${
            isColor ? 'bg-slate-900 border-cyan-500/30 text-cyan-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Unlock size={24} />
          </div>
          <h2 className={`text-2xl font-black tracking-tight ${isColor ? 'text-white' : 'text-slate-900'}`}>
            SYSTEM_LOGIN
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] font-mono uppercase tracking-widest opacity-50">
            <Terminal size={12} />
            <span>Secure Authentication Protocol</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-bold uppercase tracking-wider ${
            isColor ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
            <input
              type="email"
              placeholder="System Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none font-medium transition-all ${
                isColor ? 'bg-slate-900/50 border-slate-800 focus:border-cyan-500/50 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
            <input
              type="password"
              placeholder="Access Code (Password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none font-medium transition-all ${
                isColor ? 'bg-slate-900/50 border-slate-800 focus:border-cyan-500/50 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder-slate-400'
              }`}
            />
            <div className="flex justify-end mt-2">
              <Link href="/forgot-password" className={`text-xs font-bold transition-colors ${
                isColor ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
              }`}>
                Forgot Access Code?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold tracking-wider uppercase transition-all mt-4 ${
              isColor ? 'bg-cyan-500 hover:bg-cyan-400 text-[#050505]' : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <><Unlock size={18} /> Authenticate</>
            )}
          </button>
        </form>

        {/* Google Auth */}
        <div className="mt-6">
          <div className="relative flex items-center py-4">
            <div className={`flex-grow border-t ${isColor ? 'border-slate-800' : 'border-slate-200'}`}></div>
            <span className={`flex-shrink-0 mx-4 text-[10px] font-mono uppercase tracking-widest ${isColor ? 'text-slate-500' : 'text-slate-400'}`}>Or connect via</span>
            <div className={`flex-grow border-t ${isColor ? 'border-slate-800' : 'border-slate-200'}`}></div>
          </div>
          <button 
            onClick={handleGoogleSignIn} 
            disabled={isLoading}
            type="button" 
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border font-bold transition-all ${
              isColor ? 'bg-slate-900/50 border-slate-700 hover:bg-slate-800 text-white hover:border-slate-600' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google Authority
          </button>
        </div>

        {/* View Toggle */}
        <div className={`mt-8 text-center text-sm font-medium ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>
            Unregistered operator?{' '}
            <Link href="/register" className={`font-bold transition-colors ${isColor ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}>
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
