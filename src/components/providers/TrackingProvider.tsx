'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/hooks/useTracking';

function PageViewTracker() {
  const pathname = usePathname();
  const prevPath = useRef('');

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </>
  );
}
