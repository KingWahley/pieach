'use client';

import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { useStore } from '@/hooks/useStore';
import { mediaStore } from '@/lib/store';
import { Icons } from '@/components/shared/Icons';

export default function MediaPickerModal({ isOpen, onClose, onSelect, title = "Select Media", allowMultiple = false }) {
  const { data } = useStore(mediaStore);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const images = useMemo(() => {
    return data.filter(item => 
      item.type.startsWith('image/') && 
      (item.filename.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [data, searchQuery]);

  const toggleSelection = (id) => {
    if (allowMultiple) {
      setSelectedIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const handleSelect = () => {
    if (allowMultiple) {
      const selectedItems = data.filter(item => selectedIds.includes(item.id));
      onSelect(selectedItems.map(item => item.url));
    } else {
      const selected = data.find(item => item.id === selectedIds[0]);
      if (selected) {
        onSelect(selected.url);
      }
    }
    onClose();
    setSelectedIds([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#DDD5C8] rounded text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSelect}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2 rounded text-[11px] font-bold transition-all ${
              selectedIds.length > 0
                ? 'bg-[#32171B] text-white hover:bg-[#1A1410]' 
                : 'bg-[#FAF7F2] text-[#DDD5C8] cursor-not-allowed border border-[#DDD5C8]'
            }`}
          >
            {allowMultiple ? `Select ${selectedIds.length} Images` : 'Select Image'}
          </button>
        </div>
      }
    >
      <div className="media-picker-content">
        <style jsx>{`
          .media-picker-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 4px;
          }
          .search-bar {
            position: relative;
            margin-bottom: 10px;
          }
          .search-bar input {
            width: 100%;
            padding: 12px 16px 12px 40px;
            background: #FAF7F2;
            border: 1px solid #DDD5C8;
            border-radius: 8px;
            font-size: 13px;
            outline: none;
            transition: all 0.2s;
          }
          .search-bar input:focus {
            border-color: #D5A73F;
            background: #FFF;
          }
          .search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #9A8C82;
          }
          .media-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
            max-height: 400px;
          }
          .media-item {
            aspect-ratio: 1;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            background: #FAF7F2;
          }
          .media-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .media-item.selected {
            border-color: #D5A73F;
            box-shadow: 0 0 0 4px rgba(213, 167, 63, 0.1);
          }
          .media-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .selection-indicator {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 20px;
            height: 20px;
            background: #D5A73F;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transform: scale(0);
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .media-item.selected .selection-indicator {
            transform: scale(1);
          }
          .empty-media {
            grid-column: 1 / -1;
            padding: 40px;
            text-align: center;
            color: #9A8C82;
            font-size: 13px;
          }
        `}</style>

        <div className="search-bar">
          <div className="search-icon">
            <Icons.search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Search images by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="media-grid">
          {images.length > 0 ? (
            images.map((item) => (
              <div 
                key={item.id} 
                className={`media-item ${selectedIds.includes(item.id) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item.id)}
                onDoubleClick={() => {
                  if (!allowMultiple) {
                    onSelect(item.url);
                    onClose();
                  }
                }}
              >
                <img src={item.url} alt={item.filename} />
                <div className="selection-indicator">
                  <Icons.check className="w-3 h-3" />
                </div>
              </div>
            ))
          ) : (
            <div className="empty-media">
              No images found in your library.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
