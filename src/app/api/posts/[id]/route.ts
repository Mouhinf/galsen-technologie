import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data: any = {};
  if (body.title !== undefined) {
    data.title = body.title;
    // Re-generate slug if title changed
    data.slug = body.slug || body.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.excerpt !== undefined) data.excerpt = body.excerpt;
  if (body.content !== undefined) data.content = body.content;
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.category !== undefined) data.category = body.category;
  if (body.tags !== undefined) data.tags = JSON.stringify(body.tags);
  if (body.author !== undefined) data.author = body.author;
  if (body.published !== undefined) data.published = body.published;

  const post = await prisma.post.update({ where: { id: params.id }, data });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
