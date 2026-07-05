import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await prisma.visit.groupBy({
    by: ['country'],
    _count: { country: true },
    orderBy: { _count: { country: 'desc' } },
    take: 20,
  });

  const data = result.map(r => ({ country: r.country || 'Inconnu', count: r._count.country }));
  return NextResponse.json(data);
}
