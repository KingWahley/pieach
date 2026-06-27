"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OurTeamSection({ excludeSlug = "", title = "Our Team", members = [] }) {
  const containerRef = useRef(null);

  const filteredMembers = excludeSlug 
    ? members.filter((m) => m.slug !== excludeSlug)
    : members;

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    tl.to(".team-header-line", {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .fromTo(
      [".team-header-title", ".team-header-text"],
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".team-card",
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="relative pb-4 inline-block mb-2">
            <h2 className="team-header-title font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight uppercase">
              {title}
            </h2>
            <div className="team-header-line absolute left-0 bottom-0 h-[1.5px] bg-brand-gold w-full origin-left scale-x-0" />
          </div>
          {title === "Our Team" && (
            <p className="team-header-text font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light mt-4">
              At Pieach, we believe that design is a collaborative effort. By assembling a team with diverse perspectives, we ensure that every design is meticulous, functional, and visually impactful.
            </p>
          )}
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="team-card group relative flex flex-col rounded-sm overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 bg-[#fafafa] transition duration-300 cursor-pointer"
            >
              {/* CAD drawing borders on hover */}
              <span className="absolute top-0 left-0 h-[1.5px] bg-brand-gold w-0 transition-all duration-200 ease-out group-hover:w-full z-30" />
              <span className="absolute top-0 right-0 w-[1.5px] bg-brand-gold h-0 transition-all duration-200 ease-out group-hover:h-full delay-100 z-30" />
              <span className="absolute bottom-0 right-0 h-[1.5px] bg-brand-gold w-0 transition-all duration-200 ease-out group-hover:w-full delay-200 z-30" />
              <span className="absolute bottom-0 left-0 w-[1.5px] bg-brand-gold h-0 transition-all duration-200 ease-out group-hover:h-full delay-300 z-30" />

              {/* Profile Image container */}
              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Thin overlay grid lines for architectural blueprint vibe */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              </div>

              {/* Bottom Sand-Bronze Overlay card */}
              <div className="bg-[#b3a18b] py-5 px-4 text-center border-t border-brand-gold/10 group-hover:bg-[#a2907a] transition duration-300">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
                  {member.name}
                </h3>
                <span className="font-sans text-[9px] font-medium uppercase tracking-widest text-white/80 block mt-1">
                  {member.role}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
