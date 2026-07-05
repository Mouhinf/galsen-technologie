import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const byCountry = await prisma.visit.groupBy({
    by: ['country', 'city'],
    _count: { country: true },
    orderBy: { _count: { country: 'desc' } },
    take: 50,
  });

  const merged = new Map<string, { count: number; cities: { city: string; count: number }[] }>();
  for (const r of byCountry) {
    const key = r.country || 'Inconnu';
    if (!merged.has(key)) merged.set(key, { count: 0, cities: [] });
    const entry = merged.get(key)!;
    entry.count += r._count.country;
    if (r.city) {
      entry.cities.push({ city: r.city, count: r._count.country });
    }
  }

  const data = Array.from(merged.entries()).map(([country, val]) => ({
    country,
    count: val.count,
    cities: val.cities.sort((a, b) => b.count - a.count).slice(0, 5),
  })).sort((a, b) => b.count - a.count).slice(0, 20);

  return NextResponse.json(data);
}
