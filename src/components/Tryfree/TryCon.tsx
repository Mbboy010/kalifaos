'use client';

import { Smartphone, Shield, Zap, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import type { RootState } from '@/redux/store'; // Adjust the path as needed
import { db } from '@/server/firebaseApi';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function TryCon() {
  const isColor = useSelector((state: RootState) => state.color.value);

  const [formData, setFormData] = useState({
    deviceType: '',
    imei: '',
    email: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    deviceType: '',
    imei: '',
    email: '',
    agreeTerms: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      deviceType: '',
      imei: '',
      email: '',
      agreeTerms: '',
    };

    if (!formData.deviceType) {
      newErrors.deviceType = 'Please select your device type';
      valid = false;
    }

    if (!formData.imei) {
      newErrors.imei = 'IMEI number is required';
      valid = false;
    } else if (!/^\d{15}$/.test(formData.imei)) {
      newErrors.imei = 'IMEI must be 15 digits';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'trialRequests'), {
          deviceType: formData.deviceType,
          imei: formData.imei,
          email: formData.email,
          agreeTerms: formData.agreeTerms,
          timestamp: Timestamp.now(),
        });

        setSubmitSuccess(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error submitting to Firestore:', error);
        alert('Submission failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex justify-center h-full items-center">
        <div
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          className="rounded-xl mt-10 shadow-md p-8 max-w-md text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Request Received!</h1>
          <p className="mb-6">
            We've sent your free diagnostic report to {formData.email}. Check your inbox in a few minutes.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto  px-4 py-16 text-center">
        <div
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          className="rounded-xl  mt-10 shadow-md p-8 md:p-12 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="text-blue-600">Free</span> Unlocking Service
          </h1>

          <div
            style={{ backgroundColor: isColor ? '#b9d4ff40' : '#b9d4ff6c' }}
            className="border border-blue-400 rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Free Trial Includes:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-green-500 mr-2" />, text: 'Basic IMEI check' },
                { icon: <Smartphone className="w-5 h-5 text-blue-500 mr-2" />, text: 'Device compatibility test' },
                { icon: <Shield className="w-5 h-5 text-blue-500 mr-2" />, text: 'Security verification' },
                { icon: <Zap className="w-5 h-5 text-blue-500 mr-2" />, text: 'Quick diagnostic report' },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleForm} className="space-y-4">
              {/* Device Type */}
              <div>
                <label htmlFor="deviceType" className="block text-sm font-medium text-left mb-1">
                  Device Type *
                </label>
                <select
                  id="deviceType"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#6d6d6d41] border ${
                    errors.deviceType ? 'border-red-500' : 'border-gray-300'
                  } rounded-md outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select your device</option>
                  <option value="iphone">iPhone</option>
                  <option value="samsung">Samsung</option>
                  <option value="other">Other Android</option>
                </select>
                {errors.deviceType && <p className="mt-1 text-sm text-red-600">{errors.deviceType}</p>}
              </div>

              {/* IMEI Number */}
              <div>
                <label htmlFor="imei" className="block text-sm font-medium text-left mb-1">
                  IMEI Number *
                </label>
                <input
                  type="text"
                  id="imei"
                  name="imei"
                  value={formData.imei}
                  onChange={handleChange}
                  placeholder="Enter 15-digit IMEI"
                  className={`w-full px-4 py-2 bg-[#6d6d6d41] border ${
                    errors.imei ? 'border-red-500' : 'border-gray-300'
                  } ${
                    isColor ? 'placeholder:text-white placeholder:opacity-70' : 'placeholder:text-black placeholder:opacity-70'
                  } rounded-md outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.imei && <p className="mt-1 text-sm text-red-600">{errors.imei}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-left mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 bg-[#6d6d6d41] border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${
                    isColor ? 'placeholder:text-white placeholder:opacity-70' : 'placeholder:text-black placeholder:opacity-70'
                  } rounded-md outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="font-medium">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    *
                  </label>
                  {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition font-medium flex items-center justify-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </>
                )}
              </button>
            </form>

            <p className="text-sm mt-4">* Required fields</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Our Free Trial Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Enter Details', desc: 'Fill in your device information and IMEI number.' },
              { step: '2', title: 'Run Diagnostics', desc: 'Our system will analyze your device compatibility.' },
              { step: '3', title: 'Get Results', desc: 'Receive your free diagnostic report via email.' },
            ].map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
                className="p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex w-full justify-center items-center">
        <div className="bg-blue-600 mb-10 py-12 rounded-xl text-white w-[92%]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Full Unlocking?</h2>
            <p className="text-lg mb-6">Upgrade to unlock your device completely with our premium service.</p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}