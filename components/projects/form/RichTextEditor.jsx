// components/projects/form/RichTextEditor.jsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';

const ToolbarBtn = ({ onClick, title, children, active }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 28, height: 28, borderRadius: 4, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(50,23,27,0.12)' : 'transparent',
      color: 'var(--burgundy)',
      fontFamily: 'Georgia, serif',
      fontSize: 13,
      fontWeight: 'bold',
      transition: 'background 0.15s',
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(50,23,27,0.07)'; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
  >
    {children}
  </button>
);

const Sep = () => (
  <div style={{ width: 1, height: 18, background: 'var(--stone-dark)', margin: '0 4px', flexShrink: 0 }} />
);

export default function RichTextEditor({ value, onChange, placeholder = 'Write the main project description', hasError }) {
  const editorRef = useRef(null);
  const isComposing = useRef(false);
  // Track if the last set value came from outside to avoid cursor-resetting loops
  const lastExternalValue = useRef(value);

  // Remove ALL inline styles, colors and class attributes from every element
  const stripStyles = useCallback((html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    div.querySelectorAll('*').forEach(el => {
      el.removeAttribute('style');
      el.removeAttribute('class');
      el.removeAttribute('color');
      el.removeAttribute('bgcolor');
      el.removeAttribute('face');
      el.removeAttribute('size');
      // Also strip font tags by unwrapping them
      if (el.tagName === 'FONT') {
        el.replaceWith(...el.childNodes);
      }
    });
    return div.innerHTML;
  }, []);

  // On mount: set initial HTML — strip any pre-existing inline styles from DB
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const clean = stripStyles(value || '');
      editorRef.current.innerHTML = clean;
      lastExternalValue.current = clean;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync if parent value changes externally (e.g. form reset)
  useEffect(() => {
    if (!editorRef.current) return;
    if (value !== lastExternalValue.current) {
      const clean = stripStyles(value || '');
      editorRef.current.innerHTML = clean;
      lastExternalValue.current = clean;
    }
  }, [value, stripStyles]);

  const exec = useCallback((cmd, arg = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, arg);
    const html = stripStyles(editorRef.current?.innerHTML || '');
    lastExternalValue.current = html;
    onChange(html);
  }, [onChange, stripStyles]);

  // Strip all inline styles from pasted content
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') || '';
    document.execCommand('insertText', false, text);
    // Sync after insert (insertText fires input event but let's be safe)
    const html = stripStyles(editorRef.current?.innerHTML || '');
    lastExternalValue.current = html;
    onChange(html);
  }, [onChange, stripStyles]);

  const handleInput = () => {
    if (isComposing.current) return;
    const html = stripStyles(editorRef.current?.innerHTML || '');
    lastExternalValue.current = html;
    onChange(html);
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); exec('bold'); }
      if (e.key === 'i') { e.preventDefault(); exec('italic'); }
      if (e.key === 'u') { e.preventDefault(); exec('underline'); }
    }
  };

  const isActive = (cmd) => {
    try { return document.queryCommandState(cmd); } catch { return false; }
  };

  return (
    <div style={{ border: `1px solid ${hasError ? 'var(--red)' : 'var(--stone-dark)'}`, borderRadius: 6, overflow: 'hidden', background: 'var(--cream)' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, padding: '6px 8px',
        borderBottom: '1px solid var(--stone-dark)', background: 'var(--cream-light)',
      }}>
        {/* Bold */}
        <ToolbarBtn title="Bold (Ctrl+B)" onClick={() => exec('bold')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 010 8H6z"/><path d="M6 12h9a4 4 0 010 8H6z"/>
          </svg>
        </ToolbarBtn>

        {/* Italic */}
        <ToolbarBtn title="Italic (Ctrl+I)" onClick={() => exec('italic')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
          </svg>
        </ToolbarBtn>

        {/* Underline */}
        <ToolbarBtn title="Underline (Ctrl+U)" onClick={() => exec('underline')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v7a6 6 0 0012 0V3"/><line x1="4" y1="21" x2="20" y2="21"/>
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Unordered list (bullet) */}
        <ToolbarBtn title="Bullet List" onClick={() => exec('insertUnorderedList')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
            <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </ToolbarBtn>

        {/* Ordered list */}
        <ToolbarBtn title="Numbered List" onClick={() => exec('insertOrderedList')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
            <path d="M4 6h1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M4 10h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M3 14h2a1 1 0 010 2H3a1 1 0 010 2h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Heading (H3) */}
        <ToolbarBtn title="Heading" onClick={() => exec('formatBlock', 'H3')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M4 4v16M20 4v16" />
          </svg>
        </ToolbarBtn>

        {/* Paragraph (clear heading) */}
        <ToolbarBtn title="Normal Paragraph" onClick={() => exec('formatBlock', 'P')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 4H9a5 5 0 000 10h4v6h2V4h-2z"/>
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Clear formatting */}
        <ToolbarBtn title="Clear Formatting" onClick={() => exec('removeFormat')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 4l-10 16M4 4h16"/><line x1="4" y1="20" x2="10" y2="20"/>
            <line x1="18" y1="18" x2="22" y2="22" stroke="var(--red)" strokeWidth="2.5"/>
          </svg>
        </ToolbarBtn>

        <div style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--ink-light)', fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          Ctrl+B Bold · Ctrl+I Italic
        </div>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionStart={() => { isComposing.current = true; }}
        onCompositionEnd={() => { isComposing.current = false; handleInput(); }}
        data-placeholder={placeholder}
        style={{
          minHeight: 160,
          maxHeight: 360,
          overflowY: 'auto',
          padding: '12px 14px',
          outline: 'none',
          fontFamily: 'Verdana, sans-serif',
          fontSize: 13,
          color: 'var(--ink)',
          lineHeight: 1.7,
          background: 'var(--cream)',
        }}
      />

      {/* Inline CSS for placeholder + prose content styling */}
      <style>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: var(--ink-light);
          pointer-events: none;
          font-style: italic;
          opacity: 0.55;
        }
        [contenteditable] ul {
          list-style: disc;
          padding-left: 20px;
          margin: 6px 0;
        }
        [contenteditable] ol {
          list-style: decimal;
          padding-left: 20px;
          margin: 6px 0;
        }
        [contenteditable] li {
          margin: 3px 0;
        }
        [contenteditable] h3 {
          font-size: 14px;
          font-weight: bold;
          margin: 10px 0 4px;
          color: var(--burgundy);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        [contenteditable] p {
          margin: 6px 0;
        }
        [contenteditable] b, [contenteditable] strong {
          font-weight: bold;
        }
        [contenteditable] i, [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
