"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import ProjectsHeroSection from "@/components/sections/ProjectsHeroSection";
import BlogSection from "@/components/sections/BlogSection";
import PhilosophyQuoteSection from "@/components/sections/PhilosophyQuoteSection";
import RegionalImpactSection from "@/components/sections/RegionalImpactSection";
import CTASection from "@/components/sections/CTASection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hasScrolledIn, setHasScrolledIn] = useState(false);

  const introRef = useRef(null);
  const gridRef = useRef(null);
  const featuredRef = useRef(null);
  const statsRef = useRef(null);

  const filterTabs = [
    { id: "all", label: "ALL" },
    { id: "residential", label: "RESIDENTIAL" },
    { id: "commercial", label: "COMMERCIAL" },
    { id: "hospitality", label: "HOSPITALITY" },
    { id: "masterplanning", label: "MASTERPLANNING" },
    { id: "sustainable", label: "SUSTAINABLE" },
  ];

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.groups && p.groups.includes(activeFilter));

  // 1. Introduction Section Animation
  useGSAP(() => {
    if (!introRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".intro-title",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(
      ".intro-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: introRef });

  // 2. Grid Tabs scroll-in trigger
  useGSAP(() => {
    if (!gridRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: () => setHasScrolledIn(true)
      }
    });
    tl.fromTo(
      ".grid-tab",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, { scope: gridRef });

  // 3. Grid Cards Entrance & Filter Transition animation
  useGSAP(() => {
    if (!hasScrolledIn || !gridRef.current) return;
    gsap.fromTo(
      ".grid-card",
      { opacity: 0, y: 40, rotate: 0.8, scale: 0.98 },
      { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, { dependencies: [hasScrolledIn, activeFilter], scope: gridRef });

  // 4. Featured Section Animation
  useGSAP(() => {
    if (!featuredRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featuredRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".featured-img-wrap",
      { opacity: 0, scale: 1.15 },
      { opacity: 0.85, scale: 1.02, duration: 1.2, ease: "power2.out" }
    )
    .fromTo(
      ".featured-el",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: featuredRef });

  // 5. Stats count-up animation
  useGSAP(() => {
    if (!statsRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".stat-col",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" }
    );

    const statNumbers = statsRef.current.querySelectorAll(".stat-number");
    statNumbers.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target"), 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%"
        },
        onUpdate: () => {
          el.innerText = `${Math.floor(obj.val)}+`;
        }
      });
    });
  }, { scope: statsRef });

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <ProjectsHeroSection />

      {/* 2. Introduction Section */}
      <section ref={introRef} className="py-20 lg:py-24 border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Our Work title */}
            <div className="lg:col-span-4">
              <h2 className="intro-title font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-none uppercase">
                Our Work
              </h2>
            </div>
            {/* Right Column: Paragraphs */}
            <div className="lg:col-span-8 space-y-6">
              <p className="intro-text font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                PIEACH Limited collaborates with visionaries, developers, and civic organizations to deliver high-performance physical structures. From luxury estates to mixed-use corporate high-rises, each project represents a rigorous synthesis of site context, structural compliance, and environmental responsibility.
              </p>
              <p className="intro-text font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                Our design methodology prioritizes spatial logic, daylighting optimization, and biophilic integration, creating timeless spaces that improve the daily life of their occupants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Grid & Interactive Filters */}
      <section ref={gridRef} id="projects-grid-section" className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs Row */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 border-b border-neutral-100 pb-6">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  type="button"
                  className={`grid-tab px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest transition duration-200 border rounded-sm cursor-pointer
                    ${isActive 
                      ? "bg-brand-gold border-brand-gold text-brand-navy font-bold shadow-sm" 
                      : "bg-white border-neutral-200 text-neutral-500 hover:border-brand-gold hover:text-brand-gold"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id}
                href={`/projects/${project.slug}`}
                className="grid-card group flex flex-col justify-between border border-neutral-100/50 bg-[#fafafa]/40 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
              >
                {/* Square Image container with hover zoom */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center zoom-effect"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Text Info */}
                <div className="p-6">
                  <span className="font-sans font-bold text-[9px] tracking-widest text-brand-gold uppercase block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-sans font-bold text-sm text-neutral-900 uppercase tracking-wide leading-snug">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Featured clay-brown split Section */}
      <section ref={featuredRef} className="bg-[#2A1B18] text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Full-Bleed Image (Grayscale Facade) */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-800 shadow-2xl border border-white/5">
              <div 
                className="featured-img-wrap absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity hover:opacity-100 transition duration-500 scale-102"
                style={{ backgroundImage: "url('/assets/our work/Landmark EcoFriendlyOffice.png')" }}
              />
              <div className="absolute inset-0 bg-brand-brown/10 pointer-events-none" />
            </div>

            {/* Right Column: Featured details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="featured-el font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-2 block">
                FEATURED PROJECT
              </span>
              <h2 className="featured-el font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight uppercase">
                Landmark EcoFriendlyOffice
              </h2>
              <p className="featured-el font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                Our design for the Landmark EcoFriendlyOffice in Victoria Island integrates a passive cooling facade with architectural curves that optimize natural shading and daylight control. The structure represents our dedication to low-carbon commercial engineering and modern West African corporate identity.
              </p>
              <div className="featured-el pt-4">
                <Link
                  href="/projects/landmark-ecofriendlyoffice"
                  className="inline-flex items-center justify-center border-2 border-white rounded-sm text-xs font-bold uppercase tracking-widest text-white px-8 py-4 transition duration-300 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy shadow-md active:scale-95"
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Metrics / Stats block */}
      <section ref={statsRef} className="py-20 bg-[#fafafa] border-t border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:divide-x md:divide-neutral-200">
            <div className="stat-col flex flex-col items-center">
              <span className="stat-number font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2" data-target="100">0+</span>
              <span className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">PROJECTS COMPLETED</span>
            </div>
            <div className="stat-col flex flex-col items-center">
              <span className="stat-number font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2" data-target="20">0+</span>
              <span className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">AWARDS WON</span>
            </div>
            <div className="stat-col flex flex-col items-center">
              <span className="stat-number font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2" data-target="250">0+</span>
              <span className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">HAPPY CLIENTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Blog Section (Architectural Perspectives) */}
      <BlogSection />

      {/* 7. Philosophy Quote block */}
      <PhilosophyQuoteSection />

      {/* 8. Regional Impact map */}
      <RegionalImpactSection />

      {/* 9. CTA Section */}
      <CTASection />

    </div>
  );
}
