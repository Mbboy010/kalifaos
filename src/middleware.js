"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var _a, _b;
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    // 1. SYSTEM BYPASS ppass
    if (pathname.startsWith('/__/') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')) {
        return server_1.NextResponse.next();
    }
    var isProduction = process.env.NODE_ENV === 'production';
    var baseDomain = isProduction ? 'kalifaos.site' : 'localhost:3000';
    var protocol = isProduction ? 'https' : 'http';
    // 2. Extract Subdomain
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    if (isProduction) {
        if (cleanHostname === baseDomain) {
            subdomain = '';
        }
        else if (cleanHostname.endsWith(".".concat(baseDomain))) {
            subdomain = cleanHostname.replace(".".concat(baseDomain), '');
        }
    }
    else {
        var parts = cleanHostname.split('.');
        if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
            subdomain = parts[0];
        }
    }
    // 3. CLEANUP
    var isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
    var isVercelDomain = hostname.includes('.vercel.app');
    if (isLegacySubdomain || isVercelDomain) {
        if (pathname.startsWith('/admin')) {
            return server_1.NextResponse.redirect(new URL(pathname.replace(/^\/admin/, '') || '/', "".concat(protocol, "://admin.").concat(baseDomain)), 301);
        }
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://").concat(baseDomain)), 301);
    }
    // 4. ADMIN ROUTE HANDLING
    var isAdminRoute = pathname.startsWith('/admin');
    // Move /admin → admin subdomain
    if (isAdminRoute && subdomain !== 'admin') {
        var newPath = pathname.replace(/^\/admin/, '') || '/';
        return server_1.NextResponse.redirect(new URL(newPath + url.search, "".concat(protocol, "://admin.").concat(baseDomain)));
    }
    // 5. ADMIN SUBDOMAIN LOGIC
    if (subdomain === 'admin') {
        // 🔐 Read cookie properly
        var sessionCookie = (_a = req.cookies.get('__session')) === null || _a === void 0 ? void 0 : _a.value;
        var adminToken = (_b = req.cookies.get('admin-token')) === null || _b === void 0 ? void 0 : _b.value;
        var hasSession = !!sessionCookie || !!adminToken;
        // ❗ Redirect to ADMIN login (not main domain)
        if (!hasSession) {
            return server_1.NextResponse.redirect(new URL('/login', "".concat(protocol, "://admin.").concat(baseDomain)));
        }
        // Rewrite to /admin internally
        var cleanPath = pathname === '/' ? '' : pathname;
        url.pathname = "/admin".concat(cleanPath);
        return server_1.NextResponse.rewrite(url);
    }
    // 6. DEFAULT
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
