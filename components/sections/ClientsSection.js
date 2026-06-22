'use client';

import React, { useRef } from "react";
import { PARTNERS } from "@/lib/constants";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic partner logo component rendering the local assets
function PartnerLogo({ name, src }) {
  return (
    <div className="flex items-center justify-center opacity-85 hover:opacity-100 transition duration-300">
      <img
        src={src}
        alt={`${name} Logo`}
        className="h-10 md:h-12 w-auto object-contain"
      />
    </div>
  );
}

export default function ClientsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header animation: slide right & fade
    gsap.fromTo(
      '.client-header-text',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );

    // Logos container: scale up, fade in from bottom
    gsap.fromTo(
      '.client-logo-container',
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.client-logo-container',
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-navy text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-t border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="mb-10 text-left">
          <span className="client-header-text font-sans font-bold text-xs uppercase tracking-[0.2em] text-brand-gold block mb-3">
            Clients & Partners
          </span>
          <h2 className="client-header-text font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Trusted Worldwide
          </h2>
        </div>

        {/* Logos Container with Infinite Marquee */}
        <div className="client-logo-container w-full border-t border-white/10 pt-10 overflow-hidden relative">
          <div className="animate-marquee hover:[animation-play-state:paused] flex gap-20 items-center">
            {/* Set 1 */}
            {PARTNERS.map((partner, idx) => (
              <div key={`logo-1-${idx}`} className="flex items-center justify-center min-w-[120px] md:min-w-[160px] flex-shrink-0">
                <PartnerLogo name={partner.name} src={partner.logoSrc} />
              </div>
            ))}
            {/* Set 2 (for infinite loop) */}
            {PARTNERS.map((partner, idx) => (
              <div key={`logo-2-${idx}`} className="flex items-center justify-center min-w-[120px] md:min-w-[160px] flex-shrink-0">
                <PartnerLogo name={partner.name} src={partner.logoSrc} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
