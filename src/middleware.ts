import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. SYSTEM BYPASS (Assets, Internal Next.js paths, etc.)
  if (
    pathname.startsWith('/__/') || 
    pathname.includes('.') || 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 2. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, ''); // Remove port for localhost
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith(`.kalifaos.site`)) {
      subdomain = cleanHostname.replace(`.kalifaos.site`, '');
    }
  } else {
    // FIX: Properly detect subdomains on localhost (e.g., admin.localhost)
    const parts = cleanHostname.split('.');
    if (parts.length > 1) {
       subdomain = parts[0];
    }
  }

  // 3. CLEANUP: Redirect Legacy Subdomains to Naked Domain
  const isLegacySubdomain = ['app', 'auth'].includes(subdomain);
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isLegacySubdomain || isVercelDomain) {
    const destination = new URL(pathname + url.search, `${protocol}://${baseDomain}`);
    return NextResponse.redirect(destination, 301);
  }

  // 4. ADMIN ROUTE REDIRECT (kalifaos.site/admin -> admin.kalifaos.site)
  // If the user tries to access /admin on the main domain, send them to the subdomain
  if (pathname.startsWith('/admin') && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  // 5. ADMIN SUBDOMAIN INTERNAL ROUTING
  if (subdomain === 'admin') {
    // CRITICAL FIX: If the internal path already starts with /admin (from a previous rewrite), 
    // do not rewrite it again to avoid /admin/admin/... loops.
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    const path = pathname === '/' ? '' : pathname;
    url.pathname = `/admin${path}`;
    return NextResponse.rewrite(url);
  }

  // 6. DEFAULT (Naked Domain)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
