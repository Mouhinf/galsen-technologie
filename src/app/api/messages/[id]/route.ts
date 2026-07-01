import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _req.json();
    const message = await prisma.message.update({
      where: { id: params.id },
      data: { status: body.status },
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.message.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
}
