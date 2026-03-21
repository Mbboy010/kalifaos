import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. SYSTEM BYPASS
  if (pathname.startsWith('/__/') || pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 2. Identify Route Types
  const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/admin');

  // 3. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    const parts = cleanHostname.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost') subdomain = parts[0];
  }

  // 4. Handle Naked Domain / Vercel Domain
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  if (isNakedDomain || hostname.includes('.vercel.app')) {
    return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://app.${baseDomain}`), 301);
  }

  // 5. REDIRECT TO ADMIN SUBDOMAIN (The Fix for app.kalifaos.site/admin)
  // If they hit /admin on ANY domain that isn't the admin subdomain, redirect them.
  if (isAdminRoute && subdomain !== 'admin') {
    // Strip '/admin' from the URL so they go to admin.kalifaos.site/ instead of admin.kalifaos.site/admin
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  // 6. ADMIN SUBDOMAIN LOGIC
  if (subdomain === 'admin') {
    // Check for the cross-domain cookie
    //const hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');

    // If no token, bounce to login
    //if (!hasSession && pathname !== '/login') {
   //   return NextResponse.redirect(new URL('/login', `${protocol}://auth.${baseDomain}`));
  //  }

    // Rewrite mapped correctly
    const path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
    url.pathname = `/admin${path === '/' ? '' : path}`;
    return NextResponse.rewrite(url);
  }

  // 7. AUTH SUBDOMAIN LOGIC
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
}; 
