"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    // 1. SYSTEM BYPASS
    if (pathname.startsWith('/__/') ||
        pathname.includes('.') ||
        pathname.startsWith('/_next')) {
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
        if (parts.length > 1 && parts[parts.length - 1] !== 'localhost') {
            subdomain = parts[0];
        }
    }
    // 3. CLEANUP: Redirect Legacy Subdomains & Vercel Domains to Naked Domain
    var isLegacySubdomain = subdomain === 'app' || subdomain === 'auth';
    var isVercelDomain = hostname.includes('.vercel.app');
    if (isLegacySubdomain || isVercelDomain) {
        // If they hit /admin on a legacy domain, send them to the admin subdomain root
        if (pathname.startsWith('/admin')) {
            return server_1.NextResponse.redirect(new URL('/', "".concat(protocol, "://admin.").concat(baseDomain)), 301);
        }
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://").concat(baseDomain)), 301);
    }
    // 4. ADMIN ROUTE REDIRECT (kalifaos.site/admin -> admin.kalifaos.site)
    if (pathname.startsWith('/admin') && subdomain !== 'admin') {
        var newPath = pathname.replace(/^\/admin/, '') || '/';
        return server_1.NextResponse.redirect(new URL(newPath + url.search, "".concat(protocol, "://admin.").concat(baseDomain)));
    }
    // 5. ADMIN SUBDOMAIN INTERNAL ROUTING
    if (subdomain === 'admin') {
        /**
         * No more cookie/session checks here.
         * The AdminGuard.tsx component handles the Firestore 'admin' role check.
         * * This rewrites 'admin.kalifaos.site/os/login'
         * to the internal folder 'app/admin/os/login'
         */
        var path = pathname === '/' ? '' : pathname;
        url.pathname = "/admin".concat(path);
        return server_1.NextResponse.rewrite(url);
    }
    // 6. DEFAULT (Naked Domain)
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|__|.*\\..*).*)'],
};
