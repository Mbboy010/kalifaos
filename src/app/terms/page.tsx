import Terms from '../../components/terms/Terms';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "Review Kalifa OS’s Terms of Service. Understand your responsibilities, our intellectual property rights, and legal terms for using our device unlocking services.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Terms />
    </div>
  );
}