'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useTracking() {
  const sentDepths = useRef<Set<number>>(new Set());
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimer.current) return;
      scrollTimer.current = setTimeout(() => {
        scrollTimer.current = null;
        const h = document.documentElement;
        const pct = Math.round(((h.scrollTop + h.clientHeight) / h.scrollHeight) * 100 / 25) * 25;
        if (pct >= 25 && !sentDepths.current.has(pct)) {
          sentDepths.current.add(pct);
          sendTrack({ type: 'action', actionType: 'scroll_depth', metadata: { depth: pct } });
        }
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackEvent = useCallback((actionType: string, metadata?: Record<string, unknown>) => {
    sendTrack({ type: 'action', actionType, metadata: metadata || {} });
  }, []);

  return { trackEvent };
}

function sendTrack(body: object) {
  try {
    navigator.sendBeacon('/api/track', JSON.stringify(body));
  } catch {
    fetch('/api/track', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
  }
}
