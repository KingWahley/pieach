'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/forms/BlogForm';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';
import EmptyState from '@/components/shared/EmptyState';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';

export default function EditBlogPostPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, updateItem } = useStore(blogStore);
  const { registerForm, clearForm } = useUnsavedChanges();
  
  const post = data.find(p => p.id === id);

  useEffect(() => {
    if (!post) return;
    registerForm(true, null); // no draft save for blog
    return () => clearForm();
  }, [post, registerForm, clearForm]);

  const handleSave = (finalData) => {
    updateItem(id, finalData);
    clearForm();
    router.push('/dashboard/blog');
  };

  const handleCancel = () => {
    clearForm();
    router.push('/dashboard/blog');
  };

  if (!post) {
    return (
      <DashboardLayout title="Edit Post" subtitle="Post not found">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <EmptyState 
            title="Post not found" 
            message="The article you are trying to edit does not exist or has been removed."
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#32171B] mb-1">Edit Post</h1>
            <p className="text-[12px] text-[#9A8C82]">Modify the details of your blog article.</p>
          </div>
        </div>

        <BlogForm 
          initialData={post}
          onSave={handleSave}
          onCancel={handleCancel}
          isNew={false}
        />
      </div>
    </DashboardLayout>
  );
}
