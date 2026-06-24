"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DISCIPLINES = [
  {
    num: "01",
    title: "Our Goal",
    description: "Pieach strives for adaptable, purposeful designs that meet client needs and complement their surroundings, blending tradition with timelessness.",
  },
  {
    num: "02",
    title: "Our Vision",
    description: "Empowering a Sustainable, Aesthetically Enriched Future: Crafting architectural excellence that harmonizes culture, sustainability, and enduring beauty.",
  },
  {
    num: "03",
    title: "Our Mission",
    description: "Our practice is based on the belief that the built environment must reflect and celebrate the aesthetic and cultural values of society. We fuse dynamism in cultural contexts that are forever continuous; prioritizing order out of the often-chaotic present. We are painstaking in embracing sustainable methodologies in our work as a commitment to the environment and our collective future.",
  },
];

export default function OurDisciplinesSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // 1. Title fade-in-up and underline border scaleX
    tl.fromTo(
      ".discipline-title-el",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".discipline-title-border",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.0, ease: "power2.inOut" },
      "-=0.6"
    )
    // 2. Cards entrance stagger
    .fromTo(
      ".discipline-card-el",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.7"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-white text-neutral-900 pt-20 pb-28 md:pb-44 lg:pt-24 lg:pb-52 overflow-visible border-b border-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title with full width underline */}
        <div className="relative pb-6 mb-16 overflow-hidden">
          {/* Animated underline border */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E5DCD3] origin-left scale-x-0 discipline-title-border" />
          
          <h2 className="discipline-title-el font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-brown font-normal">
            Our Disciplines
          </h2>
        </div>

        {/* Cards Grid with Staggered Offsets and Collapsed Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:items-stretch overflow-visible">
          {DISCIPLINES.map((discipline, index) => (
            <div 
              key={index}
              className={`discipline-card-el border border-brand-brown p-8 sm:p-10 lg:p-12 bg-white rounded-none transition-all duration-500 flex flex-col group relative z-10 hover:z-20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(42,27,24,0.08)] hover:border-brand-gold hover:bg-[#fbf9f6] cursor-pointer ${
                index === 0
                  ? "md:h-[calc(100%-100px)]"
                  : index === 1
                  ? "md:h-[calc(100%-50px)] -mt-px md:mt-0 md:-ml-px"
                  : "md:h-full md:min-h-[400px] -mt-px md:mt-0 md:-ml-px"
              }`}
            >
              <span className="font-serif text-[11px] text-brand-brown/70 block mb-6 tracking-widest transition-transform duration-500 group-hover:translate-x-1.5 origin-left">
                {discipline.num}
              </span>
              <h3 className="font-sans font-bold text-lg text-neutral-950 mb-4 tracking-tight">
                {discipline.title}
              </h3>
              <p className="font-serif text-neutral-700 text-sm sm:text-[15px] leading-relaxed font-light">
                {discipline.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

