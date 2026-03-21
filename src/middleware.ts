import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. FIREBASE BYPASS (The Fix)
  // Completely ignore Firebase internal routes so they don't trigger 404s
  if (pathname.startsWith('/__/')) {
    return NextResponse.next();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 2. Identify Auth Routes
  const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // 3. Extract Subdomain
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

  // 4. Handle Naked Domain / Vercel Domain
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isNakedDomain || isVercelDomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 5. AUTH ROUTING LOGIC
  if (isAuthRoute) {
    if (subdomain !== 'auth') {
      return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://auth.${baseDomain}`));
    }
    return NextResponse.next();
  }

  if (subdomain === 'auth') {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', `${protocol}://auth.${baseDomain}`));
    }
    return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://app.${baseDomain}`));
  }

  // 6. ADMIN SUBDOMAIN REWRITE
  if (subdomain === 'admin') {
    url.pathname = `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 7. UPDATED MATCHER
// Added __ to the ignored patterns just to be extra safe at the edge level
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
