"use client";

import { useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper function to render correct SVG icon based on type
function ServiceIcon({ name }) {
  const baseClass = "w-10 h-10 text-brand-gold";

  switch (name) {
    case "architecture":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M5 20v-4h14v4M7 16v-5h10v5M10 11V7h4v4" />
        </svg>
      );
    case "interior":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16M12 12h8" />
        </svg>
      );
    case "landscape":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
        </svg>
      );
    case "project-management":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5L4 17h16L12 5zm0 0v12M4 17h16" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesSection() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // 1. Header fade-in-up stagger
    tl.fromTo(
      ".services-header-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )
    // 2. Horizontal grid lines draw in
    .fromTo(
      [
        ".services-line-h-top",
        ".services-line-h-bottom",
        ".services-line-h-md",
        ".services-line-h-mobile-1",
        ".services-line-h-mobile-2",
        ".services-line-h-mobile-3"
      ],
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.08 },
      "-=0.6"
    )
    // 3. Vertical grid lines draw in
    .fromTo(
      [
        ".services-line-v-1",
        ".services-line-v-2",
        ".services-line-v-3",
        ".services-line-v-md"
      ],
      { scaleY: 0 },
      { scaleY: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.08 },
      "-=0.9"
    )
    // 4. Cards entrance stagger
    .fromTo(
      ".service-card-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.9"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-brown text-white py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-8">
          <div className="services-header-el">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#B5A898] block mb-4">
              WHAT WE OFFER
            </span>
            <h2 className="font-sans font-normal text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-white">
              Our Services
            </h2>
          </div>
          <div className="flex-shrink-0 pt-2 services-header-el">
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-[#c5a880]/60 hover:bg-[#c5a880] hover:text-[#2A1B18] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition duration-300 rounded-none cursor-pointer"
            >
              ALL SERVICES
            </Link>
          </div>
        </div>

        {/* Grid Divider Container */}
        <div className="services-grid-container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {/* Animated Grid lines */}
          {/* Top border line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 services-line-h-top" />
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-right scale-x-0 services-line-h-bottom" />
          
          {/* 3 Vertical dividers for large screens (lg) */}
          <div className="hidden lg:block absolute top-0 left-1/4 w-[1px] h-full bg-white/10 origin-top scale-y-0 services-line-v-1" />
          <div className="hidden lg:block absolute top-0 left-2/4 w-[1px] h-full bg-white/10 origin-top scale-y-0 services-line-v-2" />
          <div className="hidden lg:block absolute top-0 left-3/4 w-[1px] h-full bg-white/10 origin-top scale-y-0 services-line-v-3" />

          {/* 1 Vertical divider for tablet screens (md only) */}
          <div className="hidden md:block lg:hidden absolute top-0 left-1/2 w-[1px] h-full bg-white/10 origin-top scale-y-0 services-line-v-md" />
          {/* 1 Horizontal divider for tablet screens (md only) */}
          <div className="hidden md:block lg:hidden absolute top-1/2 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 services-line-h-md" />

          {/* 3 Horizontal dividers for mobile screens (under md) */}
          <div className="md:hidden absolute top-1/4 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 services-line-h-mobile-1" />
          <div className="md:hidden absolute top-2/4 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 services-line-h-mobile-2" />
          <div className="md:hidden absolute top-3/4 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 services-line-h-mobile-3" />

          {SERVICES.map((service) => (
            <div
              key={service.id}
              onMouseMove={handleMouseMove}
              className="service-card-el relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[360px] bg-transparent group overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/[0.01]"
            >
              {/* Spotlight Glow Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(197, 168, 128, 0.08), transparent 70%)`
                }}
              />

              {/* ID and Icon container */}
              <div className="space-y-6 relative z-10">
                <span className="block font-sans font-semibold text-xs text-[#c5a880] transition-transform duration-500 group-hover:translate-x-1">
                  {service.id}
                </span>
                <div className="text-brand-gold transform transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 origin-left">
                  <ServiceIcon name={service.iconName} />
                </div>
              </div>

              {/* Title and Description */}
              <div className="mt-12 relative z-10">
                <h3 className="font-sans font-medium text-lg lg:text-xl text-white mb-4 transition-colors duration-300 group-hover:text-brand-gold">
                  {service.title}
                </h3>
                <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed font-light transition-colors duration-300 group-hover:text-neutral-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
