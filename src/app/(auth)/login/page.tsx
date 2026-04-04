'use client';

import { useState } from 'react';
import { useAppSelector } from '../../../components/redux/hooks';
import Link from 'next/link';
import { Mail, Lock, Terminal, Unlock, AlertCircle, Loader2 } from 'lucide-react';

// Firebase Imports
import { auth } from '@/server/firebaseApi';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

export default function LoginPage() {
  const isColor = useAppSelector((state) => state.color.value);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ FIXED LOGIN FINALIZER
  const finalizeLogin = async (user: any) => {
    const isProduction = process.env.NODE_ENV === 'production';

    try {
      // 1. Get fresh Firebase token
      const token = await user.getIdToken(true);

      // 2. Send token to backend (SET COOKIE)
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include', // 🔥 IMPORTANT
      });

      if (!res.ok) {
        throw new Error('Failed to create session');
      }

      // 3. WAIT to ensure cookie is saved
      await new Promise((resolve) => setTimeout(resolve, 700));

      // 4. Check admin emails
      const ADMIN_EMAILS = [
        'm880yka@gmail.com',
        'mbboy@kalifaos.site',
      ];

      const isAdmin = ADMIN_EMAILS.includes(user.email || '');

      // 5. Redirect safely
      if (isProduction) {
        window.location.href = isAdmin
          ? 'https://admin.kalifaos.site/'
          : 'https://kalifaos.site/';
      } else {
        window.location.href = isAdmin
          ? 'http://admin.localhost:3000/'
          : 'http://localhost:3000/';
      }

    } catch (err) {
      console.error('Finalize login error:', err);
      setError('Session setup failed. Try again.');
    }
  };

  // ✅ EMAIL LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await finalizeLogin(result.user);
    } catch (err: any) {
      console.error("Auth Error:", err.code);
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Invalid System Credentials'
          : 'Access Denied: Connection Failure'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIXED GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();

      // 🔥 FORCE account selection (fixes Google issues)
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);

      if (!result.user) {
        throw new Error('No user returned');
      }

      await finalizeLogin(result.user);

    } catch (err: any) {
      console.error("Google Auth Error:", err);
      setError('Google login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center p-4 transition-colors duration-500 ${
      isColor ? 'bg-[#050505] text-slate-300' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* UI stays same */}
      <div className="relative w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl shadow-2xl">

        <div className="text-center mb-8">
          <Unlock size={24} />
          <h2 className="text-2xl font-black">SYSTEM_LOGIN</h2>
        </div>

        {error && (
          <div className="mb-6 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="System Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded border"
          />

          <input
            type="password"
            placeholder="Access Code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border"
          />

          <button type="submit" disabled={isLoading} className="w-full p-3 bg-blue-600 text-white rounded">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full mt-4 p-3 border rounded"
        >
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}