import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = generateSlug(body.title);

  const existing = await prisma.project.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: finalSlug,
      category: body.category,
      client: body.client || null,
      year: body.year || null,
      description: body.description,
      content: body.content || '',
      techStack: body.techStack ? JSON.stringify(body.techStack) : '[]',
      imageUrl: body.imageUrl,
      liveUrl: body.liveUrl || null,
      published: body.published ?? false,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
