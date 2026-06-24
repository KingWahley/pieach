"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FormMeetsFunctionSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // 1. Draw the divider lines (vertical on desktop, horizontal on mobile)
    tl.to([".fmf-divider-v", ".fmf-divider-h"], {
      scaleX: 1,
      scaleY: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    // 2. Fade & slide in the content
    .fromTo(
      ".fmf-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6" // overlaps with the line drawing
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-brown text-white py-20 lg:py-24 border-b border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Tagline */}
          <div className="relative pb-8 lg:pb-0 lg:col-span-4">
            <h2 className="fmf-el font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-brand-gold tracking-tight leading-tight uppercase">
              Form Meets<br />
              Function.
            </h2>
            {/* Horizontal Divider for Mobile (draws bottom edge of left col) */}
            <div className="fmf-divider-h absolute left-0 right-0 bottom-0 h-[1.5px] bg-white/10 lg:hidden origin-left scale-x-0" />
          </div>

          {/* Right Column Core Paragraphs */}
          <div className="relative lg:pl-12 lg:col-span-8 space-y-6">
            {/* Vertical Divider for Desktop (draws left edge of right col) */}
            <div className="fmf-divider-v absolute top-0 bottom-0 left-0 w-[1.5px] bg-white/10 hidden lg:block origin-top scale-y-0" />

            <p className="fmf-el font-serif text-lg sm:text-2xl lg:text-3xl text-brand-gold leading-relaxed font-light">
              We offer a comprehensive range of architectural, interior, landscape, and project management services designed to bring visionary ideas to life.
            </p>
            <p className="fmf-el font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
              Every project is approached with creativity, technical expertise, and a deep understanding of how people interact with spaces, allowing us to deliver environments that are functional, timeless, and sustainable.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
