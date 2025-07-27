import type { Metadata } from 'next';

import TryFree from '../../components/Tryfree/TryFree';

export const metadata: Metadata = {
  title: 'Try free',
  description: "Try Kalifa OS's free unlocking service! Submit your device details and IMEI to receive a diagnostic report via email. Check compatibility, verify security, and start unlocking today!",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <TryFree />
    </div>
  );
}