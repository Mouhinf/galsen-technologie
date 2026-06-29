import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = generateSlug(body.title);

  // Check for unique slug
  const existing = await prisma.service.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const service = await prisma.service.create({
    data: {
      title: body.title,
      slug: finalSlug,
      description: body.description,
      content: body.content || '',
      icon: body.icon || 'Code2',
      color: body.color || '#22C55E',
      features: body.features ? JSON.stringify(body.features) : '[]',
      imageUrl: body.imageUrl || null,
      active: body.active ?? true,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(service, { status: 201 });
}
