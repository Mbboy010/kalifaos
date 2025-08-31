'use client';

import { useEffect, useState } from 'react';
import { Settings2, Phone, Unlock } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import { trackClick } from '@/lib/trackClick';

export default function BypassFrpSetting() {
  const isColor = useAppSelector((state) => state.color.value);

  const handleTrackClick = (action: string) => {
    trackClick(`/bypass-frp-setting/${action}`);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl mt-16 font-bold mb-6">Bypass FRP Setting</h1>
      <p className="text-lg max-w-2xl mx-auto text-center mb-8">
        Guide to bypass FRP settings with Kalifa OS. Follow steps to open app settings, set screen lock, or access phone app for device unlocking.
      </p>

      <div className="w-full max-w-md space-y-4">
        {/* 1. Open App Setting */}
        <a
          className="p-3 block"
          href="intent://com.android.settings/#Intent;scheme=android-app;end"
          onClick={() => handleTrackClick('open-app-setting')}
        >
          <div
            style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            className="flex items-center hover:bg-gray-700 p-4 shadow rounded-lg"
          >
            <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
              <Settings2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-600">1. Click Open App Setting</h2>
              <p>Open Setting</p>
            </div>
          </div>
        </a>

        {/* 2. Set Screen Lock */}
        <a
          className="p-3 block"
          href="intent://com.google.android.gms/#Intent;scheme=promote_smartlock_scheme;end"
          onClick={() => handleTrackClick('set-screen-lock')}
        >
          <div
            style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            className="flex items-center hover:bg-gray-700 p-4 shadow rounded-lg"
          >
            <div className="bg-orange-500 text-white p-3 rounded-full mr-4">
              <Unlock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-orange-600">2. Set Screen Lock</h2>
              <p>Open set screen Lock</p>
            </div>
          </div>
        </a>

        {/* 3. Phone App */}
        <a
          className="p-3 block"
          href="tel:+2349013644892"
          onClick={() => handleTrackClick('phone-call')}
        >
          <div
            style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            className="flex items-center hover:bg-gray-700 p-4 shadow rounded-lg"
          >
            <div className="bg-green-500 text-white p-3 rounded-full mr-4">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-green-600">3. Click to open Phone app</h2>
              <p>Open Phone call</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}