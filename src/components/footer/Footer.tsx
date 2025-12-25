// app/components/layout/Footer.tsx
'use client';

import { Unlock, Mail, Youtube, Facebook, MessageCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  type FooterColumn = {
    title: string;
    links: {
      name: string;
      to: string;
      icon?: React.ReactNode;
      external?: boolean;
    }[];
  };

  const footerColumns: FooterColumn[] = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', to: '/' },
        { name: 'FRP APK Vault', to: '/frp-tools-apk-download' },
        { name: 'System Apps', to: '/system-apps' },
        { name: 'Windows Utilities', to: '/windows-tools?list_page=1' },
      ],
    },
    {
      title: 'Legal Protocols',
      links: [
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Privacy Policy', to: '/privacy' },
        { name: 'Disclaimer', to: '/disclaimer' },
      ],
    },
    {
      title: 'Direct Line',
      links: [
        {
          name: 'Kalifaos763@gmail.com',
          to: 'mailto:Kalifaos763@gmail.com',
          icon: <Mail className="w-3 h-3 mr-2" />,
          external: true,
        },
        {
          name: 'WhatsApp Support',
          to: 'https://wa.me/2349013644892',
          icon: <MessageCircle className="w-3 h-3 mr-2" />,
          external: true,
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Youtube className="w-5 h-5" />, to: 'https://youtube.com/@kalifaos', label: 'YouTube' },
    { icon: <Facebook className="w-5 h-5" />, to: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="w-full border-t transition-colors duration-300 relative overflow-hidden bg-[#050505] border-slate-800 text-slate-400">
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* --- Brand Column --- */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg transition-colors bg-slate-900 group-hover:bg-cyan-900/30 text-cyan-500">
                <Unlock className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                KALIFA OS
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-xs">
              Advanced firmware solutions for the modern era. Unlocking potential, one device at a time.
            </p>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border bg-green-950/20 border-green-900 text-green-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SYSTEM ONLINE
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.to}
                  className="p-2 rounded-full transition-all duration-300 hover:-translate-y-1 bg-slate-900 hover:bg-cyan-600 hover:text-white text-slate-400"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- Dynamic Link Columns --- */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-200">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.to}
                      target={link.external ? "_blank" : undefined}
                      className="text-sm flex items-center transition-all duration-200 hover:translate-x-1 hover:text-cyan-400"
                    >
                      {link.icon && link.icon}
                      {!link.icon && <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-2 opacity-50 group-hover:bg-cyan-500"></span>}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 border-slate-800">
          <div className="flex items-center gap-2 text-xs opacity-60">
             <ShieldCheck size={14} />
             <p>© {currentYear} Kalifa OS. Secured & Encrypted.</p>
          </div>

          {/* Developer Signature */}
          <div className="text-xs font-mono px-4 py-2 rounded-lg border bg-slate-900/50 border-slate-800 text-slate-500">
             <span className="opacity-50">git commit -m </span>
             <span className="text-cyan-500">"developed by mbboy"</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
