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
    // 1. Redirect naked domain (kalifaos.site) to app.kalifaos.site
    if (hostname === 'kalifaos.vercel.app' || hostname === 'kalifaos.site') {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 2. Extract Subdomain
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    if (isProduction) {
        if (cleanHostname.endsWith('.kalifaos.site')) {
            subdomain = cleanHostname.replace('.kalifaos.site', '');
        }
    }
    else {
        if (cleanHostname.endsWith('.localhost')) {
            subdomain = cleanHostname.replace('.localhost', '');
        }
    }
    // 3. Set 'app' as the default subdomain
    var validSubdomains = ['admin', 'auth', 'app'];
    if (!subdomain || !validSubdomains.includes(subdomain)) {
        subdomain = 'app';
    }
    // 4. Path-based Correction (e.g., app.kalifaos.site/admin -> admin.kalifaos.site)
    var pathPrefix = pathname.split('/')[1];
    if (validSubdomains.includes(pathPrefix) && subdomain !== pathPrefix) {
        return server_1.NextResponse.redirect(new URL(pathname.replace("/".concat(pathPrefix), '') + url.search, "".concat(protocol, "://").concat(pathPrefix, ".").concat(baseDomain)));
    }
    // 5. INTERNAL REWRITE (The Fix)
    // Since your files are at the root of /src/app, we DON'T prefix 'app'
    if (subdomain === 'admin' || subdomain === 'auth') {
        url.pathname = "/".concat(subdomain).concat(pathname);
    }
    else {
        // This keeps the path as /about instead of /app/about
        url.pathname = pathname;
    }
    return server_1.NextResponse.rewrite(url);
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
