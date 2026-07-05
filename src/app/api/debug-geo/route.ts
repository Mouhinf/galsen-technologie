import { NextRequest, NextResponse } from 'next/server';

function getClientIP(req: NextRequest): string | null {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim();
    if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('10.') && !ip.startsWith('172.16.') && !ip.startsWith('192.168.')) return ip;
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp && realIp !== '127.0.0.1' && realIp !== '::1' && !realIp.startsWith('10.') && !realIp.startsWith('172.16.') && !realIp.startsWith('192.168.')) return realIp;
  return null;
}

export async function GET(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => {
    if (k.startsWith('x-') || k.startsWith('cf-') || k === 'user-agent') headers[k] = v;
  });

  const ip = getClientIP(req);
  let geo = null;
  if (ip) {
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,regionName,query`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) geo = await res.json();
    } catch {}
  }

  return NextResponse.json({
    ip,
    headers,
    geo,
    vercelCountry: req.headers.get('x-vercel-ip-country'),
    vercelCity: req.headers.get('x-vercel-ip-city'),
    vercelRegion: req.headers.get('x-vercel-ip-country-region'),
  });
}
