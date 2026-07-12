import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { settingsSchema, formatZodErrors } from '@/lib/validation';

export async function GET() {
  const settings = await prisma.setting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
  }

  const entries = Object.entries(parsed.data);

  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value, group: key.startsWith('seo_') ? 'seo' : key.startsWith('email_') ? 'emails' : 'general' },
    });
  }

  const settings = await prisma.setting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return NextResponse.json(map);
}
