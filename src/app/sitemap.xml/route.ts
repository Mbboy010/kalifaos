// app/sitemap.xml/route.ts

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kalifaos.vercel.app";

  // ✅ Only static routes
  const staticRoutes = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/try-free", changefreq: "weekly", priority: 0.8 },
    { url: "/learn-more", changefreq: "weekly", priority: 0.8 },
    { url: "/frp-tools-apk-download", changefreq: "weekly", priority: 0.8 },
    { url: "/pricing", changefreq: "weekly", priority: 0.8 },
    { url: "/privacy", changefreq: "weekly", priority: 0.7 },
    { url: "/terms", changefreq: "weekly", priority: 0.7 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "weekly", priority: 0.8 },
    { url: "/bypass-frp-setting", changefreq: "weekly", priority: 0.8 },
    { url: "/frp-tools", changefreq: "weekly", priority: 0.8 },
    { url: "/system-apps", changefreq: "weekly", priority: 0.8 },
    { url: "/windows-tools", changefreq: "weekly", priority: 0.8 },
  ];

  // Add today's date as lastmod for all
  const allRoutes = staticRoutes.map((route) => ({
    ...route,
    lastmod: new Date().toISOString().split("T")[0],
  }));

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route.url}</loc>
      <lastmod>${route.lastmod}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400", // cache for 1 day
    },
  });
}