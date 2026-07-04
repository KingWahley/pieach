'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/forms/BlogForm';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';
import UnsavedChangesModal from '@/components/modals/UnsavedChangesModal';
import SuccessModal from '@/components/modals/SuccessModal';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { createItem } = useStore(blogStore);
  const { registerForm, clearForm, isDirty, onSaveAsDraft } = useUnsavedChanges();
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    registerForm(true, null); // no draft save for blog
    router.prefetch('/dashboard/blog');
    return () => clearForm();
  }, [registerForm, clearForm, router]);

  const handleSave = (finalData) => {
    createItem({
      ...finalData,
      reads: 0 // Initialize reads for new post
    });
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
        message="Your blog post has been successfully uploaded and published."
        uploadAnotherText="Write Another Post"
        viewListText="View Blog List"
        onUploadAnother={() => window.location.reload()}
        onViewList={() => router.push('/dashboard/blog')}
      />
    </DashboardLayout>
  );
}
