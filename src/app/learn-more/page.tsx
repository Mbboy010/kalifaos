import LearnMore from '../../components/learn/LearnMore';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'learn more',
  description: "Discover Kalifa OS’s advanced unlocking technology. Learn about our secure, fast, and legal device unlocking process with global coverage and no data loss.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <LearnMore />
    </div>
  );
}