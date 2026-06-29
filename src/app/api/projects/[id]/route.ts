import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data: any = {};
  if (body.title !== undefined) {
    data.title = body.title;
    data.slug = generateSlug(body.title);
    const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (existing && existing.id !== params.id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.category !== undefined) data.category = body.category;
  if (body.client !== undefined) data.client = body.client;
  if (body.year !== undefined) data.year = body.year;
  if (body.description !== undefined) data.description = body.description;
  if (body.content !== undefined) data.content = body.content;
  if (body.techStack !== undefined) data.techStack = JSON.stringify(body.techStack);
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.liveUrl !== undefined) data.liveUrl = body.liveUrl;
  if (body.published !== undefined) data.published = body.published;

  const project = await prisma.project.update({ where: { id: params.id }, data });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
