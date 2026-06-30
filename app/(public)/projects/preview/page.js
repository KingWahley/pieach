// app/(public)/projects/preview/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectDetailsHeroSection from "@/components/sections/ProjectDetailsHeroSection";
import TeamQuoteSection from "@/components/sections/TeamQuoteSection";
import DescriptionCollapse from "@/components/projects/DescriptionCollapse";
import CTASection from "@/components/sections/CTASection";
import { projectsStore } from '@/lib/store';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function ProjectPreviewPage() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('pieach-project-preview');
    if (raw) {
      setProject(JSON.parse(raw));
    }

    const handleCleanup = () => {
      localStorage.removeItem('pieach-project-preview');
    };

    // Remove item when tab is closed, navigated away, or unmounted
    window.addEventListener('unload', handleCleanup);
    return () => {
      window.removeEventListener('unload', handleCleanup);
      handleCleanup();
    };
  }, []);

  const handlePublish = async () => {
    if (!project) return;
    setIsConfirmOpen(false);
    setIsPublishing(true);

    try {
      const isEdit = project.id && !project.id.toString().startsWith('temp-');
      
      const finalProjectData = {
        title: project.title,
        status: project.status || 'Ongoing',
        location: project.location,
        category: project.category,
        subtitle: project.subtitle,
        description: project.description,
        image: project.image || (project.gallery && project.gallery[0]) || '/assets/projects/default.png',
        gallery: project.gallery || [],
        galleryCount: project.gallery ? project.gallery.length : 0,
        additionalFields: project.additionalFields || [],
        slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        date: project.date || new Date().toISOString().split('T')[0]
      };

      if (isEdit) {
        projectsStore.updateItem(project.id, finalProjectData);
      } else {
        projectsStore.createItem(finalProjectData);
      }

      // Clear preview data
      localStorage.removeItem('pieach-project-preview');
      setSuccess(true);

      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1500);
    } catch (err) {
      console.error("Failed to publish from preview:", err);
      setIsPublishing(false);
    }
  };

  const handleClose = () => {
    window.close();
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8">
        <h2 className="font-serif text-2xl mb-4 text-brand-gold">NO PREVIEW DATA FOUND</h2>
        <p className="text-neutral-400 mb-6 text-sm">Please trigger preview from the project creation or editing page in the dashboard.</p>
        <button onClick={handleClose} className="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:border-brand-gold transition duration-200">
          Close Window
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white text-neutral-900">
      {/* Styles for custom CSS animations */}
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
        .info-svg { stroke: var(--brand-gold, #D5A73F); }
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
            Viewing unsaved draft: <strong className="text-white">{project.title || 'Untitled Project'}</strong>
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

      {/* Animated Confirmation Popup Modal */}
      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handlePublish}
        title="Publish to Portfolio?"
        message="This will immediately write the project to the live portfolio site. Please ensure all visuals, descriptions, and technical specifications are correct."
        confirmText="Yes, Publish Project"
        cancelText="Cancel & Review"
        type="info"
        isLoading={isPublishing}
      />

      {/* Success Notification Overlay */}
      {success && (
        <div className="fixed inset-0 z-[999999] bg-neutral-950/85 backdrop-blur-md flex flex-col items-center justify-center text-white">
          <div className="bg-neutral-900 border border-brand-gold/40 p-10 rounded-sm max-w-md text-center shadow-2xl animate-fade-in font-serif">
            <div className="mx-auto mb-6 flex justify-center items-center">
              <svg className="modal-svg-icon success-svg" viewBox="0 0 52 52" style={{ width: '64px', height: '64px' }}>
                <circle className="modal-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="modal-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-brand-gold mb-3 uppercase tracking-wide">Project Published</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
              The project has been written to Supabase and is now live on the portfolio site.
            </p>
            <span className="text-[10px] font-sans text-neutral-500 uppercase tracking-widest animate-pulse">
              Redirecting to dashboard...
            </span>
          </div>
        </div>
      )}

      {/* 1. Hero Banner Section */}
      <ProjectDetailsHeroSection 
        title={project.title || 'Untitled Project'}
        category={project.category || 'Category'}
        location={project.location || 'Location, State, Country'}
        image={project.image || (project.gallery && project.gallery[0]) || '/assets/projects/default.png'}
      />

      {/* 2. Project Overview Section */}
      <section className="bg-brand-brown text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Section Title */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight uppercase">
                PROJECT<br />OVERVIEW
              </h2>
            </div>
            
            {/* Right Column: Narrative & Technical Specs Grid */}
            <div className="lg:col-span-8">
              <DescriptionCollapse html={project.description || 'Project description narrative goes here.'} />
              
              {/* Thin horizontal line */}
              <div className="w-full h-[1px] bg-white/20 mb-12" />

              {/* Technical Specs Grid without borders (Only displaying non-empty specs) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                {[
                  { label: 'PROJECT TYPE', value: project.specs?.projectType || project.category },
                  { label: 'STATUS', value: project.specs?.status || project.status },
                  { label: 'SITE AREA', value: project.specs?.siteArea },
                  { label: 'LEAD ARCHITECT', value: project.specs?.leadArchitect },
                  { label: 'BUILT AREA', value: project.specs?.builtArea },
                  { label: 'SERVICES', value: project.specs?.services, isServices: true }
                ].filter(item => item.value && item.value !== 'N/A' && item.value.trim() !== '').map((item, idx) => (
                  <div key={idx}>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">{item.label}</span>
                    {item.isServices ? (
                      <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">
                        {item.value.split(",").map((service, idx, arr) => (
                          <span key={idx} className="block">
                            {service.trim()}{idx < arr.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Custom Sections rendered here */}
      {project.additionalFields && project.additionalFields.length > 0 && (
        <section className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900 border-b border-neutral-150">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {project.additionalFields.map((field) => (
                <div key={field.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-neutral-950">
                      {field.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="font-sans text-neutral-600 text-sm leading-relaxed max-w-3xl custom-rich-text-light" dangerouslySetInnerHTML={{ __html: field.body || '' }} />
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              .custom-rich-text-light p { margin: 0 0 1em; }
              .custom-rich-text-light h3 { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #111; margin: 1.5em 0 0.5em; }
              .custom-rich-text-light b, .custom-rich-text-light strong { font-weight: 700; color: #111; }
              .custom-rich-text-light i, .custom-rich-text-light em { font-style: italic; }
              .custom-rich-text-light u { text-decoration: underline; text-underline-offset: 3px; }
              .custom-rich-text-light ul { list-style: disc; padding-left: 1.4em; margin: 0.5em 0 1em; }
              .custom-rich-text-light ol { list-style: decimal; padding-left: 1.4em; margin: 0.5em 0 1em; }
              .custom-rich-text-light li { margin: 0.3em 0; }
              .custom-rich-text-light *, .custom-rich-text-light span, .custom-rich-text-light div { background-color: transparent !important; background: transparent !important; }
            `}</style>
          </div>
        </section>
      )}

      {/* 3. Project Gallery Section */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-3 block">
              TECHNICAL VISUALISATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-none uppercase">
              Project Gallery
            </h2>
          </div>

          {/* Grid Layout of 5 Images */}
          <div className="space-y-6">
            {/* 1 Large Full-Width Image */}
            {project.gallery && project.gallery[0] && (
              <div className="relative aspect-[16/7] md:aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src={project.gallery[0]}
                  alt="gallery visual 1"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}

            {/* Row 2: 2 Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery && project.gallery[1] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[1]}
                    alt="gallery visual 2"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              {project.gallery && project.gallery[2] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[2]}
                    alt="gallery visual 3"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Row 3: 2 Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery && project.gallery[3] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[3]}
                    alt="gallery visual 4"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              {project.gallery && project.gallery[4] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[4]}
                    alt="gallery visual 5"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Reused Quote & CTA Sections */}
      <TeamQuoteSection />
      <CTASection />
    </div>
  );
}
