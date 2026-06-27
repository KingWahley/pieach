import React, { useState } from 'react';
import DescriptionFieldCard from './DescriptionFieldCard';

export default function AdditionalDescriptionFields({ 
  additionalFields, 
  setAdditionalFields 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const addField = () => {
    setAdditionalFields([...additionalFields, { id: Date.now(), title: '', body: '' }]);
  };

  const removeField = (index) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1);
    setAdditionalFields(newFields);
  };

  const updateField = (index, key, value) => {
    const newFields = [...additionalFields];
    newFields[index][key] = value;
    setAdditionalFields(newFields);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    // Needed for Firefox
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires some data to be set
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newFields = [...additionalFields];
    const draggedItem = newFields[draggedIndex];
    
    // Remove the item from its original position
    newFields.splice(draggedIndex, 1);
    // Insert it at the new position
    newFields.splice(targetIndex, 0, draggedItem);
    
    setAdditionalFields(newFields);
    setDraggedIndex(null);
  };

  return (
    <div className="form-field full">
      <label>Additional Description Fields</label>
      <div id="additionalFieldsWrap" role="list">
        {additionalFields.map((field, index) => (
          <DescriptionFieldCard
            key={field.id}
            field={field}
            index={index}
            updateField={updateField}
            removeField={removeField}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragLeave={handleDragLeave}
            draggedIndex={draggedIndex}
            dragOverIndex={dragOverIndex}
          />
        ))}
      </div>
      <div className="add-field-row">
        <button type="button" className="add-field-btn" onClick={addField}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Add Description Field
        </button>
      </div>
    </div>
  );
}
