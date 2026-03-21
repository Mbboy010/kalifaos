// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 1. Identify Auth Routes
  const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // 2. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    // For local: auth.localhost:3000 -> subdomain = auth
    const parts = cleanHostname.split('.');
    if (parts.length > 1) subdomain = parts[0];
  }

  // 3. Handle Naked Domain / Vercel Domain (Redirect to app.kalifaos.site)
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isNakedDomain || isVercelDomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 4. AUTH ROUTING LOGIC (The Fix)
  
  // If the user visits an auth route (/login, /register, etc.)
  if (isAuthRoute) {
    if (subdomain !== 'auth') {
      // Redirect them to the auth subdomain (e.g., app. -> auth.)
      return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://auth.${baseDomain}`));
    }
    // If they are already on the auth subdomain, let the page load directly!
    // This expects your files to be at src/app/login/page.tsx
    return NextResponse.next();
  }

  // If the user is on the auth subdomain but trying to access a non-auth page
  if (subdomain === 'auth') {
    if (pathname === '/') {
      // Send the root auth domain directly to login
      return NextResponse.redirect(new URL('/login', `${protocol}://auth.${baseDomain}`));
    }
    // Kick them back to the app domain for anything else
    return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://app.${baseDomain}`));
  }

  // 5. ADMIN SUBDOMAIN REWRITE
  if (subdomain === 'admin') {
    url.pathname = `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default: Normal 'app' routing
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
