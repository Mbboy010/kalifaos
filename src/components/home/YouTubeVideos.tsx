// app/components/videos/YouTubeVideos.tsx
'use client';

import { Youtube } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import Iframe from 'react-iframe';

interface Video {
  id: string;
  title: string;
  url: string; // raw YouTube link
}

// ✅ Function to convert YouTube URL to embed link
function convertToEmbedUrl(url: string): string {
  try {
    // Handle both youtu.be and youtube.com/watch?v= formats
    const shortRegex = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const longRegex = /v=([a-zA-Z0-9_-]{11})/;

    let videoId: string | null = null;

    if (shortRegex.test(url)) {
      videoId = url.match(shortRegex)?.[1] || null;
    } else if (longRegex.test(url)) {
      videoId = url.match(longRegex)?.[1] || null;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch (err) {
    console.error('Invalid YouTube URL:', url);
    return url;
  }
}

export default function YouTubeVideos() {
  const isColor = useAppSelector((state) => state.color.value);

  // Mock data from search results (use normal YouTube links)
  const videos: Video[] = [
    {
      id: '1',
      title: 'Kalifa OS - FRP Bypass Tutorial',
      url: 'https://youtu.be/sEfi1v9jDOs?si=6MoarXscET8VNo2S',
    },
    {
      id: '2',
      title: 'Android System Apps Guide',
      url: 'https://www.youtube.com/watch?v=L_28vTfPGXs&si=MM_z1YVVu-ZrRMq3',
    },
    {
      id: '3',
      title: 'Kali Linux for Mobile Unlocking',
      url: 'https://youtu.be/5j9zgV1e8bU?si=HL8qwEvhnC8_lnKK',
    },
  ];

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
                url={convertToEmbedUrl(video.url)} // ✅ Converts automatically
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