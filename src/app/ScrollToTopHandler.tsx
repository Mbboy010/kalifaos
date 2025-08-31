'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTopHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable browser scroll restore
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // Always scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
}