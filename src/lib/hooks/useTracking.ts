'use client';

import { useEffect, useRef, useCallback } from 'react';

let cachedIP: string | null = null;

async function getMyIP(): Promise<string | null> {
  if (cachedIP) return cachedIP;
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      cachedIP = data.ip || null;
      return cachedIP;
    }
  } catch {}
  return null;
}

function sendTrack(body: object) {
  try {
    navigator.sendBeacon('/api/track', JSON.stringify(body));
  } catch {
    fetch('/api/track', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
  }
}

export function useTracking() {
  const sentDepths = useRef<Set<number>>(new Set());
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

export async function trackPageView(path: string) {
  const clientIp = await getMyIP();
  sendTrack({
    type: 'pageview',
    path: path + window.location.search,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    clientIp,
  });
}
