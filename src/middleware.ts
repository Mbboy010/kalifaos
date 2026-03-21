import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

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

  // 4. Handle Naked Domain / Vercel Domain / Old Auth Subdomain
  // We now treat 'auth' as an old domain and redirect it to 'app'
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  const isOldAuthSubdomain = subdomain === 'auth';
  
  if (isNakedDomain || hostname.includes('.vercel.app') || isOldAuthSubdomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 5. REDIRECT TO ADMIN SUBDOMAIN
  // If they hit /admin on the app subdomain, move them to the admin subdomain
  if (isAdminRoute && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  // 6. ADMIN SUBDOMAIN INTERNAL LOGIC
  if (subdomain === 'admin') {
    // SECURITY: Ensure the operator is logged in
    const hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');

    if (!hasSession) {
      // Since auth is now on 'app', redirect here if not logged in
      return NextResponse.redirect(new URL('/login', `${protocol}://app.${baseDomain}`));
    }

    // Map internal folder: src/app/admin/page.tsx
    const path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
    url.pathname = `/admin${path === '/' ? '' : path}`;
    return NextResponse.rewrite(url);
  }

  // 7. DEFAULT (app.kalifaos.site)
  // Auth routes (/login, /register) will now load directly on the app subdomain
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
