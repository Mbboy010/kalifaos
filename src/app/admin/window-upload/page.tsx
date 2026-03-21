'use client';

import { useState } from 'react';
import { 
  Tag, Monitor, Cpu, Shield, Star, Loader2, Link as LinkIcon, 
  Image as ImageIcon, UploadCloud, X, FileArchive, DollarSign, 
  CheckCircle2, AlertCircle, Info, HardDrive
} from 'lucide-react';
import { db } from '@/server/firebaseApi';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { storage } from '@/server/appwrite';
import { v4 as uuidv4 } from 'uuid';
import DescriptionEditor from './DescriptionEditor';

// --- Interfaces ---
interface ToolForm {
  title: string;
  description: string;
  downloads: number;
  image: File | null;
  downloadFile: File | null;
  downloadUrl: string | null;
  priceType: 'Free' | 'Paid' | 'Trial' | 'Demo';
  price: number | null;
  os: string;
  architecture: string;
  date: string;
  rating: string;
  security: string;
  size: string;
  downloadType: 'file' | 'link';
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
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

// --- Custom Alert Component ---
const Toast = ({ show, message, type, onClose }: ToastState & { onClose: () => void }) => {
  if (!show) return null;
  
  const bgColors = {
    success: 'bg-green-900/90 border-green-500/50 text-green-100',
    error: 'bg-red-900/90 border-red-500/50 text-red-100',
    info: 'bg-blue-900/90 border-blue-500/50 text-blue-100',
  };
  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };
  const Icon = Icons[type];

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${bgColors[type]}`}>
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const InputWrapper = ({ label, icon: Icon, children }: any) => (
  <div className="relative group w-full">
    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-widest">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors pointer-events-none">
        <Icon size={16} />
      </div>
      {children}
    </div>
  </div>
);

// --- Main Page Component ---
const UploadToolPage: React.FC = () => {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const [formData, setFormData] = useState<ToolForm>({
    title: '', description: '', image: null, downloadFile: null, downloadUrl: null,
    downloads: 0, priceType: 'Free', price: null, os: '', architecture: '',
    date: new Date().toISOString(), rating: '', security: '', 
    size: '', downloadType: 'file',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof ToolForm) => {
    const file = e.target.files?.[0] || null;
    if (field === 'downloadFile' && file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setFormData((prev) => ({ ...prev, [field]: file, size: sizeMB }));
    } else if (field === 'image' && file) {
      const cropped = await cropAndResizeImage(file, 500);
      setFormData((prev) => ({ ...prev, image: cropped }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      showToast('Please fill all required fields (Title, Description, Image)', 'error');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const bucketId = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
      if (!bucketId) throw new Error('Missing NEXT_PUBLIC_STORAGE_BUCKET env var.');

      const uniqueId = uuidv4();
      const safeTitleForId = formData.title.replace(/\//g, '_').replace(/\s+/g, '_').trim();
      const docId = `${safeTitleForId}_${uniqueId}`;

      const imageUrl = formData.image ? await uploadToAppwrite(formData.image, bucketId) : null;

      let downloadUrl = null;
      if (formData.downloadType === 'file' && formData.downloadFile) {
        downloadUrl = await uploadToAppwrite(formData.downloadFile, bucketId);
      } else if (formData.downloadType === 'link' && formData.downloadUrl) {
        downloadUrl = formData.downloadUrl;
      }

      await setDoc(doc(db, 'Windows-tools', docId), {
        id: docId,
        downloads: 0,
        title: formData.title,
        description: formData.description,
        image: imageUrl ?? null,
        downloadUrl: downloadUrl ?? null,
        priceType: formData.priceType,
        price: formData.priceType === 'Paid' ? formData.price ?? 0 : 0,
        os: formData.os || '',
        architecture: formData.architecture || '',
        date: formData.date,
        rating: formData.rating || '',
        security: formData.security || '',
        size: formData.size || '',
        screenshots: [], 
        createdAt: serverTimestamp(),
      });

      showToast('Tool uploaded successfully!', 'success');
      
      // Reset Form
      setFormData({
        title: '', description: '', downloads: 0, image: null,
        downloadFile: null, downloadUrl: null, priceType: 'Free', price: null,
        os: '', architecture: '', date: new Date().toISOString(), rating: '',
        security: '', size: '', downloadType: 'file'
      });
    } catch (err) {
      console.error(err);
      showToast('Upload failed! Check connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClass = "w-full pl-9 pr-4 py-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-base text-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all appearance-none";

  return (
    <div className="min-h-screen bg-[#090909] text-gray-100 font-sans selection:bg-red-500/30 pb-20">
      
      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast(prev => ({ ...prev, show: false }))} />

      {/* Top Bar */}
      <div className="h-16 border-b border-[#222] bg-[#0f0f0f]/80 backdrop-blur-md flex items-center px-4 md:px-6 justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-md flex items-center justify-center shadow-red-900/20 shadow-lg">
            <UploadCloud size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden md:inline">Dev<span className="text-red-500">Store</span> Creator</span>
          <span className="font-bold text-lg tracking-tight md:hidden">Creator</span>
        </div>
        <button disabled={isSubmitting} onClick={handleSubmit} className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition flex items-center gap-2">
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
          Publish
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Header Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
               <InputWrapper label="Application Name" icon={Tag}>
                 <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Photoshop 2024" className={baseInputClass} />
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
            
            {/* Main Image Upload Tile */}
            <div className="relative group aspect-square bg-[#1a1a1a] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-red-500/50 transition cursor-pointer active:scale-95 duration-200">
              <input type="file" onChange={(e) => handleFileChange(e, 'image')} className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" />
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="text-gray-600 mb-2 group-hover:text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Upload Icon</span>
                </>
              )}
            </div>
          </div>

          {/* 2. Visual Description Editor */}
          <DescriptionEditor 
            value={formData.description} 
            onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
            onToast={(msg, type) => showToast(msg, type)} 
          />

          {/* 3. Bottom Section: File & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FileArchive size={16} className="text-red-500"/> Source File</h3>
                
                <div className="flex gap-2 mb-4">
                    <button type="button" onClick={() => setFormData(p => ({...p, downloadType: 'file'}))} className={`flex-1 py-3 text-xs font-bold rounded border transition-colors ${formData.downloadType === 'file' ? 'bg-red-600 border-red-600 text-white' : 'border-[#333] text-gray-500 hover:border-gray-500'}`}>Upload File</button>
                    <button type="button" onClick={() => setFormData(p => ({...p, downloadType: 'link'}))} className={`flex-1 py-3 text-xs font-bold rounded border transition-colors ${formData.downloadType === 'link' ? 'bg-red-600 border-red-600 text-white' : 'border-[#333] text-gray-500 hover:border-gray-500'}`}>External Link</button>
                </div>

                {formData.downloadType === 'file' ? (
                    <div className="space-y-2">
                        {/* ✅ FIXED: Label and Accept attribute for RAR/ZIP/etc support */}
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Select Archive (.zip, .rar, .7z, .exe)</label>
                        <input 
                          type="file" 
                          accept=".zip,.rar,.7z,.exe,.msi,.iso,.apk,.dmg,.bin,.tar,.gz"
                          onChange={(e) => handleFileChange(e, 'downloadFile')} 
                          className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#333] file:text-white hover:file:bg-[#444]" 
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <InputWrapper label="Download URL" icon={LinkIcon}>
                             <input type="text" name="downloadUrl" value={formData.downloadUrl || ''} onChange={(e) => setFormData(p => ({...p, downloadUrl: e.target.value}))} placeholder="https://drive.google.com/..." className={baseInputClass} />
                        </InputWrapper>
                        
                        <InputWrapper label="File Size (Manual)" icon={HardDrive}>
                             <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 1.5 GB" className={baseInputClass} />
                        </InputWrapper>
                    </div>
                )}
             </div>

             <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><DollarSign size={16} className="text-green-500"/> Pricing</h3>
                <select name="priceType" value={formData.priceType} onChange={handleChange} className={`${baseInputClass} mb-3`}>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                    <option value="Trial">Trial</option>
                    <option value="Demo">Demo</option>
                </select>
                {formData.priceType === 'Paid' && (
                    <input type="number" name="price" placeholder="Amount (NGN)" onChange={handleChange} className={baseInputClass} />
                )}
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UploadToolPage;
