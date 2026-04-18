"use client";
import React from 'react';
import { Smartphone, RotateCcw, Music, Scale, Zap, Cpu } from 'lucide-react';

const RulesPage = () => {
  const RuleCard = ({ icon: Icon, title, description, points }: any) => (
    <div className="bg-[#111111] border border-zinc-800 p-6 rounded-2xl hover:border-blue-900 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h3>
      </div>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2">
        {points.map((point: string, index: number) => (
          <li key={index} className="flex items-start gap-2 text-sm text-zinc-300">
            <span className="text-blue-500 mt-1">•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-blue-500 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
            Service <span className="text-blue-600">Protocols</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 text-lg">
            Standard operating procedures for Mobile Engineering, OS Flashing, and Digital Asset acquisition.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <RuleCard 
            icon={Smartphone}
            title="Mobile Engineering"
            description="Guidelines for device software modifications, including bypassing and custom firmware."
            points={[
              "MDM (Mobile Device Management) bypass is permanent unless factory reset",
              "FRP (Factory Reset Protection) removal requires proof of ownership",
              "We are not liable for hardware failure during software procedures",
              "Network unlocking is carrier-dependent and final"
            ]}
          />

          <RuleCard 
            icon={RotateCcw}
            title="OS Flashing"
            description="Rules regarding the installation of custom ROMs, stock firmware, and recovery tools."
            points={[
              "Ensure 80%+ battery before submitting for flashing",
              "Custom ROM installation voids manufacturer warranty",
              "Bootloader unlocking is at the owner's risk",
              "Firmware downgrading is not supported on all models"
            ]}
          />

          <RuleCard 
            icon={Cpu}
            title="Technical Support"
            description="How we handle the technical delivery of software solutions and bypass tools."
            points={[
              "Remote sessions require a stable internet connection",
              "Post-service support is limited to 7 days",
              "Re-locking a bypassed device is the user's responsibility",
              "No support for stolen or blacklisted devices"
            ]}
          />

          <RuleCard 
            icon={Music}
            title="Digital Marketplace"
            description="Rules for music tools, sample packs, and code assets from Asstudio."
            points={[
              "One license per user; no account sharing",
              "Digital downloads are non-refundable",
              "Commercial rights apply to finished music projects only",
              "Reselling raw source code or samples is prohibited"
            ]}
          />

          <RuleCard 
            icon={Zap}
            title="Payment Standards"
            description="Protocol for Crypto, USD, and Local Bank (Naira) transactions."
            points={[
              "Transaction fees are covered by the sender",
              "Payment must be confirmed before service begins",
              "Screenshots of receipts are mandatory for manual bank transfers",
              "Chargeback attempts will result in a global blacklist"
            ]}
          />

          <RuleCard 
            icon={Scale}
            title="Legal Compliance"
            description="The governing framework for our services and platform usage."
            points={[
              "Users must be 18+ for financial transactions",
              "Services are provided 'as is' without implied warranty",
              "Jurisdiction: Laws of the Federal Republic of Nigeria",
              "Terms are subject to change without notice"
            ]}
          />

        </div>

        {/* Call to Action Footer */}
        <div className="mt-20 p-10 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-center backdrop-blur-sm">
          <p className="text-zinc-400 italic text-sm mb-6">
            "Software is a tool, engineering is a craft." — Operating since 2025
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              I Accept the Terms
            </button>
            <button className="px-10 py-4 border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RulesPage;
