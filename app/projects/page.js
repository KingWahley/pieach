"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import BlogSection from "@/components/sections/BlogSection";
import PhilosophyQuoteSection from "@/components/sections/PhilosophyQuoteSection";
import RegionalImpactSection from "@/components/sections/RegionalImpactSection";
import CTASection from "@/components/sections/CTASection";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

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

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900">
        {/* Background Image: wood-slat texture (service_mgmt.png) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
          style={{ backgroundImage: "url('/assets/service_mgmt.png')" }}
        />
        
        {/* Gradients Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
          <div className="max-w-4xl">
            <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
              Projects That Shape<br />Experiences
            </h1>
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl">
              Browse our portfolio of residential, architectural, and master planning designs that define modern West Africa.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-brand-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md hover:bg-brand-gold-hover hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Call
              </Link>
              <a
                href="#projects-grid-section"
                className="inline-flex items-center justify-center border border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-white hover:text-brand-navy transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section */}
      <section className="py-20 lg:py-24 border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Our Work title */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-none uppercase">
                Our Work
              </h2>
            </div>
            {/* Right Column: Paragraphs */}
            <div className="lg:col-span-8 space-y-6">
              <p className="font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                PIEACH Limited collaborates with visionaries, developers, and civic organizations to deliver high-performance physical structures. From luxury estates to mixed-use corporate high-rises, each project represents a rigorous synthesis of site context, structural compliance, and environmental responsibility.
              </p>
              <p className="font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                Our design methodology prioritizes spatial logic, daylighting optimization, and biophilic integration, creating timeless spaces that improve the daily life of their occupants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Grid & Interactive Filters */}
      <section id="projects-grid-section" className="py-20 lg:py-24 bg-white">
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
                  className={`px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest transition duration-200 border rounded-sm cursor-pointer
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
                className="group flex flex-col justify-between border border-neutral-100/50 bg-[#fafafa]/40 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
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
      <section className="bg-[#2A1B18] text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Full-Bleed Image (Grayscale Facade) */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-800 shadow-2xl border border-white/5">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity hover:opacity-100 transition duration-500 scale-102"
                style={{ backgroundImage: "url('/assets/service_architecture.png')" }}
              />
              <div className="absolute inset-0 bg-brand-brown/10 pointer-events-none" />
            </div>

            {/* Right Column: Featured details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-2 block">
                FEATURED PROJECT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight uppercase">
                UBA Ghana Head Office
              </h2>
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                Our design for the United Bank for Africa headquarters in Accra integrates a passive cooling facade with architectural curves that optimize natural shading and daylight control. The structure represents our dedication to low-carbon commercial engineering and modern West African identity.
              </p>
              <div className="pt-4">
                <Link
                  href="/projects/uba-ghana-head-office"
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
      <section className="py-20 bg-[#fafafa] border-t border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:divide-x md:divide-neutral-200">
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2">100+</span>
              <span className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">PROJECTS COMPLETED</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2">20+</span>
              <span className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">AWARDS WON</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-neutral-950 mb-2">250+</span>
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
