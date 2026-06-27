'use client';

import React from 'react';
import Modal from '@/components/modals/Modal';
import { Icons } from '@/components/shared/Icons';

export default function TeamMemberPreview({ isOpen, onClose, member }) {
  if (!member) return null;

  const {
    name = 'Member Name',
    title = '',
    role = 'Team Member',
    qualifications = '',
    bio = 'Architectural professional dedicated to design excellence and sustainable built environments.',
    image = null,
    email = '',
    phone = '',
    socialLinks = {}
  } = member;

  const displayName = `${title ? title + ' ' : ''}${name}`;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Team Member Profile Preview"
      actions={
        <button 
          className="px-6 py-2 bg-[var(--burgundy)] text-white rounded-md text-xs font-bold hover:bg-black transition-colors uppercase tracking-widest"
          onClick={onClose}
        >
          Close Profile
        </button>
      }
    >
      <div className="team-member-preview">
        <style jsx>{`
          .team-member-preview {
            max-width: 900px;
            margin: 0 auto;
            color: var(--ink);
          }
          .profile-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 50px;
            align-items: start;
          }
          .profile-image-container {
            position: sticky;
            top: 0;
          }
          .profile-image {
            width: 100%;
            aspect-ratio: 4/5;
            border-radius: 12px;
            object-fit: cover;
            background: var(--cream);
            border: 1px solid var(--stone);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          .profile-header {
            margin-bottom: 30px;
            border-bottom: 1.5px solid var(--stone);
            padding-bottom: 24px;
          }
          .profile-name {
            font-size: 36px;
            font-weight: 800;
            color: var(--burgundy);
            margin-bottom: 6px;
            letter-spacing: -0.02em;
          }
          .profile-role {
            font-size: 14px;
            font-weight: 700;
            color: var(--gold-dark);
            text-transform: uppercase;
            letter-spacing: 0.15em;
          }
          .profile-section {
            margin-bottom: 32px;
          }
          .section-label {
            font-size: 10px;
            font-weight: 800;
            color: var(--ink-light);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--stone);
          }
          .bio-text {
            font-size: 16px;
            line-height: 1.8;
            color: var(--ink-mid);
          }
          .qual-badge {
            display: inline-block;
            background: var(--cream);
            color: var(--burgundy);
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid var(--stone);
          }
          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: var(--ink-mid);
          }
          .contact-icon {
            width: 32px;
            height: 32px;
            background: var(--white);
            border: 1px solid var(--stone);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--burgundy);
          }
          .social-links {
            display: flex;
            gap: 12px;
            margin-top: 20px;
          }
          .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: var(--burgundy);
            color: var(--gold);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }
          .social-btn:hover {
            transform: translateY(-3px);
            background: var(--black);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          @media (max-width: 768px) {
            .profile-grid {
              grid-template-columns: 1fr;
              gap: 30px;
            }
            .profile-image {
              aspect-ratio: 1;
            }
          }
        `}</style>

        <div className="profile-grid">
          <div className="profile-image-container">
            {image ? (
              <img src={image} alt={name} className="profile-image" />
            ) : (
              <div className="profile-image flex items-center justify-center text-5xl font-black text-[var(--gold)] bg-[var(--burgundy)]">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            )}
            
            <div className="social-links">
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Icons.linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Icons.instagram className="w-5 h-5" />
                </a>
              )}
              <a href={`mailto:${email}`} className="social-btn" style={{ background: 'var(--cream)', color: 'var(--burgundy)', border: '1px solid var(--stone)' }}>
                <Icons.mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-header">
              <div className="profile-role">{role}</div>
              <h1 className="profile-name">{displayName}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(qualifications) ? (
                  qualifications
                    .map(q => typeof q === 'object' && q ? (q.title || '') : String(q))
                    .filter(q => q && q.trim())
                    .map((q, idx) => (
                      <div key={idx} className="qual-badge">{q}</div>
                    ))
                ) : (
                  qualifications && String(qualifications).split(',').map((q, idx) => (
                    <div key={idx} className="qual-badge">{q.trim()}</div>
                  ))
                )}
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">Professional Bio</div>
              <p className="bio-text">{bio}</p>
            </div>

            <div className="profile-section">
              <div className="section-label">Contact Information</div>
              <div className="contact-list">
                {email && (
                  <div className="contact-item">
                    <div className="contact-icon"><Icons.mail className="w-4 h-4" /></div>
                    <span>{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="contact-item">
                    <div className="contact-icon"><Icons.phone className="w-4 h-4" /></div>
                    <span>{phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">Studio Engagement</div>
              <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#DDD5C8]">
                <div className="flex items-center gap-3 text-xs font-bold text-[#32171B]">
                  <Icons.check className="w-4 h-4 text-green-600" />
                  PIEACH STUDIO MEMBER SINCE 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
