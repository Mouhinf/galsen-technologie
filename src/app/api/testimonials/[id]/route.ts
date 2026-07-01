import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _req.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.testimonial.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }
}
