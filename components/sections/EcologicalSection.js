"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EcologicalSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Staggered text reveals
    gsap.fromTo(
      ".eco-reveal-el",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // 2. Image container fade & scale reveal
    gsap.fromTo(
      ".eco-img-container",
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // 3. Borders drawing loop around card
    const borderTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".eco-container-card",
        start: "top 85%",
      }
    });
    
    borderTl.to(".eco-border-top", { scaleX: 1, duration: 0.5, ease: "power1.inOut" })
            .to(".eco-border-right", { scaleY: 1, duration: 0.5, ease: "power1.inOut" }, "-=0.1")
            .to(".eco-border-bottom", { scaleX: 1, duration: 0.5, ease: "power1.inOut" }, "-=0.1")
            .to(".eco-border-left", { scaleY: 1, duration: 0.5, ease: "power1.inOut" }, "-=0.1");

    // 4. Stats counting up
    const stats = gsap.utils.toArray(".eco-stat-num");
    stats.forEach((stat) => {
      const targetVal = parseInt(stat.getAttribute("data-target"), 10);
      const suffix = stat.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetVal,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
        },
        onUpdate: () => {
          stat.textContent = Math.floor(obj.val) + suffix;
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Bordered card container */}
        <div className="eco-container-card relative p-8 sm:p-12 lg:p-16 rounded-none bg-white shadow-sm overflow-hidden">
          {/* Animated Borders */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-200/80 origin-left scale-x-0 eco-border-top" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-neutral-200/80 origin-top scale-y-0 eco-border-right" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/80 origin-right scale-x-0 eco-border-bottom" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-neutral-200/80 origin-bottom scale-y-0 eco-border-left" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Image */}
            <div className="eco-img-container lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 group shadow-sm">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/service_landscape.png')" }}
              />
              <div className="absolute inset-0 bg-black/5 opacity-100 pointer-events-none" />
            </div>

            {/* Right Column Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eco-reveal-el font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-2 block">
                Sustainability
              </span>
              <h2 className="eco-reveal-el font-sans font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
                Ecological Responsibility
              </h2>
              <p className="eco-reveal-el font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                We integrate passive solar design, natural ventilation, greywater systems, and locally sourced low-carbon materials in our specifications to reduce carbon footprint.
              </p>

              {/* Stats Boxes */}
              <div className="eco-reveal-el grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                <div className="bg-brand-light-gray p-6 rounded-sm text-center border border-neutral-100">
                  <span 
                    className="eco-stat-num font-sans font-black text-2xl sm:text-3xl text-neutral-950 leading-none tracking-tight block tabular-nums"
                    data-target="80"
                    data-suffix="%"
                  >
                    0%
                  </span>
                  <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-500 uppercase block mt-2">
                    Passive Cooling
                  </span>
                </div>

                <div className="bg-brand-light-gray p-6 rounded-sm text-center border border-neutral-100">
                  <span 
                    className="eco-stat-num font-sans font-black text-2xl sm:text-3xl text-neutral-950 leading-none tracking-tight block tabular-nums"
                    data-target="45"
                    data-suffix="%"
                  >
                    0%
                  </span>
                  <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-500 uppercase block mt-2">
                    Water Recycling
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
