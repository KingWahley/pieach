"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareerDetailsHeroSection({ title, location, type, requirements }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Content Stagger entrance immediately on page load
    const tl = gsap.timeline();
    tl.fromTo(
      ".career-details-hero-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // 2. Fixed background parallax curtain reveal effect
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: () => containerRef.current.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative text-white h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden border-b border-neutral-200 bg-neutral-900"
    >
      {/* Background (solid color) - GSAP translates it down to remain visually fixed */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-[#B5A898] scale-105"
      />

      <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
        
        {/* Top row: Title/Info and Apply Button */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="space-y-3 max-w-4xl">
            <h1 className="career-details-hero-el font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
              {title}
            </h1>
            <span className="career-details-hero-el block font-sans text-xs font-bold tracking-[0.25em] text-white/90 uppercase">
              {location.toUpperCase()} — {type.toUpperCase()}
            </span>
            <p className="career-details-hero-el font-sans text-white/80 text-sm sm:text-base leading-relaxed font-light pt-2">
              {requirements}
            </p>
          </div>

          {/* Apply Button */}
          <div className="career-details-hero-el flex-shrink-0 pt-2">
            <a
              href="#application-form"
              className="inline-flex items-center justify-center bg-white text-neutral-900 text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md hover:bg-brand-gold hover:text-white transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              APPLY
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
