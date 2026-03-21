"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    // 1. FIREBASE BYPASS (The Fix)
    // Completely ignore Firebase internal routes so they don't trigger 404s
    if (pathname.startsWith('/__/')) {
        return server_1.NextResponse.next();
    }
    var isProduction = process.env.NODE_ENV === 'production';
    var baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
    var protocol = isProduction ? 'https' : 'http';
    // 2. Identify Auth Routes
    var AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
    var isAuthRoute = AUTH_ROUTES.some(function (route) { return pathname.startsWith(route); });
    // 3. Extract Subdomain
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
    // 4. Handle Naked Domain / Vercel Domain
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    var isVercelDomain = hostname.includes('.vercel.app');
    if (isNakedDomain || isVercelDomain) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 5. AUTH ROUTING LOGIC
    if (isAuthRoute) {
        if (subdomain !== 'auth') {
            return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://auth.").concat(baseDomain)));
        }
        return server_1.NextResponse.next();
    }
    if (subdomain === 'auth') {
        if (pathname === '/') {
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://auth.").concat(baseDomain)));
        }
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)));
    }
    // 6. ADMIN SUBDOMAIN REWRITE
    if (subdomain === 'admin') {
        url.pathname = "/admin".concat(pathname);
        return server_1.NextResponse.rewrite(url);
    }
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
// 7. UPDATED MATCHER
// Added __ to the ignored patterns just to be extra safe at the edge level
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
