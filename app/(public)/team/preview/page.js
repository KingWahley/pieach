// app/(public)/team/preview/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OurTeamSection from "@/components/sections/OurTeamSection";
import TeamValuesSection from "@/components/sections/TeamValuesSection";
import CTASection from "@/components/sections/CTASection";
import { teamStore } from '@/lib/store';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { supabase } from '@/lib/supabase/client';

const DETAIL_VALUES = [
  {
    title: "Creativity",
    description: "Relentless dedication to find unique solutions for every site and brief.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    )
  },
  {
    title: "Sustainability",
    description: "Design that honors the planet and ensures the longevity of the built form.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.25 5.25l13.5 13.5" />
      </svg>
    )
  },
  {
    title: "Collaboration",
    description: "The shared intelligence of our multi-disciplinary team defines our success.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493" />
      </svg>
    )
  },
  {
    title: "Innovation",
    description: "Leveraging technology to push the boundaries of what is possible in construction.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 10-3-3H12" />
      </svg>
    )
  },
  {
    title: "Integrity",
    description: "Ethical practice and honest communication are the pillars of our relationships.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
      </svg>
    )
  },
  {
    title: "Excellence",
    description: "A relentless pursuit of quality in every detail, from concept to handover.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.435.792-.435.965 0l1.831 4.597" />
      </svg>
    )
  }
];

