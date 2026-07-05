import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    select: { referrer: true },
  });

  const sources: Record<string, number> = { direct: 0, social: 0, search: 0, email: 0, other: 0 };

  for (const v of visits) {
    const r = (v.referrer || '').toLowerCase();
    if (!r || r === '') {
      sources.direct++;
    } else if (/facebook|twitter|x\.com|linkedin|instagram|t\.co|lnkd\.in/i.test(r)) {
      sources.social++;
    } else if (/google|bing|yahoo|duckduckgo|ecosia|qwant/i.test(r)) {
      sources.search++;
    } else if (/mail\.to|outlook|gmail|yahoo\.com\/mail/i.test(r)) {
      sources.email++;
    } else {
      sources.other++;
    }
  }

  const data = Object.entries(sources).map(([source, count]) => ({ source, count }));
  return NextResponse.json(data);
}
