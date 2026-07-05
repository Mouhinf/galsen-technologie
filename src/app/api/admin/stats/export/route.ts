import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10000,
    select: { path: true, referrer: true, device: true, country: true, city: true, region: true, createdAt: true, userAgent: true },
  });

  const header = 'path,referrer,device,country,city,region,date';
  const rows = visits.map(v =>
    `"${v.path}","${v.referrer || ''}","${v.device}","${v.country || ''}","${v.city || ''}","${v.region || ''}","${v.createdAt.toISOString()}"`
  ).join('\n');

  return new NextResponse(`${header}\n${rows}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="visits-export.csv"',
    },
  });
}
