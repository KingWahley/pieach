"use client";

import { useRef, useState, useEffect } from "react";
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
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollTimeoutRef = useRef(null);

  // Initialize scroll position to the first item of the middle set (Set 2)
  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) {
      const singleSetWidth = scroll.scrollWidth / 3;
      scroll.scrollLeft = singleSetWidth;
    }
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleScroll = (e) => {
    const scroll = e.currentTarget;
    const scrollLeft = scroll.scrollLeft;
    const singleSetWidth = scroll.scrollWidth / 3;

    // Progress bar math based on the middle set travel
    const middleSetTravel = singleSetWidth - scroll.clientWidth;
    if (middleSetTravel > 0) {
      const relativeScroll = scrollLeft % singleSetWidth;
      const progress = Math.min(1, Math.max(0, relativeScroll / middleSetTravel));
      setScrollProgress(progress);
    }

    // Debounce the loop jump to happen only after scroll settles to prevent snapping physics glitches
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      if (scrollLeft >= singleSetWidth * 2) {
        scroll.scrollLeft = scrollLeft - singleSetWidth;
      } else if (scrollLeft < singleSetWidth) {
        scroll.scrollLeft = scrollLeft + singleSetWidth;
      }
    }, 150);
  };

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
    );

    // Stagger desktop grid cards or fade up mobile carousel depending on viewport
    if (window.innerWidth >= 768) {
      tl.fromTo(
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
        "-=0.4"
      );
    } else {
      tl.fromTo(
        ".mobile-marquee-wrap",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.4"
      );
    }
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

        {/* Desktop Sectors Grid (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTORS.map((sector, index) => (
            <div
              key={`desk-${index}`}
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

        {/* Mobile Swipeable Infinite Scroll Carousel (Hidden on Desktop) */}
        <div className="mobile-marquee-wrap block md:hidden w-full relative overflow-hidden select-none py-2">
          {/* Faded edges gradients for a premium visual overlay */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-light-gray to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-light-gray to-transparent z-20 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-6 items-center"
          >
            {/* Set 1 */}
            {SECTORS.map((sector, index) => (
              <div
                key={`mob-1-${index}`}
                className="relative w-[65vw] aspect-[3/4] rounded-sm overflow-hidden shadow-lg group bg-neutral-900 shrink-0 snap-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100"
                  style={{ backgroundImage: `url('${sector.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4">
                  <span className="font-sans font-black text-xs uppercase tracking-[0.25em] text-white">
                    {sector.name}
                  </span>
                  <div className="w-6 h-[2px] bg-brand-gold mx-auto mt-2" />
                </div>
              </div>
            ))}
            {/* Set 2 (for infinite loop) */}
            {SECTORS.map((sector, index) => (
              <div
                key={`mob-2-${index}`}
                className="relative w-[65vw] aspect-[3/4] rounded-sm overflow-hidden shadow-lg group bg-neutral-900 shrink-0 snap-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100"
                  style={{ backgroundImage: `url('${sector.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4">
                  <span className="font-sans font-black text-xs uppercase tracking-[0.25em] text-white">
                    {sector.name}
                  </span>
                  <div className="w-6 h-[2px] bg-brand-gold mx-auto mt-2" />
                </div>
              </div>
            ))}
            {/* Set 3 (for infinite loop) */}
            {SECTORS.map((sector, index) => (
              <div
                key={`mob-3-${index}`}
                className="relative w-[65vw] aspect-[3/4] rounded-sm overflow-hidden shadow-lg group bg-neutral-900 shrink-0 snap-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100"
                  style={{ backgroundImage: `url('${sector.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4">
                  <span className="font-sans font-black text-xs uppercase tracking-[0.25em] text-white">
                    {sector.name}
                  </span>
                  <div className="w-6 h-[2px] bg-brand-gold mx-auto mt-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar Track */}
          <div className="w-32 h-[2px] bg-neutral-300/30 rounded-full overflow-hidden mt-6 mx-auto relative">
            <div 
              className="absolute inset-y-0 left-0 bg-brand-gold w-full origin-left transition-transform duration-100 ease-out"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
