"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    description: "Researching context, climate, and client vision.",
  },
  {
    num: "02",
    title: "Concept",
    description: "Initial sketches and spatial modeling.",
  },
  {
    num: "03",
    title: "Planning",
    description: "Rigorous structural and technical alignment.",
  },
  {
    num: "04",
    title: "Technical",
    description: "Detailed documentation and engineering.",
  },
  {
    num: "05",
    title: "Construction",
    description: "On-site management and artisanal precision.",
  },
  {
    num: "06",
    title: "Delivery",
    description: "Final walkthrough and space activation.",
  },
];

export default function BlueprintJourneySection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Desktop Timeline
    const tlDesktop = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 1. Header fade/slide up
    tlDesktop.fromTo(
      ".bp-header",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // 2. Horizontal line drawing
    tlDesktop.to(".bp-line-h", {
      scaleX: 1,
      duration: 1,
      ease: "power1.inOut"
    }, "-=0.3");

    // 3. Stagger step columns on desktop
    tlDesktop.fromTo(
      ".bp-step-desktop",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
      "-=0.8" // overlaps with the line drawing
    );

    // Mobile Timeline
    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // 1. Vertical line drawing
    tlMobile.to(".bp-line-v", {
      scaleY: 1,
      duration: 1.2,
      ease: "power1.inOut"
    }, "-=0.3");

    // 2. Stagger step cards on mobile
    tlMobile.fromTo(
      ".bp-step-mobile",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=1.0"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-light-gray text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-200/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="bp-header text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-none">
            The Blueprint Journey
          </h2>
        </div>

        {/* Timeline Desktop (Hidden on mobile) */}
        <div className="hidden lg:block relative w-full pt-10 pb-8">
          
          {/* Horizontal Connecting Line */}
          <div className="bp-line-h absolute top-[68px] left-[8%] right-[8%] h-[1px] bg-neutral-300 z-0 origin-left scale-x-0" />
          
          {/* Steps Row */}
          <div className="grid grid-cols-6 gap-6 relative z-10">
            {STEPS.map((step) => (
              <div 
                key={step.num} 
                className="bp-step-desktop group cursor-pointer flex flex-col items-center text-center"
              >
                
                {/* Number Box */}
                <div className="w-14 h-14 bg-white border border-neutral-300 rounded-sm flex items-center justify-center font-sans font-bold text-xs text-brand-gold shadow-sm transition duration-300 mb-6 group-hover:scale-105 group-hover:-rotate-3 group-hover:border-brand-gold group-hover:shadow-md">
                  {step.num}
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-neutral-950 mb-3 group-hover:text-brand-gold transition duration-200">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-neutral-500 text-[11px] leading-relaxed max-w-[150px] font-light">
                  {step.description}
                </p>

              </div>
            ))}
          </div>

        </div>

        {/* Timeline Mobile & Tablet (Hidden on desktop) */}
        <div className="block lg:hidden relative pl-8 space-y-12">
          
          {/* Vertical Connecting Line */}
          <div className="bp-line-v absolute top-4 bottom-4 left-[27px] w-[1px] bg-neutral-300 z-0 origin-top scale-y-0" />
          
          {STEPS.map((step) => (
            <div 
              key={step.num} 
              className="bp-step-mobile group cursor-pointer relative flex items-start space-x-6 z-10"
            >
              
              {/* Number Box */}
              <div className="w-14 h-14 bg-white border border-neutral-300 rounded-sm flex items-center justify-center font-sans font-bold text-xs text-brand-gold shadow-sm flex-shrink-0 transition duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:border-brand-gold group-hover:shadow-md">
                {step.num}
              </div>
              
              {/* Text details */}
              <div className="pt-2">
                <h3 className="font-serif text-lg font-bold text-neutral-950 mb-1 group-hover:text-brand-gold transition duration-200">
                  {step.title}
                </h3>
                <p className="font-sans text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
