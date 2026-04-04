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
    if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
       subdomain = parts[0];
    }
  }

  // 3. CLEANUP: Redirect Legacy Subdomains & Vercel Domains
  const isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
  const isVercelDomain = hostname.includes('.vercel.app');

  // If hitting app.kalifaos.site, auth.kalifaos.site, or your-project.vercel.app
  if (isLegacySubdomain || isVercelDomain) {
    // Special check: If they are trying to reach /admin on a Vercel domain, 
    // we should ideally send them to the admin subdomain directly.
    if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(
            new URL(pathname.replace(/^\/admin/, '') || '/', `${protocol}://admin.${baseDomain}`),
            301
        );
    }

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
      return NextResponse.redirect(new URL('/login', `${protocol}://${baseDomain}`));
    }

    const path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
    url.pathname = `/admin${path === '/' ? '' : path}`;
    return NextResponse.rewrite(url);
  }

  // 5. DEFAULT
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
