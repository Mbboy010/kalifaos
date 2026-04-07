'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Lock, User, ArrowRight, ArrowLeft, Terminal, 
  Phone, ShieldCheck, Info, CheckCircle2, XCircle,
  Globe, MapPin, Calendar, SwatchBook, Loader2,
  Eye, EyeOff 
} from 'lucide-react';

// Firebase Imports
import { auth, db } from '@/server/firebaseApi'; 
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

export default function Sign() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  // Security Protocol Logic
  const isMinLength = formData.password.length >= 8;
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasLower = /[a-z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';
  const isPasswordValid = isMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const checkEmailExists = async (email: string) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleNext = async () => {
    setError('');
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) return setError('All fields required');
      setIsLoading(true);
      const exists = await checkEmailExists(formData.email);
      setIsLoading(false);
      if (exists) return setError('Network address already registered');
    }
    if (step === 2 && (!formData.country || !formData.city || !formData.address)) return setError('Location data incomplete');
    if (step === 3 && (!formData.gender || !formData.dob)) return setError('Personal parameters required');
    
    setStep(prev => prev + 1);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        router.push('/');
      } else {
        setFormData(prev => ({ 
          ...prev, 
          name: user.displayName || '', 
          email: user.email || '', 
          phone: user.phoneNumber || '' 
        }));
        setIsGoogleAuth(true);
        setStep(2); // Skip Step 1 after Google Auth
      }
    } catch (err: any) {
      setError('Google Auth Sequence Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isGoogleAuth && (!isPasswordValid || !passwordsMatch)) {
      setError('Security protocols not met.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      let user = auth.currentUser;
      if (!isGoogleAuth) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        user = userCredential.user;
        await updateProfile(user, { displayName: formData.name });
      }
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          ...formData,
          role: "user",
          createdAt: serverTimestamp(),
          status: "active",
          authMethod: isGoogleAuth ? "google" : "email"
        });
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failure.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 bg-slate-50 text-slate-900 dark:bg-[#050505] dark:text-slate-300 transition-colors duration-500">
      <div className="relative w-full max-w-lg p-8 rounded-2xl border backdrop-blur-xl bg-white/80 border-slate-200 shadow-xl dark:bg-[#0a0a0a]/80 dark:border-slate-800 dark:shadow-2xl">
        
        {/* Progress Tracker */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600 dark:bg-cyan-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tighter dark:text-white uppercase">Registry_Protocol</h2>
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-50 mt-1">Sector_{step}_of_4</p>
        </div>

        {error && <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type="email" placeholder="System Email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>
            </div>
          )}

          {/* STEP 2: GEOLOCATION */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative">
                <Globe className="absolute left-4 top-3.5 w-5 h-5 opacity-40 z-10" />
                <select value={formData.country} onChange={(e) => updateField('country', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white appearance-none focus:border-blue-500 dark:focus:border-cyan-500 cursor-pointer">
                  <option value="" disabled>Select Territory</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type="text" placeholder="City" value={formData.city} onChange={(e) => updateField('city', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>
              <textarea placeholder="Residential Address" value={formData.address} onChange={(e) => updateField('address', e.target.value)} required className="w-full p-4 h-24 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500 resize-none" />
            </div>
          )}

          {/* STEP 3: ATTRIBUTES */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative">
                <SwatchBook className="absolute left-4 top-3.5 w-5 h-5 opacity-40 z-10" />
                <select value={formData.gender} onChange={(e) => updateField('gender', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white appearance-none focus:border-blue-500 dark:focus:border-cyan-500">
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type="date" value={formData.dob} onChange={(e) => updateField('dob', e.target.value)} required className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>
            </div>
          )}

          {/* STEP 4: SECURITY */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
                <input type={showPassword ? "text" : "password"} placeholder="Access Key" value={formData.password} onChange={(e) => updateField('password', e.target.value)} required className="w-full pl-12 pr-12 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 opacity-40 hover:opacity-100">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <ShieldCheck className={`absolute left-4 top-3.5 w-5 h-5 ${passwordsMatch ? 'text-green-500' : 'opacity-40'}`} />
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Access Key" value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required className="w-full pl-12 pr-12 py-3 rounded-xl border outline-none bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-500" />
              </div>

              <div className="p-4 rounded-xl border border-dashed bg-slate-50 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800">
                <p className="text-[10px] font-mono uppercase mb-3 opacity-50 tracking-widest flex items-center gap-2"><Terminal size={12} /> Security_Parameter_Log:</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <Requirement label="8+ Chars" met={isMinLength} />
                  <Requirement label="Upper (A-Z)" met={hasUpper} />
                  <Requirement label="Lower (a-z)" met={hasLower} />
                  <Requirement label="Number (0-9)" met={hasNumber} />
                  <Requirement label="Special" met={hasSpecial} />
                  <Requirement label="Matched" met={passwordsMatch} />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="flex-1 py-4 rounded-xl border font-bold flex items-center justify-center gap-2 bg-white border-slate-200 dark:bg-slate-900/50 dark:border-slate-700">
                <ArrowLeft size={18} /> Back
              </button>
            )}
            <button 
              type={((step === 4 && !isGoogleAuth) || (step === 3 && isGoogleAuth)) ? "submit" : "button"} 
              onClick={((step === 4 && !isGoogleAuth) || (step === 3 && isGoogleAuth)) ? undefined : handleNext} 
              disabled={isLoading} 
              className="flex-[2] py-4 rounded-xl font-black uppercase tracking-widest bg-blue-600 text-white dark:bg-cyan-500 dark:text-black hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (step === 4 || (step === 3 && isGoogleAuth)) ? 'Finalize_System' : <>Next <ArrowRight size={18} /></>}
            </button>
          </div>
        </form>

        {/* GOOGLE AUTHORITY (Added Back Here) */}
        {step === 1 && (
          <div className="mt-8">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-[10px] font-mono uppercase opacity-40 tracking-widest">External_Authority</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <button 
              onClick={handleGoogleSignIn} 
              disabled={isLoading}
              type="button" 
              className="w-full py-3 rounded-xl border font-bold flex items-center justify-center gap-3 bg-white border-slate-200 dark:bg-slate-900/50 dark:border-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google_Authority
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-xs opacity-60">
          Already verified? <Link href="/login" className="font-black underline text-blue-600 dark:text-cyan-400">Login_Unit</Link>
        </div>
      </div>
    </div>
  );
}

function Requirement({ label, met }: { label: string; met: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-colors duration-300 ${met ? 'text-green-500' : 'opacity-40'}`}>
      {met ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
      <span className="truncate">{label}</span>
    </div>
  );
}
