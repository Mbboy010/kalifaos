// app/learn-more/page.tsx
'use client';

import { Shield, Zap, Lock, Smartphone, Code, Globe, ShieldCheck, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks';


export default function LearnMore() {
  const isColor = useAppSelector((state) => state.color.value);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Military-Grade Security',
      description: 'Our unlocking process uses advanced encryption to protect your device and data throughout the entire process.',
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: 'Lightning Fast',
      description: 'Average unlock times under 30 minutes for most devices. We prioritize speed without compromising security.',
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: '100% Legal',
      description: 'All our methods comply with DMCA regulations and local laws. We only unlock devices you legally own.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: 'Device Protection',
      description: 'Guaranteed no data loss or voided warranty. Our process is completely non-invasive.',
    },
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: 'Advanced Technology',
      description: 'Proprietary algorithms developed by our team of security experts and reverse engineers.',
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: 'Global Coverage',
      description: 'Works with devices from all major carriers worldwide, including regional providers.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Submit Your Details',
      description: 'Provide your device information through our secure form.',
    },
    {
      number: '2',
      title: 'Instant Analysis',
      description: 'Our system automatically determines the best unlock method.',
    },
    {
      number: '3',
      title: 'Secure Payment',
      description: 'Choose your preferred payment method (crypto accepted).',
    },
    {
      number: '4',
      title: 'Receive Unlock',
      description: 'Get your permanent unlock code via email within minutes.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Most <span className="text-blue-600">Advanced</span> Unlocking Technology
            </h1>
            <p className="text-xl mb-8">
              Discover how our proprietary system safely unlocks any device while maintaining full security and compliance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/try-free"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Try Free Demo
              </Link>
              <Link
                href="/pricing"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Our Technology Stands Out</h2>
            <p className="max-w-2xl mx-auto">
              Developed by security experts with decades of combined experience in mobile device security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${isColor ? 'bg-[#d7d7d719]' : 'bg-[#72727236]'} p-8 rounded-xl hover:shadow-md transition`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Proven Process</h2>
            <p className="max-w-2xl mx-auto">
              Simple, secure steps to permanently unlock your device.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="font-bold text-xl">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Under the Hood</h2>
              <p className="mb-4">
                Our proprietary unlocking engine combines multiple advanced techniques:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Direct carrier database access for legitimate unlocks</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced cryptographic pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Manufacturer-level security vulnerability research</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regularly updated against the latest firmware patches</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className={`${isColor ? 'bg-[#d7d7d719]' : 'bg-[#72727236]'} p-8 rounded-xl`}>
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <p className="mt-4 text-center text-sm">
                  Our security architecture ensures your device remains protected throughout the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className={`${isColor ? 'bg-[#d7d7d719]' : 'bg-[#72727236]'} rounded-xl max-w-4xl mx-auto p-12 text-center`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Unlock Your Device?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've regained full control of their devices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/try-free"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}