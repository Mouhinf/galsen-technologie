import { NextResponse } from 'next/server';

const rateMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 60_000
): { allowed: boolean; response?: NextResponse } {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Trop de requêtes. Réessayez plus tard.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
          },
        }
      ),
    };
  }

  entry.count++;
  return { allowed: true };
}
