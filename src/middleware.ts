import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // ==========================================
  // 1. FORCED REDIRECTS (Naked Domain -> app.)
  // ==========================================
  // If user hits kalifaos.vercel.app OR kalifaos.site directly
  if (hostname === 'kalifaos.vercel.app' || hostname === 'kalifaos.site') {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // ==========================================
  // 2. SUBDOMAIN EXTRACTION
  // ==========================================
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  // Logic to pull subdomain from the host string
  if (cleanHostname.endsWith(`.${baseDomain.split(':')[0]}`)) {
    subdomain = cleanHostname.replace(`.${baseDomain.split(':')[0]}`, '');
  }

  // ==========================================
  // 3. ROUTE VALIDATION & FALLBACK
  // ==========================================
  // If it's not a known dashboard/auth area, default it to 'app'
  const validSubdomains = ['admin', 'auth', 'app'];
  if (!validSubdomains.includes(subdomain)) {
    subdomain = 'app';
  }

  // ==========================================
  // 4. PATH-BASED SUBDOMAIN CORRECTION
  // ==========================================
  // If someone is on app.kalifaos.site but types /admin in the URL
  const pathPrefix = pathname.split('/')[1]; 

  if (validSubdomains.includes(pathPrefix) && subdomain !== pathPrefix) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${pathPrefix}`, '') + url.search, `${protocol}://${pathPrefix}.${baseDomain}`)
    );
  }

  // ==========================================
  // 5. INTERNAL REWRITE
  // ==========================================
  // This maps the hostname to your /app/app/ folder, /app/admin/ folder, etc.
  url.pathname = `/${subdomain}${pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public files with extensions (e.g. .png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
