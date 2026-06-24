"use client";

import { useRef } from "react";
import Link from "next/link";
import CareersHeroSection from "@/components/sections/CareersHeroSection";
import CTASection from "@/components/sections/CTASection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAREERS_LIST = [
  {
    slug: "senior-architect",
    title: "Senior Architect",
    type: "LAGOS, NIGERIA — FULL-TIME",
    description: "Requirements: 10+ years experience, Proficiency in Revit and AutoCAD, Lead project delivery across Africa.",
  },
  {
    slug: "interior-designer",
    title: "Interior Designer",
    type: "CAPE TOWN, SOUTH AFRICA — HYBRID",
    description: "Requirements: 5+ years luxury residential experience, Expertise in material sourcing and FF&E, Strong visualization skills.",
  },
  {
    slug: "project-architect",
    title: "Project Architect",
    type: "NAIROBI, KENYA — FULL-TIME",
    description: "Requirements: Registered architect, 7+ years experience, Strong technical detailing and site supervision skills.",
  },
];

const PHILOSOPHY_ITEMS = [
  {
    title: "Creativity",
    description: "Pushing the boundaries of form and function to create unique architectural signatures.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 0A3.75 3.75 0 0 0 12 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M10.5 19.5h3M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.808 13.064a3 3 0 01-5.176-3.001 6.002 6.002 0 1111.026 0 3 3 0 01-5.176 3.001z" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description: "Harnessing the power of collective intelligence through seamless team dynamics.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    description: "Designing for a lasting future with ecologically conscious materials and systems.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747C20.45 10.45 16 6 12 6c-4 0-8.45 4.45-8.716 8.253A9.004 9.004 0 0012 21zm0 0V6" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "Integrating cutting-edge technology into traditional architectural craftsmanship.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 9.75h8.25L9.75 21.75 12 14.25H3.75z" />
      </svg>
    ),
  },
  {
    title: "Craftsmanship",
    description: "Meticulous attention to detail that transforms a structure into a masterpiece.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7L7 21M12 7l5 14M9.5 14h5" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description: "An uncompromising standard of quality across every stage of the design process.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.39.73-.39.925 0l2.147 4.35 4.793.696c.43.062.602.588.291.896l-3.468 3.38.819 4.774c.074.431-.381.761-.767.557l-4.283-2.253-4.283 2.253c-.386.204-.84-.126-.767-.557l.819-4.774-3.468-3.38c-.31-.308-.139-.834.291-.896l4.793-.696 2.147-4.35z" />
      </svg>
    ),
  },
];

