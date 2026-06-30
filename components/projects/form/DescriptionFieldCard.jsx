import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default function DescriptionFieldCard({
  field,
  index,
  updateField,
  removeField,
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  draggedIndex,
  dragOverIndex
}) {
  const isDragging = draggedIndex === index;
  const isDragOver = dragOverIndex === index;

  return (
    <div 
      className={`custom-field ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
      onDragLeave={(e) => handleDragLeave(e)}
      aria-grabbed={isDragging}
    >
      <span className="drag-handle" title="Drag to reorder" aria-label="Drag to reorder field">⋮⋮</span>
      <input 
        placeholder="Field title" 
        value={field.title} 
        onChange={(e) => updateField(index, 'title', e.target.value)}
        aria-label="Additional field title"
      />
      <div style={{ flex: 1, minWidth: '200px' }}>
        <RichTextEditor
          placeholder="Field body — use the toolbar for formatting"
          value={field.body}
          onChange={(html) => updateField(index, 'body', html)}
        />
      </div>
      <button 
        type="button" 
        className="secondary-btn remove-field-btn" 
        onClick={() => removeField(index)}
        aria-label={`Remove field ${field.title || index}`}
      >
        Remove
      </button>
    </div>
  );
}
