'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function sendTrack(body: object) {
  try {
    navigator.sendBeacon('/api/track', JSON.stringify(body));
  } catch {
    fetch('/api/track', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
  }
}

export function useTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPath = useRef('');

  useEffect(() => {
    const current = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    if (current === prevPath.current) return;
    prevPath.current = current;

    sendTrack({
      type: 'pageview',
      path: current,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    });
  }, [pathname, searchParams]);

  const trackEvent = useCallback((actionType: string, metadata?: Record<string, unknown>) => {
    sendTrack({ type: 'action', actionType, metadata: metadata || {} });
  }, []);

  return { trackEvent };
}
