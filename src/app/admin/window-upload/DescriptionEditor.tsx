'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Underline, Italic, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Minus, Image as ImageIcon, Video, 
  Loader2, Plus, Type, X, ChevronDown, Palette, Heading1, Heading2,
  List, ListOrdered, Undo, Redo, Check, Ban
} from 'lucide-react';
import { storage } from '@/server/appwrite';

// --- Interfaces ---
interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  onToast?: (message: string, type: 'success' | 'error') => void;
}

// --- Helper: Hex to RGB ---
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : '';
}

const COLORS = ['#ffffff', '#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#a855f7', '#ec4899', '#64748b'];
const DEFAULT_TEXT_COLOR = '#d1d5db'; // gray-300 matching the editor text

// --- Helper: Upload to Appwrite ---
const uploadToAppwrite = async (file: File, bucketId: string) => {
    const uploaded = await storage.createFile(bucketId, 'unique()', file);
    const url = storage.getFileDownload(bucketId, uploaded.$id);
    return String(url);
};

export default function DescriptionEditor({ value, onChange, onToast }: DescriptionEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null); // Ref for click outside detection
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Single state for menus to ensure only one is open at a time
  const [activeMenu, setActiveMenu] = useState<'color' | 'size' | 'add' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Active State Tracking
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    fontSize: '3', 
    foreColor: 'rgb(209, 213, 219)', // Default gray-300
  });
  
  // Sync initial value
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = value;
    }
  }, []);

  // --- Click Outside Listener ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current && 
        !toolbarRef.current.contains(event.target as Node) && 
        activeMenu !== null
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  // --- Selection Listener ---
  const updateActiveStates = () => {
    if (!document || !editorRef.current) return;
    
    // ✅ Fix 3: Only update state if selection is INSIDE the editor
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const anchorNode = selection.anchorNode;
    // Check if the selection is inside our editor div
    if (!editorRef.current.contains(anchorNode)) {
        return; // Do not reset to default if we clicked outside
    }

    // Get basic booleans
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      fontSize: document.queryCommandValue('fontSize') || '3',
      foreColor: document.queryCommandValue('foreColor') || 'rgb(209, 213, 219)',
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveStates);
    return () => document.removeEventListener('selectionchange', updateActiveStates);
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
    updateActiveStates();
  };

  const toggleMenu = (menu: 'color' | 'size' | 'add') => {
    setActiveMenu(prev => prev === menu ? null : menu);
  };

  // --- Insert Logic ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const bucketId = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
    if (!bucketId) {
        onToast?.('Storage bucket not configured', 'error');
        return;
    }

    setIsUploading(true);
    try {
        const url = await uploadToAppwrite(file, bucketId);
        const imgHtml = `<img src="${url}" class="w-full h-auto rounded-lg my-4 border border-[#333] shadow-lg" loading="lazy" /><br/>`;
        execCmd('insertHTML', imgHtml);
        onToast?.('Image inserted', 'success');
    } catch (err) {
        console.error(err);
        onToast?.('Upload failed', 'error');
    } finally {
        setIsUploading(false);
        setActiveMenu(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleInsertVideo = () => {
    const url = prompt("Enter YouTube Video URL:");
    if (url) {
      let embedUrl = url.trim();
      const ytMatch = embedUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (ytMatch && ytMatch[1]) {
        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
        const videoHtml = `
          <div class="relative w-full aspect-video my-4 rounded-lg overflow-hidden border border-[#333] shadow-lg">
            <iframe src="${embedUrl}" class="absolute top-0 left-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
          </div><br/>
        `;
        execCmd('insertHTML', videoHtml);
      } else {
        onToast?.('Invalid YouTube URL', 'error');
      }
    }
    setActiveMenu(null);
  };

  const handleLink = () => {
    const url = prompt("Enter Link URL:");
    if (url) {
      execCmd('createLink', url);
    }
    setActiveMenu(null);
  };

  const ToolBtn = ({ icon: Icon, action, active = false, label }: any) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); action(); }}
      className={`p-2 rounded-md transition-all duration-200 ${
        active 
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
          : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
      }`}
      title={label}
    >
      <Icon size={16} strokeWidth={active ? 3 : 2.5} />
    </button>
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

      {/* --- Main Toolbar --- */}
      <div ref={toolbarRef} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-2 flex flex-wrap items-center gap-1 shadow-xl relative z-20 select-none">
        
        {/* Undo / Redo */}
        <div className="flex items-center gap-1 pr-2 border-r border-[#333] mr-2">
           <ToolBtn icon={Undo} action={() => execCmd('undo')} label="Undo" />
           <ToolBtn icon={Redo} action={() => execCmd('redo')} label="Redo" />
        </div>

        {/* Text Sizes (Single Menu Logic) */}
        <div className="relative border-r border-[#333] pr-2 mr-2">
           <button 
             type="button"
             onMouseDown={(e) => { e.preventDefault(); toggleMenu('size'); }}
             className={`p-2 rounded-md flex items-center gap-1 transition ${activeMenu === 'size' ? 'text-white bg-[#2a2a2a]' : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'}`}
             title="Font Size"
           >
             <Type size={16} /> <ChevronDown size={12}/>
           </button>
           {activeMenu === 'size' && (
             <div className="absolute top-full left-0 mt-2 bg-[#0f0f0f] border border-[#333] rounded-lg shadow-xl z-50 flex flex-col w-36 overflow-hidden max-h-60 overflow-y-auto">
                {[1, 2, 3, 4, 5, 6, 7].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('fontSize', size.toString()); setActiveMenu(null); }}
                    className={`px-4 py-2 text-left text-sm flex items-center justify-between group ${activeFormats.fontSize == size.toString() ? 'bg-red-900/20 text-red-500' : 'text-gray-300 hover:bg-[#222]'}`}
                  >
                    <span style={{ fontSize: size === 1 ? '10px' : size === 2 ? '13px' : size === 3 ? '16px' : size === 4 ? '18px' : size === 5 ? '24px' : size === 6 ? '32px' : '48px' }}>
                      Size {size}
                    </span>
                    {activeFormats.fontSize == size.toString() && <Check size={12} />}
                  </button>
                ))}
             </div>
           )}
        </div>

        {/* Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-[#333] mr-2">
          <ToolBtn icon={Bold} action={() => execCmd('bold')} active={activeFormats.bold} label="Bold" />
          <ToolBtn icon={Italic} action={() => execCmd('italic')} active={activeFormats.italic} label="Italic" />
          <ToolBtn icon={Underline} action={() => execCmd('underline')} active={activeFormats.underline} label="Underline" />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r border-[#333] mr-2">
          <ToolBtn icon={List} action={() => execCmd('insertUnorderedList')} active={activeFormats.insertUnorderedList} label="Bullet List" />
          <ToolBtn icon={ListOrdered} action={() => execCmd('insertOrderedList')} active={activeFormats.insertOrderedList} label="Number List" />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-2 border-r border-[#333] mr-2">
          <ToolBtn icon={AlignLeft} action={() => execCmd('justifyLeft')} active={activeFormats.justifyLeft} label="Align Left" />
          <ToolBtn icon={AlignCenter} action={() => execCmd('justifyCenter')} active={activeFormats.justifyCenter} label="Align Center" />
          <ToolBtn icon={AlignRight} action={() => execCmd('justifyRight')} active={activeFormats.justifyRight} label="Align Right" />
        </div>

        {/* Colors (Single Menu Logic + Unselect) */}
        <div className="relative">
          <button 
            type="button"
            onMouseDown={(e) => { e.preventDefault(); toggleMenu('color'); }}
            className={`p-2 rounded-md flex items-center gap-1 transition ${activeMenu === 'color' ? 'text-white bg-[#2a2a2a]' : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'}`}
          >
            <Palette size={16} /> <ChevronDown size={12}/>
          </button>
          
          {activeMenu === 'color' && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-[#0f0f0f] border border-[#333] rounded-lg shadow-xl z-50 w-44">
               <div className="grid grid-cols-4 gap-2 mb-2">
                  {COLORS.map(color => {
                    // Check if active (handle RGB vs Hex comparison)
                    const isActive = activeFormats.foreColor === hexToRgb(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); execCmd('foreColor', color); setActiveMenu(null); }}
                        className={`w-6 h-6 rounded-full border transition relative ${isActive ? 'border-white scale-110 ring-2 ring-red-500' : 'border-white/10 hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                      >
                        {isActive && <Check size={10} className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold" />}
                      </button>
                    );
                  })}
               </div>
               
               {/* Unselect / Reset Button */}
               <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); execCmd('foreColor', DEFAULT_TEXT_COLOR); setActiveMenu(null); }}
                  className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md border border-[#333] text-xs text-gray-400 hover:bg-[#222] hover:text-white transition"
               >
                  <Ban size={12} /> Reset Color
               </button>
            </div>
          )}
        </div>

        <div className="flex-1"></div>

        {/* Add Button (Single Menu Logic) */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); toggleMenu('add'); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeMenu === 'add' 
                ? 'bg-red-600 text-white rotate-0' 
                : 'bg-[#2a2a2a] text-gray-300 hover:bg-white hover:text-black'
            }`}
          >
             {activeMenu === 'add' ? <X size={14} /> : <Plus size={14} />} 
             <span className="hidden sm:inline">{activeMenu === 'add' ? 'Close' : 'Add'}</span>
          </button>

          {activeMenu === 'add' && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-[#111] border border-[#333] rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
              <button 
                type="button"
                onClick={() => { fileInputRef.current?.click(); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f1f] text-gray-300 hover:text-white text-sm transition-colors text-left"
              >
                {isUploading ? <Loader2 size={16} className="animate-spin text-red-500" /> : <ImageIcon size={16} className="text-blue-500"/>}
                Insert Image
              </button>
              
              <button 
                type="button"
                onClick={handleInsertVideo}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f1f] text-gray-300 hover:text-white text-sm transition-colors text-left"
              >
                <Video size={16} className="text-red-500"/>
                Insert Video
              </button>

              <button 
                type="button"
                onClick={handleLink}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f1f] text-gray-300 hover:text-white text-sm transition-colors text-left"
              >
                <LinkIcon size={16} className="text-green-500"/>
                Add Link
              </button>

              <div className="h-px bg-[#222] mx-2"></div>

              <button 
                type="button"
                onClick={() => { execCmd('insertHorizontalRule'); setActiveMenu(null); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f1f] text-gray-300 hover:text-white text-sm transition-colors text-left"
              >
                <Minus size={16} className="text-gray-500"/>
                Divider Line
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Editable Area --- */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="
            w-full min-h-[400px] bg-[#0f0f0f] border border-[#333] rounded-xl p-6 
            text-gray-300 font-sans text-base leading-relaxed
            focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all
            
            prose prose-invert max-w-none
            prose-p:my-2 prose-headings:font-bold prose-headings:text-white
            prose-img:rounded-lg prose-hr:border-[#333]
            
            [&_a]:text-blue-400 [&_a]:underline [&_a]:cursor-pointer [&_a]:font-medium
            
            empty:before:content-[attr(placeholder)] empty:before:text-gray-600
        "
        // ✅ Type casting to allow placeholder prop
        {...({ placeholder: "Type something amazing..." } as any)}
        style={{ whiteSpace: 'pre-wrap' }}
      />
      
      <div className="flex justify-between items-center px-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
        <span>Rich Text Editor</span>
        <span>{value.length} Chars</span>
      </div>
    </div>
  );
}
