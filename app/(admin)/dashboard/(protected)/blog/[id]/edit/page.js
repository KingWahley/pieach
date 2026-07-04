'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/forms/BlogForm';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';
import EmptyState from '@/components/shared/EmptyState';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';
import UnsavedChangesModal from '@/components/modals/UnsavedChangesModal';
import SuccessModal from '@/components/modals/SuccessModal';

export default function EditBlogPostPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, updateItem } = useStore(blogStore);
  const { registerForm, clearForm, isDirty, onSaveAsDraft } = useUnsavedChanges();
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const post = data.find(p => p.id === id);

  useEffect(() => {
    if (!post) return;
    registerForm(true, null); // no draft save for blog
    router.prefetch('/dashboard/blog');
    return () => clearForm();
  }, [post, registerForm, clearForm, router]);

  const handleSave = (finalData) => {
    updateItem(id, finalData);
    clearForm();
    setShowSuccess(true);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedConfirm(true);
    } else {
      clearForm();
      router.push('/dashboard/blog');
    }
  };

  if (!post) {
    return (
      <DashboardLayout title="Edit Post" subtitle="Post not found">
        <EmptyState 
          title="Post Not Found"
          description="The blog post you are trying to edit does not exist or has been deleted."
          actionText="Back to Blog"
          actionLink="/dashboard/blog"
        />
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

      <UnsavedChangesModal
        isOpen={showUnsavedConfirm}
        onStay={() => setShowUnsavedConfirm(false)}
        onDiscard={() => {
          clearForm();
          router.push('/dashboard/blog');
        }}
        onSaveAsDraft={onSaveAsDraft ? () => {
          if (onSaveAsDraft.fn) onSaveAsDraft.fn();
          clearForm();
          router.push('/dashboard/blog');
        } : null}
      />

      <SuccessModal
        isOpen={showSuccess}
        message="Your blog post has been successfully updated and published."
        uploadAnotherText="Write New Post"
        viewListText="View Blog List"
        onUploadAnother={() => router.push('/dashboard/blog/new')}
        onViewList={() => router.push('/dashboard/blog')}
      />
    </DashboardLayout>
  );
}
