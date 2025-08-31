import { collection, getDocs } from "firebase/firestore";
import { db } from "@/server/firebaseApi"; // adjust path if needed

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kalifaos.vercel.app";

  // Static routes
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

  // Helper function for Firestore collections
  async function getCollectionRoutes(
    collectionName: string,
    basePath: string
  ) {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          url: `${basePath}/${doc.id}`,
          lastmod: data.date || new Date().toISOString().split("T")[0],
          changefreq: "monthly",
          priority: 0.6,
        };
      });
    } catch (error) {
      console.error(`Error fetching ${collectionName} for sitemap:`, error);
      return [];
    }
  }

  // Fetch all collections
  const [windowsTools, frpTools, systemApps] = await Promise.all([
    getCollectionRoutes("windows-tools", "/windows-tools"),
    getCollectionRoutes("frp-tools", "/frp-tools"),
    getCollectionRoutes("system-apps", "/system-apps"),
  ]);

  // Combine everything
  const allRoutes = [
    ...staticRoutes.map((route) => ({
      ...route,
      lastmod: new Date().toISOString().split("T")[0],
    })),
    ...windowsTools,
    ...frpTools,
    ...systemApps,
  ];

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
      "Cache-Control": "public, max-age=3600",
    },
  });
}