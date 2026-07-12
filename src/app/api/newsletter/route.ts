import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { corsResponse } from '@/lib/cors';
import { newsletterSchema, formatZodErrors } from '@/lib/validation';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const origin = req.headers.get('origin');

  const { allowed, response: rateResponse } = checkRateLimit(`newsletter:${ip}`, 3, 60_000);
  if (!allowed) return rateResponse!;

  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return corsResponse({ error: formatZodErrors(parsed.error) }, 400, origin);
    }

    const { email } = parsed.data;

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return corsResponse({ message: 'Vous êtes déjà abonné.' }, 200, origin);
    }

    await prisma.subscriber.create({
      data: { email },
    });

    // Send welcome email (fire-and-forget — ne bloque pas la réponse)
    sendWelcomeEmail(email).catch((err) =>
      console.error('[newsletter] Erreur email bienvenue:', err)
    );

    return corsResponse({ success: true }, 201, origin);
  } catch (error) {
    console.error('Newsletter error:', error);
    return corsResponse({ error: 'Erreur interne.' }, 500, origin);
  }
}
