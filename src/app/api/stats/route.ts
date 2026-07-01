import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const [unreadMessages, publishedProjects, publishedPosts, activeFormations, publishedTestimonials] = await Promise.all([
    prisma.message.count({ where: { status: 'UNREAD' } }),
    prisma.project.count({ where: { published: true } }),
    prisma.post.count({ where: { published: true } }),
    prisma.formation.count({ where: { active: true } }),
    prisma.testimonial.count({ where: { published: true } }),
  ]);

  const recentMessages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return NextResponse.json({
    stats: {
      unreadMessages,
      publishedProjects,
      publishedPosts,
      activeFormations,
      publishedTestimonials,
    },
    recentMessages,
  });
}
