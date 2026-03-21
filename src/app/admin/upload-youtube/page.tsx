'use client';

import { useState, useEffect, useRef } from 'react';
import { Link as LinkIcon, Tag, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { db } from '@/server/firebaseApi';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface YouTubeForm {
  title: string;
  link: string;
}

interface BackgroundNumber {
  index: number;
  value: number;
}

const UploadYouTubePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<YouTubeForm>({
    title: '',
    link: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate YouTube URL
  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
    return youtubeRegex.test(url);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.link) {
      alert('Please fill all required fields: Title and YouTube Link.');
      return;
    }
    if (!validateYouTubeUrl(formData.link)) {
      alert('Please enter a valid YouTube URL.');
      return;
    }

    setIsSubmitting(true);
    setProgress(10);

    try {
      // Get current number of videos in the collection
      const querySnapshot = await getDocs(collection(db, 'youtube-videos'));
      const videoCount = querySnapshot.size;

      // Calculate the length of content after this upload (videoCount + 1)
      const contentLength = videoCount + 1;

      // Generate background numbers array (index: 0 to videoCount, value: contentLength)
      const backgroundNumbers: BackgroundNumber[] = Array.from(
        { length: videoCount + 1 },
        (_, i) => ({
          index: i, // Index is a number (0, 1, 2, ...)
          value: contentLength, // Value is the total number of videos after upload
        })
      );

      // Set document ID to contentLength (videoCount + 1)
      const docId = contentLength.toString();

      // Save to Firestore
      await addDoc(collection(db, 'youtube-videos'), {
        id: docId,
        title: formData.title,
        link: formData.link,
        backgroundNumbers,
        createdAt: serverTimestamp(),
      });

      setProgress(100);
      alert('YouTube video uploaded successfully!');
      setFormData({ title: '', link: '' });
      setTimeout(() => router.push('/youtube-videos'), 600);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed! Check console for details.');
    } finally {
      setIsSubmitting(false);
      setProgress(0);
    }
  };

  // GSAP animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-black">
      <div
        ref={containerRef}
        className="upload-container mt-16 w-full max-w-3xl p-8 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-red-800/20"
      >
        <h2 className="text-3xl font-bold text-red-500 text-center mb-8 tracking-wide">
          Upload YouTube Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Title Input */}
            <div className="relative">
              <label className="block text-sm text-gray-300 mb-1">Video Title</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter video title"
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-red-800/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* YouTube Link Input */}
            <div className="relative">
              <label className="block text-sm text-gray-300 mb-1">YouTube Link</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter YouTube URL (e.g., https://youtu.be/xxxxxxxxxxx)"
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-red-800/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="space-y-4">
            {isSubmitting && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.link}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadYouTubePage;