import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    select: { createdAt: true },
  });

  const hours: number[] = new Array(24).fill(0);
  for (const v of visits) {
    const h = new Date(v.createdAt).getHours();
    hours[h]++;
  }

  const data = hours.map((count, hour) => ({ hour: `${String(hour).padStart(2, '0')}:00`, count }));
  return NextResponse.json(data);
}
