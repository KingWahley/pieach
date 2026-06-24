"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CORE_SERVICES = [
  {
    title: "STRATEGIC PLANNING",
    image: "/assets/service_masterplanning.png",
    description: "Keeping in mind that one of our core values are developing a symbiotic relationship between buildings, people and the environment, each project is analyzed with the aim of creating environments that answer to specific needs of the client.",
  },
  {
    title: "ARCHITECTURE",
    image: "/assets/service_architecture.png",
    description: "With over 100 built projects spanning more than 20 years, Pieach is evolving in its building languages while constantly reinventing itself to remain at the forefront of architecture in Nigeria and the continent of Africa.",
  },
  {
    title: "INTERIOR ARCHITECTURE",
    image: "/assets/service_interior.png",
    description: "Our approach to interior design is collaborative and combined with discerning artistry, technique and meticulous attention to detail, Pieach is able to achieve light, warmth and calmness in any space.",
  },
  {
    title: "PROJECT MANAGEMENT",
    image: "/assets/service_mgmt.png",
    description: "Initiating and overseeing the hybrid of tasks deadlines and consultants required to successfully pull off a project calls for a management team that is constantly available, and knowledgeable about innovation, Project execution plus a professional commitment to a critical path that ensures a timely delivery on schedule, budget and quality assurance.",
  },
  {
    title: "LANDSCAPE DESIGN",
    image: "/assets/service_landscape.png",
    description: "The art of adapting the natural environment to create a sense of well-being and order is the foundation of our landscape philosophy. We focus on the unique relationship between art, architecture, engineering and the context of the environment when designing our landscapes.",
  },
  {
    title: "SUSTAINABLE DESIGN",
    image: "/assets/service_sustainable.png",
    description: "Being one of our core values and goals we push for projects which champion regenerative approaches to cities and neighborhoods. We include in our design, social and environmental strategies that balance energy, water and livability.",
  },
];

export default function CoreServicesGridSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".core-service-card",
      { opacity: 0, y: 45 },
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
  }, { scope: containerRef });

  const renderIcon = (index) => {
    const baseClass = "w-4 h-4 text-brand-gold transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6";
    const iconIndex = index % 3;
    
    if (iconIndex === 0) {
      // Drafting compass
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4M8 19l4-11 4 11M6 21h2M16 21h2M9.5 15h5" />
        </svg>
      );
    } else if (iconIndex === 1) {
      // Plan subdivision grid
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M10 4v16" />
        </svg>
      );
    } else {
      // Tree / Globe / Column
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        </svg>
      );
    }
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="bg-white text-neutral-900 py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {CORE_SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="core-service-card flex flex-col group transition-all duration-300 cursor-pointer"
            >
              {/* Image Container with Zoom hover (No rounded corners, no shadows) */}
              <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 rounded-none">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
              </div>

              {/* Title with inline gold icon */}
              <div className="mt-6">
                <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold flex items-center gap-2">
                  {renderIcon(index)} {service.title}
                </span>
                
                {/* Description */}
                <p className="font-sans text-neutral-600 text-sm leading-relaxed font-light mt-3 transition-colors duration-350 group-hover:text-neutral-950">
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
