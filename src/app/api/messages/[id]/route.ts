import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { corsResponse } from '@/lib/cors';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = req.headers.get('origin');
  try {
    const body = await req.json();
    const message = await prisma.message.update({
      where: { id: params.id },
      data: { status: body.status },
    });
    return corsResponse(message, 200, origin);
  } catch {
    return corsResponse({ error: 'Message not found' }, 404, origin);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = req.headers.get('origin');
  try {
    await prisma.message.delete({ where: { id: params.id } });
    return corsResponse({ success: true }, 200, origin);
  } catch {
    return corsResponse({ error: 'Message not found' }, 404, origin);
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return corsResponse({}, 204, origin);
}
