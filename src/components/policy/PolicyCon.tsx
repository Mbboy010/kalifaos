// app/privacy/page.tsx
'use client';

import React from 'react';
import { Shield, Lock, Database, User, Server, Mail, EyeOff, Terminal, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';

export default function PolicyCon() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode

  // Define policy data structure
  const policySections = [
    {
      id: 'SEC_01',
      icon: <User />,
      title: 'Introduction & Protocol',
      content: (
        <p className="leading-relaxed opacity-90">
          At <strong className={isColor ? 'text-cyan-400' : 'text-blue-700'}>Kalifa OS</strong>, we respect your privacy perimeter. This protocol explicitly defines how we intercept, utilize, and fortify your personal data packets during system interaction.
        </p>
      ),
    },
    {
      id: 'SEC_02',
      icon: <Database />,
      title: 'Data Interception Points',
      content: (
        <ul className="space-y-3 mt-2">
          {[
            { label: 'Personal Information', desc: 'Identity strings, contact frequencies, email nodes.' },
            { label: 'Usage Telemetry', desc: 'Interaction logs, feature access patterns.' },
            { label: 'Technical Identifiers', desc: 'IP address, device fingerprint, OS version.' },
            { label: 'Tracking Beacons', desc: 'Session cookies for analytics and functionality.' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
               <CheckCircle2 size={16} className={`mt-1 flex-shrink-0 ${isColor ? 'text-cyan-500' : 'text-blue-500'}`} />
               <span>
                 <strong className={`font-mono text-sm uppercase ${isColor ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}:</strong> <span className="opacity-80">{item.desc}</span>
               </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'SEC_03',
      icon: <Server />,
      title: 'Data Utilization Directives',
      content: (
        <>
          <p className="mb-3 font-mono text-sm uppercase opacity-70">We process captured data to execute:</p>
          <ul className="space-y-2 pl-2 border-l-2 border-dashed border-opacity-30 border-current">
            {[
              'Provision and maintain system core services',
              'Optimize user interface experience internally',
              'Establish secure communication channels',
              'Execute security protocols and fraud prevention',
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isColor ? 'bg-cyan-500' : 'bg-blue-500'}`}></span>
                  <span className="opacity-90">{item}</span>
               </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: 'SEC_04',
      icon: <Lock />,
      title: 'Fortification Measures',
      content: (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
           isColor ? 'bg-green-950/20 border-green-900' : 'bg-green-50 border-green-200'
        }`}>
           <Shield size={20} className={isColor ? 'text-green-400' : 'text-green-600'} />
           <p className={`text-sm ${isColor ? 'text-green-300' : 'text-green-800'}`}>
             We implement military-grade technical and organizational encryption to defend your data against unauthorized access, alteration, or kinetic destruction.
           </p>
        </div>
      ),
    },
    {
      id: 'SEC_05',
      icon: <EyeOff />,
      title: 'User Sovereignty Rights',
      content: (
        <>
          <p className="mb-3 font-mono text-sm uppercase opacity-70">As a system user, you retain control to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {[
               'Request Data Dump (Access)',
               'Initiate Correction/Deletion',
               'Object to Processing Cycles',
               'Demand Data Portability',
             ].map((item, i) => (
                <div key={i} className={`px-3 py-2 rounded border text-sm font-medium flex items-center gap-2 ${
                   isColor ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                   <Terminal size={14} className="opacity-50" /> {item}
                </div>
             ))}
          </div>
        </>
      ),
    },
    {
      id: 'SEC_06',
      icon: <Mail />,
      title: 'Establish Uplink',
      content: (
        <p className="opacity-90">
          For queries regarding this security manifest, establish a secure channel via email at{' '}
          <a href="mailto:support@kalifaos.com" className={`font-mono font-bold hover:underline ${
             isColor ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            support@kalifaos.com
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          
          {/* Terminal Path */}
          <div className={`flex items-center justify-center gap-2 text-xs font-mono mb-6 opacity-60 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`}>
            <Terminal size={12} />
            <span className="tracking-widest">/ROOT/SYSTEM/LEGAL/PRIVACY_PROTOCOL</span>
          </div>

          {/* Main Icon & Title */}
          <div className={`relative inline-flex items-center justify-center p-6 rounded-full mb-6 ${
             isColor ? 'bg-slate-900 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-blue-50 border-2 border-blue-200'
          }`}>
             <Shield className={`w-12 h-12 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`} />
             {/* Spinning Ring effect for dark mode */}
             {isColor && <div className="absolute inset-0 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>}
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            Privacy <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Manifest</span>
          </h1>
          
          <div className={`inline-block px-3 py-1 rounded-md text-xs font-mono border ${
             isColor ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
             LAST_UPDATED: {new Date().toLocaleDateString().replace(/\//g, '.')}
          </div>
        </div>

        {/* --- SECTIONS --- */}
        <div className="space-y-6 relative">
          {/* Connecting Line (Visual decoration) */}
          <div className={`absolute left-8 top-0 bottom-0 w-px ${isColor ? 'bg-slate-800' : 'bg-slate-200'} hidden md:block`}></div>

          {policySections.map((section, index) => (
            <section key={index} className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:scale-[1.01] ${
              isColor 
                ? 'bg-[#0f0f0f] border-slate-800 hover:border-cyan-500/50' 
                : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
            }`}>
              {/* Decorative Header Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                 isColor ? 'bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-900 opacity-30' : 'bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 opacity-30'
              }`}></div>

              <div className="flex flex-col md:flex-row gap-6">
                 {/* Header / Icon Column */}
                 <div className="md:w-1/3 flex flex-row md:flex-col items-center md:items-start gap-4">
                    <div className={`p-3 rounded-xl relative z-10 ${
                       isColor ? 'bg-slate-900 text-cyan-400 border border-slate-700' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                       {React.cloneElement(section.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <div>
                       <span className={`text-[10px] font-mono font-bold opacity-50 block mb-1 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`}>
                          [{section.id}]
                       </span>
                       <h2 className={`text-xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
                          {section.title}
                       </h2>
                    </div>
                 </div>

                 {/* Content Column */}
                 <div className="md:w-2/3">
                    {section.content}
                 </div>
              </div>
            </section>
          ))}
        </div>
        
        {/* Footer End Marker */}
        <div className="flex justify-center mt-12 opacity-30">
           <AlertOctagon />
        </div>

      </div>
    </div>
  );
}
