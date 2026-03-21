'use client';

import { useEffect, useRef } from 'react';
import { 
  Download, 
  Upload, 
  Server, 
  FilePlus, 
  Youtube, 
  Zap, 
  ArrowRight, 
  LayoutGrid
} from 'lucide-react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const ButtonList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Staggered Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.action-card',
        { y: 30, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: 'back.out(1.7)' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const actions = [
    {
      category: 'Downloads',
      items: [
        { label: 'Manage Files', sub: 'View all downloads', icon: Download, path: '/downloads' },
        { label: 'New Upload', sub: 'Add file to server', icon: Upload, path: '/upload-download' },
      ]
    },
    {
      category: 'Windows Tools',
      items: [
        { label: 'Tool Inventory', sub: 'Manage .exe/.zip', icon: LayoutGrid, path: '/windows-files' },
        { label: 'Deploy Tool', sub: 'Upload new utility', icon: Upload, path: '/window-upload' },
      ]
    },
    {
      category: 'Systems',
      items: [
        { label: 'System Logs', sub: 'Monitor status', icon: Server, path: '/systems' },
        { label: 'Add Node', sub: 'Register system', icon: FilePlus, path: '/upload-system' },
      ]
    },
    {
      category: 'Media',
      items: [
        { label: 'Video Library', sub: 'YouTube content', icon: Youtube, path: '/youtube-videos' },
        { label: 'Publish Video', sub: 'Link new content', icon: Upload, path: '/upload-youtube' },
      ]
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
            <Zap className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              {/* Category Label */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                {group.category}
              </h3>
              
              {/* Buttons */}
              <div className="space-y-3">
                {group.items.map((btn, btnIdx) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btnIdx}
                      onClick={() => router.push(btn.path)}
                      className="action-card group w-full relative overflow-hidden p-4 bg-[#111] border border-[#222] hover:border-red-600/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] text-left"
                    >
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#333] group-hover:border-red-500 group-hover:text-red-500 text-gray-400 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                              {btn.label}
                            </span>
                            <span className="block text-xs text-gray-500 group-hover:text-gray-400">
                              {btn.sub}
                            </span>
                          </div>
                        </div>
                        
                        {/* Arrow Slide Animation */}
                        <ArrowRight className="w-4 h-4 text-red-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ButtonList;
