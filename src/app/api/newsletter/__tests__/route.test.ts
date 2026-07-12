/**
 * @jest-environment node
 */

import { POST } from '../route';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendWelcomeEmail } from '@/lib/email';

// Mock Prisma with simple jest.fn() wrappers to avoid complex typing issues
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    subscriber: {
      findUnique: (...args: any[]) => mockFindUnique(...args),
      create: (...args: any[]) => mockCreate(...args),
    },
  },
}));

// Mock rate limiter
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn(),
}));

// Mock email module (fire-and-forget, pas besoin de l'exécuter en test)
jest.mock('@/lib/email', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
}));

// Mock corsResponse to return simple Response
jest.mock('@/lib/cors', () => ({
  corsResponse: (data: any, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'content-type': 'application/json' },
    }),
}));

const mockedCheckRateLimit = checkRateLimit as jest.Mock;

function createRequest(body?: any, ip = '127.0.0.1') {
  return new Request('http://localhost:3000/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
      origin: 'http://localhost:3000',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }) as any;
}

async function readResponse(res: Response) {
  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    return { status: res.status, data: text };
  }
}

beforeEach(() => {
  jest.clearAllMocks();
  mockedCheckRateLimit.mockReturnValue({ allowed: true });
});

describe('POST /api/newsletter', () => {
  it('returns 201 for a valid subscription', async () => {
    mockFindUnique.mockResolvedValue(null);
    mockCreate.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      active: true,
      createdAt: new Date(),
    });

    const req = createRequest({ email: 'test@example.com' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(201);
    expect(data).toEqual({ success: true });
    expect(mockCreate).toHaveBeenCalledWith({
      data: { email: 'test@example.com' },
    });
    expect(sendWelcomeEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('returns 200 if email is already subscribed', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'existing@example.com',
      active: true,
      createdAt: new Date(),
    });

    const req = createRequest({ email: 'existing@example.com' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(200);
    expect(data).toEqual({ message: 'Vous êtes déjà abonné.' });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns 400 for an invalid email', async () => {
    const req = createRequest({ email: 'not-an-email' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns 400 for an empty email', async () => {
    const req = createRequest({ email: '   ' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('returns 400 when email is missing', async () => {
    const req = createRequest({});
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('returns 429 when rate limited', async () => {
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      response: new Response(
        JSON.stringify({ error: 'Trop de requêtes. Réessayez plus tard.' }),
        { status: 429, headers: { 'Retry-After': '30' } }
      ),
    });

    const req = createRequest({ email: 'test@example.com' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(429);
    expect(data).toEqual({ error: 'Trop de requêtes. Réessayez plus tard.' });
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it('trims and lowercases the email', async () => {
    mockFindUnique.mockResolvedValue(null);
    mockCreate.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      active: true,
      createdAt: new Date(),
    });

    const req = createRequest({ email: '  Test@Example.COM  ' });
    const res = await POST(req);
    await readResponse(res);

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(mockCreate).toHaveBeenCalledWith({
      data: { email: 'test@example.com' },
    });
  });

  it('returns 500 when Prisma throws an error', async () => {
    mockFindUnique.mockRejectedValue(new Error('DB connection error'));

    const req = createRequest({ email: 'test@example.com' });
    const res = await POST(req);
    const { status, data } = await readResponse(res);

    expect(status).toBe(500);
    expect(data).toEqual({ error: 'Erreur interne.' });
  });
});
