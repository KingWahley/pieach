'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '@/components/shared/Icons';
import { supabase } from '@/lib/supabase/client';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import MediaPickerModal from '@/components/modals/MediaPickerModal';
import { generateBlogContent } from '@/lib/blogUtils';
import { mediaStore } from '@/lib/store';
import { uploadFile } from '@/lib/upload';

export default function BlogForm({ initialData, onSave, onCancel, isNew = false }) {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) return;
    const tempUrl = URL.createObjectURL(file);
    handleChange('image', tempUrl);

    try {
      const finalUrl = await uploadFile(file, 'media');
      handleChange('image', finalUrl);

      // Save to media store (reflect in media library and Supabase)
      const newAsset = {
        name: file.name,
        url: finalUrl,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: file.type
      };
      mediaStore.createItem(newAsset);
    } catch (err) {
      console.error('Error uploading/registering media:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    handleChange('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    category: 'Architecture',
    author: 'Admin',
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    tags: [],
    tagInput: '',
    seoTitle: '',
    metaDescription: '',
    slug: '',
    image: '',
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ 
        ...prev, 
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags : []
      }));
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && formData.tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, prev.tagInput.trim()],
          tagInput: ''
        }));
      } else {
        setFormData(prev => ({ ...prev, tagInput: '' }));
      }
    }
  };

  const handleMagicGenerate = () => {
    const generated = generateBlogContent(formData.title, formData.category);
    handleChange('content', generated);
    
    // Also auto-generate SEO if empty
    if (!formData.seoTitle && formData.title) {
      handleChange('seoTitle', `${formData.title} | Pieach CMS`);
    }
    if (!formData.metaDescription && formData.excerpt) {
      handleChange('metaDescription', formData.excerpt);
    }
    if (!formData.slug && formData.title) {
      handleChange('slug', formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const executeSave = (statusOverride) => {
    const { tagInput, ...formDataWithoutTag } = formData;
    const finalData = {
      ...formDataWithoutTag,
      status: statusOverride || formData.status
    };
    onSave(finalData);
    setIsPublishModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Main Form Section */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2]">
          <h2 className="text-[11px] font-bold text-[#32171B] tracking-[0.2em] uppercase">
            {isNew ? 'ADD BLOG POST FORM' : 'EDIT BLOG POST FORM'}
          </h2>
        </div>
        
        <div className="p-8 flex flex-col gap-6">
          {/* Post Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">POST TITLE</label>
            <input 
              type="text" 
              placeholder="Enter blog post title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">CATEGORY</label>
              <select 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] text-[#32171B]"
              >
                <option value="Architecture">Architecture</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Project Insights">Project Insights</option>
                <option value="Studio News">Studio News</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">AUTHOR</label>
              <input 
                type="text" 
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">POST STATUS</label>
              <select 
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] text-[#32171B]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">PUBLISH DATE</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Featured Image</label>
              <button 
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="text-[9px] font-black text-[#D5A73F] uppercase tracking-wider flex items-center gap-1 hover:text-[#32171B] transition-colors"
              >
                <Icons.media className="w-2.5 h-2.5" />
                Choose from Library
              </button>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <div 
              className={`photo-upload-area ${formData.image ? 'has-image' : ''}`}
              style={{ 
                borderColor: isDragging && !formData.image ? 'var(--gold)' : '',
                backgroundColor: isDragging && !formData.image ? 'var(--gold-light)' : '',
                aspectRatio: '32/9',
                padding: '20px 10px',
              }}
              onClick={() => { if (!formData.image) fileInputRef.current?.click() }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {formData.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image} alt="Preview" className="photo-preview" />
                  <button 
                    type="button"
                    className="photo-remove"
                    onClick={handleRemoveImage}
                    title="Remove image"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <svg className="photo-upload-icon text-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div className="photo-upload-text">Click to upload or drag and drop image here</div>
                </>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">EXCERPT</label>
            <textarea 
              placeholder="Write a short summary for the blog listing page."
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
            />
          </div>

          {/* Blog Content */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">BLOG CONTENT</label>
              <button 
                type="button"
                onClick={handleMagicGenerate}
                className="text-[9px] font-black text-[#D5A73F] uppercase tracking-wider flex items-center gap-1 hover:text-[#32171B] transition-colors"
              >
                <Icons.pencil className="w-2.5 h-2.5" />
                Magic Generate Content
              </button>
            </div>
            <textarea 
              placeholder="Write the full blog post content here."
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[150px] resize-vertical"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">TAGS</label>
            <input 
              type="text" 
              placeholder="Enter tag and press Enter"
              value={formData.tagInput}
              onChange={(e) => handleChange('tagInput', e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.tags.map((tag, i) => (
                <div key={i} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#D5A73F] rounded-full text-[11px] font-bold text-[#32171B] flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="text-[#D5A73F] hover:text-[#32171B] transition-colors">&times;</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2]">
          <h2 className="text-[11px] font-bold text-[#32171B] tracking-[0.2em] uppercase">SEO SETTINGS</h2>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">SEO TITLE</label>
            <input 
              type="text" 
              placeholder="Enter SEO title"
              value={formData.seoTitle}
              onChange={(e) => handleChange('seoTitle', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">META DESCRIPTION</label>
            <textarea 
              placeholder="Enter meta description for search engines."
              value={formData.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">URL SLUG</label>
            <input 
              type="text" 
              placeholder="e.g. designing-homes-that-breathe"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pb-4">
        <button 
          type="button"
          onClick={onCancel}
          className="px-8 py-3 bg-white border border-[#DDD5C8] rounded-md text-[13px] font-bold text-[#32171B] hover:bg-gray-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button 
          type="button"
          onClick={() => executeSave('draft')}
          className="px-8 py-3 bg-white border border-[#DDD5C8] rounded-md text-[13px] font-bold text-[#32171B] hover:bg-gray-50 transition-all shadow-sm"
        >
          Save as Draft
        </button>
        <button 
          type="button"
          onClick={() => setIsPublishModalOpen(true)}
          className="px-8 py-3 bg-[#32171B] text-white rounded-md text-[13px] font-bold hover:bg-[#4a2228] transition-all shadow-sm flex items-center gap-2"
        >
          <Icons.check className="w-4 h-4" />
          {initialData?.status === 'published' ? 'Update & Publish' : 'Publish Post'}
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={() => executeSave('published')}
        title="Confirm Publication"
        message="Are you sure you want to publish this blog post? It will be immediately visible to all website visitors."
        confirmText="Yes, Publish Now"
        type="primary"
      />

      <MediaPickerModal 
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => handleChange('image', url)}
        title="Select Featured Image"
      />
    </div>
  );
}
