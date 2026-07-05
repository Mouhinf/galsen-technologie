import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await prisma.visit.groupBy({
    by: ['device'],
    _count: { device: true },
    orderBy: { _count: { device: 'desc' } },
  });

  const data = result.map(r => ({ device: r.device, count: r._count.device }));
  return NextResponse.json(data);
}
