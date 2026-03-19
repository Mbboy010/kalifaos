import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. Redirect .vercel.app to the main .site domain
  if (hostname.includes('.vercel.app')) {
    const targetUrl = new URL(pathname + url.search, 'https://kalifaos.site');
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

  // 3. Normalized Fallback
  // If no subdomain (naked domain), we treat it as 'app'
  if (!subdomain || (subdomain !== 'admin' && subdomain !== 'auth' && subdomain !== 'app')) {
    subdomain = 'app';
  }

  // 4. Prevent Path Leaking & Force Subdomain Branding
  // If someone visits kalifaos.site/admin, redirect to admin.kalifaos.site/
  const pathPrefix = pathname.split('/')[1]; // Gets the first part of the path
  const validSubdomains = ['admin', 'auth', 'app'];

  if (validSubdomains.includes(pathPrefix)) {
    // If the path starts with a subdomain name but we aren't on that subdomain
    if (subdomain !== pathPrefix) {
        const newProtocol = isProduction ? 'https' : 'http';
        const targetUrl = new URL(
            pathname.replace(`/${pathPrefix}`, '') + url.search, 
            `${newProtocol}://${pathPrefix}.${baseDomain}`
        );
        return NextResponse.redirect(targetUrl);
    }
  }

  // 5. Internal Rewrite
  // This maps the subdomain to the actual folder inside /app
  // E.g., admin.kalifaos.site/settings -> /admin/settings
  url.pathname = `/${subdomain}${pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
