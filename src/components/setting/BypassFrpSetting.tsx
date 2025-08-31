"use client";

import { Settings2, Phone, Unlock } from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { trackClick } from "@/lib/trackClick";

export default function BypassFrpSetting() {
  const isColor = useAppSelector((state) => state.color.value);

  const handleTrackClick = (action: string) => {
    trackClick(`/bypass-frp-setting/${action}`);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl mt-10 font-bold mb-4">Bypass FRP Setting</h1>
      <p className="text-base max-w-xl mx-auto text-center mb-6 text-gray-600">
        Guide to bypass FRP settings with Kalifa OS. Follow steps to open app
        settings, set screen lock, or access phone app for device unlocking.
      </p>

      {/* Cards */}
      <div className="w-full max-w-sm space-y-3">
        {/* 1. Open App Setting */}
        <a
          className="block"
          href="intent://com.android.settings/#Intent;scheme=android-app;end"
          onClick={() => handleTrackClick("open-app-setting")}
        >
          <div
            style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
            className="flex items-center hover:bg-gray-700 p-3 shadow rounded-md"
          >
            <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-blue-600">
                1. Open App Setting
              </h2>
              <p className="text-xs text-gray-500">Open Setting</p>
            </div>
          </div>
        </a>

        {/* 2. Set Screen Lock */}
        <a
          className="block"
          href="intent://com.google.android.gms/#Intent;scheme=promote_smartlock_scheme;end"
          onClick={() => handleTrackClick("set-screen-lock")}
        >
          <div
            style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
            className="flex items-center hover:bg-gray-700 p-3 shadow rounded-md"
          >
            <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-orange-600">
                2. Set Screen Lock
              </h2>
              <p className="text-xs text-gray-500">Open screen lock</p>
            </div>
          </div>
        </a>

        {/* 3. Phone App */}
        <a
          className="block"
          href="tel:+2349013644892"
          onClick={() => handleTrackClick("phone-call")}
        >
          <div
            style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
            className="flex items-center hover:bg-gray-700 p-3 shadow rounded-md"
          >
            <div className="bg-green-500 text-white p-2 rounded-full mr-3">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-green-600">
                3. Open Phone App
              </h2>
              <p className="text-xs text-gray-500">Open Phone call</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}