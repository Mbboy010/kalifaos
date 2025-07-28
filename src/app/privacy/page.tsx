import Policy from '../../components/policy/Policy';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Learn how Kalifa OS protects your privacy. Understand our data collection, usage, and protection practices to ensure your personal information is secure.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Policy  />
    </div>
  );
}