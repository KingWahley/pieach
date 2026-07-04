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
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    registerForm(true, null); // no draft save for blog
    router.prefetch('/dashboard/blog');
    return () => clearForm();
  }, [registerForm, clearForm, router]);

  const handleSave = async (finalData) => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      await createItem({
        ...finalData,
        reads: 0 // Initialize reads for new post
      });
      clearForm();
      setShowSuccess(true);
    } catch (err) {
      const errMsg = err?.message || 'Network connection lost.';
      setErrorMsg(`Upload failed: ${errMsg} Please check your internet connection.`);
      alert(`Upload failed: ${errMsg}\n\nPlease check your internet connection or network status, verify you are online, and try again.`);
    } finally {
      setIsSaving(false);
    }
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

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <BlogForm 
          isNew={true}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
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
