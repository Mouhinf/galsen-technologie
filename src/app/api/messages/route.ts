import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { corsResponse, corsHeaders } from '@/lib/cors';
import { serverSanitizeHtml } from '@/lib/server-sanitize';
import { messageSchema, formatZodErrors } from '@/lib/validation';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const origin = req.headers.get('origin');

  const { allowed, response } = checkRateLimit(`message:${ip}`, 5, 60_000);
  if (!allowed) return response!;

  const body = await req.json();

  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse({ error: formatZodErrors(parsed.error) }, 400, origin);
  }

  const data = parsed.data;

  const messageContent = data.message || data.content || '';

  const message = await prisma.message.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      subject: data.subject,
      content: serverSanitizeHtml(messageContent),
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
