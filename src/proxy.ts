import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

const PUBLIC_ADMIN = ['/admin/login'];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const isPublic = PUBLIC_ADMIN.some(p => pathname === p);
  if (isPublic) return NextResponse.next();

  const token = req.cookies.get('admin_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
