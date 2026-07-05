'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname } from 'next/navigation';

function sendTrack(body: object) {
  try {
    navigator.sendBeacon('/api/track', JSON.stringify(body));
  } catch {
    fetch('/api/track', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const prevPath = useRef('');

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    sendTrack({
      type: 'pageview',
      path: pathname + window.location.search,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    });
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
