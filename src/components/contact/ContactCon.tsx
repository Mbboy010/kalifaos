import { Mail, Phone, MapPin, Clock, Send, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { RootState } from '../../components/redux/store';
import { useSelector } from 'react-redux';
import { db } from '../../server/firebaseApi'; // adjust path if needed
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const ContactCon = () => {
  const isColor = useSelector((state: RootState) => state.color.value);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        await addDoc(collection(db, 'contactMessages'), {
          ...formData,
          timestamp: Timestamp.now()
        });
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Contact Us</h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">Have questions about our services? Get in touch with our support team.</p>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isSubmitted && (
          <div className="mb-8 p-4 bg-green-100 text-green-700 rounded-md">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left - Contact Info */}
          <div className="space-y-8" >
            <div
            style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
            className="p-6  rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p>Kalifaos763@gmail.com</p>
                  <a href="mailto:Kalifaos763@gmail.com" className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
                    Send email <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 mt-6">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Phone className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p>+2349013644892</p>
                  <p>24/7 Support Available</p>
                  <a href="tel:+2349013644892" className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
                    Call now <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 mt-6">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Address</h3>
                  <p>Kaduna, Nigeria</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 mt-6">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Business Hours</h3>
                  <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
                  <p>Sat–Sun: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div 
            style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
            className="p-6  rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold">Terms of Service</h2>
              </div>
              <p className="mb-4">Please review our terms and conditions before using our services.</p>
              <Link to="/terms" className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm">
                View Terms of Service
              </Link>
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }} className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone Number (Optional)</label>
                <input
                style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-md border border-gray-300"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 rounded-md border ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="service">Service Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
                >
                  {loading ? 'Sending...' : (<><Send className="mr-2 h-4 w-4" /> Send Message</>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCon;