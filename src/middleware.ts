import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './utils/jwt-utils';
import { Role } from '@prisma/client';

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

export async function middleware(req: NextRequest) {
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message);
  });

  console.log('VERIFIED', verifiedToken);

  if (verifiedToken) {
    if (req.nextUrl.pathname === '/register') {
      if (verifiedToken.data.role === Role.USER) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    if (req.nextUrl.pathname === '/login') {
      if (verifiedToken.data.role === Role.USER) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (verifiedToken.data.role === Role.USER) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  if (req.nextUrl.pathname !== '/register') {
    if (!verifiedToken && req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // if (req.nextUrl.pathname !== '/register') {
  // return NextResponse.redirect(new URL('/register', req.url));
  // }
  // if (req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next();
}
