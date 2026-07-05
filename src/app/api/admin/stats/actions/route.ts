import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await prisma.userAction.groupBy({
    by: ['actionType'],
    _count: { actionType: true },
    orderBy: { _count: { actionType: 'desc' } },
    take: 20,
  });

  const data = result.map(r => ({ actionType: r.actionType, count: r._count.actionType }));
  return NextResponse.json(data);
}
