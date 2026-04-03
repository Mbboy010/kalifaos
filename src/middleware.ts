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

  // 2. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    const parts = cleanHostname.split('.');
    // For local testing: if you use app.localhost:3000, it captures 'app'
    if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
       subdomain = parts[0];
    }
  }

  // 3. LEGACY REDIRECTS (Remove 'app' and 'auth' subdomains)
  // If someone visits app.kalifaos.site or auth.kalifaos.site, send them to kalifaos.site
  const isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
  
  if (isLegacySubdomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://${baseDomain}`),
      301
    );
  }

  // 4. ADMIN SUBDOMAIN LOGIC
  const isAdminRoute = pathname.startsWith('/admin');

  // If they hit /admin on the main domain, move them to the admin subdomain
  if (isAdminRoute && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  if (subdomain === 'admin') {
    // SECURITY: Ensure the operator is logged in
    const hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');

    if (!hasSession) {
      // Redirect to login on the main naked domain
      return NextResponse.redirect(new URL('/login', `${protocol}://${baseDomain}`));
    }

    // Rewrite to internal admin folder
    const path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
    url.pathname = `/admin${path === '/' ? '' : path}`;
    return NextResponse.rewrite(url);
  }

  // 5. DEFAULT (Load everything on kalifaos.site)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
