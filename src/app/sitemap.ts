import { MetadataRoute } from 'next'; // ✅ Fixed: lowercase 'import'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kalifaos.site';

  // ============================================
  // 1. FETCH DYNAMIC WINDOWS TOOLS (From Firebase)
  // ============================================
  let windowsToolsUrls: MetadataRoute.Sitemap = [];

  try {
    const toolsRef = collection(db, 'Windows-tools');
    const snapshot = await getDocs(toolsRef);

    windowsToolsUrls = snapshot.docs.map((doc) => ({
      url: `${baseUrl}/windows-tools/${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const, // ✅ 'as const' fixes strict TypeScript errors
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Error generating sitemap for windows tools:", error);
  }

  // ============================================
  // 2. DEFINE STATIC PAGES
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/frp-tools-apk-download`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/setting-and-lock-screen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/system-apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools-access`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/windows-tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // ============================================
  // 3. COMBINE EVERYTHING
  // ============================================
  return [...staticPages, ...windowsToolsUrls];
}
