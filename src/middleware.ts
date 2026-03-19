import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // 1. Redirect .vercel.app to the main .site domain
  if (hostname.includes('.vercel.app')) {
    const targetUrl = new URL(url.pathname + url.search, 'https://kalifaos.site');
    return NextResponse.redirect(targetUrl, 301);
  }

  const cleanHostname = hostname.replace(/:\d+$/, '');
  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost';

  // 2. Extract the subdomain
  let subdomain = '';
  if (cleanHostname.endsWith(`.${baseDomain}`)) {
    subdomain = cleanHostname.replace(`.${baseDomain}`, '');
  }

  // 3. FALLBACK LOGIC: 
  // If the subdomain is NOT 'admin' and NOT 'auth', default to 'app'
  // This handles the naked domain (kalifaos.site) and any other subdomain.
  if (subdomain !== 'admin' && subdomain !== 'auth') {
    subdomain = 'app';
  }

  // 4. Perform the internal rewrite
  // Example: kalifaos.site/home -> internally points to app/app/home/page.tsx
  // Example: admin.kalifaos.site/ -> internally points to app/admin/page.tsx
  url.pathname = `/${subdomain}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  // Ignore static files, images, and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
