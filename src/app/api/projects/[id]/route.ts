import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { projectUpdateSchema, formatZodErrors } from '@/lib/validation';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const data: any = {};
  if (parsed.data.title !== undefined) {
    data.title = parsed.data.title;
    data.slug = parsed.data.slug || generateSlug(parsed.data.title);
    const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (existing && existing.id !== params.id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }
  if (parsed.data.slug !== undefined) data.slug = parsed.data.slug;
  if (parsed.data.category !== undefined) data.category = parsed.data.category;
  if (parsed.data.client !== undefined) data.client = parsed.data.client;
  if (parsed.data.year !== undefined) data.year = parsed.data.year;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if (parsed.data.content !== undefined) data.content = parsed.data.content;
  if (parsed.data.techStack !== undefined) data.techStack = JSON.stringify(parsed.data.techStack);
  if (parsed.data.imageUrl !== undefined) data.imageUrl = parsed.data.imageUrl;
  if (parsed.data.liveUrl !== undefined) data.liveUrl = parsed.data.liveUrl;
  if (parsed.data.published !== undefined) data.published = parsed.data.published;

  const project = await prisma.project.update({ where: { id: params.id }, data });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
