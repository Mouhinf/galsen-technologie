import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { serviceUpdateSchema, formatZodErrors } from '@/lib/validation';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  const parsed = serviceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const data: any = {};
  if (parsed.data.title !== undefined) {
    data.title = parsed.data.title;
    data.slug = parsed.data.slug || generateSlug(parsed.data.title);
    // Ensure unique slug
    const existing = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (existing && existing.id !== params.id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }
  if (parsed.data.slug !== undefined) data.slug = parsed.data.slug;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if (parsed.data.content !== undefined) data.content = parsed.data.content;
  if (parsed.data.icon !== undefined) data.icon = parsed.data.icon;
  if (parsed.data.color !== undefined) data.color = parsed.data.color;
  if (parsed.data.features !== undefined) data.features = JSON.stringify(parsed.data.features);
  if (parsed.data.imageUrl !== undefined) data.imageUrl = parsed.data.imageUrl;
  if (parsed.data.active !== undefined) data.active = parsed.data.active;
  if (parsed.data.order !== undefined) data.order = parsed.data.order;

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
