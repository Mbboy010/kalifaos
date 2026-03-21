import ContactMessages from '@/components/admin/components/message/ContactMessages';
import ContentListPage from '@/components/admin/components/files/ContentListPage';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Upload',
  description: "Explore Kalifa OS’s affordable pricing plans for secure device unlocking. From single unlocks to unlimited enterprise solutions, find the perfect plan to regain full control of your device!.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
        <ContactMessages />
    </div>
  );
}