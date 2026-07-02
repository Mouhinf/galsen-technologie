import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    const url = new URL('/admin/login', req.url);
    return Response.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
