import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      role: body.role,
      company: body.company || '',
      content: body.content,
      rating: body.rating ?? 5,
      imageUrl: body.imageUrl || null,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(testimonial, { status: 201 });
}
