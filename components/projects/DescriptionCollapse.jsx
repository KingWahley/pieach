// components/projects/DescriptionCollapse.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

const COLLAPSE_HEIGHT = 168; // px — roughly 5 lines

export default function DescriptionCollapse({ html }) {
  const [expanded, setExpanded]     = useState(false);
  const [needsClamp, setNeedsClamp] = useState(false);
  const innerRef = useRef(null);

  useEffect(() => {
    if (innerRef.current) {
      setNeedsClamp(innerRef.current.scrollHeight > COLLAPSE_HEIGHT + 8);
    }
  }, [html]);

  return (
    <div>
      {/* Description content */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: expanded || !needsClamp ? 'none' : COLLAPSE_HEIGHT,
          position: 'relative',
          transition: 'max-height 0.4s ease',
        }}
      >
        <div
          ref={innerRef}
          className="rich-description"
          dangerouslySetInnerHTML={{ __html: html || '' }}
        />

        {/* Fade gradient at bottom when collapsed */}
        {needsClamp && !expanded && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 64,
            background: 'linear-gradient(to bottom, transparent, #32171B)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* View More / View Less button */}
      {needsClamp && (
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            marginTop: 16,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#D5A73F',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {expanded ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              Show Less
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              View Full Description
            </>
          )}
        </button>
      )}

      {/* Prose styles for the rendered HTML */}
      <style>{`
        .rich-description {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.125rem;
          color: rgba(255,255,255,0.88);
          line-height: 1.75;
          font-weight: 300;
          max-width: 56rem;
        }
        /* Kill any inline background-color carried in from editor / DB */
        .rich-description *,
        .rich-description span,
        .rich-description p,
        .rich-description div {
          background-color: transparent !important;
          background: transparent !important;
          color: inherit;
          font-family: inherit;
        }
        .rich-description p {
          margin: 0 0 1em;
        }
        .rich-description h3 {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #D5A73F !important;
          margin: 1.5em 0 0.5em;
        }
        .rich-description b,
        .rich-description strong {
          font-weight: 700;
          color: #fff !important;
        }
        .rich-description i,
        .rich-description em {
          font-style: italic;
        }
        .rich-description u {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .rich-description ul {
          list-style: disc;
          padding-left: 1.4em;
          margin: 0.5em 0 1em;
        }
        .rich-description ol {
          list-style: decimal;
          padding-left: 1.4em;
          margin: 0.5em 0 1em;
        }
        .rich-description li {
          margin: 0.3em 0;
        }
        .rich-description br {
          display: block;
          content: '';
          margin-bottom: 0.4em;
        }
      `}</style>
    </div>
  );
}
