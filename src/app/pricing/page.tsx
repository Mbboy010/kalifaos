import Price from '../../components/price/Price';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Pricing',
  description: "Explore Kalifa OS’s affordable pricing plans for secure device unlocking. From single unlocks to unlimited enterprise solutions, find the perfect plan to regain full control of your device!.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Price  />
    </div>
  );
}