import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true, path: true, device: true, country: true, createdAt: true },
  });

  return NextResponse.json(visits);
}
