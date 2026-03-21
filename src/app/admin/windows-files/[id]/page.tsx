'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Tag, Monitor, Cpu, Shield, Star, Loader2, Link as LinkIcon, 
  Image as ImageIcon, UploadCloud, X, FileArchive, DollarSign, 
  HardDrive, Save, Edit3
} from 'lucide-react';
import { gsap } from 'gsap';
import { useRouter, useParams } from 'next/navigation';
import { db } from '@/server/firebaseApi';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { storage } from '@/server/appwrite';
// ✅ Import the new editor
import DescriptionEditor from './DescriptionEditor';

// --- Interfaces ---
interface ToolForm {
  id: string;
  title: string;
  description: string;
  downloads: number;
  image: string | null;
  downloadFile: File | null;
  downloadUrl: string | null;
  priceType: 'Free' | 'Paid' | 'Trial' | 'Demo';
  price: number | null;
  os: string;
  architecture: string;
  date: string;
  rating: string;
  security: string;
  screenshots: string[]; // Kept for data consistency, even if UI removed
  size: string;
  downloadType: 'file' | 'link';
}

// --- Helper Functions ---
const cropAndResizeImage = (file: File, maxSize = 500): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => (img.src = e.target?.result as string);
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = maxSize;
      canvas.height = maxSize;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, maxSize, maxSize);
      }
      canvas.toBlob((blob) => {
        if (blob) resolve(new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.png', { type: 'image/png' }));
      }, 'image/png', 1.0);
    };
    reader.readAsDataURL(file);
  });
};

const toUrlString = (u: any): string => {
    if (!u) return '';
    if (typeof u === 'string') return u;
    if (typeof u?.toString === 'function') return u.toString();
    if (u?.href) return u.href;
    return String(u);
};

const uploadToAppwrite = async (file: File, bucketId: string) => {
    const uploaded = await storage.createFile(bucketId, 'unique()', file);
    const url = storage.getFileDownload(bucketId, uploaded.$id);
    return toUrlString(url);
};

