"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
// src/middleware.ts
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
    // 4. AUTH ROUTING LOGIC (The Fix)
    // If the user visits an auth route (/login, /register, etc.)
    if (isAuthRoute) {
        if (subdomain !== 'auth') {
            // Redirect them to the auth subdomain (e.g., app. -> auth.)
            return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://auth.").concat(baseDomain)));
        }
        // If they are already on the auth subdomain, let the page load directly!
        // This expects your files to be at src/app/login/page.tsx
        return server_1.NextResponse.next();
    }
    // If the user is on the auth subdomain but trying to access a non-auth page
    if (subdomain === 'auth') {
        if (pathname === '/') {
            // Send the root auth domain directly to login
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://auth.").concat(baseDomain)));
        }
        // Kick them back to the app domain for anything else
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)));
    }
    // 5. ADMIN SUBDOMAIN REWRITE
    if (subdomain === 'admin') {
        url.pathname = "/admin".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    // Default: Normal 'app' routing
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
