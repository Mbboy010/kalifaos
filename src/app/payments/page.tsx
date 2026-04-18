"use client";
import React, { useState } from 'react';
import { Copy, CheckCircle2, Wallet, CreditCard, Landmark } from 'lucide-react';

const PaymentPage = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const PaymentSection = ({ title, icon: Icon, children, color }: any) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`${color} w-6 h-6`} />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );

  const DetailCard = ({ label, value, id }: { label: string; value: string; id: string }) => (
    <div className="bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex justify-between items-center hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm dark:shadow-none">
      <div>
        <p className="text-zinc-500 dark:text-zinc-500 text-xs font-medium uppercase mb-1">{label}</p>
        <p className="text-zinc-800 dark:text-white font-mono text-sm break-all">{value}</p>
      </div>
      <button 
        onClick={() => handleCopy(value, id)}
        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors ml-4"
      >
        {copied === id ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Payment Methods</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Select a preferred method to complete your transaction</p>
        </header>

        {/* Method 1: Crypto */}
        <PaymentSection title="Crypto Wallets" icon={Wallet} color="text-yellow-600 dark:text-yellow-500">
          <DetailCard label="Binance (USDT-BEP20)" value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" id="binance" />
          <DetailCard label="Bybit (USDT-TRC20)" value="TNVv6M7pZ6vLh5TzG3vR9nJqXyZ8mB2K1s" id="bybit" />
        </PaymentSection>

        {/* Method 2: Dollar */}
        <PaymentSection title="USD / International" icon={CreditCard} color="text-blue-600 dark:text-blue-500">
          <DetailCard label="PayPal Email" value="payments@kalifaos.site" id="paypal" />
          <DetailCard label="Chipper Cash" value="@mbboy_global" id="chipper" />
        </PaymentSection>

        {/* Method 3: Naira */}
        <PaymentSection title="Naira / Local Bank" icon={Landmark} color="text-green-600 dark:text-green-500">
          <DetailCard label="OPay Bank" value="8123456789" id="opay" />
          <DetailCard label="Moniepoint" value="5123456789" id="moniepoint" />
          <DetailCard label="Access Bank" value="0012345678" id="access" />
          <DetailCard label="Zenith Bank" value="1012345678" id="zenith" />
        </PaymentSection>

        <footer className="mt-12 p-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            After making payment, please send a screenshot of the receipt to support for verification.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentPage;
