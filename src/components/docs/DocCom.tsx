// app/docs/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Book, 
  Terminal, 
  ChevronRight, 
  FileText, 
  AlertCircle, 
  Cpu,
  Search,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks'; // Adjust path as needed

// Dummy data for documentation structure
const docCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <Terminal size={18} />,
    items: ['Installation', 'System Requirements', 'First Run Guide']
  },
  {
    id: 'frp-guides',
    title: 'FRP Bypass Protocols',
    icon: <Cpu size={18} />,
    items: ['Samsung Knox Procedures', 'MTK Universal Methods', 'Qualcomm EDL Mode']
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Errors',
    icon: <AlertCircle size={18} />,
    items: ['Driver Issues', 'Connection Timeouts', 'Error Codes Index']
  }
];

export default function DocCom() {
  const isColor = useAppSelector((state) => state.color.value); // True = Dark Mode
  const [activeCategory, setActiveCategory] = useState('getting-started');

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${
             isColor ? 'bg-slate-900 border-slate-800 text-cyan-500' : 'bg-white border-slate-200 text-blue-600'
           }`}>
             <Book size={14} />
             <span>KALIFA_OS // KNOWLEDGE_BASE</span>
           </div>

           <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isColor ? 'text-white' : 'text-slate-900'}`}>
             System <span className={isColor ? 'text-cyan-500' : 'text-blue-600'}>Documentation</span>
           </h1>
           
           {/* Fake Search Bar */}
           <div className="max-w-xl mx-auto relative">
              <input 
                type="text"
                placeholder="Search protocols, errors, or guides..."
                className={`w-full p-4 pl-12 rounded-xl border outline-none font-mono text-sm ${
                  isColor 
                    ? 'bg-slate-900/50 border-slate-800 focus:border-cyan-500 text-white' 
                    : 'bg-white border-slate-200 focus:border-blue-500 text-slate-900'
                }`}
              />
              <Search className={`absolute left-4 top-4 ${isColor ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
           </div>
        </div>

        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR NAVIGATION --- */}
          <aside className={`lg:w-1/4 rounded-2xl p-6 border h-fit sticky top-24 ${
             isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
             <h2 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-70">Doc Navigator</h2>
             <div className="space-y-6">
               {docCategories.map((cat) => (
                 <div key={cat.id}>
                   <button 
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 font-bold mb-3 transition-colors ${
                         activeCategory === cat.id 
                          ? (isColor ? 'text-cyan-400' : 'text-blue-600')
                          : (isColor ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900')
                      }`}
                   >
                      {cat.icon} {cat.title}
                   </button>
                   <ul className={`space-y-1 pl-6 border-l ${isColor ? 'border-slate-800' : 'border-slate-200'}`}>
                      {cat.items.map((item, i) => (
                         <li key={i}>
                            <a href="#" className={`text-sm block py-1 transition-colors ${
                               isColor ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
                            }`}>
                               {item}
                            </a>
                         </li>
                      ))}
                   </ul>
                 </div>
               ))}
             </div>
          </aside>

          {/* --- DOCUMENTATION CONTENT AREA --- */}
          <main className="lg:w-3/4 space-y-6">
             {/* Example Content Block representing the active selection */}
             <div className={`rounded-2xl p-8 border relative overflow-hidden min-h-[400px] ${
                isColor ? 'bg-[#0f0f0f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
             }`}>
                {/* Decorative Header */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                   isColor ? 'bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-900 opacity-30' : 'bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 opacity-30'
                }`}></div>

                <div className="flex items-center gap-3 mb-6">
                  <FolderOpen className={isColor ? 'text-cyan-500' : 'text-blue-600'} size={28} />
                  <h2 className={`text-3xl font-bold ${isColor ? 'text-white' : 'text-slate-900'}`}>
                    Installation Protocols
                  </h2>
                </div>

                <div className={`prose max-w-none ${isColor ? 'prose-invert' : ''}`}>
                  <p className="text-lg leading-relaxed opacity-80 mb-6">
                    Welcome to the Kalifa OS deployment guide. Ensure your host machine meets the minimum kernel requirements before initiating the setup sequence.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
                    <ChevronRight size={16} className={isColor ? 'text-cyan-500' : 'text-blue-600'} /> 
                    Step 1: Environment Prep
                  </h3>
                  <p className="opacity-80 mb-4">
                    Disable antivirus real-time scanning temporarily to prevent false positives during driver injection.
                  </p>
                  <pre className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
                     isColor ? 'bg-slate-950 border border-slate-800 text-cyan-400' : 'bg-slate-100 border border-slate-200 text-blue-800'
                  }`}>
                    {`> sudo kalifa-init --prep
> Verifying dependencies... OK.
> Disabling Windows Defender... DONE.`}
                  </pre>

                  <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
                    <ChevronRight size={16} className={isColor ? 'text-cyan-500' : 'text-blue-600'} /> 
                    Step 2: Driver Installation
                  </h3>
                  <p className="opacity-80">
                    Connect your device in download mode and run the main executable as administrator.
                  </p>
                   {/* Placeholder for more content */}
                   <div className="mt-8 p-4 border border-dashed rounded-lg opacity-50 text-center font-mono text-sm">
                      [...Additional documentation content loads here...]
                   </div>
                </div>

             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
