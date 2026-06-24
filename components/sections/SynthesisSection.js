"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SynthesisSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Text blocks staggered fade-in-up
    gsap.fromTo(
      ".synthesis-fade-el",
      { opacity: 0, y: 30 },
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

    // 2. Borders drawing in on scroll
    gsap.fromTo(
      ".synthesis-border-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".synthesis-stats-container",
          start: "top 85%",
        }
      }
    );

    // 3. Stats counting up
    const stats = gsap.utils.toArray(".synthesis-stat-num");
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
      id="synthesis" 
      className="bg-white text-neutral-900 py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column Heading */}
          <div className="lg:col-span-5 synthesis-fade-el">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-4 block">
              About Us
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-4xl text-neutral-950 tracking-tight leading-tight uppercase">
              The Synthesis of <br />
              Form & Purpose
            </h2>
          </div>

          {/* Right Column Body Text */}
          <div className="lg:col-span-7 space-y-6 synthesis-fade-el">
            <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed font-light">
              Established in 1997, <strong>PIEACH Limited</strong> is a multi-disciplinary practice of visionary specialists in architecture, master planning, interior design, and project management. Based in West Africa, our work spans from commercial workspaces and retail developments, custom office workspaces, residential estates, hospitality, and civic projects.
            </p>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Our design approach is rooted in meticulous research, structural integrity, and close collaboration. We design spaces that inspire, connect, and elevate the human experience. We shape our buildings; thereafter they shape us.
            </p>
          </div>

        </div>

        {/* Stats Row with borders */}
        <div className="synthesis-stats-container relative py-10">
          {/* Animated Borders */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-200/80 origin-left scale-x-0 synthesis-border-line" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/80 origin-right scale-x-0 synthesis-border-line" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 justify-items-center">
            
            {/* Stat 1 */}
            <div className="text-center">
              <span 
                className="synthesis-stat-num font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight"
                data-target="100"
                data-suffix="+"
              >
                0+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Completed Projects
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <span 
                className="synthesis-stat-num font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight"
                data-target="20"
                data-suffix="+"
              >
                0+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Awards Won
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <span 
                className="synthesis-stat-num font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight"
                data-target="250"
                data-suffix="+"
              >
                0+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Happy Clients
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
