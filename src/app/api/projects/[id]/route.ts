import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.client !== undefined && { client: body.client }),
      ...(body.year !== undefined && { year: body.year }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.techStack !== undefined && { techStack: JSON.stringify(body.techStack) }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.liveUrl !== undefined && { liveUrl: body.liveUrl }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
