"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    var isProduction = process.env.NODE_ENV === 'production';
    var baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
    var protocol = isProduction ? 'https' : 'http';
    // ==========================================
    // 1. FORCED REDIRECTS (Naked Domain -> app.)
    // ==========================================
    // If user hits kalifaos.vercel.app OR kalifaos.site directly
    if (hostname === 'kalifaos.vercel.app' || hostname === 'kalifaos.site') {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // ==========================================
    // 2. SUBDOMAIN EXTRACTION
    // ==========================================
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    // Logic to pull subdomain from the host string
    if (cleanHostname.endsWith(".".concat(baseDomain.split(':')[0]))) {
        subdomain = cleanHostname.replace(".".concat(baseDomain.split(':')[0]), '');
    }
    // ==========================================
    // 3. ROUTE VALIDATION & FALLBACK
    // ==========================================
    // If it's not a known dashboard/auth area, default it to 'app'
    var validSubdomains = ['admin', 'auth', 'app'];
    if (!validSubdomains.includes(subdomain)) {
        subdomain = 'app';
    }
    // ==========================================
    // 4. PATH-BASED SUBDOMAIN CORRECTION
    // ==========================================
    // If someone is on app.kalifaos.site but types /admin in the URL
    var pathPrefix = pathname.split('/')[1];
    if (validSubdomains.includes(pathPrefix) && subdomain !== pathPrefix) {
        return server_1.NextResponse.redirect(new URL(pathname.replace("/".concat(pathPrefix), '') + url.search, "".concat(protocol, "://").concat(pathPrefix, ".").concat(baseDomain)));
    }
    // ==========================================
    // 5. INTERNAL REWRITE
    // ==========================================
    // This maps the hostname to your /app/app/ folder, /app/admin/ folder, etc.
    url.pathname = "/".concat(subdomain).concat(pathname);
    return server_1.NextResponse.rewrite(url);
}
exports.middleware = middleware;
exports.config = {
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
