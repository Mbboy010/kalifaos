'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

type FormData = {
  title: string;
  link: string;
  brand: string;
};

const BRANDS = ['samsung', 'infinix', 'tecno', 'others'] as const;
type Brand = (typeof BRANDS)[number];

const BRAND_CONFIG: Record<Brand, { label: string }> = {
  samsung: { label: 'Samsung apps' },
  infinix: { label: 'Infinix apps' },
  tecno: { label: 'Tecno apps' },
  others: { label: 'Others mobile apps' },
};

const SystemUpload: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    link: '',
    brand: 'samsung',
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    const { title, link, brand } = formData;

    if (!title || !link || !brand) {
      setUploadStatus('Please enter a title, command link, and select a brand!');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');
    setProgress(0);
    setRemainingTime(null);

    try {
      await addDoc(collection(db, 'contents', 'system', brand), {
        title,
        link,
        brand,
        createdAt: serverTimestamp(),
      });

      let fakeProgress = 0;
      const interval = setInterval(() => {
        fakeProgress += 5;
        const estTimeLeft = ((100 - fakeProgress) / 5).toFixed(1);
        setProgress(fakeProgress);
        setRemainingTime(`${estTimeLeft}s`);

        if (fakeProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setRemainingTime(null);
          setUploadStatus('Upload Complete!');
          setFormData({ title: '', link: '', brand: 'samsung' });
          setIsUploading(false);
        }
      }, 200);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Upload failed.');
      setIsUploading(false);
    }
  };

  useEffect(() => {
    gsap.from('.upload-card', { opacity: 0, y: 50, duration: 0.6 });
  }, []);

  return (
    <div className="bg-gradient-to-br relative from-black/70 to-red-900/20 min-h-screen w-screen">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl mt-16  font-bold text-red-500 mb-6 text-center">Upload System App</h2>
          <form className="upload-card bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg" onSubmit={handleUpload}>
            <div className="flex items-center justify-center mb-6">
              <Upload className="text-red-400 h-12 w-12" />
            </div>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title (e.g., My App)"
              className="w-full mb-4 p-2 bg-black/20 border border-red-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Command Link (e.g., com.example.app)"
              className="w-full mb-4 p-2 bg-black/20 border border-red-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full mb-4 p-2 bg-black/20 border border-red-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {BRANDS.map((brand) => (
                <option key={brand} value={brand} className="bg-black/90">
                  {BRAND_CONFIG[brand].label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={!formData.title || !formData.link || !formData.brand || isUploading}
              className={`w-full py-2 rounded-lg text-white ${
                isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              } transition-colors duration-300`}
            >
              {isUploading ? (
                <span className="animate-pulse">Uploading...</span>
              ) : (
                <>
                  <Upload className="inline h-5 w-5 mr-2" /> Upload App
                </>
              )}
            </button>

            {uploadStatus && (
              <p className="mt-4 text-center text-green-400">
                {uploadStatus} {uploadStatus === 'Upload Complete!' && <CheckCircle className="inline h-5 w-5" />}
              </p>
            )}

            {progress > 0 && progress < 100 && (
              <div className="mt-4">
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-white mt-1 text-center">
                  {progress}% {remainingTime && `— Est: ${remainingTime}`}
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default SystemUpload;