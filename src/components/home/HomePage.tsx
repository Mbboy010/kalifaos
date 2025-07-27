// app/components/home/HomePage.tsx
'use client';

import { Smartphone, Shield, Zap, Unlock, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '../redux/store';

export default function HomePage() {
  const isColor = useSelector((state: RootState) => state.color.value);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handlePrice = (price: string, name: string): void => {
    setSelectedPrice(price);
    const phoneNumber = '2349013644892'; // Replace with Kalifa OS's number
    const message = `Hello, I need help unlocking my device.\n\nI saw that the current price is ${price} for ${name}, and I want you to proceed with the full unlock.\n\nService by: Kalifa OS`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container ">
      {/* Hero Section */}
      <section className="max-w-6xl mt-6 mx-auto px-4 pb-20 pt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Unlock Your Device in <span className="text-blue-600">Minutes</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Bypass Mobile offers fast, secure, and reliable solutions to unlock your phone from any carrier or bypass FRP locks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/try-free"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Try Now for Free
          </Link>
          <Link
            href="/learn-more"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Learn More
          </Link>
        </div>
        <div className="mt-12">
          <Image
            src="/Bypass.jpg"
            alt="Bypass Mobile Demo"
            width={768}
            height={432}
            className="rounded-xl shadow-lg mx-auto w-full max-w-3xl"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Smartphone className="w-10 h-10 text-blue-600" />, title: 'Device Unlocking', desc: 'Remove carrier locks from any phone.' },
              { icon: <Shield className="w-10 h-10 text-blue-600" />, title: 'FRP Bypass', desc: 'Bypass Google Factory Reset Protection.' },
              { icon: <Zap className="w-10 h-10 text-blue-600" />, title: 'Fast & Secure', desc: '100% safe with instant results.' },
            ].map((feature, index) => (
              <div
                key={index}
                style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                className="p-6 rounded-xl text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Enter IMEI', desc: 'Provide your device\'s IMEI number.' },
              { step: '2', title: 'Make Payment', desc: 'Choose a plan and complete payment.' },
              { step: '3', title: 'Receive Unlock Code', desc: 'Get your unlock code via email.' },
            ].map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                className="p-6 rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: 'N5,000', desc: 'Single device unlock', features: ['IMEI Check', '24h Support'] },
              { name: 'Pro', price: 'N13,000', desc: 'Multiple devices', features: ['3 Unlocks', 'Priority Support'] },
              { name: 'Enterprise', price: 'N49,000', desc: 'Unlimited unlocks', features: ['Bulk IMEI', 'VIP Support'] },
            ].map((plan, index) => (
              <div
                key={index}
                className={`border rounded-xl p-6 ${index === 1 ? 'border-blue-600 shadow-lg' : 'border-gray-200 shadow-lg'}`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <p className="mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePrice(plan.price, plan.desc)}
                  className={`w-full py-2 rounded-md ${
                    index === 1 ? 'bg-blue-600 text-white' : isColor ? 'bg-gray-700 text-white' : 'bg-[#72727236]'
                  } hover:opacity-90 transition`}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Access */}
      <section id="tools-access" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Tools & Local Access</h2>
          <p className="text-lg text-center mb-6 max-w-3xl mx-auto">
            On this website, we provide powerful bypass tools that help you securely download required files and software.
            Additionally, we offer access to your local application environment to enhance performance and enable direct device interaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div
              style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
              className="p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <Unlock className="w-10 h-10 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Bypass Tools</h3>
                  <p>
                    Get access to tools that allow downloading bypass software directly, without complications.
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
              className="p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <Smartphone className="w-10 h-10 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Local App Access</h3>
                  <p>
                    Our system integrates with your local app, allowing a smoother unlocking experience and better device control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              { question: 'Is this legal?', answer: 'Unlocking is legal in most countries, but check local laws.' },
              { question: 'How long does it take?', answer: 'Typically 1-24 hours depending on the device.' },
              { question: 'Do you offer refunds?', answer: 'Yes, if we fail to unlock your device.' },
            ].map((faq, index) => (
              <div
                key={index}
                style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                className="p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center cursor-pointer">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="mt-2 pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}