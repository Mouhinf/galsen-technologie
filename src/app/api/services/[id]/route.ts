import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data: any = {};
  if (body.title !== undefined) {
    data.title = body.title;
    data.slug = generateSlug(body.title);
    // Ensure unique slug
    const existing = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (existing && existing.id !== params.id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.description !== undefined) data.description = body.description;
  if (body.content !== undefined) data.content = body.content;
  if (body.icon !== undefined) data.icon = body.icon;
  if (body.color !== undefined) data.color = body.color;
  if (body.features !== undefined) data.features = JSON.stringify(body.features);
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.active !== undefined) data.active = body.active;
  if (body.order !== undefined) data.order = body.order;

  const service = await prisma.service.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(service);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
