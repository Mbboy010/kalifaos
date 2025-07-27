import { Link } from 'react-router-dom';
import { 
  ShieldCheck,
  User,
  Lock,
  Palette,
  Code,
  Globe,
  Gavel,
  Mail
} from 'lucide-react';
import type { RootState } from '../../components/redux/store';
import { useSelector } from 'react-redux';

export default function TermsCon() {
  const isColor = useSelector((state: RootState) => state.color.value);
  const currentYear = new Date().getFullYear();
  const accentColor = 'text-indigo-600';
  const highlightColor = 'bg-indigo-100';
  const sectionColors = [
    'bg-blue-50',
    'bg-purple-50',
    'bg-amber-50',
    'bg-emerald-50',
    'bg-rose-50',
    'bg-sky-50'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 `}>
          Terms of Service
        </h1>
        <p className="text-blue-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl `}>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className={`w-8 h-8 text-indigo-500`} />
            <h2 className="text-2xl font-semibold text-indigo-500">1. Acceptance of Terms</h2>
          </div>
          <p className="">
            By accessing or using our services, you agree to be bound by these Terms of Service 
            and our <Link to="/privacy" className={`text-indigo-500 hover:underline font-medium`}>Privacy Policy</Link>. 
            If you do not agree, you may not use our services.
          </p>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <User className={`w-8 h-8 text-purple-500`} />
            <h2 className="text-2xl font-semibold text-purple-500">2. User Responsibilities</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 13 years old to use our services</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You agree not to use the service for any illegal activities</li>
            <li>You will not attempt to disrupt or compromise our systems</li>
          </ul>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl `}>
          <div className="flex items-center gap-3 mb-4">
            <Palette className={`w-8 h-8 text-amber-500`} />
            <h2 className="text-2xl font-semibold text-amber-500">3. Intellectual Property</h2>
          </div>
          <p className="">
            All content and trademarks on this platform are the property of Kalifa OS or its 
            licensors. You may not reproduce, distribute, or create derivative works without 
            explicit permission.
          </p>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Code className={`w-8 h-8 text-emerald-500`} />
            <h2 className="text-2xl font-semibold text-emerald-500">4. Service Modifications</h2>
          </div>
          <p className="">
            We reserve the right to modify or discontinue any service at any time without notice. 
            We may also revise these terms periodically, with continued use constituting acceptance.
          </p>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Lock className={`w-8 h-8 text-rose-500`} />
            <h2 className="text-2xl font-semibold text-rose-500">5. Limitation of Liability</h2>
          </div>
          <p className="">
            Kalifa OS shall not be liable for any indirect, incidental, or consequential 
            damages resulting from use of our services. Our total liability is limited to the 
            amount you paid to use the service.
          </p>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Gavel className={`w-8 h-8 text-sky-500`} />
            <h2 className="text-2xl font-semibold text-sky-500">6. Governing Law</h2>
          </div>
          <p className="">
            These terms shall be governed by the laws of Nigeria without regard to 
            conflict of law provisions.
          </p>
        </section>

        <section style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Mail className={`w-8 h-8 text-indigo-500`} />
            <h2 className="text-2xl font-semibold text-indigo-500">Contact Us</h2>
          </div>
          <p className="">
            For questions about these Terms, please contact us at{' '}
            <a 
              href="mailto:Kalifaos763@gmali.com" 
              className={`text-indigo-500 hover:underline font-medium`}
            >
              Kalifaos763@gmali.com
            </a>.
            
          </p>
        </section>
      </div>
    </div>
  );
}