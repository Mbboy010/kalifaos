import { db } from '@/server/firebaseApi';
import { doc, getDoc } from 'firebase/firestore';
import AppCom from '../../../components/window/appView/AppCom';

interface PageProps {
  params: { contentId: string };
}

// ==============================
// 📌 Dynamic Metadata
// ==============================
export async function generateMetadata({ params }: PageProps) {
  const docRef = doc(db, 'Windows-tools', params.contentId);
  const snapshot = await getDoc(docRef);
  const data = snapshot.exists() ? snapshot.data() : null;

  return {
    title: data?.title || 'System Applications',
    description:
      data?.description ||
      'Access and manage system applications for Samsung, Infinix, Tecno, and other Android devices with Kalifa OS tools.',
    openGraph: {
      title: data?.title || 'System Applications',
      description:
        data?.description ||
        'Access and manage system applications with Kalifa OS tools.',
      images: [
        {
          url: data?.ogImage || data?.image || '/default-share.png',
          width: 1200,
          height: 630,
          alt: data?.title || 'Tool Preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.title || 'System Applications',
      description:
        data?.description ||
        'Access and manage system applications with Kalifa OS tools.',
      images: [data?.ogImage || data?.image || '/default-share.png'],
    },
  };
}

// ==============================
// 📌 Page Component
// ==============================
export default function ContentPage({ params }: PageProps) {
  return (
    <div className="container mx-auto min-h-screen">
      <AppCom  />
    </div>
  );
}