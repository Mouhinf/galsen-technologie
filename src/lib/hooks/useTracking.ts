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
  const sentDepths = useRef<Set<number>>(new Set());
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    if (current === prevPath.current) return;

    if (prevPath.current) {
      sendTrack({ type: 'action', actionType: 'page_exit', metadata: { path: prevPath.current } });
    }

    prevPath.current = current;
    sentDepths.current = new Set();

    sendTrack({
      type: 'pageview',
      path: current,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    });
  }, [pathname, searchParams]);

  // Scroll depth tracking (throttled)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimer.current) return;
      scrollTimer.current = setTimeout(() => {
        scrollTimer.current = null;
        const h = document.documentElement;
        const pct = Math.round(((h.scrollTop + h.clientTop) / (h.scrollHeight - h.clientHeight)) * 100 / 25) * 25;
        if (pct >= 25 && !sentDepths.current.has(pct)) {
          sentDepths.current.add(pct);
          sendTrack({ type: 'action', actionType: 'scroll_depth', metadata: { depth: pct, path: prevPath.current } });
        }
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackEvent = useCallback((actionType: string, metadata?: Record<string, unknown>) => {
    sendTrack({ type: 'action', actionType, metadata: { ...metadata, path: prevPath.current } });
  }, []);

  return { trackEvent };
}
