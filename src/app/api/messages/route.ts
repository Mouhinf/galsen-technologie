import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = await prisma.message.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      service: body.service || 'Général',
      subject: body.subject || 'Nouveau message',
      content: body.message || body.content || '',
      status: 'UNREAD',
    },
  });
  return NextResponse.json({ success: true, id: message.id }, { status: 201 });
}

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(messages);
}
