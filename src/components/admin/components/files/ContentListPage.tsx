'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Package, 
  FileCode, 
  Search
} from 'lucide-react';
import { storage } from '@/server/appwrite';
import { db } from '@/server/firebaseApi';
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy } from 'firebase/firestore';

interface ContentItem {
  id: string;
  title: string;
  version: string;
}

const ContentListPage: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedVersion, setEditedVersion] = useState<string>('');
  
  // UI State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const menuRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching ---
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, 'download'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContentItem[];
      setContents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers ---
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package? This cannot be undone.')) return;
    
    try {
      const docRef = doc(db, 'download', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.appwriteFileId) {
          await storage.deleteFile('688cce34002223f15e42', data.appwriteFileId).catch(console.error);
        }
        await deleteDoc(docRef);
        setContents(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  const openEditModal = (item: ContentItem) => {
    setSelectedItem(item);
    setEditedTitle(item.title);
    setEditedVersion(item.version);
    setIsEditModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSave = async () => {
    if (!selectedItem || !editedTitle || !editedVersion) return;
    
    try {
      await updateDoc(doc(db, 'download', selectedItem.id), {
        title: editedTitle,
        version: editedVersion,
      });
      
      // Optimistic Update
      setContents(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, title: editedTitle, version: editedVersion } 
          : item
      ));
      
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update item");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items
  const filteredContents = contents.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#090909] text-gray-100 font-sans selection:bg-red-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-4xl mx-auto mt-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Package Library</h2>
            <p className="text-gray-500 text-sm mt-1">Manage downloadable content versions.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search packages..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#333] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-gray-600"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-[#111] border border-[#222] rounded-xl animate-pulse" />
            ))
          ) : filteredContents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed border-[#222] rounded-xl bg-[#111]/50">
              No packages found.
            </div>
          ) : (
            filteredContents.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex items-center justify-between p-5 bg-[#111] border border-[#222] rounded-xl hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[#151515] animate-in slide-in-from-bottom-4 fade-in fill-mode-forwards"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '0.5s' }}
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] flex items-center justify-center shrink-0 group-hover:border-red-500/20 transition-colors">
                    <Package className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FileCode className="h-3 w-3 text-gray-500" />
                      <span className="text-xs font-mono text-gray-400">
                        Version: <span className="text-red-400 bg-red-900/10 px-1.5 py-0.5 rounded border border-red-900/20">{item.version}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === item.id ? null : item.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${activeMenuId === item.id ? 'bg-red-500 text-white' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuId === item.id && (
                    <div 
                      ref={menuRef}
                      className="absolute right-0 top-10 w-40 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    >
                      <button
                        onClick={() => openEditModal(item)}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#252525] hover:text-white transition-colors text-left"
                      >
                        <Edit2 className="h-4 w-4 mr-3 text-blue-400" /> Edit
                      </button>
                      <div className="h-px bg-[#222] mx-2" />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 transition-colors text-left"
                      >
                        <Trash2 className="h-4 w-4 mr-3" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#111] border border-[#333] rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-red-500" />
              Edit Package
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Title</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Version Tag</label>
                <input
                  type="text"
                  value={editedVersion}
                  onChange={(e) => setEditedVersion(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 bg-[#1a1a1a] text-gray-300 rounded-xl hover:bg-[#252525] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ContentListPage;
