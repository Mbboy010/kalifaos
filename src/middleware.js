"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var url = req.nextUrl.clone();
    var hostname = req.headers.get('host') || '';
    var pathname = url.pathname;
    // 1. Redirect .vercel.app to the main .site domain
    if (hostname.includes('.vercel.app')) {
        var targetUrl = new URL(pathname + url.search, 'https://kalifaos.site');
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
    // 3. Normalized Fallback
    // If no subdomain (naked domain), we treat it as 'app'
    if (!subdomain || (subdomain !== 'admin' && subdomain !== 'auth' && subdomain !== 'app')) {
        subdomain = 'app';
    }
    // 4. Prevent Path Leaking & Force Subdomain Branding
    // If someone visits kalifaos.site/admin, redirect to admin.kalifaos.site/
    var pathPrefix = pathname.split('/')[1]; // Gets the first part of the path
    var validSubdomains = ['admin', 'auth', 'app'];
    if (validSubdomains.includes(pathPrefix)) {
        // If the path starts with a subdomain name but we aren't on that subdomain
        if (subdomain !== pathPrefix) {
            var newProtocol = isProduction ? 'https' : 'http';
            var targetUrl = new URL(pathname.replace("/".concat(pathPrefix), '') + url.search, "".concat(newProtocol, "://").concat(pathPrefix, ".").concat(baseDomain));
            return server_1.NextResponse.redirect(targetUrl);
        }
    }
    // 5. Internal Rewrite
    // This maps the subdomain to the actual folder inside /app
    // E.g., admin.kalifaos.site/settings -> /admin/settings
    url.pathname = "/".concat(subdomain).concat(pathname);
    return server_1.NextResponse.rewrite(url);
}
exports.middleware = middleware;
exports.config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
