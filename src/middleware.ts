// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 1. IMPROVED REDIRECT: Redirect naked/www/vercel domains to app subdomain
  const isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
  const isVercelDomain = hostname.includes('.vercel.app');

  if (isNakedDomain || isVercelDomain) {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 2. Determine Current Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    // For local testing (e.g., app.localhost:3000)
    if (cleanHostname.includes('.')) {
      subdomain = cleanHostname.split('.')[0];
    }
  }

  // 3. Fallback to 'app' if no valid subdomain is found
  const validSubdomains = ['admin', 'auth', 'app'];
  if (!subdomain || !validSubdomains.includes(subdomain)) {
    subdomain = 'app';
  }

  // 4. Internal Rewrite
  // This maps the subdomain to the root folder /src/app/
  if (subdomain === 'admin' || subdomain === 'auth') {
    url.pathname = `/${subdomain}${pathname}`;
  } else {
    url.pathname = pathname; // 'app' routes are at the root
  }
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
