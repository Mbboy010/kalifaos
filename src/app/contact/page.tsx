import Contact from '../../components/contact/Contact';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with Kalifa OS for support or inquiries. Send us a message, call, or email to learn more about our device unlocking services.",
};

export default function InstrumentalPage() {
  return (
    <div className="container mx-auto min-h-full">
      <Contact   />
    </div>
  );
}