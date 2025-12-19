// app/contact/page.tsx
'use client';

import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ChevronRight, 
  FileText, 
  Terminal, 
  Radio, 
  ShieldCheck, 
  MessageSquare, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { db } from '@/server/firebaseApi';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export default function ContactCon() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) { newErrors.name = 'Identity required'; valid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Comms ID required'; valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'Invalid frequency format'; valid = false; }
    if (!formData.subject) { newErrors.subject = 'Select transmission type'; valid = false; }
    if (!formData.message.trim()) { newErrors.message = 'Payload content required'; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await addDoc(collection(db, 'contactMessages'), {
          ...formData,
          timestamp: Timestamp.now(),
        });
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (error) {
        console.error('Transmission failed:', error);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen pt-5 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
           isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
        }`}>
           <Radio size={14} className="animate-pulse" />
           <span>COMMS_CHANNEL // OPEN</span>
        </div>
        
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
           Establish <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Connection</span>
        </h1>
        
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
           Initiate a secure support ticket or inquiry. Our engineering team is on standby for device unlocking assistance.
        </p>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* --- LEFT: INFO NODES --- */}
        <div className="space-y-8">
           
           {/* Success Banner */}
           {isSubmitted && (
             <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isColor ? 'bg-green-950/20 border-green-900 text-green-400' : 'bg-green-50 border-green-200 text-green-700'
             }`}>
                <CheckCircle2 size={24} />
                <div>
                   <h3 className="font-bold">Transmission Successful</h3>
                   <p className="text-sm opacity-80">Support ticket generated. Stand by for response.</p>
                </div>
             </div>
           )}

           {/* Contact Info Panel */}
           <div className={`rounded-2xl p-8 border ${
              isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
           }`}>
              <h2 className={`text-xl font-bold mb-8 flex items-center gap-2 ${
                 isColor ? 'text-white' : 'text-slate-900'
              }`}>
                 <Terminal className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
                 Active Nodes
              </h2>

              <div className="space-y-8">
                 {/* Email Node */}
                 <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                       isColor ? 'bg-slate-900 text-cyan-500' : 'bg-blue-100 text-blue-600'
                    }`}>
                       <Mail size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">Electronic Mail</h3>
                       <p className={`font-mono text-sm mb-2 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>support@kalifaos.com</p>
                       <a href="mailto:support@kalifaos.com" className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline ${
                          isColor ? 'text-cyan-500' : 'text-blue-600'
                       }`}>
                          Send Packet <ChevronRight size={12} />
                       </a>
                    </div>
                 </div>

                 {/* Phone Node */}
                 <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                       isColor ? 'bg-slate-900 text-green-500' : 'bg-green-100 text-green-600'
                    }`}>
                       <Phone size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">Voice Uplink</h3>
                       <p className={`font-mono text-sm mb-2 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>+234 901 364 4892</p>
                       <a href="tel:+2349013644892" className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline ${
                          isColor ? 'text-green-500' : 'text-green-600'
                       }`}>
                          Initiate Call <ChevronRight size={12} />
                       </a>
                    </div>
                 </div>

                 {/* Location Node */}
                 <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                       isColor ? 'bg-slate-900 text-red-500' : 'bg-red-100 text-red-600'
                    }`}>
                       <MapPin size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">Physical Base</h3>
                       <p className={`text-sm ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>Kaduna, Nigeria</p>
                    </div>
                 </div>

                 {/* Hours Node */}
                 <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                       isColor ? 'bg-slate-900 text-purple-500' : 'bg-purple-100 text-purple-600'
                    }`}>
                       <Clock size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">Operation Cycles</h3>
                       <p className={`text-xs font-mono mb-1 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>MON-FRI: 0900 - 1800</p>
                       <p className={`text-xs font-mono ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>SAT-SUN: 1000 - 1600</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Terms Panel */}
           <div className={`rounded-2xl p-6 border flex items-center gap-4 ${
              isColor ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'
           }`}>
              <ShieldCheck className={isColor ? 'text-slate-500' : 'text-slate-400'} />
              <div className="flex-1">
                 <h3 className="font-bold text-sm">Protocol Compliance</h3>
                 <p className={`text-xs mt-1 ${isColor ? 'text-slate-400' : 'text-slate-500'}`}>
                    Review service terms before initiation.
                 </p>
              </div>
              <Link href="/terms" className={`text-xs font-bold uppercase hover:underline ${
                 isColor ? 'text-cyan-500' : 'text-blue-600'
              }`}>
                 View Docs
              </Link>
           </div>
        </div>

        {/* --- RIGHT: TRANSMISSION FORM --- */}
        <div className={`rounded-2xl p-8 border ${
           isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-lg'
        }`}>
           <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              isColor ? 'text-white' : 'text-slate-900'
           }`}>
              <MessageSquare className={isColor ? 'text-cyan-500' : 'text-blue-600'} />
              Message Transmission
           </h2>

           <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div>
                 <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                    Agent Identity *
                 </label>
                 <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className={`w-full p-4 rounded-xl border outline-none font-mono text-sm transition-all ${
                       isColor 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500 focus:bg-slate-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    } ${errors.name ? 'border-red-500' : ''}`}
                 />
                 {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                 <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                    Comms Frequency (Email) *
                 </label>
                 <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@domain.com"
                    className={`w-full p-4 rounded-xl border outline-none font-mono text-sm transition-all ${
                       isColor 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500 focus:bg-slate-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    } ${errors.email ? 'border-red-500' : ''}`}
                 />
                 {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
              </div>

              {/* Phone Input */}
              <div>
                 <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                    Uplink Number (Optional)
                 </label>
                 <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+000 000 0000"
                    className={`w-full p-4 rounded-xl border outline-none font-mono text-sm transition-all ${
                       isColor 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500 focus:bg-slate-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    }`}
                 />
              </div>

              {/* Subject Select */}
              <div>
                 <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                    Transmission Type *
                 </label>
                 <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-xl border outline-none font-mono text-sm transition-all appearance-none ${
                       isColor 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500 focus:bg-slate-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    } ${errors.subject ? 'border-red-500' : ''}`}
                 >
                    <option value="">-- Select Protocol --</option>
                    <option value="service">Request Service</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing/Payment</option>
                    <option value="other">General Inquiry</option>
                 </select>
                 {errors.subject && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.subject}</p>}
              </div>

              {/* Message Input */}
              <div>
                 <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isColor ? 'text-slate-500' : 'text-slate-500'}`}>
                    Data Payload *
                 </label>
                 <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Input details here..."
                    className={`w-full p-4 rounded-xl border outline-none font-mono text-sm transition-all ${
                       isColor 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500 focus:bg-slate-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    } ${errors.message ? 'border-red-500' : ''}`}
                 />
                 {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                 type="submit"
                 disabled={loading}
                 className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isColor
                       ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                       : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl'
                 }`}
              >
                 {loading ? (
                    <>
                       <Loader2 className="animate-spin" size={18} />
                       <span>Transmitting...</span>
                    </>
                 ) : (
                    <>
                       <Send size={18} />
                       <span>Send Packet</span>
                    </>
                 )}
              </button>

           </form>
        </div>

      </div>
    </div>
  );
}
