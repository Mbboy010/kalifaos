import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. SYSTEM BYPASS
  // Includes assets, internal Next.js paths, and API routes
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
    // On localhost, we assume the first part is the subdomain (e.g., admin.localhost)
    if (parts.length > 1) {
       subdomain = parts[0];
    }
  }

  // 3. CLEANUP: Redirect Legacy Subdomains to Naked Domain
  const isLegacySubdomain = ['app', 'auth'].includes(subdomain);
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isLegacySubdomain || isVercelDomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://${baseDomain}`),
      301
    );
  }

  // 4. ADMIN ROUTE REDIRECT (kalifaos.site/admin -> admin.kalifaos.site)
  if (pathname.startsWith('/admin') && subdomain !== 'admin') {
    const newPath = pathname.replace(/^\/admin/, '') || '/';
    return NextResponse.redirect(new URL(newPath + url.search, `${protocol}://admin.${baseDomain}`));
  }

  // 5. ADMIN SUBDOMAIN INTERNAL ROUTING
  if (subdomain === 'admin') {
    /**
     * CRITICAL FIX: Loop Protection.
     * When we rewrite to '/admin/users', the middleware runs again.
     * We must check if the path already starts with /admin to prevent 
     * rewriting it into /admin/admin/users.
     */
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    const path = pathname === '/' ? '' : pathname;
    const internalPath = `/admin${path}`;
    
    // Using a new URL object for the rewrite is more stable than modifying the clone
    return NextResponse.rewrite(new URL(internalPath, req.url));
  }

  // 6. DEFAULT (Naked Domain / Main Site)
  return NextResponse.next();
}

export const config = {
  // Ensure this matcher covers all routes except for the ones listed
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
