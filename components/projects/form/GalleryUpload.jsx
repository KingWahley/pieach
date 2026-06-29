import React, { useRef, useState } from 'react';
import MediaPickerModal from '@/components/modals/MediaPickerModal';
import { Icons } from '@/components/shared/Icons';
import { supabase } from '@/lib/supabase/client';
import { mediaStore } from '@/lib/store';
import { uploadFile } from '@/lib/upload';

export default function GalleryUpload({ galleryFiles, setGalleryFiles, errors }) {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files) => {
    // Filter and validate files (e.g., max 5MB, correct type)
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) return false;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return false;
      return true;
    });

    if (validFiles.length === 0) return;

    // Create temp objects for the preview grid immediately in one batch update
    const tempObjects = validFiles.map(file => {
      const tempUrl = URL.createObjectURL(file);
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        id: tempId,
        file,
        previewUrl: tempUrl,
        progress: 0,
        status: 'uploading'
      };
    });

    setGalleryFiles(prev => ({
      ...prev,
      newImages: [...(prev.newImages || []), ...tempObjects]
    }));

    // Start all uploads concurrently
    const uploadPromises = tempObjects.map(async (tempObj) => {
      try {
        const finalUrl = await uploadFile(tempObj.file, 'media', '', (progress) => {
          setGalleryFiles(prev => ({
            ...prev,
            newImages: (prev.newImages || []).map(img => 
              img.id === tempObj.id ? { ...img, progress } : img
            )
          }));
        });

        // Set status to success and save the final Supabase URL
        setGalleryFiles(prev => ({
          ...prev,
          newImages: (prev.newImages || []).map(img => 
            img.id === tempObj.id ? { ...img, previewUrl: finalUrl, status: 'success', progress: 100 } : img
          )
        }));

        // Register in media store
        const newAsset = {
          name: tempObj.file.name,
          url: finalUrl,
          size: (tempObj.file.size / (1024 * 1024)).toFixed(1) + ' MB',
          type: tempObj.file.type
        };
        mediaStore.createItem(newAsset);
      } catch (err) {
        console.error('Error uploading gallery image:', err);
        setGalleryFiles(prev => ({
          ...prev,
          newImages: (prev.newImages || []).map(img => 
            img.id === tempObj.id ? { ...img, status: 'error' } : img
          )
        }));
      }
    });

    await Promise.all(uploadPromises);

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  const handleLibrarySelect = (urls) => {
    const newExisting = urls.map(url => ({
      id: `lib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url
    }));

    setGalleryFiles(prev => ({
      ...prev,
      existingImages: [...(prev.existingImages || []), ...newExisting]
    }));
  };

  const handleRemoveNew = (idToRemove) => {
    setGalleryFiles(prev => {
      const fileToRemove = (prev.newImages || []).find(f => f.id === idToRemove);
      if (fileToRemove && fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return {
        ...prev,
        newImages: (prev.newImages || []).filter(f => f.id !== idToRemove)
      };
    });
  };

  const handleRemoveExisting = (idToRemove) => {
    setGalleryFiles(prev => ({
      ...prev,
      removedImageIds: [...(prev.removedImageIds || []), idToRemove]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const visibleExistingImages = (galleryFiles.existingImages || []).filter(
    img => !(galleryFiles.removedImageIds || []).includes(img.id || img.url)
  );
  
  const hasImages = visibleExistingImages.length > 0 || (galleryFiles.newImages && galleryFiles.newImages.length > 0);

  return (
    <div className="form-field full">
      <div className="flex justify-between items-center mb-2">
        <label className="mb-0">Gallery {errors?.gallery && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>{errors.gallery}</span>}</label>
        <button 
          type="button"
          onClick={() => setIsMediaPickerOpen(true)}
          className="text-[9px] font-black text-[#D5A73F] uppercase tracking-wider flex items-center gap-1 hover:text-[#32171B] transition-colors"
        >
          <Icons.media className="w-2.5 h-2.5" />
          Choose from Library
        </button>
      </div>
      <div 
        className={`gallery-upload ${isDragActive ? 'drag-active' : ''}`}
        style={errors?.gallery ? { borderColor: 'var(--red)' } : {}}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload gallery images"
      >
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
          <path d="M3 13h10V5H3v8z" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 9l2-2 2 2 1-1 2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="11.5" cy="6.5" r=".8" fill="currentColor"/>
        </svg>
        <span>Click to upload or drag & drop</span>
        <span style={{ fontSize: '9px', opacity: 0.7 }}>JPG, PNG, WEBP (Max 5MB)</span>
      </div>
      
      <input 
        type="file" 
        multiple 
        accept="image/jpeg, image/png, image/webp" 
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {hasImages && (
        <div className="gallery-preview-grid">
          {/* Render existing images */}
          {visibleExistingImages.map((img, idx) => (
            <div key={img.id || `ext-${idx}`} className="gallery-preview-item" style={{ position: 'relative' }}>
              <img src={img.url || img} alt={`Existing image ${idx + 1}`} />
              <button 
                type="button" 
                className="gallery-preview-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveExisting(img.id || img.url || img);
                }}
                aria-label={`Remove existing image`}
              >
                ×
              </button>
            </div>
          ))}
          
          {/* Render new images */}
          {(galleryFiles.newImages || []).map(f => (
            <div key={f.id} className="gallery-preview-item relative group overflow-hidden">
              <img src={f.previewUrl} alt={f.file.name} />
              
              {f.status === 'uploading' && (
                <div className="absolute inset-0 bg-neutral-900/75 flex flex-col items-center justify-center p-2 z-10">
                  {/* CSS-only spinner */}
                  <div className="w-5 h-5 border-2 border-white/20 border-t-[#D5A73F] rounded-full animate-spin mb-1.5"></div>
                  <span className="font-sans font-bold text-[8px] text-white tracking-widest uppercase">
                    {f.progress || 0}%
                  </span>
                  <div className="w-12 h-1 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="h-full bg-[#D5A73F] transition-all duration-300" 
                      style={{ width: `${f.progress || 0}%` }}
                    />
                  </div>
                </div>
              )}

              {f.status === 'error' && (
                <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center p-2 z-10 text-center">
                  <svg className="w-5 h-5 text-white mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-sans font-black text-[7px] text-white tracking-wider uppercase">Failed</span>
                </div>
              )}

              <button 
                type="button" 
                className="gallery-preview-remove z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveNew(f.id);
                }}
                aria-label={`Remove image ${f.file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <MediaPickerModal 
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleLibrarySelect}
        title="Select Gallery Images"
        allowMultiple={true}
      />
    </div>
  );
}
