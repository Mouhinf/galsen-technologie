import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await prisma.visit.groupBy({
    by: ['path'],
    _count: { path: true },
    orderBy: { _count: { path: 'desc' } },
    take: 20,
  });

  const data = result.map(r => ({ path: r.path, count: r._count.path }));
  return NextResponse.json(data);
}