// --- Text Conversion Helper (For migration of old data) ---
const convertToHtml = (text: string): string => {
  if (!text) return "";
  // If it already looks like HTML (has tags like <p, <div, <br), return as is
  if (/<[a-z][\s\S]*>/i.test(text)) return text;

  let result = text;
  result = result.replace(/\[center\](.*?)\[\/center\]/g, '<div class="text-center">$1</div>');
  result = result.replace(/\[underline\](.*?)\[\/underline\]/g, '<span class="underline underline-offset-4">$1</span>');
  result = result.replace(/\[bold\](.*?)\[\/bold\]/g, '<strong class="font-bold text-white">$1</strong>');
  result = result.replace(/\[size=sm\](.*?)\[\/size\]/g, '<span class="text-sm">$1</span>');
  result = result.replace(/\[size=md\](.*?)\[\/size\]/g, '<span class="text-base">$1</span>');
  result = result.replace(/\[size=lg\](.*?)\[\/size\]/g, '<span class="text-xl font-semibold">$1</span>');
  result = result.replace(/\[color=red\](.*?)\[\/color\]/g, '<span class="text-red-500">$1</span>');
  result = result.replace(/\[color=green\](.*?)\[\/color\]/g, '<span class="text-emerald-500">$1</span>');
  result = result.replace(/\[color=blue\](.*?)\[\/color\]/g, '<span class="text-blue-500">$1</span>');
  result = result.replace(/\[link href="([^"]+)"\](.*?)\[\/link\]/g, '<a href="$1" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">$2</a>');
  result = result.replace(/\[bar\/\]/g, '<hr class="border-t border-white/10 my-4"/>');
  result = result.replace(/\n\n/g, '<br/><br/>');
  result = result.replace(/\n/g, '<br/>');
  return result.replace(/\[\/?[a-zA-Z0-9= "]*\]/g, '');
};

// --- Main Edit Component ---
const EditWindowPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ToolForm>({
    id: '', title: '', description: '', downloads: 0, image: null,
    downloadFile: null, downloadUrl: null, priceType: 'Free', price: null,
    os: '', architecture: '', date: new Date().toISOString(), rating: '',
    security: '', screenshots: [], size: '', downloadType: 'file',
  });
  
  // Media State
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
        if (!id) return;
        try {
            const docRef = doc(db, 'Windows-tools', id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const data = snap.data() as ToolForm;
                
                // Convert existing description to HTML if it's in old format
                const htmlDescription = convertToHtml(data.description || '');

                setFormData({
                    ...data,
                    id: snap.id,
                    priceType: data.priceType || 'Free',
                    downloadType: data.downloadType || 'file',
                    screenshots: data.screenshots || [],
                    description: htmlDescription 
                });
            } else {
                alert("Tool not found");
                router.push('/windows-tools');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [id, router]);

  // Animation after load
  useEffect(() => {
    if (!loading) {
        gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
    }
  }, [loading]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Handlers
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const cropped = await cropAndResizeImage(file, 500);
        setNewImageFile(cropped);
    }
  };

  // Update Logic
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return alert('Please fill required fields');
    
    setIsSubmitting(true);

    try {
        const bucketId = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
        if (!bucketId) throw new Error("Storage Bucket Missing");

        let finalImageUrl = formData.image;
        let finalDownloadUrl = formData.downloadUrl;

        // 1. Upload New Main Image if changed
        if (newImageFile) {
            finalImageUrl = await uploadToAppwrite(newImageFile, bucketId);
        }

        // 2. Upload New Download File if changed
        if (formData.downloadType === 'file' && formData.downloadFile) {
            finalDownloadUrl = await uploadToAppwrite(formData.downloadFile, bucketId);
        }

        // 3. Update Firestore
        const docRef = doc(db, 'Windows-tools', id);
        await updateDoc(docRef, {
            ...formData,
            image: finalImageUrl,
            downloadUrl: finalDownloadUrl,
            // We keep existing screenshots in DB, even if UI is removed, to prevent data loss
            screenshots: formData.screenshots, 
            price: formData.priceType === 'Free' ? 0 : Number(formData.price),
            updatedAt: serverTimestamp()
        });

        alert('Tool Updated Successfully');
        router.push('/windows-tools');

    } catch (err) {
        console.error(err);
        alert('Update Failed');
    } finally {
        setIsSubmitting(false);
    }
  };

  const InputWrapper = ({ label, icon: Icon, children }: any) => (
    <div className="relative group">
      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-widest">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors">
          <Icon size={16} />
        </div>
        {children}
      </div>
    </div>
  );
  
  const baseInputClass = "w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all appearance-none";

  if (loading) return <div className="min-h-screen bg-[#090909] flex items-center justify-center text-white"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-[#090909] text-gray-100 font-sans selection:bg-red-500/30">
      
      {/* Top Bar */}
      <div className="h-14 border-b border-[#222] bg-[#0f0f0f] flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-md flex items-center justify-center shadow-red-900/20 shadow-lg">
            <Edit3 size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Edit <span className="text-red-500">Tool</span></span>
        </div>
        <button disabled={isSubmitting} onClick={handleUpdate} className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition flex items-center gap-2">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-10" ref={containerRef}>
        
        <form onSubmit={handleUpdate} className="space-y-8">
          
          {/* 1. Header Details (Expanded Options) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
               <InputWrapper label="Application Name" icon={Tag}>
                 <input name="title" value={formData.title} onChange={handleChange} className={baseInputClass} />
               </InputWrapper>
               
               <div className="grid grid-cols-2 gap-4">
                 <InputWrapper label="OS" icon={Monitor}>
                    <select name="os" value={formData.os} onChange={handleChange} className={baseInputClass}>
                        <option value="">Select OS...</option>
                        <optgroup label="Windows">
                            <option value="Windows 11">Windows 11</option>
                            <option value="Windows 10">Windows 10</option>
                            <option value="Windows 8.1">Windows 8.1</option>
                            <option value="Windows 7">Windows 7</option>
                        </optgroup>
                        <optgroup label="Macintosh">
                            <option value="macOS Sequoia">macOS Sequoia</option>
                            <option value="macOS Sonoma">macOS Sonoma</option>
                            <option value="macOS Ventura">macOS Ventura</option>
                        </optgroup>
                        <optgroup label="Linux / Unix">
                            <option value="Ubuntu">Ubuntu</option>
                            <option value="Kali Linux">Kali Linux</option>
                            <option value="Linux Generic">Linux (Generic)</option>
                        </optgroup>
                        <optgroup label="Mobile">
                            <option value="Android 14+">Android 14+</option>
                            <option value="Android 10-13">Android 10-13</option>
                            <option value="Android Legacy">Android (Legacy)</option>
                        </optgroup>
                    </select>
                 </InputWrapper>
                 <InputWrapper label="Architecture" icon={Cpu}>
                    <select name="architecture" value={formData.architecture} onChange={handleChange} className={baseInputClass}>
                      <option value="">Select Arch...</option>
                      <option value="64 bit (x64)">64 bit (x64)</option>
                      <option value="32 bit (x86)">32 bit (x86)</option>
                      <option value="ARM64">ARM64 (M1/M2)</option>
                      <option value="Universal">Universal</option>
                    </select>
                 </InputWrapper>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <InputWrapper label="Rating" icon={Star}>
                    <select name="rating" value={formData.rating} onChange={handleChange} className={baseInputClass}>
                        <option value="">Select Rating...</option>
                        <option value="5/5">5.0 Stars (Excellent)</option>
                        <option value="4.5/5">4.5 Stars (Great)</option>
                        <option value="4/5">4.0 Stars (Good)</option>
                        <option value="3/5">3.0 Stars (Fair)</option>
                        <option value="2/5">2.0 Stars (Poor)</option>
                        <option value="1/5">1.0 Star (Bad)</option>
                    </select>
                 </InputWrapper>
                 <InputWrapper label="Security" icon={Shield}>
                    <select name="security" value={formData.security} onChange={handleChange} className={baseInputClass}>
                        <option value="">Select Status...</option>
                        <option value="safe">✅ Safe</option>
                        <option value="medium">⚠️ Medium Risk</option>
                        <option value="false_positive">🛡️ False Positive</option>
                        <option value="untested">❓ Untested</option>
                        <option value="high">⛔ High Risk</option>
                    </select>
                 </InputWrapper>
               </div>
            </div>
            
            {/* Main Image Tile (Edit Mode) */}
            <div className="relative group aspect-square bg-[#1a1a1a] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-red-500/50 transition cursor-pointer">
              <input type="file" onChange={handleMainImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              {newImageFile ? (
                <img src={URL.createObjectURL(newImageFile)} className="w-full h-full object-cover" />
              ) : formData.image ? (
                <img src={formData.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition" />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                   <ImageIcon />
                   <span className="text-xs">No Image</span>
                </div>
              )}
              <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                 <span className="bg-black/70 px-2 py-1 text-[10px] rounded text-white">Click to Replace</span>
              </div>
            </div>
          </div>

          {/* 2. Visual Description Editor (New) */}
          <DescriptionEditor 
            value={formData.description} 
            onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
          />

          {/* 3. Files & Links */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
             <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FileArchive size={16} className="text-red-500"/> Source File</h3>
             <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => setFormData(p => ({...p, downloadType: 'file'}))} className={`flex-1 py-2 text-xs font-bold rounded border ${formData.downloadType === 'file' ? 'bg-red-600 border-red-600' : 'border-[#333] text-gray-500'}`}>File</button>
                <button type="button" onClick={() => setFormData(p => ({...p, downloadType: 'link'}))} className={`flex-1 py-2 text-xs font-bold rounded border ${formData.downloadType === 'link' ? 'bg-red-600 border-red-600' : 'border-[#333] text-gray-500'}`}>Link</button>
             </div>
             
             {formData.downloadType === 'file' ? (
                 <div className="space-y-2">
                     <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Current: {formData.size || 'Unknown'}</span>
                     </div>
                     <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-1">Replace Archive (.zip, .rar, .7z, .exe)</label>
                     <input 
                        type="file" 
                        accept=".zip,.rar,.7z,.exe,.msi,.iso,.apk,.dmg,.bin,.tar,.gz"
                        onChange={(e) => {
                         if(e.target.files?.[0]) {
                            setFormData(p => ({...p, downloadFile: e.target.files![0], size: (e.target.files![0].size / (1024*1024)).toFixed(2) + ' MB' }))
                         }
                     }} className="block w-full text-xs text-gray-500 file:bg-[#333] file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 hover:file:bg-[#444] cursor-pointer"/>
                 </div>
             ) : (
                 <div className="space-y-4">
                     <InputWrapper label="Download URL" icon={LinkIcon}>
                        <input name="downloadUrl" value={formData.downloadUrl || ''} onChange={handleChange} className={baseInputClass} />
                     </InputWrapper>
                     <InputWrapper label="Size" icon={HardDrive}>
                        <input name="size" value={formData.size} onChange={handleChange} className={baseInputClass} />
                     </InputWrapper>
                 </div>
             )}
          </div>

          {/* 4. Pricing */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
             <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><DollarSign size={16} className="text-green-500"/> Pricing</h3>
             <select name="priceType" value={formData.priceType} onChange={handleChange} className={`${baseInputClass} mb-3`}>
                 <option value="Free">Free</option>
                 <option value="Paid">Paid</option>
                 <option value="Trial">Trial</option>
                 <option value="Demo">Demo</option>
             </select>
             {formData.priceType === 'Paid' && <input type="number" name="price" value={formData.price || ''} onChange={handleChange} placeholder="NGN" className={baseInputClass} />}
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditWindowPage;
