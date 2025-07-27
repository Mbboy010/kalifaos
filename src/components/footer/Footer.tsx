'use client';

import { Cpu, Unlock, Mail, Youtube, Linkedin, Facebook, Shield, MessageCircle } from 'lucide-react';
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
      title: 'Quick Links',
      links: [
        { name: 'Home', to: '/' },
        { name: 'FRP Tools apk', to: '/frp-tools-apk-download' },
        { name: 'System apps', to: '/system-apps' },
        { name: 'About', to: '/about' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Privacy Policy', to: '/privacy' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        {
          name: 'Kalifaos763@gmail.com',
          to: 'mailto:Kalifaos763@gmail.com',
          icon: <Mail className="w-4 h-4 mr-2" />,
          external: true,
        },
        {
          name: 'WhatsApp Support',
          to: 'https://wa.me/2349013644892',
          icon: <MessageCircle className="w-4 h-4 mr-2" />,
          external: true,
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Youtube className="w-5 h-5" />, to: 'https://youtube.com/@kalifaos?si=Ew2nW16T7Y4IjGTo', label: 'YouTube' },
    {
      icon: <Facebook className="w-5 h-5" />,
      to: 'https://www.facebook.com/share/1CfnPzT4jk/?mibextid=wwXIfr',
      label: 'Facebook',
    },
  ];

  return (
    <footer className="bg-gray-900 w-screen border-t border-blue-500 text-white pt-12 pb-2">
      <div className=" flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Unlock className="text-blue-600 w-6 h-6" />
              <span className="font-bold text-xl">KALIFA OS</span>
            </Link>
            <p className="text-white mb-4">
              The next-generation operating system for modern computing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.to}
                  className="text-white hover:text-gray-400 transition"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4 text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.to}
                        className="flex items-center text-white hover:text-gray-400 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.icon && link.icon}
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.to}
                        className="flex items-center text-white hover:text-gray-400 transition"
                      >
                        {link.icon && link.icon}
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-white">
          <p>© {currentYear} Kalifa OS. All rights reserved.</p>
        </div>

        <div className="text-center mt-2 mb-1 text-white">
          <p className="font-mono text-[10px] uppercase">
            developed by <span className="text-blue-500">mbboy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}