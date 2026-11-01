"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function LightboxTriggerButton({ onClick, label = "View full image" }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-sm bg-black/65 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-sm border border-white/20 hover:border-brand-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md cursor-pointer active:scale-95"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    </button>
  );
}

export function ProjectLightboxModal({ images = [], activeIndex, onClose, onSelectIndex }) {
  const [mounted, setMounted] = useState(false);
  const isOpen = activeIndex !== null && activeIndex !== undefined && images.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!images.length) return;
      onSelectIndex((activeIndex - 1 + images.length) % images.length);
    },
    [activeIndex, images.length, onSelectIndex]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!images.length) return;
      onSelectIndex((activeIndex + 1) % images.length);
    },
    [activeIndex, images.length, onSelectIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!mounted || !isOpen) return null;

  const currentSrc = images[activeIndex];
  if (!currentSrc) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close full screen image"
        className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:text-brand-navy border border-white/20 hover:border-brand-gold flex items-center justify-center transition duration-200 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:text-brand-navy border border-white/20 hover:border-brand-gold flex items-center justify-center transition duration-200 cursor-pointer active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Full Image */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentSrc}
          alt={`Project view ${activeIndex + 1}`}
          className="max-w-[90vw] max-h-[88vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        />
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:text-brand-navy border border-white/20 hover:border-brand-gold flex items-center justify-center transition duration-200 cursor-pointer active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>,
    document.body
  );
}

export function ProjectGalleryWithLightbox({ gallery = [], title = "Project" }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="space-y-6">
        {/* First image: full-width hero */}
        <div
          onClick={() => setActiveIndex(0)}
          className="group relative aspect-[16/7] md:aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100 cursor-pointer"
        >
          <Image
            src={gallery[0]}
            alt={`${title} – image 1`}
            fill
            sizes="100vw"
            priority
            className="absolute inset-0 w-full h-full object-cover object-top cursor-pointer"
          />
          <LightboxTriggerButton onClick={() => setActiveIndex(0)} />
        </div>

        {/* Remaining images: 2 per row */}
        {Array.from({ length: Math.ceil((gallery.length - 1) / 2) }).map((_, rowIdx) => {
          const idxA = 1 + rowIdx * 2;
          const idxB = 2 + rowIdx * 2;
          const a = gallery[idxA];
          const b = gallery[idxB];
          return (
            <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {a && (
                <div
                  onClick={() => setActiveIndex(idxA)}
                  className="group relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100 cursor-pointer"
                >
                  <Image
                    src={a}
                    alt={`${title} – image ${idxA + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top cursor-pointer"
                  />
                  <LightboxTriggerButton onClick={() => setActiveIndex(idxA)} />
                </div>
              )}
              {b && (
                <div
                  onClick={() => setActiveIndex(idxB)}
                  className="group relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100 cursor-pointer"
                >
                  <Image
                    src={b}
                    alt={`${title} – image ${idxB + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top cursor-pointer"
                  />
                  <LightboxTriggerButton onClick={() => setActiveIndex(idxB)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ProjectLightboxModal
        images={gallery}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onSelectIndex={setActiveIndex}
      />
    </>
  );
}
