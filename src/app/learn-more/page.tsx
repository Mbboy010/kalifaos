import LearnMore from '../../components/learn/LearnMore';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'learn more',
  description: "Try Kalifa OS's free unlocking service! Submit your device details and IMEI to receive a diagnostic report via email. Check compatibility, verify security, and start unlocking today!",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <LearnMore />
    </div>
  );
}