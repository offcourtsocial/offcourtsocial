import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const pathname = req.nextUrl.pathname;

  if (host.startsWith('aanmelden.') && pathname === '/') {
    return NextResponse.rewrite(new URL('/aanmelden', req.url));
  }
}

export const config = {
  matcher: '/',
};
