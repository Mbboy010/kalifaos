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
    const parts = cleanHostname.split('.');
    if (parts.length > 1) subdomain = parts[0];
  }

  // 3. Handle Naked Domain / Vercel Domain (Redirect to app.kalifaos.site)
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  if (isNakedDomain || hostname.includes('.vercel.app')) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 4. THE FIX: Subdomain Isolation
  
  // A. If user hits an auth route on 'app' or any other subdomain -> Return 404
  if (isAuthRoute && subdomain !== 'auth') {
    url.pathname = '/404'; 
    return NextResponse.rewrite(url);
  }

  // B. Handle Logic for the 'auth' subdomain
  if (subdomain === 'auth') {
    // If they hit auth.kalifaos.site/ directly, send to login
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // If they try to hit a non-auth page (like /dashboard) on the auth subdomain -> Return 404
    if (!isAuthRoute) {
      url.pathname = '/404';
      return NextResponse.rewrite(url);
    }

    // Internal Rewrite: auth.kalifaos.site/login -> src/app/auth/login/page.tsx
    url.pathname = `/auth${pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. Admin Subdomain Rewrite
  if (subdomain === 'admin') {
    url.pathname = `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default: Normal 'app' behavior
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
