import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function detectDevice(ua: string | null): string {
  if (!ua) return 'desktop';
  if (/mobile|android|iphone|ipod|blackberry/i.test(ua)) return 'mobile';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  return 'desktop';
}

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

const geoCache = new Map<string, { country: string; city: string; region: string }>();

async function geoLocate(ip: string): Promise<{ country: string; city: string; region: string } | null> {
  if (geoCache.has(ip)) return geoCache.get(ip)!;
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,regionName,status`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === 'success') {
      const result = { country: data.country, city: data.city || '', region: data.regionName || '' };
      geoCache.set(ip, result);
      return result;
    }
  } catch {}
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, referrer, userAgent, actionType, metadata } = body;

    const sessionId = req.cookies.get('gs_session')?.value || crypto.randomUUID();
    const ua = userAgent || req.headers.get('user-agent') || '';
    const device = detectDevice(ua);

    let country: string | null = null;
    let city: string | null = null;
    let region: string | null = null;

    const ip = getClientIP(req);
    if (ip) {
      const geo = await geoLocate(ip);
      if (geo) {
        country = geo.country;
        city = geo.city || null;
        region = geo.region || null;
      }
    }

    if (!country) {
      country = req.headers.get('x-vercel-ip-country') || null;
      city = city || req.headers.get('x-vercel-ip-city') || null;
      region = region || req.headers.get('x-vercel-ip-country-region') || null;
    }

    if (type === 'pageview') {
      await prisma.visit.create({
        data: { sessionId, path: path || '/', referrer: referrer || null, userAgent: ua, country, city, region, device },
      });
    } else if (type === 'action') {
      await prisma.userAction.create({
        data: { sessionId, actionType: actionType || 'unknown', metadata: metadata || {} },
      });
    }

    const res = NextResponse.json(null, { status: 204 });
    res.cookies.set('gs_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json(null, { status: 204 });
  }
}
