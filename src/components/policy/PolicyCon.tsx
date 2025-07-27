import {
  Shield,
  Lock,
  Database,
  User,
  Server,
  Mail,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../components/redux/store';

export default function PolicyCon() {
  const isColor = useSelector((state: RootState) => state.color.value);
  const currentYear = new Date().getFullYear();

  const sectionBg = isColor ? "bg-[#d7d7d719]" : "bg-[#72727236]";
  const iconBg = isColor ? "bg-[#b9d4ff40]" : "bg-[#b9d4ff6c]";

  return (
    <div className={`max-w-4xl mx-auto px-4 py-12`}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center p-4 rounded-full ${iconBg}`}>
          <Shield className="w-10 h-10 " />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Privacy Policy
        </h1>
        <p className="text-blue-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">

        {/* Reusable Section Component */}
        {[
          {
            icon: <User className="w-6 h-6 " />,
            title: "1. Introduction",
            content: (
              <p>
                personal data. This policy explains how we collect, use, and safeguard your
                At Kalifa OS, we respect your privacy and are committed to protecting your
                information when you use our services.
              </p>
            )
          },
          {
            icon: <Database className="w-6 h-6 " />,
            title: "2. Data We Collect",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email, contact details</li>
                <li><strong>Usage Data:</strong> How you interact with our services</li>
                <li><strong>Technical Data:</strong> IP address, device information</li>
                <li><strong>Cookies:</strong> For analytics and functionality</li>
              </ul>
            )
          },
          {
            icon: <Server className="w-6 h-6 " />,
            title: "3. How We Use Your Data",
            content: (
              <>
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Improve user experience</li>
                  <li>Communicate with you</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </>
            )
          },
          {
            icon: <Lock className="w-6 h-6 " />,
            title: "4. Data Protection",
            content: (
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal data against unauthorized access, alteration, or destruction.
              </p>
            )
          },
          {
            icon: <EyeOff className="w-6 h-6 " />,
            title: "5. Your Rights",
            content: (
              <>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction or deletion</li>
                  <li>Object to processing</li>
                  <li>Request data portability</li>
                </ul>
              </>
            )
          }
        ].map((section, index) => (
          <section key={index} className={`p-6 rounded-2xl ${sectionBg}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg ${iconBg}`}>
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold text-blue-700">{section.title}</h2>
            </div>
            {section.content}
          </section>
        ))}

        {/* Contact */}
          
      </div>

        
        
    </div>
  );
}
