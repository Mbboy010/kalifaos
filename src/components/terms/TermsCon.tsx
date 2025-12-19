// app/terms/page.tsx
'use client';

import { 
  ShieldCheck, 
  User, 
  Lock, 
  FileText, 
  Code, 
  Globe, 
  Gavel, 
  Mail, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2,
  Copyright
} from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import React from 'react';

export default function TermsCon() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode
  const currentYear = new Date().getFullYear();

  // Define Terms Data Structure for cleaner mapping
  const termsData = [
    {
      id: '01',
      title: 'Acceptance of Terms',
      icon: <CheckCircle2 />,
      color: 'text-green-500',
      borderColor: 'border-green-500',
      content: (
        <p>
          By initializing a connection to Kalifa OS services, you explicitly agree to be bound by these Terms of Service and our{' '}
          <Link href="/privacy" className={`font-bold hover:underline ${isColor ? 'text-cyan-400' : 'text-blue-600'}`}>
            Privacy Protocol
          </Link>
          . If you do not consent to these protocols, terminate your session immediately.
        </p>
      )
    },
    {
      id: '02',
      title: 'User Responsibilities',
      icon: <User />,
      color: 'text-blue-500',
      borderColor: 'border-blue-500',
      content: (
        <ul className="space-y-2">
          {[
            'You must be at least 13 years old to operate this system.',
            'You are the sole guardian of your account credentials.',
            'Utilization of this service for illicit activities is strictly prohibited.',
            'Attempts to breach, disrupt, or reverse-engineer system architecture are forbidden.'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isColor ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      id: '03',
      title: 'Intellectual Property',
      icon: <Copyright />,
      color: 'text-purple-500',
      borderColor: 'border-purple-500',
      content: (
        <p>
          All source code, visual assets, and trademarks within this platform remain the exclusive property of Kalifa OS. Unauthorized reproduction, distribution, or creation of derivative works is a violation of international copyright law.
        </p>
      )
    },
    {
      id: '04',
      title: 'Service Modifications',
      icon: <Code />,
      color: 'text-cyan-500',
      borderColor: 'border-cyan-500',
      content: (
        <p>
          We reserve the right to patch, modify, or decommission any service module at any time without prior notification. Continued usage following system updates constitutes acceptance of revised terms.
        </p>
      )
    },
    {
      id: '05',
      title: 'Limitation of Liability',
      icon: <AlertTriangle />,
      color: 'text-red-500',
      borderColor: 'border-red-500',
      content: (
        <p>
          Kalifa OS assumes zero liability for indirect, incidental, or consequential hardware damages resulting from the use of our unlocking tools. Your total remedy is limited strictly to the transaction amount paid for the specific service.
        </p>
      )
    },
    {
      id: '06',
      title: 'Governing Law',
      icon: <Gavel />,
      color: 'text-orange-500',
      borderColor: 'border-orange-500',
      content: (
        <p>
          These protocols are governed by the judicial laws of Nigeria. Any legal disputes arising from these terms shall be resolved exclusively within this jurisdiction, disregarding conflict of law provisions.
        </p>
      )
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-4xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          
          <div className={`flex items-center justify-center gap-2 text-xs font-mono mb-6 opacity-60 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`}>
            <Terminal size={12} />
            <span className="tracking-widest">/ROOT/SYSTEM/LEGAL/TERMS_OF_SERVICE</span>
          </div>

          <div className={`relative inline-flex items-center justify-center p-6 rounded-2xl mb-6 ${
             isColor ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'
          }`}>
             <FileText className={`w-12 h-12 ${isColor ? 'text-cyan-500' : 'text-blue-600'}`} />
             {/* Decor */}
             <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isColor ? 'bg-green-500' : 'bg-green-600'}`}></div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isColor ? 'text-white' : 'text-slate-900'}`}>
            Terms of <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Engagement</span>
          </h1>
          
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed mb-4 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
            Review the operating parameters for Kalifa OS. Understanding your responsibilities and our legal framework is mandatory for service access.
          </p>

          <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-mono border ${
             isColor ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
             LAST_REVISION: {new Date().toLocaleDateString().replace(/\//g, '.')}
          </div>
        </div>

        {/* --- TERMS GRID --- */}
        <div className="space-y-6">
          {termsData.map((term, index) => (
            <section 
              key={index} 
              className={`group relative overflow-hidden rounded-xl border-l-4 p-6 md:p-8 transition-all duration-300 hover:translate-x-1 ${
                isColor 
                  ? `bg-[#0f0f0f] border-y border-r border-slate-800 ${term.borderColor.replace('border-', 'border-l-')}` 
                  : `bg-white border-y border-r border-slate-200 shadow-sm ${term.borderColor.replace('border-', 'border-l-')}`
              }`}
            >
              {/* Hover Background Gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none ${
                 term.color.replace('text-', 'bg-')
              }`}></div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Icon Column */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                    isColor ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
                  } ${term.color}`}>
                    {React.cloneElement(term.icon as React.ReactElement, { size: 24 })}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`font-mono text-xs font-bold opacity-50 ${isColor ? 'text-slate-400' : 'text-slate-500'}`}>
                      0{index + 1} //
                    </span>
                    <h2 className={`text-xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
                      {term.title}
                    </h2>
                  </div>
                  
                  <div className={`leading-relaxed text-sm md:text-base ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
                    {term.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* --- CONTACT FOOTER --- */}
        <div className={`mt-12 rounded-2xl p-8 border text-center ${
           isColor ? 'bg-slate-900 border-slate-800' : 'bg-blue-50 border-blue-100'
        }`}>
           <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isColor ? 'bg-cyan-900/20 text-cyan-400' : 'bg-blue-200 text-blue-700'
           }`}>
              <Mail size={24} />
           </div>
           <h3 className={`text-lg font-bold mb-2 ${isColor ? 'text-white' : 'text-slate-900'}`}>Legal Inquiries</h3>
           <p className={`text-sm mb-4 ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
             For clarification regarding these protocols, establish contact via secure channel.
           </p>
           <a 
             href="mailto:support@kalifaos.com" 
             className={`inline-flex items-center gap-2 font-bold hover:underline ${
                isColor ? 'text-cyan-400' : 'text-blue-600'
             }`}
           >
             support@kalifaos.com <Globe size={14} />
           </a>
        </div>

      </div>
    </div>
  );
}
