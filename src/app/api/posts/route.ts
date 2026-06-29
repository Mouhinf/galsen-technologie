import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Generate slug from title
  const slug = body.slug || body.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      imageUrl: body.imageUrl,
      category: body.category,
      tags: body.tags ? JSON.stringify(body.tags) : '[]',
      author: body.author || 'Galsen Technologie',
      published: body.published ?? false,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
