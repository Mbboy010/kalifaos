// app/providers.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState ,useRef} from 'react';
import { increaseVisit } from "@/lib/increaseVisit";

export default function RouteTracker() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (pathname) {
      increaseVisit(pathname,prevPathname);
    }
  }, [pathname]);

  return null; 
}