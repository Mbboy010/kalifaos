import type { Metadata } from 'next';

import Frp from '../../components/frp/Frp';


export const metadata: Metadata = {
  title: 'FRP Bypass Tools',
  description: 'Download FRP bypass tools for Android devices with Kalifa OS. Use responsibly on legally owned devices to bypass Factory Reset Protection.',
};

export default function DownloandPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Frp  />
    </div>
  );
}