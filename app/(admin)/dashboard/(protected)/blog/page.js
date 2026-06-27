'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import EmptyState from '@/components/shared/EmptyState';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import Pagination from '@/components/shared/Pagination';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import BlogPreview from '@/components/blog/BlogPreview';

export default function BlogPage() {
  const { data, updateItem, deleteItem } = useStore(blogStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'date', order: 'desc' });
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Modal & Panel State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToPublish, setPostToPublish] = useState(null);
  const [postToPreview, setPostToPreview] = useState(null);

  const handleSyncData = () => {
    localStorage.removeItem('pieach_cms_blog');
    window.location.reload();
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter]);

  // Stats calculation
  const totalPosts = data.length;
  const publishedCount = data.filter(p => p.status === 'published').length;
  const draftCount = data.filter(p => p.status === 'draft').length;
  const scheduledCount = data.filter(p => p.status === 'scheduled').length;

  // Final filtering including status and category
  const finalData = useMemo(() => {
    return filteredAndSortedData.filter(post => {
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
      return matchesStatus && matchesCategory;
    });
  }, [filteredAndSortedData, statusFilter, categoryFilter]);

  // Pagination logic
  const totalPages = Math.ceil(finalData.length / pageSize);
  const paginatedData = finalData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [...new Set(data.map(p => p.category))];

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deleteItem(postToDelete.id);
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handlePublishClick = (post) => {
    setPostToPublish(post);
    setIsPublishModalOpen(true);
  };

  const confirmPublish = () => {
    if (postToPublish) {
      updateItem(postToPublish.id, { ...postToPublish, status: 'published' });
      setIsPublishModalOpen(false);
      setPostToPublish(null);
    }
  };

  const handlePreview = (post) => {
    setPostToPreview(post);
    setIsPreviewOpen(true);
  };

  return (
    <DashboardLayout title="" subtitle="">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#32171B] mb-1">Blog Posts</h1>
          <p className="text-[12px] text-[#9A8C82]">Create, edit, publish, and manage blog articles for the Pieach website.</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setIsSyncModalOpen(true)}
            className="px-6 py-3 border border-[#DDD5C8] text-[#32171B] rounded-md text-[11px] font-bold flex items-center gap-2 hover:bg-[#FAF7F2] transition-all"
          >
            <Icons.analytics className="w-3.5 h-3.5 opacity-60" />
            Sync Content
          </button>
          <Link 
            href="/dashboard/blog/new"
            className="bg-[#32171B] text-white px-6 py-3 rounded-md text-xs font-bold hover:bg-[#4a2228] transition-all flex items-center gap-2 shadow-sm"
          >
            <Icons.plus className="w-4 h-4" />
            Add Blog Post
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { label: 'TOTAL POSTS', value: totalPosts },
          { label: 'PUBLISHED', value: publishedCount },
          { label: 'DRAFTS', value: draftCount },
          { label: 'SCHEDULED', value: scheduledCount }
        ].map((stat, i) => (
          <div key={i} style={{ 
            background: 'var(--white)', 
            border: '1px solid var(--stone-dark)', 
            borderTop: '3px solid var(--gold)', 
            borderRadius: '6px', 
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1, fontFamily: 'Verdana, Geneva, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Verdana, Geneva, sans-serif' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg p-5 mb-8 flex items-center gap-4">
        <div className="search-box" style={{ flex: '1', maxWidth: '100%' }}>
          <Icons.search className="w-4 h-4 text-[#9A8C82]" />
          <input 
            type="text"
            placeholder="Search blog posts by title, author, category, or keyword"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-[13px] text-[#32171B] outline-none min-w-[150px]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <select 
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-[13px] text-[#32171B] outline-none min-w-[150px]"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2] flex justify-between items-center">
          <h2 className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">POST LIST</h2>
          <button className="text-[10px] text-[#A87E28] hover:underline font-bold">Manage categories →</button>
        </div>

        {finalData.length === 0 ? (
          <div className="p-12">
            <EmptyState title="No posts found" message="Try adjusting your filters or search query." />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#DDD5C8]">
                    <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">BLOG POST</th>
                    <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">CATEGORY</th>
                    <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">AUTHOR</th>
                    <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">STATUS</th>
                    <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">DATE</th>
                    <th className="text-center px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((post) => (
                    <tr key={post.id} className="border-b border-[#F0EBE3] hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-5 min-w-[400px]">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-12 rounded bg-[#32171B] overflow-hidden flex-shrink-0 shadow-sm">
                            {post.image ? (
                              <img src={post.image} alt="" className="w-full h-full object-cover opacity-80" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#D5A73F]">
                                <Icons.blog className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="text-[13px] font-bold text-[#32171B] leading-snug">{post.title}</div>
                            <div className="text-[10px] text-[#9A8C82] line-clamp-1 italic">{post.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[12px] font-medium text-[#32171B]">{post.category}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[12px] text-[#32171B]">{post.author}</div>
                      </td>
                      <td className="px-6 py-5">
                        <StatusPill status={post.status} />
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[11px] text-[#1A1410] whitespace-nowrap">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handlePreview(post)}
                            className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-[#D5A73F] hover:text-white hover:border-[#D5A73F] transition-all"
                          >
                            <Icons.eye className="w-4 h-4" />
                          </button>
                          {post.status === 'draft' && (
                            <button 
                              onClick={() => handlePublishClick(post)}
                              className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                            >
                              <Icons.check className="w-4 h-4" />
                            </button>
                          )}
                          <Link 
                            href={`/blog/${post.id}/edit`}
                            className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-[#32171B] hover:text-white hover:border-[#32171B] transition-all"
                          >
                            <Icons.pencil className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(post)}
                            className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                          >
                            <Icons.close className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={finalData.length}
              pageSize={pageSize}
            />
          </>
        )}
      </div>

      <ConfirmationModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onConfirm={handleSyncData}
        title="Sync Mock Data"
        message="This will reset your blog list to the default high-fidelity mock data. Any unsaved local changes will be lost. Proceed?"
        confirmText="Yes, Sync Data"
        type="primary"
      />

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to permanently delete "${postToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Permanently"
        type="danger"
      />

      <ConfirmationModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={confirmPublish}
        title="Publish Blog Post"
        message={`Are you sure you want to publish "${postToPublish?.title}"?`}
        confirmText="Publish Post"
        type="success"
      />

      <ConfirmationModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onConfirm={handleSyncData}
        title="Sync Content Database"
        message="This will reset your local blog posts to the latest high-fidelity mock data. Any unsaved changes will be lost. Proceed?"
        confirmText="Yes, Sync Now"
        type="primary"
      />

      <BlogPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        post={postToPreview}
      />
    </DashboardLayout>
  );
}
