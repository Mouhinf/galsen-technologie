import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { testimonialSchema, formatZodErrors } from '@/lib/validation';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  const testimonial = await prisma.testimonial.create({
    data: {
      name: data.name,
      role: data.role,
      company: data.company,
      content: data.content,
      rating: data.rating,
      imageUrl: data.imageUrl || null,
      published: data.published,
    },
  });
  return NextResponse.json(testimonial, { status: 201 });
}
