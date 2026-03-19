"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    // 1. Redirect .vercel.app to the main .site domain
    if (hostname.includes('.vercel.app')) {
        var targetUrl = new URL(url.pathname + url.search, 'https://kalifaos.site');
        return server_1.NextResponse.redirect(targetUrl, 301);
    }
    var cleanHostname = hostname.replace(/:\d+$/, '');
    var isProduction = process.env.NODE_ENV === 'production';
    var baseDomain = isProduction ? 'kalifaos.site' : 'localhost';
    // 2. Extract the subdomain
    var subdomain = '';
    if (cleanHostname.endsWith(".".concat(baseDomain))) {
        subdomain = cleanHostname.replace(".".concat(baseDomain), '');
    }
    // 3. FALLBACK LOGIC: 
    // If the subdomain is NOT 'admin' and NOT 'auth', default to 'app'
    // This handles the naked domain (kalifaos.site) and any other subdomain.
    if (subdomain !== 'admin' && subdomain !== 'auth') {
        subdomain = 'app';
    }
    // 4. Perform the internal rewrite
    // Example: kalifaos.site/home -> internally points to app/app/home/page.tsx
    // Example: admin.kalifaos.site/ -> internally points to app/admin/page.tsx
    url.pathname = "/".concat(subdomain).concat(url.pathname);
    return server_1.NextResponse.rewrite(url);
}
exports.middleware = middleware;
exports.config = {
    // Ignore static files, images, and API routes
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
