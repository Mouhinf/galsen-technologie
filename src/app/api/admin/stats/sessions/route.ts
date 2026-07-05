import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { sessionId: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const sessionMap: Record<string, { first: Date; last: Date; count: number }> = {};
  for (const v of visits) {
    if (!sessionMap[v.sessionId]) {
      sessionMap[v.sessionId] = { first: v.createdAt, last: v.createdAt, count: 0 };
    }
    sessionMap[v.sessionId].last = v.createdAt;
    sessionMap[v.sessionId].count++;
  }

  const sessions = Object.values(sessionMap);
  const totalSessions = sessions.length;
  const pageviews = sessions.reduce((s, se) => s + se.count, 0);
  const avgPagesPerSession = totalSessions > 0 ? pageviews / totalSessions : 0;

  let totalDurationMs = 0;
  let durationCount = 0;
  for (const s of sessions) {
    const dur = s.last.getTime() - s.first.getTime();
    if (dur > 0 && dur < 1000 * 60 * 60) {
      totalDurationMs += dur;
      durationCount++;
    }
  }
  const avgDurationSec = durationCount > 0 ? Math.round(totalDurationMs / durationCount / 1000) : 0;

  const singlePageSessions = sessions.filter(s => s.count === 1).length;
  const bounceRate = totalSessions > 0 ? ((singlePageSessions / totalSessions) * 100).toFixed(1) : '0';

  return NextResponse.json({
    totalSessions,
    pageviews,
    avgPagesPerSession: avgPagesPerSession.toFixed(1),
    avgDurationSec,
    bounceRate: `${bounceRate}%`,
    sessionsCount: sessions.length,
  });
}
