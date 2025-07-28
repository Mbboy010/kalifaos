import type { Metadata } from 'next';

import System from '../../components/system/System';


export const metadata: Metadata = {
  title: 'System Applications',
  description:
    'Access and manage system applications for Samsung, Infinix, Tecno, and other Android devices with Kalifa OS tools.',
};

export default function SystemPage() {
  return (
    <div className="container mx-auto min-h-full">
      <System  />
    </div>
  );
}