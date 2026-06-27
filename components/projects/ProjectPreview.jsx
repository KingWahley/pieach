'use client';

import React from 'react';
import Modal from '@/components/modals/Modal';
import StatusPill from '@/components/shared/StatusPill';
import { Icons } from '@/components/shared/Icons';

export default function ProjectPreview({ isOpen, onClose, project, onReorderGallery }) {
  const [localOrder, setLocalOrder] = React.useState([]);
  const [draggedIdx, setDraggedIdx] = React.useState(null);

  React.useEffect(() => {
    if (project) {
      const { image, galleryFiles = { existingImages: [], newImages: [] } } = project;
      
      const visibleExisting = (galleryFiles.existingImages || []).filter(
        img => !(galleryFiles.removedImageIds || []).includes(img.id || img.url || img)
      ).map(img => ({
        id: img.id || img.url || img,
        url: img.url || img,
        type: 'existing'
      }));

      const visibleNew = (galleryFiles.newImages || []).map(img => ({
        id: img.id,
        url: img.previewUrl || (img instanceof File ? URL.createObjectURL(img) : img.url || img),
        type: 'new',
        original: img
      }));

      setLocalOrder([
        ...(image ? [{ id: 'main', url: image, type: 'main' }] : []),
        ...visibleExisting,
        ...visibleNew
      ]);
    }
  }, [project, isOpen]);

  if (!project) return null;

  const {
    title = 'Project Title',
    subtitle = 'Project Subtitle',
    description = 'Project description goes here...',
    location = 'Location',
    category = 'Category',
    status = 'Ongoing',
    additionalFields = []
  } = project;

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    // Add a ghost image or styling
    setTimeout(() => {
      e.target.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIdx(null);
  };

  const handleDragEnter = (e, targetIdx) => {
    if (draggedIdx === null || draggedIdx === targetIdx) return;

    const newOrder = [...localOrder];
    const itemToMove = newOrder[draggedIdx];
    newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, itemToMove);
    
    setLocalOrder(newOrder);
    setDraggedIdx(targetIdx);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (onReorderGallery) {
      onReorderGallery(localOrder);
    }
  };

  const previewImages = localOrder.map(img => img.url);
  const mainImage = previewImages[0] || null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Project Live Preview"
      actions={
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--ink-mid)', fontStyle: 'italic' }}>
            <Icons.info style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />
            Drag gallery images below to rearrange their display order
          </span>
          <button className="primary-btn" onClick={onClose}>Close Preview</button>
        </div>
      }
    >
      <div className="project-preview-container">
        <style jsx>{`
          .project-preview-container {
            font-family: 'Verdana', sans-serif;
            color: var(--ink);
            max-width: 1000px;
            margin: 0 auto;
          }
          .preview-hero {
            position: relative;
            height: 400px;
            background: ${mainImage ? `url(${mainImage})` : 'linear-gradient(135deg, var(--burgundy) 0%, var(--gold-dark) 100%)'};
            background-size: cover;
            background-position: center;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 40px;
            display: flex;
            align-items: flex-end;
            padding: 40px;
            transition: background 0.4s ease;
          }
          .preview-hero::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
          }
          .hero-content {
            position: relative;
            z-index: 1;
            color: white;
          }
          .hero-content h1 {
            font-size: 42px;
            margin-bottom: 8px;
            font-weight: 700;
          }
          .hero-content p {
            font-size: 18px;
            opacity: 0.9;
          }
          .preview-content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 60px;
            margin-bottom: 60px;
          }
          .preview-section-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--gold-dark);
            font-weight: bold;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--stone);
            padding-bottom: 8px;
          }
          .preview-description {
            font-size: 15px;
            line-height: 1.8;
            color: var(--ink-mid);
            margin-bottom: 30px;
          }
          .preview-info-card {
            background: var(--cream);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid var(--stone);
          }
          .info-item {
            margin-bottom: 20px;
          }
          .info-label {
            font-size: 10px;
            text-transform: uppercase;
            color: var(--ink-light);
            margin-bottom: 4px;
          }
          .info-value {
            font-size: 14px;
            font-weight: bold;
            color: var(--burgundy);
          }
          .additional-field {
            margin-bottom: 32px;
          }
          .additional-field h3 {
            font-size: 18px;
            color: var(--burgundy);
            margin-bottom: 12px;
          }
          .additional-field p {
            font-size: 14px;
            line-height: 1.6;
            color: var(--ink-mid);
          }
          .preview-gallery {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 250px;
            gap: 20px;
            margin-top: 40px;
          }
          .gallery-item {
            border-radius: 12px;
            background-size: cover;
            background-position: center;
            border: 1px solid var(--stone);
            transition: all 0.3s ease;
            cursor: grab;
            position: relative;
          }
          .gallery-item:active {
            cursor: grabbing;
          }
          .gallery-item:hover {
            transform: scale(1.02);
            border-color: var(--gold);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .gallery-item::before {
            content: 'Arrange';
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.6);
            color: white;
            font-size: 9px;
            padding: 3px 6px;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.2s;
          }
          .gallery-item:hover::before {
            opacity: 1;
          }
          .gallery-item:first-child {
            grid-row: span 2;
          }
          .gallery-item:first-child::after {
            content: 'MAIN HERO';
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: var(--gold);
            color: var(--burgundy);
            font-size: 9px;
            font-weight: bold;
            padding: 3px 8px;
            border-radius: 4px;
            letter-spacing: 0.05em;
          }
          @media (max-width: 768px) {
            .preview-content-grid {
              grid-template-columns: 1fr;
              gap: 30px;
            }
            .preview-hero {
              height: 300px;
              padding: 20px;
            }
            .hero-content h1 {
              font-size: 28px;
            }
          }
        `}</style>

        <div className="preview-hero">
          <div className="hero-content">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="preview-content-grid">
          <div className="preview-main">
            <div className="preview-section">
              <div className="preview-section-title">Overview</div>
              <div className="preview-description">{description}</div>
            </div>

            {additionalFields.map((field) => (
              <div key={field.id} className="additional-field">
                <h3>{field.title}</h3>
                <p>{field.body}</p>
              </div>
            ))}

            {localOrder.length > 0 && (
              <div className="preview-section" style={{ marginTop: '40px' }}>
                <div className="preview-section-title">Gallery</div>
                <div className="preview-gallery">
                  {localOrder.map((img, i) => (
                    <div 
                      key={img.id || i} 
                      className="gallery-item" 
                      style={{ 
                        backgroundImage: `url(${img.url})`,
                        opacity: draggedIdx === i ? 0.4 : 1
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, i)}
                      onDragEnter={(e) => handleDragEnter(e, i)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="preview-sidebar">
            <div className="preview-info-card">
              <div className="preview-section-title" style={{ borderColor: 'var(--stone-dark)' }}>Project Details</div>
              
              <div className="info-item">
                <div className="info-label">Location</div>
                <div className="info-value">{location}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Category</div>
                <div className="info-value">{category}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Status</div>
                <div className="info-value">
                  <StatusPill status={status} />
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Images</div>
                <div className="info-value">{previewImages.length} Professional Photos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
