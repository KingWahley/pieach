"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTORS = [
  { name: "Residential", image: "/assets/sector_residential.png" },
  { name: "Commercial", image: "/assets/sector_commercial.png" },
  { name: "Hospitality", image: "/assets/sector_hospitality.png" },
  { name: "Civic", image: "/assets/sector_civic.png" },
];

export default function IndustriesWeShapeSection() {
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

    // 1. Draw the header bottom line and fade/slide up the title
    tl.to(".industries-header-line", {
      scaleX: 1,
      duration: 1,
      ease: "power2.inOut"
    })
    .fromTo(
      ".industries-header-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.8" // overlaps with line drawing
    )
    // 2. Stagger fade, slide, and scale up the sector cards
    .fromTo(
      ".sector-card",
      { opacity: 0, y: 45, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.4" // overlaps with header animation
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-light-gray text-neutral-900 py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="relative mb-12 pb-6 overflow-hidden">
          <h2 className="industries-header-title font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-none">
            Industries We Shape
          </h2>
          <div className="industries-header-line absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-300/40 origin-left scale-x-0" />
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTORS.map((sector, index) => (
            <div
              key={index}
              className="sector-card relative aspect-[3/4] rounded-sm overflow-hidden shadow-md group bg-neutral-900"
            >
              {/* Background Image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url('${sector.image}')` }}
              />

              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Centered Sector Name Overlay (Bottom) */}
              <div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4">
                <span className="font-sans font-black text-sm uppercase tracking-[0.25em] text-white group-hover:text-brand-gold transition duration-300">
                  {sector.name}
                </span>
                
                {/* Decorative short line */}
                <div className="w-6 h-[2px] bg-brand-gold mx-auto mt-2.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              
              {/* Thin Outer Border on Hover */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-brand-gold/30 transition duration-300 pointer-events-none z-20" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
