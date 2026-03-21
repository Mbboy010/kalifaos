'use client';

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { 
  Upload, 
  CheckCircle, 
  Package, 
  FileCode, 
  Smartphone, 
  AlertCircle,
  X
} from 'lucide-react';
import { gsap } from 'gsap';
import { storage, ID } from '@/server/appwrite';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface FormData {
  title: string;
  version: string;
  file: File | null;
}

const UploadDownloadFiles: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    version: '',
    file: null,
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'loading' | ''>('');
  const [progress, setProgress] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());
  
  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files?.[0]) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setFileInputKey(Date.now());
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    const { title, version, file } = formData;

    if (!title || !version || !file) {
      setUploadStatus('Please fill all fields and select a file!');
      setStatusType('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Initializing Upload...');
    setStatusType('loading');
    setProgress(0);
    setRemainingTime(null);

    try {
      const bucketId = "688cce34002223f15e42"; 
      if (!bucketId) throw new Error('Storage bucket ID is not defined');

      // --- THE FIX ---
      // We force the MIME type to 'application/vnd.android.package-archive'
      // This prevents browsers from treating the APK as a ZIP/JAR file.
      const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, ''); // Clean title for filename
      const fileName = `${sanitizedTitle}_v${version}.apk`;
      
      const renamedFile = new File([file], fileName, {
        type: 'application/vnd.android.package-archive',
        lastModified: file.lastModified,
      });

      // Upload to Appwrite
      const uploadResponse = await storage.createFile(
        bucketId,
        ID.unique(),
        renamedFile
      );

      // Get Download URL
      const downloadUrl = storage.getFileDownload(bucketId, uploadResponse.$id);

      // Save Metadata to Firestore
      await addDoc(collection(db, 'download'), {
        title,
        version,
        link: downloadUrl, // Stores the direct Appwrite view/download link
        appwriteFileId: uploadResponse.$id,
        createdAt: serverTimestamp(),
        fileName: fileName, // Useful for display
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });

      // Simulate Progress (since Appwrite SDK client-side upload doesn't expose stream progress easily)
      let fakeProgress = 0;
      const interval = setInterval(() => {
        fakeProgress += 4;
        const estTimeLeft = ((100 - fakeProgress) / 4 * 0.2).toFixed(1);
        
        if (fakeProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setRemainingTime(null);
          setUploadStatus('Deployment Successful!');
          setStatusType('success');
          setFormData({ title: '', version: '', file: null });
          setFileInputKey(Date.now());
          setIsUploading(false);
        } else {
          setProgress(fakeProgress);
          setRemainingTime(`${estTimeLeft}s`);
          setUploadStatus(`Uploading... ${fakeProgress}%`);
        }
      }, 200);

    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Upload failed. Please try again.');
      setStatusType('error');
      setIsUploading(false);
    }
  };

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".anim-item", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-[#090909] text-gray-200 p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <section className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8 anim-item">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl mb-4 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <Smartphone className="text-red-500 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Deploy Application</h2>
          <p className="text-gray-500 text-sm mt-2">Upload your .apk file to the secure server.</p>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleUpload}
          className="anim-item bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">App Name</label>
            <div className="relative group">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors h-5 w-5" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Kalifa Launcher"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              />
            </div>
          </div>

          {/* Version Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Version Tag</label>
            <div className="relative group">
              <FileCode className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors h-5 w-5" />
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleChange}
                placeholder="v1.0.0"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              />
            </div>
          </div>

          {/* Custom File Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Package File (.apk)</label>
            
            {!formData.file ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#2a2a2a] hover:border-red-500/50 hover:bg-red-500/5 rounded-xl p-8 transition-all group text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-[#1a1a1a] rounded-full group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6 text-gray-400 group-hover:text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-500 mt-1">Maximum file size 500MB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center gap-4 bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                <div className="p-3 bg-red-500/20 rounded-lg">
                   <Smartphone className="h-6 w-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{formData.file.name}</p>
                  <p className="text-xs text-gray-400">{(formData.file.size / (1024*1024)).toFixed(2)} MB</p>
                </div>
                <button 
                  type="button" 
                  onClick={clearFile}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              key={fileInputKey}
              type="file"
              name="file"
              accept=".apk"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!formData.title || !formData.version || !formData.file || isUploading}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-[0.98] ${
              !formData.title || !formData.version || !formData.file
                ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed border border-[#333]'
                : isUploading
                ? 'bg-[#1a1a1a] text-gray-400 cursor-wait border border-[#333]'
                : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:border-red-500 border border-transparent'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Deploy Build <Upload className="h-4 w-4" />
              </span>
            )}
          </button>

          {/* Status & Progress */}
          {(isUploading || statusType) && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className={
                  statusType === 'success' ? 'text-green-400' : 
                  statusType === 'error' ? 'text-red-400' : 
                  'text-gray-400'
                }>
                  {uploadStatus}
                </span>
                {remainingTime && <span className="text-gray-500">{remainingTime} remaining</span>}
              </div>
              
              <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    statusType === 'success' ? 'bg-green-500' :
                    statusType === 'error' ? 'bg-red-500' :
                    'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default UploadDownloadFiles;
