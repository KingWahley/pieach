'use client';

import React from 'react';
import Modal from '@/components/modals/Modal';
import StatusPill from '@/components/shared/StatusPill';
import { Icons } from '@/components/shared/Icons';
import Link from 'next/link';

export default function BlogPreview({ isOpen, onClose, post }) {
  if (!post) return null;

  const renderContent = () => {
    if (!post.content) return <p>Full content of the blog post goes here...</p>;
    return post.content.split('\n').map((para, i) => (
      para.trim() && <p key={i}>{para.trim()}</p>
    ));
  };

  const content = renderContent();
  const readingTime = Math.ceil((post.content?.split(' ').length || 0) / 200);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Blog Post Live Preview"
      actions={
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#DDD5C8] rounded text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] transition-all"
          >
            Close Preview
          </button>
          <Link 
            href={`/blog/${post.id}/edit`}
            className="px-6 py-2 bg-[#32171B] text-white rounded text-[11px] font-bold flex items-center gap-2 hover:bg-[#1A1410] transition-all"
          >
            <Icons.pencil className="w-3 h-3" />
            Edit Post
          </Link>
        </div>
      }
    >
      <div className="blog-preview-container">
        <style jsx>{`
          .blog-preview-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px 0;
          }
          .blog-hero {
            width: 100%;
            aspect-ratio: 21/9;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 40px;
            border: 1px solid var(--stone);
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .blog-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .blog-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          .category-tag {
            font-size: 10px;
            font-weight: 900;
            color: var(--gold-dark);
            text-transform: uppercase;
            letter-spacing: 0.15em;
          }
          .blog-title {
            font-size: 42px;
            font-weight: 800;
            color: var(--burgundy);
            line-height: 1.1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
          }
          .author-info {
            display: flex;
            align-items: center;
            gap: 24px;
            padding-bottom: 30px;
            border-bottom: 1px solid var(--stone);
            margin-bottom: 40px;
          }
          .author-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            color: var(--ink-mid);
          }
          .author-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--burgundy);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
          }
          .blog-excerpt {
            font-size: 20px;
            line-height: 1.6;
            color: var(--burgundy);
            font-style: italic;
            padding: 30px;
            background: var(--cream);
            border-radius: 16px;
            margin-bottom: 40px;
            position: relative;
          }
          .blog-excerpt::before {
            content: '"';
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 60px;
            opacity: 0.1;
            font-family: serif;
          }
          .blog-content {
            font-size: 18px;
            line-height: 1.8;
            color: var(--ink);
            font-family: 'Georgia', serif;
            white-space: pre-wrap;
          }
          .blog-content p {
            margin-bottom: 24px;
          }
          .blog-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid var(--stone);
          }
          .tag-item {
            font-size: 11px;
            font-weight: bold;
            color: var(--ink-light);
            background: var(--white);
            border: 1px solid var(--stone);
            padding: 6px 14px;
            border-radius: 20px;
          }
        `}</style>

        <div className="blog-meta">
          <StatusPill status={post.status} />
          <span className="category-tag">{post.category}</span>
        </div>

        <h1 className="blog-title">{post.title}</h1>

        <div className="author-info">
          <div className="author-item">
            <div className="author-avatar">{post.author?.[0]}</div>
            <span>By <strong>{post.author}</strong></span>
          </div>
          <div className="author-item">
            <Icons.calendar style={{ width: '16px', height: '16px', opacity: 0.6 }} />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="author-item">
            <Icons.analytics style={{ width: '16px', height: '16px', opacity: 0.6 }} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {post.image && (
          <div className="blog-hero">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        <div className="blog-excerpt">
          {post.excerpt}
        </div>

        <div className="blog-content">
          {content}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((tag, i) => (
              <span key={i} className="tag-item">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