export default function CareersPageContent() {
  const spiritRef = useRef(null);
  const philosophyRef = useRef(null);
  const elevateRef = useRef(null);
  const rolesRef = useRef(null);
  const journeyRef = useRef(null);
  const lifeRef = useRef(null);
  const quotesRef = useRef(null);

  // 1. Studio Spirit Section (Converging slide)
  useGSAP(() => {
    if (!spiritRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spiritRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".spirit-title",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(
      ".spirit-text",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: spiritRef });

  // 2. Philosophy Section (Staggered tilted scale-in)
  useGSAP(() => {
    if (!philosophyRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      [".philo-sub", ".philo-title"],
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    )
    .fromTo(
      ".philo-card",
      { opacity: 0, scale: 0.96, rotate: -0.5 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: philosophyRef });

  // 3. Elevate Practice Section (Diagonal stagger)
  useGSAP(() => {
    if (!elevateRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elevateRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".elevate-title",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      ".elevate-col",
      { opacity: 0, x: -30, y: 30 },
      { opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: elevateRef });

  // 4. Open Roles Section (Advanced lines & content reveal)
  useGSAP(() => {
    if (!rolesRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rolesRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Draw the horizontal dividers and fade in header
    tl.to(".roles-line", {
      scaleX: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power2.inOut"
    })
    .fromTo(
      [".roles-title", ".roles-count"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.8"
    )
    // Reveal text details and buttons staggered
    .fromTo(
      ".role-title",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".role-desc",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".role-btn-wrap",
      { opacity: 0, scale: 0.9, x: 15 },
      { opacity: 1, scale: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.5)" },
      "-=0.6"
    );
  }, { scope: rolesRef });

  // 5. Selection Journey Section (Horizontal timeline)
  useGSAP(() => {
    if (!journeyRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeyRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".journey-title",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .to(".journey-line", {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.2")
    .fromTo(
      ".journey-step-num",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.6)" },
      "-=1.0"
    )
    .fromTo(
      ".journey-step-label",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: journeyRef });

  // 6. Life Inside Section (Scattered grid reveal)
  useGSAP(() => {
    if (!lifeRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: lifeRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      [".life-title", ".life-line"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    )
    .fromTo(
      ".life-img-1",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".life-img-2",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.7"
    )
    .fromTo(
      ".life-img-3",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.7"
    )
    .fromTo(
      ".life-img-wide",
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: lifeRef });

  // 7. Employee Quotes Section (Double curtain)
  useGSAP(() => {
    if (!quotesRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: quotesRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    tl.fromTo(
      ".quote-card-left",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".quote-card-right",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: quotesRef });

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <CareersHeroSection />

      {/* 2. Introduction Section (The Studio Spirit) */}
      <section ref={spiritRef} id="philosophy-section" className="py-20 lg:py-24 border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Section Title */}
            <div className="lg:col-span-4">
              <h2 className="spirit-title font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight leading-tight uppercase">
                THE STUDIO<br />SPIRIT
              </h2>
            </div>
            
            {/* Right Column: Paragraphs */}
            <div className="lg:col-span-8 space-y-6 max-w-3xl">
              <p className="spirit-text font-serif text-neutral-700 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                At PIEACH, we believe that great design is born out of rigorous collaboration, research, and an unwavering commitment to quality. Our studio is more than just a workplace—it is a laboratory of ideas where designers, managers, and thinkers come together to shape the future of the built environment.
              </p>
              <p className="spirit-text font-serif text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                We are always looking for visionary designers, detail-oriented project managers, and creative problem-solvers to join our studio in Lagos. If you are passionate about architecture that is both functional and sustainable, and want to work on projects that make a lasting impact, we would love to hear from you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Philosophy Values Section */}
      <section ref={philosophyRef} className="bg-[#BCAE9E] text-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="philo-sub font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 block mb-4">
              OUR PHILOSOPHY
            </span>
            <h2 className="philo-title font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Driven by Intent
            </h2>
          </div>

          {/* Grid Layout of 6 Value Cards with dividing lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/40">
            {PHILOSOPHY_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className={`philo-card p-8 md:p-12 space-y-6 flex flex-col ${
                  index === 0
                    ? "border-b border-white/40 md:border-r"
                    : index === 1
                    ? "border-b border-white/40 md:border-r"
                    : index === 2
                    ? "border-b border-white/40"
                    : index === 3
                    ? "border-b border-white/40 md:border-b-0 md:border-r"
                    : index === 4
                    ? "border-b border-white/40 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="text-white">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl text-white font-normal leading-tight pt-2">
                  {item.title}
                </h3>
                <p className="font-sans text-white/90 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Elevate Your Practice Section */}
      <section ref={elevateRef} className="bg-brand-brown text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="elevate-title font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase mb-16 tracking-tight">
            Elevate Your Practice
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Block 1 */}
            <div className="elevate-col space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Context & Complexity
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Engage with complex projects that challenge and expand your architectural capabilities.
              </p>
            </div>

            {/* Block 2 */}
            <div className="elevate-col space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Collaboration
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Work alongside experienced principals and project leads to refine your practice.
              </p>
            </div>

            {/* Block 3 */}
            <div className="elevate-col space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Design Autonomy
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Take ownership of design phases, from concept drawings to construction supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Open Roles Section */}
      <section ref={rolesRef} id="open-roles-section" className="py-20 lg:py-28 bg-white text-neutral-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="roles-title font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal">
              Open Roles
            </h2>
            <span className="roles-count font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
              6 AVAILABLE
            </span>
          </div>

          {/* List of Roles */}
          <div className="relative">
            {/* Top Border Line */}
            <div className="roles-line absolute top-0 left-0 right-0 h-[1px] bg-neutral-200 origin-left scale-x-0" />
            
            {CAREERS_LIST.map((job) => (
              <div 
                key={job.title}
                className="relative group"
              >
                <div className="role-row flex flex-col md:flex-row md:items-center justify-between py-12 gap-8 px-4 sm:px-6 hover:bg-neutral-50/50 transition-colors duration-300 rounded-sm">
                  {/* Left Block */}
                  <div className="space-y-2 max-w-3xl">
                    <h3 className="role-title font-serif text-2xl sm:text-3xl text-neutral-950 font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {job.title}
                    </h3>
                    <span className="block font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
                      {job.type}
                    </span>
                    <p className="role-desc font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light pt-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Right Block: Rectangular bordered button */}
                  <div className="role-btn-wrap flex-shrink-0">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="w-full md:w-36 h-12 flex items-center justify-center border border-neutral-950 rounded-sm text-[10px] font-bold uppercase tracking-widest text-neutral-950 hover:bg-neutral-950 hover:text-white transition duration-300 active:scale-95 cursor-pointer"
                    >
                      APPLY
                    </Link>
                  </div>
                </div>
                
                {/* Divider Line under each row */}
                <div className="roles-line absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 origin-left scale-x-0" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Selection Journey Section */}
      <section ref={journeyRef} className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900 border-t border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left md:text-center">
          
          <h2 className="journey-title font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none mb-16">
            Selection Journey
          </h2>

          {/* Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Timeline connectors (desktop only) */}
            <div className="journey-line absolute top-7 left-[10%] right-[10%] h-[1px] bg-neutral-200 z-0 hidden md:block origin-left scale-x-0" />
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 space-y-0 md:space-y-4">
              <div className="journey-step-num w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300 shrink-0">
                01
              </div>
              <span className="journey-step-label font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase block">
                Portfolio Review
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 space-y-0 md:space-y-4">
              <div className="journey-step-num w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300 shrink-0">
                02
              </div>
              <span className="journey-step-label font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase block">
                Technical Interview
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 space-y-0 md:space-y-4">
              <div className="journey-step-num w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300 shrink-0">
                03
              </div>
              <span className="journey-step-label font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase block">
                Design Task
              </span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 space-y-0 md:space-y-4">
              <div className="journey-step-num w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300 shrink-0">
                04
              </div>
              <span className="journey-step-label font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase block">
                Principal Round
              </span>
            </div>

            {/* Step 5 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 space-y-0 md:space-y-4">
              <div className="journey-step-num w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300 shrink-0">
                05
              </div>
              <span className="journey-step-label font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase block">
                Offer & Onboarding
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Life Inside Section (Images Grid) */}
      <section ref={lifeRef} className="py-20 lg:py-24 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 relative">
            <h2 className="life-title font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none">
              Life Inside
            </h2>
            <div className="life-line w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Grid Layout */}
          <div className="space-y-6">
            {/* Row 1: 3 Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="life-img-1 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/1.png"
                  alt="Team designing model"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
              <div className="life-img-2 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/2.png"
                  alt="Team member smiling"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
              <div className="life-img-3 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/3.png"
                  alt="Architectural detailing physical model"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
            </div>

            {/* Row 2: 1 Full-width Wide Image */}
            <div className="life-img-wide relative aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
              <img
                src="/assets/team/life inside/4.png"
                alt="Workspace team collaboration"
                className="absolute inset-0 w-full h-full object-cover transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. Employee Quotes Section */}
      <section ref={quotesRef} className="py-20 lg:py-24 bg-[#fafafa] border-t border-neutral-100 text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1 */}
            <div className="quote-card-left bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  At PIEACH, I've had the opportunity to lead major commercial builds in Lagos, shaping the cityscape and collaborating with top-tier consultants. The learning curve is steep but rewarding.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic block">
                Adebisi Adeoye, Project Architect
              </cite>
            </div>

            {/* Card 2 */}
            <div className="quote-card-right bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  The focus on biophilic design and passive energy systems has allowed me to push the boundaries of sustainable architecture. Every project feels like a new research endeavor.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic block">
                Kelvin Nduka, Sustainable Design Lead
              </cite>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <CTASection />

    </div>
  );
}
