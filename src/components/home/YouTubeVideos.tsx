// app/components/videos/YouTubeVideos.tsx
'use client';

import { Youtube } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import Iframe from 'react-iframe';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/server/firebaseApi'; // Adjust path to your Firebase config

interface Video {
  id: string;
  title: string;
  link: string; // Changed from url to link
}

// ✅ Function to convert YouTube link to embed link
function convertToEmbedUrl(link: string): string {
  try {
    const shortRegex = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const longRegex = /v=([a-zA-Z0-9_-]{11})/;

    let videoId: string | null = null;

    if (shortRegex.test(link)) {
      videoId = link.match(shortRegex)?.[1] || null;
    } else if (longRegex.test(link)) {
      videoId = link.match(longRegex)?.[1] || null;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : link;
  } catch (err) {
    console.error('Invalid YouTube link:', link);
    return link;
  }
}

export default function YouTubeVideos() {
  const isColor = useAppSelector((state) => state.color.value);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Query Firebase to get the last 4 videos, ordered by id descending
        const videosQuery = query(
          collection(db, 'youtube-videos'), // Updated collection name
          orderBy('id', 'desc'),
          limit(4)
        );
        const querySnapshot = await getDocs(videosQuery);
        
        const videosData: Video[] = querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          title: doc.data().title,
          link: doc.data().link // Changed from url to link
        }));

        setVideos(videosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading videos...</div>;
  }

  return (
    <div className="flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Youtube className="w-8 h-8 text-red-500" />
          YouTube Videos
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Watch tutorials and guides for FRP bypass and Android tools.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full mx-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-lg shadow-md overflow-hidden"
            style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
          >
            <div className="aspect-video">
              <Iframe
                url={convertToEmbedUrl(video.link)} // Changed from video.url to video.link
                width="100%"
                height="100%"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-500 mb-2">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}