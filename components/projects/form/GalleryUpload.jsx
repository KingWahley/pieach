import React, { useRef, useState } from 'react';
import MediaPickerModal from '@/components/modals/MediaPickerModal';
import { Icons } from '@/components/shared/Icons';

export default function GalleryUpload({ galleryFiles, setGalleryFiles, errors }) {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files) => {
    // Filter and validate files (e.g., max 5MB, correct type)
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) return false;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return false;
      
      // Check for duplicates by name in newImages
      const isDuplicate = galleryFiles.newImages?.some(f => f.file.name === file.name);
      return !isDuplicate;
    });

    const newFiles = validFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setGalleryFiles(prev => ({
      ...prev,
      newImages: [...(prev.newImages || []), ...newFiles]
    }));
    
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
            <div key={f.id} className="gallery-preview-item">
              <img src={f.previewUrl} alt={f.file.name} />
              <button 
                type="button" 
                className="gallery-preview-remove"
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
