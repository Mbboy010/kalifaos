// app/components/about/AboutCon.tsx
// app/components/AboutCon.tsx
'use client';
import { Mail, Facebook, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

export default function AboutCon() {
  const isColor = useAppSelector((state: RootState) => state.color.value);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div
            style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            className="p-4 rounded-xl mt-12  shadow-lg"
          >
            <div className="w-40 h-40 flex items-center justify-center bg-blue-100 rounded-lg">
              <Image
                src="/Logo.jpg" // Path relative to the public directory
                alt="Kalifa OS Logo"
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="rounded-xl p-8 mb-12">
          <h1 className="text-4xl font-bold mb-6">About Kalifa OS</h1>

          <div className="prose max-w-none">
            <p className="mb-4">
              Kalifa OS is a cutting-edge mobile solutions provider specializing in device unlocking and FRP bypass services.
              Our team of experts has developed proprietary technology to help users regain full access to their devices.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="mb-4">
              To provide reliable, secure, and affordable solutions for mobile device users worldwide,
              ensuring no one remains locked out of their personal devices.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
            <p className="mb-4">
              Using advanced algorithms and years of mobile security research, we've developed tools that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Bypass FRP locks without data loss</li>
              <li>Unlock devices from all major carriers</li>
              <li>Maintain device security throughout the process</li>
              <li>Provide 24/7 support for our solutions</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          className="rounded-xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Mail className={`w-6 h-6 mt-1 ${isColor ? 'text-blue-600' : 'text-blue-500'}`} />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a
                  href="mailto:Kalifaos763@gmail.com"
                  className={`hover:underline ${isColor ? 'text-blue-600' : 'text-blue-500'}`}
                >
                  Kalifaos763@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Smartphone className={`w-6 h-6 mt-1 ${isColor ? 'text-blue-600' : 'text-blue-500'}`} />
              <div>
                <h3 className="font-semibold">Mobile</h3>
                <a
                  href="tel:09161963225"
                  className={`hover:underline ${isColor ? 'text-blue-600' : 'text-blue-500'}`}
                >
                  +251 916 196 3225
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Facebook className={`w-6 h-6 mt-1 ${isColor ? 'text-blue-600' : 'text-blue-500'}`} />
              <div>
                <h3 className="font-semibold">Facebook</h3>
                <a
                  href="https://www.facebook.com/share/1CfnPzT4jk/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline ${isColor ? 'text-blue-600' : 'text-blue-500'}`}
                >
                  facebook.com/KalifaOS
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Globe className={`w-6 h-6 mt-1 ${isColor ? 'text-blue-600' : 'text-blue-500'}`} />
              <div>
                <h3 className="font-semibold">TikTok</h3>
                <a
                  href="https://www.tiktok.com/@kalifaos.frp.bypa?_t=ZM-8wEil1SbIyl&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline ${isColor ? 'text-blue-600' : 'text-blue-500'}`}
                >
                  @kalifaos.frp.bypa
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className={`inline-block px-8 py-3 rounded-lg font-medium ${
              isColor
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-700 text-white hover:bg-blue-600'
            } transition-colors`}
          >
            Get Help With Your Device
          </Link>
        </div>
      </div>
    </div>
  );
}