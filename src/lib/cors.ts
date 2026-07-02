import { NextResponse } from 'next/server';

const allowedOrigins = [
  'https://galsen-technologie.vercel.app',
  'https://galsen.lingueredigital.com',
  'http://localhost:3000',
];

export function corsHeaders(origin?: string | null) {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : 'https://galsen.lingueredigital.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function corsResponse(data: any, status = 200, origin?: string | null) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(origin),
  });
}
