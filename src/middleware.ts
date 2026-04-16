import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. SYSTEM BYPASS
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
  const cleanHostname = hostname.replace(/:\d+$/, ''); 
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    const parts = cleanHostname.split('.');
    if (parts.length > 1) {
       subdomain = parts[0];
    }
  }

  // 3. CLEANUP: Redirect Legacy Subdomains
  const isLegacySubdomain = ['app', 'auth'].includes(subdomain);
  if (isLegacySubdomain || hostname.includes('.vercel.app')) {
    return NextResponse.redirect(new URL(pathname + url.search, `${protocol}://${baseDomain}`), 301);
  }

  // 4. ADMIN ROUTE REDIRECT (main.site/admin -> admin.main.site)
  if (pathname.startsWith('/admin') && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  // 5. ADMIN SUBDOMAIN INTERNAL ROUTING
  if (subdomain === 'admin') {
    // Prevent recursive loop: If the path is already internal, stop here.
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    /**
     * This handles the Home Page (https://admin.kalifaos.site/) 
     * and all sub-pages (e.g., /users, /settings).
     * It maps them internally to src/app/admin/[[...path]]
     */
    const internalPath = `/admin${pathname}`;
    return NextResponse.rewrite(new URL(internalPath, req.url));
  }

  // 6. DEFAULT (Main Site Home & Pages)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
