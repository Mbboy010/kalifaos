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
    // 4. Handle Naked Domain / Vercel Domain / Old Auth Subdomain
    // We now treat 'auth' as an old domain and redirect it to 'app'
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    var isOldAuthSubdomain = subdomain === 'auth';
    if (isNakedDomain || hostname.includes('.vercel.app') || isOldAuthSubdomain) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 5. REDIRECT TO ADMIN SUBDOMAIN
    // If they hit /admin on the app subdomain, move them to the admin subdomain
    if (isAdminRoute && subdomain !== 'admin') {
        var newPath = pathname.replace(/^\/admin/, '') || '/';
        return server_1.NextResponse.redirect(new URL(newPath + url.search, "".concat(protocol, "://admin.").concat(baseDomain)));
    }
    // 6. ADMIN SUBDOMAIN INTERNAL LOGIC
    if (subdomain === 'admin') {
        // SECURITY: Ensure the operator is logged in
        var hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');
        if (!hasSession) {
            // Since auth is now on 'app', redirect here if not logged in
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://app.").concat(baseDomain)));
        }
        // Map internal folder: src/app/admin/page.tsx
        var path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
        url.pathname = "/admin".concat(path === '/' ? '' : path);
        return server_1.NextResponse.rewrite(url);
    }
    // 7. DEFAULT (app.kalifaos.site)
    // Auth routes (/login, /register) will now load directly on the app subdomain
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
