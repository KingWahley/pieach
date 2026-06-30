import React, { useRef, useState } from 'react';
import MediaPickerModal from '@/components/modals/MediaPickerModal';
import { Icons } from '@/components/shared/Icons';
import { mediaStore } from '@/lib/store';
import { uploadFile } from '@/lib/upload';

export default function GalleryUpload({ galleryFiles, setGalleryFiles, coverImage, setCoverImage, errors }) {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files) => {
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) return false;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return false;
      return true;
    });

    if (validFiles.length === 0) return;

    const tempObjects = validFiles.map(file => {
      const tempUrl = URL.createObjectURL(file);
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return { id: tempId, file, previewUrl: tempUrl, progress: 0, status: 'uploading' };
    });

    setGalleryFiles(prev => ({
      ...prev,
      newImages: [...(prev.newImages || []), ...tempObjects]
    }));

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

        setGalleryFiles(prev => ({
          ...prev,
          newImages: (prev.newImages || []).map(img =>
            img.id === tempObj.id ? { ...img, previewUrl: finalUrl, status: 'success', progress: 100 } : img
          )
        }));

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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLibrarySelect = (urls) => {
    const newExisting = urls.map(url => ({
      id: url,
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
      // If this was the cover, clear the cover
      if (fileToRemove && fileToRemove.previewUrl && coverImage === fileToRemove.previewUrl) {
        setCoverImage('');
      }
      if (fileToRemove && fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return {
        ...prev,
        newImages: (prev.newImages || []).filter(f => f.id !== idToRemove)
      };
    });
  };

  const handleRemoveExisting = (idToRemove, urlToRemove) => {
    // If this was the cover, clear it
    if (coverImage && coverImage === urlToRemove) {
      setCoverImage('');
    }
    setGalleryFiles(prev => ({
      ...prev,
      removedImageIds: [...(prev.removedImageIds || []), idToRemove]
    }));
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = () => setIsDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const visibleExistingImages = (galleryFiles.existingImages || []).filter(
    img => !(galleryFiles.removedImageIds || []).includes(img.id || img.url || img)
  );

  const hasImages = visibleExistingImages.length > 0 || (galleryFiles.newImages && galleryFiles.newImages.length > 0);

  // ── Helper: is this URL the current cover? ──────────────────────────────
  const isCover = (url) => coverImage && coverImage === url;

  return (
    <div className="form-field full">
      <div className="flex justify-between items-center mb-2">
        <label className="mb-0">
          Gallery {errors?.gallery && (
            <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>{errors.gallery}</span>
          )}
        </label>
        <button
          type="button"
          onClick={() => setIsMediaPickerOpen(true)}
          className="text-[9px] font-black text-[#D5A73F] uppercase tracking-wider flex items-center gap-1 hover:text-[#32171B] transition-colors"
        >
          <Icons.media className="w-2.5 h-2.5" />
          Choose from Library
        </button>
      </div>

      {/* Drop zone */}
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
        <span>Click to upload or drag &amp; drop</span>
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

      {/* ── Cover image indicator ────────────────────────────────────────── */}
      {coverImage && (
        <div style={{
          marginTop: '10px',
          padding: '7px 10px',
          background: 'var(--gold-light)',
          border: '1px solid var(--gold-dark)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '10px',
          color: 'var(--burgundy)',
          fontWeight: 'bold'
        }}>
          <img src={coverImage} alt="Cover" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--gold-dark)' }} />
          <span>⭐ This image is set as the project cover</span>
          <button
            type="button"
            onClick={() => setCoverImage('')}
            style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--ink-light)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      )}

      {/* ── Gallery grid ─────────────────────────────────────────────────── */}
      {hasImages && (
        <div className="gallery-preview-grid">

          {/* Existing images (from DB or media library) */}
          {visibleExistingImages.map((img, idx) => {
            const url = img.url || img;
            const cover = isCover(url);
            return (
              <div
                key={img.id || `ext-${idx}`}
                className="gallery-preview-item group"
                style={{
                  outline: cover ? '2.5px solid #D5A73F' : 'none',
                  outlineOffset: cover ? '-2px' : '0'
                }}
              >
                <img src={url} alt={`Gallery image ${idx + 1}`} />

                {/* Cover badge */}
                {cover && (
                  <div style={{
                    position: 'absolute', top: 4, left: 4, zIndex: 20,
                    background: '#D5A73F', borderRadius: '50%',
                    width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                  }}>⭐</div>
                )}

                {/* Hover action overlay */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 15,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                  opacity: 0, transition: 'opacity 0.18s',
                  pointerEvents: 'none'
                }} className="gallery-item-overlay">
                  {!cover && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCoverImage(url); }}
                      style={{
                        fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase',
                        letterSpacing: '0.05em', color: '#32171B',
                        background: '#D5A73F', border: 'none', borderRadius: 4,
                        padding: '4px 8px', cursor: 'pointer', whiteSpace: 'nowrap',
                        pointerEvents: 'auto'
                      }}
                    >
                      ⭐ Set as Cover
                    </button>
                  )}
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  className="gallery-preview-remove z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExisting(img.id || img.url || img, url);
                  }}
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            );
          })}

          {/* Newly uploaded images */}
          {(galleryFiles.newImages || []).map(f => {
            const url = f.previewUrl;
            const cover = isCover(url);
            const isUploading = f.status === 'uploading';
            return (
              <div
                key={f.id}
                className="gallery-preview-item group relative overflow-hidden"
                style={{
                  outline: cover ? '2.5px solid #D5A73F' : 'none',
                  outlineOffset: cover ? '-2px' : '0'
                }}
              >
                <img src={url} alt={f.file?.name || 'New image'} />

                {/* Cover badge */}
                {cover && (
                  <div style={{
                    position: 'absolute', top: 4, left: 4, zIndex: 20,
                    background: '#D5A73F', borderRadius: '50%',
                    width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                  }}>⭐</div>
                )}

                {/* Upload progress overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-neutral-900/75 flex flex-col items-center justify-center p-2 z-10">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-[#D5A73F] rounded-full animate-spin mb-1.5"></div>
                    <span className="font-sans font-bold text-[8px] text-white tracking-widest uppercase">
                      {f.progress || 0}%
                    </span>
                    <div className="w-12 h-1 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-[#D5A73F] transition-all duration-300" style={{ width: `${f.progress || 0}%` }} />
                    </div>
                  </div>
                )}

                {/* Error overlay */}
                {f.status === 'error' && (
                  <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center p-2 z-10 text-center">
                    <svg className="w-5 h-5 text-white mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-sans font-black text-[7px] text-white tracking-wider uppercase">Failed</span>
                  </div>
                )}

                {/* Hover overlay — "Set as Cover" only shown after upload succeeds */}
                {!isUploading && f.status !== 'error' && (
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 15,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 4,
                    opacity: 0, transition: 'opacity 0.18s',
                    pointerEvents: 'none'
                  }} className="gallery-item-overlay">
                    {!cover && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverImage(url); }}
                        style={{
                          fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase',
                          letterSpacing: '0.05em', color: '#32171B',
                          background: '#D5A73F', border: 'none', borderRadius: 4,
                          padding: '4px 8px', cursor: 'pointer', whiteSpace: 'nowrap',
                          pointerEvents: 'auto'
                        }}
                      >
                        ⭐ Set as Cover
                      </button>
                    )}
                  </div>
                )}

                {/* Remove button */}
                <button
                  type="button"
                  className="gallery-preview-remove z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveNew(f.id);
                  }}
                  aria-label={`Remove image`}
                >
                  ×
                </button>
              </div>
            );
          })}
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
