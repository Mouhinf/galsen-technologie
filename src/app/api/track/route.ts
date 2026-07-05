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
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return req.headers.get('x-vercel-ip-country') ? null : null;
}

const geoCache = new Map<string, { country: string; city: string; region: string }>();

async function geoLocate(ip: string): Promise<{ country: string; city: string; region: string } | null> {
  if (geoCache.has(ip)) return geoCache.get(ip)!;
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,regionName`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.country) {
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

    let country = req.headers.get('cf-ipcountry') || req.headers.get('x-vercel-ip-country') || null;
    let city = req.headers.get('x-vercel-ip-city') || null;
    let region = req.headers.get('x-vercel-ip-country-region') || null;

    if (!country) {
      const ip = getClientIP(req);
      if (ip && ip !== '127.0.0.1' && ip !== '::1') {
        const geo = await geoLocate(ip);
        if (geo) {
          country = geo.country;
          city = city || geo.city || null;
          region = region || geo.region || null;
        }
      }
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