export default function TeamPreviewPage() {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('pieach-team-preview');
    let loadedMember = null;
    if (raw) {
      const parsed = JSON.parse(raw);
      const bioArray = typeof parsed.bio === 'string'
        ? parsed.bio.split(/\r?\n/).map(p => p.trim()).filter(Boolean)
        : (Array.isArray(parsed.bio) ? parsed.bio : []);
      
      const qualArray = Array.isArray(parsed.qualifications)
        ? parsed.qualifications.map(q => {
            if (typeof q === 'string') {
              return { title: q.toUpperCase(), detail: '' };
            }
            return q;
          })
        : [];
      
      loadedMember = {
        ...parsed,
        bio: bioArray,
        qualifications: qualArray
      };
      setMember(loadedMember);
    }

    // Using the imported supabase client directly
    supabase
      .from('team')
      .select('*')
      .order('order_index')
      .then(({ data }) => {
        if (data) {
          const filterSlug = loadedMember ? loadedMember.slug : '';
          setAllMembers(data.filter(m => m.slug !== filterSlug));
        }
      });

    const handleCleanup = () => {
      localStorage.removeItem('pieach-team-preview');
    };

    window.addEventListener('unload', handleCleanup);
    return () => {
      window.removeEventListener('unload', handleCleanup);
      handleCleanup();
    };
  }, []);

  const handlePublish = async () => {
    if (!member) return;
    setIsConfirmOpen(false);
    setIsPublishing(true);

    try {
      const isEdit = member.id && !member.id.toString().startsWith('temp-');
      
      let finalName = member.name || '';
      if (member.title && member.title.trim()) {
        const cleanTitle = member.title.trim();
        if (!finalName.startsWith(cleanTitle + ' ')) {
          finalName = cleanTitle + ' ' + finalName;
        }
      }

      const finalTeamData = {
        name: finalName,
        title: member.title || '',
        role: member.role || '',
        status: member.status || 'active',
        image: member.image || '/assets/team/default.png',
        bio: member.bio || [],
        qualifications: member.qualifications || [],
        slug: member.slug || finalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        displayOrder: member.displayOrder || '0'
      };

      if (isEdit) {
        await teamStore.updateItem(member.id, finalTeamData);
      } else {
        await teamStore.createItem(finalTeamData);
      }

      localStorage.removeItem('pieach-team-preview');
      setSuccess(true);

      setTimeout(() => {
        router.push('/dashboard/team');
      }, 1500);
    } catch (err) {
      console.error("Failed to publish from preview:", err);
      setIsPublishing(false);
    }
  };

  const handleClose = () => {
    window.close();
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8">
        <h2 className="font-serif text-2xl mb-4 text-brand-gold">NO PREVIEW DATA FOUND</h2>
        <p className="text-neutral-400 mb-6 text-sm">Please trigger preview from the team creation or editing page in the dashboard.</p>
        <button onClick={handleClose} className="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:border-brand-gold transition duration-200">
          Close Window
        </button>
      </div>
    );
  }

  let displayName = member.name || '';
  if (member.title && member.title.trim() && !displayName.startsWith(member.title.trim())) {
    displayName = `${member.title.trim()} ${displayName}`;
  }

  return (
    <div className="relative bg-white text-neutral-900">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ease-out forwards;
        }
        .modal-svg-icon {
          width: 56px;
          height: 56px;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        .success-svg { stroke: var(--brand-gold, #D5A73F); }
        .modal-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: strokeCircle 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .modal-check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: strokeCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }
        @keyframes strokeCircle { to { stroke-dashoffset: 0; } }
        @keyframes strokeCheck { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* Dynamic Floating Preview Banner */}
      <div className="sticky top-0 z-[99999] bg-neutral-900 border-b border-brand-gold/30 text-white py-3.5 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gold/20 text-brand-gold text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-brand-gold/30">
            Preview Mode
          </span>
          <span className="font-sans text-xs text-neutral-300 font-medium hidden sm:inline">
            Viewing unsaved profile: <strong className="text-white">{displayName || 'New Member'}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClose} 
            disabled={isPublishing || success}
            className="bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white border border-white/15 px-4.5 py-2 text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm disabled:opacity-50"
          >
            Close
          </button>
          <button 
            onClick={() => setIsConfirmOpen(true)}
            disabled={isPublishing || success}
            className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy border border-brand-gold px-5.5 py-2 text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isPublishing ? 'Publishing...' : success ? 'Published!' : 'Publish Now'}
          </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handlePublish}
        title="Publish Member Profile?"
        message="This will immediately save the team member profile and make it visible on the live website according to its status."
        confirmText="Yes, Publish Profile"
        cancelText="Cancel & Review"
        type="info"
        isLoading={isPublishing}
      />

      {success && (
        <div className="fixed inset-0 z-[999999] bg-neutral-950/85 backdrop-blur-md flex flex-col items-center justify-center text-white">
          <div className="bg-neutral-900 border border-brand-gold/40 p-10 rounded-sm max-w-md text-center shadow-2xl animate-fade-in font-serif">
            <div className="mx-auto mb-6 flex justify-center items-center">
              <svg className="modal-svg-icon success-svg" viewBox="0 0 52 52" style={{ width: '64px', height: '64px' }}>
                <circle className="modal-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="modal-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-brand-gold mb-3 uppercase tracking-wide">Profile Published</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
              The team member profile has been written to Supabase and is now active.
            </p>
            <span className="text-[10px] font-sans text-neutral-500 uppercase tracking-widest animate-pulse">
              Redirecting to dashboard...
            </span>
          </div>
        </div>
      )}

      {/* RENDER BODY EXACTLY LIKE DETAIL PAGE */}
      <div className="bg-white text-neutral-900 pt-32 animate-fade-in">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-10">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-gold transition duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Close Preview
            </button>
          </div>

          <header className="border-b border-neutral-100 pb-6 mb-12">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-3 block">
              {member.role || 'ROLE'}
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-none uppercase">
              {displayName || 'NAME'}
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            <div className="lg:col-span-5 relative aspect-[3/4] rounded-sm overflow-hidden bg-neutral-100 shadow-lg border border-neutral-200/50">
              <img
                src={member.image || '/assets/team/default.png'}
                alt={displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-gold font-serif text-2xl tracking-[0.3em] block">•••</span>
              {(member.bio || []).map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200/80 pt-10 pb-4">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-8 block">
              Qualifications
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(member.qualifications || []).map((q, idx) => (
                <div 
                  key={idx}
                  className="border-l-2 border-brand-gold pl-4 py-1"
                >
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 leading-snug">
                    {q.title}
                  </h4>
                  <span className="font-sans text-[11px] text-neutral-500 font-light block mt-1">
                    {q.detail || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {allMembers.length > 0 && (
          <OurTeamSection title="Other Team Members" members={allMembers} />
        )}
        <TeamValuesSection values={DETAIL_VALUES} title="Core Values" />
        <CTASection />
      </div>
    </div>
  );
}
