import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const service = await prisma.service.create({
    data: {
      title: body.title,
      description: body.description,
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
