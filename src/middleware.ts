import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
  const protocol = isProduction ? 'https' : 'http';

  // 1. Redirect naked domain (kalifaos.site) to app.kalifaos.site
  if (hostname === 'kalifaos.vercel.app' || hostname === 'kalifaos.site') {
    return NextResponse.redirect(
      new URL(pathname + url.search, `${protocol}://app.${baseDomain}`),
      301
    );
  }

  // 2. Extract Subdomain
  const cleanHostname = hostname.replace(/:\d+$/, '');
  let subdomain = '';
  
  if (isProduction) {
    if (cleanHostname.endsWith('.kalifaos.site')) {
      subdomain = cleanHostname.replace('.kalifaos.site', '');
    }
  } else {
    if (cleanHostname.endsWith('.localhost')) {
      subdomain = cleanHostname.replace('.localhost', '');
    }
  }

  // 3. Set 'app' as the default subdomain
  const validSubdomains = ['admin', 'auth', 'app'];
  if (!subdomain || !validSubdomains.includes(subdomain)) {
    subdomain = 'app';
  }

  // 4. Path-based Correction (e.g., app.kalifaos.site/admin -> admin.kalifaos.site)
  const pathPrefix = pathname.split('/')[1]; 
  if (validSubdomains.includes(pathPrefix) && subdomain !== pathPrefix) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${pathPrefix}`, '') + url.search, `${protocol}://${pathPrefix}.${baseDomain}`)
    );
  }

  // 5. INTERNAL REWRITE (The Fix)
  // Since your files are at the root of /src/app, we DON'T prefix 'app'
  if (subdomain === 'admin' || subdomain === 'auth') {
    url.pathname = `/${subdomain}${pathname}`;
  } else {
    // This keeps the path as /about instead of /app/about
    url.pathname = pathname;
  }
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
