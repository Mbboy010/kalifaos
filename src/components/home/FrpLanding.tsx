'use client';

import { Download, Smartphone, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

export default function FrpLanding() {
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="flex flex-col  p-5 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex  items-center w-full mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-left">
          Android Bypass Tools
        </h2>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full mx-auto animate-fade-in animation-delay-200">
        <Link
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/frp-tools-apk-download"
          className="flex items-center p-4 sm:p-6 rounded-lg shadow-md transition-colors "
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 sm:w-6 sm:h-6 " />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold ">
                Download FRP Tools APK
              </h2>
              <p className="text-xs sm:text-sm mt-1 ">
                Download APK files for FRP bypass tools.
              </p>
            </div>
          </div>
        </Link>
        <Link
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/system-apps"
          className="flex items-center p-4 sm:p-6 rounded-lg shadow-md transition-colors "
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 " />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold ">
                Set System Apps
              </h2>
              <p className="text-xs sm:text-sm mt-1 ">
                Access system applications for various Android brands.
              </p>
            </div>
          </div>
        </Link>
        <Link
        style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          href="/bypass-frp-setting"
          className="flex items-center  p-4 sm:p-6 rounded-lg shadow-md transition-colors "
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 " />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold ">
                Configure Settings
              </h2>
              <p className="text-xs sm:text-sm mt-1 ">
                Configure settings and lock screen for FRP bypass.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Disclaimer */}
      <div 
      style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
      className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg text-xs sm:text-sm max-w-3xl w-full mx-auto border border-gray-700 ">
      
        <p className="">
          Use these tools responsibly and only on devices you legally own. Kalifa OS is not responsible for any misuse or device issues.
        </p>
      </div>
    </div>
  );
}