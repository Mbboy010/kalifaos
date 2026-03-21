'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';
import { MoreVertical, Trash2, Edit2, Check } from 'lucide-react';
import { gsap } from 'gsap';

type AppData = {
  id: string;
  title: string;
  link: string;
};

type Brand = 'samsung' | 'infinix' | 'tecno' | 'others';

const BRAND_CONFIG: Record<
  Brand,
  {
    label: string;
    color: string;
  }
> = {
  samsung: { label: 'Samsung apps', color: 'text-red-500' },
  infinix: { label: 'Infinix apps', color: 'text-red-500' },
  tecno: { label: 'Tecno apps', color: 'text-red-500' },
  others: { label: 'Others mobile apps', color: 'text-red-500' },
};

export default function DownloadManager() {
  const [appsData, setAppsData] = useState<Record<Brand, AppData[]>>({
    samsung: [],
    infinix: [],
    tecno: [],
    others: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AppData | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const brands: Brand[] = ['samsung', 'infinix', 'tecno', 'others'];
      setIsLoading(true);
      try {
        const results = await Promise.all(
          brands.map(async (brand) => {
            const querySnapshot = await getDocs(collection(db, 'contents', 'system', brand));
            const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AppData[];
            return { brand, items };
          }),
        );

        const updatedData = results.reduce(
          (acc, { brand, items }) => {
            acc[brand] = items;
            return acc;
          },
          {} as Record<Brand, AppData[]>,
        );

        setAppsData(updatedData);
      } catch (error) {
        console.error('Error fetching system apps:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [appsData, isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id: string) => {
    setIsMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id: string, brand: Brand) => {
    try {
      await deleteDoc(doc(db, 'contents', 'system', brand, id));
      setAppsData((prev) => ({
        ...prev,
        [brand]: prev[brand].filter((item) => item.id !== id),
      }));
      setIsMenuOpen(null);
    } catch (error) {
      console.error('Error deleting app:', error);
    }
  };

  const handleEdit = (item: AppData) => {
    setSelectedItem(item);
    setEditedTitle(item.title);
    setEditedLink(item.link);
    setEditMode(true);
    setIsMenuOpen(null);
  };

  const handleSave = async () => {
    if (selectedItem && editedTitle && editedLink) {
      const brand = (Object.keys(appsData) as Brand[]).find((b) =>
        appsData[b].some((item) => item.id === selectedItem.id)
      );
      if (brand) {
        await updateDoc(doc(db, 'contents', 'system', brand, selectedItem.id), {
          title: editedTitle,
          link: editedLink,
        });
        setAppsData((prev) => ({
          ...prev,
          [brand]: prev[brand].map((item) =>
            item.id === selectedItem.id ? { ...item, title: editedTitle, link: editedLink } : item
          ),
        }));
        setEditMode(false);
        setSelectedItem(null);
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedItem(null);
  };

  const AppSection = ({ brand, data }: { brand: Brand; data: AppData[] }) => {
    const { label, color } = BRAND_CONFIG[brand];

    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col mb-10">
        <h2 className={`text-2xl md:text-3xl font-bold text-center ${color} mb-8`}>{label}</h2>
        {data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            
            style={{marginBottom: isMenuOpen ? "3rem":"0",animation: "3s"}}
            
            className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg hover:bg-red-900/30 transition-all duration-300 overflow-visible "
          >
            <div
              
              onClick={(e) => {
                if (!navigator.userAgent.includes('Android')) {
                  e.preventDefault();
                  alert('This feature is available on Android devices only.');
                }
              }}
              className="flex items-center flex-1"
            >
              <div>
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.link}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => toggleMenu(item.id)}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
                aria-label={`More options for ${item.title}`}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              {isMenuOpen === item.id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-8 w-32 bg-black/90 backdrop-blur-md rounded-lg shadow-lg"
                >
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-900/30 transition-colors duration-200"
                  >
                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, brand)}
                    className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-900/30 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SkeletonLoader = () => (
    <div className="w-full flex flex-col gap-2 min-h-screen">
      {[...Array(2)].map((_, sectionIdx) => (
        <div key={sectionIdx} className="w-full max-w-3xl mx-auto flex flex-col mb-10">
          <div className="flex justify-center items-center text-center mb-8">
            <div className="h-5 w-[50%] bg-gray-700/50 rounded animate-pulse" />
          </div>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="px-4 py-1">
              <div className="flex items-center p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg animate-pulse">
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 w-[50%] bg-gray-700/50 rounded" />
                  <div className="h-3 w-[30%] bg-gray-700/50 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-12 min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black/70 to-red-900/20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl mt-16 font-bold mb-2 text-red-500 text-center">System Applications</h1>
        <p className="text-gray-400 text-center mb-6">Access and manage your system applications</p>

        {editMode && selectedItem && (
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl z-20 shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Application</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-4 p-2 bg-black/20 border border-red-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Title"
            />
            <input
              type="text"
              value={editedLink}
              onChange={(e) => setEditedLink(e.target.value)}
              className="w-full mb-4 p-2 bg-black/20 border border-red-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Link"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                <Check className="inline h-5 w-5 mr-1" /> Save
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            (Object.keys(appsData) as Brand[]).map((brand) => (
              <AppSection key={brand} brand={brand} data={appsData[brand]} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}