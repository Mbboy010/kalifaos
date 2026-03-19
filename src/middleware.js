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
    // 1. IMPROVED REDIRECT: Redirect naked/www/vercel domains to app subdomain
    var isNakedDomain = hostname === 'kalifaos.site' || hostname === 'www.kalifaos.site';
    var isVercelDomain = hostname.includes('.vercel.app');
    if (isNakedDomain || isVercelDomain) {
        return server_1.NextResponse.redirect(new URL(pathname + url.search, "".concat(protocol, "://app.").concat(baseDomain)), 301);
    }
    // 2. Determine Current Subdomain
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var subdomain = '';
    if (isProduction) {
        if (cleanHostname.endsWith('.kalifaos.site')) {
            subdomain = cleanHostname.replace('.kalifaos.site', '');
        }
    }
    else {
        // For local testing (e.g., app.localhost:3000)
        if (cleanHostname.includes('.')) {
            subdomain = cleanHostname.split('.')[0];
        }
    }
    // 3. Fallback to 'app' if no valid subdomain is found
    var validSubdomains = ['admin', 'auth', 'app'];
    if (!subdomain || !validSubdomains.includes(subdomain)) {
        subdomain = 'app';
    }
    // 4. Internal Rewrite
    // This maps the subdomain to the root folder /src/app/
    if (subdomain === 'admin' || subdomain === 'auth') {
        url.pathname = "/".concat(subdomain).concat(pathname);
    }
    else {
        url.pathname = pathname; // 'app' routes are at the root
    }
    return server_1.NextResponse.rewrite(url);
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
