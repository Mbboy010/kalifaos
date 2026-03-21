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
        var parts = cleanHostname.split('.');
        if (parts.length > 1)
            subdomain = parts[0];
    }
    // 3. Handle Naked Domain / Vercel Domain (Redirect to app.kalifaos.site)
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    if (isNakedDomain || hostname.includes('.vercel.app')) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 4. THE FIX: Subdomain Isolation
    // A. If user hits an auth route on 'app' or any other subdomain -> Return 404
    if (isAuthRoute && subdomain !== 'auth') {
        url.pathname = '/404';
        return server_1.NextResponse.rewrite(url);
    }
    // B. Handle Logic for the 'auth' subdomain
    if (subdomain === 'auth') {
        // If they hit auth.kalifaos.site/ directly, send to login
        if (pathname === '/') {
            return server_1.NextResponse.redirect(new URL('/login', req.url));
        }
        // If they try to hit a non-auth page (like /dashboard) on the auth subdomain -> Return 404
        if (!isAuthRoute) {
            url.pathname = '/404';
            return server_1.NextResponse.rewrite(url);
        }
        // Internal Rewrite: auth.kalifaos.site/login -> src/app/auth/login/page.tsx
        url.pathname = "/auth".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    // 5. Admin Subdomain Rewrite
    if (subdomain === 'admin') {
        url.pathname = "/admin".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    // Default: Normal 'app' behavior
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
