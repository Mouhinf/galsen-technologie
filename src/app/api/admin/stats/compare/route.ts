import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevPeriodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevPeriodEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [currentCount, prevCount] = await Promise.all([
    prisma.visit.count({ where: { createdAt: { gte: periodStart } } }),
    prisma.visit.count({ where: { createdAt: { gte: prevPeriodStart, lte: prevPeriodEnd } } }),
  ]);

  const [currentSessions, prevSessions] = await Promise.all([
    prisma.visit.groupBy({ by: ['sessionId'], where: { createdAt: { gte: periodStart } }, _count: { sessionId: true } }),
    prisma.visit.groupBy({ by: ['sessionId'], where: { createdAt: { gte: prevPeriodStart, lte: prevPeriodEnd } }, _count: { sessionId: true } }),
  ]);

  const change = prevCount > 0 ? (((currentCount - prevCount) / prevCount) * 100).toFixed(1) : '+100';

  return NextResponse.json({
    currentVisits: currentCount,
    prevVisits: prevCount,
    change: `${change}%`,
    currentSessions: currentSessions.length,
    prevSessions: prevSessions.length,
  });
}
