

import Setting from '../../components/setting/Setting';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Setting and lock screen',
  description: "Guide to bypass FRP settings with Kalifa OS. Follow steps to open app settings, set screen lock, or access phone app for device unlocking.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Setting   />
    </div>
  );
}