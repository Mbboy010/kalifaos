// app/components/videos/YouTubeVideos.tsx
'use client';

import { Youtube, Play, Monitor, Signal, Disc } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import Iframe from 'react-iframe';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface Video {
  id: string;
  title: string;
  link: string;
}

// Convert YouTube link to embed link
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

    // Add modest branding & dark theme params to YouTube embed
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : link;
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
        const videosQuery = query(
          collection(db, 'youtube-videos'),
          orderBy('id', 'desc'),
          limit(6) // Increased limit slightly for better grid fill
        );
        const querySnapshot = await getDocs(videosQuery);
        
        const videosData: Video[] = querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          title: doc.data().title,
          link: doc.data().link
        }));

        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Cyber Skeleton Loader
  const VideoSkeleton = () => (
    <div className={`rounded-xl overflow-hidden border ${
      isColor ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="aspect-video bg-gray-800/50 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1s_infinite]"></div>
        <Signal className="w-10 h-10 text-slate-700 animate-pulse" />
      </div>
      <div className="p-4 space-y-2">
        <div className={`h-4 w-3/4 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
        <div className={`h-3 w-1/2 rounded ${isColor ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
      </div>
    </div>
  );

  return (
    <div className={`w-full py-16 px-4 transition-colors duration-300 ${
      isColor ? 'bg-[#0a0a0a] text-slate-200' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- HEADER --- */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 ${
          isColor ? 'bg-red-900/20 text-red-500 border border-red-900/50' : 'bg-red-100 text-red-600 border border-red-200'
        }`}>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Live Feed
        </div>
        
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 ${
          isColor ? 'text-white' : 'text-slate-900'
        }`}>
          <Monitor className={`hidden md:block ${isColor ? 'text-slate-700' : 'text-slate-300'}`} />
          Tutorial <span className="text-red-600">Database</span>
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isColor ? 'text-slate-400' : 'text-slate-600'}`}>
          Visual guides for complex FRP bypass operations and firmware flashing.
        </p>
      </div>

      {/* --- VIDEO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)
        ) : videos.length === 0 ? (
          <div className="col-span-full text-center py-10 opacity-50">No feeds available.</div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                isColor 
                  ? 'bg-slate-900 border-slate-800 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]' 
                  : 'bg-white border-slate-200 hover:border-red-400 shadow-lg'
              }`}
            >
              {/* Monitor Interface Overlay (Top Bar) */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-3 py-2 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-red-500 font-bold animate-pulse">REC</span>
                    <span className="text-[10px] font-mono text-white/70">HD 1080p</span>
                 </div>
                 <div className="text-[10px] font-mono text-white/50">CAM_0{video.id.slice(0,2)}</div>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black relative">
                <Iframe
                  url={convertToEmbedUrl(video.link)}
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  styles={{ border: 'none' }} 
                />
              </div>

              {/* Meta Data */}
              <div className="p-5 relative overflow-hidden">
                {/* Decorative background line */}
                <div className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                  isColor ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-red-500'
                }`}></div>

                <div className="flex items-start gap-4">
                   <div className={`p-2 rounded-lg mt-1 ${
                      isColor ? 'bg-slate-800 text-red-500' : 'bg-red-50 text-red-600'
                   }`}>
                      <Youtube size={20} />
                   </div>
                   <div>
                      <h3 className={`font-bold leading-tight mb-2 line-clamp-2 ${
                        isColor ? 'text-slate-100 group-hover:text-red-400' : 'text-slate-900 group-hover:text-red-600'
                      }`}>
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                         <Disc size={12} />
                         <span>ENCRYPTED_STREAM</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* --- DECORATIVE FOOTER --- */}
      <div className="mt-12 flex justify-center opacity-30">
        <div className="flex gap-2">
           {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${isColor ? 'bg-red-500' : 'bg-slate-400'}`}></div>
           ))}
        </div>
      </div>
    </div>
  );
}

