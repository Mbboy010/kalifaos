'use client';

import { Download, Smartphone, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

export default function FrpLanding() {
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="flex flex-col p-6 sm:p-8 md:p-12 lg:p-16">
      {/* Header */}
      <div className="flex items-center w-full mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left">
          Android Bypass Tools
        </h2>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full mx-auto animate-fade-in animation-delay-200">
        {/* Card 1 */}
        <Link
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/frp-tools-apk-download"
          className="flex items-center p-6 sm:p-8 rounded-2xl shadow-lg transition-colors hover:shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 sm:w-14 md:w-16 aspect-square bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Download FRP Tools APK
              </h2>
              <p className="text-sm sm:text-base md:text-lg mt-1">
                Download APK files for FRP bypass tools.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 2 */}
        <Link
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/system-apps"
          className="flex items-center p-6 sm:p-8 rounded-2xl shadow-lg transition-colors hover:shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 sm:w-14 md:w-16 aspect-square bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">System Apps
              </h2>
              <p className="text-sm sm:text-base md:text-lg mt-1">
                Access system applications for various Android brands.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 3 */}
        <Link
          style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/setting-and-lock-screen"
          className="flex items-center p-6 sm:p-8 rounded-2xl shadow-lg transition-colors hover:shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 sm:w-14 md:w-16 aspect-square bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Configure Settings
              </h2>
              <p className="text-sm sm:text-base md:text-lg mt-1">
                Configure settings and lock screen for FRP bypass.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}