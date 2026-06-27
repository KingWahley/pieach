'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/forms/BlogForm';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { createItem } = useStore(blogStore);

  const handleSave = (finalData) => {
    createItem({
      ...finalData,
      reads: 0 // Initialize reads for new post
    });
    router.push('/dashboard/blog');
  };

  const handleCancel = () => {
    router.push('/dashboard/blog');
  };

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#32171B] mb-1">Add New Post</h1>
            <p className="text-[12px] text-[#9A8C82]">Create a new entry for add new post.</p>
          </div>
        </div>

        <BlogForm 
          isNew={true}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}
