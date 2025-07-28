import About from '../../components/about/About';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'About Us',
  description: "Discover Kalifa OS, your trusted provider of secure device unlocking solutions. Learn about our mission, team, and commitment to legal, user-focused services.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <About  />
    </div>
  );
}