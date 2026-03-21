'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  MoreVertical, Edit3, Trash2, Loader2, Search, 
  Calendar, LayoutGrid, PackageOpen 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/server/firebaseApi';
import { collection, getDocs, orderBy, query, Timestamp, deleteDoc, doc } from 'firebase/firestore';

interface WindowApp {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

const WindowListPage: React.FC = () => {
  const router = useRouter();
  const [apps, setApps] = useState<WindowApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ref to handle clicking outside to close menu
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const appsRef = collection(db, 'Windows-tools');
        const appsQuery = query(appsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(appsQuery);

        const toolsData: WindowApp[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled App',
            image: data.image || '/images/default.jpg',
            createdAt: data.createdAt instanceof Timestamp
                ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : String(data.createdAt ?? ''),
          };
        });

        setApps(toolsData);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = (id: string) => {
    router.push(`https://kalifaos.vercel.app/windows-tools/${id}`);
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/windows-files/${id}`);
    setMenuOpen(null);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this tool permanently?')) {
      try {
        await deleteDoc(doc(db, 'Windows-tools', id));
        setApps((prev) => prev.filter((app) => app.id !== id));
        setMenuOpen(null);
      } catch (err) {
        console.error('Error deleting document:', err);
      }
    }
  };

  // Filter apps
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#090909] text-gray-100 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto mt-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <LayoutGrid className="text-red-500" />
              Windows Tools
            </h2>
            <p className="text-gray-500 text-sm mt-1">Manage your software repository</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#151515] border border-[#333] rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-600"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-500">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin mb-3" />
            <p className="text-sm">Loading inventory...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-[#333] rounded-2xl bg-[#111]/50">
            <PackageOpen className="w-12 h-12 text-gray-600 mb-3" />
            <p className="text-gray-400 font-medium">No tools found</p>
            <p className="text-gray-600 text-sm">Try searching for something else or add a new tool.</p>
          </div>
        ) : (
          <div className="grid gap-4" ref={menuRef}>
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleOpen(app.id)}
                className={`
                  group relative flex items-center justify-between p-4 rounded-xl border border-[#222] 
                  bg-[#151515]/80 backdrop-blur-sm transition-all duration-300 cursor-pointer
                  hover:bg-[#1a1a1a] hover:border-red-500/30 hover:shadow-lg hover:shadow-red-900/10
                  ${menuOpen === app.id ? 'z-50 ring-1 ring-gray-600' : 'z-auto'}
                `}
              >
                {/* Left Side: Image & Text */}
                <div className="flex items-center gap-5 overflow-hidden">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-[#333] group-hover:border-gray-500 transition-colors">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-100 truncate group-hover:text-red-400 transition-colors">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{app.createdAt || 'Unknown Date'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleMenu(app.id, e)}
                    className={`
                      p-2 rounded-full transition-colors duration-200 
                      ${menuOpen === app.id ? 'bg-red-600/20 text-red-500' : 'text-gray-400 hover:bg-[#222] hover:text-white'}
                    `}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen === app.id && (
                    <div 
                      className="absolute right-0 top-10 w-40 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[100]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-1">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#252525] hover:text-white transition-colors text-left"
                          onClick={(e) => handleEdit(app.id, e)}
                        >
                          <Edit3 className="w-4 h-4 text-blue-400" /> Edit Tool
                        </button>
                        <div className="h-px bg-[#333] my-1 mx-2"></div>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-left"
                          onClick={(e) => handleDelete(app.id, e)}
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WindowListPage;
