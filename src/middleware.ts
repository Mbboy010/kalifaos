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
    pathname.startsWith('/_next')
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
    if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
       subdomain = parts[0];
    }
  }

  // 3. CLEANUP: Redirect Legacy Subdomains & Vercel Domains to Naked Domain
  const isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isLegacySubdomain || isVercelDomain) {
    // If they hit /admin on a legacy domain, send them to the admin subdomain root
    if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(
            new URL('/', `${protocol}://admin.${baseDomain}`),
            301
        );
    }

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
     * No more cookie/session checks here.
     * The AdminGuard.tsx component handles the Firestore 'admin' role check.
     * * This rewrites 'admin.kalifaos.site/os/login' 
     * to the internal folder 'app/admin/os/login'
     */
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
