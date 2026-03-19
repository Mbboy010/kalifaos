import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get the hostname from the headers (e.g., 'admin.kalifaos.site', 'kalifaos.vercel.app', 'localhost:3000')
  const hostname = req.headers.get('host') || '';

  // ==========================================
  // 1. REDIRECT: .vercel.app -> .site
  // ==========================================
  if (hostname.includes('.vercel.app')) {
    // Force redirect any Vercel URL to your primary custom domain
    const targetUrl = new URL(url.pathname + url.search, 'https://kalifaos.site');
    return NextResponse.redirect(targetUrl, 301); // 301 Permanent Redirect is best for SEO
  }

  // ==========================================
  // 2. REWRITE: Subdomain Routing
  // ==========================================
  
  // Clean the hostname (remove port numbers for local testing)
  const cleanHostname = hostname.replace(/:\d+$/, '');
  
  // Define your base domain depending on the environment
  const isProduction = process.env.NODE_ENV === 'production';
  const baseDomain = isProduction ? 'kalifaos.site' : 'localhost';

  // Extract the subdomain (if any)
  let subdomain = '';
  if (cleanHostname.endsWith(`.${baseDomain}`)) {
    subdomain = cleanHostname.replace(`.${baseDomain}`, '');
  }

  // Check if it's one of your target subdomains
  const validSubdomains = ['admin', 'app', 'auth'];

  if (validSubdomains.includes(subdomain)) {
    // Rewrite the URL internally to point to a specific folder
    // E.g., admin.kalifaos.site/dashboard -> kalifaos.site/admin/dashboard
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // If it's the main domain (or an unknown subdomain), proceed as normal
  return NextResponse.next();
}

// ==========================================
// 3. CONFIGURATION
// ==========================================
export const config = {
  // Only run middleware on actual pages, skip static files, images, and API routes to save execution time
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
