'use client';

import { useEffect, useRef, useCallback } from 'react';

type GeoInfo = { country?: string; city?: string; region?: string };

let cachedGeo: GeoInfo | null = null;

async function getGeo(): Promise<GeoInfo> {
  if (cachedGeo) return cachedGeo;
  try {
    const res = await fetch('https://ip-api.com/json/?fields=status,country,city,regionName', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.country) {
        cachedGeo = { country: data.country, city: data.city || undefined, region: data.regionName || undefined };
        return cachedGeo;
      }
    }
  } catch {}
  return {};
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

export async function trackPageView(path: string) {
  const geo = await getGeo();
  sendTrack({
    type: 'pageview',
    path: path + window.location.search,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    ...geo,
  });
}
