import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function detectDevice(ua: string | null): string {
  if (!ua) return 'desktop';
  if (/mobile|android|iphone|ipod|blackberry/i.test(ua)) return 'mobile';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  return 'desktop';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, referrer, userAgent, actionType, metadata, country: bodyCountry, city: bodyCity, region: bodyRegion } = body;

    const sessionId = req.cookies.get('gs_session')?.value || crypto.randomUUID();
    const ua = userAgent || req.headers.get('user-agent') || '';
    const device = detectDevice(ua);

    // Prefer geolocation sent from browser (client-side ip-api.com call)
    // Falls back to Vercel headers if missing
    const country = bodyCountry || req.headers.get('x-vercel-ip-country') || null;
    const city = bodyCity || req.headers.get('x-vercel-ip-city') || null;
    const region = bodyRegion || req.headers.get('x-vercel-ip-country-region') || null;

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
