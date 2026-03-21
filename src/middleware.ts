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

  // 4. AUTH SUBDOMAIN ENFORCEMENT
  
  // If user is on an auth path but NOT on the auth subdomain -> Redirect to auth.
  if (isAuthRoute && subdomain !== 'auth') {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://auth.${baseDomain}`),
      307
    );
  }

  // If user is on the auth subdomain but NOT on an auth path -> Redirect back to app.
  // Exception: if they hit auth.kalifaos.site/ directly, send them to /login.
  if (subdomain === 'auth') {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', `${protocol}://auth.${baseDomain}`));
    }
    
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://app.${baseDomain}`));
    }

    // INTERNAL REWRITE: Maps auth.kalifaos.site/login to src/app/auth/login/page.tsx
    // The browser URL stays "auth.kalifaos.site/login"
    url.pathname = `/auth${pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. ADMIN SUBDOMAIN REWRITE
  if (subdomain === 'admin') {
    url.pathname = `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default for 'app' subdomain or others: No rewrite needed if they are at the root
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
