import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { serviceSchema, formatZodErrors } from '@/lib/validation';

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug || generateSlug(data.title);

  // Check for unique slug
  const existing = await prisma.service.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const service = await prisma.service.create({
    data: {
      title: data.title,
      slug: finalSlug,
      description: data.description,
      content: data.content,
      icon: data.icon,
      color: data.color,
      features: JSON.stringify(data.features || []),
      imageUrl: data.imageUrl || null,
      active: data.active,
      order: data.order,
    },
  });
  return NextResponse.json(service, { status: 201 });
}
