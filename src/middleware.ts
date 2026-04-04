import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. SYSTEM BYPASS ppass
  if (
    pathname.startsWith('/__/') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 2. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';

  if (isProduction) {
    if (cleanHostname === baseDomain) {
      subdomain = '';
    } else if (cleanHostname.endsWith(`.${baseDomain}`)) {
      subdomain = cleanHostname.replace(`.${baseDomain}`, '');
    }
  } else {
    const parts = cleanHostname.split('.');
    if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
      subdomain = parts[0];
    }
  }

  // 3. CLEANUP
  const isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isLegacySubdomain || isVercelDomain) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(
        new URL(
          pathname.replace(/^\/admin/, '') || '/',
          `${protocol}://admin.${baseDomain}`
        ),
        301
      );
    }

    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://${baseDomain}`),
      301
    );
  }

  // 4. ADMIN ROUTE HANDLING
  const isAdminRoute = pathname.startsWith('/admin');

  // Move /admin → admin subdomain
  if (isAdminRoute && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(
      new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`)
    );
  }

  // 5. ADMIN SUBDOMAIN LOGIC
  if (subdomain === 'admin') {
    // 🔐 Read cookie properly
    const sessionCookie = req.cookies.get('__session')?.value;
    const adminToken = req.cookies.get('admin-token')?.value;

    const hasSession = !!sessionCookie || !!adminToken;

    // ❗ Redirect to ADMIN login (not main domain)
    if (!hasSession) {
      return NextResponse.redirect(
        new URL('/login', `${protocol}://admin.${baseDomain}`)
      );
    }

    // Rewrite to /admin internally
    const cleanPath = pathname === '/' ? '' : pathname;
    url.pathname = `/admin${cleanPath}`;
    return NextResponse.rewrite(url);
  }

  // 6. DEFAULT
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};