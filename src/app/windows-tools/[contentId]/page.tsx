import type { Metadata } from 'next';

import AppCom from '../../../components/window/appView/AppCom';




export const metadata: Metadata = {
  title: 'System Applications',
  description:
    'Access and manage system applications for Samsung, Infinix, Tecno, and other Android devices with Kalifa OS tools.',
};

export default function ContentPage() {
  return (
    <div className="container mx-auto min-h-screen">
      <AppCom />


    </div>
  );
}