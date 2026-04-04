'use client';

import { useState } from 'react';
import { 
  Lock, Mail, Loader2, Chrome, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { auth } from '@/server/firebaseApi';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await handleGoogleSignIn();
      router.push('/dashboard');
    } catch (err: any) {
      setError("Google authentication failed.");
    } finally {
      setGoogleLoading(false);
    }
  };
  
  /**
 * Logic: Google Sign-In Helper
 * Now integrated directly into the module.
 */
const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 mb-4 shadow-lg shadow-red-900/20">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Access Terminal</h1>
            <p className="text-sm text-gray-500 mt-2">Identify yourself to proceed</p>
          </div>

          {/* Google Login Action */}
          <div className="space-y-3 mb-8">
            <button
              type="button"
              onClick={onGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-100 text-black rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {googleLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Chrome className="w-5 h-5" />}
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a0a0a] px-3 text-gray-600 font-bold tracking-widest">
                Or login with email
              </span>
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={onEmailLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700"
                  placeholder="admin@terminal.io"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] ml-1">Secure Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full group bg-gradient-to-r from-red-600 to-red-800 py-3.5 rounded-xl text-white font-bold shadow-lg shadow-red-900/20 transition-all hover:shadow-red-600/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                <>
                  Authenticate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-600">
            Secure Encrypted Session • v3.0.4
          </p>
        </div>
      </div>
    </div>
  );
};



  