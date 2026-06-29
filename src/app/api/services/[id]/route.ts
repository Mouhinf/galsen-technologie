import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.icon !== undefined && { icon: body.icon }),
      ...(body.color !== undefined && { color: body.color }),
      ...(body.features !== undefined && { features: JSON.stringify(body.features) }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.active !== undefined && { active: body.active }),
      ...(body.order !== undefined && { order: body.order }),
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
