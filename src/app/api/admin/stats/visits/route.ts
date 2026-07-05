import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

function getDateRange(period: string): Date {
  const now = new Date();
  switch (period) {
    case 'day': return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case 'week': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'month': return new Date(now.getFullYear(), now.getMonth(), 1);
    case 'year': return new Date(now.getFullYear(), 0, 1);
    default: return new Date(0);
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || 'month';
  const since = getDateRange(period);

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: 'asc' },
    select: { createdAt: true },
  });

  const map: Record<string, number> = {};
  const fmt = period === 'day' ? 'hour' : period === 'week' || period === 'month' ? 'day' : 'month';

  for (const v of visits) {
    const d = new Date(v.createdAt);
    const key = fmt === 'hour'
      ? `${d.getHours()}:00`
      : fmt === 'day'
        ? d.toISOString().slice(0, 10)
        : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    map[key] = (map[key] || 0) + 1;
  }

  const labels = Object.keys(map).sort();
  const data = labels.map(l => ({ label: l, count: map[l] }));

  const total = visits.length;
  const today = visits.filter(v => v.createdAt >= getDateRange('day')).length;
  const thisWeek = visits.filter(v => v.createdAt >= getDateRange('week')).length;
  const thisMonth = visits.filter(v => v.createdAt >= getDateRange('month')).length;

  return NextResponse.json({ data, total, today, thisWeek, thisMonth });
}
