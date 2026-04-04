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
        // For local testing: if you use app.localhost:3000, it captures 'app'
        if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
            subdomain = parts[0];
        }
    }
    // 3. LEGACY REDIRECTS (Remove 'app' and 'auth' subdomains)
    // If someone visits app.kalifaos.site or auth.kalifaos.site, send them to kalifaos.site
    var isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
    if (isLegacySubdomain) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://").concat(baseDomain)), 301);
    }
    // 4. ADMIN SUBDOMAIN LOGIC
    var isAdminRoute = pathname.startsWith('/admin');
    // If they hit /admin on the main domain, move them to the admin subdomain
    if (isAdminRoute && subdomain !== 'admin') {
        var newPath = pathname.replace(/^\/admin/, '') || '/';
        return server_1.NextResponse.redirect(new URL(newPath + url.search, "".concat(protocol, "://admin.").concat(baseDomain)));
    }
    if (subdomain === 'admin') {
        // SECURITY: Ensure the operator is logged in
        var hasSession = req.cookies.has('__session') || req.cookies.has('admin-token');
        if (!hasSession) {
            // Redirect to login on the main naked domain
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://").concat(baseDomain)));
        }
        // Rewrite to internal admin folder
        var path = pathname.startsWith('/admin') ? pathname.replace('/admin', '') : pathname;
        url.pathname = "/admin".concat(path === '/' ? '' : path);
        return server_1.NextResponse.rewrite(url);
    }
    // 5. DEFAULT (Load everything on kalifaos.site)
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
