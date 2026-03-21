'use client';

import { useState, useEffect, useRef } from 'react';
import { Youtube, Loader2, Trash2 } from 'lucide-react';
import { gsap } from 'gsap';
import { db } from '@/server/firebaseApi';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';

interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  backgroundNumbers: { index: number; value: number }[];
}

const YouTubeVideosList: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fetch videos from Firestore
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'youtube-videos'));
        const videoData = querySnapshot.docs.map((doc) => ({
          id: doc.data().id,
          title: doc.data().title,
          link: doc.data().link,
          backgroundNumbers: doc.data().backgroundNumbers || [],
        }));
        setVideos(videoData);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        alert('Failed to load videos. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // GSAP animation
  useEffect(() => {
    if (listRef.current && !loading) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [loading]);

  // Handle video deletion
  const handleDelete = async (videoId: string) => {
    if (!confirm(`Are you sure you want to delete video with ID ${videoId}?`)) return;

    setDeletingId(videoId);
    try {
      // Find the document with the matching id field
      const querySnapshot = await getDocs(collection(db, 'youtube-videos'));
      const docToDelete = querySnapshot.docs.find((doc) => doc.data().id === videoId);
      if (!docToDelete) {
        throw new Error(`Document with id ${videoId} not found`);
      }

      await deleteDoc(doc(db, 'youtube-videos', docToDelete.id));
      setVideos((prev) => prev.filter((video) => video.id !== videoId));
      alert('Video deleted successfully!');
    } catch (err) {
      console.error('Failed to delete video:', err);
      alert('Failed to delete video. Check console for details.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900/30 to-black">
        <div className="text-gray-300 text-center p-6">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
          <div>Loading videos...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-900/30 to-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl mt-8 font-bold text-red-500 text-center mb-8 tracking-wide">YouTube Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-300 text-center">
            No videos found.{' '}
            <Link href="/upload-youtube" className="text-blue-400 hover:underline">
              Upload a video
            </Link>
          </p>
        ) : (
          <div ref={listRef} className="grid grid-cols-1 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="p-6 bg-black/40 backdrop-blur-md rounded-lg shadow-md border border-red-800/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5 text-red-400" />
                    <h3 className="text-xl font-semibold text-white">Title: {video.title}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(video.id)}
                    disabled={deletingId === video.id}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
                    title="Delete video"
                  >
                    {deletingId === video.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Watch on YouTube
                </a>
                <p className="text-gray-300 mt-2">
                  Background Numbers: {video.backgroundNumbers.map((num) => `${num.index}:${num.value}`).join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default YouTubeVideosList;