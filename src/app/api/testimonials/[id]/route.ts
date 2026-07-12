import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { testimonialUpdateSchema, formatZodErrors } from '@/lib/validation';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const parsed = testimonialUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
    }

    // Only include fields that were actually provided
    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value !== undefined) {
        data[key] = value;
      }
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data,
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
