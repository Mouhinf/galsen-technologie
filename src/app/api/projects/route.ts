import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = await prisma.project.create({
    data: {
      title: body.title,
      category: body.category,
      client: body.client || null,
      year: body.year || null,
      description: body.description,
      techStack: body.techStack ? JSON.stringify(body.techStack) : '[]',
      imageUrl: body.imageUrl,
      liveUrl: body.liveUrl || null,
      published: body.published ?? false,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
