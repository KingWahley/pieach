'use client';

import { Icons } from '@/components/shared/Icons';

export default function TeamFormActions({ onSaveDraft, onSavePublish, onPreview, isSaving }) {
  return (
    <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
      <button 
        type="button" 
        className="secondary-btn" 
        onClick={onSaveDraft}
        disabled={isSaving}
        style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
      >
        Save Draft
      </button>
      <button 
        type="button" 
        className="secondary-btn" 
        onClick={onPreview}
        disabled={isSaving}
        style={{ 
          opacity: isSaving ? 0.7 : 1, 
          cursor: isSaving ? 'not-allowed' : 'pointer',
          background: 'var(--cream)',
          borderColor: 'var(--gold)'
        }}
      >
        <Icons.eye style={{ width: '14px', height: '14px', marginRight: '6px' }} />
        Preview
      </button>
      <button 
        type="button" 
        className="primary-btn" 
        onClick={onSavePublish}
        disabled={isSaving}
        style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
      >
        {isSaving ? 'Saving...' : 'Save and Publish'}
      </button>
    </div>
  );
}
