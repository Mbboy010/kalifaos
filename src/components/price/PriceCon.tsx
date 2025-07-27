import { 
  Smartphone, 
  Shield, 
  Unlock, 
  Zap, 
  AlertTriangle,
  Check // Added Check icon import
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../components/redux/store';
import { useState } from 'react';


export default function MobileBypassPage() {
  const isColor = useSelector((state: RootState) => state.color.value);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handlePrice = (price: string,name: string): void => {
    setSelectedPrice(price);
    
    
   const phoneNumber = '2349013644892'; // Replace with Kalifa OS's number
    
    const message = `Hello, I need help unlocking my device.\n\nI saw that the current price is ${price} for ${name}, and I want you to proceed with the full unlock.\n\nService by: Kalifa OS`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    
  };


  return (
    <div className={`min-h-scree`}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center p-4 rounded-full ${isColor ? "bg-[#b9d4ff40]" : "bg-[#b9d4ff6c]"}`}>
            <Smartphone className="w-10 h-10 t" />
          </div>
          <h1 className="text-4xl md:text-5xl mt-7 font-bold mb-4">
            Mobile Device Services
          </h1>
          <p className={`text-lg`}>
            Legal solutions for legitimate device access needs
          </p>
        </div>

        {/* Disclaimer */}
        <div style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl mb-12 border`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-700 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-700 mb-2">Important Notice</h3>
              <p className={``}>
                Our services are intended for legal use only, such as regaining access to your own devices.
                We do not support or condone bypassing security measures on devices you do not own.
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* FRP Bypass */}
          <div style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}   className={`p-6 rounded-xl  shadow-md`}>
            <div className="flex items-center gap-4 mb-4">
              <Unlock className="w-8 h-8 text-blue-600" />
              <h2 className="text-xl text-blue-600 font-semibold">Factory Reset Protection (FRP) Removal</h2>
            </div>
            <p className={`mb-4 `}>
              For legitimate owners who need to regain access after a factory reset.
            </p>
            <ul className={`space-y-2`}>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>Requires proof of device ownership</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>Official documentation required</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>100% legal when following proper procedures</span>
              </li>
            </ul>
          </div>

          {/* Carrier Unlock */}
          <div style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-6 rounded-xl shadow-md`}>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-xl text-blue-600 font-semibold">Carrier Unlock Services</h2>
            </div>
            <p className={`mb-4`}>
              Legitimate carrier unlocking for eligible devices.
            </p>
            <ul className={`space-y-2`}>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>Only for out-of-contract devices</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>IMEI-based official unlocks</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                <span>Does not void warranties</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Process */}
        <div style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}}  className={`p-8 rounded-xl mb-16`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Our Legal Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-blue-600" />,
                title: "Verify Ownership",
                desc: "Submit proof of purchase or ownership"
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-600" />,
                title: "Security Check",
                desc: "We validate your documentation"
              },
              {
                icon: <Smartphone className="w-6 h-6 text-blue-600" />,
                title: "Authorized Service",
                desc: "Perform the requested service legally"
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className={``}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        
      {/* Pricing */}
      
      
      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "N5,000", desc: "Single device unlock", features: ["IMEI Check", "24h Support"] },
              { name: "Pro", price: "N13,000", desc: "Multiple devices", features: ["3 Unlocks", "Priority Support"] },
              { name: "Enterprise", price: "N49,000", desc: "Unlimited unlocks", features: ["Bulk IMEI", "VIP Support"] },
            ].map((plan, index) => (
              <div 
                key={index}  
                className={`border rounded-xl p-6 ${index === 1 ? "border-blue-600 shadow-lg" : "border-gray-200 shadow-lg"}`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <p className="mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePrice(plan.price,plan.desc)} 
                  className={`w-full py-2 rounded-md ${
                    index === 1 ? "bg-blue-600 text-white" : 
                    isColor ? "bg-gray-700 text-white" : "bg-[#72727236]"
                  } hover:opacity-90 transition`}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* CTA */}
        <div className="text-center">
          <p className={`mt-4`}>
            Our team will verify your eligibility before providing any services.
          </p>
        </div>
      </div>
    </div>
  );
}