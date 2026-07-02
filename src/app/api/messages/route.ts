import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { corsResponse, corsHeaders } from '@/lib/cors';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const origin = req.headers.get('origin');

  const { allowed, response } = checkRateLimit(`message:${ip}`, 5, 60_000);
  if (!allowed) return response!;

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
  return corsResponse({ success: true, id: message.id }, 201, origin);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  return corsResponse(messages, 200, origin);
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return corsResponse({}, 204, origin);
}
