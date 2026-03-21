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
    // 1. Identify Auth Routes
    var AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
    var isAuthRoute = AUTH_ROUTES.some(function (route) { return pathname.startsWith(route); });
    // 2. Extract Subdomain
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    if (isProduction) {
        if (cleanHostname.endsWith('.kalifaos.site')) {
            subdomain = cleanHostname.replace('.kalifaos.site', '');
        }
    }
    else {
        // For local: auth.localhost:3000 -> subdomain = auth
        var parts = cleanHostname.split('.');
        if (parts.length > 1)
            subdomain = parts[0];
    }
    // 3. Handle Naked Domain / Vercel Domain (Redirect to app.kalifaos.site)
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    var isVercelDomain = hostname.includes('.vercel.app');
    if (isNakedDomain || isVercelDomain) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 4. AUTH SUBDOMAIN ENFORCEMENT
    // If user is on an auth path but NOT on the auth subdomain -> Redirect to auth.
    if (isAuthRoute && subdomain !== 'auth') {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://auth.").concat(baseDomain)), 307);
    }
    // If user is on the auth subdomain but NOT on an auth path -> Redirect back to app.
    // Exception: if they hit auth.kalifaos.site/ directly, send them to /login.
    if (subdomain === 'auth') {
        if (pathname === '/') {
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://auth.").concat(baseDomain)));
        }
        if (!isAuthRoute) {
            return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)));
        }
        // INTERNAL REWRITE: Maps auth.kalifaos.site/login to src/app/auth/login/page.tsx
        // The browser URL stays "auth.kalifaos.site/login"
        url.pathname = "/auth".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    // 5. ADMIN SUBDOMAIN REWRITE
    if (subdomain === 'admin') {
        url.pathname = "/admin".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    // Default for 'app' subdomain or others: No rewrite needed if they are at the root
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
