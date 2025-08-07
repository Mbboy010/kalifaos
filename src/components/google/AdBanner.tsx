'use client';

import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="bg-red-500 p-4 rounded-md w-full max-w-[728px] mx-auto">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9241182560906060"
        data-ad-slot="8300628353"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}