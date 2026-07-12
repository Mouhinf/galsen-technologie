import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { projectSchema, formatZodErrors } from '@/lib/validation';

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug || generateSlug(data.title);
  const existing = await prisma.project.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug: finalSlug,
      category: data.category,
      client: data.client || null,
      year: data.year || null,
      description: data.description,
      content: data.content,
      techStack: JSON.stringify(data.techStack || []),
      imageUrl: data.imageUrl,
      liveUrl: data.liveUrl || null,
      published: data.published,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
