'use client';

import React, { useState, useRef, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { mediaStore, projectsStore, blogStore } from '@/lib/store';
import { uploadFile } from '@/lib/upload';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useViewMode } from '@/hooks/useViewMode';
import Pagination from '@/components/shared/Pagination';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Toast from '@/components/shared/Toast';

export default function MediaPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(mediaStore);
  const { data: projectsData } = useStore(projectsStore);
  const { data: blogData } = useStore(blogStore);

  // Build a map of media URL -> array of project/blog names that reference it
  const usageMap = useMemo(() => {
    const map = {};
    const add = (url, label) => {
      if (!url || typeof url !== 'string') return;
      if (!map[url]) map[url] = [];
      if (!map[url].includes(label)) map[url].push(label);
    };
    (projectsData || []).forEach(p => {
      const name = p.title || p.name || 'Untitled Project';
      if (p.image) add(p.image, name);
      if (Array.isArray(p.gallery)) p.gallery.forEach(u => add(u, name));
    });
    (blogData || []).forEach(b => {
      const name = b.title || 'Blog Post';
      if (b.image) add(b.image, name);
    });
    return map;
  }, [projectsData, blogData]);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'dateAdded', order: 'desc' });
  
  const [view, setView] = useViewMode();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const fileInputRef = useRef(null);

  // Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedIds([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page and selection when search changes
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [searchQuery]);

  const toggleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(file => file.id));
    }
  };

  const handleBulkDelete = () => {
    setIsBulkDelete(true);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      const count = selectedIds.length;
      selectedIds.forEach(id => deleteItem(id));
      setSelectedIds([]);
      setIsBulkDelete(false);
      setToast({ message: `${count} asset(s) deleted from Media Library.`, type: 'success' });
    } else if (selectedFile) {
      const name = selectedFile.filename || selectedFile.name || 'file';
      deleteItem(selectedFile.id);
      setSelectedFile(null);
      setToast({ message: `"${name}" deleted from Media Library.`, type: 'success' });
    }
    setIsDeleteModalOpen(false);
  };

  const parseSizeToBytes = (sizeStr) => {
    if (!sizeStr) return 0;
    const cleanStr = String(sizeStr).trim().toUpperCase();
    const value = parseFloat(cleanStr);
    if (isNaN(value)) return 0;
    
    if (cleanStr.includes('GB')) {
      return value * 1024 * 1024 * 1024;
    } else if (cleanStr.includes('MB')) {
      return value * 1024 * 1024;
    } else if (cleanStr.includes('KB')) {
      return value * 1024;
    }
    return value;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const stats = useMemo(() => {
    const totalBytes = data.reduce((acc, file) => acc + parseSizeToBytes(file.size), 0);
    return [
      { label: 'Total Files', value: data.length },
      { label: 'Project Images', value: data.filter(i => i.usage === 'Project' || i.type?.includes('image')).length },
      { label: 'Documents', value: data.filter(i => !i.type?.includes('image')).length },
      { label: 'Storage Used', value: formatBytes(totalBytes) }
    ];
  }, [data]);

  const handleSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const tempUrl = URL.createObjectURL(file);
      const tempId = `m_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      const tempAsset = {
        id: tempId,
        filename: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        dateAdded: new Date().toISOString().split('T')[0],
        url: tempUrl,
        usage: 'Project',
        altText: '',
        caption: '',
        usedIn: []
      };
      createItem(tempAsset);

      try {
        const finalUrl = await uploadFile(file, 'media');
        updateItem(tempId, { url: finalUrl });
      } catch (err) {
        console.error('Error uploading/registering media asset:', err);
      }
    }
  };

  const handleDownloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    }
  };
  const handleBulkDownload = async () => {
    const selectedFiles = data.filter(file => selectedIds.includes(file.id));
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      handleDownloadFile(file.url, file.filename);
      if (i < selectedFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  };

  return (
    <DashboardLayout title="Media Library" subtitle="Manage images, documents, and other assets">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-[var(--stone-dark)] border-t-4 border-t-[var(--gold)] rounded-xl p-5 shadow-sm">
              <div className="text-2xl font-bold text-[var(--burgundy)]">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--ink-light)] mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 relative">
            <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-light)]" />
            <input 
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--stone-dark)] rounded-xl text-sm focus:outline-none focus:border-[var(--gold)] shadow-sm transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <button 
                  onClick={handleBulkDownload}
                  className="flex items-center gap-2 bg-[var(--gold)] text-[var(--burgundy)] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[var(--gold-dark)] transition-colors shadow-md"
                >
                  <Icons.download className="w-4 h-4" />
                  Download ({selectedIds.length})
                </button>
                <button 
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 bg-[var(--red)] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[var(--red-dark)] transition-colors shadow-md"
                >
                  <Icons.trash className="w-4 h-4" />
                  Delete ({selectedIds.length})
                </button>
              </div>
            )}
            <GridToggle view={view} onViewChange={setView} />
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              multiple 
              className="hidden"
            />
            <button 
              className="flex items-center gap-2 bg-[var(--burgundy)] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[var(--burgundy-mid)] transition-colors shadow-md"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icons.plus className="w-4 h-4" />
              Upload Assets
            </button>
          </div>
        </div>

        {/* Main Split Content */}
        <div className="flex flex-1 gap-6 min-h-0">
          {/* Left: Media Grid/List */}
          <div className={`flex-1 bg-white border border-[var(--stone-dark)] rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 ${selectedFile ? 'flex-[1.5]' : ''}`}>
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              {filteredAndSortedData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <EmptyState 
                    title="No media found" 
                    message="Try a different search query or upload new files." 
                  />
                </div>
              ) : view === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {paginatedData.map((file) => (
                    <div 
                      key={file.id}
                      onClick={() => handleSelect(file)}
                      className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 relative ${
                        selectedFile?.id === file.id 
                          ? 'border-[var(--gold)] bg-[var(--gold-light)] shadow-md' 
                          : 'border-[var(--stone-dark)] bg-[var(--white)] hover:border-[var(--gold)] hover:shadow-lg'
                      }`}
                    >
                      {/* Selection Checkbox Overlay */}
                      <div 
                        className={`absolute top-2 left-2 z-20 transition-opacity duration-200 ${
                          selectedIds.includes(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        onClick={(e) => toggleSelect(file.id, e)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedIds.includes(file.id) 
                            ? 'bg-[var(--gold)] border-[var(--gold)] text-[var(--burgundy)]' 
                            : 'bg-white/80 border-[var(--stone-dark)] backdrop-blur'
                        }`}>
                          {selectedIds.includes(file.id) && <Icons.check className="w-3.5 h-3.5 font-bold" />}
                        </div>
                      </div>

                      <div className="aspect-square bg-[var(--cream)] flex items-center justify-center overflow-hidden relative">
                        {file.type?.includes('image') ? (
                          <img 
                            src={file.url} 
                            alt={file.filename} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          />
                        ) : (
                          <Icons.document className="w-10 h-10 text-[var(--ink-light)]" />
                        )}
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-md text-[8px] font-bold uppercase tracking-tight shadow-sm">
                          {file.type?.split('/')[1] || 'File'}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFile(file.url, file.filename);
                          }}
                          className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 bg-white/90 hover:bg-[var(--gold)] text-[var(--burgundy)] hover:text-white rounded-lg shadow-md backdrop-blur"
                          title="Download Asset"
                        >
                          <Icons.download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="text-[11px] font-bold text-[var(--ink)] truncate mb-1">{file.filename}</div>
                        <div className="flex justify-between items-center text-[9px] text-[var(--ink-light)] uppercase font-medium">
                          <span>{file.size}</span>
                          <span>{file.dateAdded}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white border-b border-[var(--stone-dark)] z-10">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-[var(--stone-dark)]"
                        />
                      </th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--burgundy)]">File Name</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--burgundy)]">Usage</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--burgundy)]">Size</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--burgundy)]">Date</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--burgundy)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((file) => (
                      <tr 
                        key={file.id}
                        onClick={() => handleSelect(file)}
                        className={`cursor-pointer border-b border-[var(--stone)] transition-colors ${
                          selectedFile?.id === file.id ? 'bg-[var(--gold-light)]' : 'hover:bg-[var(--cream)]'
                        }`}
                      >
                        <td className="px-4 py-3" onClick={(e) => toggleSelect(file.id, e)}>
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(file.id)}
                            readOnly
                            className="w-4 h-4 rounded border-[var(--stone-dark)]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-[var(--cream)] border border-[var(--stone-dark)] flex items-center justify-center overflow-hidden shrink-0">
                              {file.type?.includes('image') ? (
                                <img src={file.url} className="w-full h-full object-cover" />
                              ) : (
                                <Icons.document className="w-5 h-5 text-[var(--ink-light)]" />
                              )}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[var(--ink)]">{file.filename}</div>
                              <div className="text-[10px] text-[var(--ink-light)]">{file.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-[var(--blue-light)] text-[var(--blue)] uppercase">
                            {(usageMap[file.url] && usageMap[file.url].length > 0) ? 'In Use' : 'Unassigned'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--ink-mid)]">{file.size}</td>
                        <td className="px-4 py-3 text-xs text-[var(--ink-mid)]">{file.dateAdded}</td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDownloadFile(file.url, file.filename)}
                            className="p-1.5 bg-white hover:bg-[var(--gold)] text-[var(--burgundy)] hover:text-white border border-[var(--stone-dark)] rounded-lg transition-all"
                            title="Download"
                          >
                            <Icons.download className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredAndSortedData.length}
              pageSize={pageSize}
            />
          </div>
          
          {/* Right: Details Panel (Conditional) */}
          {selectedFile && (
            <div className="w-[400px] bg-white border border-[var(--stone-dark)] rounded-2xl flex flex-col shadow-md animate-in slide-in-from-right duration-300">
              <div className="p-5 border-b border-[var(--stone-dark)] flex items-center justify-between">
                <h2 className="text-sm font-bold text-[var(--burgundy)] uppercase tracking-wider">Asset Details</h2>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-1.5 hover:bg-[var(--stone)] rounded-lg transition-colors"
                >
                  <Icons.close className="w-4 h-4 text-[var(--ink-light)]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="aspect-video bg-[var(--ink)] rounded-xl border border-[var(--stone-dark)] overflow-hidden flex items-center justify-center relative">
                  {selectedFile.type?.includes('image') ? (
                    <img src={selectedFile.url} className="w-full h-full object-contain" />
                  ) : (
                    <Icons.document className="w-16 h-16 text-white/20" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-[9px] font-bold text-[var(--ink-light)] uppercase tracking-widest mb-1.5">File Name</label>
                    <input 
                      type="text"
                      value={selectedFile.filename}
                      onChange={e => setSelectedFile({...selectedFile, filename: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[var(--stone-dark)] rounded-lg text-sm font-bold text-[var(--ink)] focus:border-[var(--gold)] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[var(--ink-light)] uppercase tracking-widest mb-1.5">URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={selectedFile.url}
                        readOnly
                        className="flex-1 px-4 py-2.5 bg-[var(--cream)] border border-[var(--stone-dark)] rounded-lg text-[10px] text-[var(--ink-mid)] outline-none"
                      />
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(selectedFile.url);
                          // We could add a toast here
                        }}
                        className="px-3 py-2 bg-white border border-[var(--stone-dark)] rounded-lg text-[10px] font-bold hover:bg-[var(--stone)] transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[var(--ink-light)] uppercase tracking-widest mb-1.5">Alt Text</label>
                    <input 
                      type="text"
                      value={selectedFile.altText || ''}
                      placeholder="Describe image for accessibility..."
                      onChange={e => setSelectedFile({...selectedFile, altText: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[var(--stone-dark)] rounded-lg text-sm text-[var(--ink)] focus:border-[var(--gold)] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[var(--ink-light)] uppercase tracking-widest mb-1.5">Caption</label>
                    <textarea 
                      value={selectedFile.caption || ''}
                      placeholder="Enter a brief caption..."
                      onChange={e => setSelectedFile({...selectedFile, caption: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[var(--stone-dark)] rounded-lg text-sm text-[var(--ink)] focus:border-[var(--gold)] outline-none min-h-[80px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[var(--ink-light)] uppercase tracking-widest mb-1.5">Used In</label>
                    <div className="flex flex-wrap gap-2">
                      {((usageMap[selectedFile.url] && usageMap[selectedFile.url].length > 0) ? usageMap[selectedFile.url] : ['Unassigned']).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[var(--blue-light)] text-[var(--blue)] text-[10px] font-bold rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[var(--stone-dark)] bg-[var(--cream-light)] rounded-b-2xl flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 text-[var(--red)] border border-[var(--red)] rounded-lg text-[10px] font-bold hover:bg-[var(--red-light)] transition-colors"
                  >
                    <Icons.trash className="w-3.5 h-3.5" />
                    Delete
                  </button>
                  <button 
                    onClick={() => handleDownloadFile(selectedFile.url, selectedFile.filename)}
                    className="flex items-center gap-2 px-3 py-2 text-[var(--burgundy)] border border-[var(--stone-dark)] rounded-lg text-[10px] font-bold hover:bg-[var(--cream)] transition-colors"
                  >
                    <Icons.download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
                <button 
                  onClick={() => {
                    updateItem(selectedFile.id, selectedFile);
                    // Add success state/feedback
                  }}
                  className="px-6 py-2 bg-[var(--gold)] text-[var(--burgundy)] rounded-lg text-[10px] font-bold hover:bg-[var(--gold-dark)] transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setIsBulkDelete(false);
        }}
        onConfirm={confirmDelete}
        title={isBulkDelete ? "Bulk Delete Assets" : "Delete Asset"}
        message={isBulkDelete 
          ? `Are you sure you want to permanently delete ${selectedIds.length} selected assets? This action cannot be undone and may break links in projects using these files.`
          : `Are you sure you want to permanently delete "${selectedFile?.filename}"? This action cannot be undone and may break links in projects using this file.`
        }
        confirmText={isBulkDelete ? `Delete ${selectedIds.length} Assets` : "Delete Permanently"}
        type="danger"
      />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
    </DashboardLayout>
  );
}
