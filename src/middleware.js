"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    // 1. SYSTEM BYPASS
    if (pathname.startsWith('/__/') || pathname.includes('.') || pathname.startsWith('/_next')) {
        return server_1.NextResponse.next();
    }
    var isProduction = process.env.NODE_ENV === 'production';
    var baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
    var protocol = isProduction ? 'https' : 'http';
    // 2. Identify Route Types
    var AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
    var isAuthRoute = AUTH_ROUTES.some(function (route) { return pathname.startsWith(route); });
    var isAdminRoute = pathname.startsWith('/admin');
    // 3. Extract Subdomain
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    if (isProduction) {
        if (cleanHostname.endsWith('.kalifaos.site')) {
            subdomain = cleanHostname.replace('.kalifaos.site', '');
        }
    }
    else {
        var parts = cleanHostname.split('.');
        if (parts.length > 1 && parts[0] !== 'localhost')
            subdomain = parts[0];
    }
    // 4. Handle Naked Domain / Vercel Domain
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    if (isNakedDomain || hostname.includes('.vercel.app')) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 5. REDIRECT TO ADMIN SUBDOMAIN (The Fix for app.kalifaos.site/admin)
    // If they hit /admin on ANY domain that isn't the admin subdomain, redirect them.
    if (isAdminRoute && subdomain !== 'admin') {
        // Strip '/admin' from the URL so they go to admin.kalifaos.site/ instead of admin.kalifaos.site/admin
        var newPath = pathname.replace(/^\/admin/, '') || '/';
        return server_1.NextResponse.redirect(new URL(newPath + url.search, "".concat(protocol, "://admin.").concat(baseDomain)));
    }
    // 6. ADMIN SUBDOMAIN LOGIC
    if (subdomain === 'admin') {
        // Check for the cross-domain cookie
        //const hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');
        // If no token, bounce to login
        //if (!hasSession && pathname !== '/login') {
        //   return NextResponse.redirect(new URL('/login', `${protocol}://auth.${baseDomain}`));
        //  }
        // Rewrite mapped correctly
        var path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
        url.pathname = "/admin".concat(path === '/' ? '' : path);
        return server_1.NextResponse.rewrite(url);
    }
    // 7. AUTH SUBDOMAIN LOGIC
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
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
